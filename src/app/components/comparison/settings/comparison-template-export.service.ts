// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../../specs/app/components/comparison/comparison-template-export.spec.md
// (spec:578718f1) (code:e73a4798)

import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { ConfigurationService } from '../configuration/configuration.service';
import { FeatureGroupingService } from '../../output/feature-grouping.service';
import { DatasetManifestService, DatasetManifestEntry } from '../../datasets/dataset-manifest.service';
import { IUCAppState } from '../../../redux/uc.app-state';
import { FeatureGroupView } from '../../../models/feature-grouping.model';
import { Criteria } from '../../../../../lib/gulp/model/model.module';
import { buildTemplateDocument } from '../../../../../lib/comparison-template/template-builder.js';

@Injectable({
  providedIn: 'root'
})
export class ComparisonTemplateExportService {
  constructor(
    private configurationService: ConfigurationService,
    private featureGroupingService: FeatureGroupingService,
    private datasetManifestService: DatasetManifestService,
    private store: Store<IUCAppState>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Builds a Markdown template from the active dataset configuration
   * @returns Promise<string> The generated Markdown template content
   */
  async buildTemplate(): Promise<string> {
    try {
      const { template } = await this.buildTemplateContext();
      return template;
    } catch (error) {
      throw new Error(`Failed to build template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Downloads the generated template as a Markdown file
   * @returns Promise<void> Resolves when download is initiated
   */
  async downloadTemplate(): Promise<void> {
    try {
      const { template, dataset } = await this.buildTemplateContext();
      const filename = this.buildFilename(dataset);
      const blob = new Blob([template], { type: 'text/markdown;charset=utf-8' });
      this.triggerDownload(blob, filename);
    } catch (error) {
      throw new Error(`Failed to download template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private unwrapState(raw: any): IUCAppState {
    return raw && raw.state ? (raw.state as IUCAppState) : (raw as IUCAppState);
  }

  private buildFilename(dataset: DatasetManifestEntry): string {
    const normalizedId = dataset.id.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${normalizedId}-comparison-template.md`;
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url =
      this.document.defaultView?.URL.createObjectURL(blob) || URL.createObjectURL(blob);
    const a = this.document.createElement('a');
    a.href = url;
    a.download = filename;
    a.setAttribute('aria-label', `Download ${filename}`);
    this.document.body.appendChild(a);
    a.click();
    this.document.body.removeChild(a);
    (this.document.defaultView || window).URL.revokeObjectURL(url);
  }

  private async buildTemplateContext(): Promise<{
    template: string;
    dataset: DatasetManifestEntry;
  }> {
    // Ensure configuration is loaded
    if (!this.configurationService.configuration || !this.configurationService.configuration.criteria) {
      throw new Error('No dataset configuration loaded');
    }

    // Resolve dataset, raw state, and feature groups via firstValueFrom
    const [dataset, rawState, featureGroupsFromService] = await Promise.all([
      firstValueFrom(this.datasetManifestService.getActiveDataset()),
      firstValueFrom(this.store.select((state) => state)),
      firstValueFrom(this.featureGroupingService.getGroups())
    ]);

    if (!dataset) {
      throw new Error('No active dataset available');
    }

    const appState = this.unwrapState(rawState);
    const configured = this.configurationService.configuration.criteria || [];
    const declaredCriteria = configured.filter((criteria) => this.isDeclaredCriteria(criteria));

    const featureGroups =
      featureGroupsFromService && featureGroupsFromService.length > 0
        ? featureGroupsFromService
        : appState.featureGroups || [];

    // Build a lookup of all criteria from the store state
    const criteriaLookup = this.buildCriteriaLookup(appState.criterias);

    const allowedGroupKeys = this.collectConfigurationGroupIds(declaredCriteria);
    const filteredGroups = featureGroups
      .filter((group) => group && allowedGroupKeys.has(group.key));

    const configurationGroups =
      filteredGroups.length > 0
        ? filteredGroups
        : this.buildGroupsFromConfiguration(declaredCriteria, criteriaLookup);

    // Determine ungrouped criteria based on full configuration order
    const groupedIds = new Set<string>();
    const groupedCanonicalKeys = new Set<string>();
    configurationGroups.forEach((group) => {
      if (group?.key) {
        groupedIds.add(group.key);
        this.collectCanonicalKeysFromValue(group.key).forEach((key) => groupedCanonicalKeys.add(key));
      }
      (group.children || []).forEach((child) => {
        if (child?.id) {
          groupedIds.add(child.id);
        }
        this.collectCanonicalKeys(child).forEach((key) => groupedCanonicalKeys.add(key));
      });
    });
    const ungroupedCriteria = declaredCriteria.filter(
      (c) => {
        if (typeof c.id !== 'string' || groupedIds.has(c.id)) {
          return false;
        }
        const canonicalKeys = this.collectCanonicalKeys(c);
        return canonicalKeys.every((key) => !groupedCanonicalKeys.has(key));
      }
    );

    // Delegate Markdown assembly to shared builder
    const template = buildTemplateDocument(
      {
        id: dataset.id,
        displayLabel: dataset.displayLabel,
        shortDescription: dataset.shortDescription
      },
      configurationGroups,
      ungroupedCriteria,
      criteriaLookup,
      {
        introCriteria: this.extractIntroCriteria(criteriaLookup)
      }
    );

    return { template, dataset };
  }

  private canonicalKey(value?: string): string {
    if (!value) {
      return '';
    }
    return value.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  private collectCanonicalKeys(criteria?: Criteria): string[] {
    const keys = new Set<string>();
    if (criteria?.id) {
      const canonical = this.canonicalKey(criteria.id);
      if (canonical) {
        keys.add(canonical);
      }
    }
    if (criteria?.name) {
      const canonical = this.canonicalKey(criteria.name);
      if (canonical) {
        keys.add(canonical);
      }
    }
    return Array.from(keys);
  }

  private collectCanonicalKeysFromValue(value?: string): string[] {
    const canonical = this.canonicalKey(value);
    return canonical ? [canonical] : [];
  }

  private collectConfigurationGroupIds(criteriaList: Criteria[]): Set<string> {
    const ids = new Set<string>();
    criteriaList.forEach((criteria) => {
      if (criteria?.id && Array.isArray(criteria.children) && criteria.children.length > 0) {
        ids.add(criteria.id);
      }
    });
    return ids;
  }

  private buildGroupsFromConfiguration(criteriaList: Criteria[], criteriaLookup: Map<string, Criteria>): FeatureGroupView[] {
    return criteriaList
      .filter((criteria) => criteria?.id && Array.isArray(criteria.children) && criteria.children.length > 0)
      .map((criteria) => {
        const parent = criteriaLookup.get(criteria.id) || criteria;
        const childSet = new Set<string>();
        const children: Criteria[] = [];

        if (parent.search) {
          children.push(parent);
          childSet.add(parent.id);
        }

        (criteria.children || [])
          .map((childId) => criteriaLookup.get(childId))
          .filter((child): child is Criteria => !!child)
          .forEach((child) => {
            if (!childSet.has(child.id)) {
              children.push(child);
              childSet.add(child.id);
            }
          });

        return {
          key: criteria.id,
          displayName: criteria.name || criteria.id,
          label: {
            value: criteria.name || criteria.id,
            tooltip: criteria.description
          },
          children,
          isExcluded: false,
          isExpanded: criteria.defaultExpanded === true,
          defaultExpanded: criteria.defaultExpanded === true,
          primaryCriteria: parent.search ? parent : null
        } as FeatureGroupView;
      });
  }

  private buildCriteriaLookup(source: any): Map<string, Criteria> {
    const merged = new Map<string, Criteria>();

    if (source instanceof Map) {
      source.forEach((value: Criteria, key: string) => {
        if (value) {
          merged.set(key, value);
        }
      });
    } else if (Array.isArray(source)) {
      source.forEach((entry: any) => {
        if (entry && typeof entry.id === 'string') {
          merged.set(entry.id, entry);
        } else if (Array.isArray(entry) && entry.length >= 2 && entry[0]) {
          merged.set(entry[0], entry[1]);
        }
      });
    } else if (source && typeof source[Symbol.iterator] === 'function') {
      for (const entry of source as Iterable<any>) {
        if (Array.isArray(entry) && entry.length >= 2 && entry[0]) {
          merged.set(entry[0], entry[1]);
        } else if (entry && typeof entry.id === 'string') {
          merged.set(entry.id, entry);
        }
      }
    } else if (source && typeof source === 'object') {
      Object.keys(source).forEach((key) => {
        const value = (source as Record<string, Criteria>)[key];
        if (value) {
          merged.set(key, value);
        }
      });
    }

    (this.configurationService.configuration?.criteria || []).forEach((criteria) => {
      if (criteria?.id && !merged.has(criteria.id)) {
        merged.set(criteria.id, criteria);
      }
    });

    return merged;
  }

  private extractIntroCriteria(criteriaLookup: Map<string, Criteria>): {
    id?: Criteria;
    description?: Criteria;
  } {
    const intro: { id?: Criteria; description?: Criteria } = {};
    const idCriteria = criteriaLookup.get('id');
    if (idCriteria) {
      intro.id = idCriteria;
    }
    const descriptionCriteria = criteriaLookup.get('description');
    if (descriptionCriteria) {
      intro.description = descriptionCriteria;
    }
    return intro;
  }

  private isDeclaredCriteria(criteria: Criteria | undefined): criteria is Criteria {
    if (!criteria || !criteria.id) {
      return false;
    }
    if (criteria.id === 'id' || criteria.id === 'description') {
      return true;
    }
    return typeof criteria.name === 'string' && criteria.name.trim().length > 0;
  }
}
