# ConfigCriteriaFormComponent

Angular Material form component that provides the center editing pane for managing criteria groups, individual criteria entries, and value display overrides within configuration documents.

## Target

[@generate](../../../../src/app/components/config-admin/config-criteria-form.component.ts)

## Capabilities

### Document Form Projection

Consumes `ConfigDocumentModel` instances and projects them into nested reactive form groups with FormArrays.

- Projects criteria groups into FormArray with individual FormGroup per group
- Projects criteria entries within each group into nested FormArrays
- Maintains form control references to preserve focus during live updates
- Rebuilds forms when new documents are supplied while preserving existing control state
- Handles large documents with graceful degradation for small lists

### Criteria Groups Management

Renders per-group accordions with comprehensive editing controls.

- Name input with validation for required field
- Type select dropdown limited to allowed values from configuration
- Boolean toggles for search/table/detail flags using Material slide-toggle
- Numeric order input with non-negative validation
- Action buttons for add, clone, reorder (drag-and-drop), and delete operations
- Accordion expansion state management with unsaved indicators on headers
- CDK drag-drop integration via `cdkDropList` for group reordering

### Criteria Entries Management

Renders criteria entry cards within each group with full metadata editing.

- Editable fields: id, name, type, flags, order, placeholder, description
- Parent-child relationship maintenance within group context  
- Individual entry validation with inline error display
- Clone and reorder support for entries within groups
- Unique criteria ID validation across entire document
- Card-based layout with Material form-field components

### Value Display Overrides Management

Provides dedicated sub-section for managing emoji and display text mappings.

- Table listing of existing overrides with emoji/display text editors
- Add/remove actions for value display entries
- Quick suggestion buttons for common values (Yes/No/Partial)
- Optional Material menu integration for emoji picker
- Fallback text entry for custom emoji input
- Association with specific criteria entries via dropdown selection

### Form Validation and State Management

Enforces comprehensive validation rules consistent with README requirements.

- Allowed type values validation with dropdown constraints
- Boolean flag validation for search/table/detail toggles
- Required field validation for name and ID fields
- Numeric validation for order fields (non-negative integers)
- Unique criteria ID validation within document scope
- Aggregated validation state exposure via output events

### Event Emission and State Updates

Emits structured events for shell component coordination.

- `documentChange` when working copy mutations occur
- `dirtyChange` for unsaved state tracking
- `requestCloneGroup` for group duplication requests
- `requestCloneCriteria` for criteria entry duplication
- `requestDeleteGroup` and `requestDeleteCriteria` with confirmation
- `valueDisplayChange` for emoji/display override updates
- Partial update events enabling canonical state mutation by service

### Keyboard Shortcuts and Accessibility

Supports keyboard navigation and accessibility requirements.

- `Ctrl+Shift+N` to add new criteria group
- `Ctrl+Shift+C` to clone currently focused group
- `Ctrl+Enter` to trigger save (bubbled to shell)
- `Delete` key on focused items with confirmation dialog
- ARIA roles and proper labeling for screen readers
- Focus management for dialogs and menu interactions

### Performance and Reordering

Handles large documents by minimizing change detection churn and supporting drag-and-drop reordering for both groups and entries.

- Uses CDK drag-drop to reorder groups and entries
- Optimizes form control updates to minimize change detection cycles
- Lazy loads accordion content until expansion

### Sticky Actions Toolbar

Provides persistent action toolbar with document summary and quick actions.

- Summary display of total groups and criteria counts
- Quick action buttons for save, revert, and format YAML
- Persistence delegation to shell component via output events
- Sticky positioning during scroll with responsive layout

## API

