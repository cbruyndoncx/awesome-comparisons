# Config Criteria Form Component Template

Template for the configuration criteria form component that provides an interface for managing criteria groups and entries.

## Target

[@generate](../../../../src/app/components/config-admin/config-criteria-form.component.html)

## Capabilities

### Form container structure

Wraps the entire form in a semantic section with proper ARIA labeling for accessibility.

- Uses `<section class="config-criteria" role="region" aria-label="Configuration editor">` as the main container

### Sticky action bar

Provides a persistent action bar at the top of the form with primary actions and status indicators.

- Contains `config-criteria__actions` class for styling
- Includes add group button calling `addCriteriaGroup()`
- Includes save button calling `saveRequested.emit()` with disabled state when `!isDirty`
- Includes revert button calling `revertRequested.emit()` with disabled state when `!isDirty`
- Includes format YAML button calling `formatRequested.emit()`
- Shows keyboard shortcut hints in button tooltips
- Displays totals using `document?.criteriaGroups?.length`
- Shows dirty indicator using component helpers

### Validation error display

Shows aggregated validation errors in a collapsible alert at the top of the form.

- Displays errors from `validationErrors` property
- Uses collapsible alert component for better UX

### Criteria groups accordion

Renders criteria groups in an expandable accordion with drag-and-drop support.

- Uses `mat-accordion` with `cdkDropList` for group reordering
- Each group header contains editable fields bound to FormGroup controls
- Includes `mat-form-field` inputs for `name`, `type`, `order` with the type options driven by the `allowedTypes` input plus a sentinel `group` option so organizational buckets (e.g., “Other Criteria”) remain editable
- Provides toggles for `search`, `table`, `detail` flags
- Exposes a “Link existing criteria” `mat-select` per group that lists entries from other groups/fallback bucket so admins can move criteria without drag-and-drop
- Contains clone button calling `cloneCriteriaGroup(i)`
- Contains delete button calling `removeCriteriaGroup(i)`
- Includes drag handle with `cdkDragHandle`
- Adds explicit expand/collapse icon button so the toggle is always visible (even for the fallback "Other Criteria" group) and panels start collapsed until toggled
- Wires `cdkDropListDropped` to `reorderCriteriaGroups($event)`

### Criteria entries within groups

Renders individual criteria entries within each group with full form controls.

- Uses `cdkDropList` for criteria entry reordering within groups
- Each entry renders in a `mat-card` with reactive form controls
- Includes controls for `id`, `name`, `type`, `order`, `placeholder`, `description` (type select also bound to `allowedTypes` so existing values remain visible)
- Provides per-entry toggles for `search`, `table`, `detail`, `andSearch`, and `rangeSearch` flags so criteria-level display settings can be adjusted independently of the parent group
- Placeholder and description fields accept structured template strings emitted as `template:Your text | variables:name,other`, which round-trip back to the YAML `template/variables` objects automatically
- Criteria cards render in a collapsed summary state (name/type plus flag badges for all five flags) by default with an “Edit” button that reveals the full form
- Contains clone button calling `cloneCriteriaEntry(i, j)`
- Contains delete button calling `removeCriteriaEntry(i, j)`
- Connects each drop list via `cdkDropListConnectedTo` so entries can be dragged between groups (including the automatic "Other Criteria" bucket)
- Shows inline validation messages with `mat-error` when controls are invalid and touched
- Uses `tabindex="0"` for focusable cards
- Wires `cdkDropListDropped` to `reorderCriteriaEntries(i, $event)`

### Add criteria functionality

Provides buttons to add new criteria entries within groups.

- Includes add criteria button calling `addCriteriaEntry(i)` for each group

### Value display overrides

Shows and manages value display overrides for each criteria group.

- Displays table of overrides retrieved via `getValueDisplayOverrides(groupId)`
- Shows emoji and display text inputs for each override
- Includes add button calling `addValueDisplayOverride`
- Includes update functionality calling `updateValueDisplayOverride`
- Includes remove buttons calling `removeValueDisplayOverride`

### Reactive forms integration

Properly integrates with Angular reactive forms using appropriate directives.

- Uses `[formGroup]="documentForm"` on main form
- Uses `formArrayName="criteriaGroups"` for groups array
- Applies proper form control bindings throughout nested structure

### Accessibility features

Ensures proper accessibility with ARIA attributes and keyboard navigation.

- Provides ARIA roles for accordion items
- Uses `aria-expanded` bindings for accordion state
- Ensures focusable elements have proper tabindex values

### Empty state handling

Shows appropriate message when no document is loaded.

- Displays empty state message when `document` is null

## API

```html { .api }
<!-- Main form container -->
<section class="config-criteria" role="region" aria-label="Configuration editor">
  
  <!-- Sticky action bar -->
  <div class="config-criteria__actions">
    <!-- Action buttons with tooltips and disabled states -->
    <!-- Status indicators and totals -->
  </div>

  <!-- Validation errors alert (collapsible) -->
  
  <!-- Empty state or main form content -->
  <div *ngIf="document; else emptyState">
    
    <!-- Criteria groups accordion -->
    <mat-accordion cdkDropList (cdkDropListDropped)="reorderCriteriaGroups($event)">
      
      <!-- Group headers with form controls and actions -->
      <!-- Group content with criteria entries -->
      <!-- Value display overrides section -->
      
    </mat-accordion>
    
  </div>

  <!-- Empty state template -->
  <ng-template #emptyState>
    <!-- Empty state message -->
  </ng-template>

</section>
```

## Dependencies

### Angular Core & Common

Structural directives, template bindings, and async pipe usage.  
[@use](@angular/core)  
[@use](@angular/common)

### Angular Reactive Forms

Form controls and validation support.  
[@use](@angular/forms)

### Angular Material Components

Material modules for form fields, inputs, selects, slide toggles, expansion panels, cards, buttons, icons, tooltips, and tables.  
[@use](@angular/material/form-field)  
[@use](@angular/material/input)  
[@use](@angular/material/select)  
[@use](@angular/material/slide-toggle)  
[@use](@angular/material/expansion)  
[@use](@angular/material/card)  
[@use](@angular/material/button)  
[@use](@angular/material/icon)  
[@use](@angular/material/tooltip)  
[@use](@angular/material/table)

### Angular CDK

Drag-and-drop utilities used for criteria lists.  
[@use](@angular/cdk/drag-drop)
