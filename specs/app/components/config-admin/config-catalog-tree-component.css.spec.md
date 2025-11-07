# Config Catalog Tree Component Stylesheet

Styles for the configuration catalog tree component, providing a hierarchical view of configuration items with filtering and selection capabilities.

## Target

[@generate](../../../../src/app/components/config-admin/config-catalog-tree.component.css)

## Capabilities

### Root container scoping

All component styles are scoped under the `.config-catalog` root class to prevent style leakage.

### Filter layout and responsive behavior

Layout filters with `.config-catalog__filters` using flex column with 12px spacing between controls. Provide `.config-catalog__filter-toggle` button that is hidden above 960px breakpoint and visible below for mobile access.

### Chip and toggle styling

Style chip lists and button toggles with consistent spacing, including `mat-chip-listbox` margins and `.config-catalog__type-toggle` flex wrap behavior. Selected chips use primary accent background color and white text for clear visual hierarchy.

### Virtual scroll viewport configuration

Configure virtual scroll viewport with fixed 100% height and appropriate padding. Style item rows with flex alignment, minimum 64px height, hover background effects, and pointer cursor for interactive feedback.

### Selection and highlight states

Implement `.is-selected` class for highlighted rows with accent border and left indicator for clear visual selection feedback.

### Group header positioning

Style group headers with sticky positioning within scroll viewport using `position: sticky; top: 0` and subtle background differentiation.

### Metadata chip presentation

Style metadata chips within rows using small font size, border radius, and neutral background colors for secondary information display.

### State management displays

Center empty and loading state content using flex utilities with `.config-catalog__state` class for consistent positioning.

### Responsive design adjustments

Reduce padding on screens below 960px breakpoint and ensure virtual scroll container fills available height using `flex: 1 1 auto`.

### Accessibility enhancements

Add focus outlines for keyboard navigation using `.config-catalog__item:focus-visible` for improved accessibility compliance.

### Color system integration

Maintain accessible color contrast and utilize CSS custom properties where possible for theme consistency.

## API

```css { .api }
.config-catalog {
  /* Root container styles */
}

.config-catalog__filters {
  /* Filter container with flex column layout and 12px gap */
}

.config-catalog__filter-toggle {
  /* Mobile toggle button - hidden above 960px, visible below */
}

.config-catalog__type-toggle {
  /* Button toggle group with flex wrap */
}

.mat-chip-listbox {
  /* Chip list styling with consistent margins */
}

.mat-mdc-chip.mdc-evolution-chip--selected {
  /* Selected chip styling with accent color background and white text */
}

.config-catalog__viewport {
  /* Virtual scroll viewport with fixed height and padding */
}

.config-catalog__item {
  /* Item row with flex alignment, min-height 64px, hover effects, pointer cursor */
}

.config-catalog__item.is-selected {
  /* Selected row with accent border and left indicator */
}

.config-catalog__item:focus-visible {
  /* Focus outline for keyboard navigation */
}

.config-catalog__group-header {
  /* Sticky group header with top: 0 positioning and background */
}

.config-catalog__meta-chip {
  /* Metadata chip with small font, border radius, neutral background */
}

.config-catalog__state {
  /* Centered content for empty and loading states */
}

@media (max-width: 959px) {
  /* Responsive adjustments for mobile screens */
}
```

## Dependencies

### Angular Material chip components

Material Design chip components for filter selections and metadata display.
[@use](@angular/material/chips)

### Angular Material virtual scrolling

Virtual scrolling viewport for efficient rendering of large configuration lists.
[@use](@angular/cdk/scrolling)

### CSS custom properties

Theme color variables for consistent color application.
[@use](../../../styles/variables.css)
