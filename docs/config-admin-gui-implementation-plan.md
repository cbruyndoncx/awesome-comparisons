# YAML Configuration Admin GUI – Implementation Plan

## Scope and Goals
- Provide an internal-only admin workflow for curating YAML fragments that define comparison criteria, value displays, and dataset defaults.
- Preserve file-based persistence (no database) while adding guardrails, validation, and diff-based review.
- Support both shared defaults under `configuration/` and dataset overrides under `datasets/*/config/`.

## Assumptions
- The admin tool runs alongside the existing Angular application and can rely on Node tooling in this monorepo.
- A lightweight backend endpoint can be added (e.g. Express within the existing Gulp tooling or a dedicated Nest/Express server) to read/write YAML because the browser cannot write to disk.
- YAML files follow the schema described in `README.md`; new fields must remain backward compatible.
- Future specs (e.g. `ConfigWorkspaceService`, `ConfigDiffViewerComponent`) will be implemented to satisfy the shell component spec.

## Phase 0 – Discovery and Design Sign-off
- Confirm the list of YAML sources to expose (shared defaults, dataset overrides, template files).
- Catalogue edge cases (nested children, value-display overrides, comment usage) and collect sample files for test fixtures.
- Validate user expectations for comment preservation, ordering, and formatting; decide on a YAML library that supports round-trip editing (e.g. `yaml` with CST support).
- Finalise UX mockups for the three-panel layout, diff interactions, and form flows.

## Phase 1 – Backend Workspace API
- Scaffold a `config-workspace` backend module exposing REST endpoints:
  - `GET /api/config/catalog` to enumerate editable files with metadata (dataset scope, last modified timestamps).
  - `GET /api/config/:id` to return parsed document, raw YAML, and checksum/etag.
  - `PUT /api/config/:id` to accept structured changes and raw YAML, perform merge, update file, and respond with new metadata.
- Wrap filesystem access with robust error handling, per-file locking, and path safelists.
- Implement YAML parsing/serialization using chosen library with comment preservation; add unit tests covering complex fixture transformations.
- Integrate with existing build/dev flow (e.g. extend `npm run dev` server) and document environment variables if needed.

## Phase 2 – Angular Infrastructure
- Add `ConfigAdminModule` with route registration (`/admin/config`) and guard that limits access (feature flag or environment check).
- Implement `ConfigWorkspaceService` to call backend endpoints, map DTOs into typed models, and expose observables for the shell component.
- Define shared models (`ConfigCatalogItem`, `ConfigDocument`, `CriteriaGroup`, `ValueDisplayOverride`) in a dedicated `config-admin` domain folder.
- Provide ngrx or component-level state management (e.g. `ComponentStore`) to track catalog, selection, working copies, and dirty flags.

## Phase 3 – UI Components
- Build `ConfigAdminShellComponent` (per spec) orchestrating layout, filters, and save/revert actions.
- Create `ConfigCatalogTreeComponent` for left panel tree/list with dataset/type filters and search. *(Spec: `specs/app/components/config-admin/config-catalog-tree-component.spec.md`)*
- Implement `ConfigCriteriaFormComponent` to edit groups/criteria using reactive forms, including add/clone/reorder controls and value display overrides. *(Spec: `specs/app/components/config-admin/config-criteria-form-component.spec.md`)*
- Implement `ConfigDiffViewerComponent` leveraging diff2html/highlight.js for YAML comparisons with unified and split views. *(Spec: `specs/app/components/config-admin/config-diff-viewer-component.spec.md`)*
- Ensure keyboard navigation, focus management, and responsive resizing across panels.

## Phase 4 – Validation, Testing, and Tooling
- Write unit tests for services, form components, and reducers/component-store logic.
- Add end-to-end tests (e.g. Cypress) for critical flows: load config, edit field, reorder, save, revert.
- Implement unsaved-change guard (`CanDeactivate`) and confirm dirty-state prompts.
- Provide mock data and Storybook (or Angular standalone harness) stories for rapid UX validation.
- Add linting/formatting rules for configuration domain (e.g. consistent order fields) with CI checks.

## Phase 5 – Documentation and Rollout
- Update README/admin docs with usage instructions, backend requirements, and safety guidelines.
- Add troubleshooting section for merge conflicts, validation errors, and concurrent edits.
- Coordinate adoption plan: run tool locally, validate on sample datasets, then enable in production builds (or gated behind feature flag).
- Establish process for reviewing generated diffs before committing YAML changes (e.g. git hooks or PR checklist updates).

## Final Decisions / Constraints
- `/admin/config` runs locally without additional authentication or authorization requirements.
- The tool only supports curated YAML files (shared defaults and dataset overrides); arbitrary file editing is out of scope.
- Live preview inside the public comparison UI before saving is not required.
- Git history is sufficient for versioning; no extra snapshot system will be created.
- Backend workspace service should extend existing Node/Gulp tooling rather than introducing a new framework.
