# Plan: Support default-expanded table groups

Goal: Allow certain comparison table groupings to start expanded based on `comparison.yml`.

## Tasks

- [x] Analyze existing grouping flow and decide on configuration changes
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg -n \"expanded\" src/app"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Located all Redux/service touchpoints for expansion state management to scope required code changes.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,250p' src/app/components/output/feature-grouping.service.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed group parsing to see current hardcoded `isExpanded` initialization.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '250,500p' src/app/components/output/feature-grouping.service.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Confirmed no default-expansion logic further down the service.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' src/app/models/feature-grouping.model.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Inspected `FeatureGroupView` interface; identified need for new default flag.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '250,460p' src/app/redux/uc.reducers.ts"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified reducer flow that copies `isExpanded` from persisted state and filters columns accordingly.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' lib/gulp/model/criteria/criteria.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Checked model parsing to determine how to extend criteria schema with an `expanded` flag.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '200,400p' lib/gulp/model/criteria/criteria.js"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Reviewed serialization logic to ensure new property can round-trip in YAML/JSON.
  >
> Outcome: Plan to add optional `defaultExpanded` boolean on criteria that propagates into `FeatureGroupView.defaultExpanded`, with reducers honoring it when no persisted state is present.
- [x] Implement configuration parsing & state updates for default group expansion
  > **apply_patch**
  > - Edited `lib/gulp/model/criteria/criteria.js` to persist a `defaultExpanded` flag through parsing/serialization and propagate it during copies and combinations.
  > Outcome: Criteria instances now carry the new configuration flag end-to-end.
  > ---
  >
  > **apply_patch**
  > - Updated `lib/gulp/model/criteria/criteria.d.ts` constructor signature and public fields with the `defaultExpanded` boolean.
  > Outcome: TypeScript consumers recognize the new property.
  > ---
  >
  > **apply_patch**
  > - Added the optional `defaultExpanded` property to `FeatureGroupView` in `src/app/models/feature-grouping.model.ts`.
  > Outcome: Front-end models expose the flag for reducers/components.
  > ---
  >
  > **apply_patch**
  > - Taught `FeatureGroupingService` (`src/app/components/output/feature-grouping.service.ts`) to record each group's `defaultExpanded` value when building view models.
  > Outcome: Parsed groups carry their configured default expand preference.
  > ---
  >
  > **apply_patch**
  > - Adjusted `applyGrouping` in `src/app/redux/uc.reducers.ts` to use configured defaults when no persisted state exists.
  > Outcome: Redux state now seeds expansion based on configuration while still honoring user overrides.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","rg -n \"defaultExpanded\" -n"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Verified every reference to the new flag across the repo to ensure coverage.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Full data prep + Angular build succeeded, confirming the new configuration path compiles cleanly.
- [x] Update `comparison.yml` (and any related docs) to illustrate the new setting
  > **apply_patch**
  > - Added `defaultExpanded: true` to the General, DeveloperExperience, and Extensible groups within `configuration/comparison.yml` so the live dataset demonstrates the new behavior.
  > Outcome: Key table groupings now auto-expand on first load.
  > ---
  >
  > **apply_patch**
  > - Mirrored the same `defaultExpanded` flags in `docs/configuration/comparison.yml` so the published configuration example documents the feature.
  > Outcome: Documentation reflects how to opt specific groups into default expansion.
- [x] Restrict default expansion flags to feature-grouping criteria with a false default elsewhere
  > **apply_patch**
  > - Updated `lib/gulp/model/criteria/criteria.js` so `defaultExpanded` is only honored when a criteria actually has children (i.e., participates in feature grouping) and automatically coerces to `false` otherwise.
  > Outcome: Non-grouping criteria ignore the flag entirely, satisfying the systemwide default of collapsing all groups unless explicitly opted-in.
  > ---
  >
  > **Bash**
  > ```
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Verified the gulp data prep + Angular build still succeed after the default-expanded guard changes.
