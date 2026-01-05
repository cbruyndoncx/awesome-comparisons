# Configuration Loading and Merging - Code Examples

## 1. Dataset Manifest Configuration

**File**: `/configuration/datasets.manifest.json`

This is the central registry that defines how each dataset's configuration is loaded and merged.

```json
{
  "datasets": [
    {
      "id": "code-editor",
      "displayLabel": "Code/Editors",
      "shortDescription": "AI Native Dev Code Editor category",
      "description": "AI Code Editors GUIs - either as standalone IDE or extension to vscode, jetbrains etc",
      "assetDirectory": "assets/generated/code-editor/",
      "accentColor": "#007bff",
      "icon": "default-icon.svg",
      "preferredTheme": "light",
      "isDefault": true,
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
  ]
}
```

**Key Points**:
- `config`: The dataset-specific configuration file (highest precedence)
- `configDefaults`: Array of default files to merge (loaded in order)
- This manifest is loaded by the build process to construct dataset contexts


## 2. Build-Time Configuration Loading

**File**: `/lib/gulp/gulpfile.babel.js` (lines 420-445)

```javascript
function config() {
    datasetContexts.forEach(dataset => {
        // STEP 1: Load fallback defaults
        const fallbackDefaults = loadDefaultConfigurationFromPaths([dataset.fallbackDefaultConfig]);
        
        // STEP 2: Load shared defaults (may be multiple files)
        const sharedDefaults = loadDefaultConfigurationFromPaths(dataset.sharedDefaultConfigs);
        
        // STEP 3: Load user-specific configuration with fallback defaults as context
        const userConfigOverrides = Configuration.load(
            yaml2json.safeLoad(readFileSync(dataset.sources.config, "utf8")),
            fallbackDefaults,  // Used as context for filling null/undefined
            true               // useDefaults = true
        );
        
        // STEP 4: Load auto-config if it exists
        const autoConfigSource = existsSync(dataset.files.autoConfig)
            ? yaml2json.safeLoad(readFileSync(dataset.files.autoConfig, "utf8"))
            : {};
        const autoConfig = Configuration.load(autoConfigSource, fallbackDefaults, true);
        
        // STEP 5: Clone user config as the base for final config
        const finalConfig = cloneConfiguration(userConfigOverrides) || userConfigOverrides;
        
        // STEP 6: Merge shared defaults (adds missing values, preserves existing)
        if (sharedDefaults) {
            finalConfig.combine(sharedDefaults);
        }
        
        // STEP 7: Merge auto-config (lowest priority merge)
        finalConfig.combine(autoConfig);
        
        // STEP 8: Remove reserved criteria that shouldn't be in output
        pruneReservedCriteria(finalConfig);
        
        // STEP 9: Write merged configuration to output
        ensureDirExists(dataset.distDir);
        const configOutput = dataset.files.configJson;
        writeFileSync(configOutput, JSON.stringify(finalConfig.json()), "utf8");
        copyDatasetFile(dataset, configOutput, names.configJson);
    });
    return Promise.resolve();
}
```

**Important**: The merge happens in this exact order, so user config values are preserved!


## 3. Configuration Model - Merge Logic

**File**: `/lib/gulp/model/configuration/configuration.js` (lines 115-136)

```javascript
combine(other) {
    // Simple properties: keep existing non-null value
    this.title = isNullOrUndefined(this.title) ? other.title : this.title;
    this.subtitle = isNullOrUndefined(this.subtitle) ? other.subtitle : this.subtitle;
    this.selectTitle = isNullOrUndefined(this.selectTitle) ? other.selectTitle : this.selectTitle;
    this.tableTitle = isNullOrUndefined(this.tableTitle) ? other.tableTitle : this.tableTitle;
    this.repository = isNullOrUndefined(this.repository) ? other.repository : this.repository;
    this.details = isNullOrUndefined(this.details) ? other.details : this.details;

    // Merge criteria by ID
    // Part 1: Merge criteria that exist in both configs
    this.criteria.forEach(value => {
        if (other.containsCriteria(value.id)) {
            value.combine(other.getCriteria(value.id));
        }
    });

    // Part 2: Add new criteria that only exist in other config
    other.criteria.forEach(value => {
        if (!this.containsCriteria(value.id)) {
            this.setCriteria(-1, value);
        }
    });

    return this;
}
```

**Key Principle**: A property only gets overwritten if its current value is `null` or `undefined`.


