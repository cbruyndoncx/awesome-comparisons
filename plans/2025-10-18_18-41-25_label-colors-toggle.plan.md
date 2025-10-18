# Plan: Add Toggle to Disable Label Colors

Provide a user-facing setting to hide label background colors across the comparison grid and details view.

## Tasks

- [x] Assess current color usage and settings infrastructure
  > **Bash** `rg "backgroundColor" -n src/app/components`
  > Located all templates applying inline label colors (generic table and details view).
  > ---
  > **Bash** `sed -n '1,120p' src/app/components/comparison/settings/comparison.settings.template.html`
  > Reviewed existing settings dialog to plan placement of the new toggle.
- [x] Introduce store state and settings control for toggling label colors
  > **Apply Patch** `src/app/redux/uc.app-state.ts`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.app-state.ts
  > @@
  >      detailsData: DataElement;
  >  
  >      detailsDisplayTooltips: boolean;
  > +    labelColorsEnabled: boolean;
  >  
  >      tableExpand: boolean;
  >      currentSaved: boolean;
  > @@
  >      detailsData = null;
  >  
  >      detailsDisplayTooltips = false;
  > +    labelColorsEnabled = true;
  > *** End Patch
  > ```
  > Added store property to track whether label colors should render.
  > ---
  > **Apply Patch** `src/app/redux/uc.reducers.ts`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  >                 case 'DetailsDisplayTooltips':
  >                     state.detailsDisplayTooltips = act.enable;
  >                     break;
  > +                case 'LabelColorsEnabled':
  > +                    state.labelColorsEnabled = act.enable;
  > +                    break;
  >             }
  >             break;
  > *** End Patch
  > ```
  > Wired the new toggle into the settings reducer path.
  > ---
  > **Apply Patch** `src/app/components/comparison/settings/comparison.settings.component.ts`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.ts
  > @@
  >      @Input() latexTooltipsAsFootnotes: boolean = false;
  >  
  >      @Input() detailsDisplayTooltips: boolean = false;
  > +    @Input() labelColorsEnabled: boolean = true;
  > @@
  >      @Output() latexTooltipsAsFootnotesChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  >      @Output() latexDownload: EventEmitter<any> = new EventEmitter();
  >  
  >      @Output() detailsDisplayTooltipsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  > +    @Output() labelColorsEnabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  > }
  > *** End Patch
  > ```
  > Added Inputs/Outputs for the label color control on the settings component.
  > ---
  > **Apply Patch** `src/app/components/comparison/settings/comparison.settings.template.html`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.template.html
  > @@
  >          </pitem>
  >  
  > +        <h5>Labels</h5>
  > +        <pitem>
  > +            <pcheckbox [checked]="labelColorsEnabled"
  > +                       (checkedChange)="labelColorsEnabledChange.emit($event)"
  > +                       [label]="'Show label colors'"></pcheckbox>
  > +        </pitem>
  > +
  >         <h5>Details</h5>
  >         <pitem>
  >             <pcheckbox [checked]="detailsDisplayTooltips"
  > *** End Patch
  > ```
  > Surfaced the toggle in the settings dialog UI.
  > ---
  > **Apply Patch** `src/app/components/comparison/comparison.template.html`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > @@
  >             <generictable [items]="(store | async).state.currentElements"
  >                           [columns]="(store | async).state.currentColumnNames"
  >                           [types]="(store | async).state.columnTypes"
  >                           [index]="(store | async).state.rowIndexes"
  >                           [order]="(store | async).state.columnOrder"
  >                           [changeNum]="configurationService.tableColumns.length + (store | async).state.currentColumnNames.length + (settingsOpen? 0: 1) + changed"
  > +                          [labelColorsEnabled]="(store | async).state.labelColorsEnabled"
  >                           (settingsCallback)="settingsOpen = true"
  >                           (showDetails)="showDetails($event)"
  >                           (orderChange)="changeOrder($event)"
  >                           (searchFor)="criteriaClicked($event)"></generictable>
  > @@
  >         <comparison-details [data]="(store | async).state.detailsData"
  >                             [tooltipAsText]="(store | async).state.detailsDisplayTooltips"
  > +                            [labelColorsEnabled]="(store | async).state.labelColorsEnabled"></comparison-details>
  > @@
  >             [latexEnableTooltips]="(store | async).state.latexEnableTooltips"
  >             [latexTooltipsAsFootnotes]="(store | async).state.latexTooltipsAsFootnotes"
  > -            [detailsDisplayTooltips]="(store | async).state.detailsDisplayTooltips"
  > +            [detailsDisplayTooltips]="(store | async).state.detailsDisplayTooltips"
  > +            [labelColorsEnabled]="(store | async).state.labelColorsEnabled"
  >             (columnsDisplayAllChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'ColumnDisplayAll'})"
  >             (columnChange)="store.dispatch({type: 'UPDATE_SETTINGS', value: $event, operation: 'ColumnChange'})"
  >             (elementsDisplayAllChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'ElementDisplayAll'})"
  >             (elementChange)="store.dispatch({type: 'UPDATE_SETTINGS', value: $event, operation: 'ElementChange'})"
  >             (latexDisplayTableChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'LatexDisplayTable'})"
  >             (latexEnableTooltipsChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'LatexEnableTooltips'})"
  >             (latexTooltipsAsFootnotesChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'LatexTooltipsAsFootnotes'})"
  >             (detailsDisplayTooltipsChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'DetailsDisplayTooltips'})"
  > +            (labelColorsEnabledChange)="store.dispatch({type: 'UPDATE_SETTINGS', enable: $event, operation: 'LabelColorsEnabled'})"
  >             (latexDownload)="latexDownload()"
  >         ></comparison-settings>
  > *** End Patch
  > ```
  > Passed the toggle state through the component tree and registered the new settings event.
- [x] Update table/details rendering to honor the color visibility toggle
  > **Apply Patch** `src/app/components/output/generic-table/generic-table.component.ts`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.ts
  > @@
  >      @Input() columns: Array<string> = [];
  >      @Input() types: Array<string> = [];
  >      @Input() items: Array<Array<CriteriaData>> = [];
  >      @Input() index: Array<number> = [];
  >      @Input() order: Array<number> = [];
  > +    @Input() labelColorsEnabled: boolean = true;
  > *** End Patch
  > ```
  > Added a bindable flag so the table can drop colors when requested.
  > ---
  > **Apply Patch** `src/app/components/output/generic-table/generic-table.component.html`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.html
  > @@
  > -                        <ptooltip [tooltip]="label.tooltip.text"
  > -                                  [tooltipHtml]="label.tooltip.html" [position]="'n'">
  > -                            <div class="label mylabel {{label.clazz}}" [style.color]="label.color"
  > -                                 [style.background-color]="label.backgroundColor"
  > +                        <ptooltip [tooltip]="label.tooltip.text"
  > +                                  [tooltipHtml]="label.tooltip.html" [position]="'n'">
  > +                            <div class="label mylabel {{label.clazz}}" [class.label--plain]="!labelColorsEnabled"
  > +                                 [style.color]="labelColorsEnabled ? label.color : null"
  > +                                 [style.background-color]="labelColorsEnabled ? label.backgroundColor : null"
  >                                  (click)="labelClick($event, label, i)">
  >                                 {{label.name}}
  >                             </div>
  >                         </ptooltip>
  > *** End Patch
  > ```
  > Made label styles conditional and added a neutral class when colors are hidden.
  > ---
  > **Apply Patch** `src/app/components/output/generic-table/generic-table.component.css`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/output/generic-table/generic-table.component.css
  > @@
  >  .label-unknown {
  >      color: black;
  >      border: solid black 1px;
  >  }
  > +
  > +.label--plain {
  > +    background-color: #f5f5f5 !important;
  > +    color: #333 !important;
  > +    border: 1px solid #dddddd;
  > +}
  > *** End Patch
  > ```
  > Added styling for the plain-color fallback state.
  > ---
  > **Apply Patch** `src/app/components/comparison/details/comparison.details.component.ts`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.component.ts
  > @@
  >      @Input() bodyTitle: string = ''
  > 
  >      @Input() tags: Array<CriteriaData> = [];
  >      @Input() types: Array<CriteriaTypes>;
  >      @Input() headers: Array<string> = [];
  >      //@Input() ratings: Array<number> = [];
  >      @Input() tooltipAsText: boolean = true;
  > +    @Input() labelColorsEnabled: boolean = true;
  > *** End Patch
  > ```
  > Mirrored the flag in the details pane so modal content can also drop colors.
  > ---
  > **Apply Patch** `src/app/components/comparison/details/comparison.details.template.html`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.template.html
  > @@
  > -                <div class="label mylabel {{label.clazz}}" [style.color]="label.color"
  > -                     [style.background-color]="label.backgroundColor">
  > +                <div class="label mylabel {{label.clazz}}" [class.label--plain]="!labelColorsEnabled"
  > +                     [style.color]="labelColorsEnabled ? label.color : null"
  > +                     [style.background-color]="labelColorsEnabled ? label.backgroundColor : null">
  >                      {{label.name}}
  >                  </div>
  >              </ptooltip>
  >          </ng-template>
  > @@
  > -                        <div class="label mylabel {{label.clazz}}" [style.color]="label.color"
  > -                             [style.background-color]="label.backgroundColor">
  > +                        <div class="label mylabel {{label.clazz}}" [class.label--plain]="!labelColorsEnabled"
  > +                             [style.color]="labelColorsEnabled ? label.color : null"
  > +                             [style.background-color]="labelColorsEnabled ? label.backgroundColor : null">
  >                              {{label.name}}
  >                          </div>
  >                      </ptooltip>
  >                      <div *ngIf="tooltipAsText" class="tt-container">
  > -                        <span class="label mylabel {{label.clazz}} tt-label" [style.color]="label.color"
  > -                              [style.background-color]="label.backgroundColor">
  > +                        <span class="label mylabel {{label.clazz}} tt-label" [class.label--plain]="!labelColorsEnabled"
  > +                              [style.color]="labelColorsEnabled ? label.color : null"
  > +                              [style.background-color]="labelColorsEnabled ? label.backgroundColor : null">
  >                          {{label.name}}
  >                          </span>
  > *** End Patch
  > ```
  > Applied the toggle throughout the details modal.
  > ---
  > **Apply Patch** `src/app/components/comparison/details/comparison.details.component.css`
  > ```diff
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/details/comparison.details.component.css
  > @@
  >  .tooltip-text {
  >      display: inline-table;
  >  }
  > +
  > +.label--plain {
  > +    background-color: #f5f5f5 !important;
  > +    color: #333 !important;
  > +    border: 1px solid #dddddd;
  > +}
  > *** End Patch
  > ```
  > Ensured the neutral styling is available in the details view as well.
- [x] Regenerate assets/build and verify behavior
  > **Bash** `MD_TO_JSON_COMMAND="python /home/cb/projects/github/ultimate/ultimate-comparison-framework/md2json/md2json.py" npm run build`
  > Rebuilt markdown-derived assets and Angular bundles; build succeeded with existing informational warnings.
