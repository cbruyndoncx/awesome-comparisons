# ConfigAdminModule

Angular module for configuration administration features. Provides components and routing for managing configuration data through a lazy-loaded feature module.

## Target

[@generate](../../../../src/app/components/config-admin/config-admin.module.ts)

## Capabilities

### Module Declaration

Declares configuration administration components for use within the module.

- Declares ConfigAdminShellComponent as the main container
- Declares ConfigCatalogTreeComponent for configuration catalog navigation
- Declares ConfigCriteriaFormComponent for configuration criteria editing
- Declares ConfigDiffViewerComponent for configuration comparison display

### Module Imports

Imports foundational Angular modules and Material Design components needed by the configuration administration features.

- Imports CommonModule for basic Angular directives
- Imports RouterModule with forChild routing configuration
- Imports ReactiveFormsModule for reactive form handling
- Imports FormsModule for template-driven form elements
- Imports ClipboardModule for copy-to-clipboard functionality
- Imports Angular Material UI modules for consistent styling
- Imports Angular CDK modules for advanced UI behaviors

### Module Routing

Configures child routing to enable lazy loading of the configuration administration module.

- Provides RouterModule.forChild configuration with default route to ConfigAdminShellComponent
- Enables mounting at /admin/config path in the parent application
- Re-exports RouterModule for nested component routing

### Module Exports

Exports components that may be referenced by parent modules.

- Exports ConfigAdminShellComponent for external reference
- Re-exports RouterModule for routing directive access

### Custom Elements Support

Accommodates unknown elements from third-party or custom renderers.

- Includes CUSTOM_ELEMENTS_SCHEMA for diff viewers and other custom elements

## API

```typescript { .api }
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ConfigAdminShellComponent,
    ConfigCatalogTreeComponent,
    ConfigCriteriaFormComponent,
    ConfigDiffViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ConfigAdminShellComponent }
    ]),
    ReactiveFormsModule,
    FormsModule,
    ClipboardModule,
    ScrollingModule,
    DragDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatDividerModule
  ],
  exports: [
    ConfigAdminShellComponent,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigAdminModule { }
```

## Dependencies

### Component Dependencies

Configuration administration components that will be declared by this module.

[@use](./config-admin-shell-component.spec.md)
[@use](./config-catalog-tree-component.spec.md)
[@use](./config-criteria-form-component.spec.md)
[@use](./config-diff-viewer-component.spec.md)

### Angular Core Modules

Essential Angular modules for basic functionality.

[@use](@angular/common)
[@use](@angular/router)
[@use](@angular/forms)

### Angular CDK Modules

Angular Component Dev Kit modules for advanced UI behaviors.

[@use](@angular/cdk/clipboard)
[@use](@angular/cdk/scrolling)
[@use](@angular/cdk/drag-drop)

### Angular Material Modules

Material Design components for consistent UI styling.

[@use](@angular/material/toolbar)
[@use](@angular/material/button)
[@use](@angular/material/icon)
[@use](@angular/material/tooltip)
[@use](@angular/material/progress-spinner)
[@use](@angular/material/button-toggle)
[@use](@angular/material/chips)
[@use](@angular/material/form-field)
[@use](@angular/material/input)
[@use](@angular/material/list)
[@use](@angular/material/card)
[@use](@angular/material/slide-toggle)
[@use](@angular/material/menu)
[@use](@angular/material/expansion)
[@use](@angular/material/table)
[@use](@angular/material/divider)
