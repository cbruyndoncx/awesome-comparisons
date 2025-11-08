# Plan: Manifest-driven Config Admin Enhancements

Restore the grouping-aware config editor incrementally: add a manifest-powered loader, rebuild grouping from blueprints with safe fallbacks, reintroduce the advanced UI toggles/links, and document the changes.

## Tasks

- [x] Manifest Loader (Infrastructure)
  > Implemented dataset manifest + grouping cache plumbing inside [src/app/components/config-admin/config-workspace.service.ts](../src/app/components/config-admin/config-workspace.service.ts), extended document loading to await the new helper, and verified `npm run build` completes with the usual warnings.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-workspace.service.ts"]`
  > Reviewed service imports/state to understand current capabilities.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,520p' src/app/components/config-admin/config-workspace.service.ts"]`
  > Inspected load/select/criteria mutation logic for integration points.
  > ---
  > **Bash** `["bash","-lc","rg -n \"transformApiResponseToModel\" -n src/app/components/config-admin/config-workspace.service.ts"]`
  > Located criteria transformation helper for later grouping work.
  > ---
  > **Bash** `["bash","-lc","sed -n '792,968p' src/app/components/config-admin/config-workspace.service.ts"]`
  > Read `transformApiResponseToModel` and `buildCriteriaGroups`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' configuration/datasets.manifest.json"]`
  > Examined dataset manifest structure (ids + configDefaults).
  > ---
  > **Bash** `["bash","-lc","sed -n '160,320p' configuration/datasets.manifest.json"]`
  > Reviewed remainder of manifest for other datasets.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/models/config-document.model.ts"]`
  > Confirmed catalog + document metadata fields (datasetId, etc.).
  > ---
  > **Bash** `["bash","-lc","rg -n \"datasets\\.manifest\" -n"]`
  > Surveyed other manifest consumers for parity.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/datasets/dataset-manifest.service.ts"]`
  > Learned how the public site loads the manifest/structure.
  > ---
  > **Bash** `["bash","-lc","rg -n \"encodedPath\" -n"]`
  > Identified how encoded paths flow through the workspace server.
  > ---
  > **Bash** `["bash","-lc","sed -n '120,260p' lib/gulp/tasks/config-workspace-server.babel.js"]`
  > Confirmed catalog-building rules for shared defaults (groups*.yml).
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' configuration/defaults/groups-advanced.yml"]`
  > Captured grouping blueprint structure for upcoming parsing.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — add forkJoin import + blueprint interfaces)*
  > Added `forkJoin`, dataset manifest entry type, blueprint source/ cache interfaces.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — introduce manifest/grouping cache fields)*
  > Declared manifest URL/cache fields and grouping cache state.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — ensure loadDocument waits for blueprint)*
  > Wrapped document loads in `ensureDatasetBlueprint` via `switchMap`.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — reset blueprint on clear)*
  > Cleared `activeGroupingBlueprint` when clearing the active document.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — add manifest loader helpers)*
  > Added `ensureDatasetBlueprint`, manifest loader, grouping fetcher, and encoding helper plus logging.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — type-guard grouping filter)*
  > Tightened grouping path detection with a type predicate.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — stabilize manifest loader pipeline)*
  > Reordered manifest loader operators so caching + error handling behave with `shareReplay`.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Full build succeeded (same CommonJS + unused-file warnings as before), confirming the new helper compiles.
- [x] Blueprint-driven Grouping
  > Rewired [src/app/components/config-admin/config-workspace.service.ts](../src/app/components/config-admin/config-workspace.service.ts) so blueprint YAML (when present) dictates `criteriaGroups`, with exhaustive logging/fallback to the original raw-YAML grouping and guaranteed “Other Criteria” coverage; verified again with `npm run build`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' datasets/code-editor/config/comparison.yml"]`
  > Reviewed real dataset criteria keys/types to ensure blueprint references resolve correctly.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — add BlueprintBuildResult type)*
  > Added a helper interface for sharing blueprint build results (groups + assigned children).
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — overhaul buildCriteriaGroups)* 
  > Replaced the old raw-YAML-first builder with logic that defers to blueprint data before falling back.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — add blueprint/document helper methods)*
  > Implemented helpers for blueprint parsing, fallback grouping, ungrouped consolidation, and group-definition detection with guard rails/logging.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — enhance resolveGroupChildren)*
  > Added duplicate-detection + logging for unresolved refs and ensured parent names propagate to warnings.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Build stays green with the same pre-existing CommonJS/unused file warnings, confirming grouping changes compile.
