# Shared Configuration and Groupings

Awesome Comparisons provides a powerful configuration inheritance system that allows you to define criteria, groupings, and value displays once and reuse them across multiple datasets. This eliminates duplication and ensures consistency.

## Overview

The configuration system consists of three layers:

1. **Shared Defaults** - Common configuration in `configuration/defaults/`
2. **Dataset Manifest** - Specifies which shared configs each dataset uses
3. **Dataset-Specific** - Local overrides in `datasets/{id}/config/comparison.yml`

## Shared Configuration Files

### Location

All shared configuration files live in `configuration/defaults/`:

```
configuration/
├── datasets.manifest.json          # Dataset registry
├── comparison-default.yml          # Global defaults
└── defaults/                       # Shared fragments
    ├── general-licensing.yml       # License-related criteria
    ├── groups-advanced.yml         # Advanced grouping definitions
    ├── groups.yml                  # Basic grouping definitions
    └── value-displays.yml          # Common value displays
```

### Types of Shared Configuration

#### 1. Criteria Definitions

Define reusable criteria in shared YAML files:

**Example: `configuration/defaults/general-licensing.yml`**

```yaml
criteria:
  - License:
      name: License
      type: LABEL
      search: true
      table: true
      detail: true
      values:
        - name: "MIT"
          description: "MIT License - permissive open source"
          class: "label-success"
        - name: "Apache-2.0"
          description: "Apache License 2.0"
          class: "label-success"
        - name: "GPL-3.0"
          description: "GNU General Public License v3.0"
          class: "label-info"
        - name: "Proprietary"
          description: "Proprietary/commercial license"
          class: "label-warning"

  - Opensource:
      name: Opensource
      type: LABEL
      search: true
      table: true
      values:
        - name: "Yes"
          display: "Yes"
          class: "label-success"
        - name: "No"
          display: "No"
          class: "label-warning"

  - FreeTrial:
      name: FreeTrial
      type: LABEL
      search: true
      table: true
      values:
        - name: "Yes"
          display: "✓"
          class: "label-success"
        - name: "No"
          display: "✗"
          class: "label-danger"
```

#### 2. Grouping Definitions

Define how criteria are organized into groups. Groups are regular criteria items with special properties:

**Example: `configuration/defaults/groups-advanced.yml`**

```yaml
criteria:
  - General:
      name: General Info
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '10'
      defaultExpanded: true
      children:
        - Classification
        - Version
        - Repository
        - Rating
        - ShortDescription
        - Description
        - Languages

  - Licensing:
      name: Licensing
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '20'
      defaultExpanded: true
      children:
        - Opensource
        - License
        - FreeTrial

  - Features:
      name: Features
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '30'
      defaultExpanded: true
      children:
        - BYOK
        - Local Offline
        - Git Support
        - Terminal
        - Extensible
        - MCP-Client
```

#### 3. Value Displays

Define how specific values should render:

**Example: `configuration/defaults/value-displays.yml`**

```yaml
criteria:
  - Classification:
      values:
        - name: "AIE/Model"
          display: "AIE/Model"
        - name: "Code/Editor"
          display: "Code/Editor"
        - name: "Code/Terminal"
          display: "Code/Terminal"

  - Languages:
      values:
        - name: "Python"
          display: "🐍 Python"
        - name: "JavaScript"
          display: "JS"
        - name: "TypeScript"
          display: "TS"
        - name: "Java"
          display: "☕ Java"
        - name: "Any"
          display: "Any"
```

## Dataset Manifest Configuration

The dataset manifest (`configuration/datasets.manifest.json`) specifies which shared configuration files each dataset should inherit.

### Example Entry

```json
{
  "id": "aie-model",
  "displayLabel": "AIE/Model",
  "sources": {
    "dataDir": "datasets/aie-model/data",
    "config": "datasets/aie-model/config/comparison.yml",
    "configDefaults": [
      "configuration/comparison-default.yml",
      "configuration/defaults/general-licensing.yml",
      "configuration/defaults/groups-advanced.yml",
      "configuration/defaults/value-displays.yml"
    ]
  }
}
```

### configDefaults Array

The `configDefaults` array lists shared configuration files in order:

1. Files are loaded in the specified order
2. Later files can override earlier files
3. Dataset-specific config overrides all shared files
4. The framework merges criteria by tag (later definitions win)

**Order matters!** Example:

```json
"configDefaults": [
  "configuration/comparison-default.yml",      // Base defaults
  "configuration/defaults/general-licensing.yml",  // Add licensing criteria
  "configuration/defaults/groups-advanced.yml",    // Add advanced groupings
  "configuration/defaults/value-displays.yml"      // Override value displays
]
```

### Per-Dataset Variation

