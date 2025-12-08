// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/config-admin/config-catalog-tree-component.spec.md
// (spec:3620eb93) (code:49b6e784)

import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { ConfigCatalogItem } from '../../models/config-document.model';

type CatalogViewEntry =
  | { isHeader: true; label: string; datasetId?: string | null }
  | { isHeader: false; item: ConfigCatalogItem; fileName: string };

function isItemEntry(entry: CatalogViewEntry): entry is { isHeader: false; item: ConfigCatalogItem; fileName: string } {
  return !entry.isHeader;
}

@Component({
  selector: 'uc-config-catalog-tree',
  templateUrl: './config-catalog-tree.component.html',
  styleUrls: ['./config-catalog-tree.component.css']
})
export class ConfigCatalogTreeComponent implements OnInit {
  private _catalog: ConfigCatalogItem[] = [];
  @Input()
  get catalog(): ConfigCatalogItem[] {
    return this._catalog;
  }
  set catalog(value: ConfigCatalogItem[]) {
    console.log('[CatalogTree] Catalog input setter received:', value?.length ?? 0, 'items');
    this._catalog = value || [];
    this.refreshView();
  }

  @Input() selectedEncodedPath: string | null = null;
  @Input() isSaving = false;
  @Input() loading = false;

  @Output() drawerToggle = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();
  @Output() retry = new EventEmitter<void>();

  groupedCatalog: CatalogViewEntry[] = [];

  ngOnInit(): void {
    console.log('[CatalogTree] ngOnInit - initial catalog size:', this.catalog?.length ?? 0);
    // refreshView() is now called by the setter, so we don't need it here unless
    // the initial empty array needs processing. It's harmless to leave for now.
    this.refreshView();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.focusSearch();
    }
  }

  focusSearch(): void {
    const searchInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="Search configurations..."]'
    );
    searchInput?.focus();
  }

  onSelectItem(item: ConfigCatalogItem): void {
    if (!this.isSaving) {
      this.select.emit(item.encodedPath);
    }
  }

  onRetry(): void {
    this.retry.emit();
  }

  toggleFilterDrawer(): void {
    this.drawerToggle.emit();
  }

  trackByEntry(index: number, entry: CatalogViewEntry): string {
    return isItemEntry(entry) ? entry.item.encodedPath : `header-${entry.label}`;
  }

  isItemSelected(item: ConfigCatalogItem): boolean {
    return item.encodedPath === this.selectedEncodedPath;
  }

  formatLastModified(lastModified: string): string {
    const date = new Date(lastModified);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatTimestamp(lastModified: string): string {
    const date = new Date(lastModified);
    return date.toLocaleString(undefined, {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  getFileName(item: ConfigCatalogItem): string {
    return item.relativePath.split('/').pop() || item.relativePath;
  }

  private refreshView(): void {
    try {
      console.log('[CatalogTree] refreshView - catalog size:', this.catalog?.length ?? 0);
      const grouped = this.buildGroupedEntries(this.catalog ?? []);
      console.log('[CatalogTree] Grouped entries size:', grouped.length);
      this.groupedCatalog = grouped;
    } catch (error) {
      console.error('[CatalogTree] Error in refreshView:', error);
      this.groupedCatalog = [];
    }
  }

  private buildGroupedEntries(items: ConfigCatalogItem[]): CatalogViewEntry[] {
    console.log('[CatalogTree] buildGroupedEntries - input items:', items);
    const result: CatalogViewEntry[] = [];
    const shared = items.filter(item => item.isSharedDefault);
    if (shared.length > 0) {
      result.push({ isHeader: true, label: 'Shared Defaults' });
      shared
        .sort((a, b) => a.relativePath.localeCompare(b.relativePath))
        .forEach(item => {
          result.push({
            isHeader: false,
            item,
            fileName: this.getFileName(item)
          });
        });
    }

    const datasetBuckets = new Map<string, ConfigCatalogItem[]>();
    items
      .filter(item => !item.isSharedDefault)
      .forEach(item => {
        const key = item.datasetLabel || item.datasetId || 'Other Datasets';
        const bucket = datasetBuckets.get(key) || [];
        bucket.push(item);
        datasetBuckets.set(key, bucket);
      });

    Array.from(datasetBuckets.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([label, bucket]) => {
        const datasetId = bucket[0]?.datasetId;
        result.push({ isHeader: true, label, datasetId });
        bucket
          .sort((a, b) => a.relativePath.localeCompare(b.relativePath))
          .forEach(item => {
            result.push({
              isHeader: false,
              item,
              fileName: this.getFileName(item)
            });
          });
      });

    console.log('[CatalogTree] buildGroupedEntries - final result:', result);
    return result;
  }
}
