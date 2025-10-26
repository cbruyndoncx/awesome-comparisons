# DatasetShellComponent Stylesheet

Stylesheet for the DatasetShellComponent providing responsive layout, dataset selector interface, card grid display, and visual feedback states.

## Target

[@generate](../../../../src/app/components/datasets/dataset-shell.component.css)

## Capabilities

### Responsive Container Layout

Provides main container with responsive spacing, max-width constraint, centered layout, and neutral background for the selector panel.

### Dataset Selector Layout

Arranges the select element and card list vertically on narrow screens and side-by-side on wide screens using flexible layout patterns. Provides `.dataset-shell__label` typography rules to keep the label aligned with the select field.

### Select Element Styling

Styles the `<select>` element with padding, border radius, and focus outline that matches the accent color token `var(--uc-accent, #0066cc)`.

### Dataset Card Grid

Uses CSS grid with auto-fit columns (minimum 240px) and appropriate gap spacing for responsive card layout.

### Dataset Card Styling

Each `.dataset-card` button has subtle border, background hover/active states, accent color top border, and `.is-active` state that elevates the card and bolds the title. Adds `.dataset-card__title`, `.dataset-card__summary`, `.dataset-card__icon`, and `.dataset-card__accent` helpers for typography, icon alignment, and accent chips.

### Dataset Details Display

Displays selected dataset information with flex alignment, optional `.dataset-details__badge` colored pill driven by inline style, and paragraph typography adjustments.

### Dataset Content Layout

Adds top margin to `.dataset-content` so the embedded comparison component fills full width properly.

### Empty and Error States

`.dataset-empty` and `.dataset-error` share padded box styling with dashed border to call attention to these states.

### Media Query Responsive Behavior

At 768px breakpoint, aligns selector layout in two columns, enlarges card grid gap, and sets `.dataset-details` to horizontal layout.

### Accessibility Support

Provides utility classes for `aria-live` region (`.dataset-status`) to ensure text is visually subdued but still readable for screen readers.

## API

```css { .api }
.dataset-shell { /* Responsive container with max-width, centering, and neutral background */ }
.dataset-shell__selector { /* Flexible layout for select and card list */ }
.dataset-shell__label { /* Label alignment and spacing */ }
.dataset-shell select { /* Select styling with accent color focus */ }
.dataset-card-list { /* CSS grid with auto-fit columns and gap */ }
.dataset-card { /* Button styling with borders and hover states */ }
.dataset-card__title,
.dataset-card__summary,
.dataset-card__icon,
.dataset-card__accent { /* Typography and accent visuals within cards */ }
.dataset-card.is-active { /* Active card elevation and bold title */ }
.dataset-details { /* Flex layout for dataset information */ }
.dataset-details__badge { /* Colored pill badge styling */ }
.dataset-content { /* Top margin for embedded content */ }
.dataset-empty, .dataset-error { /* Shared styling for feedback states */ }
.dataset-status { /* Accessibility utility for aria-live regions */ }

@media (min-width: 768px) {
  /* Responsive adjustments for wider screens */
}
```

## Dependencies

### Accent Color Token

Uses CSS custom property `var(--uc-accent, #0066cc)` for consistent theming across focus states and accent elements.
