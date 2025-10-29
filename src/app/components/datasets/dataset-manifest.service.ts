// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/datasets/dataset-manifest-service.spec.md
// (spec:1180367f) (code:78c7ec8a)

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, throwError, combineLatest } from 'rxjs';
import { map, shareReplay, catchError, tap } from 'rxjs/operators';

export interface DatasetManifestEntry {
  id: string;
  displayLabel: string;
  shortDescription?: string;
  description: string;
  assetDirectory: string;
  accentColor?: string;
  icon?: string;
  preferredTheme?: 'light' | 'dark';
  isDefault?: boolean;
  sources?: {
    dataDir?: string;
    dataDirs?: string[];
    config?: string;
    configDefaults?: string[];
    description?: string;
    style?: string;
    editBaseUrl?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DatasetManifestService {
  private readonly MANIFEST_URL = 'assets/configuration/datasets.manifest.json';
  private readonly STORAGE_KEY = 'uc-active-dataset';

  private manifestData$: Observable<DatasetManifestEntry[]>;
  private activeDatasetSubject = new BehaviorSubject<string | null>(null);
  private currentDatasets: DatasetManifestEntry[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.manifestData$ = this.loadManifest();
    this.initializeActiveDataset();
  }

  getDatasets(): Observable<DatasetManifestEntry[]> {
    return this.manifestData$;
  }

  getActiveDataset(): Observable<DatasetManifestEntry> {
    return combineLatest([
      this.manifestData$,
      this.activeDatasetSubject.asObservable()
    ]).pipe(
      map(([datasets, activeId]) => {
        if (activeId) {
          const found = datasets.find(d => d.id === activeId);
          if (found) {
            return found;
          }
        }
        return datasets.find(d => d.isDefault) || datasets[0];
      })
    );
  }

  setActiveDataset(id: string): void {
    this.activeDatasetSubject.next(id);
    this.saveToLocalStorage(id);
    this.updateRouterParams(id);
  }

  buildAssetPath(relativePath: string): string {
    const activeId = this.activeDatasetSubject.value;
    if (!activeId) {
      throw new Error('No active dataset selected');
    }
    const dataset = this.currentDatasets.find(d => d.id === activeId);
    if (!dataset) {
      throw new Error(`Dataset not found: ${activeId}`);
    }
    // Ensure single trailing slash on assetDirectory
    const dir = dataset.assetDirectory.replace(/\/+$/, '') + '/';
    const path = relativePath.replace(/^\/+/, '');
    return `${dir}${path}`;
  }

  private loadManifest(): Observable<DatasetManifestEntry[]> {
    return this.http
      .get<{ datasets: any[] }>(this.MANIFEST_URL)
      .pipe(
        map(response => response.datasets),
        tap(data => this.validateManifest(data)),
        map(data =>
          data.map(entry => ({
            id: entry.id,
            displayLabel: entry.displayLabel,
            shortDescription: entry.shortDescription,
            description: entry.description,
            assetDirectory: entry.assetDirectory,
            accentColor: entry.accentColor,
            icon: entry.icon,
            preferredTheme: entry.preferredTheme,
            isDefault: entry.isDefault,
            sources: entry.sources
          }))
        ),
        map(entries =>
          entries.sort((a, b) => a.displayLabel.localeCompare(b.displayLabel))
        ),
        tap(sorted => (this.currentDatasets = sorted)),
        shareReplay(1),
        catchError(error => {
          const message =
            error.status === 0
              ? 'Network error loading dataset manifest'
              : `Failed to load dataset manifest: ${error.message}`;
          return throwError(() => new Error(message));
        })
      );
  }

  private validateManifest(data: any[]): void {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Dataset manifest is empty or invalid');
    }
    const requiredFields = [
      'id',
      'displayLabel',
      'description',
      'assetDirectory'
    ];
    data.forEach((entry, index) => {
      requiredFields.forEach(field => {
        if (
          !(field in entry) ||
          entry[field] == null ||
          typeof entry[field] !== 'string'
        ) {
          throw new Error(
            `Dataset manifest entry at index ${index} missing required field: ${field}`
          );
        }
      });
    });
  }

  private initializeActiveDataset(): void {
    this.manifestData$.subscribe(datasets => {
      const queryParam = this.route.snapshot.queryParams['dataset'];
      const storedId = this.getFromLocalStorage();

      let selectedId: string | undefined;
      if (queryParam && datasets.some(d => d.id === queryParam)) {
        selectedId = queryParam;
      } else if (storedId && datasets.some(d => d.id === storedId)) {
        selectedId = storedId;
      } else {
        if (storedId) {
          this.clearLocalStorage();
        }
        const defaultEntry = datasets.find(d => d.isDefault);
        selectedId = defaultEntry ? defaultEntry.id : datasets[0]?.id;
      }

      if (selectedId) {
        this.activeDatasetSubject.next(selectedId);
      }
    });
  }

  private getFromLocalStorage(): string | null {
    try {
      return (
        this.document.defaultView?.localStorage.getItem(this.STORAGE_KEY) || null
      );
    } catch {
      return null;
    }
  }

  private saveToLocalStorage(id: string): void {
    try {
      this.document.defaultView?.localStorage.setItem(this.STORAGE_KEY, id);
    } catch {
      // ignore write errors
    }
  }

  private clearLocalStorage(): void {
    try {
      this.document.defaultView?.localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // ignore clear errors
    }
  }

  private updateRouterParams(datasetId: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { dataset: datasetId },
      queryParamsHandling: 'merge'
    });
  }
}
