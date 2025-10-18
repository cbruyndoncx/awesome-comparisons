# Comparison Component

Angular component that renders the main comparison view with paper cards, latex table, and filtering functionality. Manages the primary UI state and user interactions for the application.

## Target

[@describe](../../src/app/components/comparison/comparison.component.ts)

## Capabilities

### Template and Styling

Renders template and stylesheet from the same folder structure.

- Uses comparison.template.html as template
- Uses comparison.component.css for styling

### Singleton Registration

Registers itself as a static singleton instance for application-wide access.

- Implements static singleton pattern with ComparisonComponent.instance property
- Provides global access point to the component instance

### Configuration Loading

Loads configuration via ConfigurationService in the constructor to initialize component state.

### Component References

Maintains ViewChild references to child components for direct interaction.

- References LatexTableComponent for table operations
- References generic table header PaperCardComponent for paper display operations

### Repository Initialization

Initializes repository data and state management on component startup.

### Version Information Access

Provides VersionInformation getter to expose version data to the template.

### Search Criteria Handling

Manages search criteria changes and dispatches appropriate state updates.

- criteriaChanged method handles criteria value and type changes

### Active Item Mapping

Maps search state to selected items for display.

- getActive method maps search state and criteria to select items for UI display

### Details Display

Handles showing and closing paper details.

- showDetails method displays paper details by index
- closeDetails method hides paper details

### LaTeX Export

Exports the latex table data via file download using native browser APIs.

- latexDownload method triggers a Blob download for the LaTeX table output

### Deferred Updates

Manages deferred state updates for performance.

- deferredUpdate method handles delayed state changes

### Table Ordering

Manages table column ordering changes.

- changeOrder method handles table sort order changes with index and control key state

### Criteria Interaction

Handles user clicks on criteria elements.

- criteriaClicked method handles mouse events on criteria with label and index information

### State Management

Handles new state actions and updates.

- dispatchNewState method handles state transitions with new state data

## API

```typescript { .api }
export class ComparisonComponent {
  static instance: ComparisonComponent;
  
  repository: string;
  activeRow: DataElement = new DataElement('placeholder', '', '', new Map());
  detailsOpen = false;
  settingsOpen = false;
  changed = 0;
  versionInformation = new VersionInformation();
  
  @ViewChild(LatexTableComponent) latexTable: LatexTableComponent;
  @ViewChild('genericTableHeader') genericTableHeader: PaperCardComponent;
  
  constructor(
    public configurationService: ConfigurationService,
    private cd: ChangeDetectorRef,
    public store: Store<IUCAppState>
  );
  
  getVersionInformation(): VersionInformation;
  
  criteriaChanged(value: string, crit: Criteria): void;
  getActive(state: { state: IUCAppState }, crit: Criteria): any[];
  showDetails(index: number): void;
  deferredUpdate(): void;
  latexDownload(): string;
  changeOrder(change: { index: number; ctrl: boolean }): void;
  criteriaClicked(val: { event: MouseEvent; key: Label; index: number }): void;
  dispatchNewState(newState: any): void;
  closeDetails(): void;
}
```

## Dependencies

### Configuration Service

ConfigurationService for loading configuration data.
[@use](../../src/app/components/comparison/configuration/configuration.service)

### Change Detection

ChangeDetectorRef for managing component change detection.
[@use](../../package.json#@angular/core)

### Version Information

VersionInformation for accessing version data.
[@use](../../src/assets/VersionInformation.ts)

### Child Components

LatexTableComponent for latex table operations.
[@use](../../src/app/components/output/latex-table/latex-table.component)

PaperCardComponent for paper display operations.
[@use](../../src/app/components/polymer/paper-card/paper-card.component)

### ngrx Store and Actions

Store<IUCAppState> for state management and action dispatching.
[@use](../../src/app/redux/uc.action)

IUCAppState for application state typing.
[@use](../../src/app/redux/uc.app-state)

### Data Models

Model types for Criteria and Label.
[@use](../../../lib/gulp/model/model.module)

### Shared Utilities

Null-check helper for safe null/undefined validation.
[@use](../../src/app/shared/util/null-check.ts)

### Template Dependencies

Template hooks and data elements for rendering.
[@use](../../src/app/components/comparison/comparison.template.html)
