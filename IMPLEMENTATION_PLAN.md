# Blueprint Grouping Implementation Plan

## Objective
Enable full blueprint grouping inheritance by loading and merging shared criteria definitions with dataset-specific definitions before resolving blueprint group children.

## Current State
- Blueprint grouping enabled but falling back to document-defined groups
- Only loads group blueprint files (groups*.yml)
- **Bug:** Shared criteria definitions (comparison-default.yml) never loaded
- Blueprint children can't be resolved → "missing references" → fallback

## Target State
- Load shared criteria from comparison-default.yml
- Merge with dataset-specific criteria (dataset overrides shared)
- Resolve blueprint children against merged definitions
- Display blueprint groups with both shared and dataset-specific criteria

## Implementation Phases

### Phase 1: Split File Extraction Methods
**File:** `src/app/components/config-admin/config-workspace.service.ts`

**Current Code (Line ~886-893):**
```typescript
private extractGroupingDefaults(entry: DatasetManifestEntry): string[] {
  if (!entry.sources?.configDefaults) {
    return [];
  }
  return entry.sources.configDefaults.filter(
    (path): path is string =>
      typeof path === 'string' && /groups.*\.ya?ml$/i.test(path)
  );
}
```

**New Implementation:**
```typescript
// Extract files containing criteria definitions
private extractCriteriaDefaults(entry: DatasetManifestEntry): string[] {
  if (!entry.sources?.configDefaults) {
    return [];
  }
  return entry.sources.configDefaults.filter(
    (path): path is string =>
      typeof path === 'string' &&
      !path.includes('groups') &&           // Not a grouping file
      !path.includes('value-display') &&    // Not a value display file
      path.endsWith('.yml')                 // Is a YAML file
  );
}

// Extract files containing group blueprints
private extractGroupingDefaults(entry: DatasetManifestEntry): string[] {
  if (!entry.sources?.configDefaults) {
    return [];
  }
  return entry.sources.configDefaults.filter(
    (path): path is string =>
      typeof path === 'string' && /groups.*\.ya?ml$/i.test(path)
  );
}
```

**Testing:**
- For code-editor manifest, should extract:
  - Criteria: `["configuration/comparison-default.yml"]`
  - Grouping: `["configuration/defaults/groups.yml", "configuration/defaults/groups-advanced.yml"]`

---

### Phase 2: Load Shared Criteria Definitions
**File:** `src/app/components/config-admin/config-workspace.service.ts`

**Add New Interface:**
```typescript
interface DatasetCriteriaBlueprint {
  datasetId: string;
  sharedCriteria: Map<string, any>;  // Merged from all criteria defaults
  loadedAt: number;
}
```

**Add New Cache:**
```typescript
// Near line 91, with other caches
private datasetCriteriaCache = new Map<string, DatasetCriteriaBlueprint>();
private activeCriteriaBlueprint: DatasetCriteriaBlueprint | null = null;
```

