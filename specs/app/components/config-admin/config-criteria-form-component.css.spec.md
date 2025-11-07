# Config Criteria Form Component CSS

Styles for the config criteria form component that provides visual structure and responsive layout for managing configuration criteria.

## Target

[@generate](../../../../src/app/components/config-admin/config-criteria-form.component.css)

## Capabilities

### Root scope styles

Scope all styles under `.config-criteria` root class to prevent global style conflicts.

### Action bar sticky positioning

Style the action bar with sticky positioning at the top of the container.

- `position: sticky; top: 0` with padding, background, and shadow
- Buttons have consistent spacing with `gap: 8px`
- Include `.config-criteria__metrics` for summary chips

### Accordion styling using Material tokens

Style the accordion interface using Material Design tokens.

- Set `.config-criteria__group` margins for proper spacing
- Provide `.criteria-group-header` as the branded header surface with bold titles, pill meta text, and a dedicated `.group-toggle` icon button so every group (including “Other Criteria”) exposes the expand/collapse affordance
- Highlight dirty groups via `.is-dirty` class with colored left border

### Drag handle styling

Define drag handle appearance and interaction.

- `.config-criteria__drag-handle` with appropriate cursor and icon spacing

### Criteria entry card layout

Style criteria entry cards with responsive grid layout.

- Use `.config-criteria__entry` with `display: grid`
- Two-column layout on desktop, single column below 960px
- Provide spacing between form fields with `gap: 12px`
- `.entry-toggles` flex container keeps per-entry search/table/detail toggles aligned with consistent spacing
- `.entry-summary` and `.entry-flag` styles keep collapsed cards readable, bolding enabled flags until the user clicks “Edit”

### Value override table styling

Style the value override table for compact data entry.

- `.config-criteria__overrides` with row hover effects
- Compact inputs and emoji column width

### Empty state styling

Style the empty state display.

- `.config-criteria__empty` with centered content and dashed border

### Responsive breakpoints

Implement responsive design patterns.

- Collapse grids on narrow screens
- Reduce padding on mobile devices
- Ensure sticky bars don't overlap by adjusting `top` values in containers

### Focus and interaction styles

Provide clear focus indicators and interaction feedback.

- Focus styles for interactive elements
- Custom scrollbar for long lists

### Material Design integration

Use Material Design CSS variables for consistent theming.

- Tap Material CSS variables like `var(--mat-sys-surface)` 
- Keep palette neutral and consistent with Material tokens

## API

```css { .api }
/* Root scope class */
.config-criteria { }

/* Action bar sticky positioning */
.config-criteria__action-bar { }
.config-criteria__metrics { }

/* Accordion styling */
.config-criteria__group { }
.criteria-group-header { }
.criteria-group-header .group-title { }
.criteria-group-header .group-meta { }
.criteria-group-header .group-toggle { }
.config-criteria__group.is-dirty { }

/* Drag handle */
.config-criteria__drag-handle { }

/* Criteria entry cards */
.config-criteria__entry { }
.entry-toggles { }

/* Value override table */
.config-criteria__overrides { }

/* Empty state */
.config-criteria__empty { }

/* Responsive breakpoints */
@media (max-width: 960px) { }
```
