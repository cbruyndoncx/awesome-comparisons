# Config Admin Shell Component CSS

Stylesheet for the ConfigAdminShellComponent, providing responsive grid layout and visual styling for the configuration management interface.

## Target

[@generate](../../../../src/app/components/config-admin/config-admin-shell.component.css)

## Capabilities

### CSS Grid Layout

Establishes a three-column grid layout for the main content area with responsive breakpoints.

- Uses `.config-admin-shell__layout` with 280px catalog sidebar, flexible editor column, and 360px preview column
- Reduces preview column to 320px on screens below 1280px
- Stacks panels vertically on screens below 960px using `grid-template-columns: 1fr` and ordering classes

### Panel Utility Classes

Provides consistent styling for layout panels with material design principles.

- `.config-admin-shell__panel` base panel styling with `display: flex`, `flex-direction: column`, and overflow handling
- `.config-admin-shell__catalog`, `.config-admin-shell__editor`, `.config-admin-shell__preview` specific panel variants
- Uses background cards (`var(--surface-card, #fff)`), rounded corners, and box-shadow

### Sticky Toolbar

Creates a persistent toolbar at the top of the interface with action button support.

- `.config-admin-shell__toolbar` with `position: sticky`, `z-index: 2`, and subtle shadow on scroll
- Includes `.toolbar-spacer` flex filler and `.toolbar-actions` for grouped buttons
- Proper spacing for action buttons

### State Classes

Visual indicators for application state changes.

- `.is-loading` overlay with semi-transparent backdrop and centered spinner
- `.is-dirty` badge styling with orange dot for unsaved indicators

### Summary Bar

Sticky subheader within the editor panel for quick information display.

- `.config-admin-shell__summary` with flex layout and sticky positioning
- Pill counters and alignment for quick actions
- Integrated with editor panel layout

### Preview Panel Layout

Optimizes the preview panel for diff viewer content display.

- Uses `display: flex` on preview panel
- `.config-admin-shell__preview-content` with `overflow: auto` for scrollable content
- Allows diff viewer to fill available space

### Responsive Drawer Toggle

Shows catalog drawer toggle button on smaller screens.

- Toggle button visibility controlled for screens below 960px
- Integrates with responsive grid layout changes

### Accessibility and Focus

Keyboard navigation support with proper focus indicators.

- `.config-admin-shell__panel:focus-within` adds box shadow highlight
- Focus outlines for keyboard navigation
- Maintains accessibility standards

### CSS Variables and Spacing

Consistent spacing and theme integration.

- Uses CSS variables for theming
- Material spacing with 16px gutter
- Avoids hardcoded fonts, relies on inherited typography
- Scoped with `.config-admin-shell` root class

## API

```css { .api }
/* Main layout container */
.config-admin-shell__layout

/* Panel base class and variants */
.config-admin-shell__panel
.config-admin-shell__catalog
.config-admin-shell__editor  
.config-admin-shell__preview
.config-admin-shell__preview-content

/* Toolbar components */
.config-admin-shell__toolbar
.toolbar-spacer
.toolbar-actions

/* Summary bar */
.config-admin-shell__summary

/* State classes */
.is-loading
.is-dirty

/* Focus states */
.config-admin-shell__panel:focus-within

/* Responsive breakpoints */
@media (max-width: 1279px)
@media (max-width: 959px)
```
