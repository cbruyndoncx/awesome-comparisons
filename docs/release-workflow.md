# Release Workflow

This guide explains how build labels are generated and how to publish a formal release for Awesome Comparisons.

## Build Labels

- `npm run release:stamp` generates a label in the form `v<semver core>.<yymmdd>` (for example `v3.0.0.251101`).
- The semver core is taken from `package.json` before any `-` pre-release suffixes, so the footer always reflects the current date even if the package version includes earlier build metadata.
- The script copies the raw `package.json` version into `VersionInformation.version`; the footer displays only the compact label.
- Override the label with `npm run release:stamp -- --build my-custom-label` (or use `--label`/`--tag`); whatever you pass becomes the release tag and footer text.
- The generated link points to `https://github.com/cbruyndoncx/awesome-comparisons/releases/tag/<label>`; override with `--repo` or `--tag-link` if publishing elsewhere.

## Release Checklist

1. Update `CHANGELOG.md` (and any dataset-specific changelogs) with the upcoming changes.
2. Bump the package version with npm (for example `npm version patch`) if you need a new semantic version.
3. Run `npm run release` (alias for `npm run release:prepare`) to build the site and stamp the version metadata.
4. Inspect `dist/` output and the footer in a local preview to confirm the new label shows correctly.
5. Commit the stamped `VersionInformation.ts`, build artifacts, and changelog updates.
6. Tag the release: `git tag -a <label> -m "<short summary>"` (default label is the build date).
7. Push commits and tags: `git push origin main --tags`.
8. Publish a GitHub release: `gh release create <label> --notes-file CHANGELOG.md` (or provide a summary manually).

## Debug Builds

- `npm run dev` and `npm run build` never touch `VersionInformation.ts`; they continue to show the last stamped release label.
- If you want to preview debug builds with a temporary label, run `npm run release:stamp -- --build dev-$(date +%Y%m%d%H%M)` and avoid committing the change.

## Changelog Management

- Keep `CHANGELOG.md`, `CHANGELOG_V3.md`, or dataset-specific logs up to date while developing.
- When stamping a release, copy the relevant section into the GitHub release notes for consistency.
- Archive previous release notes under `CHANGELOG_V3_DETAILED.md` if you need long-form detail.

## GitHub Releases

- Use the date-based label as the release tag to keep the footer link and GitHub release aligned.
- Include attachments (e.g., exported templates) by uploading them through the GitHub release UI or `gh release upload <label> <file>`.
- If you need to reissue a release, rerun `npm run release:stamp` with a new `--build` label, retag, and update the GitHub release.

Refer back to this document whenever you're preparing to publish so the numbering stays consistent between the site footer and GitHub releases.
