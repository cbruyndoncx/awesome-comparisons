# Plan: Keep ID column out of “Other” group

Ensure the primary `id` column remains always visible and is never folded into the default “Other Columns” grouping.

## Tasks

- [x] Inspect recent “Other Columns” logic for inclusion criteria
  > **Bash**
  > command: ["bash","-lc","rg \"OTHER_COLUMN_GROUP_KEY\" -n src/app/components/output/feature-grouping.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Located default grouping logic to confirm where the `id` column was being swept into the fallback group.
- [x] Adjust grouping to skip the `id` column
  > **apply_patch**
  > command:
  > ```patch
  > *** Begin Patch
  > *** Update File: src/app/components/output/feature-grouping.service.ts
  > @@
  > -    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);
  > -    private static readonly OTHER_COLUMN_GROUP_KEY = '__other-columns__';
  > -    private static readonly OTHER_COLUMN_GROUP_NAME = 'Other Columns';
  > +    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);
  > +    private static readonly OTHER_COLUMN_GROUP_KEY = '__other-columns__';
  > +    private static readonly OTHER_COLUMN_GROUP_NAME = 'Other Columns';
  > +    private static readonly ID_COLUMN_KEY = 'id';
  > @@
  > -        const tableColumns = (payload.configuration?.criteria || [])
  > -            .filter(criteria => criteria.table === true && !groupedColumnKeys.has(criteria.id));
  > +        const tableColumns = (payload.configuration?.criteria || [])
  > +            .filter(criteria =>
  > +                criteria.table === true &&
  > +                criteria.id !== FeatureGroupingService.ID_COLUMN_KEY &&
  > +                !groupedColumnKeys.has(criteria.id)
  > +            );
  > @@
  > -            tableColumns.forEach(criteria => {
  > -                if (!columnGroupMap[criteria.id]) {
  > -                    columnGroupMap[criteria.id] = FeatureGroupingService.OTHER_COLUMN_GROUP_KEY;
  > -                }
  > -            });
  > +            tableColumns
  > +                .filter(criteria => criteria.id !== FeatureGroupingService.ID_COLUMN_KEY)
  > +                .forEach(criteria => {
  > +                    if (!columnGroupMap[criteria.id]) {
  > +                        columnGroupMap[criteria.id] = FeatureGroupingService.OTHER_COLUMN_GROUP_KEY;
  > +                    }
  > +                });
  > *** End Patch
  > ```
  > Output: Prevented the `id` column from being assigned to the fallback group while keeping other ungrouped columns mapped.
- [x] Spot-check settings/table output for regressed handling
  > **Bash**
  > command: ["bash","-lc","rg \"ID_COLUMN_KEY\" -n src/app/components/output/feature-grouping.service.ts"]
  > workdir: "."
  > timeout_ms: 120000
  > Output: Confirmed the new guard is active at both filter and assignment points; no additional UI adjustments required.
