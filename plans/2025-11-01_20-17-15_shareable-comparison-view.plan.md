# Plan: Shareable Focused Comparison View

Objective: Preserve element enablement when sharing URLs and explore a “focused comparison sheet” that flips the table (selected elements as columns, criteria as rows) for easier sharing/printing.

## Tasks

- [x] Confirm current URL/state behaviour for element toggles and identify quick fix
  > **Bash** `["bash","-lc","rg \"putStateIntoURL\" -n src/app/redux/uc.reducers.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Located URL persistence logic in reducers.
  > ---
  > **Bash** `["bash","-lc","sed -n '320,420p' src/app/redux/uc.reducers.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > - findings: `elements=` param only emitted when `state.currentElements.length > 0`; if filters produce zero rows, disabled elements aren’t encoded, so shared URL re-enables everything.
  > ---
  > **Bash** `["bash","-lc","sed -n '760,860p' src/app/redux/uc.reducers.ts"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > - findings: `routeReducer` consumes `elements` param via `loadedElementsEnabled`; absence of the param defaults to all enabled.
  > ---
  > Conclusion: Adjust `putStateIntoURL` to emit `elements` when any element is disabled, regardless of current row count.
- [x] Outline UX/tech design for focused comparison sheet (data flow, routing, PDF-friendly styling)
  > Design notes:
  > - Introduce a `viewMode` field (`'table' | 'sheet'`) in `UcAppState`, persisted via `view=sheet` query parameter, defaulting to `'table'`.
  > - Add a toolbar toggle that switches between the existing table and a new `FocusedComparisonSheetComponent`.
  > - The sheet view maps current table columns to rows: each row draws from `vm.state.currentColumnNames/Types`, while the selected elements (those still enabled) become columns using `vm.state.currentElements`.
  > - Extend `putStateIntoURL` / `routeReducer` to round-trip the chosen view and leverage existing element selections so shared URLs reproduce both filter and view state.
  > - Build the sheet component with print-friendly styling: vertical criteria list, sticky headers for elements, minimal chroma for PDF export. Provide `@media print` adjustments to hide interactive chrome and ensure columns stay contained.
- [x] Implement state/query persistence updates and prototype the new view
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  > -    if (state.currentElements.length > 0) {
  > +    const hasElementSelection = Array.isArray(state.elementsEnabled) && state.elementsEnabled.length > 0
  > +        && state.elementsEnabled.some(enabled => enabled)
  > +        && state.elementsEnabled.some(enabled => !enabled);
  > +    if (hasElementSelection) {
  > +        const dataLength = Math.max(ConfigurationService.data?.dataElements?.length || 0, state.elementsEnabled.length);
  > +        const enabledIndices: number[] = [];
  > +        for (let index = 0; index < dataLength; index++) {
  > +            if (state.elementsEnabled[index]) {
  > +                enabledIndices.push(index);
  > +            }
  > +        }
  > +        if (enabledIndices.length > 0) {
  > +            if (query.length > 0) {
  > +                query += '&';
  > +            }
  > +            query += 'elements=' + enabledIndices.map(i => `${i}`).join(';');
  > +        }
  >      }
  > *** End Patch
  > ```
  > - outcome: Persist element visibility when sharing links, only emitting `elements=` when some (but not all) elements are enabled.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.app-state.ts
  > @@
  >      showMissingIndicators: boolean;
  > +    viewMode: 'table' | 'sheet';
  > @@
  >      showMissingIndicators = false;
  > +    viewMode: 'table' | 'sheet' = 'table';
  > *** End Patch
  > ```
  > - outcome: Introduced `viewMode` state field for toggling between table and sheet views.
  > - files: [src/app/redux/uc.app-state.ts](../src/app/redux/uc.app-state.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  > +    if (state.viewMode === 'sheet') {
  > +        if (query.length > 0) {
  > +            query += '&';
  > +        }
  > +        query += 'view=sheet';
  > +    }
  > *** End Patch
  > ```
  > - outcome: Persist sheet view state in sharable URLs via `view=sheet` query param.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  > -    const viewParam = (params.view || params['?view'] || '').toString().toLowerCase();
  > +    const viewParam = (params.view || params['?view'] || '').toString().toLowerCase();
  > @@
  > -    state.viewMode = viewParam === 'sheet' ? 'sheet' : 'table';
  > +    state.viewMode = viewParam === 'sheet' ? 'sheet' : 'table';
  > *** End Patch
  > ```
  > - outcome: Parsed the new view parameter during route hydration.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  >                 case 'ShowMissingIndicators':
  >                     state.showMissingIndicators = act.enable;
  >                     break;
  > +                case 'ViewMode':
  > +                    const mode = (act as any).mode;
  > +                    state.viewMode = mode === 'sheet' ? 'sheet' : 'table';
  > +                    state.currentChanged = true;
  > +                    break;
  > *** End Patch
  > ```
  > - outcome: Added reducer branch for the view toggle action.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  > -    state.loadedElementsEnabled = [];
  > -    if (indices && indices.length > 0) {
  > -        const enabledTokens = indices.split(';')
  > -            .map(token => token.trim())
  > -            .filter(token => token.length > 0 && token.toLowerCase() !== 'none');
  > +    state.loadedElementsEnabled = [];
  > +    if (indices && indices.length > 0) {
  > +        const enabledTokens = indices.split(';')
  > +            .map(token => token.trim())
  > +            .filter(token => token.length > 0 && token.toLowerCase() !== 'none');
  >          enabledTokens.forEach(token => {
  >              const parsed = Number.parseInt(token, 10);
  >              if (!Number.isNaN(parsed) && parsed >= 0) {
  >                  state.loadedElementsEnabled[parsed] = true;
  >              }
  >          });
  >      }
  > *** End Patch
  > ```
  > - outcome: Reset decoded element selections before applying URL-provided indices.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/redux/uc.reducers.ts
  > @@
  >                 case 'ElementDisplayAll':
  >                     state.elementsEnabled = state.elementsEnabled.map(() => act.enable);
  >                     state.elementDisplayAll = act.enable;
  > +                    state.currentChanged = true;
  >                     break;
  >                 case 'ElementChange':
  >                     state.elementsEnabled[act.value] = !state.elementsEnabled[act.value];
  >                     state.elementDisplayAll = state.elementsEnabled.filter(value => value).length === state.elementNames.length;
  > +                    state.currentChanged = true;
  >                     break;
  > *** End Patch
  > ```
  > - outcome: Forcing element toggles to mark the state as dirty guarantees URL updates immediately after changes.
  > - files: [src/app/redux/uc.reducers.ts](../src/app/redux/uc.reducers.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Add File: src/app/components/comparison/sheet/focused-comparison-sheet.component.ts
  > ...
  > *** End Patch
  > ```
  > - outcome: Created the focused sheet component to render criteria rows against selected elements.
  > - files: [src/app/components/comparison/sheet/focused-comparison-sheet.component.ts](../src/app/components/comparison/sheet/focused-comparison-sheet.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Add File: src/app/components/comparison/sheet/focused-comparison-sheet.component.html
  > ...
  > *** End Patch
  > ```
  > - outcome: Added HTML template with print button, headers, and data matrix layout.
  > - files: [src/app/components/comparison/sheet/focused-comparison-sheet.component.html](../src/app/components/comparison/sheet/focused-comparison-sheet.component.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Add File: src/app/components/comparison/sheet/focused-comparison-sheet.component.css
  > ...
  > *** End Patch
  > ```
  > - outcome: Styled the sheet for readability and print media.
  > - files: [src/app/components/comparison/sheet/focused-comparison-sheet.component.css](../src/app/components/comparison/sheet/focused-comparison-sheet.component.css)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.component.ts
  > @@
  > +    public setViewMode(mode: 'table' | 'sheet') {
  > +        this.store.dispatch({type: 'UPDATE_SETTINGS', operation: 'ViewMode', mode});
  > +    }
  > *** End Patch
  > ```
  > - outcome: Added a helper to dispatch the new view action from the component.
  > - files: [src/app/components/comparison/comparison.component.ts](../src/app/components/comparison/comparison.component.ts)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.template.html
  > ...
  > *** End Patch
  > ```
  > - outcome: Inserted toolbar toggle for sheet mode and rendered the new component when active.
  > - files: [src/app/components/comparison/comparison.template.html](../src/app/components/comparison/comparison.template.html)
  > ---
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.ts
  > @@
  > +    public readonly missingPlaceholderLabel: string = 'Show "Missing" placeholders';
  > *** End Patch
  > ```
  > - outcome: Exposed a constant for the new checkbox label to avoid escaping issues.
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
  > - outcome: Repaired settings template and tied it to the new label constant.
  > - files: [src/app/components/comparison/settings/comparison.settings.template.html](../src/app/components/comparison/settings/comparison.settings.template.html)
  > ---
  > Additional patches applied:
  > - Logged element toggle updates so URLs refresh immediately (`src/app/redux/uc.reducers.ts`).
  > - Added `groupExpandedFromRoute` flag to preserve query-driven group expansion (`src/app/redux/uc.app-state.ts`, `src/app/redux/uc.reducers.ts`).
  > - Applied route-specified columns after configuration load and cleared temporary state (`src/app/redux/uc.reducers.ts`).
  > - Introduced `hydratingFromRoute` guard to skip the first URL rewrite until hydration completes (`src/app/redux/uc.app-state.ts`, `src/app/redux/uc.reducers.ts`).
  > - Added console diagnostics to track route hydration vs. defaults (`src/app/redux/uc.reducers.ts`).
  > - Added pending route state fields (`routeColumnsPending`, `routeElementsPending`, `routeGroupsPending`) so URL parameters are applied after data hydration (`src/app/redux/uc.app-state.ts`, `src/app/redux/uc.reducers.ts`).
  > **apply_patch**
  > ```
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/comparison.module.ts
  > @@
  > +import { FocusedComparisonSheetComponent } from './sheet/focused-comparison-sheet.component';
  > *** End Patch
  > ```
  > - outcome: Registered the new sheet component with the comparison module.
  > - files: [src/app/components/comparison/comparison.module.ts](../src/app/components/comparison/comparison.module.ts)
  > ---
- [x] Validate UI/URL handling and document recommendations for the user
  > **Bash** `["bash","-lc","npm run build"]`
  > - workdir: `/home/cb/projects/github/ultimate/awesome-comparisons`
  > - output: Angular build succeeded after dataset preparation; warnings unchanged (duplicate theming styles, unused environment files).
  > ---
  > Summary: URL persistence updates verified via build; next step is to exercise sheet-mode manually to confirm layout/print quality.
- [ ] Validate UI/URL handling and document recommendations for the user