**Add New Method:**
```typescript
private ensureDatasetCriteria(catalogItem: ConfigCatalogItem): Observable<DatasetCriteriaBlueprint | null> {
  if (!this.enableBlueprintGrouping) {
    this.activeCriteriaBlueprint = null;
    return of(null);
  }

  const datasetId = catalogItem.datasetId;
  if (!datasetId) {
    this.activeCriteriaBlueprint = null;
    return of(null);
  }

  const cached = this.datasetCriteriaCache.get(datasetId);
  if (cached) {
    this.activeCriteriaBlueprint = cached;
    return of(cached);
  }

  return this.loadDatasetManifest().pipe(
    map(entries => entries.find(entry => entry.id === datasetId) || null),
    switchMap(entry => {
      if (!entry) {
        console.warn(
          `[ConfigWorkspaceService] Dataset "${datasetId}" not found in manifest.`
        );
        this.activeCriteriaBlueprint = null;
        return of(null);
      }

      const criteriaPaths = this.extractCriteriaDefaults(entry);
      if (criteriaPaths.length === 0) {
        const blueprint: DatasetCriteriaBlueprint = {
          datasetId,
          sharedCriteria: new Map(),
          loadedAt: Date.now()
        };
        this.datasetCriteriaCache.set(datasetId, blueprint);
        this.activeCriteriaBlueprint = blueprint;
        return of(blueprint);
      }

      const uniquePaths = Array.from(new Set(criteriaPaths));
      const fetchRequests = uniquePaths.map(path => this.fetchCriteriaDocument(path));

      return forkJoin(fetchRequests).pipe(
        map(results => {
          // Merge all shared criteria into single map
          const sharedCriteria = new Map<string, any>();

          results.forEach(result => {
            if (result?.parsedDocument?.criteria) {
              const defs = this.flattenCriteriaDefinitions(result.parsedDocument.criteria);
              defs.forEach((def, key) => {
                sharedCriteria.set(key, def);
              });
            }
          });

          const blueprint: DatasetCriteriaBlueprint = {
            datasetId,
            sharedCriteria,
            loadedAt: Date.now()
          };
          this.datasetCriteriaCache.set(datasetId, blueprint);
          this.activeCriteriaBlueprint = blueprint;

          console.log('[DEBUG] Loaded shared criteria for', datasetId, ':', sharedCriteria.size, 'definitions');
          return blueprint;
        })
      );
    }),
    catchError(error => {
      console.error(
        '[ConfigWorkspaceService] Failed to load dataset criteria defaults:',
        error
      );
      this.activeCriteriaBlueprint = null;
      return of(null);
    })
  );
}

private fetchCriteriaDocument(relativePath: string): Observable<{ parsedDocument: any } | null> {
  const encodedPath = this.encodeRelativePath(relativePath);
  if (!encodedPath) {
    console.warn(
      `[ConfigWorkspaceService] Unable to encode criteria path "${relativePath}", skipping.`
    );
    return of(null);
  }

  return this.http.get<any>(`${this.apiBaseUrl}/${encodedPath}`).pipe(
    map(response => ({
      parsedDocument: response?.parsedDocument || null
    })),
    catchError(error => {
      console.error(
        `[ConfigWorkspaceService] Failed to load criteria defaults from "${relativePath}":`,
        error
      );
      return of(null);
    })
  );
}
```

---

### Phase 3: Update Document Loading
**File:** `src/app/components/config-admin/config-workspace.service.ts`

**Modify `loadDocument` method (Line ~432):**
```typescript
loadDocument(catalogItem: ConfigCatalogItem): Observable<ConfigDocumentModel> {
  this.isLoadingSubject.next(true);
  const label = catalogItem?.relativePath || catalogItem?.encodedPath || 'document';
  this.alerts.info(`Loading ${label}…`);

  const load$ = this.enableBlueprintGrouping
    ? forkJoin({
        criteria: this.ensureDatasetCriteria(catalogItem),
        grouping: this.ensureDatasetBlueprint(catalogItem)
      }).pipe(
        switchMap(() => this.http.get<any>(`${this.apiBaseUrl}/${catalogItem.encodedPath}`))
      )
    : this.http.get<any>(`${this.apiBaseUrl}/${catalogItem.encodedPath}`);

  return load$.pipe(
    map(response => this.transformApiResponseToModel(catalogItem, response)),
    tap(() => this.alerts.info(`Loaded ${label}.`)),
    catchError(error => {
      this.errorsSubject.next(error);
      this.alerts.error(`Failed to load ${label}: ${error?.message || error}`);
      return throwError(error);
    }),
    tap(() => this.isLoadingSubject.next(false))
  );
}
```

---

### Phase 4: Merge Definitions Before Blueprint Resolution
**File:** `src/app/components/config-admin/config-workspace.service.ts`

