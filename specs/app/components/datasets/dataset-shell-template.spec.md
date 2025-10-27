# Dataset Shell Component Template

The dataset shell component template provides the main UI layout for dataset selection and display.

## Target

[@generate](../../../../src/app/components/datasets/dataset-shell.component.html)

## Capabilities

### Container structure

Wraps entire UI in a `.dataset-shell` container that shows a selector region and the embedded comparison view.

### Selector region

Uses `*ngIf="(datasets$ | async) as datasets"` to render only when datasets are available and wraps the selector controls in `.dataset-shell__selector`. Replaces the select+card stack with a compact tab strip: a `<nav class="dataset-tabs" role="tablist">` containing buttons (`role="tab"`) for each dataset. Tabs expose `[attr.aria-selected]`, `[attr.aria-controls]`, and stable `id` values (`dataset-tab-<id>`) so assistive tech can track the active panel. Clicking (or pressing Enter/Space) triggers `onDatasetSelected(dataset.id)`; the tab’s `aria-selected` and `.is-active` class update automatically. The tab strip sits next to a `.dataset-theme-toggle` button group for changing themes.

Each tab shows the dataset `displayLabel`, optional accent dot, and a one-line short description via `.dataset-tab__summary`. A subtle status line with `aria-live="polite"` acknowledges the current selection for screen readers.

### Theme toggle control

Adds a `.dataset-theme-toggle` button group containing three icon buttons (light, dark, system) with `aria-pressed` states and tooltips. Buttons call `onThemeSelected(theme)` to invoke ThemeService. Includes a visually hidden status element (`aria-live="polite"`) to announce theme changes and reflect ThemeService output.

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
    <div class="dataset-shell__header" *ngIf="(activeDataset$ | async) as active">
      <nav class="dataset-tabs" role="tablist" aria-label="Dataset selection">
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
      <div class="dataset-theme-toggle" role="group" aria-label="Color theme">
        <button type="button"
                class="dataset-theme-toggle__button"
                [class.is-active]="(currentTheme$ | async) === 'light'"
                [attr.aria-pressed]="(currentTheme$ | async) === 'light'"
                title="Switch to light theme"
                (click)="onThemeSelected('light')">
          <span aria-hidden="true">☀️</span>
          <span class="sr-only">Light theme</span>
        </button>
        <button type="button"
                class="dataset-theme-toggle__button"
                [class.is-active]="(currentTheme$ | async) === 'dark'"
                [attr.aria-pressed]="(currentTheme$ | async) === 'dark'"
                title="Switch to dark theme"
                (click)="onThemeSelected('dark')">
          <span aria-hidden="true">🌙</span>
          <span class="sr-only">Dark theme</span>
        </button>
        <button type="button"
                class="dataset-theme-toggle__button"
                [class.is-active]="(currentTheme$ | async) === 'system'"
                [attr.aria-pressed]="(currentTheme$ | async) === 'system'"
                title="Follow system theme"
                (click)="onThemeSelected('system')">
          <span aria-hidden="true">🖥️</span>
          <span class="sr-only">System theme</span>
        </button>
      </div>
    </div>
    <p class="dataset-status" *ngIf="(activeDataset$ | async) as activeStatus" aria-live="polite">
      Showing dataset: {{activeStatus?.displayLabel || 'Loading…'}}
    </p>
    <p class="dataset-theme-status sr-only" aria-live="polite">
      Theme: {{(currentTheme$ | async) || 'system'}}
    </p>
  </section>
  <ng-template #datasetLoading>
    <p class="dataset-empty" aria-live="polite">Loading datasets…</p>
  </ng-template>
  
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
