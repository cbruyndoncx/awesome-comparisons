# ConfigWorkspaceService

Angular service that coordinates client-side data flow between the Config Admin GUI and the filesystem-backed workspace API.

## Target

[@generate](../../../../src/app/components/config-admin/config-workspace.service.ts)

## Capabilities

### Catalog Management

Fetches configuration catalog via `GET /api/config/catalog` and maintains cached observable stream.

- Loads complete catalog on service initialization
- Exposes `catalog$` observable with filtered and sorted catalog items
- Provides `refreshCatalog()` method for manual refresh
- Caches catalog results and handles network failures with retry logic

### Document Loading and State Management

Loads configuration documents via `GET /api/config/:encodedPath` and maintains active document state.

- Transforms API responses into strongly typed `ConfigDocumentModel` instances, normalizing both object and legacy array-based `criteria` definitions so group names show up correctly in the editor and routing ungrouped entries into an automatic “Other Criteria” bucket for authoring parity with the public settings dialog
- Preserves unrecognized YAML keys for round-trip persistence
- Maintains `activeDocument$` observable for currently selected document
- Tracks loading states with `isLoading$` and `saveStatus$` observables
- Handles document selection changes and clears dirty state appropriately

### Dataset Manifest & Blueprint Resolution

Fetches `configuration/datasets.manifest.json` once per document selection to resolve dataset-specific grouping defaults.

- Caches the manifest response and per-dataset grouping YAML (e.g., `configuration/defaults/groups-advanced.yml`) so repeated selections do not re-fetch files
- Clears the active blueprint cache when no document is selected to avoid stale associations
- Gracefully handles missing or malformed grouping files with console warnings while still loading the target document
- Applies blueprint-provided group definitions ahead of raw YAML parsing so code-editor/code-model datasets inherit the same grouping logic as the public website, falling back to the old “build from YAML children” routine if no blueprint data is available

### Working Copy Mutations

Provides methods to mutate the working copy of configuration documents.

- Add, clone, remove, and reorder criteria groups
- Add, clone, remove, and reorder criteria entries within groups
- Update value display overrides with emoji mappings
- Toggle search, table, detail, `andSearch`, and `rangeSearch` flags for criteria
- Automatically recompute ordering numbers and parent/child relationships
- Maintain dirty state tracking for unsaved changes

### YAML Preview Generation

Generates preview YAML from working copy using browser-compatible yaml package.

- Converts working `ConfigDocumentModel` back to YAML structure
- Preserves comments and formatting where possible
- Normalizes line endings to LF for consistency
- Exposes `generatePreviewYaml()` method for shell component preview panel

### Document Persistence

Implements optimistic locking save operations via `PUT /api/config/:encodedPath`.

- Sends both structured payload and raw YAML to backend
- Includes ETag header for optimistic concurrency control
- Handles 409 conflicts and 400 validation errors with detailed messages
- Updates cached metadata and refreshes catalog on successful save
- Emits toast-friendly success/error events via observables

### Error Handling and Recovery

Provides comprehensive error handling with actionable user messages.

- Distinguishes between client, network, and server errors
- Implements configurable retry logic with exponential backoff
- Surfaces rich error objects with context for UX messaging
- Provides `revertDocument()` to reload last persisted version
- Handles concurrent modification scenarios gracefully

### Type Safety and Utility Mapping

Exposes strongly typed interfaces and utility mappers for form components.

- Provides `toCriteriaGroupModel()` and `toValueDisplayModel()` mappers
- Ensures consistent typing across criteria forms and diff viewers
- Maintains type safety for configuration document transformations
- Exports interfaces for consumption by shell and child components

## API

```typescript { .api }
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, retry, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  ConfigCatalogItem,
  ConfigDocumentModel,
  CriteriaGroupModel,
  CriteriaEntryModel,
  ValueDisplayModel,
  DocumentMetadata,
  SaveResult,
  ValidationError
} from '../../../models/config-document.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigWorkspaceService {
  // Observable streams
  readonly catalog$: Observable<ConfigCatalogItem[]>;
  readonly activeDocument$: Observable<ConfigDocumentModel | null>;
  readonly isLoading$: Observable<boolean>;
  readonly saveStatus$: Observable<SaveResult | null>;
  readonly errors$: Observable<HttpErrorResponse | null>;

  constructor(private http: HttpClient) {}

  // Catalog operations
  refreshCatalog(): Observable<ConfigCatalogItem[]>;
  filterCatalog(filters: { datasetIds?: string[]; types?: string[]; searchText?: string }): void;
  applyDocumentFormValue(update: any): void;

  // Document operations
  loadDocument(catalogItem: ConfigCatalogItem): Observable<ConfigDocumentModel>;
  selectDocument(catalogItem: ConfigCatalogItem): void;
  clearActiveDocument(): void;
  revertDocument(): Observable<ConfigDocumentModel>;

  // Working copy mutations
  addCriteriaGroup(name: string, type: string): void;
  cloneCriteriaGroup(sourceGroup: CriteriaGroupModel): void;
  removeCriteriaGroup(groupId: string): void;
  reorderCriteriaGroups(fromIndex: number, toIndex: number): void;

  addCriteriaEntry(parentGroupId: string, name: string, type: string): void;
  cloneCriteriaEntry(sourceEntry: CriteriaEntryModel, targetGroupId: string): void;
  removeCriteriaEntry(groupId: string, entryId: string): void;
  reorderCriteriaEntries(groupId: string, fromIndex: number, toIndex: number): void;

  updateCriteriaFlags(itemId: string, flags: { search?: boolean; table?: boolean; detail?: boolean }): void;
  updateValueDisplayOverride(criteriaId: string, valueKey: string, emoji: string, displayText?: string): void;
  removeValueDisplayOverride(criteriaId: string, valueKey: string): void;

  // YAML operations
  generatePreviewYaml(document?: ConfigDocumentModel): string;
  validateYamlSyntax(yaml: string): ValidationError[];

  // Persistence
  saveDocument(): Observable<SaveResult>;
  hasUnsavedChanges(): boolean;
  markDocumentDirty(): void;
  clearDirtyState(): void;

  // Utility mappers
  toCriteriaGroupModel(rawGroup: any): CriteriaGroupModel;
  toValueDisplayModel(criteriaId: string, rawOverrides: any): ValueDisplayModel[];
  toApiPayload(document: ConfigDocumentModel): any;

  // Error handling
  retryWithBackoff<T>(source: Observable<T>, maxRetries?: number): Observable<T>;
  handleHttpError(error: HttpErrorResponse): Observable<never>;
}
```

## Dependencies

### Angular HTTP Client

HTTP client for making REST API calls to the configuration workspace server.
[@use](@angular/common/http)

### RxJS

Reactive extensions for managing observable streams and async operations.
[@use](rxjs)

### YAML Package

Browser-compatible YAML parser for generating preview YAML from working copies.
[@use](yaml)

### Config Admin Models

Shared type definitions for configuration documents and validation helpers.
[@use](../../models/config-document-model.spec.md)

### Config Workspace Server API

Backend API endpoints for catalog enumeration, document loading, and persistence.
[@use](../../../../lib/gulp/tasks/config-workspace-server.babel.js)
