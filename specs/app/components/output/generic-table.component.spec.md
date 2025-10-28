# Generic Table Component

Angular component responsible for rendering the comparison matrix, including row-level actions for inspecting and editing individual entries.

## Target

[@describe](../../../../src/app/components/output/generic-table/generic-table.component.ts)

## Capabilities

### Comparison grid rendering

Displays the configured comparison criteria as a table with sortable headers and grouped columns.

- Uses provided `columns`, `columnKeys`, and `types` inputs to render each criterion cell
- Emits `orderChange` when a header is clicked so parent components can re-sort results
- Emits `showDetails` when the details icon is clicked so the parent can open the drawer
- Keeps group headers in sync with `FeatureGroupingService` group definitions

### Row action icons

Provides quick access controls for each comparison entry.

- Renders the existing info icon button to trigger the details dialog
- Adds a pen icon button next to the info button that links to the entry’s markdown edit URL (`DataElement.editLink`)
- Opens the edit link in a new browser tab with `rel="noopener noreferrer"` for safety
- Hides the edit icon when `editLink` is missing or empty so the UI never exposes a broken action
- Supplies descriptive `title` attributes (e.g. “Edit source”) for both icons to keep the controls accessible

### Criteria content presentation

Supports heterogeneous criterion types (markdown, rating, labels) within each row.

- Uses `sanitizeHtml` pipe for markdown-rendered cells to prevent XSS
- Displays repository link lists when the `REPOSITORY` type includes URLs
- Passes label color toggles through to the template based on `labelColorsEnabled`

## Dependencies

### Feature grouping

Relies on `FeatureGroupingService` to know which columns belong to the same logical group.
[@use](../../../../src/app/components/output/feature-grouping.service.ts)

### Polymer icon buttons

Uses the shared `picon-button` component for consistent icon button styling.
[@use](../../../../src/app/components/polymer/paper-icon-button/picon-button.component.ts)
