# Plan: Add clean option for dataset builds

Goal: provide a simple CLI flag to wipe all generated outputs (dist/tmp/assets) before running a dataset build so users can choose between full/clean builds and incremental ones.

## Tasks

- [x] Review current dataset selection plumbing to determine best hook for the clean flag (gulp + runner) and which artifacts should be deleted.
  > **Bash** `['bash','-lc','rg -n "prune"']`
  > Verified no existing prune-related flags/logic to avoid collisions when naming the new option (output only showed dataset content references).
  > ---
  > **Bash** `['bash','-lc','sed -n '\''70,220p'\'' lib/gulp/gulpfile.babel.js']`
  > Re-read [lib/gulp/gulpfile.babel.js](../lib/gulp/gulpfile.babel.js) around dataset selection helpers to see how/where to store parsed flags for reuse.
  > ---
  > **Bash** `['bash','-lc','sed -n '\''420,520p'\'' lib/gulp/gulpfile.babel.js']`
  > Inspected cleanup + assets tasks to confirm where asset directories are pruned today and how to optionally target unselected datasets.
  >
  > Outcome: decided to parse the clean flag alongside dataset selectors in `scripts/run-build.js`, then delete `dist/`, `tmp/`, and `src/assets/generated/` before invoking gulp when requested.
- [x] Implement the clean option across scripts and gulp tasks, ensuring a clean build wipes outputs only when the new flag/env is provided.
  > **Apply Patch** *(parameters summarized; updated [scripts/run-build.js](../scripts/run-build.js))*
  > Added parsing for `--clean/--clean-first/--full-build`, environment fallbacks, and new helpers to delete `dist/`, `tmp/`, and `src/assets/generated/` before invoking gulp/Angular; also exposed opt-out aliases (`--no-clean`, `--incremental-build`).
  >
  > Outcome: the dataset-aware runner now supports both incremental (default) builds and explicit clean builds without touching gulp internals.
- [x] Validate behavior by running selective builds with and without the new flag and document findings.
  > **Bash** `['bash','-lc','npm run build -- --dataset code-editor --clean']`
  > Confirmed the runner deletes all generated directories first (logged message) then rebuilds the requested dataset successfully; Angular still only reports the pre-existing warnings.
  > ---
  > **Bash** `['bash','-lc','npm run build -- --dataset code-editor']`
  > Verified incremental builds still work when `--clean` is omitted, ensuring the default workflow remains unchanged.
  >
  > Outcome: we now have an optional clean/full build path plus the existing incremental path, both working for dataset-scoped builds.
