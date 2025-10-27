# Plan: Remove Dataset Details Panel

Eliminate the dataset details section from the UI so only the tab selector and comparison content remain.

## Tasks

- [x] Review current dataset shell spec and template to understand generated structure
  > **Bash**
  > ```
  > {"command":["bash","-lc","sed -n '1,200p' specs/app/components/datasets/dataset-shell-template.spec.md"],"workdir":"/home/cb/projects/github/ultimate/ultimate-comparison-framework"}
  > ```
  > Inspected spec describing selector, dataset details, and content regions generated into the dataset shell template.
- [x] Update spec/template to remove dataset details section
  > **Edit** `specs/app/components/datasets/dataset-shell-template.spec.md`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/datasets/dataset-shell-template.spec.md
  > @@
  > -Wraps entire UI in a `.dataset-shell` container that shows a selector region, dataset details, and the embedded comparison view.
  > +Wraps entire UI in a `.dataset-shell` container that shows a selector region and the embedded comparison view.
  > @@
  > -### Dataset details region
  > -
  > -Uses another `*ngIf="(activeDataset$ | async) as activeDataset"` to show heading inside `.dataset-details`, full description, and optional icon/accent badge (`.dataset-details__badge`) colorized via `[style.backgroundColor]` binding when manifest provides `accentColor`.
  > -
  > -Renders dataset description as plain text inside a paragraph and includes fallback text when missing.
  > -
  > *** End Patch
  > ```
  > Removed documentation for the dataset details block.
  > ---
  > **Edit** `src/app/components/datasets/dataset-shell.component.html`
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/datasets/dataset-shell.component.html
  > @@
  > -  <!-- Dataset details region -->
  > -  <section class="dataset-details"
  > -           *ngIf="(activeDataset$ | async) as activeDataset"
  > -           role="region"
  > -           [attr.aria-labelledby]="'dataset-panel-' + activeDataset.id + '-title'">
  > -    <h2 class="sr-only" [attr.id]="'dataset-panel-' + activeDataset.id + '-title'">
  > -      {{activeDataset.displayLabel}}
  > -    </h2>
  > -    <p class="dataset-details__summary" *ngIf="activeDataset.shortDescription">
  > -      {{activeDataset.shortDescription}}
  > -    </p>
  > -    <span class="dataset-details__badge" *ngIf="activeDataset.accentColor">
  > -      Active
  > -    </span>
  > -    <p class="dataset-details__description" *ngIf="activeDataset.description">
  > -      {{activeDataset.description}}
  > -    </p>
  > -  </section>
  > -  
  >   <!-- Content region -->
  > *** End Patch
  > ```
  > Deleted the dataset details markup so only the tab selector and comparison content remain.
- [x] Ensure build or template usage remains consistent after change
  > **Bash**
  > ```
  > {"command":["bash","-lc","npm run build"],"workdir":"/home/cb/projects/github/ultimate-comparison-framework","timeout_ms":120000}
  > ```
  > Build succeeded with the dataset details section removed, confirming templates compiles cleanly.
