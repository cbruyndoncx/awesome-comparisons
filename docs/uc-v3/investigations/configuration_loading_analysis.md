# Configuration Loading and Merging Analysis

## Overview
The awesome-comparisons project has a sophisticated multi-layer configuration loading and merging system. Configuration files are loaded, processed, and merged in a specific order to allow defaults to be overridden at multiple levels.

## Configuration Files Involved

### 1. Default Configuration Files (Loaded First)
- **Primary Default**: `/configuration/comparison-default.yml`
  - Contains system-wide defaults for all criteria
  - Defines default criteria types (default-id, default-description, default-text, default-rating, default-label, default-markdown, etc.)
  - Sets base configuration for title, subtitle, repository, details, etc.

- **Shared Default Configurations**: Specified per-dataset in `datasets.manifest.json`
  - Example from the manifest (code-editor dataset):
    ```json
    "configDefaults": [
      "configuration/comparison-default.yml",
      "configuration/defaults/general-licensing.yml",
      "configuration/defaults/groups-advanced.yml",
      "configuration/defaults/value-displays.yml"
    ]
    ```
  - These are loaded and merged in order

### 2. Dataset-Specific Configuration
- **Location**: `datasets/{datasetId}/config/comparison.yml`
- **Examples**:
  - `datasets/code-editor/config/comparison.yml`
  - `datasets/terminal/config/comparison.yml`
  - `datasets/aie-model/config/comparison.yml`
  - etc.
- These override/extend the default configurations

### 3. Auto-Generated Configuration
- **Location**: `configuration/comparison-auto-config.yml` (or dataset-specific auto-config)
- Generated automatically during configuration management
- Applied last, can override both defaults and user config

## Configuration Loading Pipeline

### File: `/lib/gulp/gulpfile.babel.js` (Build Script)

The `config()` function (lines 420-445) orchestrates the loading and merging:

```javascript
function config() {
    datasetContexts.forEach(dataset => {
        // Step 1: Load fallback defaults (comparison-default.yml)
        const fallbackDefaults = loadDefaultConfigurationFromPaths([dataset.fallbackDefaultConfig]);
        
        // Step 2: Load shared defaults (additional .yml files)
        const sharedDefaults = loadDefaultConfigurationFromPaths(dataset.sharedDefaultConfigs);
        
        // Step 3: Load user configuration (dataset-specific comparison.yml)
        const userConfigOverrides = Configuration.load(
            yaml2json.safeLoad(readFileSync(dataset.sources.config, "utf8")),
            fallbackDefaults,  // fallback defaults used during loading
            true               // useDefaults flag
        );
        
        // Step 4: Load auto-config if it exists
        const autoConfigSource = existsSync(dataset.files.autoConfig)
            ? yaml2json.safeLoad(readFileSync(dataset.files.autoConfig, "utf8"))
            : {};
        const autoConfig = Configuration.load(autoConfigSource, fallbackDefaults, true);
        
        // Step 5: Start with user config as final base
        const finalConfig = cloneConfiguration(userConfigOverrides) || userConfigOverrides;
        
        // Step 6: Combine shared defaults into final config
        if (sharedDefaults) {
            finalConfig.combine(sharedDefaults);
        }
        
        // Step 7: Combine auto-config into final config
        finalConfig.combine(autoConfig);
        
        // Step 8: Prune reserved criteria
        pruneReservedCriteria(finalConfig);
        
        // Step 9: Write final config to dist/
        writeFileSync(configOutput, JSON.stringify(finalConfig.json()), "utf8");
    });
    return Promise.resolve();
}
```

### Helper: `loadDefaultConfigurationFromPaths()`

```javascript
function loadDefaultConfigurationFromPaths(configPaths) {
    const effectivePaths = uniqueEntries((configPaths || []).filter(Boolean));
    const pathsToLoad = effectivePaths.length > 0 ? effectivePaths : [files.defaultConfig];
    let mergedConfig = null;
    
    pathsToLoad.forEach(filePath => {
        const source = yaml2json.safeLoad(readFileSync(filePath, "utf8"));
        const loaded = Configuration.load(source);
        // Merge each file in sequence
        mergedConfig = mergedConfig ? mergedConfig.combine(loaded) : loaded;
    });
    return mergedConfig;
}
```

## Configuration Merge Order (Precedence)

The configuration resolution follows a **specific precedence hierarchy**:

### During Load Time (Configuration.load())
1. **Fallback defaults** are passed as context during loading
   - Used to fill null/undefined values when `useDefaults=true`
   - Does NOT override explicitly set values
   - File: `/lib/gulp/model/configuration/configuration.js` (lines 60-76)

2. **Explicitly set values** in the loaded configuration take precedence
   - The `useDefaults` flag controls whether to fill missing values from defaults

### During Merge Time (Configuration.combine())
The `combine()` method implements the merging logic:

