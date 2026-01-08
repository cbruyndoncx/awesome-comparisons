# Configuration Loading and Merging - Complete Analysis Summary

## Quick Answers to Your Questions

### 1. How are the default group configuration files loaded?

The default configurations are loaded in a multi-level process:

1. **Fallback Defaults** (`comparison-default.yml`)
   - Loaded first via `loadDefaultConfigurationFromPaths()`
   - Used as context during Configuration.load() to fill null/undefined values
   - Located at: `/configuration/comparison-default.yml`

2. **Shared Defaults** (`configDefaults` array)
   - Specified per-dataset in `datasets.manifest.json`
   - Example for "code-editor":
     ```json
     "configDefaults": [
       "configuration/comparison-default.yml",
       "configuration/defaults/general-licensing.yml",
       "configuration/defaults/groups-advanced.yml",
       "configuration/defaults/value-displays.yml"
     ]
     ```
   - Each file is loaded and merged in sequence
   - Merge logic: `mergedConfig = mergedConfig.combine(loaded)`

3. **Location in Code**:
   - `/lib/gulp/gulpfile.babel.js` lines 420-445 (config() function)
   - `/lib/gulp/gulpfile.babel.js` lines 201-211 (loadDefaultConfigurationFromPaths() helper)


### 2. How are they merged with dataset-specific comparison.yml files?

The merging happens in this specific order during the build process:

**Step-by-Step Merge Process** (from gulpfile.babel.js:420-445):

```
1. Load fallbackDefaults (comparison-default.yml)
   ↓
2. Load sharedDefaults (array of .yml files from manifest)
   ↓
3. Load userConfigOverrides (datasets/{id}/config/comparison.yml)
   - Uses fallbackDefaults as context to fill null values
   ↓
4. Clone userConfigOverrides → finalConfig
   ↓
5. finalConfig.combine(sharedDefaults)  ← Merge shared defaults
   ↓
6. finalConfig.combine(autoConfig)      ← Merge auto-config if exists
   ↓
7. Write finalConfig to dist/
```

**Key Implementation Details**:

- **Function**: `config()` in `/lib/gulp/gulpfile.babel.js` (lines 420-445)
- **Merge Method**: `Configuration.combine(other)` in `/lib/gulp/model/configuration/configuration.js` (lines 115-136)
- **Merge Strategy**: Non-destructive, null-preserving
  ```javascript
  // Only overwrites if current value is null/undefined
  this.title = isNullOrUndefined(this.title) ? other.title : this.title;
  ```


### 3. Which file takes precedence when there are conflicts?

**Precedence Hierarchy** (Highest to Lowest):

1. **HIGHEST**: `datasets/{datasetId}/config/comparison.yml` (User Configuration)
   - Set first as finalConfig base
   - Any non-null value prevents override
   - Example: `datasets/code-editor/config/comparison.yml`

2. **MEDIUM**: Shared Defaults (`configDefaults` array)
   - Applied via `finalConfig.combine(sharedDefaults)`
   - Only fills null/undefined values from user config
   - Files processed in order (later files override earlier)
   - Example: `groups-advanced.yml`, `value-displays.yml`

3. **LOWER**: Auto Configuration (`comparison-auto-config.yml`)
   - Applied via `finalConfig.combine(autoConfig)`
   - Only fills remaining null/undefined values
   - Lowest priority explicit merge

4. **LOWEST**: Fallback Defaults (`comparison-default.yml`)
   - Used ONLY during load time (as context)
   - Fills null values when Configuration.load(useDefaults=true)
   - Does NOT directly merge with final config
   - Only fills values that user config didn't provide

**Concrete Example**:

```yaml
# comparison-default.yml (Lowest)
criteria:
  - MyField:
      name: "Default Name"
      search: true
      table: false

# groups-advanced.yml (Medium)
criteria:
  - MyField:
      table: true
      order: '10'

# code-editor/comparison.yml (Highest)
criteria:
  - MyField:
      name: "Custom Name"
```

**Result After Merge**:
```javascript
{
  name: "Custom Name",     // From code-editor/comparison.yml (HIGHEST)
  search: true,            // From comparison-default.yml (filled during load)
  table: true,             // From groups-advanced.yml (MEDIUM)
  order: '10'              // From groups-advanced.yml (MEDIUM)
}
```

- `name`: User config value is preserved (non-null)
- `table`: User config was null, so filled from shared defaults
- `search`: User config was null, so filled from fallback defaults
- `order`: User config was null, so added from shared defaults


### 4. Where is this configuration resolution logic implemented?

**Core Implementation Files**:

1. **Build Script** (Main Entry Point)
   - `/lib/gulp/gulpfile.babel.js`
   - Lines 420-445: `config()` function - orchestrates the entire merge
   - Lines 201-211: `loadDefaultConfigurationFromPaths()` - loads and merges default files
   - Lines 110-163: `createDatasetContext()` - validates and resolves all paths

