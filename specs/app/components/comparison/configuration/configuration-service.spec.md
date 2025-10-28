# Configuration Service

Angular service responsible for loading and processing comparison configuration data, including markdown content handling and data transformation for the comparison interface.

## Target

[@describe](../../../../../src/app/components/comparison/configuration/configuration.service.ts)

## Capabilities

### Load comparison configuration data

Loads configuration, data, and description files from HTTP endpoints and processes them into usable models. Fetches all assets relative to the active dataset returned by DatasetManifestService, reloading automatically whenever the dataset selection changes.

- Loads comparison.json configuration file [@test](./configuration-service.test.ts)
- Loads data.json data file [@test](./configuration-service.test.ts)
- Loads description.md markdown file [@test](./configuration-service.test.ts)
- Processes all files concurrently using Promise.all [@test](./configuration-service.test.ts)
- Triggers change detection after loading completes [@test](./configuration-service.test.ts)
- Subscribes to DatasetManifestService active dataset stream and refetches assets when the dataset changes

### Process markdown content

Converts markdown content to HTML and plain text formats for UI and export consumption.

- Converts markdown to HTML using the markdown helper [@test](./configuration-service.test.ts)
- Converts markdown to plain text for LaTeX/export output [@test](./configuration-service.test.ts)
- Returns empty string for null or undefined input [@test](./configuration-service.test.ts)

### Transform data elements

Processes loaded data elements to include HTML and LaTeX representations of their content.

- Builds HTML strings for data element descriptions [@test](./configuration-service.test.ts)
- Builds LaTeX strings for data element descriptions [@test](./configuration-service.test.ts)
- Processes criteria data based on type (MARKDOWN, RATING, LABEL, REPOSITORY) [@test](./configuration-service.test.ts)
- Converts label tooltips to HTML format [@test](./configuration-service.test.ts)
- Creates labelArray from label maps [@test](./configuration-service.test.ts)
- Carries forward the markdown `sourcePath` emitted in `data.json` and derives a public `editLink` for each `DataElement` by joining the dataset's `sources.dataDir` with that filename against a configurable base URL. Defaults to the repository URL declared in package.json (converted to the GitHub `blob/main/` viewer) when dataset or runtime overrides are absent.

### Manage application state

Updates NgRx store with processed configuration and settings data.

- Dispatches UCDataUpdateAction with criteria map [@test](./configuration-service.test.ts)
- Updates tooltip display settings based on configuration [@test](./configuration-service.test.ts)

### Filter and prepare criteria

Processes configuration criteria for search and display purposes.

- Filters criteria to include only searchable items [@test](./configuration-service.test.ts)
- Creates criteriaValues array with id, text, and criteriaValue properties [@test](./configuration-service.test.ts)

## API

```typescript { .api }
@Injectable()
export class ConfigurationService {
    public static data: Data;
    public description: string;
    public criteria: Array<Criteria>;
    public configuration: Configuration;
    public tableColumns: Array<string>;
    public criteriaValues: Array<Array<{ id: string, text: string, criteriaValue: CriteriaValue }>>;

    constructor(
        public title: Title,
        private http: HttpClient,
    private store: Store<IUCAppState>,
    private datasetManifestService: DatasetManifestService
    );

    static getHtml(markdown: string): string;
    static getLatex(text: string): string;
    
    public loadComparison(cd: ChangeDetectorRef): void;
}
```

## Dependencies

### Angular Core Services

Provides dependency injection, HTTP client, and browser title management.
[@use](@angular/core)
[@use](@angular/platform-browser)
[@use](@angular/common/http)

### NgRx Store

State management for storing processed configuration data.
[@use](@ngrx/store)

### Model Classes

Data models for configuration, criteria, and comparison data structures.
[@use](../../../../../lib/gulp/model/model.module)

### Redux State Management

Application state interfaces and actions for data updates.
[@use](../../../redux/uc.app-state)
[@use](../../../redux/uc.action)

### Utility Functions

Helper functions for null checking and validation.
[@use](../../../shared/util/null-check)

### Markdown Processing

Helper functions for converting markdown to HTML and plain text.
[@use](../../../shared/util/markdown)

### Dataset Manifest Service

Resolves active dataset metadata and asset paths for configuration loading.
[@use](../../datasets/dataset-manifest.service.ts)

### RxJS Utilities

Observables and operators for reacting to dataset selection changes.
[@use](../../../package.json#rxjs)
