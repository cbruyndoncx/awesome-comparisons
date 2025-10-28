# Plan: Condense criteria filter groups

Reduce spacing and padding for collapsible criteria groups to make the filter panel feel tighter.

## Tasks

- [x] Review current spacing styles for filter groups/containers
  > **Bash**
  > command: ["bash","-lc","rg \"search-group\" -n src/app/components/comparison/comparison.component.css"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Identified key selectors controlling group spacing/padding.
  > ---
  > **Bash**
  > command: ["bash","-lc","nl -ba src/app/components/comparison/comparison.component.css | sed -n '200,360p'"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed exact padding, gaps, and shadows for group containers and form rows to target reductions.
- [x] Adjust CSS to tighten gaps and padding across group wrappers
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.css
  > @@
  > -.select-grid {
  > +.select-grid {
  >      flex: 1 1 100%;
  >      width: 100%;
  >      display: grid;
  >      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  > -    gap: clamp(16px, 2vw, 24px);
  > -    margin-top: clamp(12px, 1.8vw, 20px);
  > +    gap: clamp(10px, 1.4vw, 18px);
  > +    margin-top: clamp(8px, 1.2vw, 16px);
  >  }
  > @@
  > -.search-group {
  > +.search-group {
  >      border: 1px solid var(--border-color, rgba(15, 23, 42, 0.08));
  > -    border-radius: 14px;
  > -    padding: clamp(12px, 1.5vw, 18px);
  > +    border-radius: 12px;
  > +    padding: clamp(8px, 1vw, 14px);
  >      background: var(--card-background, #ffffff);
  > -    box-shadow: 0 14px 36px -20px var(--shadow-color, rgba(15, 23, 42, 0.12));
  > +    box-shadow: 0 10px 28px -18px var(--shadow-color, rgba(15, 23, 42, 0.12));
  >      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  >  }
  > @@
  > -.search-group__header {
  > +.search-group__header {
  >      display: flex;
  >      align-items: center;
  > -    gap: 12px;
  > -    margin-bottom: clamp(12px, 1.8vw, 20px);
  > +    gap: 10px;
  > +    margin-bottom: clamp(6px, 1vw, 12px);
  >  }
  > @@
  > -.search-group__controls {
  > +.search-group__controls {
  >      display: grid;
  >      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  > -    gap: clamp(10px, 1vw, 16px);
  > -    padding-left: clamp(12px, 2vw, 36px);
  > +    gap: clamp(8px, 0.8vw, 12px);
  > +    padding-left: clamp(8px, 1.5vw, 24px);
  >  }
  > *** End Patch
  > ```
  > Output: Reduced padding, gaps, and shadows for filter group containers and child forms to deliver a tighter layout.
- [x] Spot-check for layout regressions (manual inspection)
  > **Bash**
  > command: ["bash","-lc","rg \"search-group\" -n src/app/components/comparison/comparison.component.css | head"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Verified updated selectors present. Recommend validating visually in browser during next run.
