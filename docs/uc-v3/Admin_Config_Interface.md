# Admin Configuration Interface

The Admin Configuration Interface is a visual configuration editor that allows you to manage dataset configurations without manually editing YAML files. It provides a user-friendly way to add, edit, and organize criteria, groupings, and value displays.

## Accessing the Admin Interface

When running the development server, navigate to `/admin` in your browser:

```bash
npm run dev
# Then open http://localhost:4200/admin
```

The admin interface is available in development mode and can optionally be deployed to production if needed.

## Interface Overview

The admin interface consists of three main panels:

### 1. Catalog Tree (Left Panel)

The catalog tree displays all available dataset configurations organized by:
- **Dataset**: Group by dataset (aie-model, code-editor, terminal, etc.)
- **Configuration Type**: Shows dataset-specific configs and shared defaults
- **Search**: Filter configurations by name

**Features:**
- Click any configuration to load it in the editor
- See dataset-specific vs shared configurations
- Quick navigation between multiple datasets
- Visual indicators for active/selected documents

### 2. Criteria Editor (Center Panel)

The main editing area where you modify configuration content.

**Sections:**

#### Criteria Groups
Organize criteria into collapsible sections for better UX. Groups are regular criteria items with special properties:
- Groups are defined in the `criteria` array with `type: MARKDOWN`
- Groups must have `search: false`, `table: false`, `detail: false`
- Groups have `children` array listing criterion tags to include
- Groups have `defaultExpanded` (boolean) to control initial state
- Groups have `order` to control positioning

#### Criteria Definitions
Define the fields that comparison entries will have:
- **Tag**: Unique identifier (e.g., "License", "Classification", "Languages")
- **Name**: Display name shown in UI
- **Type**: Data type (text, label, url, markdown, rating, repository)
- **Visibility**: Search, table, detail toggles
- **Search Mode**: AND/OR for multi-value searches
- **Values**: Define allowed values for label/rating types
- **Placeholder**: Search box hint text

#### Value Displays
Control how values render in the table and detail views:
- **Display Text**: Alternative text or emoji
- **Display HTML**: Custom HTML/SVG snippets
- **Description**: Tooltip text
- **Styling**: CSS class or custom colors
- **Repository-specific**: Age filters for repository type

**Actions:**
- **Add**: Create new criteria/groups/values
- **Clone**: Duplicate existing items
- **Delete**: Remove items (with confirmation)
- **Edit**: Modify any field inline

### 3. Preview Panel (Right Panel)

Shows live preview of your changes in YAML format.

**Modes:**
- **Diff View**: Compare original vs modified (default)
  - Unified diff: Traditional patch format
  - Split diff: Side-by-side comparison
- **Raw View**: Full YAML document preview

**Features:**
- Syntax highlighting
- Line numbers
- Light/dark theme toggle
- Copy to clipboard
- Real-time updates as you edit

## Workflow

### Editing a Dataset Configuration

1. **Select Configuration**
   - Choose a dataset from the catalog tree
   - Configuration loads into the editor
   - Original YAML appears in preview panel

2. **Make Changes**
   - Add/edit/delete criteria groups
   - Modify criteria definitions
   - Update value displays
   - Changes appear immediately in diff preview

3. **Review Changes**
   - Check diff view to see exactly what changed
   - Verify additions (green) and deletions (red)
   - Switch to raw view to see complete document

4. **Save**
   - Click "Save" button in toolbar
   - Changes written to YAML file with optimistic locking
   - Catalog reloads to reflect updates
   - Success confirmation appears

5. **Discard Changes** (optional)
   - Click "Revert" to undo all unsaved changes
   - Confirmation prompt prevents accidental data loss

### Adding a New Criterion

1. Scroll to "Criteria Definitions" section
2. Click "Add Criterion" button
3. Fill in required fields:
   - **Tag**: Internal identifier (lowercase, no spaces)
   - **Name**: Display name
   - **Type**: Choose data type
4. Configure visibility options (search, table, detail)
5. Add values if type is "label" or "rating"
6. Preview changes in diff panel
7. Save when ready

### Creating a Criterion Group

1. Scroll to "Criteria Definitions" section
2. Click "Add Criterion" button
3. Set the criterion as a group:
   - **Tag**: Unique identifier (e.g., "Licensing", "Features")
   - **Name**: Display name for the group
   - **Type**: `MARKDOWN`
   - **Search**: `false`
   - **Table**: `false`
   - **Detail**: `false`
   - **Order**: Position in list (e.g., "90")
   - **Default Expanded**: `true` or `false` for initial state
   - **Children**: List of criterion tags to include
4. Add criterion tags to children array
5. Save changes

### Configuring Value Displays

Value displays control how criterion values appear in the UI:

1. Select a criterion with values (type: label or rating)
2. For each value, configure:
   - **Display**: Text/emoji to show (e.g., "✓", "Enterprise")
   - **Display HTML**: Custom HTML (e.g., `<svg>...</svg>`)
   - **Description**: Tooltip text
   - **Class**: CSS class name (e.g., "label-success")
   - **Colors**: Background and text colors (if no class)

**Example:**
```yaml
values:
  - name: "MIT"
    description: "MIT License - permissive open source"
    class: "label-success"
    display: "MIT"
  - name: "Proprietary"
    description: "Proprietary/commercial license"
    backgroundColor: "#dc3545"
    color: "#ffffff"
    display: "Proprietary"
```

