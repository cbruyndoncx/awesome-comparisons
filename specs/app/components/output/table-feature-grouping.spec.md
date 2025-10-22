# Table Feature Grouping

Enables hierarchical grouping of comparison criteria in the table UI, allowing level 2 headings to define feature groups with level 3 headings as detailed criteria underneath.

## Target

[@generate](../../../../src/app/components/output/feature-grouping.service.ts)

## Capabilities

### Markdown parsing and data pipeline

Updates the Markdown-to-JSON conversion to produce a tree structure of groups and child criteria.

- Parse level 2 headings as feature groups with level 3 headings as child criteria
- Generate stable group keys from group headings for consistent identification
- Extract group label metadata including value, tooltip, and color information
- Preserve existing criteria metadata for child criteria (types, tooltips, search flags)
- Flag groups with exclusion labels ("No", "None", "N/A") for default collapsed state
- Default groups with any other label value (e.g., "Partial", "Beta") to collapsed on initial load
- Maintain backwards compatibility with flat criteria structure for existing Markdown files

### State management

Extends NgRx store to track group definitions and expand/collapse state.

- Store group definitions with display names, labels, and child criteria
- Track per-group expand/collapse state independently
- Derive group visibility from Markdown label values and user preferences
- Persist expand/collapse state in URL parameters for shareable links
- Maintain existing column filter, sorting, and settings functionality for individual criteria

### Table rendering

Updates table components to render group headers with expand/collapse controls.

- Render group header rows with expand/collapse indicators and group labels
- Hide child columns when groups are collapsed or marked not applicable
- Show accessible expand/collapse controls with keyboard navigation support
- Recalculate column widths when groups expand or collapse
- When a group is marked excluded ("No", "None", "N/A"), display a non-interactive header that explains the group is not available and keep all child columns hidden

### Settings and configuration

Updates settings dialogs to support group hierarchy management.

- Display group hierarchy in table settings with nested controls
- Allow enabling/disabling entire groups or individual criteria
- Reflect group collapse state in settings UI consistently
- Update LaTeX export to respect group visibility state
- Provide migration guidance for existing flat Markdown content

## API

```typescript { .api }
export interface FeatureGroup {
  key: string;
  displayName: string;
  label: {
    value: string;
    tooltip?: string;
    colors?: {
      background: string;
      text: string;
    };
  };
  children: Criteria[];
  isExcluded: boolean;
  isExpanded: boolean;
}

export interface GroupedCriteriaStructure {
  groups: FeatureGroup[];
  flat: Criteria[];
}

export interface GroupToggleAction {
  type: 'TOGGLE_GROUP';
  payload: {
    groupKey: string;
    expanded: boolean;
  };
}

@Injectable()
export class FeatureGroupingService {
  parseGroupedMarkdown(markdownData: MarkdownComparisonPayload): GroupedCriteriaStructure;
  getGroupExpandState(groupKey: string): Observable<boolean>;
  toggleGroup(groupKey: string, expanded: boolean): void;
  getVisibleCriteria(): Observable<Criteria[]>;
}
```

## Dependencies

### Markdown parsing

Extends existing Markdown-to-JSON conversion pipeline to handle hierarchical structure.
[@use](../../../../lib/gulp/gulpfile.babel.js)

### NgRx state management

Utilizes existing Redux store structure for state management.
[@use](../../../../src/app/redux/uc.reducers.ts)

### Table component

Integrates with existing table rendering infrastructure.
[@use](../../../../src/app/components/output/generic-table/generic-table.component.ts)

### Configuration service

Extends existing configuration management for group settings.
[@use](../../../../src/app/components/comparison/configuration/configuration.service.ts)