- [ ] Admin UI Enhancements
- [x] Admin UI Enhancements
  > Reintroduced the per-group “Link existing criteria” selector plus per-entry `andSearch`/`rangeSearch` toggles, extended the shared models/service to persist those flags, refreshed the reactive form + template (including collapsed badges/styles), and validated via `npm run build`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Skimmed component logic to see current form structure/hooks.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,520p' src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Reviewed entry management helpers for potential linking points.
  > ---
  > **Bash** `["bash","-lc","sed -n '600,720p' src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Checked `createEntryGroup` + serialization helpers ahead of new controls.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-criteria-form.component.html"]`
  > Inspected template layout for group header/actions sections.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,520p' src/app/components/config-admin/config-criteria-form.component.html"]`
  > Looked at entry cards to plan badge/toggle updates.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' specs/app/components/config-admin/config-criteria-form-component.html.spec.md"]`
  > Confirmed spec expectations before extending UI.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/config-admin/config-criteria-form.component.css"]`
  > Checked current styles for entry headers/flags.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/config-admin/template-field.util.ts"]`
  > Revisited placeholder/description serializers to ensure round-tripping.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/models/config-document.model.ts"]`
  > Inspected `CriteriaEntryModel` definition prior to adding new flags.
  > ---
  > **Bash** `["bash","-lc","sed -n '200,320p' src/app/models/config-document.model.ts"]`
  > Reviewed factory helpers/type guards around entry models.
  > ---
  > **Bash** `["bash","-lc","sed -n '700,900p' src/app/components/config-admin/config-workspace.service.ts"]`
  > Located YAML payload generation to wire up new fields.
  > ---
  > **Bash** `["bash","-lc","sed -n '1062,1180p' src/app/components/config-admin/config-workspace.service.ts"]`
  > Examined `toApiPayload` implementation ahead of persistence tweaks.
  > ---
  > **Apply Patch** *(src/app/models/config-document.model.ts — add andSearch/rangeSearch fields)*
  > Extended `CriteriaEntryModel` to carry the new boolean flags.
  > ---
  > **Apply Patch** *(src/app/models/config-document.model.ts — update type guard)*
  > Ensured `isCriteriaEntryModel` validates the new properties.
  > ---
  > **Apply Patch** *(src/app/models/config-document.model.ts — update clone helper)*
  > Cloning now includes `andSearch`/`rangeSearch`.
  > ---
  > **Apply Patch** *(src/app/models/config-document.model.ts — update createEmptyCriteriaEntry)*
  > Defaulted the new flags to `false` for fresh entries.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — map entry form booleans)*
  > `applyDocumentFormValue` now serializes `andSearch`/`rangeSearch`.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — parse flags from YAML)*
  > `toCriteriaEntryModel` pulls boolean values from definitions.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — emit flags/metadata in toApiPayload)*
  > Added `id`-based keys plus `name`, placeholder, description, and the new toggles when generating YAML.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — track link selections)*
  > Introduced `linkSelections` map for per-group mat-select binding.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — reset link selections on init)*
  > Cleared the selection cache whenever a document loads.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — seed new entry flags)*
  > Default criteria entries now include `andSearch`/`rangeSearch`.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — extend createEntryGroup)*
  > Added controls for the two new toggles with serialized structured text.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — add getLinkableEntries/linkExistingCriteria)*
  > Implemented dropdown-driven linking plus helper methods for locating/moving entries and normalizing orders.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — add helper injections after getConnectedDropListIds)*
  > Wired in `findEntryLocation`/`normalizeEntryOrders` utilities for reuse.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.ts — normalize drag-drop orders)*
  > Updated `reorderCriteriaEntries` to recompute `order` values after drags.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.html — insert link mat-select)*
  > Added the “Link existing criteria” field with standalone ngModel binding.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.html — fix ngModelOptions casing)*
  > Corrected `[ngModelOptions]` to `{ standalone: true }`.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.html — add AND/Range badges)*
  > Expanded the collapsed card summary to highlight the new flags.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.html — add AND/Range toggles)*
  > Added two slide toggles within the entry editor.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.css — tweak flag layout)*
  > Allowed flag badges to wrap and avoid overflow.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-criteria-form.component.css — style link selector)*
  > Added spacing/width rules for the new mat-form-field.
  > ---
  > **Bash** `["bash","-lc","sed -n '320,420p' src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Verified drag/drop handler context before normalizing orders.
  > ---
  > **Apply Patch** *(src/app/components/config-admin/config-workspace.service.ts — default new service-side entries)*
  > Ensured service-generated entries set `andSearch`/`rangeSearch` to `false`.
  > ---
  > **Bash** `["bash","-lc","rg -n \"andSearch\" src/app/components/config-admin/config-workspace.service.ts"]`
  > Double-checked all service touchpoints for the new fields.
  > ---
  > **Bash** `["bash","-lc","rg -n \"CriteriaEntryModel\" -n src/app -g\"*.ts\""]`
  > Searched for other instantiations needing the extended interface.
  > ---
  > **Bash** `["bash","-lc","tail -n 40 src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Ran twice to ensure helper insertions didn’t truncate downstream methods.
  > ---
  > **Bash** `["bash","-lc","wc -l src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Spot-checked file length after large edits.
  > ---
  > **Bash** `["bash","-lc","rg -n \"openEmojiPicker\" -n src/app/components/config-admin/config-criteria-form.component.ts"]`
  > Ensured downstream methods still existed post-patch.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Build failed: TS2739 complaining that service-side `newEntry` lacked `andSearch`/`rangeSearch`; used failure to patch defaults.
  > ---
  > **Bash** `["bash","-lc","sed -n '500,620p' src/app/components/config-admin/config-workspace.service.ts"]`
  > Reviewed service entry creation before adding missing flags.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Build succeeded (same CommonJS + unused-file warnings), verifying UI/model updates compile.
- [x] Specs & Documentation
  > Synced specs: documented the manifest/blueprint loader and new criteria flags in [specs/app/components/config-admin/config-workspace-service.spec.md](../specs/app/components/config-admin/config-workspace-service.spec.md), captured the link selector + AND/Range toggles in [specs/app/components/config-admin/config-criteria-form-component.spec.md](../specs/app/components/config-admin/config-criteria-form-component.spec.md) and [specs/app/components/config-admin/config-criteria-form-component.html.spec.md](../specs/app/components/config-admin/config-criteria-form-component.html.spec.md), then ran a final `npm run build` (same CommonJS/unused-file warnings).
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' specs/app/components/config-admin/config-workspace-service.spec.md"]`
  > Reviewed service spec before describing manifest/blueprint caching + flag support.
  > ---
  > **Apply Patch** *(specs/app/components/config-admin/config-workspace-service.spec.md — add manifest/blueprint + flag notes)*
  > Added a new section on dataset manifest/grouping resolution and noted the expanded criteria flag toggles.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' specs/app/components/config-admin/config-criteria-form-component.spec.md"]`
  > Inspected component spec to slot in link-selector + new toggle descriptions.
  > ---
  > **Apply Patch** *(specs/app/components/config-admin/config-criteria-form-component.spec.md — add flags/linking copy)*
  > Documented the `andSearch`/`rangeSearch` fields and the new “Link existing criteria” selector behavior.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' specs/app/components/config-admin/config-criteria-form-component.html.spec.md"]`
  > Re-read the template spec before noting UI changes.
  > ---
  > **Apply Patch** *(specs/app/components/config-admin/config-criteria-form-component.html.spec.md — mention link select + badges/toggles)*
  > Updated the template spec so the accordion/entry sections call out the new select and badge/toggle set.
  > ---
  > **Bash** `["bash","-lc","npm run build"]`
  > Final build succeeded with the existing CommonJS + unused-file warnings, confirming specs + code align.