Different datasets can inherit different combinations:

**AIE Model Dataset** (full set):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/general-licensing.yml",
  "configuration/defaults/groups-advanced.yml",
  "configuration/defaults/value-displays.yml"
]
```

**Terminal Dataset** (simpler configuration):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/general-licensing.yml",
  "configuration/defaults/value-displays.yml"
]
```

## Configuration Inheritance Resolution

### Resolution Order

When loading a dataset configuration, the system:

1. **Loads Global Defaults**
   - Start with `configuration/comparison-default.yml`

2. **Loads Shared Fragments** (in order from `configDefaults`)
   - Merge criteria by tag (including groups)
   - Later criteria override earlier with same tag
   - Groups are criteria items, so they merge like any other criterion
   - Merge value displays by value name

3. **Loads Dataset-Specific Config**
   - `datasets/{id}/config/comparison.yml`

4. **Applies Dataset Overrides**
   - Dataset criteria override shared criteria (by tag)
   - Groups override like any other criterion (same tag = override)
   - Dataset value displays override shared displays

5. **Resolves Group Children**
   - For each group criterion, resolve children tags against merged criteria
   - Warn if any children reference non-existent criteria

### Example Resolution

**Shared (`general-licensing.yml`):**
```yaml
criteria:
  - License:
      name: License
      type: LABEL
      search: true
      table: true
```

**Dataset-Specific (`datasets/aie-model/config/comparison.yml`):**
```yaml
criteria:
  - License:
      name: "License Type"  # Override name
      type: LABEL
      search: true
      table: true
      detail: true  # Add detail visibility

  - BYOK:  # Dataset-unique criterion
      name: "Bring Your Own Key"
      type: LABEL
      search: true
```

**Merged Result for aie-model:**
```yaml
criteria:
  - License:
      name: "License Type"  # From dataset (overrides shared)
      type: LABEL
      search: true
      table: true
      detail: true  # From dataset

  - BYOK:  # From dataset (unique)
      name: "Bring Your Own Key"
      type: LABEL
      search: true
```

## Working with Shared Configuration

### Creating Shared Criteria

1. Identify criteria used by multiple datasets
2. Create or edit a file in `configuration/defaults/`
3. Add criteria definitions with complete metadata
4. Add the file to `configDefaults` for relevant datasets

**Best practices:**
- Use descriptive file names (e.g., `platform-support.yml`)
- Group related criteria together
- Include comprehensive value definitions
- Document shared files with comments

### Creating Shared Groupings

1. Design the grouping structure
2. Create or edit a grouping file (e.g., `groups-custom.yml`)
3. Define groups in `criteria` array with:
   - Criterion key as the group identifier (e.g., `- Deployment:`)
   - `name`: Display name
   - `type`: Must be `MARKDOWN`
   - `search`, `table`, `detail`: Must all be `false`
   - `order`: Position in list
   - `defaultExpanded`: Default state (true/false)
   - `children`: Array of criterion tags
4. Add to `configDefaults` for datasets that need it

**Example: Custom grouping file**

```yaml
# configuration/defaults/groups-devtools.yml
criteria:
  - Deployment:
      name: Deployment Options
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '40'
      defaultExpanded: true
      children:
        - BYOK
        - Local Offline
        - Git Support

  - Integration:
      name: Integration Features
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '50'
      defaultExpanded: true
      children:
        - Terminal
        - Extensible
        - MCP-Client
```

### Overriding Shared Configuration

To override a shared criterion in a dataset:

1. Add criterion with same `tag` to dataset config
2. Specify fields you want to override
3. Unspecified fields inherit from shared definition

**Example:**

**Shared:**
```yaml
- Classification:
    name: Classification
    type: LABEL
    search: true
    table: true
```

**Dataset Override:**
```yaml
- Classification:
    name: "Tool Classification"  # Override name only
    # type, search, table inherited from shared
```

## Advanced Patterns

### Layered Inheritance

Stack multiple shared files for modular configuration:

```json
"configDefaults": [
  "configuration/comparison-default.yml",       // Base
  "configuration/defaults/general-licensing.yml", // Add licensing criteria
  "configuration/defaults/groups-advanced.yml",   // Add advanced groupings
  "configuration/defaults/value-displays.yml"     // Common displays
]
```

### Partial Overrides

Override just values, not the entire criterion:

**Shared:**
```yaml
- Opensource:
    name: Opensource
    type: LABEL
    values:
      - name: "Yes"
        class: "label-success"
      - name: "No"
        class: "label-warning"
```

**Dataset:**
```yaml
- Opensource:
    values:
      - name: "Yes"
        display: "✓ Open Source"  # Override just display
      # Inherits "No" from shared
```

### Conditional Groupings

