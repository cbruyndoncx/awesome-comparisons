# Awesome Comparisons — Overview

Awesome Comparisons (formerly Ultimate Comparison Framework v2) is a powerful framework for creating and managing comparison websites. This version introduces breaking changes and significant new features, hence the name change to avoid confusion with the previous npm package.

## What's New in Awesome Comparisons

### Major Features

1. **Multiple Datasets Support**
   - Host multiple comparison datasets in a single repository
   - Each dataset has its own configuration, data files, and metadata
   - Dataset selector UI allows users to switch between comparisons
   - Per-dataset build outputs and publishing

2. **Admin Configuration Interface**
   - Visual configuration editor accessible at `/admin` route
   - Edit criteria, groupings, and value displays without touching YAML files
   - Live preview with diff viewer showing changes before saving
   - Catalog tree navigation for all dataset configurations
   - Alert history for troubleshooting configuration issues

3. **Shared Criteria and Groupings**
   - Define criteria definitions once in `configuration/defaults/`
   - Share grouping blueprints across multiple datasets
   - Dataset-specific overrides via local `comparison.yml` files
   - Inheritance system resolves shared + local configurations automatically

4. **TypeScript md2json Converter**
   - No Java dependency required (replaces v2 Java converter)
   - Built and executed via npm scripts during data preparation
   - Runs automatically during `npm run data:prepare`

5. **Improved Build System**
   - Dataset-aware build pipeline
   - CLI flags: `--dataset <id>` and `--all-datasets`
   - Environment variable support: `DATASET=<id>`
   - Output to `docs/` for GitHub Pages by default

## Architecture Overview

### Directory Structure

```
awesome-comparisons/
├── configuration/                    # Global configuration
│   ├── datasets.manifest.json       # Dataset registry and metadata
│   ├── comparison-default.yml       # Global defaults
│   └── defaults/                    # Shared configuration fragments
│       ├── general-licensing.yml    # Shared criteria definitions
│       ├── groups-advanced.yml      # Advanced grouping blueprints
│       └── value-displays.yml       # Shared value display configs
├── datasets/                        # Dataset directories
│   ├── code-editor/
│   │   ├── config/
│   │   │   └── comparison.yml       # Dataset-specific config
│   │   └── data/                    # Markdown entry files
│   ├── terminal/
│   └── ...
├── docs/                            # Published site output
│   ├── uc-v2/                       # Archived v2 documentation
│   └── uc-v3/                       # Current documentation
├── src/                             # Angular application source
│   └── app/
│       └── components/
│           ├── config-admin/        # Admin interface components
│           └── ...
└── specs/                           # Technical specifications
```

### Configuration Inheritance

Awesome Comparisons uses a blueprint-based inheritance system:

1. **Shared Configuration** (`configuration/defaults/`)
   - Define criteria once, reuse across datasets
   - Grouping blueprints specify structure
   - Value displays for consistent rendering

2. **Dataset Manifest** (`configuration/datasets.manifest.json`)
   - Lists all datasets with metadata
   - Specifies which shared configs each dataset inherits via `configDefaults`
   - Controls accent colors, themes, icons per dataset

3. **Dataset-Specific Config** (`datasets/{id}/config/comparison.yml`)
   - Overrides shared definitions
   - Adds dataset-unique criteria
   - Local customizations win over shared defaults

4. **Resolution Order**
   - Load all `configDefaults` files in order
   - Merge criteria definitions (later files override earlier)
   - Load dataset-specific `comparison.yml`
   - Dataset definitions override shared
   - Resolve blueprint children against merged criteria

## Key Concepts

### Datasets

A dataset is a self-contained comparison with its own:
- Data directory containing markdown entry files
- Configuration file (`comparison.yml`)
- Metadata (id, title, description, theme, accent color)
- Optional custom styling

Example dataset manifest entry:

