# ConfigAdminShellComponent

Angular orchestration component that coordinates catalog navigation, criteria editing, and diff preview for configuration YAML documents.

## Target

[@generate](../../../../src/app/components/config-admin/config-admin-shell.component.ts)

## Capabilities

### Workspace Orchestration

Subscribes to `ConfigWorkspaceService` streams to expose catalog entries, active document state, loading indicators, and dirty status to the template. Maintains a local snapshot of catalog items for quick lookup and tracks the currently selected document.

### Catalog Filtering & Selection

Accepts filter payloads from the catalog panel (dataset IDs, configuration types, search text) and forwards them to the workspace service. Handles selection requests by resolving the encoded path to a catalog entry and delegating loading to the workspace.

### Document Mutation Proxy

Receives partial updates from `ConfigCriteriaFormComponent` (criteria groups, entries, value displays) and applies them to the workspace working copy via `applyDocumentFormValue`, ensuring dirty state is flagged. Relays clone/delete/value-display events to the workspace service helpers.

### Preview & Diff Management

Tracks preview mode (`diff` vs `raw`), diff view mode (`unified` vs `split`), theme, and diff rendering options. Supplies the diff viewer component with the original/raw YAML and responds to option changes emitted by the viewer. Normalizes any undefined toggle emissions back to the default modes so Angular does not see transient `undefined` inputs even when the Material toggle briefly clears its value.

### Persistence & Navigation

Initiates document saves through the workspace service with optimistic locking, exposes a saving indicator, and reloads the catalog on success. Supports reverting unsaved changes, copy-to-clipboard for YAML, toggling preview mode, and emitting navigation requests once it is safe to leave the workspace.

### Metadata & Helpers

Provides allowed criteria types, computed YAML preview text, and summary helpers for total group/criteria counts to populate toolbar/status UI. Prompts the user when attempting to discard unsaved changes.

### Alert History & Diagnostics

Subscribes to `ConfigAlertService` so every informational/warning/error message emitted by the workspace appears in a persistent alert history panel. Exposes the alert stream to the template plus a `trackAlert` helper for efficient rendering, ensuring troubleshooting context remains visible even if the criteria editor becomes unresponsive.

## API

```typescript { .api }
import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigWorkspaceService } from './config-workspace.service';
import {
  ConfigCatalogItem,
  ConfigDocumentModel,
  CriteriaGroupModel,
  CriteriaEntryModel
} from '../../models/config-document.model';
import { DiffOptions } from './config-diff-viewer.component';

@Component({
  selector: 'uc-config-admin-shell',
  templateUrl: './config-admin-shell.component.html',
  styleUrls: ['./config-admin-shell.component.css']
})
export class ConfigAdminShellComponent implements OnInit, OnDestroy {
  // Observable streams for component state
  catalogItems$: Observable<ConfigCatalogItem[]>;
  selectedDocument$: Observable<ConfigDocumentModel | null>;
  isDirty$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  hasUnsavedChanges: boolean;
  isSaving$: Observable<boolean>;

  // Configuration metadata
  allowedTypes: string[];
  previewMode: 'diff' | 'raw';
  diffViewMode: 'unified' | 'split';
  diffTheme: 'light' | 'dark';
  diffOptions: DiffOptions;

  // Events emitted by the component
  @Output() configSaved = new EventEmitter<ConfigDocumentModel>();
  @Output() navigationRequested = new EventEmitter<string>();

  // Lifecycle hooks
  ngOnInit(): void;
  ngOnDestroy(): void;

  // Catalog interactions
  loadCatalog(): void;
  onCatalogFiltersChange(filters: { datasetIds: string[]; types: string[]; searchText: string }): void;
  onCatalogSelect(encodedPath: string): void;
  onCatalogDrawerToggle(): void;

  // Document mutation handling
  onDocumentChange(update: any): void;
  onCloneGroup(event: { sourceGroup: CriteriaGroupModel }): void;
  onCloneCriteria(event: { sourceCriteria: CriteriaEntryModel; groupId?: string; groupIndex?: number }): void;
  onDeleteGroup(event: { groupId: string }): void;
  onDeleteCriteria(event: { groupId?: string; groupIndex?: number; criteriaId: string }): void;
  onValueDisplayChange(event: { criteriaId: string; valueKey: string; emoji?: string; displayText?: string; action: 'add' | 'update' | 'remove' }): void;

  // Preview and diff adjustments
  onDiffViewModeChange(mode: 'unified' | 'split' | undefined | null): void;
  onPreviewModeChange(mode: 'diff' | 'raw' | undefined | null): void;
  onDiffOptionsChange(options: DiffOptions): void;

  // Persistence & navigation
  saveDocument(): void;
  discardChanges(): void;
  toggleDiffView(): void;
  copyYamlToClipboard(): void;
  refreshPreview(): void;
  close(): void;
  canDeactivate(): boolean;

  // Helpers
  get currentYaml(): string;
  getTotalGroups(document: ConfigDocumentModel): number;
  getTotalCriteria(document: ConfigDocumentModel): number;
}
```

## Dependencies

### ConfigWorkspaceService

Service providing catalog enumeration, document loading, and persistence helpers.  
[@use](../../services/config-workspace-service.spec.md)

### ConfigDiffViewerComponent

Diff viewer component offering unified/split view toggles.  
[@use](./config-diff-viewer-component.spec.md)

### ConfigCriteriaFormComponent

Criteria editing form component emitting document mutations.  
[@use](./config-criteria-form-component.spec.md)

### Config Admin Models

Shared model definitions consumed by the shell and child components.  
[@use](../../models/config-document-model.spec.md)

### Angular Common

Structural directives, pipes, and async pipe support used in the template.  
[@use](@angular/common)

### RxJS

Reactive utilities for combining and managing observable streams.  
[@use](rxjs)
