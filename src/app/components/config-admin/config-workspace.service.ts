// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/config-admin/config-workspace-service.spec.md
// (spec:f0fa0ab7) (code:20836fcc)

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, throwError, of, timer, combineLatest } from 'rxjs';
import { catchError, retry, debounceTime, map, tap, switchMap, retryWhen, take, delay, concatMap, finalize, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { stringify, parse, parseDocument, Document } from 'yaml';

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

type CatalogFilters = {
  datasetIds: string[];
  types: string[];
  searchText: string;
};






@Injectable({
  providedIn: 'root'
})
export class ConfigWorkspaceService {
  private readonly apiBaseUrl = '/api/config';
  
  // Internal subjects
  private activeDocumentSubject = new BehaviorSubject<ConfigDocumentModel | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private saveStatusSubject = new BehaviorSubject<SaveResult | null>(null);
  private errorsSubject = new BehaviorSubject<HttpErrorResponse | null>(null);
  private catalogSubject = new BehaviorSubject<ConfigCatalogItem[]>([]);
  

  
  // Raw catalog cache
  private rawCatalog: ConfigCatalogItem[] = [];
  
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

  constructor(private http: HttpClient) {
    // Initialize catalog on service creation
  }

  // Catalog operations
  refreshCatalog(): Observable<ConfigCatalogItem[]> {
    this.isLoadingSubject.next(true);

    return this.http.get<ConfigCatalogItem[]>(`${this.apiBaseUrl}/catalog`).pipe(
      retry(3),
      tap(catalog => {
        this.rawCatalog = catalog;
        this.catalogSubject.next(catalog);
        this.isLoadingSubject.next(false);
      }),
      catchError(error => {
        console.error('[ConfigWorkspaceService] HTTP request failed:', error);
        this.errorsSubject.next(error);
        this.isLoadingSubject.next(false);
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

            return {
              id: entryForm.id || existingEntry?.id || this.generateId(),
              name: entryForm.name || existingEntry?.name || '',
              type: entryForm.type || existingEntry?.type || '',
              search: !!entryForm.search,
              table: !!entryForm.table,
              detail: !!entryForm.detail,
              order:
                typeof entryForm.order === 'number'
                  ? entryForm.order
                  : childIndex,
              placeholder: entryForm.placeholder ?? existingEntry?.placeholder,
              description: entryForm.description ?? existingEntry?.description,
              parentId: groupId
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
    
    return this.http.get<any>(`${this.apiBaseUrl}/${catalogItem.encodedPath}`).pipe(
      map(response => this.transformApiResponseToModel(catalogItem, response)),
      catchError(error => {
        this.errorsSubject.next(error);
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
      return yamlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
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
    
    // Convert criteria groups
    if (document.criteriaGroups.length > 0) {
      payload.criteria = document.criteriaGroups.reduce((acc, group) => {
        acc[group.name] = {
          type: group.type,
          search: group.search,
          table: group.table,
          detail: group.detail,
          order: group.order,
          ...(group.children.length > 0 && {
            children: group.children.reduce((childAcc, child) => {
              childAcc[child.name] = {
                type: child.type,
                search: child.search,
                table: child.table,
                detail: child.detail,
                order: child.order
              };
              return childAcc;
            }, {} as any)
          })
        };
        return acc;
      }, {} as any);
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
    
    // Extract criteria groups
    if (response.parsedDocument?.criteria) {
      Object.entries(response.parsedDocument.criteria).forEach(([name, rawGroup]: [string, any]) => {
        criteriaGroups.push(this.toCriteriaGroupModel({
          id: this.generateId(),
          name,
          ...rawGroup
        }));
      });
    }
    
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
    
    return {
      id: catalogItem.id,
      encodedPath: catalogItem.encodedPath,
      criteriaGroups,
      valueDisplayOverrides,
      metadata: {
        lastModified: response.metadata?.lastModified || catalogItem.lastModified,
        size: response.metadata?.size || catalogItem.size,
        isSharedDefault: response.metadata?.isSharedDefault || catalogItem.isSharedDefault,
        isDatasetConfig: response.metadata?.isDatasetConfig || catalogItem.isDatasetConfig,
        ...(response.metadata?.datasetId && { datasetId: response.metadata.datasetId })
      },
      rawYaml: response.rawYaml || '',
      etag: response.etag || '',
      checksum: response.checksum || '',
      isDirty: false,
      extraProperties
    };
  }

  private findCatalogItem(encodedPath: string): ConfigCatalogItem | undefined {
    return this.rawCatalog.find(item => item.encodedPath === encodedPath);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
