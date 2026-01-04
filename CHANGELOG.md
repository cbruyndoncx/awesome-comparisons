# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2025-10-28

### Added

- Support for multiple datasets in a single repository.
- Per-dataset configuration, metadata, and build targets.
- Dataset selector UI (tab strip) in the demo app and dataset-aware filters/grouping.
- New top-level config keys for dataset management under the `datasets:` namespace.
- New CLI flags: `--dataset <id>` to target a specific dataset and `--all-datasets` for bulk operations.
- New test fixtures for multi-dataset scenarios.

### Changed

- Reworked repository layout and discovery to allow multiple dataset definitions alongside each other.
- Updated tools and demo pages to select and visualize specific datasets.
- Refactored internal APIs to accept dataset context/identifiers.
- Updated build/publish workflows to support per-dataset artifacts.
- Organized tests to run per-dataset.
- Updated documentation under `docs/` and the `demo/` app to reflect multi-dataset usage and migration.

### Breaking Changes

- Paths, imports, and build outputs are now dataset-aware. Existing v2 layouts require migration.
- Some legacy single-repo configuration options have been renamed or removed in favor of the dataset model.
- Internal functions now require a dataset context argument.
- Build output path layout for artifacts has changed.

### Removed

- Java/Gradle md-to-json pipeline retired in favor of the built-in TypeScript md2json CLI at `lib/md2json/dist/cli.js` (no Java dependency).
- `lib/md-to-json` directory has been removed.

## [v2.0.0-alpha.32] – 2020-02-21

### Fixed

- Fix insertion of version and description in generated `package.json`
- md-to-json part at Java 11 (by updating [Gradle](https://gradle.org/) to 6.2)

## [v2.0.0-alpha.31] – 2018-08-09

### Added

- Publish `ultimate-comparison` on npmjs.org [#67](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/67)
- Add extraction of missing information from comparison data [#89](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/89)
- Add global style file to configuration folder
- Add permanent display of all references [#18](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/18)
- Add references to details page [#16](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/16)
- Add tooltips for details page
- Add word-break property for tooltips
- Enabling and disabling elements
- Clicking labels for filtering

### Changed

- Introduction of Angular 5 [#30](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/30)
- Introduction of Redux [#117](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/117)
- Change some styles
- Change output directory location
- Replaced angular2-select with ng2-select

### Breaking Changes

- Restructure comparison configuration [#128](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/128)

### Fixed

- Improved foreground colors when auto assigning
- Fixed problem with sorting `repo` columns [#114](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/114)
- Fixed problem on first load after restart
- Fix moving content when modal opened [#26](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/26)
- Fix quote markdown to json converting
- Fix Md2Json imports
- Add expand and shrink option for table [#90](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/90)

### Removed

- Remove [pandoc](https://pandoc.org/) dependency [#113](https://github.com/ultimate-comparisons/ultimate-comparison-BASE/issues/113)

## 1.0.0 – 2017-08-24

### Added

- This file
- Static VersionInformation class
- Section about difference of `update` and `master` branch in README.md
- Added force push for deployment
- Moved deployment to .travis.yml
- Added tslint
- Added unknown label for empty values
- Enabling and disabling elements

### Fixed

- Rate Limit exceeded for GitHub for up to 60 elements.

[Unreleased]: https://github.com/cbruyndoncx/awesome-comparisons/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/cbruyndoncx/awesome-comparisons/compare/v2.0.0-alpha.32...v3.0.0
[v2.0.0-alpha.32]: https://github.com/ultimate-comparisons/ultimate-comparison-BASE/compare/v2.0.0-alpha.31...v2.0.0-alpha.32
[v2.0.0-alpha.31]: https://github.com/ultimate-comparisons/ultimate-comparison-BASE/compare/1.0.0...v2.0.0-alpha.31
