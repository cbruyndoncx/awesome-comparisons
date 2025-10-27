# Dataset Shell

Configuration-driven dataset wrapper that enables the app to host multiple related datasets without duplicating the comparison UI logic.

## Target

[@generate](../../../../src/app/components/datasets/dataset-shell.component.ts)

## Capabilities

### Manifest Loading & Validation

Loads the dataset manifest from configuration at startup and validates the structure.

- Loads configuration/datasets.manifest.json at application startup
- Validates that each dataset entry has required fields: id, display label, description, and asset directory
- Fails gracefully with meaningful error messages if manifest is malformed or missing
- Caches the validated manifest for the application lifetime

### Dataset Selection & Management

Manages the active dataset selection based on multiple input sources with proper precedence.

- Resolves active dataset from URL query parameter (dataset=foo), persisted user choice, or manifest default
- Exposes observable stream of the currently active dataset for reactive updates
- Persists user selections to localStorage for session continuity
- Updates route query parameters to maintain deep-link compatibility

### Dataset Switcher UI

Provides an intuitive interface for users to browse and select between available datasets.

- Renders dataset list as tab buttons showing display labels, descriptions, and accent colors
- Handles dataset activation through the manifest service
- Shows loading/empty states during dataset transitions

### Theme Toggle Integration

Adds ThemeService-powered controls next to the dataset selector.

- Subscribes to ThemeService observables to reflect current/resolved themes
- Renders icon buttons with aria-pressed states and tooltips for light/dark/system
- Announces theme changes via aria-live status text
- Calls `syncWithDataset` whenever the active dataset changes to respect `preferredTheme`

### Configuration Service Integration

Swaps HTTP base URLs dynamically based on the active dataset without requiring changes to existing components.

- Modifies ConfigurationService to load assets from `assets/generated/<datasetId>/comparison.json`
- Ensures ComparisonComponent receives dataset-aware configuration transparently
- Maintains backward compatibility with single-dataset usage patterns
- Handles configuration loading errors gracefully per dataset

### Build Process Enforcement

Ensures build-time validation and generation of multi-dataset assets.

- Validates that all datasets in manifest have corresponding generated bundles during `npm run build`
- Fails the build if any dataset is missing required generated files
- Places generated files under `src/assets/generated/<datasetId>/` structure
- Processes each dataset through MD_TO_JSON_COMMAND during gulp data preparation

## API

```typescript { .api }
@Component({
  selector: 'uc-dataset-shell',
  templateUrl: './dataset-shell.component.html',
  styleUrls: ['./dataset-shell.component.css']
})
export class DatasetShellComponent implements OnInit {
  datasets$: Observable<DatasetManifestEntry[]>;
  activeDataset$: Observable<DatasetManifestEntry>;
  currentTheme$: Observable<Theme>;
  resolvedTheme$: Observable<'light' | 'dark'>;
  
  constructor(private manifestService: DatasetManifestService,
              private themeService: ThemeService) {}
  
  onDatasetSelected(datasetId: string): void;
  onThemeSelected(theme: Theme): void;
}

interface DatasetManifestEntry {
  id: string;
  displayLabel: string;
  description: string;
  accentColor?: string;
  icon?: string;
  assetDirectory: string;
  preferredTheme?: 'light' | 'dark';
  isDefault?: boolean;
}
```

## Dependencies

### Dataset Manifest Service

Service for loading and managing dataset configuration and selection state.
[@use](../../../../src/app/components/datasets/dataset-manifest.service.ts)

### Dataset Manifest Configuration

JSON configuration file defining available datasets and their properties.
[@use](../../../../configuration/datasets.manifest.json)

### Comparison Component

Existing comparison UI component that will be wrapped by the dataset shell.
[@use](../../../../src/app/components/comparison/comparison.component.ts)

### Configuration Service

Service that loads comparison data and will be enhanced for dataset-aware asset loading.
[@use](../../../../src/app/components/comparison/configuration/configuration.service.ts)

### Theme Service

Service responsible for managing light/dark/system themes and announcing changes.
[@use](../../../../src/app/theme/theme.service.ts)

### Angular Core

Angular component primitives and decorators.
[@use](../../../../package.json#@angular/core)

### RxJS

Observable utilities for dataset streams.
[@use](../../../../package.json#rxjs)
