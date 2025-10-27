# Plan: Investigate Generated Data Files

Understand why build output includes top-level data.json/comparison.json alongside dataset-specific directories.

## Tasks

- [x] Inspect dataset manifest and dataset directories
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls datasets"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed datasets `code-editor` and `example`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls configuration"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Noted presence of `datasets.manifest.json` and related configs.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","cat configuration/datasets.manifest.json"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed dataset manifest referencing `assets/generated/code-editor/` and `assets/generated/example/`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls -R datasets/code-editor | head"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified `config/`, `data/`, and `scripts/` structure for `code-editor`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","ls -R datasets/example | head"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed mirrored structure for `example` dataset.
- [x] Trace data generation pipeline for assets/generated
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg \"assets/generated\""],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Located references to generated asset handling in gulp tasks and specs.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Reviewed dataset loading, context creation, and `copyDatasetFile` logic.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '200,400p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Confirmed `copyDatasetFile` mirrors default dataset files to asset root.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '400,600p' lib/gulp/gulpfile.babel.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Traced pipeline through `development-column` copying `data.json` via `copyDatasetFile`.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg -n \"backwards compatibility\" specs/lib/gulp/gulpfile-babel.spec.md"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Found spec guidance noting backwards compatibility requirement for root assets.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '50,90p' specs/lib/gulp/gulpfile-babel.spec.md"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed spec statement that default dataset files remain at legacy root locations.
- [x] Summarize findings and explanation for user
  > Documented key insight: `copyDatasetFile` in [lib/gulp/gulpfile.babel.js](../lib/gulp/gulpfile.babel.js#L210) mirrors assets to both dataset-specific directories and the root when `dataset.isDefault`, preserving legacy `assets/generated/data.json` and `comparison.json`.
  > Will explain to user that the manifest still marks `code-editor` as the default dataset, so those additional root files are intentional for backwards compatibility as described in [specs/lib/gulp/gulpfile-babel.spec.md](../specs/lib/gulp/gulpfile-babel.spec.md#L60).
