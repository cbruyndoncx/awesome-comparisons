# Dataset Manifest Service

Service that manages dataset configurations for the multi-dataset shell, handling manifest loading, validation, active dataset selection, and asset path resolution.

## Target

[@generate](../../../../src/app/components/datasets/dataset-manifest.service.ts)

## Capabilities

### Load and validate dataset manifest

Loads configuration/datasets.manifest.json (copied to `assets/configuration/datasets.manifest.json`) via HttpClient once and caches the result. Manifest JSON is an object with a `datasets` array, so the service unwraps that collection, validates each entry (id, displayLabel, description, assetDirectory), and sorts results by displayLabel. Ignores build-only `sources` metadata while still passing it through when callers need to inspect it.

- Throws descriptive error on network failures
- Throws descriptive error when manifest is empty
- Uses shareReplay to avoid duplicate HTTP calls
- Validates required fields are present on all entries

### Provide dataset list access

Exposes validated dataset entries sorted by displayLabel through reactive API.

- getDatasets() returns Observable<DatasetManifestEntry[]> with entries sorted by displayLabel

### Manage active dataset selection

Resolves active dataset using priority order: URL query param 'dataset', localStorage value 'uc-active-dataset', entry marked isDefault, then first entry. Cleans invalid IDs from localStorage.

- getActiveDataset() returns Observable<DatasetManifestEntry> reflecting current selection
- Falls back to default entry when query/localStorage IDs are missing from manifest
- Cleans bad localStorage values when they don't match manifest entries

### Update active dataset

Provides setActiveDataset(id: string) that updates internal state, persists to localStorage, and syncs router query params.

- Updates BehaviorSubject for active dataset
- Writes to localStorage with key 'uc-active-dataset'
- Merges dataset query parameter into current route

### Emit change events

Emits change events when active dataset changes so other services can subscribe to updates.

### Build asset paths

Helper method buildAssetPath(relativePath: string) that prefixes the active dataset's assetDirectory (ensuring a single trailing slash) and guards against missing selection.

- Prefixes relativePath with active dataset's assetDirectory
- Guards against cases where no active dataset is selected
- Supports recommended default pattern of assets/generated/<datasetId>/

### Eager initialization

Service initializes state eagerly so shell components can subscribe immediately upon injection.

## API

```typescript { .api }
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
    config?: string;
    description?: string;
    style?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DatasetManifestService {
  getDatasets(): Observable<DatasetManifestEntry[]>;
  getActiveDataset(): Observable<DatasetManifestEntry>;
  setActiveDataset(id: string): void;
  buildAssetPath(relativePath: string): string;
}
```

## Dependencies

### Angular HttpClient
HTTP client for loading manifest JSON from assets.
[@use](../../../../package.json#@angular/common/http)

### Angular Core
Provides dependency injection metadata for the root-provided service.
[@use](../../../../package.json#@angular/core)

### Angular Router
Router and ActivatedRoute for managing dataset query parameters.
[@use](../../../../package.json#@angular/router)

### RxJS operators and types
BehaviorSubject for state management, shareReplay for caching, and Observable types.
[@use](../../../../package.json#rxjs)

### Document and localStorage
Browser APIs for local storage access and document injection.
[@use](../../../../package.json#@angular/common)
