# Configuration Document Models

Shared configuration admin models used across the ConfigWorkspaceService and Config Admin UI components. Provides TypeScript interfaces, type guards, utility functions, and factory helpers for configuration document manipulation.

## Target

[@generate](../../../src/app/models/config-document.model.ts)

## Capabilities

### Configuration Document Interfaces

Defines core interfaces mirroring workspace service contracts for configuration documents, criteria groups, criteria entries, value displays, metadata, save results, and validation errors.

- ConfigCatalogItem interface for catalog entries
- ConfigDocumentModel interface with criteria groups as arrays and value display overrides as `Map<string, ValueDisplayModel[]>` for richer operations while callers may transform to plain objects when serializing
- CriteriaGroupModel interface for grouping criteria
- CriteriaEntryModel interface for individual criteria
- ValueDisplayModel interface for display customization
- DocumentMetadata interface for document tracking
- SaveResult interface for save operation responses
- ValidationError interface for error reporting

### Type Guards

Provides runtime type checking functions to safely identify model types.

- isCriteriaGroupModel function validates CriteriaGroupModel objects
- isCriteriaEntryModel function validates CriteriaEntryModel objects

### Utility Functions

Implements side-effect free cloning utilities for immutable model manipulation.

- cloneCriteriaGroup function creates deep copies without mutating originals
- cloneCriteriaEntry function creates deep copies without mutating originals

### Factory Helpers

Provides simple factory functions for creating new model instances with sensible defaults.

- createEmptyDocument function initializes new ConfigDocumentModel structures
- createEmptyCriteriaGroup function initializes new CriteriaGroupModel structures
- createEmptyCriteriaEntry function initializes new CriteriaEntryModel structures

## API

```typescript { .api }
// Catalog entry metadata surfaced by the workspace API
export interface ConfigCatalogItem {
  id: string;
  encodedPath: string;
  datasetId: string | null;
  datasetLabel: string | null;
  relativePath: string;
  lastModified: string;
  size: number;
  isSharedDefault: boolean;
  isDatasetConfig: boolean;
}

// Full configuration document model consumed by the admin shell
export interface ConfigDocumentModel {
  id: string;
  encodedPath: string;
  criteriaGroups: CriteriaGroupModel[];
  valueDisplayOverrides: Map<string, ValueDisplayModel[]>;
  metadata: DocumentMetadata;
  rawYaml: string;
  etag: string;
  checksum: string;
  isDirty: boolean;
  extraProperties: Record<string, any>;
}

// Criteria group definition with ordering metadata
export interface CriteriaGroupModel {
  id: string;
  name: string;
  type: string;
  search: boolean;
  table: boolean;
  detail: boolean;
  order: number;
  children: CriteriaEntryModel[];
}

// Individual criteria entry definition
export interface CriteriaEntryModel {
  id: string;
  name: string;
  type: string;
  search: boolean;
  table: boolean;
  detail: boolean;
  order: number;
  placeholder?: string;
  description?: string;
  parentId?: string;
}

// Value display override metadata
export interface ValueDisplayModel {
  criteriaId: string;
  valueKey: string;
  emoji: string;
  displayText?: string;
}

// Document metadata provided by the backend
export interface DocumentMetadata {
  lastModified: string;
  size: number;
  isSharedDefault: boolean;
  isDatasetConfig: boolean;
  datasetId?: string;
}

// Save response model returned by the workspace API
export interface SaveResult {
  success: boolean;
  message: string;
  etag?: string;
  checksum?: string;
  errors?: ValidationError[];
}

// Validation error surfaced by client-side or server-side validation
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
  groupId?: string;
  criteriaId?: string;
}

// Type guard functions
export function isCriteriaGroupModel(obj: unknown): obj is CriteriaGroupModel;
export function isCriteriaEntryModel(obj: unknown): obj is CriteriaEntryModel;

// Utility functions for cloning
export function cloneCriteriaGroup(group: CriteriaGroupModel): CriteriaGroupModel;
export function cloneCriteriaEntry(entry: CriteriaEntryModel): CriteriaEntryModel;

// Factory helper functions
export function createEmptyDocument(): ConfigDocumentModel;
export function createEmptyCriteriaGroup(partial?: Partial<CriteriaGroupModel>): CriteriaGroupModel;
export function createEmptyCriteriaEntry(partial?: Partial<CriteriaEntryModel>): CriteriaEntryModel;
```

## Dependencies

### Angular Core Dependencies

Avoids importing Angular-specific modules to keep functions side-effect free and enable reuse across different contexts.