## 4. Criteria Merging - Recursive Logic

**File**: `/lib/gulp/model/criteria/criteria.js` (lines 251-281)

```javascript
combine(other) {
    // Merge simple properties
    this.type = isNullOrUndefined(this.type) ? other.type : this.type;
    this.name = isNullOrUndefined(this.name) ? other.name : this.name;
    this.search = isNullOrUndefined(this.search) ? other.search : this.search;
    this.table = isNullOrUndefined(this.table) ? other.table : this.table;
    this.detail = isNullOrUndefined(this.detail) ? other.details : this.detail;
    this.description = isNullOrUndefined(this.description) ? other.description : this.description;
    this.placeholder = isNullOrUndefined(this.placeholder) ? other.placeholder : this.placeholder;
    this.order = isNullOrUndefined(this.order) ? other.order : this.order;
    this.andSearch = isNullOrUndefined(this.andSearch) ? other.andSearch : this.andSearch;
    this.rangeSearch = isNullOrUndefined(this.rangeSearch) ? other.rangeSearch : this.rangeSearch;
    this.lock = isNullOrUndefined(this.lock) ? other.lock : this.lock;
    
    // Handle children (grouping)
    if (isNullOrUndefined(this.children) || this.children.length === 0) {
        this.children = Array.isArray(other.children) ? other.children : this.children;
    }
    this.defaultExpanded = this.defaultExpanded === true || other.defaultExpanded === true;

    // Merge criteria values (enum options)
    const values = new Map();
    this.values.forEach((value, key) => {
        if (other.values.has(key)) {
            // Both have this value: recursively merge
            values.set(key, value.combine(other.values.get(key)));
        } else {
            // Only we have this value: keep it
            values.set(key, value);
        }
    });
    // Note: values that only exist in 'other' are NOT added
    this.values = values;
    
    const hasChildren = Array.isArray(this.children) && this.children.length > 0;
    this.defaultExpanded = hasChildren && (this.defaultExpanded === true || other.defaultExpanded === true);

    return this;
}
```

**Note**: Criteria values (Map) that only exist in `other` are NOT automatically added.


## 5. Default Configuration Structure

**File**: `/configuration/comparison-default.yml` (excerpt)

```yaml
title: Awesome Comparisons
subtitle: born out of the Ultimate Comparison Framework
repoowner: cbruyndoncx
selectTitle: ''
tableTitle: ''
repository:
  template: "https://github.com/{repoowner}/awesome-comparisons.git"
  variables: ["repoowner"]
details:
  header:
    nameRef: id
    labelRef: ""
    urlRef: id
  body:
    title: Short Description
    bodyRef: ShortDescription
  tooltipAsText: false
criteria:
  # System defaults for all criteria types
  - default-id:
      ignore: true
      id: id
      name: Name
      search: false
      table: true
      type: name-url
      lock:
        id: true
        type: true
        detail: true
  
  - default-text:
      ignore: true
      id: Text-Criteria
      name:
        template: "{}"
        variables: ["id"]
      search: false
      table: true
      detail: true
      type: text
  
  - default-label:
      ignore: true
      id: Label-Criteria
      name:
        template: "{}"
        variables: ["id"]
      search: true
      table: true
      detail: true
      type: label
```

These "default-*" criteria serve as templates for auto-generating criteria of each type.


## 6. Shared Defaults - Group Configuration

**File**: `/configuration/defaults/groups-advanced.yml` (excerpt)

```yaml
criteria:
  # Grouping criteria with children
  - Deployment:
      name: Deployment
      type: MARKDOWN
      search: true
      table: true
      detail: true
      order: '50'
      children:
        - BYOK
        - Local Offline
        - OperatingSystem
        - VSCodeExt
        - JetBrainsExt
        - DownloadableApplication
        - HostedSaas
        - MobileVersion
  
  - DeveloperExperience:
      name: Developer Experience
      type: MARKDOWN
      search: true
      table: true
      detail: true
      order: '30'
      children:
        - Context Management
        - Direct File References
        - Checkpoints
        - Git Support
      defaultExpanded: true
  
  - Extensible:
      name: Extensible
      type: LABEL
      search: true
      table: true
      detail: true
      description: 'Is it possible to extend or customize the system in any way'
      order: '20'
      andSearch: false
      rangeSearch: false
      children:
        - Plugins
        - Hooks
        - SlashCommands
        - CustomModes
        - Subagents
        - RemoteAgents
      defaultExpanded: true
```

