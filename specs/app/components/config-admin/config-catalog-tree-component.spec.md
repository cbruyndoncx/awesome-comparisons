# ConfigCatalogTreeComponent

Component that renders the left-hand catalog panel for the Config Admin GUI, providing grouping, virtual scrolling, and selection of configuration entries.

## Target

[@generate](../../../../src/app/components/config-admin/config-catalog-tree.component.ts)

## Capabilities

### Catalog Input Handling

- Accepts `catalog`, `selectedEncodedPath`, `isSaving`, and `loading` inputs.
- Uses a getter/setter pair on `catalog` so async data pushes always rebuild the grouped entries without relying on `ngOnChanges`.

### Grouped Presentation

- Splits entries into a "Shared Defaults" header plus dataset-specific groups keyed by `datasetLabel`/`datasetId` with alphabetical sorting.
- Maintains a simple `groupedCatalog` array that the template renders directly (no async pipes required).

### Scrollable List and Selection

- Emits `select` events with an item's `encodedPath` when clicked, while `isSaving` temporarily disables interaction.
- Renders a lightweight scrollable list (no CDK virtual scroll) and exposes `trackByEntry` to minimize DOM churn.

### Metadata & Accessibility

- Shows dataset and "Shared" chips, last-modified timestamps, and file name labels with tooltips for the full path.
- Applies ARIA listbox/option roles and supports a `Ctrl+K` keyboard shortcut that focuses the search input via `focusSearch()`.

### Loading and Empty States

- Displays a Material spinner while `loading` is true and a friendly empty message with a retry button otherwise.
- Emits `retry` when the empty state button is pressed and surfaces a `drawerToggle` output so the shell can respond to responsive layout actions.

## API

```typescript { .api }
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { ConfigCatalogItem } from '../../models/config-document.model';

@Component({
  selector: 'uc-config-catalog-tree',
  templateUrl: './config-catalog-tree.component.html',
  styleUrls: ['./config-catalog-tree.component.css']
})
export class ConfigCatalogTreeComponent implements OnInit {
  private _catalog: ConfigCatalogItem[] = [];

  // Inputs
  @Input()
  get catalog(): ConfigCatalogItem[];
  set catalog(value: ConfigCatalogItem[]);
  @Input() selectedEncodedPath: string | null;
  @Input() isSaving: boolean;
  @Input() loading: boolean;

  // Outputs
  @Output() drawerToggle = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();
  @Output() retry = new EventEmitter<void>();

  // Internal state
  groupedCatalog: any[];

  // Lifecycle
  ngOnInit(): void;

  // Interaction handlers
  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void;
  focusSearch(): void;
  onSelectItem(item: ConfigCatalogItem): void;
  onRetry(): void;
  toggleFilterDrawer(): void;

  // Utilities
  trackByEntry(index: number, entry: any): string;
  formatLastModified(lastModified: string): string;
  getFileName(item: ConfigCatalogItem): string;
}
```

## Dependencies

### Config Admin Models

Shared catalog item definition imported by this component.  
[@use](../../models/config-document-model.spec.md)

### Angular Material

Chips, tooltips, and standard list/button primitives referenced by the template.  
[@use](@angular/material)

### Angular Core

Component metadata, lifecycle hooks, and DOM host listeners.  
[@use](@angular/core)
