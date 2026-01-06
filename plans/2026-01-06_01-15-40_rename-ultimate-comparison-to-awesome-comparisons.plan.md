# Goal: Rename `ultimate-comparison` identifiers to `awesome-comparisons`
Background: The repo historically used the Angular project id/output folder name `ultimate-comparison`. We want a full rename (no backward compatibility), including `angular.json` project id and `dist/` output paths, plus any build tooling/workflow references.

## Task List
- [x] Inventory `ultimate-comparison` references
- [x] Rename Angular project id + outputPath
- [x] Update build tooling paths (gulp/karma/etc.)
- [x] Update GitHub Pages workflow artifact path
- [x] Update docs/README references
- [x] Run `npm run build:prod` smoke-check

## Task Outputs

> ### Task: Inventory `ultimate-comparison` references (tools: `shell_command`)
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "rg -n \"ultimate-comparison\" -S ." }`
>   - Output summary: Key functional references found in `angular.json` (project id + outputPath), `lib/gulp/gulpfile.babel.js` (dist path assumptions), `.github/workflows/pages.yml` (artifact path), `karma.conf.js` (coverage dir), and `README.md` (deployed output path).

> ### Task: Rename Angular project id + outputPath (tools: `apply_patch`)
> - `apply_patch` updated `angular.json` to rename project `ultimate-comparison` → `awesome-comparisons` and output path `dist/ultimate-comparison` → `dist/awesome-comparisons`.

> ### Task: Update build tooling paths (tools: `apply_patch`)
> - `apply_patch` updated `lib/gulp/gulpfile.babel.js` to target `dist/awesome-comparisons/assets/...` instead of `dist/ultimate-comparison/assets/...`.
> - `apply_patch` updated `karma.conf.js` coverage output to `coverage/awesome-comparisons`.

> ### Task: Update GitHub Pages workflow artifact path (tools: `apply_patch`)
> - `apply_patch` updated `.github/workflows/pages.yml` to upload `dist/awesome-comparisons/browser`.

> ### Task: Update docs/README references (tools: `apply_patch`)
> - `apply_patch` updated `README.md` badge URL and changed the deployed output path reference to `dist/awesome-comparisons/browser`.

> ### Task: Run `npm run build:prod` smoke-check (tools: `shell_command`)
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "npm run build:prod -- --base-href \"/awesome-comparisons/\"" }`
>   - Output summary: Build succeeded; output location is `dist/awesome-comparisons`, and the built `index.html` contains `<base href="/awesome-comparisons/">`.

> ### Follow-up: Build number updated (tools: `apply_patch`, `shell_command`)
> - `apply_patch` updated build/version from `3.0.0-251029` → `3.0.0-260105` in `package.json`, `package-lock.json`, and `src/assets/VersionInformation.ts`.
> - `shell_command` `{ workdir: "/home/cb/projects/dev/awesome-comparisons", command: "npm run build:prod -- --base-href \"/awesome-comparisons/\"" }`
>   - Output summary: Build runs with `awesome-comparisons-v3@3.0.0-260105`.
