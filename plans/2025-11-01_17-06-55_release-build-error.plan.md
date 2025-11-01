# Plan: Fix release build schema errors

Resolve Angular CLI schema validation issues preventing `npm run release` from succeeding.

## Tasks

- [x] Reproduce the build failure and capture exact errors
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build:prod"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > `ng build` terminated with:
  > ```
  > Workspace extension with invalid name (defaultProject) found.
  > Error: Schema validation failed with the following errors:
  >   Data path "" must NOT have additional properties(extractCss).
  > ```
  > Confirms the configuration incompatibility in `angular.json`.
- [x] Update Angular workspace configuration to satisfy schema
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: angular.json
  > @@
  >-              "extractCss": true,
  >               "namedChunks": false,
  > *** End Patch
  > ```
  > Removed the deprecated `extractCss` flag from the production build configuration to satisfy the Angular 17 schema.
- [x] Verify release build completes successfully
  > **Bash**
  > ```json
  > {"command":["bash","-lc","npm run build:prod"],"workdir":"/home/cb/projects/github/ultimate/awesome-comparisons"}
  > ```
  > Build succeeded after removing `extractCss`. Angular CLI still logs a warning about `defaultProject`, but the process completes and produces the optimized bundles. Warning stems from legacy workspace metadata and does not block the build.
  > ---
  > **Edit**
  > ```
  > *** Begin Patch
  > *** Update File: angular.json
  > @@
  >-  },
  >-  "defaultProject": "ultimate-comparison"
  >+  }
  > }
  > *** End Patch
  > ```
  > Dropped the deprecated `defaultProject` key to silence the remaining workspace warning.
