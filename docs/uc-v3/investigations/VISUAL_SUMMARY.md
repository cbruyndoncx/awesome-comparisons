# Configuration Loading & Merging - Visual Summary

## Quick Answer Cheat Sheet

### Q1: How are default group configuration files loaded?
**A:** From `datasets.manifest.json`'s "configDefaults" array for each dataset

Example: `["comparison-default.yml", "groups-advanced.yml", "value-displays.yml"]`

Loaded via: `loadDefaultConfigurationFromPaths()` in `gulpfile.babel.js`

### Q2: How are they merged with dataset-specific comparison.yml?
**A:** User config is set first as base, then shared defaults fill null values

**Order:**
1. Load user config
2. Merge shared defaults
3. Merge auto-config

Merge via: `Configuration.combine(other)` in `configuration.js`

### Q3: Which file takes precedence?
**A:** Precedence Hierarchy (Highest to Lowest)

1. `datasets/{id}/config/comparison.yml` - **HIGHEST** (User wins)
2. `configuration/defaults/*.yml` - Medium (Fills nulls)
3. `configuration/comparison-auto-config.yml` - Lower
4. `configuration/comparison-default.yml` - **LOWEST** (Fallback)

### Q4: Where is this logic implemented?
**A:** Main Files:

- `/lib/gulp/gulpfile.babel.js` (lines 420-445) - **ORCHESTRATION**
- `/lib/gulp/model/configuration/configuration.js` (lines 115-136) - **MERGE LOGIC**
- `/configuration/datasets.manifest.json` - **CONFIGURATION SPEC**

---

## Configuration Merge Flow (Visual)

### Input: All Configuration Files (YAML)

```
/configuration/comparison-default.yml
  └─ System Defaults (fallback values for all criteria types)

/configuration/defaults/groups-advanced.yml
/configuration/defaults/general-licensing.yml
/configuration/defaults/value-displays.yml
  └─ Shared Defaults (grouping, licensing, displays)

/datasets/code-editor/config/comparison.yml
  └─ User Configuration (dataset-specific overrides)

/configuration/comparison-auto-config.yml
  └─ Auto Configuration (generated, lowest priority)
```

### Build Process (Gulp)

```
1. Read datasets.manifest.json
   ↓
2. For each dataset:
   ├─ Load fallback defaults (comparison-default.yml)
   ├─ Load shared defaults (configDefaults array)
   │  └─ Each file merged: config = config.combine(loaded)
   ├─ Load user config (datasets/{id}/config/comparison.yml)
   │  └─ Using fallbackDefaults as context for null filling
   ├─ Create finalConfig = clone(userConfig)
   ├─ finalConfig.combine(sharedDefaults)
   │  └─ Only fills null/undefined values from user config
   ├─ finalConfig.combine(autoConfig)
   │  └─ Lowest priority merge
   └─ Write finalConfig → /dist/{id}/comparison.json
   ↓
3. Copy to /src/assets/generated/{id}/comparison.json
```

### Merge Logic (The Core)

```
When: thisConfig.combine(otherConfig)

For each property:
  IF this.property is null OR undefined THEN
    this.property = other.property
  ELSE
    this.property = this.property (keep existing)
  END IF

Result: Non-destructive, null-preserving merge
```

### Output: Merged Configuration Files (JSON)

```
/dist/{datasetId}/comparison.json (per dataset)
  ├─ title (from dataset-specific or defaults)
  ├─ subtitle (from dataset-specific or defaults)
  ├─ criteria:
  │  ├─ BYOK (from dataset-specific + merged with defaults)
  │  ├─ LocalOffline (from dataset-specific + merged with defaults)
  │  ├─ Deployment (from shared defaults + dataset values)
  │  └─ ... (more criteria)
  └─ details (from defaults or dataset-specific)
```

### Runtime (Angular App)

```
1. Load /src/assets/generated/{datasetId}/comparison.json
   ↓
2. No additional merging (already done at build time)
   ↓
3. Hydrate Configuration and Data models
   ↓
4. Render UI with merged configuration
```

---

## Precedence Example

### Input Files:

**comparison-default.yml:**
```yaml
criteria:
  - MyField:
      name: "Default Name"
      search: true
      table: false
```

**groups-advanced.yml:**
```yaml
criteria:
  - MyField:
      table: true
      order: '10'
```

**code-editor/comparison.yml:**
```yaml
criteria:
  - MyField:
      name: "Custom Name"
```

### Build Process:

**Step 1:** Load userConfig with fallbackDefaults context
```
Result: {name: "Custom Name", search: true, table: false}
```

**Step 2:** finalConfig.combine(sharedDefaults)
```
Merges in: {table: true, order: '10'}
Result: {name: "Custom Name", search: true, table: true, order: '10'}
        ↑ name kept (non-null)     ↑ table merged (was null)
        ↑ search from defaults     ↑ order added (was null)
```

**Step 3:** finalConfig.combine(autoConfig)
```
No conflicts, nothing to merge
```

### Final Output:

```json
{
  "name": "Custom Name",   // FROM code-editor/comparison.yml (HIGHEST)
  "search": true,          // FROM comparison-default.yml (FALLBACK)
  "table": true,           // FROM groups-advanced.yml (SHARED)
  "order": "10"            // FROM groups-advanced.yml (SHARED)
}
```

---

## Key Code Locations (Absolute Paths)

### Critical Files:

**1. `/lib/gulp/gulpfile.babel.js`**
- Lines 420-445: `config()` function (MAIN ORCHESTRATION)
- Lines 201-211: `loadDefaultConfigurationFromPaths()` (DEFAULT LOADER)

**2. `/lib/gulp/model/configuration/configuration.js`**
- Lines 115-136: `combine(other)` method (MERGE LOGIC)
- Line 116: KEY LINE: `this.title = isNullOrUndefined(this.title) ? other.title : this.title;`

**3. `/configuration/datasets.manifest.json`**
- Central registry defining all datasets and their config chains

### Configuration Files:

1. `/configuration/comparison-default.yml`
2. `/configuration/defaults/groups-advanced.yml`
3. `/datasets/code-editor/config/comparison.yml`
4. And others per dataset...

### Runtime:

**1. `/src/app/components/comparison/configuration/configuration.service.ts`**
- Lines 154-344: `hydrateConfigurationPayload()` (LOADS MERGED JSON)

---

## The Merge Strategy in One Sentence

> "Start with user config, then fill any null/undefined values from shared defaults in order, using fallback defaults as ultimate context."

This allows each dataset to customize while benefiting from shared defaults.

---

## Why This Design Works

| Aspect | Benefit |
|--------|---------|
| **Consistency** | All datasets get common structure from shared defaults |
| **Flexibility** | Each dataset can override for its domain |
| **Maintainability** | Change defaults → updates all datasets |
| **Extensibility** | Add new defaults without code changes |
| **Safety** | No data loss, null-preserving merging |
| **Clarity** | Clear precedence rules prevent confusion |