```json
{
  "id": "code-editor",
  "displayLabel": "Code/Editors",
  "shortDescription": "AI Native Dev Code Editor category",
  "assetDirectory": "assets/generated/code-editor/",
  "accentColor": "#007bff",
  "preferredTheme": "light",
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

### Criteria

Criteria are the fields/properties that comparison entries have. Each criterion has:
- `name`: Display name
- `tag`: Internal identifier (unique key)
- `type`: Data type (text, label, url, markdown, rating, repository)
- `search`: Whether searchable in the UI
- `table`: Whether shown in comparison table by default
- `detail`: Whether shown in detail view
- `values`: Allowed values (for label/rating types)
- `andSearch`: Match-all vs match-any for multi-value searches

### Groupings

Groupings organize criteria into collapsible sections in the UI:
- `groupId`: Unique identifier
- `label`: Display name
- `children`: List of criterion tags to include
- `isCollapsed`: Default collapsed state

Blueprints define grouping structure in shared config files, then resolve against the merged criteria definitions for each dataset.

### Value Displays

Value displays control how criterion values render in the table and detail views:
- `display`: Text or emoji to show instead of value name
- `displayHtml`: Custom HTML/SVG for advanced visuals
- `description`: Tooltip text
- `class`: CSS class for styling
- `backgroundColor` / `color`: Custom colors for labels

## Admin Configuration Interface

Access the admin interface by navigating to `/admin` in your browser when running the dev server.

### Features

- **Catalog Tree**: Browse all dataset configurations
- **Criteria Editor**: Add, edit, delete criteria and groups
- **Value Editor**: Configure value displays and options
- **Live Preview**: See YAML changes in real-time
- **Diff Viewer**: Unified or split diff views with syntax highlighting
- **Validation**: Real-time validation with error highlighting
- **Alert History**: Persistent log of all operations and errors

### Workflow

1. Select a dataset configuration from the catalog tree
2. Edit criteria, groups, or value displays in the form
3. Preview changes in the diff viewer
4. Save when ready (optimistic locking prevents conflicts)
5. Reload catalog to see updated configuration

See [Admin_Config_Interface.md](Admin_Config_Interface.md) for detailed usage instructions.

## Common Workflows

### Creating a New Dataset

1. Create dataset directory:
```bash
mkdir -p datasets/my-comparison/data
mkdir -p datasets/my-comparison/config
```

2. Add dataset descriptor to `configuration/datasets.manifest.json`:
```json
{
  "id": "my-comparison",
  "displayLabel": "My Comparison",
  "shortDescription": "Description here",
  "assetDirectory": "assets/generated/my-comparison/",
  "accentColor": "#007bff",
  "preferredTheme": "light",
  "sources": {
    "dataDir": "datasets/my-comparison/data",
    "config": "datasets/my-comparison/config/comparison.yml",
    "configDefaults": [
      "configuration/comparison-default.yml",
      "configuration/defaults/general-licensing.yml",
      "configuration/defaults/value-displays.yml"
    ]
  }
}
```

3. Create `datasets/my-comparison/config/comparison.yml` with your criteria
4. Add markdown files to `datasets/my-comparison/data/`
5. Prepare data and build:
```bash
npm run data:prepare -- --dataset my-comparison
npm run dev -- --dataset my-comparison
```

### Sharing Criteria Across Datasets

1. Define common criteria in `configuration/defaults/custom-criteria.yml`
2. Add the file to `configDefaults` for each dataset that should inherit it
3. Dataset-specific overrides go in the local `comparison.yml`

### Building for Production

```bash
# Build all datasets
npm run build

# Build specific dataset
npm run build -- --dataset my-comparison

# Build for release (stamps version footer)
npm run release
```

## Migration from v2

If you're migrating from Ultimate Comparison v2, see [Migration_From_v2.md](Migration_From_v2.md) for detailed instructions.

Key differences:
- v2 used npm package `ultimate-comparison`
- v3 is Awesome Comparisons with repository-based setup
- Multi-dataset architecture requires reorganizing data
- No Java dependency (md2json is now TypeScript)
- Admin interface for configuration management
- Shared criteria/groupings support

## Next Steps

- [Update YOUR Comparison](Update_YOUR_Comparison.md) - How to create/update comparisons
- [CI & Deploy](CI_and_Deploy.md) - Publishing to GitHub Pages
- [FAQ](FAQ.md) - Common questions and answers
- [Troubleshooting](Troubleshooting.md) - Solutions to common problems
- [Admin Config Interface](Admin_Config_Interface.md) - Using the visual config editor
- [Shared Configuration](Shared_Configuration.md) - Working with shared criteria and groupings

## Support

For issues, questions, or contributions:
- Check existing documentation in `docs/uc-v3/`
- Review specs in `specs/` for technical details
- Consult archived v2 documentation in `docs/uc-v2/` if migrating
- Open an issue with reproduction details
