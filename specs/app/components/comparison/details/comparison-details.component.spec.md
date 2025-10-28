# Comparison Details Component

Displays the full details dialog for a selected comparison entry, including grouped criteria sections and source metadata.

## Target

[@describe](../../../../../src/app/components/comparison/details/comparison.details.component.ts)

## Capabilities

### Header metadata rendering

Shows the entry title, URL, and associated labels when the dialog opens.

- Pulls label chips from the configured header reference and respects the global label color toggle
- Displays the primary repository or homepage link beneath the title when present
- Keeps the header text and labels in sync whenever the selected `DataElement` input changes

### Markdown edit link

Provides a direct shortcut to the markdown source for the entry so contributors can update content quickly.

- Reads the new `data.editLink` value created by `ConfigurationService`
- Renders a pen icon button (matching the table action) next to the URL in the header
- Opens the edit link in a new tab with `rel="noopener noreferrer"` for safety
- Hides the pen icon entirely when the `editLink` value is missing

### Section grouping and rendering

Organizes the remaining criteria into grouped and ungrouped sections for display.

- Builds grouped sections from parent criteria that list `children` values in the configuration
- Uses `FeatureGroupingService` metadata to decide which sections display together
- Supports multiple criteria types (labels, markdown, text, repository) by delegating to the appropriate template fragments
- Optionally renders label tooltips inline when `tooltipAsText` is enabled

## Dependencies

### Configuration service

Requires `ConfigurationService` for the loaded configuration metadata and criteria lookup helpers.
[@use](../../../../../src/app/components/comparison/configuration/configuration.service.ts)