```typescript { .api }
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatAccordion } from '@angular/material/expansion';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  ConfigDocumentModel,
  CriteriaGroupModel,
  CriteriaEntryModel,
  ValueDisplayModel
} from '../../models/config-document.model';
import { ValidationError } from '../../models/validation-error.model';

@Component({
  selector: 'uc-config-criteria-form',
  templateUrl: './config-criteria-form.component.html',
  styleUrls: ['./config-criteria-form.component.css']
})
export class ConfigCriteriaFormComponent implements OnInit, OnDestroy, OnChanges {
  // Document input and form state
  @Input() document: ConfigDocumentModel | null = null;
  @Input() allowedTypes: string[] = [];
  @Input() isReadonly: boolean = false;
  
  // Form groups and arrays
  documentForm: FormGroup;
  criteriaGroupsArray: FormArray;
  valueDisplayOverridesForm: FormGroup;
  
  // Component state
  isDirty: boolean = false;
  validationErrors: ValidationError[] = [];
  expandedGroupIndex: number = -1;
  focusedElementId: string | null = null;
  
  // Event outputs
  @Output() documentChange = new EventEmitter<Partial<ConfigDocumentModel>>();
  @Output() dirtyChange = new EventEmitter<boolean>();
  @Output() requestCloneGroup = new EventEmitter<{ groupIndex: number; sourceGroup: CriteriaGroupModel }>();
  @Output() requestCloneCriteria = new EventEmitter<{ groupIndex: number; criteriaIndex: number; sourceCriteria: CriteriaEntryModel }>();
  @Output() requestDeleteGroup = new EventEmitter<{ groupIndex: number; groupId: string }>();
  @Output() requestDeleteCriteria = new EventEmitter<{ groupIndex: number; criteriaIndex: number; criteriaId: string }>();
  @Output() valueDisplayChange = new EventEmitter<{ criteriaId: string; valueKey: string; emoji?: string; displayText?: string; action: 'add' | 'update' | 'remove' }>();
  @Output() saveRequested = new EventEmitter<void>();
  @Output() revertRequested = new EventEmitter<void>();
  @Output() formatRequested = new EventEmitter<void>();
  
  // View children for programmatic control
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('emojiMenuTrigger') emojiMenuTrigger: MatMenuTrigger;
  
  // Internal state
  private subscriptions: Subscription[] = [];
  private formChangeSubject = new Subject<void>();
  
  constructor(private fb: FormBuilder) {}
  
  // Lifecycle methods
  ngOnInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  
  // Form initialization and rebuilding
  initializeForm(document: ConfigDocumentModel): void;
  rebuildCriteriaGroupsArray(groups: CriteriaGroupModel[]): void;
  rebuildValueDisplayOverrides(overrides: Map<string, ValueDisplayModel[]>): void;
  preserveControlReferences(existingArray: FormArray, newData: any[]): void;
  
  // Criteria groups management
  addCriteriaGroup(): void;
  cloneCriteriaGroup(groupIndex: number): void;
  removeCriteriaGroup(groupIndex: number): void;
  reorderCriteriaGroups(event: CdkDragDrop<any>): void;
  expandGroup(groupIndex: number): void;
  collapseGroup(groupIndex: number): void;
  
  // Criteria entries management
  getCriteriaEntriesArray(groupIndex: number): FormArray;
  addCriteriaEntry(groupIndex: number): void;
  cloneCriteriaEntry(groupIndex: number, criteriaIndex: number): void;
  removeCriteriaEntry(groupIndex: number, criteriaIndex: number): void;
  reorderCriteriaEntries(groupIndex: number, event: CdkDragDrop<any>): void;
  
  // Value display overrides management
  getValueDisplayOverrides(criteriaId: string): ValueDisplayModel[];
  addValueDisplayOverride(criteriaId: string): void;
  updateValueDisplayOverride(criteriaId: string, valueKey: string, emoji: string, displayText?: string): void;
  removeValueDisplayOverride(criteriaId: string, valueKey: string): void;
  addQuickValueDisplay(criteriaId: string, preset: 'yes' | 'no' | 'partial'): void;
  
  // Validation methods
  validateDocument(): ValidationError[];
  validateCriteriaGroup(groupForm: FormGroup): ValidationError[];
  validateCriteriaEntry(entryForm: FormGroup): ValidationError[];
  validateUniqueIds(): ValidationError[];
  hasValidationErrors(): boolean;
  getFieldError(controlPath: string): string | null;
  
  // Event handling and state management
  onFormValueChange(): void;
  onKeyboardShortcut(event: KeyboardEvent): void;
  onFocusChange(elementId: string): void;
  markFormDirty(): void;
  resetDirtyState(): void;
  
  // Utility methods
  getTotalGroupsCount(): number;
  getTotalCriteriaCount(): number;
  getGroupDisplayName(groupIndex: number): string;
  getCriteriaDisplayName(groupIndex: number, criteriaIndex: number): string;
  isGroupExpanded(groupIndex: number): boolean;
  shouldShowVirtualScroll(itemCount: number): boolean;
  
  // Accessibility helpers
  getGroupAriaLabel(groupIndex: number): string;
  getCriteriaAriaLabel(groupIndex: number, criteriaIndex: number): string;
  announceValidationErrors(): void;
  
  // Emoji picker integration
  openEmojiPicker(criteriaId: string, valueKey: string): void;
  selectEmoji(emoji: string, criteriaId: string, valueKey: string): void;
  getEmojiPresets(): { label: string; emoji: string; key: string }[];
}
```

## Dependencies

### Config Admin Models

Configuration document and validation types are imported from the shared models directory. The models are located two levels up from the component directory structure (`../../models/`), following the project organization where models are at the app level and config-admin components are nested under components.

- `ConfigDocumentModel`, `CriteriaGroupModel`, `CriteriaEntryModel`, and `ValueDisplayModel` from `../../models/config-document.model`
- `ValidationError` from `../../models/validation-error.model`

[@use](../../models/config-document-model.spec.md)
[@use](../../models/validation-error-model.spec.md)

### Angular Reactive Forms

Angular reactive forms module for form validation and change tracking.
[@use](@angular/forms)

### Angular Material Components

Material Design components for form controls, accordions, and menus.
[@use](@angular/material)

### Angular CDK

CDK drag-drop utilities for reordering groups and entries.
[@use](@angular/cdk)

### RxJS

Reactive extensions for managing observable streams and form change events.
[@use](rxjs)