These define grouping structures that are shared across datasets!


## 7. Dataset-Specific Configuration

**File**: `/datasets/code-editor/config/comparison.yml` (excerpt)

```yaml
title: AI Code Editors
subtitle: Comparison of AI Integrated Development Environments (IDE) a.o. listed AINativeDev Code/Editor category.
criteria:
  # Override and extend criteria
  - BYOK:
      name: BYOK
      type: LABEL
      search: true
      table: true
      detail: true
      description: 'Bring Your Own LLM API Key supported'
      placeholder: ''
      order: '50'
      andSearch: false
      rangeSearch: false
      values:
        'Yes':
        'No':
  
  - Local Offline:
      name: Local Offline
      type: LABEL
      search: true
      table: true
      detail: true
      description: 'Support for local on-site deployment or local offline use'
      placeholder: ''
      order: '60'
      andSearch: false
      rangeSearch: false
      values:
        'Yes':
        'No':
  
  - FreeTrial:
      name: FreeTrial
      type: LABEL
      search: true
      table: true
      detail: true
      description: 'Free access (like opensource), or free (potentially limited) trial available'
      placeholder: ''
      order: '95'
      andSearch: false
      rangeSearch: false
      values:
        'Yes':
        'No':
```

**Note**: This overrides the `title` and adds specific criteria that are meaningful for this dataset.


## 8. Configuration Model - Load Method

**File**: `/lib/gulp/model/configuration/configuration.js` (lines 60-76)

```javascript
static load(json, defaultConfig, useDefaults) {
    Configuration.defaultConfig = defaultConfig;
    
    if (isNullOrUndefined(json)) {
        return Configuration.empty(useDefaults);
    } else {
        return new Configuration(
            json.title,
            json.subtitle,
            json.selectTitle,
            json.tableTitle,
            json.repository,
            Details.load(json.details, defaultConfig, useDefaults),
            Criteria.loadArray(json.criteria, defaultConfig, useDefaults),
            useDefaults  // This flag enables default-filling
        );
    }
}
```

When `useDefaults=true`:
- The `defaultConfig` is stored and used to fill null/undefined values
- Criteria types are resolved against default criteria templates
- Missing name fields are templated from defaults


## 9. Null Check Utility

**File**: `/lib/gulp/model/util.js`

```javascript
export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

export function deleteUndefinedKeys(obj) {
    Object.keys(obj).forEach(key => isNullOrUndefined(obj[key]) && delete obj[key]);
    return obj;
}
```

These utilities are critical to the merge strategy:
- `isNullOrUndefined()` determines if a value should be overwritten
- `deleteUndefinedKeys()` cleans output to avoid null values in JSON


## 10. Angular Runtime Configuration Service

**File**: `/src/app/components/comparison/configuration/configuration.service.ts` (lines 154-156)

```typescript
private hydrateConfigurationPayload(configurationSource: any, dataSource: any): void {
    // Load pre-built comparison.json (already merged at build time)
    this.configuration = Configuration.load(configurationSource);
    
    // ... process criteria and data elements ...
}
```

At runtime:
1. The app loads already-merged `comparison.json` from assets
2. No additional merging occurs
3. All merging happened during the build process


## Summary of Precedence with Example

**Scenario**: Dataset "code-editor" with three criteria sources

**Fallback Defaults** (`comparison-default.yml`):
```yaml
criteria:
  - MyField:
      name: "Default Name"
      search: true
      table: false
```

**Shared Defaults** (`groups-advanced.yml`):
```yaml
criteria:
  - MyField:
      table: true  # Override table to true
      order: '10'  # Add order
```

**User Config** (`code-editor/comparison.yml`):
```yaml
criteria:
  - MyField:
      name: "Custom Name"  # Override name
      # search and table are not specified
```

**Merge Result**:
1. Start with userConfig: `{name: "Custom Name"}`
2. Merge sharedDefaults: `{name: "Custom Name", table: true, order: '10', search: true}`
   - name: kept from userConfig (non-null)
   - table: added from sharedDefaults (was null in userConfig)
   - order: added from sharedDefaults (was null in userConfig)
   - search: added from sharedDefaults (was null in userConfig, filled during load)

**Final**:
```javascript
{
  name: "Custom Name",      // From userConfig
  search: true,              // From fallback during load
  table: true,               // From sharedDefaults merge
  order: '10'                // From sharedDefaults merge
}
```

