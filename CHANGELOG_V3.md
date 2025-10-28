# CHANGELOG — v3.0.0 (Draft)

Date: 2025-10-28

This document summarizes the major changes introduced by the v3 fork. It is intended as a top-level, human-readable overview for maintainers and users preparing to migrate from the previous (v2) release. Detailed implementation notes and design discussions are in the repository's plans/ directory (see plans/ for full rationale and migration examples).

If you are upgrading from v2, read the Migration & Upgrade Notes section below first.

## Overview — What's new

- Support for multiple datasets in a single repository
  - Reworked repository layout and discovery so multiple dataset definitions can live alongside each other.
  - Per-dataset configuration, metadata, and build targets.
  - Tools and demo pages updated to select and visualize specific datasets.
- Documentation and demo updates for the fork
  - gh-pages branch should be updated to reflect new multi-dataset architecture and examples.
  - Demo app enhanced with dataset switcher and multi-dataset examples.
- Config and API changes
  - New top-level config keys for dataset management (see Config Changes).
  - Internal APIs refactored to accept dataset context; many functions now take an explicit dataset identifier.
- CLI / tooling changes
  - New commands or flags to target a dataset (e.g., --dataset or dataset= in config files).
  - Build/publish workflows updated to support publishing per-dataset artifacts.
- Test and spec changes
  - Tests split/organized by dataset; harness supports running test suites for one or more datasets.
- Backwards-incompatible (breaking) changes
  - Paths, imports and build outputs changed to be dataset-aware. Existing v2 repo layouts will need migration.
  - Some older single-repo configuration options have been renamed or removed in favor of the dataset model.

## Detailed Notes

### Multiple datasets
- Directory layout: repositories can contain multiple dataset directories (examples: datasets/<name>/, workspaces/<name>/, or similar). The codebase provides discovery logic to locate dataset roots.
- Each dataset contains its own metadata file (e.g., dataset.yaml or dataset.json) describing name, slug, source files, and configuration overrides.
- When running tools (build, demo, tests), the dataset context is required — either by CLI flag, environment variable, or interactive selector in the demo.

### Configuration Changes
- New config namespace: `datasets:` (top-level) where datasets are enumerated and per-dataset overrides are declared.
- Example:

```yaml
datasets:
  - id: default
    path: datasets/default
    title: "Default Dataset"
  - id: other
    path: datasets/other
    title: "Other Dataset"
```

- Legacy single-dataset config entries are supported for migration but will be deprecated in future minor releases.

### CLI & Tooling
- New flags:
  - --dataset <id> to target a specific dataset when building, serving, or testing.
  - --all-datasets to operate across every discovered dataset.
- Build output now produces dataset-scoped artifacts (e.g., public/<dataset-id>/...)
- gh-pages publishing should be updated to either publish a combined site with dataset selector or publish separate branches/sites per dataset. The default behavior in v3 is a combined site with a dataset selector UI.

### Documentation & Demo
- The documentation content under docs/ and the demo/ app were updated to show multi-dataset usage and include migration guides.
- The gh-pages branch must be regenerated from the updated docs and demo so the hosted site reflects v3 behavior and examples.

### Tests & CI
- Unit and integration tests are organized to run per-dataset. CI configurations include hooks to run a subset of tests for a changed dataset when possible.
- New test fixtures were added for multi-dataset scenarios.

## Breaking Changes (Summary)
- Public API: many internal functions now require a dataset context argument. If you call these directly from custom tooling, update signatures accordingly.
- File layout: expectation that dataset files are located under dataset-aware folders. If your repo uses the old flat layout, follow the migration steps.
- Build outputs: path layout for artifacts changed. Any consumers who rely on v2 static paths will need to update their tooling.

## Migration & Upgrade Notes
- Quick path for small projects (single dataset):
  1. Add a dataset descriptor (dataset.yaml) at the root or under datasets/default/. Example minimal file included in plans/migration_examples.md.
  2. Update your config to include a single dataset entry (see Config Changes section).
  3. Re-run build commands with --dataset default or let the CLI detect the single dataset automatically.
- For multi-dataset migration:
  1. Group dataset files into a directory per dataset (e.g., datasets/<name>/).
  2. Add dataset metadata files and update top-level config with dataset entries.
  3. Update any scripts that expect previous output paths to new dataset-scoped paths.
  4. Update gh-pages publishing steps to either publish a combined site or multiple sites (CI example in plans/ci_publish_examples.md).

## Compatibility & Deprecation
- The v3 fork attempts to provide transitional compatibility for common v2 workflows, but some changes are intentionally breaking to enable multi-dataset support.
- Deprecated features will be logged at runtime and documented in the migration guides. They will be removed in a future v4.

## Known Issues & Limitations
- Automated migration scripts are partial — manual verification is recommended for complex repositories.
- Demo site generation may need additional configuration for very large numbers of datasets.

## Testing Checklist (recommended)
- [ ] Validate discovery of all datasets in a sample repository.
- [ ] Run unit tests for each dataset.
- [ ] Build the demo site and verify the dataset selector and sample visualizations.
- [ ] Verify gh-pages content updates and that links point to dataset-scoped pages.

## Example Release Notes (to include when publishing)
- Added: multi-dataset repository support, per-dataset config and metadata, dataset selector in demo UI.
- Changed: build outputs are now dataset scoped; CLI accepts --dataset flag; internal APIs accept dataset context.
- Removed: old single-flat config keys (deprecated but supported for migration).

## Contributors
- This fork: contributors from the forked repository and maintainers who implemented the multi-dataset support. See git history for full list.

## Acknowledgements
- Based on upstream v2 codebase and documentation. Many components and examples were reused and adapted.

---

Notes:
- This file is a draft summary intended to be placed at the repository root. If you want, I can also:
  - Generate a more detailed changelog by scanning commit messages/PRs.
  - Create a migration guide in docs/ or plans/ with step-by-step commands and scripts.
  - Update the gh-pages branch contents (build and publish) to reflect these changes.
