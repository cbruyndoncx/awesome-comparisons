# DatasetShellComponent Stylesheet

Stylesheet for the DatasetShellComponent providing responsive layout, tabbed dataset selector, and visual feedback states.

## Target

[@generate](../../../../src/app/components/datasets/dataset-shell.component.css)

## Capabilities

### Responsive Container Layout

Provides main container with responsive spacing, max-width constraint, centered layout, and neutral background for the selector panel.

### Dataset Selector Layout

Creates a compact tab strip via `.dataset-tabs` flex container with horizontal scrolling on narrow screens and equal-height tabs on wide screens. Tabs stay sticky to the top of the shell while leaving room for content below, and `.dataset-shell__header` aligns the tab list with the theme toggle controls.

### Dataset Tab Styling

Defines `.dataset-tab` buttons with subtle borders, hover states, and accent focus outlines (`var(--uc-accent, #0066cc)`). `.is-active` tabs get a solid accent indicator, bolder text, and elevated background. `.dataset-tab__label`, `.dataset-tab__summary`, and `.dataset-tab__accent` manage typography, truncated summaries, and optional accent dots.

### Theme Toggle Styling

`.dataset-theme-toggle` renders compact icon buttons with visible focus states and `.is-active` modifiers tied to the current theme. Buttons inherit accent colors, while `.sr-only` text keeps announcements accessible.

### Dataset Content Layout

Adds top margin to `.dataset-content` so the embedded comparison component fills full width properly.

### Empty and Error States

`.dataset-empty` and `.dataset-error` share padded box styling with dashed border to call attention to these states.

### Media Query Responsive Behavior

At 768px breakpoint, increases tab spacing, centers the tab strip, and displays dataset details horizontally for better use of widescreen layouts.

### Accessibility Support

Provides utility classes for `aria-live` region (`.dataset-status`) to ensure text is visually subdued but still readable for screen readers.

## API

```css { .api }
.dataset-shell { /* Responsive container with max-width, centering, and neutral background */ }
.dataset-shell__selector { /* Wrapper for the tab strip, toggle, and status */ }
.dataset-shell__header { /* Flex layout for tabs + toggle */ }
.dataset-tabs { /* Horizontal flex tab list */ }
.dataset-tab { /* Individual tab button */ }
.dataset-tab.is-active { /* Active tab state */ }
.dataset-tab__label,
.dataset-tab__summary,
.dataset-tab__accent { /* Typography and accent visuals within tabs */ }
.dataset-theme-toggle,
.dataset-theme-toggle__button { /* Theme toggle group + button states */ }
.dataset-content { /* Top margin for embedded content */ }
.dataset-empty, .dataset-error { /* Shared styling for feedback states */ }
.dataset-status { /* Accessibility utility for aria-live regions */ }

@media (min-width: 768px) {
  .dataset-shell__header { /* Align tabs and toggle horizontally */ }
  .dataset-tabs { /* Wider spacing and centered alignment on desktop */ }
}
```

## Dependencies

### Accent Color Token

Uses CSS custom property `var(--uc-accent, #0066cc)` for consistent theming across focus states and accent elements.
