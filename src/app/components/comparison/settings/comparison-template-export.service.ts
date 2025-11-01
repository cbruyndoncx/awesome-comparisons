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
    const featureGroups =
      featureGroupsFromService && featureGroupsFromService.length > 0
        ? featureGroupsFromService
        : appState.featureGroups || [];

    // Build a lookup of all criteria from the store state
    const criteriaLookup = this.buildCriteriaLookup(appState.criterias);

    // Determine ungrouped criteria based on full configuration order
    const configured = this.configurationService.configuration.criteria || [];
    const groupedIds = new Set<string>();
    featureGroups.forEach((group) =>
      (group.children || []).forEach((child) => {
        if (child?.id) {
          groupedIds.add(child.id);
        }
      })
    );
    const ungroupedCriteria = configured.filter((c) => c.id && !groupedIds.has(c.id));

    // Delegate Markdown assembly to shared builder
    const template = buildTemplateDocument(
      {
        id: dataset.id,
        displayLabel: dataset.displayLabel,
        shortDescription: dataset.shortDescription
      },
      featureGroups,
      ungroupedCriteria,
      criteriaLookup
    );

    return { template, dataset };
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
}
