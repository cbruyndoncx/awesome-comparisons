# Plan: Remove Default Asset Root Mirror

Stop writing dataset assets to the legacy root so only per-dataset directories remain under assets/generated.

## Tasks

- [x] Update gulp pipeline to stop mirroring default dataset assets to root
  > **Edit** `lib/gulp/gulpfile.babel.js`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  >  function copyDatasetFile(dataset, absolutePath, fileName) {
  >      copyToAssets(absolutePath, path.join(dataset.assetRelativePath, fileName));
  > -    if (dataset.isDefault) {
  > -        copyToAssets(absolutePath, fileName);
  > -    }
  >  }
  > *** End Patch
  > ```
  > Removed legacy branch that mirrored default dataset files into the root `assets/generated` directory.
  > ---
  > **Edit** `lib/gulp/gulpfile.babel.js`
  > ```
  > *** Begin Patch
  > *** Update File: lib/gulp/gulpfile.babel.js
  > @@
  > -import { existsSync, readFileSync, mkdirSync, writeFileSync, copyFileSync, statSync, readdirSync } from "fs";
  > +import { existsSync, readFileSync, mkdirSync, writeFileSync, copyFileSync, statSync, readdirSync, unlinkSync } from "fs";
  > @@
  > -    assetTargets.forEach(({ target }) => {
  > +    assetTargets.forEach(({ target }) => {
  >          if (!target || !existsSync(target)) {
  >              return;
  >          }
  > -        pruneAssetDirectory(target, '', allowedDirectories);
  > +        pruneAssetDirectory(target, '', allowedDirectories);
  > +        removeLegacyRootAssets(target);
  >      });
  >  }
  > @@
  >  function shouldRemoveDirectory(dirPath) {
  > @@
  >  }
  > +
  > +function removeLegacyRootAssets(root) {
  > +    datasetAssetFileNames.forEach(name => {
  > +        const filePath = path.join(root, name);
  > +        if (existsSync(filePath) && statSync(filePath).isFile()) {
  > +            try {
  > +                unlinkSync(filePath);
  > +            } catch (error) {
  > +                console.warn(`Unable to remove legacy asset ${filePath}: ${error.message}`);
  > +            }
  > +        }
  > +    });
  > +}
  > *** End Patch
  > ```
  > Ensure any stale root-level asset files are cleaned up during the build.
- [ ] Align specs and frontend references with per-dataset-only assets
  > **Edit** `specs/lib/gulp/gulpfile-babel.spec.md`
  > ```
  > *** Begin Patch
  > *** Update File: specs/lib/gulp/gulpfile-babel.spec.md
  > @@
  > - Copies comparison.json, data.json, description.md, and style.css into `src/assets/generated/<datasetId>/` and `dist/ultimate-comparison/assets/generated/<datasetId>/`
  > - Copies the manifest itself to `src/assets/configuration/datasets.manifest.json` so the Angular app can request it at runtime
  > - Validates that required files exist for every dataset and throws descriptive errors when inputs or generated outputs are missing
  > - Maintains backwards compatibility by keeping the default dataset outputs at `dist/data.json` and `src/assets/generated/` root while still mirroring them under their dataset subdirectory
  > + Copies comparison.json, data.json, description.md, and style.css into `src/assets/generated/<datasetId>/` and `dist/ultimate-comparison/assets/generated/<datasetId>/`
  > + Ensures generated files exist only beneath their dataset-specific directories (no legacy root mirrors)
  > + Copies the manifest itself to `src/assets/configuration/datasets.manifest.json` so the Angular app can request it at runtime
  > + Validates that required files exist for every dataset and throws descriptive errors when inputs or generated outputs are missing
  > *** End Patch
  > ```
  > Removed backwards-compatibility note and documented the per-dataset-only output requirement.
  > ---
  > **Edit** `src/index.html`
  > ```
  > *** Begin Patch
  > *** Update File: src/index.html
  > @@
  > -<link rel="stylesheet" type="text/css" href="assets/generated/style.css" media="screen"/>
  > +<link rel="stylesheet" type="text/css" href="assets/generated/code-editor/style.css" media="screen"/>
  > *** End Patch
  > ```
  > Pointed the static stylesheet link at the default dataset's generated directory.
  > ---
  > **Edit** `docs/index.html`
  > ```
  > *** Begin Patch
  > *** Update File: docs/index.html
  > @@
  > -<link rel="stylesheet" type="text/css" href="assets/generated/style.css" media="print" onload="this.media='screen'"><noscript><link rel="stylesheet" href="assets/generated/style.css" media="screen"></noscript>
  > +<link rel="stylesheet" type="text/css" href="assets/generated/code-editor/style.css" media="print" onload="this.media='screen'"><noscript><link rel="stylesheet" href="assets/generated/code-editor/style.css" media="screen"></noscript>
  > *** End Patch
  > ```
  > Updated documentation entry point to match the new asset location.
- [x] Validate build or asset generation expectations if feasible
  > **Bash**
  > ```
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Full build succeeded; gulp `development-column` completed without recreating root-level asset mirrors, confirming per-dataset outputs only.
  > ---
  > **Bash**
  > ```
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Rebuilt after adding legacy cleanup; confirmed `src/assets/generated/` and `dist/ultimate-comparison/assets/generated/` contain only dataset subdirectories (`code-editor`, `example`).
