# Plan: Fix dataset-scoped build command

Goal: Ensure `npm run build -- --dataset <id>` (and related scripts) build only the specified datasets so new dataset additions can be targeted without rebuilding everything.

## Tasks

- [x] Investigate current dataset flag handling in build/data prepare scripts to identify why selection is ignored.
  > **Bash** `['bash','-lc','ls']`
  > Listed repository contents to confirm dataset/config layout before diving into build tooling.
  > ---
  > **Bash** `['bash','-lc','cat package.json']`
  > Reviewed [package.json](../package.json) scripts/dependencies to understand how `npm run build` chains `data:prepare` and `ng build`.
  > ---
  > **Bash** `['bash','-lc','rg -n "dataset" -n']`
  > Scanned the repo for "dataset" references to locate relevant tooling docs/configuration (large output confirmed widespread dataset support but no obvious flag wiring).
  > ---
  > **Bash** `['bash','-lc','sed -n '\''1,200p'\'' lib/gulp/gulpfile.babel.js']`
  > Began auditing [lib/gulp/gulpfile.babel.js](../lib/gulp/gulpfile.babel.js) to see how dataset contexts are loaded and processed.
  > ---
  > **Bash** `['bash','-lc','rg -n "argv" lib/gulp/gulpfile.babel.js']`
  > Checked whether gulp already reads CLI flags (it only captures `argv` once for install paths, nothing dataset-specific).
  > ---
  > **Bash** `['bash','-lc','rg -n "dataset" lib/gulp/gulpfile.babel.js']`
  > Confirmed every dataset build step always iterates over all manifest entries via shared helpers (no filtering hooks yet).
  > ---
  > **Bash** `['bash','-lc','rg -n "runDatasetsSequentially" -n lib/gulp/gulpfile.babel.js']`
  > Located sequential dataset execution helper to confirm all tasks (markdown/config/assets) share the same all-datasets loop.
  > ---
  > **Bash** `['bash','-lc','sed -n '\''322,520p'\'' lib/gulp/gulpfile.babel.js']`
  > Read helper implementations showing hardcoded iteration over every dataset context with no CLI/env gating.
  > ---
  > **Bash** `['bash','-lc','sed -n '\''520,780p'\'' lib/gulp/gulpfile.babel.js']`
  > Inspected task wiring (default/dev/watch) to see how watchers rely on the unfiltered dataset arrays.
  > ---
  > **Bash** `['bash','-lc','sed -n '\''1,160p'\'' README.md']`
  > Cross-referenced [README.md](../README.md) to confirm docs already promise `npm run dev -- --dataset <id>` usage.
  > ---
  > **Bash** `['bash','-lc','rg -n -- '--dataset'']`
  > Gathered every documented `--dataset` usage (e.g., [RELEASE_NOTES_V3.md](../RELEASE_NOTES_V3.md), FAQs) showing expectation that build commands accept the flag.
  > ---
  > **Bash** `['bash','-lc','sed -n '\''40,120p'\'' RELEASE_NOTES_V3.md']`
  > Verified release notes explicitly instruct `npm run build -- --dataset default`, reinforcing the bug severity.
  > ---
  > **Bash** `['bash','-lc','rg -n "all-datasets" -n']`
  > Confirmed docs mention a `--all-datasets` toggle we should honor when filtering.
  > ---
  > **Bash** `['bash','-lc','rg -n "process\\.env\\.DATASET" -n']`
  > Checked whether any tooling already inspects `DATASET` env vars (none found, so env-based filtering is also missing).
  > ---
  > **Bash** `['bash','-lc','npm run data:prepare -- --dataset code-editor']`
  > Observed the current pipeline still rebuilds **all** datasets even when the flag is passed, proving gulp ignores the argument entirely.
  > ---
  > **Bash** `['bash','-lc','npm run build -- --dataset code-editor']`
  > Confirmed `ng build` receives the unknown `--dataset` flag and aborts, so the top-level build script also mishandles forwarding/stripping dataset args.
  >
  > Outcome: identified two gaps—gulp never filters dataset contexts, and the `build` script forwards `--dataset` to Angular instead of data prep—explaining why targeted builds fail.
- [x] Implement dataset filtering support in the data preparation/build pipeline (scripts + gulp tasks) and wire CLI args/env vars through.
  > **Apply Patch** *(parameters summarized; added dataset-select helpers to [lib/gulp/gulpfile.babel.js](../lib/gulp/gulpfile.babel.js))*
  > Introduced dataset selection parsing/filtering so gulp tasks only process requested ids and respect env/CLI overrides.
  > ---
  > **Apply Patch** *(parameters summarized; created [scripts/run-build.js](../scripts/run-build.js))*
  > Added a Node helper to orchestrate `data:prepare` + `ng build`, strip dataset flags before Angular, and forward them to gulp.
  > ---
  > **Apply Patch** *(parameters summarized; updated [package.json](../package.json))*
  > Pointed `build`/`build:prod` scripts at the new runner so dataset-scoped builds run consistently.
  > ---
  > **Bash** `['bash','-lc','chmod +x scripts/run-build.js']`
  > Ensured the new helper is executable for local/CI environments.
  > ---
  > **Apply Patch** *(parameters summarized; refined dataset/env precedence inside [scripts/run-build.js](../scripts/run-build.js))*
  > Allowed CLI dataset args to override env defaults, added `--all-datasets` forwarding, and centralized dataset parsing helpers.
  > ---
  > **Apply Patch** *(parameters summarized; prevented cleanup from deleting unselected dataset assets in [lib/gulp/gulpfile.babel.js](../lib/gulp/gulpfile.babel.js))*
  > Reused the full manifest when pruning asset folders so targeted builds no longer wipe other dataset outputs.
  > ---
  > **Bash** `['bash','-lc','git checkout -- src/assets/generated']`
  > Restored tracked `src/assets/generated/**` files that the earlier filtered cleanup had removed.
  > ---
  > **Bash** `['bash','-lc','ls -l scripts/run-build.js']`
  > Verified executable bit (`-rwxr-xr-x`) is set on the new script.
  >
  > Outcome: gulp now respects dataset filters (via CLI/env) and the `npm run build`/`build:prod` commands route through a dataset-aware runner, preventing Angular from seeing unknown flags.
- [x] Verify targeted builds via `npm run build -- --dataset <id>` and document behavior if needed.
  > **Bash** `['bash','-lc','npm run build -- --dataset code-editor']`
  > Confirmed gulp limited work to `code-editor` (single md2json invocation) and Angular completed successfully; noted existing Material theming/CommonJS warnings remain unchanged.
  > ---
  > **Bash** `['bash','-lc','npm run build -- --dataset code-editor,business-competition']`
  > Validated multi-dataset selection builds only the requested pair while Angular build still succeeds; no documentation changes needed because README already describes the flag usage.
  > ---
  > **Bash** `['bash','-lc','npm run build -- --dataset code-editor']`
  > Re-ran the single-dataset build after adjusting asset cleanup to ensure the regression fix didn't reintroduce Angular flag issues (same warnings only).
  >
  > Outcome: dataset-scoped builds now succeed for single and multi-id inputs without leaking flags to Angular.
