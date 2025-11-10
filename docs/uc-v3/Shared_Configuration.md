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
    ├── groups-advanced.yml         # Advanced grouping blueprints
    ├── groups.yml                  # Basic grouping blueprints
    └── value-displays.yml          # Common value displays
```

### Types of Shared Configuration

#### 1. Criteria Definitions

Define reusable criteria in shared YAML files:

**Example: `configuration/defaults/general-licensing.yml`**

```yaml
criteria:
  - tag: "License"
    name: "License"
    type: "label"
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
      - name: "Commercial"
        description: "Commercial/proprietary license"
        class: "label-warning"

  - tag: "Pricing"
    name: "Pricing Model"
    type: "label"
    search: true
    table: true
    values:
      - name: "Free"
        display: "Free"
        class: "label-success"
      - name: "Freemium"
        display: "Freemium"
        class: "label-info"
      - name: "Paid"
        display: "Paid"
        class: "label-warning"

  - tag: "FreeTier"
    name: "Free Tier Available"
    type: "label"
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

#### 2. Grouping Blueprints

Define how criteria are organized into groups:

**Example: `configuration/defaults/groups-advanced.yml`**

```yaml
criteriaGroups:
  - groupId: "overview"
    label: "Overview"
    isCollapsed: false
    children:
      - "ShortDescription"
      - "Platform"
      - "Category"

  - groupId: "licensing"
    label: "Licensing & Cost"
    isCollapsed: false
    children:
      - "License"
      - "Pricing"
      - "FreeTier"

  - groupId: "features"
    label: "Features"
    isCollapsed: false
    children:
      - "CodeCompletion"
      - "CodeGeneration"
      - "ChatInterface"

  - groupId: "technical"
    label: "Technical Details"
    isCollapsed: true
    children:
      - "SupportedLanguages"
      - "LocalProcessing"
      - "CloudBased"
```

#### 3. Value Displays

Define how specific values should render:

**Example: `configuration/defaults/value-displays.yml`**

```yaml
criteria:
  - tag: "Platform"
    values:
      - name: "VSCode"
        display: "VS Code"
        displayHtml: "<span class='platform-badge'>VS Code</span>"
      - name: "JetBrains"
        display: "JetBrains IDEs"
      - name: "Web"
        display: "🌐 Web"

  - tag: "SupportedLanguages"
    values:
      - name: "Python"
        display: "🐍 Python"
      - name: "JavaScript"
        display: "JS"
      - name: "TypeScript"
        display: "TS"
      - name: "Java"
        display: "☕ Java"
```

## Dataset Manifest Configuration

The dataset manifest (`configuration/datasets.manifest.json`) specifies which shared configuration files each dataset should inherit.

### Example Entry

```json
{
  "id": "code-editor",
  "displayLabel": "Code/Editors",
  "sources": {
    "dataDir": "datasets/code-editor/data",
    "config": "datasets/code-editor/config/comparison.yml",
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

**Code Editor Dataset** (full set):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/general-licensing.yml",
  "configuration/defaults/groups-advanced.yml",
  "configuration/defaults/value-displays.yml"
]
```

**AI Model Dataset** (no advanced groups):
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
   - Merge criteria by tag
   - Later criteria override earlier with same tag
   - Accumulate groupings (no override, additive)
   - Merge value displays by value name

3. **Loads Dataset-Specific Config**
   - `datasets/{id}/config/comparison.yml`

4. **Applies Dataset Overrides**
   - Dataset criteria override shared criteria (by tag)
   - Dataset groups are additive or can replace shared groups
   - Dataset value displays override shared displays

5. **Resolves Blueprint Children**
   - For each group, resolve children tags against merged criteria
   - Warn if any children reference non-existent criteria

### Example Resolution

**Shared (`general-licensing.yml`):**
```yaml
criteria:
  - tag: "License"
    name: "License"
    type: "label"
    search: true
    table: true
```

**Dataset-Specific (`datasets/code-editor/config/comparison.yml`):**
```yaml
criteria:
  - tag: "License"
    name: "License Type"  # Override name
    type: "label"
    search: true
    table: true
    detail: true  # Add detail visibility

  - tag: "EditorType"  # Dataset-unique criterion
    name: "Editor Type"
    type: "label"
    search: true
```

