# Plan: Fix filter grid layout when collapsed

Ensure comparison filter groups align in their intended grid layout even after moving them inside the toolbar.

## Tasks

- [x] Inspect current template and styles for filter toolbar/grid
  > **Bash**
  > command: ["bash","-lc","rg \"filtersCollapsed\" -n src/app/components/comparison"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Located toggle logic tying collapsible state to toolbar grid markup.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '1,120p' src/app/components/comparison/comparison.template.html"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed updated structure with `select-grid` moved inside toolbar wrapper.
  > ---
  > **Bash**
  > command: ["bash","-lc","nl -ba src/app/components/comparison/comparison.component.css | sed -n '100,200p'"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Inspected existing `.select-grid` and `.select-toolbar` styles causing flex wrapping constraints.
- [x] Adjust layout logic/CSS so collapsed filters render as responsive grid rows
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.css
  > @@
  > -.select-toolbar {
  > -    display: flex;
  > -    justify-content: space-between;
  > -    align-items: center;
  > -    margin-bottom: clamp(12px, 2vw, 24px);
  > -    gap: clamp(10px, 2vw, 20px);
  > -    flex-wrap: wrap;
  > -    position: relative;
  > -    padding: clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px);
  > -    padding-right: clamp(140px, 24vw, 200px);
  > -    border: 1px solid var(--border-color, rgba(15, 23, 42, 0.08));
  > -    border-radius: 18px;
  > -    background: linear-gradient(90deg, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%);
  > -    backdrop-filter: blur(6px);
  > -}
  > -
  > -.select-grid {
  > -    display: grid;
  > -    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  > -    gap: 20px;
  > -}
  > +.select-toolbar {
  > +    display: flex;
  > +    justify-content: space-between;
  > +    align-items: flex-start;
  > +    margin-bottom: clamp(12px, 2vw, 24px);
  > +    gap: clamp(10px, 2vw, 20px);
  > +    flex-wrap: wrap;
  > +    position: relative;
  > +    padding: clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px);
  > +    border: 1px solid var(--border-color, rgba(15, 23, 42, 0.08));
  > +    border-radius: 18px;
  > +    background: linear-gradient(90deg, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%);
  > +    backdrop-filter: blur(6px);
  > +}
  > +
  > +.select-grid {
  > +    flex: 1 1 100%;
  > +    width: 100%;
  > +    display: grid;
  > +    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  > +    gap: clamp(16px, 2vw, 24px);
  > +    margin-top: clamp(12px, 1.8vw, 20px);
  > +}
  > @@
  > -.select-toolbar__side--actions {
  > -    position: absolute;
  > -    top: 0;
  > -    right: 0;
  > -    justify-content: flex-end;
  > +.select-toolbar__side--actions {
  > +    margin-left: auto;
  > +    justify-content: flex-end;
  >  }
  > @@
  >  @media (max-width: 640px) {
  >      .select-toolbar {
  > -        padding-right: 0;
  > +        padding-right: clamp(16px, 3vw, 28px);
  >      }
  >  
  >      .select-toolbar__side--actions {
  > -        position: static;
  > -        width: 100%;
  > -        justify-content: flex-end;
  > +        position: static;
  > +        width: 100%;
  > +        justify-content: flex-end;
  > +        margin-left: 0;
  >      }
  > ```
  > Output: Reworked toolbar layout so the filter grid spans full width with responsive columns, and action buttons remain aligned without forcing the grid into a single column.
- [x] Spot-check UI layout (no full build required)
  > **Bash**
  > command: ["bash","-lc","rg \"select-grid\" -n src/app/components/comparison/comparison.component.css"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed the updated grid styles apply within the toolbar stylesheet. Manual UI smoke check recommended during next local run.