2. **Configuration Model** (Merge Logic)
   - `/lib/gulp/model/configuration/configuration.js`
   - Lines 115-136: `combine(other)` - main merge logic for configurations
   - Lines 60-76: `load()` - creates configuration with defaults as context
   - Lines 78-80: `empty()` - creates empty configuration

3. **Criteria Model** (Nested Merge Logic)
   - `/lib/gulp/model/criteria/criteria.js`
   - Lines 251-281: `combine(other)` - recursive merge for criteria definitions
   - Lines 199-234: `loadArray()` - loads criteria array with defaults
   - Lines 156-196: `load()` - loads individual criteria

4. **Utilities** (Helper Functions)
   - `/lib/gulp/model/util.js`
   - `isNullOrUndefined()` - determines if value should be overwritten
   - `deleteUndefinedKeys()` - cleans output JSON
   - `resolveDefault()` - processes template values

5. **Dataset Configuration Spec**
   - `/configuration/datasets.manifest.json`
   - Defines which configuration files each dataset uses
   - Specifies the `configDefaults` array order

6. **Angular Runtime Loading**
   - `/src/app/components/comparison/configuration/configuration.service.ts`
   - Lines 154-344: `hydrateConfigurationPayload()` - loads pre-built configs
   - Loads already-merged JSON (no additional merging at runtime)

7. **Default Configuration Files**
   - `/configuration/comparison-default.yml` - System defaults
   - `/configuration/defaults/groups-advanced.yml` - Grouping structures
   - `/configuration/defaults/general-licensing.yml` - License-related criteria
   - `/configuration/defaults/value-displays.yml` - Display value definitions


## Configuration File Locations

```
/configuration/
├── datasets.manifest.json                    ← Central registry
├── comparison-default.yml                    ← System defaults
├── comparison-auto-config.yml                ← Auto-generated config
├── defaults/
│   ├── groups-advanced.yml                   ← Shared grouping
│   ├── general-licensing.yml                 ← Shared licensing
│   └── value-displays.yml                    ← Shared displays
└── style.css

/datasets/
├── code-editor/
│   ├── config/
│   │   └── comparison.yml                    ← Dataset-specific
│   └── data/
├── terminal/
│   ├── config/
│   │   └── comparison.yml
│   └── data/
├── aie-model/
│   ├── config/
│   │   └── comparison.yml
│   └── data/
└── [other datasets...]

/dist/
├── code-editor/
│   └── comparison.json                       ← Generated (merged)
├── terminal/
│   └── comparison.json
└── [other datasets...]

/src/assets/generated/
├── code-editor/
│   └── comparison.json                       ← Copied to assets
├── terminal/
│   └── comparison.json
└── [other datasets...]
```


## Critical Code Sections

### The Merge Order is Everything

**File**: `/lib/gulp/gulpfile.babel.js` (lines 420-445)

```javascript
const finalConfig = cloneConfiguration(userConfigOverrides) || userConfigOverrides;
if (sharedDefaults) {
    finalConfig.combine(sharedDefaults);  // ← Second: merge shared
}
finalConfig.combine(autoConfig);           // ← Third: merge auto
```

**This order is critical**: User config must be set first, then only null values are filled.


### The Merge Logic

**File**: `/lib/gulp/model/configuration/configuration.js` (line 116)

```javascript
this.title = isNullOrUndefined(this.title) ? other.title : this.title;
```

**This is the key line**: Only overwrites if current value is null/undefined.


## How the System Works

1. **Build Time** (when you run npm build):
   - Gulp reads `datasets.manifest.json`
   - For each dataset, loads configuration files in precedence order
   - Merges them using `Configuration.combine()`
   - Writes merged JSON to `dist/` and copies to `assets/generated/`

2. **Runtime** (when user opens the app):
   - Angular loads pre-built `comparison.json` from assets
   - No additional merging (already done)
   - Uses ConfigurationService to hydrate Configuration objects
   - User selects dataset → loads corresponding pre-built JSON

3. **Precedence Rule**:
   - If a value is explicitly set (non-null) in user config, it wins
   - If it's null in user config, filled from defaults
   - Shared defaults provide base structure, user config customizes

## Why This Design?

This layered approach allows:
- **Consistency**: Shared defaults ensure common structure across datasets
- **Flexibility**: Each dataset can customize for its domain
- **Maintainability**: Changes to shared defaults update all datasets
- **Extensibility**: New configuration files can be added without code changes
- **Safety**: No data loss, non-destructive merging preserves all information

## Files to Read in Order

1. Start: `/configuration/datasets.manifest.json` - See what's configured
2. Pipeline: `/lib/gulp/gulpfile.babel.js` (config() at line 420)
3. Merge Logic: `/lib/gulp/model/configuration/configuration.js`
4. Criteria Merge: `/lib/gulp/model/criteria/criteria.js`
5. Example Config: `/datasets/code-editor/config/comparison.yml`
6. Defaults: `/configuration/comparison-default.yml`
7. Runtime: `/src/app/components/comparison/configuration/configuration.service.ts`