## Configuration Inheritance

The admin interface respects the configuration inheritance system:

### Shared vs Dataset-Specific

- **Shared Configurations** (`configuration/defaults/`)
  - Available to multiple datasets via `configDefaults`
  - Changes affect all datasets that inherit them
  - Use for common criteria definitions

- **Dataset-Specific** (`datasets/{id}/config/comparison.yml`)
  - Local to one dataset
  - Overrides shared definitions
  - Use for dataset-unique criteria

### Resolution Order

When you load a dataset configuration in the admin interface:

1. All `configDefaults` files are loaded in order
2. Criteria definitions are merged (later overrides earlier)
3. Dataset-specific `comparison.yml` is loaded
4. Dataset definitions override shared
5. Final merged result shown in editor

**Important:** When you save a dataset configuration, you're only saving that specific file (either shared or dataset-specific). The inheritance resolution happens at runtime.

### Working with Shared Defaults

To edit shared configuration files:

1. Select from catalog tree under "Shared Defaults" section
2. Examples:
   - `configuration/defaults/general-licensing.yml`
   - `configuration/defaults/groups-advanced.yml`
   - `configuration/defaults/value-displays.yml`
3. Edit criteria/groups as normal
4. Save changes
5. All datasets that inherit this file will receive updates

**Best Practice:** Use shared defaults for criteria common across multiple datasets (e.g., License, Opensource, Languages).

## Advanced Features

### Alert History

The alert history panel (bottom of screen) shows:
- Informational messages (blue)
- Warnings (yellow)
- Errors (red)

**Common alerts:**
- "Document loaded successfully"
- "Configuration saved"
- "Validation error: duplicate tag detected"
- "Group child X not found in criteria definitions"

Alerts persist across editing sessions for troubleshooting.

### Validation

Real-time validation checks for:
- **Duplicate tags**: Each criterion must have unique tag
- **Invalid children**: Group children must reference existing criteria tags
- **Required fields**: Tag, name, type are required for criteria
- **YAML syntax**: Valid YAML structure

Validation errors appear as alerts and prevent saving until resolved.

### Group Resolution

When working with groupings:

1. **Group Definition** (in criteria array):
```yaml
criteria:
  - Licensing:
      name: Licensing
      type: MARKDOWN
      search: false
      table: false
      detail: false
      order: '90'
      defaultExpanded: true
      children:
        - Opensource
        - License
        - FreeTrial
```

2. **Child Criteria Definitions** (in same criteria array):
```yaml
criteria:
  - Opensource:
      name: Opensource
      type: LABEL
      order: '91'
  - License:
      name: License
      type: LABEL
      order: '92'
  - FreeTrial:
      name: FreeTrial
      type: LABEL
      order: '93'
```

3. **Resolution**: Admin interface resolves children tags against available criteria and warns if any are missing.

### Diff Options

Customize diff view:
- **View Mode**: Unified (traditional) vs Split (side-by-side)
- **Theme**: Light or dark syntax highlighting
- **Context Lines**: How many unchanged lines to show around changes
- **Ignore Whitespace**: Hide whitespace-only changes

## Tips and Best Practices

### Organization

- **Use Groups**: Organize related criteria into logical groups
- **Consistent Naming**: Use clear, descriptive criterion names
- **Tag Conventions**: Use lowercase, hyphen-separated tags (e.g., "pricing-model")

### Shared Configuration

- **Common Criteria**: Put widely-used criteria (License, Opensource, Languages, etc.) in shared defaults
- **Dataset-Specific**: Keep unique criteria in dataset configs
- **Minimal Overrides**: Only override what's necessary in dataset files

### Value Displays

- **Emojis**: Use emojis sparingly for visual interest (✓, ✗, ⭐)
- **HTML**: Test custom HTML in preview before saving
- **Descriptions**: Always provide tooltips for clarity
- **Consistent Colors**: Use theme CSS classes when possible

### Performance

- **Save Frequently**: Don't accumulate too many unsaved changes
- **Preview Before Save**: Always check diff before saving
- **One Dataset**: Work on one dataset config at a time

### Troubleshooting

If the admin interface becomes unresponsive:

1. Check alert history for errors
2. Verify YAML syntax in preview
3. Look for duplicate tags or invalid children
4. Revert changes and try again incrementally
5. Check browser console for JavaScript errors

If configuration won't load:

1. Verify dataset manifest includes the dataset
2. Check file paths in `sources.config`
3. Ensure YAML files have valid syntax
4. Look for permission issues on config files

## Keyboard Shortcuts

(If implemented, otherwise remove this section)

- `Ctrl+S` / `Cmd+S`: Save current document
- `Ctrl+Z` / `Cmd+Z`: Undo last change
- `Esc`: Close dialogs/modals

## Future Enhancements

Planned features for future releases:

- Drag-and-drop reordering for groups and criteria
- Bulk operations (clone multiple, delete multiple)
- Import/export configurations
- Configuration templates
- Version history and rollback
- Multi-file editing (split view)
- Real-time collaboration indicators

## See Also

- [Overview](Overview.md) - System architecture and concepts
- [Shared_Configuration.md](Shared_Configuration.md) - Detailed inheritance system
- [Update_YOUR_Comparison.md](Update_YOUR_Comparison.md) - Manual YAML editing
- [FAQ.md](FAQ.md) - Common questions
- [Troubleshooting.md](Troubleshooting.md) - Solving problems
