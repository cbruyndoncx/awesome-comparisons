# ConfigCatalogTreeComponent Template

Template for the configuration catalog tree component that renders the grouped catalog list plus loading and empty states.

## Target

[@generate](../../../../src/app/components/config-admin/config-catalog-tree.component.html)

## Capabilities

### Structure and States

- Wraps the catalog in a `<section>` with navigation semantics and an inner content container.
- Shows a centered Material spinner when `loading` is true.
- Displays an empty-state block with retry button when `groupedCatalog` is empty and not loading.
- Otherwise renders a scrollable `div` listbox with grouped entries using a standard `*ngFor`.

### Grouped List Rendering

- Iterates `groupedCatalog` with `trackBy: trackByEntry`, rendering headers when `group.isHeader` and buttons for catalog items otherwise.
- Catalog item buttons use `mat-list-item`, apply tooltip+ARIA attributes, emit `onSelectItem`, and highlight when selected.
- Each row displays the file name, dataset/shared chips, and an optional timestamp with icon.

### Footer Legend

- Shows a fixed legend explaining the dataset and shared chips.
- Uses Material chips for visual consistency.

## API

```html { .api }
<section class="config-catalog" role="navigation" aria-label="Configuration catalog">
  <div class="config-catalog__content">
    <div *ngIf="loading" class="loading-container">
      <mat-progress-spinner mode="indeterminate" diameter="48"></mat-progress-spinner>
    </div>

    <div *ngIf="!loading && groupedCatalog.length === 0" class="config-catalog__empty">
      <mat-icon class="empty-icon">folder_open</mat-icon>
      <h3>No configurations found</h3>
      <button mat-raised-button color="primary" (click)="onRetry()">Retry</button>
    </div>

    <div *ngIf="!loading && groupedCatalog.length > 0" class="config-list" role="listbox">
      <ng-container *ngFor="let group of groupedCatalog; trackBy: trackByEntry">
        <div class="group-header" *ngIf="group.isHeader">
          <h4>{{ group.label }}</h4>
        </div>
        <button
          *ngIf="!group.isHeader"
          mat-list-item
          (click)="onSelectItem(group.item)">
          <!-- item content -->
        </button>
      </ng-container>
    </div>
  </div>

  <div class="config-catalog__footer">
    <!-- legend chips -->
  </div>
</section>
```
## Dependencies

### Angular Core & Common

Structural directives (`*ngIf`, `*ngFor`) used to manage loading/list/empty states.  
[@use](@angular/core)  
[@use](@angular/common)

### Angular Material Components

Material spinner, icons, buttons, list styling, chips, and tooltips referenced by the template.  
[@use](@angular/material/button)  
[@use](@angular/material/chips)  
[@use](@angular/material/icon)  
[@use](@angular/material/list)  
[@use](@angular/material/progress-spinner)  
[@use](@angular/material/tooltip)
