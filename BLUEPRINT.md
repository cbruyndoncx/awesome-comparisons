# Blueprint Grouping Inheritance Logic

## Overview

This document describes the complete inheritance logic flow for blueprint-based grouping in the configuration admin system. The system supports a hierarchical inheritance model where shared definitions are centralized and extended/updated, while individual dataset files hold unique criteria and can override shared definitions.

## Complete Inheritance Logic Flow

### Phase 1: Document Selection & Manifest Lookup

**Input:** User selects `datasets/code-editor/config/comparison.yml`

**Step 1.1:** Extract dataset ID from catalog item
- Catalog item has `datasetId: "code-editor"`

**Step 1.2:** Load dataset manifest entry
```typescript
// From configuration/datasets.manifest.json
{
  "id": "code-editor",
  "sources": {
    "config": "datasets/code-editor/config/comparison.yml",
    "configDefaults": [
      "configuration/comparison-default.yml",           // Shared criteria definitions
      "configuration/defaults/groups.yml",              // Shared grouping blueprint
      "configuration/defaults/groups-advanced.yml",     // Advanced grouping blueprint
      "configuration/defaults/value-displays.yml"       // Shared value displays
    ]
  }
}
```

### Phase 2: Load Files Based on Manifest

**Step 2.1:** Load the dataset-specific file
- **File:** `datasets/code-editor/config/comparison.yml`
- **Contains:**
  - Dataset-specific criteria definitions (e.g., VSCodeExt, JetBrainsExt)
  - Possibly overrides for shared criteria (e.g., custom labels for "License")
  - Extra properties (title, subtitle, etc.)

**Step 2.2:** Load all `configDefaults` files
For each file in `configDefaults` array:

**a) Shared Criteria Definitions:**
- **File:** `configuration/comparison-default.yml`
- **Contains:**
  - Common criteria definitions (ShortDescription, Description, Rating, License, etc.)
  - Template-based criteria (Text-Criteria, Rating-Criteria, Label-Criteria, etc.)
  - Default properties and configurations
  - These are the "base class" definitions

**b) Grouping Blueprints:**
- **Files:** `configuration/defaults/groups.yml`, `configuration/defaults/groups-advanced.yml`
- **Contains:**
  - Group structures with `children` arrays
  - Example from groups.yml:
    ```yaml
    criteria:
      - General:
          name: General Info
          type: MARKDOWN
          children:
            - Classification
            - Version
            - Repository
            - Rating
            - ShortDescription    # ← Reference to shared criteria
            - Description         # ← Reference to shared criteria
    ```
  - These define HOW to organize criteria, not the criteria themselves

**c) Value Displays:**
- **File:** `configuration/defaults/value-displays.yml`
- **Contains:**
  - Emoji and display text mappings for criteria values

### Phase 3: Build Merged Criteria Definitions Map

**Step 3.1:** Create definitions map structure
```typescript
const allDefinitions = new Map<string, any>();
```

**Step 3.2:** Load shared criteria from comparison-default.yml
```typescript
// Load configuration/comparison-default.yml
const sharedCriteria = parsedDocument?.criteria;
const sharedDefs = flattenCriteriaDefinitions(sharedCriteria);

// Add all shared definitions to map
sharedDefs.forEach((def, key) => {
  allDefinitions.set(key, def);
  // e.g., allDefinitions.set("ShortDescription", {...})
  //       allDefinitions.set("Rating", {...})
  //       allDefinitions.set("OperatingSystem", {...})
});
```

**Step 3.3:** Overlay dataset-specific criteria (override shared)
```typescript
// Load datasets/code-editor/config/comparison.yml
const datasetCriteria = parsedDocument?.criteria;
const datasetDefs = flattenCriteriaDefinitions(datasetCriteria);

// Dataset definitions OVERRIDE shared definitions
datasetDefs.forEach((def, key) => {
  allDefinitions.set(key, def);  // Overwrites if exists
  // e.g., allDefinitions.set("VSCodeExt", {...})  // New dataset-specific
  //       allDefinitions.set("License", {...})      // Overrides shared "License"
});
```

**Result:** `allDefinitions` now contains:
- All shared criteria from comparison-default.yml
- All dataset-specific criteria from code-editor/comparison.yml
- Dataset values take precedence where keys conflict

### Phase 4: Load Blueprint Group Structures

**Step 4.1:** Load blueprint files
```typescript
const blueprintSources = [
  {
    path: "configuration/defaults/groups.yml",
    parsedDocument: { criteria: [...] }
  },
  {
    path: "configuration/defaults/groups-advanced.yml",
    parsedDocument: { criteria: [...] }
  }
];
```

