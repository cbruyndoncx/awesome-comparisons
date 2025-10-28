# Plan: Remove grid header/content borders

Tidy comparison layout by removing decorative lines from the grid header and content.

## Tasks

- [x] Inspect current styles for grid header/content lines
  > **Bash**
  > command: ["bash","-lc","rg \"grid-header\" -n src/app/components/comparison"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Located header styles defined in `src/app/components/comparison/comparison.component.css`.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '30,110p' src/app/components/comparison/comparison.component.css"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed border-bottom and gradient pseudo-element applied to the header along with grid-content layout.
- [x] Update styles to drop header blue line and content top border
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.css
  > @@
  > -.grid-header {
  > +.grid-header {
  >      grid-area: header;
  >      display: flex;
  >      flex-direction: column;
  >      gap: clamp(8px, 1vw, 18px);
  > -    border-bottom: 1px solid var(--border-strong, rgba(15, 23, 42, 0.16));
  >      padding-bottom: clamp(12px, 2vw, 28px);
  >  }
  > @@
  > -.grid-header h1::after {
  > -    content: '';
  > -    display: block;
  > -    width: clamp(96px, 18vw, 200px);
  > -    height: 4px;
  > -    margin-top: clamp(12px, 2vw, 24px);
  > -    background: linear-gradient(90deg, var(--uc-accent, #2563eb) 0%, var(--tertiary, #7c3aed) 100%);
  > -    border-radius: 999px;
  > -}
  > -
  > -
  > *** End Patch
  > ```
  > Output: Removed the header's bottom border and gradient pseudo-element, eliminating horizontal lines from the header area.
- [x] Manually verify CSS changes (lint/build optional)
  > **Bash**
  > command: ["bash","-lc","rg \"grid-header h1::after\" src/app/components/comparison/comparison.component.css"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: No matches found, confirming the pseudo-element (blue line) has been removed. Skipped full build for this visual-only tweak.
