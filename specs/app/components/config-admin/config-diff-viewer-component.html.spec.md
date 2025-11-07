# Config Diff Viewer Component HTML Template

Angular template for displaying YAML configuration diffs with interactive controls.

## Target

[@generate](../../../../src/app/components/config-admin/config-diff-viewer.component.html)

## Capabilities

### Root Container Structure

Provides semantic HTML structure with accessibility support and theme switching.

- Root element uses `<section class="config-diff" role="region" aria-label="YAML diff preview">`
- Supports theme switching with `[class.config-diff--dark]="theme === 'dark'"`
- Contains toolbar and main content areas

### Toolbar Controls

Interactive toolbar with view options and navigation controls.

- Renders toolbar with class `config-diff__toolbar`
- View mode toggle buttons (unified/split) bound to `viewMode` property
- Toggle buttons call `toggleViewMode()` method
- Options menu with whitespace and ignore-case toggles using `mat-button-toggle-group` or `mat-slide-toggle`
- Whitespace toggle calls `toggleWhitespace()` method
- Ignore case toggle calls `toggleIgnoreCase()` method
- Expand/collapse all buttons for diff sections
- Copy and download buttons for diff content
- Navigation buttons calling `focusPreviousHunk()` and `focusNextHunk()` methods
- Retry button when error state, calling `retryDiffGeneration()`
- All toolbar buttons include `matTooltip` descriptions for accessibility

### Metadata Display

Shows diff statistics and timestamp information.

- Displays `lastSavedTimestamp` using Angular date pipe
- Shows diff stats as metadata chips with `diffStats.additions`, `diffStats.deletions`, and `diffStats.lineCount`

### Content Display

Main diff content area with error handling and fallback options.

- Conditional rendering based on `isError` state using `*ngIf` guards
- Error state displays error card with message and retry button
- Error fallback includes read-only `<textarea>` showing `modifiedYaml`
- Normal state displays diff content in scrollable container with class `config-diff__viewport`
- Uses `[innerHTML]="diffHtml | safeHtml"` for sanitized diff HTML content
- Diff container includes `role="document"` for accessibility
- Empty diff state shows accessible fallback text with class `config-diff__empty`

### Loading State

Visual feedback during diff generation.

- When `isBusy` is true, shows semi-transparent overlay
- Overlay contains `mat-progress-spinner` for loading indication

### Interactive Controls

Button states and user interaction handling.

- Copy and download buttons disabled when `!modifiedYaml`
- Uses `ng-container` for conditional template sections
- Null input guards with `*ngIf` conditions

## API

```html { .api }
<section class="config-diff" role="region" aria-label="YAML diff preview" 
         [class.config-diff--dark]="theme === 'dark'">
  <!-- Toolbar with controls -->
  <div class="config-diff__toolbar">
    <!-- View mode toggles, options menu, action buttons -->
    <!-- Metadata chips with stats and timestamp -->
  </div>
  
  <!-- Main content area -->
  <div class="config-diff__content">
    <!-- Error state with retry option -->
    <div *ngIf="isError" class="config-diff__error">
      <!-- Error message, retry button, fallback textarea -->
    </div>
    
    <!-- Normal diff display -->
    <div *ngIf="!isError" class="config-diff__viewport" role="document">
      <!-- Diff HTML content or empty state -->
    </div>
  </div>
  
  <!-- Loading overlay -->
  <div *ngIf="isBusy" class="config-diff__loading">
    <mat-progress-spinner></mat-progress-spinner>
  </div>
</section>
```
## Dependencies

### Angular Core & Common

Structural directives, async pipe, and date pipe usage.  
[@use](@angular/core)  
[@use](@angular/common)

### Angular Material Components

Toolbar, buttons, button toggles, icon buttons, tooltips, progress spinner, and chips used in the toolbar.  
[@use](@angular/material/toolbar)  
[@use](@angular/material/button)  
[@use](@angular/material/button-toggle)  
[@use](@angular/material/icon)  
[@use](@angular/material/tooltip)  
[@use](@angular/material/progress-spinner)  
[@use](@angular/material/chips)  
[@use](@angular/material/slide-toggle)  
[@use](@angular/material/card)

### Angular CDK Clipboard

Clipboard service used by the copy action.  
[@use](@angular/cdk/clipboard)

### Angular Forms

Template bindings that rely on form directives or ngModel (e.g., toggles).  
[@use](@angular/forms)
