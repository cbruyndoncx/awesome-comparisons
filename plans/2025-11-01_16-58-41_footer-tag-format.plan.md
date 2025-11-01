# Plan: Simplify Footer Version Label

Adjust release stamping and UI to display only `vX.y.z.yymmdd` in the footer and ensure release automation matches the new label format.

## Tasks

- [x] Align release task to generate date-suffixed semantic tags
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  > -    const currentIsoDate = moment().format('YYYY-MM-DD');
  > -    const buildLabel = argv.build || argv.label || argv.tag || moment().format('YYYY.MM.DD');
  > +    const currentIsoDate = moment().format('YYYY-MM-DD');
  > +    const releaseDateSuffix = moment().format('YYMMDD');
  > +    const defaultVersionSegment = packageVersion.includes('-')
  > +        ? packageVersion.replace(/-/g, '.')
  > +        : `${packageVersion}.${releaseDateSuffix}`;
  > +    const defaultTag = `v${defaultVersionSegment}`;
  > +    const manualLabel = argv.build || argv.label || argv.tag;
  > +    const buildLabel = manualLabel || defaultTag;
  >      const repoBase = argv.repo || 'https://github.com/cbruyndoncx/awesome-comparisons';
  >      const tagLink = argv['tag-link'] || `${repoBase}/releases/tag/${buildLabel}`;
  > *** End Patch
  > ```
  > Default release tags now follow `v<semver>.<yymmdd>` when no explicit label is supplied, while preserving manual overrides.
- [x] Update footer binding to show only the compact tag
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: src/assets/VersionInformation.ts
  > @@
  > -    public tag = '2025.10.27';
  > -    public tagLink = 'https://github.com/cbruyndoncx/awesome-comparisons/releases/tag/2025.10.27';
  > +    public tag = 'v3.0.0.251029';
  > +    public tagLink = 'https://github.com/cbruyndoncx/awesome-comparisons/releases/tag/v3.0.0.251029';
  > *** End Patch
  > ```
  > Updated the seed data so the footer reflects the new default tag style until the next release stamp.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  > -                {{'Build ' + getVersionInformation()?.tag + ' • v' + getVersionInformation()?.version}}
  > +                {{getVersionInformation()?.tag}}
  >             </a>
  > *** End Patch
  > ```
  > Simplified the footer binding to display only the compact tag text while retaining the tooltip and link.
- [x] Document changes in the active planning log
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: docs/release-workflow.md
  > @@
  >-- `npm run release:stamp` generates a build label using the current date (format `YYYY.MM.DD`).
  >-- The script also copies the `package.json` version into `VersionInformation.version` so the footer shows both the build label (date) and the semantic version.
  >-- You can override the date-based label with `npm run release:stamp -- --build 2025.11.02` or `--label` if you prefer a custom name.
  >+- `npm run release:stamp` generates a label in the form `v<semver>.<yymmdd>` (for example `v3.0.0.251101`).
  >+- When your `package.json` version already encodes the date as `3.0.0-251101`, the script reuses that suffix. Otherwise, it appends the current date.
  >+- The script copies the raw `package.json` version into `VersionInformation.version`; the footer displays only the compact label.
  >+- Override the label with `npm run release:stamp -- --build my-custom-label` (or use `--label`/`--tag`); whatever you pass becomes the release tag and footer text.
  > *** End Patch
  > ```
  > Clarified the default label format and override options in [docs/release-workflow.md](../docs/release-workflow.md).
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: README.md
  > @@
  >-- Run `npm run release` to build the site and stamp the date-based build label.
  >+- Run `npm run release` to build the site and stamp the compact `vX.Y.Z.yymmdd` label.
  > *** End Patch
  > ```
  > Synced the README summary with the new footer format.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: specs/lib/gulp/gulpfile-babel.spec.md
  > @@
  >-- Writes `VersionInformation.ts` during release stamping, deriving the build label from `--build`, `--label`, `--tag`, or the current date when none are provided [@test](./tests/release-management.spec.js)
  >+- Writes `VersionInformation.ts` during release stamping, deriving the build label from `--build`, `--label`, `--tag`, or defaulting to `v<semver>.<yymmdd>` when none are provided [@test](./tests/release-management.spec.js)
  > *** End Patch
  > ```
  > Updated the release management spec to document the new default tag convention.
