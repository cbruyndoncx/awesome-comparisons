# Plan: Add default “Other” column group

Ensure ungrouped table columns fall into an automatic “Other” grouping, mirroring the criteria behavior and keeping column layout compact.

## Tasks

- [x] Inspect current column grouping logic
  > **Bash**
  > command: ["bash","-lc","rg \"columnGroup\" -n src"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Located grouping data flow across FeatureGroupingService, reducers, and table settings.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '1,200p' src/app/components/output/feature-grouping.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Reviewed current grouping parser to identify where ungrouped columns fall through.
  > ---
  > **Bash**
  > command: ["bash","-lc","sed -n '1,200p' src/app/components/comparison/settings/comparison.settings.template.html"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Checked settings layout to confirm how ungrouped columns render today.
- [x] Update grouping to inject default “Other” bucket
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/output/feature-grouping.service.ts
  > @@
  > -export class FeatureGroupingService {
  > -    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);
  > +export class FeatureGroupingService {
  > +    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);
  > +    private static readonly OTHER_COLUMN_GROUP_KEY = '__other-columns__';
  > +    private static readonly OTHER_COLUMN_GROUP_NAME = 'Other Columns';
  > @@
  > -        return {
  > +        const groupedColumnKeys = new Set(Object.keys(columnGroupMap));
  > +        const tableColumns = (payload.configuration?.criteria || [])
  > +            .filter(criteria => criteria.table === true && !groupedColumnKeys.has(criteria.id));
  > +
  > +        if (tableColumns.length > 0 && !groups.some(group => group.key === FeatureGroupingService.OTHER_COLUMN_GROUP_KEY)) {
  > +            tableColumns.forEach(criteria => {
  > +                if (!columnGroupMap[criteria.id]) {
  > +                    columnGroupMap[criteria.id] = FeatureGroupingService.OTHER_COLUMN_GROUP_KEY;
  > +                }
  > +            });
  > +            groups.push({
  > +                key: FeatureGroupingService.OTHER_COLUMN_GROUP_KEY,
  > +                displayName: FeatureGroupingService.OTHER_COLUMN_GROUP_NAME,
  > +                label: { value: FeatureGroupingService.OTHER_COLUMN_GROUP_NAME },
  > +                children: [],
  > +                isExcluded: false,
  > +                isExpanded: false,
  > +                defaultExpanded: false,
  > +                primaryCriteria: null
  > +            });
  > +        }
  > +
  > +        return {
  >             groups,
  >             flat,
  >             columnGroupMap
  >         };
  > *** End Patch
  > ```
  > Output: Added explicit “Other Columns” grouping and mapped unassigned table columns into it.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/comparison/settings/comparison.settings.component.ts
  > @@
  > -        return this.columnKeys
  > -            .map((key, index) => ({ key, name: this.columnNames[index], index }))
  > -            .filter(column => !groupedKeys.has(column.key) && !groupKeys.has(column.key));
  > +        return this.columnKeys
  > +            .map((key, index) => ({ key, name: this.columnNames[index], index }))
  > +            .filter(column => !groupedKeys.has(column.key) && !groupKeys.has(column.key) && !groupedLookup[column.key]);
  >     }
  > *** End Patch
  > ```
  > Output: Ensured ungrouped-list excludes columns now mapped into the default group.
  > ---
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > - When a group is marked excluded ("No", "None", "N/A"), display a non-interactive header that explains the group is not available and keep all child columns hidden
  > + When a group is marked excluded ("No", "None", "N/A"), display a non-interactive header that explains the group is not available and keep all child columns hidden
  > + Automatically create an “Other Columns” group for table criteria without an assigned grouping so they can collapse together by default
  > *** End Patch
  > ```
  > Output: Documented the new default grouping behaviour.
- [x] Verify table template/logic handles new group (spot check)
  > **Bash**
  > command: ["bash","-lc","rg \"select-grid\" -n src/app/components/comparison/comparison.template.html"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Spot-checked template bindings to ensure the new default group integrates without duplicating existing “Other columns” block. Full UI verification recommended during next manual run.
  > ---
  > **Bash**
  > command: ["bash","-lc","npm run build"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Build succeeded; gulp pipeline and Angular compilation completed with existing upstream warnings only.
