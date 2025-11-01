# Plan: Refresh release stamp format

Ensure release stamping regenerates the footer label with the current yymmdd suffix and reflect the behavior in documentation.

## Tasks

- [x] Adjust stamp logic to append the current yymmdd to the semver core
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  > -    const releaseDateSuffix = moment().format('YYMMDD');
  > -    const defaultVersionSegment = packageVersion.includes('-')
  > -        ? packageVersion.replace(/-/g, '.')
  > -        : `${packageVersion}.${releaseDateSuffix}`;
  > -    const defaultTag = `v${defaultVersionSegment}`;
  > +    const releaseDateSuffix = moment().format('YYMMDD');
  > +    const semverCore = (packageVersion || '').split('-')[0] || packageVersion;
  > +    const sanitizedCore = semverCore.replace(/[^0-9A-Za-z.]/g, '.');
  > +    const defaultTag = `v${sanitizedCore}.${releaseDateSuffix}`;
  > *** End Patch
  > ```
  > Default labels now derive from the semver core plus the current date suffix, ensuring the footer updates every stamp.
- [x] Regenerate VersionInformation via release script to confirm output
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run release:stamp"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > `VersionInformation.ts` now shows `v3.0.0.251101` with the current date, validating the updated stamp logic.
- [x] Update docs/specs to describe the refreshed behavior
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: docs/release-workflow.md
  > @@
  >-- `npm run release:stamp` generates a label in the form `v<semver>.<yymmdd>` (for example `v3.0.0.251101`).
  >-- When your `package.json` version already encodes the date as `3.0.0-251101`, the script reuses that suffix. Otherwise, it appends the current date.
  >+- `npm run release:stamp` generates a label in the form `v<semver core>.<yymmdd>` (for example `v3.0.0.251101`).
  >+- The semver core is taken from `package.json` before any `-` pre-release suffixes, so the footer always reflects the current date even if the package version includes earlier build metadata.
  > *** End Patch
  > ```
  > Documented the updated default label behavior in [docs/release-workflow.md](../docs/release-workflow.md).
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: specs/lib/gulp/gulpfile-babel.spec.md
  > @@
  >-- Writes `VersionInformation.ts` during release stamping, deriving the build label from `--build`, `--label`, `--tag`, or defaulting to `v<semver>.<yymmdd>` when none are provided [@test](./tests/release-management.spec.js)
  >+- Writes `VersionInformation.ts` during release stamping, deriving the build label from `--build`, `--label`, `--tag`, or defaulting to `v<semver core>.<yymmdd>` when none are provided [@test](./tests/release-management.spec.js)
  > *** End Patch
  > ```
  > Synced the Tessl spec to the refreshed release stamping rules.
