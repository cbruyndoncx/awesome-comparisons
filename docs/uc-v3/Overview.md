# Awesome Comparisons — Overview

Awesome Comparisons (formerly Ultimate Comparison Framework v2) is a framework for creating comparison websites. This version introduces breaking changes including multi-dataset support, visual configuration editing, and shared criteria management.

## What's New

- **Multi-dataset support** - Host multiple comparisons in one repository with dataset selector UI
- **Admin interface** - Visual YAML editor at `/admin` with live diff preview
- **Shared configuration** - Define criteria once, reuse via blueprint inheritance
- **TypeScript converter** - No Java dependency (replaces v2 Java-based md2json)
- **Dataset-aware builds** - CLI flags (`--dataset <id>`) and GitHub Pages output

## Architecture

### Directory Structure

```
awesome-comparisons/
├── configuration/
│   ├── datasets.manifest.json    # Dataset registry
│   ├── comparison-default.yml    # Global defaults
│   └── defaults/                 # Shared config fragments
├── datasets/{id}/
│   ├── config/comparison.yml     # Dataset-specific config
│   └── data/*.md                 # Markdown entries
├── src/app/                      # Angular source
└── docs/                         # Documentation
```

### Configuration Inheritance

1. **Shared defaults** (`configuration/defaults/`) - Define once, reuse everywhere
2. **Dataset manifest** - Specifies which shared configs each dataset inherits
3. **Dataset config** - Local overrides and unique criteria
4. **Resolution** - Shared configs merge, dataset config wins on conflicts

See [Shared_Configuration.md](Shared_Configuration.md) for details.

## Key Concepts

**Datasets** - Self-contained comparisons with own data, config, and metadata

**Criteria** - Fields that entries have (name, tag, type, search, table, detail, values)

**Groupings** - Organize criteria into collapsible UI sections

**Value Displays** - Control rendering (display text, HTML, tooltips, colors)

**Admin Interface** - Visual editor at `/admin` (catalog tree, criteria forms, diff viewer)

## Quick Workflows

### Create New Dataset

```bash
mkdir -p datasets/my-comparison/{data,config}
# Add to datasets.manifest.json
# Create comparison.yml
# Add markdown files
npm run data:prepare -- --dataset my-comparison
npm run dev -- --dataset my-comparison
```

Full guide: [Update_YOUR_Comparison.md](Update_YOUR_Comparison.md)

### Share Criteria Across Datasets

1. Create `configuration/defaults/my-criteria.yml`
2. Add to `configDefaults` in dataset manifest entries
3. Override in dataset's `comparison.yml` if needed

### Build for Production

```bash
npm run build                        # All datasets
npm run build -- --dataset <id>      # Specific dataset
npm run release                      # Stamps version
```

See [CI_and_Deploy.md](CI_and_Deploy.md) for publishing.

## Migration from v2

Key changes:
- Repository-based (was npm package)
- Multi-dataset architecture (reorganize data)
- TypeScript converter (no Java)
- Admin interface (new)
- Shared configuration (new)

**→ Full guide:** [Migration_From_v2.md](Migration_From_v2.md)

## Documentation

- **[Update YOUR Comparison](Update_YOUR_Comparison.md)** - Create/update datasets
- **[Admin Config Interface](Admin_Config_Interface.md)** - Visual editor guide
- **[Shared Configuration](Shared_Configuration.md)** - Inheritance system
- **[CI & Deploy](CI_and_Deploy.md)** - Publishing
- **[FAQ](FAQ.md)** & **[Troubleshooting](Troubleshooting.md)** - Help

## Support

- Check [FAQ](FAQ.md) and [Troubleshooting](Troubleshooting.md)
- Review technical specs in `../specs/`
- See v2 docs in `../uc-v2/` if migrating
- Open an issue with details
