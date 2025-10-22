# Plan: Feature Grouping Table Spec

Create a Tessl spec enabling expandable/collapsible feature groupings in the comparison table UI.

## Tasks

- [x] Review existing comparison table architecture to capture relevant context
  > **Bash** `["bash","-lc","rg '<table' -n"]`
  >
  > Searched for table markup usage; located `src/app/components/output/generic-table/generic-table.component.html`.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' src/app/components/output/generic-table/generic-table.component.html"]`
  >
  > Inspected current HTML structure showing column definitions and row rendering.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' src/app/components/output/generic-table/generic-table.component.ts"]`
  >
  > Reviewed component inputs/outputs controlling ordering, labels, and anchor behavior.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,160p' src/app/components/comparison/comparison.template.html"]`
  >
  > Confirmed how `<generictable>` is embedded and wired to state; validates expansion concept will tie into this component.
- [x] Create Tessl spec describing feature grouping behavior and data requirements
  > **MCP** `tessl__create`
  > - prompt:
  >   ```
  >   Create a spec for enabling feature grouping in the comparison table UI.
  >
  >   Context:
  >   - Markdown data currently uses level 2 headings (##) to define individual comparison criteria that appear as table columns.
  >   - We are introducing level 2 headings that represent feature groups, with level 3 headings (###) underneath for detailed criteria.
  >   - Each level 2 group has a label value like existing criteria values (e.g., Yes/No). If the group label is "No", "None", or "N/A", group details should stay hidden.
  >
  >   Requirements:
  >   1. Markdown Parsing & Data Pipeline
  >      - Update the Markdown-to-JSON conversion to produce a tree of groups and children so configuration and runtime data know which criteria belong to which group.
  >      - Each group record must include: stable group key, display name, label metadata (value, tooltip, colors, etc.), and the ordered child criteria definitions.
  >      - Preserve existing criteria metadata (types, tooltips, search flags, etc.) for child criteria.
  >      - Flag groups whose label is in the exclusion list (No/None/N/A) so the UI can default to collapsed/hidden state.
  >      - Expose group structure through the configuration service and NgRx store without breaking existing APIs for components that expect flat criteria lists.
  >
  >   2. State Management
  >      - Extend the NgRx store to track group definitions, group expand/collapse state, and per-group visibility derived from the Markdown label.
  >      - Persist expand/collapse choices in the URL or settings state so sharing a link keeps the same grouping visibility.
  >      - Ensure existing column filters, sorting, and settings continue to work for individual criteria, regardless of group state.
  >
  >   3. Table Rendering
  >      - Update `GenericTableComponent` (and any related layout code) to render a group header row with an expand/collapse control and group label.
  >      - When a group is collapsed or marked as not applicable, hide its child columns in both header and body cells.
  >      - Show an indicator (icon + accessible text) in the group header to switch between expanded and collapsed states.
  >      - Ensure sticky headers and column width calculations behave correctly when columns hide/show dynamically.
  >      - Support keyboard/screen-reader interaction for toggling groups.
  >
  >   4. Settings & Other Views
  >      - Update table settings dialogs to show group hierarchy, allowing users to enable/disable entire groups or individual criteria.
  >      - Reflect group collapse state in settings (e.g., via nested checkboxes or toggles) so the UX stays consistent.
  >      - Update the LaTeX export and any other table representations to respect the group visibility state.
  >
  >   5. Backwards Compatibility & Migration
  >      - Document migration guidance for existing Markdown content: how to upgrade from flat criteria to grouped criteria.
  >      - Ensure old Markdown files without groups still behave as before (treated as a default group or flat list).
  >
  >   Deliverables:
  >   - Spec file `specs/table-feature-grouping.spec.md` describing capabilities, API, data structures, and acceptance criteria for the feature grouping functionality.
  >   - Capture open questions or constraints that require product input (e.g., default expand/collapse behavior beyond "No/None/N/A" handling).
  >   ```
  > - spec: `specs/table-feature-grouping.spec.md`
  >
  > Created initial spec scaffold with required capabilities and API outline.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' specs/table-feature-grouping.spec.md"]`
  >
  > Reviewed generated draft to verify structure before adjustments.
  > ---
  > **Bash** `["bash","-lc","mkdir -p specs/app/components/output"]`
  >
  > Prepared spec directory to align with existing spec layout.
  > ---
  > **Bash** `["bash","-lc","mv specs/table-feature-grouping.spec.md specs/app/components/output/table-feature-grouping.spec.md"]`
  >
  > Relocated spec to component-specific folder.
  > ---
  > **Bash** `["bash","-lc","sed -n '1,200p' specs/app/components/output/table-feature-grouping.spec.md"]`
  >
  > Confirmed file contents after relocation.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > -[@generate](../src/app/components/table/feature-grouping.service.ts)
  > +[@generate](../../../../src/app/services/feature-grouping.service.ts)
  > @@
  > -export interface FeatureGroup {
  > +export interface FeatureGroup {
  >   key: string;
  >   displayName: string;
  >   label: {
  >     value: string;
  >     tooltip?: string;
  > @@
  > -  children: CriteriaDefinition[];
  > +  children: Criteria[];
  >   isExcluded: boolean;
  >   isExpanded: boolean;
  > }
  >
  > export interface GroupedCriteriaStructure {
  > -  groups: FeatureGroup[];
  > -  flatCriteria: CriteriaDefinition[];
  > +  groups: FeatureGroup[];
  > +  flat: Criteria[];
  > }
  >
  > export interface GroupToggleAction {
  >   type: 'TOGGLE_GROUP';
  >   payload: {
  > @@
  > -  parseGroupedMarkdown(markdownData: any): GroupedCriteriaStructure;
  > +  parseGroupedMarkdown(markdownData: MarkdownComparisonPayload): GroupedCriteriaStructure;
  >   getGroupExpandState(groupKey: string): Observable<boolean>;
  >   toggleGroup(groupKey: string, expanded: boolean): void;
  > -  getVisibleCriteria(): Observable<CriteriaDefinition[]>;
  > +  getVisibleCriteria(): Observable<Criteria[]>;
  > }
  > ```
  >
  > Normalized API typing and dependency references to match Angular project layout.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > -[@generate](../../../../src/app/services/feature-grouping.service.ts)
  > +[@generate](../../../../src/app/components/output/feature-grouping.service.ts)
  > *** End Patch
  > ```
  >
  > Relocated service target to live alongside output components.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > ### Configuration service
  >
  >  Extends existing configuration management for group settings.
  > [@use](../../../../src/app/components/comparison/configuration/configuration.service.ts)
  > 
  > ## Open Questions
  > 
  > - Should groups whose label resolves to values other than `Yes` or `No` (e.g., `Partial`, `Beta`) default to expanded, collapsed, or follow another rule?
  > - When a group label is excluded (`No`, `None`, `N/A`), should the group header remain visible with a disabled toggle, or should the entire group (header and columns) disappear?
  > - Do group expand/collapse preferences need to persist per user (local storage) in addition to URL parameters?
  > *** End Patch
  > ```
  >
  > Added open questions capturing outstanding UX decisions for the feature.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > ### Configuration service
  >
  >  Extends existing configuration management for group settings.
  > -[@use](../src/app/services/configuration.service.ts)
  > +[@use](../../../../src/app/components/comparison/configuration/configuration.service.ts)
  > *** End Patch
  > ```
  >
  > Corrected dependency paths to match current project layout.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > - Flag groups with exclusion labels ("No", "None", "N/A") for default collapsed state
  > - Maintain backwards compatibility with flat criteria structure for existing Markdown files
  > + Flag groups with exclusion labels ("No", "None", "N/A") for default collapsed state
  > + Default groups with any other label value (e.g., "Partial", "Beta") to collapsed on initial load
  > + Maintain backwards compatibility with flat criteria structure for existing Markdown files
  > @@
  > - Show accessible expand/collapse controls with keyboard navigation support
  > - Maintain sticky header behavior with dynamic column visibility
  > - Recalculate column widths when groups expand or collapse
  > - Provide migration guidance for existing flat Markdown content
  > + Show accessible expand/collapse controls with keyboard navigation support
  > + Recalculate column widths when groups expand or collapse
  > + When a group is marked excluded ("No", "None", "N/A"), display a non-interactive header that explains the group is not available and keep all child columns hidden
  > + Provide migration guidance for existing flat Markdown content
  > *** End Patch
  > ```
  >
  > Embedded user decisions: non-binary labels default collapsed, excluded groups show non-interactive headers, removed sticky-group requirement.
  > ---
  > **Edit** `apply_patch`
  > ```
  > *** Begin Patch
  > *** Update File: specs/app/components/output/table-feature-grouping.spec.md
  > @@
  > -## Open Questions
  > -
  > -- Should groups whose label resolves to values other than `Yes` or `No` (e.g., `Partial`, `Beta`) default to expanded, collapsed, or follow another rule?
  > -- Do group expand/collapse preferences need to persist per user (local storage) in addition to URL parameters?
  > +## Open Questions
  > +
  > +- Do group expand/collapse preferences need to persist per user (local storage) in addition to URL parameters?
  > *** End Patch
  > ```
  >
  > Removed resolved clarification items from open questions, leaving only persistence behavior outstanding.
- [x] Prepare clarifying questions for the user about grouping expectations
  > Drafted questions on default group state for non-binary labels, handling of excluded groups in the UI, and persistence requirements for user expand/collapse preferences to confirm before implementation.
  > ---
  > User replied: non-binary labels default collapsed, excluded groups render non-interactive headers, and URL persistence alone is sufficient. Updated the spec accordingly and removed the remaining open question.
