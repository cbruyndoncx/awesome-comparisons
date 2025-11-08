# ConfigAdminShellComponent HTML Template

HTML template for the Configuration Workspace shell component that provides the main layout and orchestrates catalog, editor, and preview panels.

## Target

[@generate](../../../../src/app/components/config-admin/config-admin-shell.component.html)

## Capabilities

### Top toolbar with title and actions

Displays "Configuration Workspace" title, metadata chips for active document (dataset label, shared/default indicators), and action buttons for save, revert, diff toggle, YAML copy, and close operations. The component exposes a `hasUnsavedChanges` boolean that mirrors the dirty observable so toolbar bindings stay stable between change-detection passes.

- Save and revert buttons are disabled when `hasUnsavedChanges` is false
- Shows spinner when `isLoading$ | async` is true
- Action buttons bind to component methods: `saveDocument()`, `discardChanges()`, `toggleDiffView()`, `copyYamlToClipboard()`, `close()`

### Three-panel responsive layout

Below toolbar, renders left catalog, center editor, right preview/diff with responsive behavior for narrow viewports.

- Uses wrapping container `config-admin-shell__layout` with `role="main"`
- Right panel collapses under editor on narrow viewports
- Each panel has appropriate ARIA roles

### Left catalog panel

Hosts the catalog tree with a simple view-model object that keeps the panel rendered regardless of loading state.

- Uses `config-admin-shell__catalog` class and `role="navigation"`
- Wraps the tree in `*ngIf="{ isLoading: (isLoading$ | async) || false, catalog: (catalogItems$ | async) || [] } as vm"` so both the loading flag and catalog array are available simultaneously without tearing down the DOM.
- Renders `<uc-config-catalog-tree>` with `vm.catalog` plus selection/loading bindings, and wires up `select`, `retry`, and `drawerToggle` events.

### Center editor panel

Contains sticky summary bar and criteria form component.

- Uses `config-admin-shell__editor` class and `role="region"`
- Shows total groups/criteria counts and dirty status in summary bar
- Renders `<uc-config-criteria-form>` with document data and event bindings
- Binds document changes, CRUD operations, and action requests to component methods

### Right preview/diff panel

Renders document preview with diff viewer or raw YAML textarea based on mode.

- Uses `config-admin-shell__preview` class and `role="region"`
- Shows `<uc-config-diff-viewer>` with YAML comparison and view options
- Provides alternate `<textarea>` for raw YAML when not in diff mode
- Binds view mode and options changes to component handlers

### Empty state handling

Displays appropriate messages when catalog is empty or no document is selected.

- Shows centered message in catalog panel when list is empty after load
- Shows guidance in editor and preview panels when no document selected
- Uses `config-admin-shell__empty` blocks with icons and text

### Accessibility and user experience

Includes proper ARIA labels, roles, and tooltips for all interactive elements.

- Buttons have `matTooltip` descriptions
- Panels have appropriate `role` attributes
- Uses combined view-model `*ngIf` guards and the async pipe to handle observables safely without blinking the UI when loading completes

### Alert history panel

Renders a collapsible-style card directly beneath the toolbar that streams messages from `alertMessages$`. Each entry shows timestamp, level, and text, preserving the last ~200 diagnostics so users can review what happened even if the editor freezes later. Entries are styled based on severity (info/warn/error) for quick scanning.

## API

```html { .api }
<mat-toolbar>
  <span>Configuration Workspace</span>
  <!-- Metadata chips -->
  <!-- Action buttons with proper bindings and disabled states -->
  <!-- Loading spinner -->
</mat-toolbar>

<div class="config-admin-shell__layout" role="main">
  <div class="config-admin-shell__catalog" role="navigation">
    <ng-container *ngIf="{ isLoading: (isLoading$ | async) || false, catalog: (catalogItems$ | async) || [] } as vm">
      <uc-config-catalog-tree
        [catalog]="vm.catalog"
        [selectedEncodedPath]="(selectedDocument$ | async)?.encodedPath || null"
        [isSaving]="isSaving$ | async"
        [loading]="vm.isLoading"
        (select)="onCatalogSelect($event)"
        (retry)="loadCatalog()"
        (drawerToggle)="onCatalogDrawerToggle()">
      </uc-config-catalog-tree>
      <!-- Empty state for catalog -->
    </ng-container>
  </div>

  <div class="config-admin-shell__editor" role="region">
    <!-- Sticky summary bar -->
    <uc-config-criteria-form
      [document]="selectedDocument$ | async"
      [allowedTypes]="allowedTypes"
      [isReadonly]="false"
      (documentChange)="onDocumentChange($event)"
      (dirtyChange)="configWorkspace.markDocumentDirty()"
      (requestCloneGroup)="onCloneGroup($event)"
      (requestCloneCriteria)="onCloneCriteria($event)"
      (requestDeleteGroup)="onDeleteGroup($event)"
      (requestDeleteCriteria)="onDeleteCriteria($event)"
      (valueDisplayChange)="onValueDisplayChange($event)"
      (saveRequested)="saveDocument()"
      (revertRequested)="discardChanges()"
      (formatRequested)="refreshPreview()">
    </uc-config-criteria-form>
    <!-- Empty state for editor -->
  </div>

  <div class="config-admin-shell__preview" role="region">
    <!-- Tabs/toggle for diff vs raw view -->
    <uc-config-diff-viewer
      [originalYaml]="(selectedDocument$ | async)?.rawYaml || ''"
      [modifiedYaml]="currentYaml"
      [viewMode]="diffViewMode"
      [theme]="diffTheme"
      [isBusy]="isLoading$ | async"
      [lastSavedTimestamp]="(selectedDocument$ | async)?.metadata?.lastModified | date:'medium'"
      (viewModeChange)="onDiffViewModeChange($event)"
      (optionsChange)="onDiffOptionsChange($event)">
    </uc-config-diff-viewer>
    <!-- Alternate textarea for raw YAML -->
    <!-- Empty state for preview -->
  </div>
</div>
```
## Dependencies

### Angular Core & Common

Structural directives and async pipe used throughout the template.  
[@use](@angular/core)  
[@use](@angular/common)

### Angular Material Components

Material toolbar, buttons, icons, tooltips, progress spinner, button toggles, chips, and divider utilities referenced by the template.  
[@use](@angular/material/toolbar)  
[@use](@angular/material/button)  
[@use](@angular/material/icon)  
[@use](@angular/material/button-toggle)  
[@use](@angular/material/chips)  
[@use](@angular/material/tooltip)  
[@use](@angular/material/progress-spinner)  
[@use](@angular/material/divider)

### Angular CDK

Utility directives for accessibility and layout (e.g., `cdkScrollable`, keyboard focus).  
[@use](@angular/cdk/a11y)  
[@use](@angular/cdk/scrolling)
