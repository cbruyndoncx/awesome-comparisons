// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/config-admin/config-workspace-service.spec.md
// (spec:f0fa0ab7) (code:20836fcc)

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, throwError, of, timer, combineLatest, forkJoin } from 'rxjs';
import { catchError, retry, debounceTime, map, tap, switchMap, retryWhen, take, delay, concatMap, finalize, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { stringify, parse, parseDocument, Document } from 'yaml';
import { environment } from '../../../environments/environment';

import {
  ConfigCatalogItem,
  ConfigDocumentModel,
  CriteriaGroupModel,
  CriteriaEntryModel,
  ValueDisplayModel,
  DocumentMetadata,
  SaveResult,
  ValidationError
} from '../../models/config-document.model';
import { parseStructuredText } from './template-field.util';
import { ConfigAlertService } from './config-alert.service';

const OTHER_CRITERIA_GROUP_ID = '__other__';
const OTHER_CRITERIA_GROUP_NAME = 'Other Criteria';
const BLUEPRINT_MISSING_REF_RATIO_LIMIT = 100; // fallback when missing refs ≥ 100x resolved refs (very permissive)
const BLUEPRINT_MISSING_REF_SAMPLE = 8;

type CatalogFilters = {
  datasetIds: string[];
  types: string[];
  searchText: string;
};

interface DatasetManifestEntry {
  id: string;
  displayLabel?: string;
  sources?: {
    configDefaults?: string[];
  };
}

interface GroupingBlueprintSource {
  path: string;
  parsedDocument: any;
  rawYaml: string;
}

interface DatasetGroupingBlueprint {
  datasetId: string;
  sources: GroupingBlueprintSource[];
  loadedAt: number;
}

interface DatasetCriteriaBlueprint {
  datasetId: string;
  sharedCriteria: Map<string, any>;
  loadedAt: number;
}

interface BlueprintBuildResult {
  groups: CriteriaGroupModel[];
  assignedChildren: Set<string>;
}

interface MissingReferenceInfo {
  group: string;
  reference: string;
}






@Injectable({
  providedIn: 'root'
})
export class ConfigWorkspaceService {
  private readonly apiBaseUrl = '/api/config';
  private readonly enableBlueprintGrouping = true;
  private readonly datasetManifestUrl = 'assets/configuration/datasets.manifest.json';
  
  // Internal subjects
  private activeDocumentSubject = new BehaviorSubject<ConfigDocumentModel | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private saveStatusSubject = new BehaviorSubject<SaveResult | null>(null);
  private errorsSubject = new BehaviorSubject<HttpErrorResponse | null>(null);
  private catalogSubject = new BehaviorSubject<ConfigCatalogItem[]>([]);
  

  
  // Raw catalog cache
  private rawCatalog: ConfigCatalogItem[] = [];
  private datasetManifestCache: DatasetManifestEntry[] | null = null;
  private datasetManifestRequest$: Observable<DatasetManifestEntry[]> | null = null;
  private datasetGroupingCache = new Map<string, DatasetGroupingBlueprint>();
  private activeGroupingBlueprint: DatasetGroupingBlueprint | null = null;
  private datasetCriteriaCache = new Map<string, DatasetCriteriaBlueprint>();
  private activeCriteriaBlueprint: DatasetCriteriaBlueprint | null = null;
  
  // Observable streams
  readonly catalog$: Observable<ConfigCatalogItem[]> = this.catalogSubject.asObservable().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  
  readonly activeDocument$ = this.activeDocumentSubject.asObservable().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  readonly isLoading$ = this.isLoadingSubject.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  readonly saveStatus$ = this.saveStatusSubject.asObservable().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  readonly errors$ = this.errorsSubject.asObservable().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private http: HttpClient,
    private alerts: ConfigAlertService
  ) {
    // Initialize catalog on service creation
  }

  private buildGroupsViaBlueprint(definitions: Map<string, any>): BlueprintBuildResult | null {
    if (!this.enableBlueprintGrouping) {
      return null;
    }

    const blueprint = this.activeGroupingBlueprint;
    if (!blueprint || blueprint.sources.length === 0) {
      return null;
    }

    if (environment.debug) {
      console.log('[DEBUG] buildGroupsViaBlueprint: Starting with', blueprint.sources.length, 'sources and', definitions.size, 'document definitions');
    }

    const assignedChildren = new Set<string>();
    const groups: CriteriaGroupModel[] = [];
    const seenGroupIds = new Set<string>();
    const missingReferences: MissingReferenceInfo[] = [];
    let resolvedChildrenCount = 0;

    blueprint.sources.forEach(source => {
      const criteriaNode = source.parsedDocument?.criteria;
      if (!criteriaNode) {
        console.warn(
          `[ConfigWorkspaceService] Grouping file "${source.path}" missing "criteria" node; skipping.`
        );
        return;
      }

      const blueprintDefinitions = this.flattenCriteriaDefinitions(criteriaNode);
      if (environment.debug) {
        console.log('[DEBUG] buildGroupsViaBlueprint: Blueprint source', source.path, 'has', blueprintDefinitions.size, 'definitions');
      }
      blueprintDefinitions.forEach((definition, key) => {
        if (!Array.isArray(definition.children) || definition.children.length === 0) {
          return;
        }

        const groupId = definition.id || key || this.generateId();
        if (seenGroupIds.has(groupId)) {
          console.warn(
            `[ConfigWorkspaceService] Duplicate grouping id "${groupId}" found in "${source.path}", ignoring subsequent definition.`
          );
          return;
        }

        const groupName = definition.name || key;
        if (environment.debug) {
          console.log('[DEBUG] buildGroupsViaBlueprint: Resolving group', groupName, 'with', definition.children.length, 'child references');
        }
        const children = this.resolveGroupChildren(
          groupId,
          definition.children,
          definitions,
          assignedChildren,
          groupName,
          missingReferences
        );
        if (environment.debug) {
          console.log('[DEBUG] buildGroupsViaBlueprint: Resolved', children.length, 'children for group', groupName);
        }
        resolvedChildrenCount += children.length;

        if (children.length === 0) {
          console.warn(
            `[ConfigWorkspaceService] Group "${groupName}" from "${source.path}" has no resolvable children; skipping.`
          );
          return;
        }

        seenGroupIds.add(groupId);
        groups.push({
          id: groupId,
          name: groupName,
          type: definition.type || 'group',
          search: Boolean(definition.search),
          table: Boolean(definition.table),
          detail: Boolean(definition.detail),
          order: Number(definition.order) || groups.length,
          children
        });
      });
    });

    if (environment.debug) {
      console.log('[DEBUG] buildGroupsViaBlueprint: Completed with', groups.length, 'groups,', resolvedChildrenCount, 'resolved children,', missingReferences.length, 'missing references');
    }

    if (groups.length === 0) {
      console.warn(
        '[ConfigWorkspaceService] Dataset blueprint resolved but produced zero groups; falling back to document-defined structure.'
      );
      return null;
    }

    if (missingReferences.length > 0) {
      const ratio =
        resolvedChildrenCount === 0
          ? Number.POSITIVE_INFINITY
          : missingReferences.length / Math.max(resolvedChildrenCount, 1);

      if (!resolvedChildrenCount || ratio >= BLUEPRINT_MISSING_REF_RATIO_LIMIT) {
        const message = 'Too many missing blueprint references; skipping blueprint and falling back to document-defined groups.';
        this.logMissingReferenceSummary(message, missingReferences);
        return null;
      } else {
        const message = 'Missing blueprint references detected; continuing with partial blueprint resolution.';
        this.logMissingReferenceSummary(message, missingReferences);
        // Continue with the resolved groups despite some missing references
      }
    }

    return {
      groups: groups.sort((a, b) => a.order - b.order),
      assignedChildren
    };
  }

  private buildGroupsFromDocumentDefinitions(
    definitions: Map<string, any>,
    groupDefinitionKeys: Set<string>
  ): CriteriaGroupModel[] {
    const assignedChildren = new Set<string>();
    const groups: CriteriaGroupModel[] = [];

    definitions.forEach((definition, key) => {
      if (!Array.isArray(definition.children) || definition.children.length === 0) {
        return;
      }
      const groupId = definition.id || key || this.generateId();
      const groupName = definition.name || key;
      const children = this.resolveGroupChildren(
        groupId,
        definition.children,
        definitions,
        assignedChildren,
        groupName
      );
      if (children.length === 0) {
        return;
      }
      groups.push({
        id: groupId,
        name: groupName,
        type: definition.type || 'group',
        search: Boolean(definition.search),
        table: Boolean(definition.table),
        detail: Boolean(definition.detail),
        order: Number(definition.order) || groups.length,
        children
      });
    });

    return this.appendUngroupedEntries(groups, definitions, assignedChildren, groupDefinitionKeys);
  }

  private appendUngroupedEntries(
    baseGroups: CriteriaGroupModel[],
    definitions: Map<string, any>,
    assignedChildren: Set<string>,
    groupDefinitionKeys: Set<string>
  ): CriteriaGroupModel[] {
    const groups = [...baseGroups];
    const ungroupedEntries: CriteriaEntryModel[] = [];

    definitions.forEach((definition, key) => {
      if (assignedChildren.has(key) || groupDefinitionKeys.has(key)) {
        return;
      }
      ungroupedEntries.push(
        this.toCriteriaEntryModel(key, definition, OTHER_CRITERIA_GROUP_ID)
      );
    });

    groups.sort((a, b) => a.order - b.order);

    if (ungroupedEntries.length > 0 || groups.length === 0) {
      const maxOrder = groups.reduce((max, group) => Math.max(max, group.order), -1);
      groups.push({
        id: OTHER_CRITERIA_GROUP_ID,
        name: OTHER_CRITERIA_GROUP_NAME,
        type: 'group',
        search: false,
        table: false,
        detail: false,
        order: maxOrder + 1,
        children: ungroupedEntries
      });
    }

    return groups;
  }

  private extractGroupDefinitionKeys(definitions: Map<string, any>): Set<string> {
    const keys = new Set<string>();
    definitions.forEach((definition, key) => {
      if (Array.isArray(definition.children) && definition.children.length > 0) {
        keys.add(key);
      }
    });
    return keys;
  }

  // Catalog operations
  refreshCatalog(): Observable<ConfigCatalogItem[]> {
    this.isLoadingSubject.next(true);
    this.alerts.info('Refreshing configuration catalog…');

    return this.http.get<ConfigCatalogItem[]>(`${this.apiBaseUrl}/catalog`).pipe(
      retry(3),
      map(catalog => {
        // Exclude the system default configuration file from being editable
        // This file is foundational and should not be modified through the UI
        return catalog.filter(item =>
          item.relativePath !== 'configuration/comparison-default.yml'
        );
      }),
      tap(catalog => {
        this.rawCatalog = catalog;
        this.catalogSubject.next(catalog);
        this.isLoadingSubject.next(false);
        this.alerts.info(`Catalog loaded (${catalog.length} items).`);
      }),
      catchError(error => {
        console.error('[ConfigWorkspaceService] HTTP request failed:', error);
        this.errorsSubject.next(error);
        this.isLoadingSubject.next(false);
        this.alerts.error(`Catalog refresh failed: ${error?.message || error}`);
        return throwError(error);
      })
    );
  }



  applyDocumentFormValue(formValue: any): void {
    const current = this.activeDocumentSubject.value;
    if (!current || !formValue) {
      return;
    }

    const formGroups = Array.isArray(formValue.criteriaGroups)
      ? formValue.criteriaGroups
      : [];

    const updatedGroups: CriteriaGroupModel[] = formGroups.map(
      (groupForm: any, index: number) => {
        const existingById = current.criteriaGroups.find(
          group => group.id === groupForm.id
        );
        const fallbackExisting =
          existingById ?? current.criteriaGroups[index] ?? null;
        const groupId =
          groupForm.id || fallbackExisting?.id || this.generateId();

        const entriesArray = Array.isArray(groupForm.entries)
          ? groupForm.entries
          : [];

            const children: CriteriaEntryModel[] = entriesArray.map(
              (entryForm: any, childIndex: number) => {
                const existingEntry =
                  fallbackExisting?.children?.find(child => child.id === entryForm.id) ??
                  fallbackExisting?.children?.[childIndex] ??
                  null;

                const placeholderValue = this.parseStructuredField(entryForm.placeholder);
                const descriptionValue = this.parseStructuredField(entryForm.description);
                const preservedExtra = existingEntry?.extraProperties
                  ? { ...existingEntry.extraProperties }
                  : undefined;
                const labelValuesForm = Array.isArray(entryForm.labelValues)
                  ? entryForm.labelValues
                  : [];
                const labelValues = this.buildLabelValuesMap(labelValuesForm);
                const extraProperties = { ...(preservedExtra || {}) };
                if (labelValues) {
                  extraProperties.values = labelValues;
                } else if (labelValuesForm.length === 0 && 'values' in extraProperties) {
                  delete extraProperties.values;
                }
                const hasExtra = Object.keys(extraProperties).length > 0;

                return {
                  id: entryForm.id || existingEntry?.id || this.generateId(),
                  name: entryForm.name || existingEntry?.name || '',
                  type: entryForm.type || existingEntry?.type || '',
                  search: !!entryForm.search,
                  table: !!entryForm.table,
                  detail: !!entryForm.detail,
                  andSearch: !!entryForm.andSearch,
                  rangeSearch: !!entryForm.rangeSearch,
                  order:
                    typeof entryForm.order === 'number'
                      ? entryForm.order
                      : childIndex,
                  placeholder: placeholderValue,
                  description: descriptionValue,
                  parentId: groupId,
                  ...(hasExtra && { extraProperties })
                };
              }
            );

        return {
          id: groupId,
          name: groupForm.name || fallbackExisting?.name || '',
          type: groupForm.type || fallbackExisting?.type || '',
          search: !!groupForm.search,
          table: !!groupForm.table,
          detail: !!groupForm.detail,
          order:
            typeof groupForm.order === 'number'
              ? groupForm.order
              : fallbackExisting?.order ?? index,
          children
        };
      }
    );

    const overridesRecord = formValue.valueDisplayOverrides || {};
    const overrides = new Map<string, ValueDisplayModel[]>();
    if (overridesRecord && typeof overridesRecord === 'object') {
      Object.entries(overridesRecord).forEach(([criteriaId, entries]) => {
        if (!criteriaId) {
          return;
        }
        const list = Array.isArray(entries) ? entries : [];
        overrides.set(
          criteriaId,
          list.map((entry: any) => ({
            criteriaId,
            valueKey: entry.valueKey || '',
            emoji: entry.emoji || '',
            displayText: entry.displayText || ''
          }))
        );
      });
    }

    const updatedDocument: ConfigDocumentModel = {
      ...current,
      criteriaGroups: updatedGroups,
      valueDisplayOverrides: overrides,
      isDirty: true
    };

    this.activeDocumentSubject.next(updatedDocument);
  }



  // Document operations
  loadDocument(catalogItem: ConfigCatalogItem): Observable<ConfigDocumentModel> {
    this.isLoadingSubject.next(true);
    const label = catalogItem?.relativePath || catalogItem?.encodedPath || 'document';
    this.alerts.info(`Loading ${label}…`);

    // Skip blueprint grouping for the system default configuration file
    const isSystemDefault = catalogItem?.relativePath === 'configuration/comparison-default.yml';
    const useBlueprintGrouping = this.enableBlueprintGrouping && !isSystemDefault;

    const load$ = useBlueprintGrouping
      ? forkJoin({
          criteria: this.ensureDatasetCriteria(catalogItem),
          grouping: this.ensureDatasetBlueprint(catalogItem)
        }).pipe(
          switchMap(() => this.http.get<any>(`${this.apiBaseUrl}/${catalogItem.encodedPath}`))
        )
      : this.http.get<any>(`${this.apiBaseUrl}/${catalogItem.encodedPath}`);

    return load$.pipe(
      map(response => this.transformApiResponseToModel(catalogItem, response)),
      tap(() => this.alerts.info(`Loaded ${label}.`)),
      catchError(error => {
        this.errorsSubject.next(error);
        this.alerts.error(`Failed to load ${label}: ${error?.message || error}`);
        return throwError(error);
      }),
      tap(() => this.isLoadingSubject.next(false))
    );
  }

  selectDocument(catalogItem: ConfigCatalogItem): void {
    this.loadDocument(catalogItem).subscribe(
      document => {
        this.activeDocumentSubject.next(document);
        this.clearDirtyState();
      },
      error => {
        console.error('Failed to load document:', error);
      }
    );
  }

  clearActiveDocument(): void {
    this.activeDocumentSubject.next(null);
    this.clearDirtyState();
    this.activeGroupingBlueprint = null;
    this.activeCriteriaBlueprint = null;
  }

  revertDocument(): Observable<ConfigDocumentModel> {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) {
      return throwError(new Error('No active document to revert'));
    }
    
    const catalogItem = this.findCatalogItem(currentDoc.encodedPath);
    if (!catalogItem) {
      return throwError(new Error('Cannot find catalog item for current document'));
    }
    
    return this.loadDocument(catalogItem).pipe(
      tap(document => {
        this.activeDocumentSubject.next(document);
        this.clearDirtyState();
      })
    );
  }

  // Working copy mutations
  addCriteriaGroup(name: string, type: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const newGroup: CriteriaGroupModel = {
      id: this.generateId(),
      name,
      type,
      search: false,
      table: false,
      detail: false,
      order: Math.max(...currentDoc.criteriaGroups.map(g => g.order), -1) + 1,
      children: []
    };
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: [...currentDoc.criteriaGroups, newGroup],
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  cloneCriteriaGroup(sourceGroup: CriteriaGroupModel): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const newGroupId = this.generateId();
    const clonedGroup: CriteriaGroupModel = {
      ...sourceGroup,
      id: newGroupId,
      name: `${sourceGroup.name} (Copy)`,
      order: Math.max(...currentDoc.criteriaGroups.map(g => g.order), -1) + 1,
      children: sourceGroup.children.map(child => ({
        ...child,
        id: this.generateId(),
        parentId: newGroupId
      }))
    };
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: [...currentDoc.criteriaGroups, clonedGroup],
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  removeCriteriaGroup(groupId: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: currentDoc.criteriaGroups.filter(g => g.id !== groupId),
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  reorderCriteriaGroups(fromIndex: number, toIndex: number): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const groups = [...currentDoc.criteriaGroups];
    const [movedGroup] = groups.splice(fromIndex, 1);
    groups.splice(toIndex, 0, movedGroup);
    
    // Update order numbers
    groups.forEach((group, index) => {
      group.order = index;
    });
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: groups,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  addCriteriaEntry(parentGroupId: string, name: string, type: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const groups = currentDoc.criteriaGroups.map(group => {
      if (group.id === parentGroupId) {
        const newEntry: CriteriaEntryModel = {
          id: this.generateId(),
          name,
          type,
          search: false,
          table: false,
          detail: false,
          andSearch: false,
          rangeSearch: false,
          order: Math.max(...group.children.map(c => c.order), -1) + 1,
          parentId: parentGroupId
        };
        
        return {
          ...group,
          children: [...group.children, newEntry]
        };
      }
      return group;
    });
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: groups,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  cloneCriteriaEntry(sourceEntry: CriteriaEntryModel, targetGroupId: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const groups = currentDoc.criteriaGroups.map(group => {
      if (group.id === targetGroupId) {
        const clonedEntry: CriteriaEntryModel = {
          ...sourceEntry,
          id: this.generateId(),
          name: `${sourceEntry.name} (Copy)`,
          order: Math.max(...group.children.map(c => c.order), -1) + 1,
          parentId: targetGroupId
        };
        
        return {
          ...group,
          children: [...group.children, clonedEntry]
        };
      }
      return group;
    });
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: groups,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  removeCriteriaEntry(groupId: string, entryId: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const groups = currentDoc.criteriaGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          children: group.children.filter(c => c.id !== entryId)
        };
      }
      return group;
    });
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: groups,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  reorderCriteriaEntries(groupId: string, fromIndex: number, toIndex: number): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const groups = currentDoc.criteriaGroups.map(group => {
      if (group.id === groupId) {
        const children = [...group.children];
        const [movedEntry] = children.splice(fromIndex, 1);
        children.splice(toIndex, 0, movedEntry);
        
        // Update order numbers
        children.forEach((child, index) => {
          child.order = index;
        });
        
        return {
          ...group,
          children
        };
      }
      return group;
    });
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: groups,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  updateCriteriaFlags(itemId: string, flags: { search?: boolean; table?: boolean; detail?: boolean }): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const groups = currentDoc.criteriaGroups.map(group => {
      if (group.id === itemId) {
        return { ...group, ...flags };
      }
      
      return {
        ...group,
        children: group.children.map(child => 
          child.id === itemId ? { ...child, ...flags } : child
        )
      };
    });
    
    const updatedDoc = {
      ...currentDoc,
      criteriaGroups: groups,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  updateValueDisplayOverride(criteriaId: string, valueKey: string, emoji: string, displayText?: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const overrides = new Map(currentDoc.valueDisplayOverrides);
    const criteriaOverrides = [...(overrides.get(criteriaId) || [])];
    
    const existingIndex = criteriaOverrides.findIndex(o => o.valueKey === valueKey);
    const newOverride: ValueDisplayModel = { criteriaId, valueKey, emoji, displayText };
    
    if (existingIndex >= 0) {
      criteriaOverrides[existingIndex] = newOverride;
    } else {
      criteriaOverrides.push(newOverride);
    }
    
    overrides.set(criteriaId, criteriaOverrides);
    
    const updatedDoc = {
      ...currentDoc,
      valueDisplayOverrides: overrides,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  removeValueDisplayOverride(criteriaId: string, valueKey: string): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) return;
    
    const overrides = new Map(currentDoc.valueDisplayOverrides);
    const criteriaOverrides = overrides.get(criteriaId) || [];
    
    const filtered = criteriaOverrides.filter(o => o.valueKey !== valueKey);
    
    if (filtered.length === 0) {
      overrides.delete(criteriaId);
    } else {
      overrides.set(criteriaId, [...filtered]);
    }
    
    const updatedDoc = {
      ...currentDoc,
      valueDisplayOverrides: overrides,
      isDirty: true
    };
    
    this.activeDocumentSubject.next(updatedDoc);
  }

  private ensureDatasetBlueprint(catalogItem: ConfigCatalogItem): Observable<DatasetGroupingBlueprint | null> {
    if (!this.enableBlueprintGrouping) {
      this.activeGroupingBlueprint = null;
      return of(null);
    }

    const datasetId = catalogItem.datasetId;
    if (!datasetId) {
      this.activeGroupingBlueprint = null;
      return of(null);
    }

    const cached = this.datasetGroupingCache.get(datasetId);
    if (cached) {
      this.activeGroupingBlueprint = cached;
      return of(cached);
    }

    return this.loadDatasetManifest().pipe(
      map(entries => entries.find(entry => entry.id === datasetId) || null),
      switchMap(entry => {
        if (!entry) {
          console.warn(
            `[ConfigWorkspaceService] Dataset "${datasetId}" not found in manifest; continuing without grouping defaults.`
          );
          this.activeGroupingBlueprint = null;
          return of(null);
        }

        const groupingPaths = this.extractGroupingDefaults(entry);
        if (groupingPaths.length === 0) {
          const blueprint: DatasetGroupingBlueprint = {
            datasetId,
            sources: [],
            loadedAt: Date.now()
          };
          this.datasetGroupingCache.set(datasetId, blueprint);
          this.activeGroupingBlueprint = blueprint;
          return of(blueprint);
        }

        const uniquePaths = Array.from(new Set(groupingPaths));
        const fetchRequests = uniquePaths.map(path => this.fetchGroupingDocument(path));

        return forkJoin(fetchRequests).pipe(
          map(results =>
            results.filter(
              (result): result is GroupingBlueprintSource => Boolean(result)
            )
          ),
          map(sources => {
            const blueprint: DatasetGroupingBlueprint = {
              datasetId,
              sources,
              loadedAt: Date.now()
            };
            this.datasetGroupingCache.set(datasetId, blueprint);
            this.activeGroupingBlueprint = blueprint;
            return blueprint;
          })
        );
      }),
      catchError(error => {
        console.error(
          '[ConfigWorkspaceService] Failed to resolve dataset grouping defaults:',
          error
        );
        this.activeGroupingBlueprint = null;
        return of(null);
      })
    );
  }

  private ensureDatasetCriteria(catalogItem: ConfigCatalogItem): Observable<DatasetCriteriaBlueprint | null> {
    if (!this.enableBlueprintGrouping) {
      this.activeCriteriaBlueprint = null;
      return of(null);
    }

    const datasetId = catalogItem.datasetId;
    if (!datasetId) {
      this.activeCriteriaBlueprint = null;
      return of(null);
    }

    const cached = this.datasetCriteriaCache.get(datasetId);
    if (cached) {
      this.activeCriteriaBlueprint = cached;
      return of(cached);
    }

    return this.loadDatasetManifest().pipe(
      map(entries => entries.find(entry => entry.id === datasetId) || null),
      switchMap(entry => {
        if (!entry) {
          console.warn(
            `[ConfigWorkspaceService] Dataset "${datasetId}" not found in manifest.`
          );
          this.activeCriteriaBlueprint = null;
          return of(null);
        }

        const criteriaPaths = this.extractCriteriaDefaults(entry);
        if (environment.debug) {
          console.log('[DEBUG] ensureDatasetCriteria: Found', criteriaPaths.length, 'criteria files for', datasetId);
        }

        if (criteriaPaths.length === 0) {
          const blueprint: DatasetCriteriaBlueprint = {
            datasetId,
            sharedCriteria: new Map(),
            loadedAt: Date.now()
          };
          this.datasetCriteriaCache.set(datasetId, blueprint);
          this.activeCriteriaBlueprint = blueprint;
          return of(blueprint);
        }

        const uniquePaths = Array.from(new Set(criteriaPaths));
        const fetchRequests = uniquePaths.map(path => this.fetchCriteriaDocument(path));

        return forkJoin(fetchRequests).pipe(
          map(results => {
            const sharedCriteria = new Map<string, any>();

            results.forEach(result => {
              if (result?.parsedDocument?.criteria) {
                const defs = this.flattenCriteriaDefinitions(result.parsedDocument.criteria);
                if (environment.debug) {
                  console.log('[DEBUG] ensureDatasetCriteria: Loaded', defs.size, 'definitions from', result.path);
                }
                defs.forEach((def, key) => {
                  sharedCriteria.set(key, def);
                });
              }
            });

            const blueprint: DatasetCriteriaBlueprint = {
              datasetId,
              sharedCriteria,
              loadedAt: Date.now()
            };
            this.datasetCriteriaCache.set(datasetId, blueprint);
            this.activeCriteriaBlueprint = blueprint;

            if (environment.debug) {
              console.log('[DEBUG] ensureDatasetCriteria: Total shared criteria for', datasetId, ':', sharedCriteria.size);
            }
            return blueprint;
          })
        );
      }),
      catchError(error => {
        console.error(
          '[ConfigWorkspaceService] Failed to load dataset criteria defaults:',
          error
        );
        this.activeCriteriaBlueprint = null;
        return of(null);
      })
    );
  }

  private fetchCriteriaDocument(relativePath: string): Observable<{ path: string; parsedDocument: any } | null> {
    const encodedPath = this.encodeRelativePath(relativePath);
    if (!encodedPath) {
      console.warn(
        `[ConfigWorkspaceService] Unable to encode criteria path "${relativePath}", skipping.`
      );
      return of(null);
    }

    return this.http.get<any>(`${this.apiBaseUrl}/${encodedPath}`).pipe(
      map(response => ({
        path: relativePath,
        parsedDocument: response?.parsedDocument || null
      })),
      catchError(error => {
        console.error(
          `[ConfigWorkspaceService] Failed to load criteria defaults from "${relativePath}":`,
          error
        );
        return of(null);
      })
    );
  }

  private loadDatasetManifest(): Observable<DatasetManifestEntry[]> {
    if (this.datasetManifestCache) {
      return of(this.datasetManifestCache);
    }

    if (this.datasetManifestRequest$) {
      return this.datasetManifestRequest$;
    }

    this.datasetManifestRequest$ = this.http
      .get<{ datasets: DatasetManifestEntry[] }>(this.datasetManifestUrl)
      .pipe(
        map(response => (Array.isArray(response?.datasets) ? response.datasets : [])),
        tap(entries => (this.datasetManifestCache = entries)),
        catchError(error => {
          console.error(
            '[ConfigWorkspaceService] Failed to load dataset manifest:',
            error
          );
          this.datasetManifestCache = null;
          return of<DatasetManifestEntry[]>([]);
        }),
        finalize(() => (this.datasetManifestRequest$ = null)),
        shareReplay({ bufferSize: 1, refCount: true })
      );

    return this.datasetManifestRequest$;
  }

  private extractCriteriaDefaults(entry: DatasetManifestEntry): string[] {
    if (!entry.sources?.configDefaults) {
      return [];
    }
    return entry.sources.configDefaults.filter(
      (path): path is string =>
        typeof path === 'string' &&
        path !== 'configuration/comparison-default.yml' &&  // Exclude system default
        !path.includes('groups') &&           // Not a grouping file
        !path.includes('value-display') &&    // Not a value display file
        path.endsWith('.yml')                 // Is a YAML file
    );
  }

  private extractGroupingDefaults(entry: DatasetManifestEntry): string[] {
    if (!entry.sources?.configDefaults) {
      return [];
    }
    return entry.sources.configDefaults.filter(
      (path): path is string =>
        typeof path === 'string' && /groups.*\.ya?ml$/i.test(path)
    );
  }

  private fetchGroupingDocument(relativePath: string): Observable<GroupingBlueprintSource | null> {
    const encodedPath = this.encodeRelativePath(relativePath);
    if (!encodedPath) {
      console.warn(
        `[ConfigWorkspaceService] Unable to encode grouping path "${relativePath}", skipping.`
      );
      return of(null);
    }

    return this.http.get<any>(`${this.apiBaseUrl}/${encodedPath}`).pipe(
      map(response => ({
        path: relativePath,
        parsedDocument: response?.parsedDocument || null,
        rawYaml: response?.rawYaml || ''
      })),
      catchError(error => {
        console.error(
          `[ConfigWorkspaceService] Failed to load grouping defaults from "${relativePath}":`,
          error
        );
        return of(null);
      })
    );
  }

  private encodeRelativePath(relativePath: string): string | null {
    if (!relativePath) {
      return null;
    }
    try {
      const utf8 = encodeURIComponent(relativePath).replace(
        /%([0-9A-F]{2})/g,
        (_, hex) => String.fromCharCode(parseInt(hex, 16))
      );
      const base64 =
        typeof btoa === 'function'
          ? btoa(utf8)
          : (globalThis as any)?.Buffer
          ? (globalThis as any).Buffer.from(relativePath, 'utf-8').toString('base64')
          : null;
      if (!base64) {
        return null;
      }
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    } catch (error) {
      console.error(
        '[ConfigWorkspaceService] Failed to encode relative path for grouping defaults:',
        error
      );
      return null;
    }
  }

  // YAML operations
  generatePreviewYaml(document?: ConfigDocumentModel): string {
    const doc = document || this.activeDocumentSubject.value;
    if (!doc) return '';
    
    try {
      const apiPayload = this.toApiPayload(doc);
      const yamlString = stringify(apiPayload, {
        indent: 2,
        lineWidth: 0,
        minContentWidth: 0
      });
      
      // Normalize line endings
      const normalized = this.stripEmptyLabelValueObjects(yamlString).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      return normalized;
    } catch (error) {
      console.error('Failed to generate preview YAML:', error);
      return `# Error generating YAML preview: ${error.message}`;
    }
  }

  validateYamlSyntax(yaml: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    try {
      parseDocument(yaml);
    } catch (error) {
      errors.push({
        field: 'yaml',
        message: error.message,
        value: yaml
      });
    }
    
    return errors;
  }

  private stripEmptyLabelValueObjects(yaml: string): string {
    const lines = yaml.split('\n');
    let activeValuesIndent: number | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.length === 0) {
        continue;
      }

      const indent = line.search(/\S|$/);

      if (trimmed === 'values:') {
        activeValuesIndent = indent;
        continue;
      }

      if (activeValuesIndent !== null && indent <= activeValuesIndent && !line.startsWith(' '.repeat(activeValuesIndent) + 'values:')) {
        activeValuesIndent = null;
      }

      if (
        activeValuesIndent !== null &&
        /:\s*(null|\{\s*\})\s*$/.test(trimmed)
      ) {
        lines[i] = line.replace(/:\s*(null|\{\s*\})(\s*)$/, ':$2');
      }
    }

    return lines.join('\n');
  }

  // Persistence
  saveDocument(): Observable<SaveResult> {
    const currentDoc = this.activeDocumentSubject.value;
    if (!currentDoc) {
      return throwError(new Error('No active document to save'));
    }
    
    this.isLoadingSubject.next(true);
    
    const previewYaml = this.generatePreviewYaml(currentDoc);
    const payload = {
      rawYaml: previewYaml,
      etag: currentDoc.etag,
      parsedDocument: this.toApiPayload(currentDoc)
    };
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'If-Match': currentDoc.etag
    });
    
    return this.http.put<any>(`${this.apiBaseUrl}/${currentDoc.encodedPath}`, payload, { headers }).pipe(
      map(response => ({
        success: true,
        message: response.message || 'Configuration saved successfully',
        etag: response.etag,
        checksum: response.checksum
      } as SaveResult)),
      tap(result => {
        if (result.success && result.etag && result.checksum) {
          // Update the document with new etag/checksum and clear dirty state
          const updatedDoc = {
            ...currentDoc,
            etag: result.etag,
            checksum: result.checksum,
            rawYaml: previewYaml,
            isDirty: false
          };
          this.activeDocumentSubject.next(updatedDoc);
          
          // Refresh catalog to reflect changes
          this.refreshCatalog().subscribe();
        }
        
        this.saveStatusSubject.next(result);
      }),
      catchError(error => {
        let result: SaveResult;
        
        if (error.status === 409) {
          result = {
            success: false,
            message: 'Document has been modified by another user. Please reload and try again.',
            errors: [{ field: 'etag', message: 'Optimistic lock conflict', value: currentDoc.etag }]
          };
        } else if (error.status === 400) {
          result = {
            success: false,
            message: error.error?.message || 'Invalid configuration data',
            errors: error.error?.errors || [{ field: 'yaml', message: 'Validation failed' }]
          };
        } else {
          result = {
            success: false,
            message: 'Failed to save configuration. Please try again.',
            errors: [{ field: 'network', message: error.message }]
          };
        }
        
        this.saveStatusSubject.next(result);
        this.errorsSubject.next(error);
        
        return of(result);
      }),
      tap(() => this.isLoadingSubject.next(false))
    );
  }

  hasUnsavedChanges(): boolean {
    const currentDoc = this.activeDocumentSubject.value;
    return currentDoc ? currentDoc.isDirty : false;
  }

  markDocumentDirty(): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (currentDoc && !currentDoc.isDirty) {
      this.activeDocumentSubject.next({
        ...currentDoc,
        isDirty: true
      });
    }
  }

  clearDirtyState(): void {
    const currentDoc = this.activeDocumentSubject.value;
    if (currentDoc && currentDoc.isDirty) {
      this.activeDocumentSubject.next({
        ...currentDoc,
        isDirty: false
      });
    }
  }

  // Utility mappers
  toCriteriaGroupModel(rawGroup: any): CriteriaGroupModel {
    return {
      id: rawGroup.id || this.generateId(),
      name: rawGroup.name || '',
      type: rawGroup.type || 'string',
      search: Boolean(rawGroup.search),
      table: Boolean(rawGroup.table),
      detail: Boolean(rawGroup.detail),
      order: Number(rawGroup.order) || 0,
      children: (rawGroup.children || []).map((child: any) => ({
        id: child.id || this.generateId(),
        name: child.name || '',
        type: child.type || 'string',
        search: Boolean(child.search),
        table: Boolean(child.table),
        detail: Boolean(child.detail),
        order: Number(child.order) || 0,
        parentId: rawGroup.id
      }))
    };
  }

  toValueDisplayModel(criteriaId: string, rawOverrides: any): ValueDisplayModel[] {
    if (!rawOverrides || typeof rawOverrides !== 'object') {
      return [];
    }
    
    return Object.entries(rawOverrides).map(([valueKey, override]: [string, any]) => ({
      criteriaId,
      valueKey,
      emoji: override?.emoji || '',
      displayText: override?.displayText
    }));
  }

  toApiPayload(document: ConfigDocumentModel): any {
    const payload = { ...document.extraProperties };

    // Convert criteria - use flat array format if original document used it
    if (document.criteriaGroups.length > 0) {
      if (document.metadata.usesFlatArrayFormat) {
        // Flat array format: [{ Version: {...} }, { Classification: {...} }]
        payload.criteria = [];
        document.criteriaGroups.forEach(group => {
          group.children.forEach(child => {
            const criteriaEntry: any = {};
            criteriaEntry[child.name] = {
              name: child.name,
              type: child.type,
              search: child.search,
              table: child.table,
              detail: child.detail,
              andSearch: child.andSearch,
              rangeSearch: child.rangeSearch,
              order: child.order,
              ...(child.placeholder !== undefined && child.placeholder !== '' && {
                placeholder: child.placeholder
              }),
              ...(child.description !== undefined && child.description !== '' && {
                description: child.description
              }),
              // Include any extra properties (values, referencedHeader, etc.)
              ...(child.extraProperties || {})
            };
            payload.criteria.push(criteriaEntry);
          });
        });
      } else {
        // Grouped format: { "General Info": { type: "group", children: {...} } }
        payload.criteria = document.criteriaGroups.reduce((acc, group) => {
          acc[group.name] = {
            type: group.type,
            search: group.search,
            table: group.table,
            detail: group.detail,
            order: group.order,
            ...(group.children.length > 0 && {
              children: group.children.reduce((childAcc, child) => {
                childAcc[child.id || child.name] = {
                  name: child.name,
                  type: child.type,
                  search: child.search,
                  table: child.table,
                  detail: child.detail,
                  andSearch: child.andSearch,
                  rangeSearch: child.rangeSearch,
                  order: child.order,
                  ...(child.placeholder !== undefined && child.placeholder !== '' && {
                    placeholder: child.placeholder
                  }),
                  ...(child.description !== undefined && child.description !== '' && {
                    description: child.description
                  }),
                  // Include any extra properties
                  ...(child.extraProperties || {})
                };
                return childAcc;
              }, {} as any)
            })
          };
          return acc;
        }, {} as any);
      }
    }

    // Convert value display overrides
    if (document.valueDisplayOverrides.size > 0) {
      payload.valueDisplay = {};
      document.valueDisplayOverrides.forEach((overrides, criteriaId) => {
        if (overrides.length > 0) {
          payload.valueDisplay[criteriaId] = overrides.reduce((acc, override) => {
            acc[override.valueKey] = {
              emoji: override.emoji,
              ...(override.displayText && { displayText: override.displayText })
            };
            return acc;
          }, {} as any);
        }
      });
    }

    return payload;
  }

  // Error handling
  retryWithBackoff<T>(source: Observable<T>, maxRetries: number = 3): Observable<T> {
    return source.pipe(
      retryWhen(errors =>
        errors.pipe(
          concatMap((error, index) => {
            if (index >= maxRetries) {
              return throwError(error);
            }
            const delayMs = Math.pow(2, index) * 1000;
            return timer(delayMs);
          })
        )
      )
    );
  }

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    
    console.error('HTTP Error:', errorMessage, error);
    this.errorsSubject.next(error);
    
    return throwError(errorMessage);
  }

  // Private helpers
  private transformApiResponseToModel(catalogItem: ConfigCatalogItem, response: any): ConfigDocumentModel {
    const criteriaGroups: CriteriaGroupModel[] = [];
    const valueDisplayOverrides = new Map<string, ValueDisplayModel[]>();
    const extraProperties: Record<string, any> = {};

    // Detect if original document uses flat array format
    // Flat array format: criteria is an array like [{ Version: {...} }, { Classification: {...} }]
    // Grouped format: criteria is an object like { "General Info": { type: "group", children: {...} } }
    const usesFlatArrayFormat = Array.isArray(response.parsedDocument?.criteria);

    criteriaGroups.push(
      ...this.buildCriteriaGroups(response.parsedDocument?.criteria)
    );

    // Extract value display overrides
    if (response.parsedDocument?.valueDisplay) {
      Object.entries(response.parsedDocument.valueDisplay).forEach(([criteriaId, rawOverrides]) => {
        const overrides = this.toValueDisplayModel(criteriaId, rawOverrides);
        if (overrides.length > 0) {
          valueDisplayOverrides.set(criteriaId, overrides);
        }
      });
    }

    // Extract extra properties (everything except criteria and valueDisplay)
    if (response.parsedDocument) {
      Object.entries(response.parsedDocument).forEach(([key, value]) => {
        if (key !== 'criteria' && key !== 'valueDisplay') {
          extraProperties[key] = value;
        }
      });
    }

    // Create the document model first
    const documentModel: ConfigDocumentModel = {
      id: catalogItem.id,
      encodedPath: catalogItem.encodedPath,
      criteriaGroups,
      valueDisplayOverrides,
      metadata: {
        lastModified: response.metadata?.lastModified || catalogItem.lastModified,
        size: response.metadata?.size || catalogItem.size,
        isSharedDefault: response.metadata?.isSharedDefault || catalogItem.isSharedDefault,
        isDatasetConfig: response.metadata?.isDatasetConfig || catalogItem.isDatasetConfig,
        ...(response.metadata?.datasetId && { datasetId: response.metadata.datasetId }),
        usesFlatArrayFormat
      },
      rawYaml: response.rawYaml || '',
      etag: response.etag || '',
      checksum: response.checksum || '',
      isDirty: false,
      extraProperties
    };

    // Skip YAML normalization entirely to avoid etag conflicts
    // The diff will show structural changes on first edit, but this is acceptable
    // and avoids 409 conflicts when saving
    // Note: We still skip normalization for the system default file
    // const isSystemDefault = catalogItem?.relativePath === 'configuration/comparison-default.yml';
    // if (!isSystemDefault && blueprintWasApplied) {
    //   documentModel.rawYaml = this.generatePreviewYaml(documentModel);
    // }

    return documentModel;
  }

  private buildCriteriaGroups(rawCriteria: any): CriteriaGroupModel[] {
    if (environment.debug) {
      console.log('[DEBUG] buildCriteriaGroups: Starting, enableBlueprintGrouping=', this.enableBlueprintGrouping);
    }

    // Load dataset-specific definitions
    const datasetDefinitions = this.flattenCriteriaDefinitions(rawCriteria);
    if (environment.debug) {
      console.log('[DEBUG] buildCriteriaGroups: Flattened', datasetDefinitions.size, 'definitions from document');
    }

    // Merge with shared definitions if blueprint grouping enabled
    let allDefinitions = datasetDefinitions;

    if (this.enableBlueprintGrouping && this.activeCriteriaBlueprint) {
      // Start with shared criteria
      allDefinitions = new Map(this.activeCriteriaBlueprint.sharedCriteria);
      if (environment.debug) {
        console.log('[DEBUG] buildCriteriaGroups: Loaded', allDefinitions.size, 'shared criteria definitions');
      }

      // Dataset definitions override shared
      datasetDefinitions.forEach((def, key) => {
        allDefinitions.set(key, def);
      });
      if (environment.debug) {
        console.log('[DEBUG] buildCriteriaGroups: After merge:', allDefinitions.size, 'total definitions');
      }
    }

    if (allDefinitions.size === 0) {
      return [
        {
          id: OTHER_CRITERIA_GROUP_ID,
          name: OTHER_CRITERIA_GROUP_NAME,
          type: 'group',
          search: false,
          table: false,
          detail: false,
          order: 0,
          children: []
        }
      ];
    }

    const groupDefinitionKeys = this.extractGroupDefinitionKeys(allDefinitions);

    const blueprintResult = this.enableBlueprintGrouping
      ? this.buildGroupsViaBlueprint(allDefinitions)
      : null;

    if (blueprintResult) {
      if (environment.debug) {
        console.log('[DEBUG] buildCriteriaGroups: Using blueprint result');
      }
      return this.appendUngroupedEntries(
        blueprintResult.groups,
        allDefinitions,
        blueprintResult.assignedChildren,
        groupDefinitionKeys
      );
    }

    if (environment.debug) {
      console.log('[DEBUG] buildCriteriaGroups: Using document-defined groups');
    }
    return this.buildGroupsFromDocumentDefinitions(allDefinitions, groupDefinitionKeys);
  }

  private flattenCriteriaDefinitions(rawCriteria: any): Map<string, any> {
    const definitions = new Map<string, any>();
    const register = (key: string, value: any) => {
      if (!key || !value || typeof value !== 'object') {
        return;
      }
      definitions.set(key, { ...value });
    };

    if (Array.isArray(rawCriteria)) {
      rawCriteria.forEach(entry => {
        if (!entry || typeof entry !== 'object') {
          return;
        }
        Object.entries(entry).forEach(([key, value]) => register(key, value));
      });
    } else if (rawCriteria && typeof rawCriteria === 'object') {
      Object.entries(rawCriteria).forEach(([key, value]) => register(key, value));
    }

    return definitions;
  }

  private resolveGroupChildren(
    parentId: string,
    childRefs: any[],
    definitions: Map<string, any>,
    assignedChildren: Set<string>,
    groupName?: string,
    missingReferences?: MissingReferenceInfo[]
  ): CriteriaEntryModel[] {
    const children: CriteriaEntryModel[] = [];

    childRefs.forEach(ref => {
      const resolved = this.resolveChildReference(ref, definitions);
      if (!resolved) {
        const refLabel =
          typeof ref === 'string' ? ref : JSON.stringify(ref ?? '');
        if (missingReferences) {
          missingReferences.push({
            group: groupName || parentId,
            reference: refLabel
          });
        } else {
          console.warn(
            `[ConfigWorkspaceService] Unable to resolve criteria reference "${refLabel}" for group "${groupName || parentId}".`
          );
        }
        return;
      }
      if (assignedChildren.has(resolved.key)) {
        console.warn(
          `[ConfigWorkspaceService] Criteria "${resolved.key}" already assigned; skipping duplicate reference in group "${groupName || parentId}".`
        );
        return;
      }
      assignedChildren.add(resolved.key);
      children.push(this.toCriteriaEntryModel(resolved.key, resolved.definition, parentId));
    });

    return children;
  }

  private resolveChildReference(
    ref: any,
    definitions: Map<string, any>
  ): { key: string; definition: any } | null {
    const possibleKeys: string[] = [];
    if (typeof ref === 'string') {
      possibleKeys.push(ref);
    } else if (ref && typeof ref === 'object') {
      if (ref.id) {
        possibleKeys.push(ref.id);
      }
      if (ref.key) {
        possibleKeys.push(ref.key);
      }
      if (ref.name) {
        possibleKeys.push(ref.name);
      }
    }

    for (const key of possibleKeys) {
      if (definitions.has(key)) {
        return { key, definition: definitions.get(key) };
      }
    }

    if (possibleKeys.length > 0) {
      const fallbackName = possibleKeys[possibleKeys.length - 1];
      for (const [key, definition] of definitions) {
        const defName = typeof definition.name === 'string' ? definition.name : '';
        if (defName.toLowerCase() === String(fallbackName).toLowerCase()) {
          return { key, definition };
        }
      }
    }

    return null;
  }

  private toCriteriaEntryModel(
    key: string,
    definition: any,
    parentId: string
  ): CriteriaEntryModel {
    // Extract all properties as extra properties first, then selectively extract known ones
    const extraProperties: Record<string, any> = { ...definition };

    // Remove known properties from extraProperties
    // We keep the original values for complex structures (objects) in extraProperties
    const knownSimpleProps = ['id', 'name', 'type', 'search', 'table', 'detail',
      'andSearch', 'rangeSearch', 'order'];

    knownSimpleProps.forEach(prop => delete extraProperties[prop]);

    // For placeholder and description, only delete if they're simple strings
    // If they're objects (like template/variables), keep in extraProperties
    if (definition.placeholder && typeof definition.placeholder === 'string') {
      delete extraProperties.placeholder;
    }
    if (definition.description && typeof definition.description === 'string') {
      delete extraProperties.description;
    }

    return {
      id: definition.id || key || this.generateId(),
      name: definition.name || key,
      type: definition.type || 'string',
      search: Boolean(definition.search),
      table: Boolean(definition.table),
      detail: Boolean(definition.detail),
      andSearch: Boolean(definition.andSearch),
      rangeSearch: Boolean(definition.rangeSearch),
      order: Number(definition.order) || 0,
      placeholder: this.parseStructuredField(definition.placeholder || ''),
      description: this.parseStructuredField(definition.description || ''),
      parentId,
      ...(Object.keys(extraProperties).length > 0 && { extraProperties })
    };
  }

  private findCatalogItem(encodedPath: string): ConfigCatalogItem | undefined {
    return this.rawCatalog.find(item => item.encodedPath === encodedPath);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private parseStructuredField(value: any): any {
    if (value == null || value === '') {
      return '';
    }
    if (typeof value === 'string') {
      return parseStructuredText(value);
    }
    return value;
  }

  private buildLabelValuesMap(valuesForm: any[]): Record<string, any> | null {
    if (!Array.isArray(valuesForm)) {
      return null;
    }
    const map: Record<string, any> = {};
    valuesForm.forEach(value => {
      const key = value?.valueKey?.toString().trim();
      if (!key) {
        return;
      }
      const entry: Record<string, any> = {};
      if (value.display) {
        entry.display = value.display;
      }
      if (value.color) {
        entry.color = value.color;
      }
      if (value.backgroundColor) {
        entry.backgroundColor = value.backgroundColor;
      }
      map[key] = Object.keys(entry).length > 0 ? entry : null;
    });
    return Object.keys(map).length > 0 ? map : null;
  }

  private logMissingReferenceSummary(
    message: string,
    refs: MissingReferenceInfo[]
  ): void {
    const sample = refs.slice(0, BLUEPRINT_MISSING_REF_SAMPLE);
    const formattedSample = sample
      .map(ref => `${ref.reference}→${ref.group}`)
      .join(', ');
    const remaining = Math.max(refs.length - sample.length, 0);
    const fullMessage = `${message} Missing references: ${formattedSample}${
      remaining > 0 ? ` … (+${remaining} more)` : ''
    }`;
    console.warn(`[ConfigWorkspaceService] ${fullMessage}`);
    this.alerts.warn(fullMessage);
  }
}