**Merged Result for code-editor:**
```yaml
criteria:
  - tag: "License"
    name: "License Type"  # From dataset (overrides shared)
    type: "label"
    search: true
    table: true
    detail: true  # From dataset

  - tag: "EditorType"  # From dataset (unique)
    name: "Editor Type"
    type: "label"
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
3. Define `criteriaGroups` array with:
   - `groupId`: Unique identifier
   - `label`: Display name
   - `isCollapsed`: Default state
   - `children`: Array of criterion tags
4. Add to `configDefaults` for datasets that need it

**Example: Custom grouping file**

```yaml
# configuration/defaults/groups-devtools.yml
criteriaGroups:
  - groupId: "dev-experience"
    label: "Developer Experience"
    isCollapsed: false
    children:
      - "CodeCompletion"
      - "IntelliSense"
      - "Refactoring"
      - "Debugging"

  - groupId: "collaboration"
    label: "Collaboration Features"
    isCollapsed: false
    children:
      - "LiveShare"
      - "CodeReview"
      - "PairProgramming"
```

### Overriding Shared Configuration

To override a shared criterion in a dataset:

1. Add criterion with same `tag` to dataset config
2. Specify fields you want to override
3. Unspecified fields inherit from shared definition

**Example:**

**Shared:**
```yaml
- tag: "Platform"
  name: "Platform"
  type: "label"
  search: true
  table: true
```

**Dataset Override:**
```yaml
- tag: "Platform"
  name: "Supported Platforms"  # Override name only
  # type, search, table inherited from shared
```

## Advanced Patterns

### Layered Inheritance

Stack multiple shared files for modular configuration:

```json
"configDefaults": [
  "configuration/comparison-default.yml",       // Base
  "configuration/defaults/platform-support.yml", // Add platform criteria
  "configuration/defaults/licensing.yml",        // Add licensing
  "configuration/defaults/ai-features.yml",      // Add AI-specific criteria
  "configuration/defaults/groups-ai.yml",        // Add AI groupings
  "configuration/defaults/value-displays.yml"    // Common displays
]
```

### Partial Overrides

Override just values, not the entire criterion:

**Shared:**
```yaml
- tag: "Pricing"
  name: "Pricing"
  type: "label"
  values:
    - name: "Free"
      class: "label-success"
    - name: "Paid"
      class: "label-warning"
```

**Dataset:**
```yaml
- tag: "Pricing"
  values:
    - name: "Free"
      display: "💰 Free"  # Override just display
    # Inherits "Paid" from shared
```

### Conditional Groupings

Different datasets can use different grouping structures:

**Simple Dataset** uses `groups.yml` (basic):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/groups.yml"
]
```

**Advanced Dataset** uses `groups-advanced.yml` (detailed):
```json
"configDefaults": [
  "configuration/comparison-default.yml",
  "configuration/defaults/groups-advanced.yml"
]
```

### Dynamic Children

Groups can reference criteria that don't exist in all datasets:

**Shared grouping:**
```yaml
- groupId: "ai-features"
  children:
    - "CodeCompletion"
    - "ChatInterface"
    - "ContextAwareness"  # May not exist in all datasets
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

### Blueprint Child Not Found

**Error:** "Blueprint child 'X' not found in criteria definitions"

**Cause:** A group references a criterion tag that doesn't exist in the merged criteria.

**Solutions:**
1. Add the missing criterion to shared or dataset config
2. Remove the child reference from the group
3. Check for typos in tag names

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
  - tag: "AIAssistance"
    name: "AI Assistance Level"
    type: "label"
    search: true
    table: true
    values:
      - name: "Basic"
        class: "label-info"
      - name: "Advanced"
        class: "label-success"
      - name: "None"
        class: "label-secondary"

  - tag: "CloudSync"
    name: "Cloud Sync"
    type: "label"
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
criteriaGroups:
  - groupId: "ai-capabilities"
    label: "AI Capabilities"
    isCollapsed: false
    children:
      - "AIAssistance"
      - "CloudSync"
```

**3. Add to dataset manifest:**

```json
{
  "id": "my-dataset",
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

`datasets/my-dataset/config/comparison.yml`:
```yaml
criteria:
  - tag: "AIAssistance"
    name: "AI Features"  # Override name
    # Other fields inherited from shared

  - tag: "CustomFeature"  # Dataset-specific
    name: "Custom Feature"
    type: "text"
```

## See Also

- [Overview.md](Overview.md) - System architecture
- [Admin_Config_Interface.md](Admin_Config_Interface.md) - Visual config editor
- [Update_YOUR_Comparison.md](Update_YOUR_Comparison.md) - Manual configuration
- [Migration_From_v2.md](Migration_From_v2.md) - Migrating from v2
- [BLUEPRINT.md](../../BLUEPRINT.md) - Technical blueprint inheritance details
