# Plan: Clean Generated Assets After Dataset Reorganization

The website build still emits stale dataset directories (e.g., `default`) and duplicate JSON outputs after reorganizing datasets. Goal: update the pipeline so generated assets only reflect datasets declared in `configuration/datasets.manifest.json` while preserving the default dataset alias expected by the app.

## Tasks

- [x] Inspect dataset manifest and current build outputs to confirm duplicated/stale assets
  > **Bash** `{"command":["bash","-lc","cat configuration/datasets.manifest.json"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Manifest shows only `code-editor` (default) and `example` datasets with distinct asset directories.
  > ---
  > **Bash** `{"command":["bash","-lc","ls dist/ultimate-comparison/assets/generated"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Output includes unexpected `default` directory plus root-level JSON files alongside dataset folders.
  > ---
  > **Bash** `{"command":["bash","-lc","ls src/assets/generated"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Same mismatch exists in source assets: stale `default` directory and root JSON aliases remain.
- [x] Review build pipeline to understand current asset copy behavior and identify cleanup points
  > **Bash** `{"command":["bash","-lc","sed -n '120,260p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Identified `copyDatasetFile` mirroring default dataset to root and lack of cleanup for stale subdirectories within generated asset targets.
- [x] Implement build updates (and specs if required) to remove stale dataset directories before copying fresh assets
  > **Edit** `apply_patch`
  > - Adjusted `lib/gulp/gulpfile.babel.js` imports to include `readdirSync` for directory scanning.
  > ---
  > **Edit** `apply_patch`
  > - Added `cleanupGeneratedAssetDirectories`, recursive pruning helpers, and dataset asset file tracking in `lib/gulp/gulpfile.babel.js` to remove stale dataset folders before copies.
  > ---
  > **Edit** `apply_patch`
  > - Invoked the cleanup helper at the start of `assets()` and the `development-column` task to ensure stale directories are cleared before new artifacts are copied.
  > ---
  > **Edit** `apply_patch`
  > - Simplified cleanup guard so legitimate stale directories are pruned even when no manifests specify explicit subdirectories.
  > ---
  > **Edit** `apply_patch`
  > - Refined recursive pruning to remove empty parent directories after child cleanup, preventing orphaned folders from lingering.
- [x] Rebuild and verify generated assets now align exactly with the manifest entries
  > **Bash** `{"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}`
  >
  > Full build succeeded; gulp default task logged cleanup stage without errors, Angular bundles compiled with existing warnings only.
  > ---
  > **Bash** `{"command":["bash","-lc","ls dist/ultimate-comparison/assets/generated"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Only manifests and dataset directories remain; stale `default` folder removed while root JSON alias persists for default dataset.
  > ---
  > **Bash** `{"command":["bash","-lc","ls src/assets/generated"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}`
  >
  > Source assets mirror dist output: dataset directories limited to `code-editor` and `example` with shared root files.
