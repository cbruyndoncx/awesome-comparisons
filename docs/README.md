# Awesome Comparisons Documentation

This repository contains comprehensive documentation for Awesome Comparisons (formerly Ultimate Comparison Framework).

## Current Documentation (v3)

**Awesome Comparisons** introduces breaking changes and significant new features. All new users should start here:

### Getting Started

- **[Overview](uc-v3/Overview.md)** - System architecture, key features, and core concepts
- **[Update YOUR Comparison](uc-v3/Update_YOUR_Comparison.md)** - Step-by-step guide to creating and updating datasets
- **[Migration from v2](uc-v3/Migration_From_v2.md)** - Upgrading from Ultimate Comparison v2

### Key Features

- **[Admin Config Interface](uc-v3/Admin_Config_Interface.md)** - Using the visual configuration editor at `/admin`
- **[Shared Configuration](uc-v3/Shared_Configuration.md)** - Working with shared criteria and groupings
- **[CI & Deploy](uc-v3/CI_and_Deploy.md)** - Publishing to GitHub Pages

### Reference

- **[FAQ](uc-v3/FAQ.md)** - Frequently asked questions
- **[Troubleshooting](uc-v3/Troubleshooting.md)** - Common problems and solutions

## What's New in Awesome Comparisons

### Major Features

1. **Multiple Datasets Support** - Host multiple comparison datasets in a single repository with dataset selector UI
2. **Admin Configuration Interface** - Visual editor for YAML configuration with live diff preview
3. **Shared Criteria & Groupings** - Blueprint-based inheritance system for reusing configuration
4. **TypeScript md2json** - No Java dependency required (replaces v2 Java converter)
5. **Improved Build System** - Dataset-aware builds with GitHub Pages publishing

### Breaking Changes

- Repository renamed from "Ultimate Comparison v2" to "Awesome Comparisons"
- Multi-dataset architecture requires data reorganization
- Dataset-aware build system with new CLI flags
- Configuration inheritance via `datasets.manifest.json`
- Admin interface for visual configuration management

## Quick Start

```bash
# Create dataset directory
mkdir -p datasets/my-comparison/data
mkdir -p datasets/my-comparison/config

# Add dataset to manifest (configuration/datasets.manifest.json)
# Create comparison.yml and markdown data files

# Prepare data and run
npm install
npm run data:prepare -- --dataset my-comparison
npm run dev -- --dataset my-comparison
```

## Legacy Documentation (v2)

**docs/uc-v2/** — Archived documentation for Ultimate Comparison Framework v2. Kept for historical reference and users who have not yet migrated.

⚠️ **Note:** v2 used the npm package `ultimate-comparison`. The new version is repository-based with breaking changes, hence the rename to Awesome Comparisons.

## Archived Materials

**docs/archive/** — Technical investigations and internal documentation moved from active docs:
- `uc-v3-investigations/` - Configuration flow analysis and implementation research

## Documentation Structure

```
docs/
├── README.md                           # This file
├── uc-v3/                             # Current documentation
│   ├── Overview.md                    # Start here
│   ├── Admin_Config_Interface.md      # Visual config editor guide
│   ├── Shared_Configuration.md        # Inheritance system
│   ├── Update_YOUR_Comparison.md      # Creating datasets
│   ├── Migration_From_v2.md          # Migration guide
│   ├── CI_and_Deploy.md              # Publishing guide
│   ├── FAQ.md                        # Common questions
│   ├── Troubleshooting.md            # Problem solving
│   └── adr/                          # Architecture decision records
├── uc-v2/                            # Legacy v2 docs (archived)
├── archive/                          # Moved from active docs
│   └── uc-v3-investigations/        # Technical investigations
├── release-workflow.md               # Release process
└── screenshots/                      # Documentation images
```

## Getting Help

1. **New Users**: Start with [Overview](uc-v3/Overview.md)
2. **Migrating from v2**: Read [Migration Guide](uc-v3/Migration_From_v2.md)
3. **Configuration Help**: See [Admin Config Interface](uc-v3/Admin_Config_Interface.md) or [Shared Configuration](uc-v3/Shared_Configuration.md)
4. **Problems**: Check [Troubleshooting](uc-v3/Troubleshooting.md) and [FAQ](uc-v3/FAQ.md)
5. **Technical Details**: Review specs in `../specs/` directory

## Contributing to Documentation

When contributing documentation:

- Add new docs to `docs/uc-v3/`
- Update this index when adding new documents
- Use markdown with code examples
- Include links to related documentation
- Archive obsolete docs to `docs/archive/`

## Additional Resources

- **Technical Specs**: `../specs/` - Detailed technical specifications
- **Release Notes**: `../RELEASE_NOTES_V3.md` - User-facing release summary
- **Changelog**: `../CHANGELOG_V3.md` - Detailed change log
- **Blueprint**: `../BLUEPRINT.md` - Configuration inheritance technical details