**For simple properties** (title, subtitle, selectTitle, tableTitle, repository, details):
```javascript
// From configuration.js lines 115-121
this.title = isNullOrUndefined(this.title) ? other.title : this.title;
this.subtitle = isNullOrUndefined(this.subtitle) ? other.subtitle : this.subtitle;
// ... similar for other properties
```
**Rule**: Existing non-null value takes precedence. Only null/undefined values are replaced.

**For criteria arrays**:
```javascript
// From configuration.js lines 123-133
// Merge criteria with same ID
this.criteria.forEach(value => {
    if (other.containsCriteria(value.id)) {
        value.combine(other.getCriteria(value.id));
    }
});

// Add new criteria from other config
other.criteria.forEach(value => {
    if (!this.containsCriteria(value.id)) {
        this.setCriteria(-1, value);
    }
});
```

**For criteria values** (from Criteria.combine(), criteria.js lines 251-281):
```javascript
const values = new Map();
this.values.forEach((value, key) => {
    if (other.values.has(key)) {
        values.set(key, value.combine(other.values.get(key)));
    } else {
        values.set(key, value);
    }
});
this.values = values;
```

## Final Precedence Order (Highest to Lowest)

Based on the code flow, when all configurations are merged:

1. **User Configuration** (`datasets/{datasetId}/config/comparison.yml`)
   - Highest precedence
   - Set first as `finalConfig`
   - Any non-null value here prevents override

2. **Shared Default Configurations** (`configDefaults` array in manifest)
   - Second precedence
   - Examples: `groups-advanced.yml`, `value-displays.yml`, `general-licensing.yml`
   - `finalConfig.combine(sharedDefaults)` - only fills null values

3. **Auto Configuration** (`comparison-auto-config.yml`)
   - Third precedence
   - Lowest among explicitly configured sources

4. **Fallback Defaults** (`comparison-default.yml`)
   - Used during load time only
   - Fills null/undefined values during Configuration.load() if `useDefaults=true`
   - Acts as the ultimate fallback for system defaults

## Dataset Context Specification

From `datasets.manifest.json`, each dataset specifies its configuration chain:

```json
{
  "id": "code-editor",
  "sources": {
    "dataDir": "datasets/code-editor/data",
    "config": "datasets/code-editor/config/comparison.yml",
    "style": "configuration/style.css",
    "configDefaults": [
      "configuration/comparison-default.yml",
      "configuration/defaults/general-licensing.yml",
      "configuration/defaults/groups-advanced.yml",
      "configuration/defaults/value-displays.yml"
    ]
  }
}
```

### Path Resolution
- File: `/lib/gulp/gulpfile.babel.js` (lines 110-163)
- `createDatasetContext()` function validates and resolves all paths
- Uses `resolveSourcePath()` to convert relative paths to absolute paths
- All configurations must exist (throws error if missing)

## Configuration Model Classes

### Configuration Class
- **File**: `/lib/gulp/model/configuration/configuration.js`
- **Key Method**: `combine(other)` - merges configurations
- **Key Method**: `load(json, defaultConfig, useDefaults)` - creates instance with defaults

### Criteria Class
- **File**: `/lib/gulp/model/criteria/criteria.js`
- **Key Method**: `combine(other)` - merges criteria definitions
- Handles merging of criteria values, locks, children, etc.
- Uses null-check to preserve existing values

### CriteriaValue Class
- **File**: `/lib/gulp/model/criteria/criteriaValue.js`
- Represents individual criteria values (enum options)

## Angular Runtime Configuration Loading

### Configuration Service
- **File**: `/src/app/components/comparison/configuration/configuration.service.ts`
- Loads configuration at runtime (different from build-time)
- Loads pre-built `comparison.json` and `data.json` from assets
- These files are already merged products from the build process

## Key Files to Review

1. **Build Configuration**: `/lib/gulp/gulpfile.babel.js` (lines 420-445)
2. **Merge Logic**: `/lib/gulp/model/configuration/configuration.js` (lines 115-136)
3. **Criteria Merge**: `/lib/gulp/model/criteria/criteria.js` (lines 251-281)
4. **Dataset Configuration**: `/configuration/datasets.manifest.json`
5. **Default Configuration**: `/configuration/comparison-default.yml`
6. **Dataset Defaults**: `/configuration/defaults/*.yml`
7. **Runtime Loading**: `/src/app/components/comparison/configuration/configuration.service.ts` (lines 154-344)

## Summary

The configuration system implements a **layered, non-destructive merge strategy** where:
- **Lowest precedence**: System defaults (comparison-default.yml)
- **Medium precedence**: Shared defaults (additional .yml files specified per dataset)
- **Highest precedence**: Dataset-specific configuration (comparison.yml in each dataset folder)
- **Auto-configuration**: Overlay that applies last but only fills null values

This design allows each layer to extend and customize without losing information from previous layers, enabling flexible configuration across multiple datasets while maintaining consistent defaults.