**Modify `buildCriteriaGroups` method (Line ~1265):**
```typescript
private buildCriteriaGroups(rawCriteria: any): CriteriaGroupModel[] {
  console.log('[DEBUG] buildCriteriaGroups: Starting, enableBlueprintGrouping=', this.enableBlueprintGrouping);

  // Load dataset-specific definitions
  const datasetDefinitions = this.flattenCriteriaDefinitions(rawCriteria);
  console.log('[DEBUG] buildCriteriaGroups: Flattened', datasetDefinitions.size, 'definitions from document');

  // Merge with shared definitions if blueprint grouping enabled
  let allDefinitions = datasetDefinitions;

  if (this.enableBlueprintGrouping && this.activeCriteriaBlueprint) {
    // Start with shared criteria
    allDefinitions = new Map(this.activeCriteriaBlueprint.sharedCriteria);
    console.log('[DEBUG] buildCriteriaGroups: Loaded', allDefinitions.size, 'shared criteria definitions');

    // Dataset definitions override shared
    datasetDefinitions.forEach((def, key) => {
      allDefinitions.set(key, def);
    });
    console.log('[DEBUG] buildCriteriaGroups: After merge:', allDefinitions.size, 'total definitions');
  }

  if (allDefinitions.size === 0) {
    return [
      {
        id: OTHER_CRITERIA_GROUP_ID,
        name: OTHER_CRITERIA_GROUP_NAME,
        type: 'group',
        search: false,
        table: false,
        detail: false,
        order: 0,
        children: []
      }
    ];
  }

  const groupDefinitionKeys = this.extractGroupDefinitionKeys(allDefinitions);

  const blueprintResult = this.enableBlueprintGrouping
    ? this.buildGroupsViaBlueprint(allDefinitions)
    : null;

  if (blueprintResult) {
    console.log('[DEBUG] buildCriteriaGroups: Using blueprint result');
    return this.appendUngroupedEntries(
      blueprintResult.groups,
      allDefinitions,
      blueprintResult.assignedChildren,
      groupDefinitionKeys
    );
  }

  console.log('[DEBUG] buildCriteriaGroups: Using document-defined groups');
  return this.buildGroupsFromDocumentDefinitions(allDefinitions, groupDefinitionKeys);
}
```

---

### Phase 5: Clear Active Blueprints on Document Close
**File:** `src/app/components/config-admin/config-workspace.service.ts`

**Modify `clearActiveDocument` method (Line ~467):**
```typescript
clearActiveDocument(): void {
  this.activeDocumentSubject.next(null);
  this.clearDirtyState();
  this.activeGroupingBlueprint = null;
  this.activeCriteriaBlueprint = null;  // Add this line
}
```

---

## Testing Plan

### Test 1: Code-Editor Dataset
**Expected Shared Criteria:**
- ShortDescription, Description, Rating, Classification, etc. from comparison-default.yml

**Expected Blueprint Groups:**
- General Info (with ShortDescription, Description, etc.)
- Licensing
- Deployment
- Developer Experience
- Extensible

**Success Criteria:**
- ✅ No "missing references" warnings for shared criteria
- ✅ Blueprint groups display with resolved children
- ✅ Both shared and dataset-specific criteria appear
- ✅ Page remains responsive (no freeze)

### Test 2: AIE-Model Dataset
**Note:** This dataset doesn't use groups-advanced.yml

**Expected Behavior:**
- Only basic groups from groups.yml
- Shared criteria still loaded from comparison-default.yml

**Success Criteria:**
- ✅ Loads without groups-advanced.yml
- ✅ Shared criteria resolved correctly

### Test 3: Terminal Dataset
**Expected Behavior:**
- Full blueprint with advanced groups
- Dataset-specific criteria like MobileVersion

**Success Criteria:**
- ✅ All blueprint groups render
- ✅ Dataset-specific criteria appear in correct groups

---

## Rollback Plan

If issues occur:
1. Set `enableBlueprintGrouping = false` in config-workspace.service.ts:75
2. Rebuild and deploy
3. System reverts to document-defined grouping

---

## Success Metrics

1. **Zero missing reference warnings** for criteria defined in shared files
2. **Blueprint groups display** with full child lists
3. **No UI freeze** when loading any dataset
4. **Consistent behavior** across all 7 datasets

---

## Files to Modify

1. `src/app/components/config-admin/config-workspace.service.ts` - Main implementation
2. Test manually with Chrome DevTools
3. Update CURRENT_STATUS.md after successful implementation

---

## Estimated Effort

- **Implementation:** ~2-3 hours
- **Testing:** ~1 hour
- **Documentation:** ~30 minutes
- **Total:** ~4 hours
