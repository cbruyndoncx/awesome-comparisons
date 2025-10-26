# Plan: Add global collapse/expand controls for criteria filters

The criteria filter card now has per-group toggles, but collapsing all sections requires many clicks. Introduce convenience controls to collapse or expand every filter group (including the “Other” block) at once, while keeping the per-group state logic intact.

## Tasks

- [x] Review current collapse state tracking (`ComparisonComponent`) and work out the shape of the bulk toggle helpers
  > **Bash** `nl -ba src/app/components/comparison/comparison.template.html | sed -n '40,160p'`
  >
  > Inspected the existing per-group toggle markup in [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html) to confirm aria attributes, toggle buttons, and conditional containers that would need to be wrapped by any global control.
  > ---
  >
  > **Bash** `nl -ba src/app/components/comparison/comparison.component.ts | sed -n '1,210p'`
  >
  > Reviewed the component’s collapse-related state (`collapsedFilterGroups`, `ungroupedCollapsed`) and helper methods in [src/app/components/comparison/comparison.component.ts](../src/app/components/comparison/comparison.component.ts), noting there are only per-group toggles and no helpers for bulk collapse operations.
- [x] Implement UI buttons in the filter toolbar plus component logic to collapse/expand all groups and the ungrouped block
  > **Bash/Edit (apply_patch)** `src/app/components/comparison/comparison.template.html`
  >
  > Added “Collapse all” and “Expand all” buttons beside the existing reset control so the toolbar drives bulk visibility for every criteria group. Buttons call new helpers and disable themselves when no further action is needed. See [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html).
  > ---
  >
  > **Bash/Edit (apply_patch)** `src/app/components/comparison/comparison.component.ts`
  >
  > Introduced helpers (`setAllGroupCollapse`, `areAllFilterGroupsCollapsed`, `areAllFilterGroupsExpanded`, `relevantFilterGroups`) that reuse existing group metadata to toggle or evaluate collapse state for every group plus the ungrouped section. These methods keep the per-group map in sync and respect excluded groups. See [src/app/components/comparison/comparison.component.ts](../src/app/components/comparison/comparison.component.ts).
  > ---
  >
  > **Bash/Edit (apply_patch)** `src/app/components/comparison/comparison.component.css`
  >
  > Tweaked `.select-toolbar` to wrap and space multiple buttons so the new controls fit cleanly on small screens. See [src/app/components/comparison/comparison.component.css](../src/app/components/comparison/comparison.component.css).
- [x] Run `npm run build` to ensure the UI compiles cleanly and update any related docs if necessary
  > **Bash** `npm run build`
  >
  > Full Angular build (including `data:prepare`) succeeded, confirming the updated toolbar logic and helpers compile without TypeScript errors.
