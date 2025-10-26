# Dataset Shell Component Template

The dataset shell component template provides the main UI layout for dataset selection and display.

## Target

[@generate](../../../../src/app/components/datasets/dataset-shell.component.html)

## Capabilities

### Container structure

Wraps entire UI in a `.dataset-shell` container that shows a selector region, dataset details, and the embedded comparison view.

### Selector region

Uses `*ngIf="(datasets$ | async) as datasets"` to render only when datasets are available and wraps the selector controls in `.dataset-shell__selector`. Replaces the select+card stack with a compact tab strip: a `<nav class="dataset-tabs" role="tablist">` containing buttons (`role="tab"`) for each dataset. Tabs expose `[attr.aria-selected]`, `[attr.aria-controls]`, and stable `id` values (`dataset-tab-<id>`) so assistive tech can track the active panel. Clicking (or pressing Enter/Space) triggers `onDatasetSelected(dataset.id)`; the tab’s `aria-selected` and `.is-active` class update automatically.

Each tab shows the dataset `displayLabel`, optional accent dot, and a one-line short description via `.dataset-tab__summary`. A subtle status line with `aria-live="polite"` acknowledges the current selection for screen readers.

### Dataset details region

Uses another `*ngIf="(activeDataset$ | async) as activeDataset"` to show heading inside `.dataset-details`, full description, and optional icon/accent badge (`.dataset-details__badge`) colorized via `[style.backgroundColor]` binding when manifest provides `accentColor`.

Renders dataset description as plain text inside a paragraph and includes fallback text when missing.

### Content region

If an active dataset exists, shows `<comparison></comparison>` beneath the selector so the existing comparison UI renders unchanged and includes a visually subtle `.dataset-status` (`aria-live="polite"`) confirmation of the active dataset.

If no dataset is available (manifest empty or failed), shows an error callout with recovery instructions rather than the comparison component, using `.dataset-error`.

### Loading state

Includes minimal empty state markup for loading inside `.dataset-empty` when manifest has not yet resolved.

### Accessibility features

Uses semantic headings (`<h2>`, `<h3>`) and accessible aria attributes where useful (e.g., `aria-live` for selection confirmation).

### Template logic constraints

Keeps template free of presentational logic beyond simple truncation via `dataset.description | slice:0:140` for card preview.

## API

```html { .api }
<div class="dataset-shell">
  <!-- Selector region -->
  <section class="dataset-shell__selector" *ngIf="(datasets$ | async) as datasets; else datasetLoading">
    <nav class="dataset-tabs" role="tablist" aria-label="Dataset selection" *ngIf="(activeDataset$ | async) as active">
      <button *ngFor="let dataset of datasets"
              type="button"
              class="dataset-tab"
              role="tab"
              [attr.id]="'dataset-tab-' + dataset.id"
              [attr.aria-controls]="'dataset-panel-' + dataset.id"
              [attr.aria-selected]="dataset.id === active?.id"
              [class.is-active]="dataset.id === active?.id"
              (click)="onDatasetSelected(dataset.id)">
        <span class="dataset-tab__label">
          <span class="dataset-tab__accent" *ngIf="dataset.accentColor" [style.backgroundColor]="dataset.accentColor"></span>
          {{dataset.displayLabel}}
        </span>
        <span class="dataset-tab__summary">{{dataset.shortDescription || (dataset.description | slice:0:90)}}</span>
      </button>
    </nav>
    <p class="dataset-status" aria-live="polite">
      Showing dataset: {{active?.displayLabel || 'Loading…'}}
    </p>
  </section>
  <ng-template #datasetLoading>
    <p class="dataset-empty" aria-live="polite">Loading datasets…</p>
  </ng-template>
  
  <!-- Dataset details region -->
  <section class="dataset-details"
           *ngIf="(activeDataset$ | async) as activeDataset"
           role="tabpanel"
           [attr.id]="'dataset-panel-' + activeDataset.id"
           [attr.aria-labelledby]="'dataset-tab-' + activeDataset.id">
    <h2>{{activeDataset.displayLabel}}</h2>
    <span class="dataset-details__badge" *ngIf="activeDataset.accentColor"
          [style.backgroundColor]="activeDataset.accentColor">
      {{activeDataset.shortDescription || 'Active'}}
    </span>
    <p>{{activeDataset.description || 'No description available'}}</p>
  </section>
  
  <!-- Content region -->
  <section *ngIf="(activeDataset$ | async) as active; else errorState" class="dataset-content">
    <comparison></comparison>
    <p class="dataset-status" aria-live="polite">
      Showing dataset: {{active.displayLabel}}
    </p>
  </section>
  
  <ng-template #errorState>
    <div class="dataset-error" role="alert">
      No dataset available. Please check configuration/datasets.manifest.json.
    </div>
  </ng-template>
</div>
```

## Dependencies

### Angular Template Directives

Leverages Angular structural directives (`*ngIf`, `*ngFor`) and common bindings for accessibility metadata.
[@use](../../../../package.json#@angular/core)
[@use](../../../../package.json#@angular/common)
