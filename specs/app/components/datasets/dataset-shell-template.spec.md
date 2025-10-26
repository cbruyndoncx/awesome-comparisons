# Dataset Shell Component Template

The dataset shell component template provides the main UI layout for dataset selection and display.

## Target

[@generate](../../../../src/app/components/datasets/dataset-shell.component.html)

## Capabilities

### Container structure

Wraps entire UI in a `.dataset-shell` container that shows a selector region, dataset details, and the embedded comparison view.

### Selector region

Uses `*ngIf="(datasets$ | async) as datasets"` to render only when datasets are available and wraps the selector controls in `.dataset-shell__selector`. Provides a labeled `<select>` element with id `datasetSelect` that lists datasets as `<option>` values, binding `[value]="dataset.id"` and marking the currently active dataset as `selected` by comparing to `(activeDataset$ | async)?.id` captured via `ngIf as active`. The select emits `(change)` events that call `onDatasetSelected($event.target.value)` so keyboard users can switch datasets without using the cards.

Below the select, renders a `.dataset-card-list` (`role="list"`) of dataset cards using buttons (`type="button"`, `role="listitem"`) that show dataset displayLabel, shortDescription snippet, and optional icon/accent color indicator. Applies `.is-active` class when dataset is active and includes child elements with `.dataset-card__title` and `.dataset-card__summary`.

Buttons call `onDatasetSelected(dataset.id)` on click and disable themselves while that dataset is already active.

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
    <label class="dataset-shell__label" for="datasetSelect">Select Dataset</label>
    <select id="datasetSelect" class="dataset-shell__select" *ngIf="(activeDataset$ | async) as active"
            (change)="onDatasetSelected($any($event.target).value)">
      <option *ngFor="let dataset of datasets" 
              [value]="dataset.id" 
              [selected]="dataset.id === active?.id">
        {{dataset.displayLabel}}
      </option>
    </select>
    
    <div class="dataset-card-list" role="list">
      <button *ngFor="let dataset of datasets" class="dataset-card"
              type="button" 
              role="listitem"
              [class.is-active]="dataset.id === (activeDataset$ | async)?.id"
              [disabled]="dataset.id === (activeDataset$ | async)?.id"
              (click)="onDatasetSelected(dataset.id)">
        <div class="dataset-card__title">
          <span class="dataset-card__accent" *ngIf="dataset.accentColor" [style.backgroundColor]="dataset.accentColor"></span>
          {{dataset.displayLabel}}
        </div>
        <div class="dataset-card__summary">{{dataset.shortDescription || (dataset.description | slice:0:140)}}</div>
        <span class="dataset-card__icon" *ngIf="dataset.icon" aria-hidden="true">{{dataset.icon}}</span>
      </button>
    </div>
  </section>
  <ng-template #datasetLoading>
    <p class="dataset-empty" aria-live="polite">Loading datasets…</p>
  </ng-template>
  
  <!-- Dataset details region -->
  <section class="dataset-details" *ngIf="(activeDataset$ | async) as activeDataset">
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
