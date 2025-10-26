# Plan: Reduce collapsed criteria footprint

The filter card still occupies significant space even when individual groups are collapsed. Add an option to collapse the entire criteria card down to a compact header row, while preserving quick access to reset and bulk controls.

## Tasks

- [x] Sketch the UX changes: determine toggle placement, state, and how controls behave when the whole card is collapsed
  > **Bash** `nl -ba src/app/components/comparison/comparison.template.html | sed -n '20,80p'`
  >
  > Reviewed the current toolbar and grid markup to identify where a “Hide filters” toggle can live. Plan: add a compact summary bar (heading + icon button) that collapses the entire `select-grid`, leaves toolbar accessible when expanded, and shows a single-line status when collapsed.
- [x] Implement component logic + template + styles for the full-card collapse, ensuring accessibility and preserving existing buttons
  > **Edit** `src/app/components/comparison/comparison.template.html`
  > - Introduced a toolbar split into primary/secondary sections, added a Hide/Show toggle button with hint text, and gated the criteria grid behind `*ngIf="!filtersCollapsed"`.
  > ---
  > **Edit** `src/app/components/comparison/comparison.component.ts`
  > - Added `filtersCollapsed` state plus `toggleFiltersCollapsed` to control the new toggle button.
  > ---
  > **Edit** `src/app/components/comparison/comparison.component.css`
  > - Updated toolbar layout to space the new sections, styled the toggle button, and added the collapsed hint text styling.
- [x] Run `npm run build` to verify everything compiles
  > **Bash** `npm run build`
  >
  > Build completed with no TypeScript or template errors, confirming the new collapse behavior integrates cleanly.