**Step 4.2:** Extract group definitions from blueprints
```typescript
blueprintSources.forEach(source => {
  const blueprintDefs = flattenCriteriaDefinitions(source.parsedDocument.criteria);
  // e.g., blueprintDefs = Map {
  //   "General" => { name: "General Info", children: ["Classification", "Version", ...] },
  //   "Licensing" => { name: "Licensing", children: ["Opensource", "License", ...] },
  //   "Deployment" => { name: "Deployment", children: ["BYOK", "OperatingSystem", ...] }
  // }
});
```

### Phase 5: Resolve Blueprint Children Against Merged Definitions

**Step 5.1:** For each blueprint group, resolve child references
```typescript
const group = {
  name: "General Info",
  children: ["Classification", "Version", "Repository", "Rating", "ShortDescription", "Description"]
};

const resolvedChildren = group.children.map(childRef => {
  // Look up in merged definitions (shared + dataset)
  const definition = allDefinitions.get(childRef);

  if (!definition) {
    missingReferences.push({ group: "General Info", reference: childRef });
    return null;
  }

  return {
    id: childRef,
    name: definition.name,
    type: definition.type,
    // ... all other properties from definition
  };
}).filter(Boolean);
```

**Step 5.2:** Check missing references ratio
```typescript
if (missingReferences.length > 0) {
  const ratio = missingReferences.length / resolvedChildren.length;

  if (ratio >= THRESHOLD) {
    // Too many missing - something went wrong, fallback
    console.warn("Too many missing references, falling back");
    return null;
  } else {
    // A few missing is okay - dataset might not use all shared criteria
    console.warn("Some missing references:", missingReferences);
    // Continue with what we have
  }
}
```

### Phase 6: Build Final Group Structure

**Step 6.1:** Create final groups array
```typescript
const finalGroups = [
  {
    id: "general",
    name: "General Info",
    type: "MARKDOWN",
    order: 10,
    children: [
      { id: "Classification", name: "Classification", ... },  // From shared
      { id: "Version", name: "Version", ... },                // From shared
      { id: "ShortDescription", name: "Short Description", ... }, // From shared
      // ... more
    ]
  },
  {
    id: "deployment",
    name: "Deployment",
    type: "MARKDOWN",
    order: 50,
    children: [
      { id: "BYOK", name: "BYOK", ... },                     // From dataset-specific
      { id: "VSCodeExt", name: "VS Code Extension", ... },   // From dataset-specific
      // ... more
    ]
  }
];
```

**Step 6.2:** Add ungrouped criteria (Other Criteria group)
```typescript
// Find criteria in allDefinitions that aren't in any blueprint group
const assignedIds = new Set(allGroups.flatMap(g => g.children.map(c => c.id)));
const ungrouped = [];

allDefinitions.forEach((def, key) => {
  if (!assignedIds.has(key) && !isGroupDefinition(def)) {
    ungrouped.push({ id: key, ...def });
  }
});

if (ungrouped.length > 0) {
  finalGroups.push({
    id: "__other__",
    name: "Other Criteria",
    children: ungrouped
  });
}
```

## File Content Summary

| File | Purpose | Contains |
|------|---------|----------|
| `comparison-default.yml` | Shared criteria definitions | Actual criteria properties (name, type, placeholder, etc.) |
| `groups.yml` | Basic grouping blueprint | Group structures with child references |
| `groups-advanced.yml` | Advanced grouping blueprint | Additional group structures |
| `value-displays.yml` | Shared value mappings | Emoji and display text for criteria values |
| `datasets/{id}/config/comparison.yml` | Dataset-specific config | Dataset criteria + overrides + extra properties |

## Merge Priority Rules

1. **Shared criteria loaded first** (comparison-default.yml)
2. **Dataset criteria loaded second and OVERRIDE shared**
3. **Blueprint groups reference the merged criteria**
4. **Missing references are warnings, not errors** (dataset may intentionally omit criteria)

## Two-Phase Loading Architecture

The system requires **two separate loading phases**:

### Phase A: Load Criteria Definitions
1. Load `comparison-default.yml` → extract all shared criteria
2. Load `datasets/{id}/config/comparison.yml` → extract dataset-specific criteria
3. Merge into single `allDefinitions` map (dataset overrides shared)

### Phase B: Load Group Blueprints
1. Load `groups.yml` + `groups-advanced.yml` → extract group structures
2. Resolve `children` references against `allDefinitions` from Phase A
3. Build final group hierarchy with resolved children