Different datasets can use different grouping structures by including different shared config files:

**Simple Dataset** uses `groups.yml` (basic grouping):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/groups.yml"
]
```

**Advanced Dataset** uses `groups-advanced.yml` (detailed grouping):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/groups-advanced.yml"
]
```

Groups are merged like any other criteria, so datasets can also override or add to groups.

### Dynamic Children

Groups can reference criteria that don't exist in all datasets:

**Shared grouping:**
```yaml
criteria:
  - Features:
      name: Features
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '30'
      defaultExpanded: true
      children:
        - BYOK
        - Local Offline
        - Git Support
        - Terminal  # May not exist in all datasets
```

The system resolves children against the merged criteria for each dataset and warns (but doesn't fail) if criteria are missing.

## Best Practices

### Organization

- **One Concern Per File**: Keep licensing criteria separate from platform criteria
- **Logical Naming**: Use clear, descriptive file names
- **Modular Design**: Create small, focused shared files for easy mixing

### Maintenance

- **Document Changes**: Comment YAML files with explanations
- **Version Shared Files**: Treat shared configs as reusable modules
- **Test Impact**: When changing shared files, test all datasets that inherit them

### Performance

- **Minimal Duplication**: Use shared configs instead of copying
- **Lazy Loading**: Only include shared files actually needed
- **Cache Friendly**: Shared configs are loaded once and cached

### Governance

- **Review Changes**: Changes to shared files affect multiple datasets
- **Coordinate Updates**: Communicate with dataset owners before modifying shared files
- **Backward Compatibility**: Avoid breaking changes to shared configs

## Troubleshooting

### Group Child Not Found

**Error:** "Group child 'X' not found in criteria definitions"

**Cause:** A group criterion references a child tag that doesn't exist in the merged criteria.

**Solutions:**
1. Add the missing criterion to shared or dataset config
2. Remove the child reference from the group's children array
3. Check for typos in tag names (case-sensitive)

### Duplicate Tag Warning

**Error:** "Duplicate criterion tag 'X'"

**Cause:** Same tag defined in multiple shared files or shared + dataset.

**Solutions:**
1. Remove duplicate from one file
2. If intentional override, ensure dataset file comes last
3. Use unique tags for distinct criteria

### Shared Config Not Applied

**Symptom:** Changes to shared config don't appear in dataset.

**Checks:**
1. Verify shared file is in `configDefaults` array
2. Check file path is correct
3. Ensure YAML syntax is valid
4. Rebuild dataset: `npm run data:prepare -- --dataset {id}`
5. Clear browser cache

### Override Not Working

**Symptom:** Dataset override doesn't replace shared definition.

**Checks:**
1. Verify `tag` matches exactly (case-sensitive)
2. Ensure dataset config is loaded after shared
3. Check inheritance resolution order
4. Use admin interface to inspect merged config

## Examples

### Complete Shared Configuration Setup

**1. Create shared criteria file:**

`configuration/defaults/custom-features.yml`:
```yaml
criteria:
  - BYOK:
      name: "Bring Your Own Key"
      type: LABEL
      search: true
      table: true
      values:
        - name: "Yes"
          class: "label-success"
        - name: "No"
          class: "label-secondary"
        - name: "Partial"
          class: "label-info"

  - Local Offline:
      name: "Local/Offline"
      type: LABEL
      search: true
      values:
        - name: "Yes"
          display: "✓"
        - name: "No"
          display: "✗"
```

**2. Create shared grouping:**

`configuration/defaults/groups-custom.yml`:
```yaml
criteria:
  - DeploymentFeatures:
      name: Deployment Features
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '60'
      defaultExpanded: true
      children:
        - BYOK
        - Local Offline
```

**3. Add to dataset manifest:**

```json
{
  "id": "aie-model",
  "sources": {
    "configDefaults": [
      "configuration/comparison-default.yml",
      "configuration/defaults/custom-features.yml",
      "configuration/defaults/groups-custom.yml"
    ]
  }
}
```

**4. Dataset can now override:**

`datasets/aie-model/config/comparison.yml`:
```yaml
criteria:
  - BYOK:
      name: "API Key Support"  # Override name
      # Other fields inherited from shared

  - MCP-Client:  # Dataset-specific
      name: "MCP Client Support"
      type: LABEL
```

## See Also

- [Overview.md](Overview.md) - System architecture
- [Admin_Config_Interface.md](Admin_Config_Interface.md) - Visual config editor
- [Update_YOUR_Comparison.md](Update_YOUR_Comparison.md) - Manual configuration
- [Migration_From_v2.md](Migration_From_v2.md) - Migrating from v2
- [BLUEPRINT.md](../../BLUEPRINT.md) - Technical inheritance implementation details
