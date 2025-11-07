# Config Diff Viewer Component Stylesheet

Stylesheet for the config diff viewer component that provides visual styling for configuration difference display with Material Design theming support.

## Target

[@generate](../../../../src/app/components/config-admin/config-diff-viewer.component.css)

## Capabilities

### Root Component Styling

Provides base styling under `.config-diff` root class with support for dark theme modifier (`.config-diff--dark`).

### Toolbar Layout

Implements flexible toolbar (`.config-diff__toolbar`) with responsive layout that wraps on small screens and allocates space for metadata chips (`.config-diff__meta`). Buttons maintain consistent gaps and active toggle buttons highlight with accent color.

### Diff Viewport Styling

Creates scrollable diff viewport (`.config-diff__viewport`) with max height 100%, appropriate padding, and Material surface background colors. Preserves monospace font for diff content readability.

### Loading State Overlay

Provides overlay loader (`.config-diff__loading`) with absolute positioning and backdrop for loading states.

### Error State Presentation

Styles error state (`.config-diff__error`) as a Material card with icon and call-to-action button. Includes fallback textarea (`.config-diff__fallback`) with full width, monospace font, and subdued background.

### Metadata Chips Styling

Implements metadata chips with small font size, border radius, and color-coded counts (additions in green, deletions in red).

### Keyboard Navigation Support

Provides focus outlines for keyboard navigation on toolbar buttons and diff sections to ensure accessibility compliance.

### Responsive Design

Reduces padding and button sizes below 960px breakpoint and stacks toolbar sections vertically for mobile optimization.

### Custom Scrollbar Styling

Customizes scrollbars for diff viewport with thin track and accent thumb while respecting accessibility preferences.

### Empty State Display

Centers message text and icon for `.config-diff__empty` state when diffHtml content is not available.

## API

```css { .api }
/* Root component with theme modifiers */
.config-diff { /* base styles */ }
.config-diff--dark { /* dark theme overrides */ }

/* Toolbar layout and components */
.config-diff__toolbar { /* flex layout, responsive wrapping */ }
.config-diff__meta { /* metadata chip container */ }

/* Diff content display */
.config-diff__viewport { /* scrollable diff container */ }

/* State overlays and fallbacks */
.config-diff__loading { /* absolute positioned loader */ }
.config-diff__error { /* error card styling */ }
.config-diff__fallback { /* fallback textarea */ }
.config-diff__empty { /* empty state centering */ }

/* Responsive breakpoints */
@media (max-width: 960px) { /* mobile optimizations */ }
```

## Dependencies

### Material Design System

Uses Material Design color tokens and surface colors for consistent theming.
[@use](@angular/material)

### Angular Component Integration

Integrates with Angular component lifecycle and Material theming system.
[@use](../../../../src/app/components/config-admin/config-diff-viewer.component.ts)