## Current Bug

**Location:** `src/app/components/config-admin/config-workspace.service.ts:890-893`

```typescript
private extractGroupingDefaults(entry: DatasetManifestEntry): string[] {
  if (!entry.sources?.configDefaults) {
    return [];
  }
  return entry.sources.configDefaults.filter(
    (path): path is string =>
      typeof path === 'string' && /groups.*\.ya?ml$/i.test(path)  // ← BUG: Only loads group files
  );
}
```

**Problem:** The regex `/groups.*\.ya?ml$/i` only matches files with "groups" in the name, which **excludes `comparison-default.yml`**. This means shared criteria definitions are never loaded into the merge, causing blueprint child resolution to fail.

**Impact:**
- Blueprint groups reference children defined in `comparison-default.yml`
- These children can't be resolved (not in `allDefinitions`)
- System reports "missing references" and falls back to document-defined groups
- Blueprint grouping functionality is effectively disabled

**Fix Required:**
1. Separate loading of criteria definitions from group blueprints
2. Load both `comparison-default.yml` and group blueprint files from `configDefaults`
3. Merge criteria definitions before resolving blueprint children
4. Pass merged `allDefinitions` to blueprint resolution logic

## Implementation Notes

### Current Implementation
Currently only loads group blueprint files:
- ✅ `groups.yml`
- ✅ `groups-advanced.yml`
- ❌ `comparison-default.yml` (excluded by regex)
- ❌ `value-displays.yml` (excluded by regex)

### Required Implementation
Should load and categorize all `configDefaults`:
- **Criteria files:** `comparison-default.yml` → merge into definitions
- **Blueprint files:** `groups*.yml` → use for group structure
- **Value display files:** `value-displays.yml` → merge into value displays

### Code Changes Needed

1. **Split `extractGroupingDefaults` into two methods:**
   - `extractCriteriaDefaults()` - returns criteria definition files
   - `extractGroupingDefaults()` - returns group blueprint files

2. **Modify `ensureDatasetBlueprint` to load both:**
   - Load criteria defaults and store in service
   - Load grouping blueprints (current behavior)

3. **Update `buildCriteriaGroups` to merge definitions:**
   - Load shared criteria from stored defaults
   - Merge with document criteria
   - Pass merged map to blueprint resolution

4. **Update `buildGroupsViaBlueprint` signature:**
   ```typescript
   // Current
   private buildGroupsViaBlueprint(definitions: Map<string, any>)

   // Should be
   private buildGroupsViaBlueprint(
     documentDefinitions: Map<string, any>,
     sharedDefinitions: Map<string, any>
   )

   // Or better: merge before calling
   private buildGroupsViaBlueprint(mergedDefinitions: Map<string, any>)
   ```

## Benefits of Correct Implementation

1. **Reduced duplication:** Shared criteria defined once, used by all datasets
2. **Consistent grouping:** All datasets use same group structure from blueprints
3. **Easy maintenance:** Update shared criteria in one place
4. **Flexible overrides:** Datasets can customize specific criteria
5. **Clear separation:** Structure (blueprints) separate from content (criteria)

## Example Scenario

**Shared criteria** (`comparison-default.yml`):
```yaml
criteria:
  - ShortDescription:
      name: Short Description
      type: markdown
      table: true
  - Rating:
      name: Rating
      type: rating
      table: false
```

**Blueprint** (`groups.yml`):
```yaml
criteria:
  - General:
      name: General Info
      children:
        - ShortDescription  # ← References shared
        - Rating           # ← References shared
```

**Dataset-specific** (`datasets/code-editor/config/comparison.yml`):
```yaml
criteria:
  - VSCodeExt:              # ← New dataset-specific
      name: VS Code Extension
      type: label
  - Rating:                 # ← Overrides shared (e.g., different labels)
      name: User Rating
      type: rating
      values:
        5: {display: "⭐⭐⭐⭐⭐"}
```

**Result after merge:**
```
allDefinitions = {
  "ShortDescription": { name: "Short Description", type: "markdown", ... },  // From shared
  "Rating": { name: "User Rating", type: "rating", values: {...} },          // Dataset override
  "VSCodeExt": { name: "VS Code Extension", type: "label", ... }             // Dataset-specific
}
```

**Final groups after blueprint resolution:**
```
groups = [
  {
    name: "General Info",
    children: [
      { id: "ShortDescription", name: "Short Description", ... },  // Resolved from shared
      { id: "Rating", name: "User Rating", ... }                   // Resolved from override
    ]
  }
]
```
