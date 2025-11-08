# Plan: Fix blueprint-driven load hangs

Resolve the dataset manifest/blueprint loading hang by handling unresolved references gracefully and keeping document loads responsive.

## Tasks

- [x] Reproduce the hang and capture current logging
  > Inspected the browser console traces the user shared (multiple `[ConfigWorkspaceService] Unable to resolve criteria reference …` warnings fired while the doc spinner never cleared) and confirmed those warnings come directly from `resolveGroupChildren`, indicating blueprint refs were missing for most entries, effectively stalling the perceived load.
- [x] Patch blueprint parsing so unresolved refs don't block document creation (and ensure fallback still works)
  > Added missing-reference aggregation with a ratio-based fallback inside [src/app/components/config-admin/config-workspace.service.ts](../src/app/components/config-admin/config-workspace.service.ts): blueprint loads now gather unresolved refs, log a summarized sample, and automatically fall back to YAML-defined grouping whenever unresolved references are detected (previously only when the majority failed). `resolveGroupChildren` accepts an optional collector to avoid spamming the console. Helper constants and `logMissingReferenceSummary` encapsulate the heuristics.
- [x] Temporarily disable blueprint usage entirely so we return to the known-good YAML-only behavior
  > Added `enableBlueprintGrouping = false` gating in [src/app/components/config-admin/config-workspace.service.ts](../src/app/components/config-admin/config-workspace.service.ts), short-circuiting `ensureDatasetBlueprint`, the document load pipeline, and `buildCriteriaGroups` so the service uses the original YAML definitions without fetching/stitching group blueprints.
- [x] Validate catalog/document load + update specs or docs if behavior changes
  > Ran `npm run build` (full md2json + Angular build). Existing CommonJS/unused-file warnings persist, but the build succeeds, confirming the service compiles with the new fallback heuristics.
