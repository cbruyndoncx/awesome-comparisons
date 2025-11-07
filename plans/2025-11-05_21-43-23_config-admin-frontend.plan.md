# Plan: Config Admin Frontend & Service Specs

Define remaining specs and supporting docs to implement the Config Admin GUI frontend and workspace integration.

## Tasks

- [x] Capture requirements for ConfigWorkspaceService
  > **Tessl Create** `spec="specs/app/components/config-admin/config-workspace-service.spec.md"`
  > ```markdown
  > prompt:
  > Create a spec for an Angular service named `ConfigWorkspaceService` located at `src/app/components/config-admin/config-workspace.service.ts`. The service must coordinate client-side data flow between the Config Admin GUI and the filesystem-backed workspace API at `/api/config/...`.
  > ...
  > ```
  > Generated [specs/app/components/config-admin/config-workspace-service.spec.md](../specs/app/components/config-admin/config-workspace-service.spec.md) capturing catalog management, working copy mutation helpers, YAML preview generation, and save/revert flows tied to the backend API.
  > ---
  > **Bash** `command=["bash","-lc","cat specs/app/components/config-admin/config-workspace-service.spec.md"]`, `workdir="/home/cb/projects/github/ultimate/awesome-comparisons"`  
  > Reviewed the spec to confirm exposed observables, methods, and dependency annotations.
- [x] Define supporting UI component specs (catalog tree, criteria form, diff viewer)
  > **Tessl Create** `spec="specs/app/components/config-admin/config-catalog-tree-component.spec.md"`
  > ```markdown
  > prompt:
  > Create a spec for `ConfigCatalogTreeComponent` located at `src/app/components/config-admin/config-catalog-tree.component.ts`. This component renders the left-hand catalog panel for the Config Admin GUI.
  > ...
  > ```
  > Authored [specs/app/components/config-admin/config-catalog-tree-component.spec.md](../specs/app/components/config-admin/config-catalog-tree-component.spec.md) defining grouping, filters, virtual scroll, and accessibility requirements.
  > ---
  > **Bash** `command=["bash","-lc","cat specs/app/components/config-admin/config-catalog-tree-component.spec.md"]`, `workdir="/home/cb/projects/github/ultimate/awesome-comparisons"`  
  > Verified catalog tree spec content.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-criteria-form-component.spec.md"`
  > ```markdown
  > prompt:
  > Create a spec for `ConfigCriteriaFormComponent` located at `src/app/components/config-admin/config-criteria-form.component.ts`. The component manages the center editing pane for criteria groups, criteria entries, and value display overrides.
  > ...
  > ```
  > Added [specs/app/components/config-admin/config-criteria-form-component.spec.md](../specs/app/components/config-admin/config-criteria-form-component.spec.md) capturing reactive form structure, validation, keyboard shortcuts, and event contracts.
  > ---
  > **Bash** `command=["bash","-lc","cat specs/app/components/config-admin/config-criteria-form-component.spec.md"]`, `workdir="/home/cb/projects/github/ultimate/awesome-comparisons"`  
  > Spot-checked generated spec (large output truncated in terminal).
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-diff-viewer-component.spec.md"`
  > ```markdown
  > prompt:
  > Create a spec for `ConfigDiffViewerComponent` at `src/app/components/config-admin/config-diff-viewer.component.ts`. This component renders the right-hand preview and diff panel for YAML documents.
  > ...
  > ```
  > Authored [specs/app/components/config-admin/config-diff-viewer-component.spec.md](../specs/app/components/config-admin/config-diff-viewer-component.spec.md) covering diff2html integration, toolbar controls, metadata, and accessibility.
  > ---
  > **Bash** `command=["bash","-lc","cat specs/app/components/config-admin/config-diff-viewer-component.spec.md"]`, `workdir="/home/cb/projects/github/ultimate/awesome-comparisons"`  
  > Confirmed diff viewer spec details.
- [x] Update implementation plan with frontend spec coverage
  > **apply_patch** `*** Update File: docs/config-admin-gui-implementation-plan.md` ...  
  > Noted newly created component specs within Phase 3 of the rollout plan, replacing generic bullets with links to the spec files.
- [x] Summarize progress and next actions for the user
  > No additional tool calls required. Prepared final response outlining newly created service/component specs, plan updates, and recommended next steps.
