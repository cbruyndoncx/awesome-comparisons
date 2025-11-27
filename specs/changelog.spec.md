# Changelog

## Target

[@describe](../CHANGELOG.md)

## Capabilities

### Maintains an Unreleased section.

- Unreleased section appears at the top before all versioned entries. [@test](../tests/changelog/unreleased-section-exists.test.md)
- Unreleased section includes note: "Java/Gradle md-to-json pipeline retired in favor of the built-in TypeScript md2json CLI at `lib/md2json/dist/cli.js` (no Java dependency)." [@test](../tests/changelog/unreleased-pipeline-note.test.md)
- Unreleased section includes note: "lib/md-to-json directory has been removed." [@test](../tests/changelog/unreleased-directory-removed.test.md)

### Maintains versioned release entries.

- Each release section heading matches the pattern `## [vX.Y.Z] – YYYY-MM-DD`. [@test](../tests/changelog/version-heading-format.test.md)

### Groups entries by categories.

- Under each release, entries are grouped under category headings such as `### Added`, `### Changed`, `### Fixed`, `### Removed`, and `### Breaking Changes`. [@test](../tests/changelog/categories-grouping.test.md)

## Dependencies

_None_