// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../specs/app/models/config-document-model.spec.md
// (spec:03e3eb33) (code:76013231)

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
  andSearch: boolean;
  rangeSearch: boolean;
  order: number;
  placeholder?: string;
  description?: string;
  parentId?: string;
  extraProperties?: Record<string, any>;
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
  usesFlatArrayFormat?: boolean;
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

// Type guard for CriteriaGroupModel
export function isCriteriaGroupModel(obj: unknown): obj is CriteriaGroupModel {
  return (
    obj != null &&
    typeof obj === 'object' &&
    typeof (obj as any).id === 'string' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).type === 'string' &&
    typeof (obj as any).search === 'boolean' &&
    typeof (obj as any).table === 'boolean' &&
    typeof (obj as any).detail === 'boolean' &&
    typeof (obj as any).order === 'number' &&
    Array.isArray((obj as any).children) &&
    (obj as any).children.every((child: unknown) => isCriteriaEntryModel(child))
  );
}

// Type guard for CriteriaEntryModel
export function isCriteriaEntryModel(obj: unknown): obj is CriteriaEntryModel {
  return (
    obj != null &&
    typeof obj === 'object' &&
    typeof (obj as any).id === 'string' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).type === 'string' &&
    typeof (obj as any).search === 'boolean' &&
    typeof (obj as any).table === 'boolean' &&
    typeof (obj as any).detail === 'boolean' &&
    typeof (obj as any).andSearch === 'boolean' &&
    typeof (obj as any).rangeSearch === 'boolean' &&
    typeof (obj as any).order === 'number' &&
    (typeof (obj as any).placeholder === 'string' || (obj as any).placeholder === undefined) &&
    (typeof (obj as any).description === 'string' || (obj as any).description === undefined) &&
    (typeof (obj as any).parentId === 'string' || (obj as any).parentId === undefined)
  );
}

// Utility function to deep-clone a CriteriaGroupModel
export function cloneCriteriaGroup(group: CriteriaGroupModel): CriteriaGroupModel {
  return {
    id: group.id,
    name: group.name,
    type: group.type,
    search: group.search,
    table: group.table,
    detail: group.detail,
    order: group.order,
    children: group.children.map(cloneCriteriaEntry),
  };
}

// Utility function to clone a CriteriaEntryModel
export function cloneCriteriaEntry(entry: CriteriaEntryModel): CriteriaEntryModel {
  return {
    id: entry.id,
    name: entry.name,
    type: entry.type,
    search: entry.search,
    table: entry.table,
    detail: entry.detail,
    andSearch: entry.andSearch,
    rangeSearch: entry.rangeSearch,
    order: entry.order,
    placeholder: entry.placeholder,
    description: entry.description,
    parentId: entry.parentId,
    extraProperties: entry.extraProperties ? { ...entry.extraProperties } : undefined,
  };
}

// Factory helper to create an empty ConfigDocumentModel
export function createEmptyDocument(): ConfigDocumentModel {
  return {
    id: '',
    encodedPath: '',
    criteriaGroups: [],
    valueDisplayOverrides: new Map<string, ValueDisplayModel[]>(),
    metadata: {
      lastModified: '',
      size: 0,
      isSharedDefault: false,
      isDatasetConfig: false,
    },
    rawYaml: '',
    etag: '',
    checksum: '',
    isDirty: false,
    extraProperties: {},
  };
}

// Factory helper to create an empty CriteriaGroupModel
export function createEmptyCriteriaGroup(partial?: Partial<CriteriaGroupModel>): CriteriaGroupModel {
  return {
    id: partial?.id || '',
    name: partial?.name || '',
    type: partial?.type || '',
    search: partial?.search || false,
    table: partial?.table || false,
    detail: partial?.detail || false,
    order: partial?.order || 0,
    children: partial?.children || [],
  };
}

// Factory helper to create an empty CriteriaEntryModel
export function createEmptyCriteriaEntry(partial?: Partial<CriteriaEntryModel>): CriteriaEntryModel {
  return {
    id: partial?.id || '',
    name: partial?.name || '',
    type: partial?.type || '',
    search: partial?.search || false,
    table: partial?.table || false,
    detail: partial?.detail || false,
    andSearch: partial?.andSearch || false,
    rangeSearch: partial?.rangeSearch || false,
    order: partial?.order || 0,
    placeholder: partial?.placeholder,
    description: partial?.description,
    parentId: partial?.parentId,
    extraProperties: partial?.extraProperties,
  };
}
