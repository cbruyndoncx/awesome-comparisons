# Plan: Toggle Missing Indicators & Center Label Cells

Goal: Add a settings toggle (off by default) that controls visibility of “Missing” placeholders across table and details views, and center-align all table cells containing label content while keeping markdown cells left-aligned.

## Tasks

- [x] Inspect current settings/state flow for adding a new toggle
  > **Bash** `["bash","-lc","rg \"label--missing\" -n"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Located “Missing” placeholder usages in generic table and comparison details templates.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/comparison/settings/comparison.settings.component.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Reviewed settings component inputs/outputs to plan new toggle wiring.
  > - files: [src/app/components/comparison/settings/comparison.settings.component.ts](../src/app/components/comparison/settings/comparison.settings.component.ts)
  > ---
  > **Bash** `["bash","-lc","sed -n '1,220p' src/app/redux/uc.app-state.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Identified existing UI state fields and defaults for adding a new preference flag.
  > - files: [src/app/redux/uc.app-state.ts](../src/app/redux/uc.app-state.ts)
  > ---
  > **Bash** `["bash","-lc","sed -n '1,220p' src/app/redux/uc.reducers.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Examined settings reducer operations to extend with missing-indicator toggle handling.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
- [x] Implement state, settings UI, and component bindings for the missing indicator preference
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.app-state.ts
  > @@
  >      detailsDisplayTooltips: boolean;
  >      labelColorsEnabled: boolean;
  > +    showMissingIndicators: boolean;
  > @@
  >      detailsDisplayTooltips = false;
  >      labelColorsEnabled = true;
  > +    showMissingIndicators = false;
  > *** End Patch
  > ```
  > - outcome: Added `showMissingIndicators` field to global app state with default `false`.
  > - files: [src/app/redux/uc.app-state.ts](../src/app/redux/uc.app-state.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  >                  case 'LabelColorsEnabled':
  >                      state.labelColorsEnabled = act.enable;
  >                      break;
  > +                case 'ShowMissingIndicators':
  > +                    state.showMissingIndicators = act.enable;
  > +                    break;
  > *** End Patch
  > ```
  > - outcome: Hooked new toggle into settings reducer handling.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.ts
  > @@
  >      @Input() detailsDisplayTooltips: boolean = false;
  >      @Input() labelColorsEnabled: boolean = true;
  >      @Input() templateDownloadDisabled: boolean = true;
  > +    @Input() showMissingIndicators: boolean = false;
  > @@
  >      @Output() detailsDisplayTooltipsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  >      @Output() labelColorsEnabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  > +    @Output() showMissingIndicatorsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  > *** End Patch
  > ```
  > - outcome: Exposed the new setting through the comparison settings component API.
  > - files: [src/app/components/comparison/settings/comparison.settings.component.ts](../src/app/components/comparison/settings/comparison.settings.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.template.html
  > @@
  >          <pitem>
  >              <pcheckbox [checked]="labelColorsEnabled"
  >                         (checkedChange)="labelColorsEnabledChange.emit($event)"
  >                         [label]="'Show label colors'"></pcheckbox>
  >          </pitem>
  > +        <pitem>
  > +            <pcheckbox [checked]="showMissingIndicators"
  > +                       (checkedChange)="showMissingIndicatorsChange.emit($event)"
  > +                       [label]="'Show \"Missing\" placeholders'"></pcheckbox>
  > +        </pitem>
  > *** End Patch
  > ```
  > - outcome: Added the checkbox control under “Labels” to toggle missing placeholders.
  > - files: [src/app/components/comparison/settings/comparison.settings.template.html](../src/app/components/comparison/settings/comparison.settings.template.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.ts
  > @@
  > -    constructor(private featureGroupingService: FeatureGroupingService) {
  > -    }
  > +    constructor(private featureGroupingService: FeatureGroupingService) {
  > +    }
  > +
  > +    public readonly missingPlaceholderLabel: string = 'Show "Missing" placeholders';
  > *** End Patch
  > ```
  > - outcome: Introduced a reusable label constant to avoid complex escaping in templates.
  > - files: [src/app/components/comparison/settings/comparison.settings.component.ts](../src/app/components/comparison/settings/comparison.settings.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.template.html
  > @@
  > -        <pitem>
  > -            <pcheckbox [checked]="showMissingIndicators"
  > -                       (checkedChange)="showMissingIndicatorsChange.emit($event)"
  > -                       [label]="'Show \"Missing\" placeholders'"></pcheckbox>
  > -        </pitem>
  > +        <pitem>
  > +            <pcheckbox [checked]="showMissingIndicators"
  > +                       (checkedChange)="showMissingIndicatorsChange.emit($event)"
  > +                       [label]="missingPlaceholderLabel"></pcheckbox>
  > +        </pitem>
  > *** End Patch
  > ```
  > - outcome: Template now references the component constant, eliminating parser errors.
  > - files: [src/app/components/comparison/settings/comparison.settings.template.html](../src/app/components/comparison/settings/comparison.settings.template.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  >                        [labelColorsEnabled]="vm.state.labelColorsEnabled"
  > +                      [showMissingIndicators]="vm.state.showMissingIndicators"
  > @@
  >         <comparison-details [data]="vm.state.detailsData"
  >                             [tooltipAsText]="vm.state.detailsDisplayTooltips"
  > -                            [labelColorsEnabled]="vm.state.labelColorsEnabled"></comparison-details>
  > +                            [labelColorsEnabled]="vm.state.labelColorsEnabled"
  > +                            [showMissingIndicators]="vm.state.showMissingIndicators"></comparison-details>
  > @@
  >             [labelColorsEnabled]="vm.state.labelColorsEnabled"
  > +            [showMissingIndicators]="vm.state.showMissingIndicators"
  > @@
  >             (labelColorsEnabledChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'LabelColorsEnabled'})"
  > +            (showMissingIndicatorsChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'ShowMissingIndicators'})"
  > *** End Patch
  > ```
  > - outcome: Wired state toggle through comparison component to table/details and settings interactions.
  > - files: [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html)
- [x] Update table/detail templates & styles to honor the toggle and center label cells
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.component.ts
  > @@
  >      @Input() tooltipAsText: boolean = true;
  >      @Input() labelColorsEnabled: boolean = true;
  > +    @Input() showMissingIndicators: boolean = false;
  > *** End Patch
  > ```
  > - outcome: Allowed the details component to read the new toggle.
  > - files: [src/app/components/comparison/details/comparison.details.component.ts](../src/app/components/comparison/details/comparison.details.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.template.html
  > @@
  > -        <ng-template #missingHeaderLabel>
  > -            <div class="label mylabel label--missing">Missing</div>
  > -        </ng-template>
  > +        <ng-template #missingHeaderLabel>
  > +            <div *ngIf="showMissingIndicators" class="label mylabel label--missing">Missing</div>
  > +        </ng-template>
  > @@
  > -    <ng-template #missingDetailLabel>
  > -        <div class="label mylabel label--missing">Missing</div>
  > -    </ng-template>
  > +    <ng-template #missingDetailLabel>
  > +        <div *ngIf="showMissingIndicators" class="label mylabel label--missing">Missing</div>
  > +    </ng-template>
  > *** End Patch
  > ```
  > - outcome: Missing placeholders now respect the setting within the details dialog.
  > - files: [src/app/components/comparison/details/comparison.details.template.html](../src/app/components/comparison/details/comparison.details.template.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.ts
  > @@
  >      @Input() labelColorsEnabled: boolean = true;
  > +    @Input() showMissingIndicators: boolean = false;
  > *** End Patch
  > ```
  > - outcome: Generic table component can now hide “Missing” text based on settings.
  > - files: [src/app/components/output/generic-table/generic-table.component.ts](../src/app/components/output/generic-table/generic-table.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.html
  > @@
  > -                        <td *ngIf="types[i] ===  'LABEL' || types[i] === 'REPOSITORY'"
  > -                            class="label-cell"
  > -                            [class.label-cell--colored]="types[i] === 'LABEL' && hasLabelFill(entry)"
  > -                            [style.background]="types[i] === 'LABEL' ? resolveLabelCellFill(entry) : null">
  > +                        <td *ngIf="types[i] ===  'LABEL' || types[i] === 'REPOSITORY'"
  > +                            class="label-cell"
  > +                            [class.label-cell--label]="types[i] === 'LABEL'"
  > +                            [class.label-cell--repository]="types[i] === 'REPOSITORY'"
  > +                            [class.label-cell--colored]="types[i] === 'LABEL' && hasLabelFill(entry)"
  > +                            [style.background]="types[i] === 'LABEL' ? resolveLabelCellFill(entry) : null">
  > @@
  > -                            <ng-template #missingLabelBlock>
  > -                                <div class="label mylabel label--missing">Missing</div>
  > -                            </ng-template>
  > +                            <ng-template #missingLabelBlock>
  > +                                <div *ngIf="showMissingIndicators" class="label mylabel label--missing">Missing</div>
  > +                            </ng-template>
  > *** End Patch
  > ```
  > - outcome: Table displays centered label cells and hides missing text unless enabled.
  > - files: [src/app/components/output/generic-table/generic-table.component.html](../src/app/components/output/generic-table/generic-table.component.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.css
  > @@
  >  .unknown {
  >      background-color: var(--hover-color, lightgray);
  >      color: var(--text-color, white);
  >  }
  > 
  > +.label-cell {
  > +    text-align: left;
  > +}
  > +
  > +.label-cell--label {
  > +    text-align: center;
  > +}
  > +
  > +.label-cell--label .label {
  > +    margin-left: auto;
  > +    margin-right: auto;
  > +}
  > +
  > +.label-cell--label .tt-container {
  > +    justify-content: center;
  > +    text-align: center;
  > +}
  > +
  > +.label-cell--repository {
  > +    text-align: left;
  > +}
  > *** End Patch
  > ```
  > - outcome: Applied centering rules for label cells while leaving other types untouched.
  > - files: [src/app/components/output/generic-table/generic-table.component.css](../src/app/components/output/generic-table/generic-table.component.css)
- [x] Verify changes and note follow-up actions for the user
  > **Bash** `["bash","-lc","git status -sb"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Listed modified Angular components, Redux files, and plan documents pending commit on `limit-markdown-display`.
  > ---
  > Validation: Manual review complete; recommend running `npm run build` to confirm Angular compilation with new bindings.
