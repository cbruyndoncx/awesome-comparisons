# Plan: Implement Config Admin Service & Components

Generate and integrate the Config Admin workspace service and UI components according to newly created specs.

## Tasks

- [x] Build Angular service and component specs (workspace service, shell, catalog tree, criteria form, diff viewer)
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-admin-shell-component.spec.md","specs/app/components/config-admin/config-workspace-service.spec.md","specs/app/components/config-admin/config-catalog-tree-component.spec.md","specs/app/components/config-admin/config-criteria-form-component.spec.md","specs/app/components/config-admin/config-diff-viewer-component.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Build attempt timed out after 60s; no files generated. Will retry with individual builds or adjusted timeout.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-workspace-service.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Generated `src/app/components/config-admin/config-workspace.service.ts`; catalog filtering observable produced from internal cache. Build completed successfully.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-admin-shell-component.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Initial run failed because dependency references in spec pointed at missing paths; spec updated to correct relative references. Second run reported missing RxJS dependency; spec updated. Third attempt timed out after 60s with code already generated—pending successful verification on next retry.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-admin-shell-component.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Verification succeeded after spec adjustments; code generation skipped on final pass confirming spec/code alignment.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-catalog-tree-component.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Build reported code already up-to-date; spec validated successfully.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-criteria-form-component.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Build succeeded with no new code generation required.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-diff-viewer-component.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Build succeeded with existing code satisfying the spec.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-workspace-service.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Retried after refactoring shared model specs; initial run timed out, subsequent run completed with code already up-to-date.
- [x] Author component templates and styles (HTML/CSS specs for shell, catalog tree, criteria form, diff viewer)
  > **Tessl Create** `spec="specs/app/components/config-admin/config-admin-shell-component.html.spec.md"`
  > Created template spec outlining toolbar actions, three-panel layout, and child component bindings for the admin shell.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-admin-shell-component.css.spec.md"`
  > Documented responsive CSS grid, panel styling, and sticky toolbars for the shell stylesheet.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-catalog-tree-component.html.spec.md"`
  > Captured navigation template with filters, virtual scroll, and grouping for the catalog tree.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-catalog-tree-component.css.spec.md"`
  > Defined layout, chip, and virtual-scroll styling rules for the catalog tree panel.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-criteria-form-component.html.spec.md"`
  > Added reactive form template spec with accordion layout, drag-drop lists, and validation messaging for the criteria editor.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-criteria-form-component.css.spec.md"`
  > Specified sticky action bar, accordion styling, and responsive grid for the criteria form stylesheet.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-diff-viewer-component.html.spec.md"`
  > Defined diff viewer toolbar, error fallback, and scrollable diff rendering structure.
  > ---
  > **Tessl Create** `spec="specs/app/components/config-admin/config-diff-viewer-component.css.spec.md"`
  > Added styling spec for diff viewport, toolbar, and error/loading states.
  > ---
  > **Tessl Build** generated HTML/CSS files for all four components after updating dependency declarations; reran builds to resolve verification failures (missing Angular Material/CDK modules). Old mis-targeted files under `specs/src/...` removed.
- [x] Review generated code for alignment with specs and project conventions
  > Inspected generated TypeScript files under `src/app/components/config-admin/`. Confirmed core logic scaffolds for shell, catalog tree, criteria form, diff viewer, and workspace service.
  > Identified follow-up gaps:
  > - Wired `ConfigAdminShellComponent` to new template (preview/diff state, catalog handlers, doc mutation proxy), but still need to validate end-to-end once services are finalised.
  > - Updated `ConfigCatalogTreeComponent` to emit grouped view data and richer filter state; remaining work includes polishing dataset/type toggle UX and tying drawer toggle into layout.
  > - `ConfigCriteriaFormComponent` and diff viewer now rely on shared model helpers; ensure workspace merge logic (`applyDocumentFormValue`) is exercised with real form data.
  > - Still need to install diff-related dependencies (`diff2html`, `highlight.js`, `diff`) and add Angular Material/CDK modules to an NgModule before running the build.
- [x] Wire components into Angular modules/routing and ensure dependencies are declared
  > **Tessl Create** `spec="specs/app/components/config-admin/config-admin-module.spec.md"`
  > Authored feature module spec declaring admin components, Material/CDK imports, and forChild routing scaffolding.
  > ---
  > **Tessl Build** `spec=["specs/app/components/config-admin/config-admin-module.spec.md"]`, `generateCode=["missing","outdated","dirty"]`, `modelName="auto"`, `timeoutSecs=600`
  > Generated [src/app/components/config-admin/config-admin.module.ts](../src/app/components/config-admin/config-admin.module.ts) after adjusting spec dependency declarations and target path.
  > ---
  > **Bash** `apply_patch` edited [src/app/app.module.ts](../src/app/app.module.ts) to lazy-load `ConfigAdminModule` at `/admin/config`.
  > ---
  > **Bash** `apply_patch` updated [package.json](../package.json) adding `diff`, `diff2html`, `highlight.js` dependencies for diff viewer support (npm install still required).
- [x] Run lint/build (or targeted checks) to confirm no regressions
  > **Bash** `npm run build`
  > Angular build succeeded (only standard CommonJS warnings from diff2html); confirms new module compiles and lazy route bundles correctly.
- [ ] Summarize outcomes and follow-up actions for the user
