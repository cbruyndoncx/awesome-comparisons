# Configuration Loading & Merging Flow

## Step 1: Initialization (from datasets.manifest.json)

For each dataset:
- Read dataset ID and paths
- Resolve all configuration file paths
- Load data directory paths

### Example Dataset Entry:

```json
{
  "id": "code-editor",
  "config": "datasets/code-editor/config/comparison.yml",
  "configDefaults": [
    "configuration/comparison-default.yml",
    "configuration/defaults/general-licensing.yml",
    "configuration/defaults/groups-advanced.yml",
    "configuration/defaults/value-displays.yml"
  ]
}
```

---

## Step 2: Load Fallback Defaults

**Function:** `loadDefaultConfigurationFromPaths([dataset.fallbackDefaultConfig])`

```
Input File:  comparison-default.yml
             ↓
             Configuration.load(yaml, useDefaults=true)
             ↓
Output:      Configuration object (fallbackDefaults)
```

**Used as:** Context for filling null/undefined values during load phase

---

## Step 3: Load Shared Defaults

**Function:** `loadDefaultConfigurationFromPaths(dataset.sharedDefaultConfigs)`

```
Input Files: [
              comparison-default.yml,
              general-licensing.yml,
              groups-advanced.yml,
              value-displays.yml
            ]
             ↓
             Load each file sequentially:
             mergedConfig = null
             for each file:
               loaded = Configuration.load(file)
               mergedConfig = mergedConfig.combine(loaded) if exists
                            OR loaded
             ↓
Output:      Configuration object (sharedDefaults)
             All default files merged together
```

---

## Step 4: Load User Configuration

```
File:        datasets/code-editor/config/comparison.yml
             ↓
             Configuration.load(
               yaml,
               fallbackDefaults,     ← passed as context
               useDefaults=true
             )
             ↓
Output:      Configuration object (userConfigOverrides)
```

**Note:** Any null/undefined values are filled from fallbackDefaults context

---

## Step 5: Load Auto-Configuration

```
File:        configuration/comparison-auto-config.yml (if exists)
             ↓
             Configuration.load(
               yaml OR {},
               fallbackDefaults,
               useDefaults=true
             )
             ↓
Output:      Configuration object (autoConfig)
```

---

## Step 6-7: Final Merge (The Critical Part)

```
START: finalConfig = clone(userConfigOverrides)

     ┌──────────────────────────────────────────────┐
     │ userConfigOverrides (User Configuration)     │
     │ - Title: "AI Code Editors"                   │
     │ - Criteria: BYOK, Local Offline, FreeTrial... │
     └──────────────────────────────────────────────┘
                        ↓
              MERGE.combine(sharedDefaults)
                        ↓
     ┌──────────────────────────────────────────────┐
     │ After shared defaults merge:                 │
     │ - Null/undefined fields filled from defaults │
     │ - New criteria from defaults added           │
     │ - Existing values preserved                  │
     └──────────────────────────────────────────────┘
                        ↓
              MERGE.combine(autoConfig)
                        ↓
     ┌──────────────────────────────────────────────┐
     │ Final Configuration                          │
     │ (Ready to be written to comparison.json)    │
     └──────────────────────────────────────────────┘
```

---

## Merge Logic (Configuration.combine(other))

### For each property:

```
IF this.property === null or undefined THEN
  this.property = other.property
ELSE
  this.property = this.property  (keep existing)
END IF
```

### For criteria:

```
1. For each criteria in this.criteria:
   IF other has same criteria ID:
     THIS.criteria.combine(OTHER.criteria)  ← recursive merge
   END IF

2. For each criteria in other.criteria:
   IF this does NOT have same criteria ID:
     this.criteria.push(other.criteria)  ← add new
   END IF
```

**Result:** Non-destructive merge preserving highest-precedence values

---

## Precedence Hierarchy (Final)

```
Level 4 (Highest Priority - Wins if non-null)
  │
  ├─ User Configuration: datasets/{id}/config/comparison.yml
  │
Level 3
  │
  ├─ Shared Defaults: configDefaults in manifest (in order)
  │   ├─ groups-advanced.yml
  │   ├─ general-licensing.yml
  │   └─ value-displays.yml
  │
Level 2
  │
  ├─ Auto Configuration: comparison-auto-config.yml
  │
Level 1 (Lowest Priority - Used as fallback only)
  │
  └─ Fallback Defaults: comparison-default.yml
```

---

## Output

**Written to:** `dist/{datasetId}/comparison.json`
(or `dist/comparison.json` for default dataset)

This JSON file is then:
1. Copied to `assets/generated/{datasetId}/comparison.json`
2. Served to Angular app at runtime
3. Loaded by `ConfigurationService`

---

## Runtime Loading (Angular)

When user selects dataset:

1. `ConfigurationService.loadComparison(changeDetector)`
2. Observes dataset changes via `DatasetManifestService`
3. Loads pre-built assets:
   - `assets/generated/{datasetId}/comparison.json`
   - `assets/generated/{datasetId}/data.json`
4. Hydrates Configuration and Data models
5. **No additional merging** (already done at build time)
