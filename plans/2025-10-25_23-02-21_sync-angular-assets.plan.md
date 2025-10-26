# Plan: Keep Angular bundle data.json in sync

Ensure every data rebuild also updates `dist/ultimate-comparison/assets/generated/` so Angular assets never lag behind `dist/data.json`, even if `ng build` isn’t rerun immediately.

## Tasks

- [x] Update the gulp `copyToAssets` helper to mirror generated files into the Angular `dist` assets directory whenever it exists.
  > **Edit** `apply_patch` (lib/gulp/gulpfile.babel.js)
  >
  > Added an `angularAssetsGenerated` target and now iterate over both `src/assets/generated/` and `dist/ultimate-comparison/assets/generated/`, copying each generated file to every existing target (without fabricating the Angular directory if it hasn’t been built yet). Also moved the `data.json` copy into the `development-column` task so the mirrored files include the enrichment step.
- [x] Re-run `npm run data:prepare` to verify the new copy logic works end-to-end.
  > **Bash** `{"command":["bash","-lc","npm run data:prepare"],"workdir":"/home/cb/projects/github/ultimate-comparison-framework","with_escalated_permissions":true,"justification":"Verify asset syncing after gulp change.","timeout_ms":120000}`
  >
  > Confirmed the pipeline finishes successfully and `dist/data.json`, `src/assets/generated/data.json`, and `dist/ultimate-comparison/assets/generated/data.json` now share identical sizes/timestamps.
