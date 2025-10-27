# Plan: Adjust Filter Toolbar Controls

Hide collapse/expand buttons when filters are collapsed and reposition the reset button to the card's top-right.

## Tasks

- [x] Inspect comparison template for toolbar markup and bindings
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' src/app/components/comparison/comparison.template.html"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Located select toolbar structure including collapse/expand buttons and reset button container.
- [x] Update template/CSS to conditionally show collapse buttons and reposition reset button
  > **Edit** `src/app/components/comparison/comparison.template.html`
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  > -                    <div class="select-toolbar__subactions">
  > +                    <div class="select-toolbar__subactions" *ngIf="!filtersCollapsed">
  > *** End Patch
  > ```
  > Added structural directive so collapse/expand controls disappear when filters are hidden.
  > ---
  > **Edit** `src/app/components/comparison/comparison.component.css`
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.css
  > @@
  >  .select-toolbar {
  >      display: flex;
  >      justify-content: space-between;
  >      align-items: center;
  >      margin-bottom: 12px;
  >      gap: 12px;
  >      flex-wrap: wrap;
  > +    position: relative;
  > +    padding-right: clamp(120px, 22vw, 180px);
  >  }
  > @@
  > -.select-toolbar__side--actions {
  > -    justify-content: flex-end;
  > -}
  > +.select-toolbar__side--actions {
  > +    position: absolute;
  > +    top: 0;
  > +    right: 0;
  > +    justify-content: flex-end;
  > +}
  > @@
  > +@media (max-width: 640px) {
  > +    .select-toolbar {
  > +        padding-right: 0;
  > +    }
  > +
  > +    .select-toolbar__side--actions {
  > +        position: static;
  > +        width: 100%;
  > +        justify-content: flex-end;
  > +    }
  > +}
  > *** End Patch
  > ```
  > Positioned the reset action at the card’s top-right while preserving responsive behavior.
- [x] Verify layout via build or lint if possible
  > **Bash**
  > ```
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Build succeeded, confirming template and style updates compile cleanly.
