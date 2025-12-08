// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/config-admin/config-criteria-form-component.spec.md
// (spec:d8ae4cb6) (code:2e8a0f1a)

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  ViewChild,
  HostListener,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
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
import { serializeStructuredText } from './template-field.util';

interface LinkableEntryOption {
  id: string;
  label: string;
  groupIndex: number;
  groupName: string;
  entryIndex: number;
}

@Component({
    selector: 'uc-config-criteria-form',
    templateUrl: './config-criteria-form.component.html',
    styleUrls: ['./config-criteria-form.component.css'],
    standalone: false
})
export class ConfigCriteriaFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() document: ConfigDocumentModel | null = null;
  @Input() allowedTypes: string[] = [];
  @Input() isReadonly: boolean = false;

  documentForm!: FormGroup;
  criteriaGroupsArray!: FormArray;
  valueDisplayOverridesForm!: FormGroup;
  groupTypeOptions: string[] = ['group'];

  isDirty = false;
  validationErrors: ValidationError[] = [];
  expandedGroupIndex = -1;
  focusedElementId: string | null = null;

  @Output() documentChange = new EventEmitter<Partial<ConfigDocumentModel>>();
  @Output() dirtyChange = new EventEmitter<boolean>();
  @Output() requestCloneGroup = new EventEmitter<{
    groupIndex: number;
    sourceGroup: CriteriaGroupModel;
  }>();
  @Output() requestCloneCriteria = new EventEmitter<{
    groupIndex: number;
    criteriaIndex: number;
    sourceCriteria: CriteriaEntryModel;
  }>();
  @Output() requestDeleteGroup = new EventEmitter<{
    groupIndex: number;
    groupId: string;
  }>();
  @Output() requestDeleteCriteria = new EventEmitter<{
    groupIndex: number;
    criteriaIndex: number;
    criteriaId: string;
  }>();
  @Output() valueDisplayChange = new EventEmitter<{
    criteriaId: string;
    valueKey: string;
    emoji?: string;
    displayText?: string;
    action: 'add' | 'update' | 'remove';
  }>();
  @Output() saveRequested = new EventEmitter<void>();
  @Output() revertRequested = new EventEmitter<void>();
  @Output() formatRequested = new EventEmitter<void>();

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild('emojiMenuTrigger') emojiMenuTrigger!: MatMenuTrigger;

  private subscriptions: Subscription[] = [];
  private formChangeSubject = new Subject<number>();
  private formChangeSequence = 0;
  private suppressFormChangeNotifications = false;
  private expandedEntries = new Set<string>();
  linkSelections: Record<number, string | null> = {};
  linkableEntryOptions: LinkableEntryOption[][] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.syncGroupTypeOptions();
    this.expandedEntries.clear();
    this.documentForm = this.fb.group({
      criteriaGroups: this.fb.array([]),
      valueDisplayOverrides: this.fb.group({})
    });
    this.criteriaGroupsArray = this.documentForm.get(
      'criteriaGroups'
    ) as FormArray;
    this.valueDisplayOverridesForm = this.documentForm.get(
      'valueDisplayOverrides'
    ) as FormGroup;

    if (this.document) {
      this.initializeForm(this.document);
    }

    const formSub = this.documentForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => this.onFormValueChange());
    this.subscriptions.push(formSub);

    const changeSub = this.formChangeSubject
      .pipe(distinctUntilChanged(), debounceTime(200))
      .subscribe(() => {
        this.documentChange.emit(this.documentForm.value);
      });
    this.subscriptions.push(changeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowedTypes']) {
      this.syncGroupTypeOptions();
    }
    if (changes['document'] && this.documentForm) {
      const prev = changes['document'].previousValue as ConfigDocumentModel | null | undefined;
      const curr = changes['document'].currentValue as ConfigDocumentModel | null | undefined;
      const encodedPathChanged =
        prev?.encodedPath !== curr?.encodedPath;

      if (this.document) {
        if (changes['document'].isFirstChange() || encodedPathChanged) {
          this.initializeForm(this.document);
        } else if (!this.document.isDirty && this.isDirty) {
          this.resetDirtyState();
        }
      } else {
        this.documentForm.reset();
        this.criteriaGroupsArray.clear();
        Object.keys(this.valueDisplayOverridesForm.controls).forEach((key) =>
          this.valueDisplayOverridesForm.removeControl(key)
        );
        this.linkableEntryOptions = [];
      }
    }
  }

  initializeForm(document: ConfigDocumentModel): void {
    this.suppressFormChangeNotifications = true;
    this.criteriaGroupsArray.clear();
    Object.keys(this.valueDisplayOverridesForm.controls).forEach((key) => {
      this.valueDisplayOverridesForm.removeControl(key);
    });
    this.rebuildCriteriaGroupsArray(document.criteriaGroups || []);
    this.rebuildValueDisplayOverrides(
      document.valueDisplayOverrides || new Map()
    );
    this.expandedEntries.clear();
    this.linkSelections = {};
    this.rebuildLinkableEntryOptions();
    this.isDirty = false;
    this.dirtyChange.emit(this.isDirty);
    this.suppressFormChangeNotifications = false;
  }

  rebuildCriteriaGroupsArray(groups: CriteriaGroupModel[]): void {
    this.criteriaGroupsArray.clear();
    groups.forEach((g) => {
      const groupForm = this.fb.group({
        id: [g.id, Validators.required],
        name: [g.name, Validators.required],
        type: [g.type, Validators.required],
        search: [!!g.search],
        table: [!!g.table],
        detail: [!!g.detail],
        order: [g.order, [Validators.required, Validators.min(0)]],
        entries: this.fb.array(
          (g.children || []).map((e) => this.createEntryGroup(e))
        )
      });
      this.criteriaGroupsArray.push(groupForm);
    });
  }

  rebuildValueDisplayOverrides(
    overrides: Map<string, ValueDisplayModel[]>
  ): void {
    overrides.forEach((arr, criteriaId) => {
      const fa = this.fb.array(
        arr.map((v) =>
          this.fb.group({
            valueKey: [v.valueKey, Validators.required],
            emoji: [v.emoji || ''],
            displayText: [v.displayText || '']
          })
        )
      );
      this.valueDisplayOverridesForm.addControl(criteriaId, fa);
    });
  }

  preserveControlReferences(existingArray: FormArray, newData: any[]): void {
    existingArray.clear();
    newData.forEach((d) => {
      existingArray.push(this.fb.group(d));
    });
  }

  // Criteria Groups Management
  addCriteriaGroup(): void {
    const idx = this.criteriaGroupsArray.length;
    const newGroup: CriteriaGroupModel = {
      id: '',
      name: '',
      type: this.allowedTypes[0] || '',
      search: false,
      table: false,
      detail: false,
      order: idx,
      children: []
    };
    this.criteriaGroupsArray.push(
      this.fb.group({
        id: [newGroup.id, Validators.required],
        name: [newGroup.name, Validators.required],
        type: [newGroup.type, Validators.required],
        search: [newGroup.search],
        table: [newGroup.table],
        detail: [newGroup.detail],
        order: [newGroup.order, [Validators.required, Validators.min(0)]],
        entries: this.fb.array([])
      })
    );
    this.rebuildLinkableEntryOptions();
    this.onFormValueChange();
  }

  cloneCriteriaGroup(groupIndex: number): void {
    const source = (this.document?.criteriaGroups || [])[groupIndex];
    if (source) {
      this.requestCloneGroup.emit({ groupIndex, sourceGroup: source });
    }
  }

  removeCriteriaGroup(groupIndex: number): void {
    const group = this.criteriaGroupsArray.at(groupIndex);
    const gid = group.get('id')?.value;
    this.requestDeleteGroup.emit({ groupIndex, groupId: gid });
  }

  reorderCriteriaGroups(event: CdkDragDrop<any>): void {
    moveItemInArray(
      this.criteriaGroupsArray.controls,
      event.previousIndex,
      event.currentIndex
    );
    this.criteriaGroupsArray.updateValueAndValidity();
    this.rebuildLinkableEntryOptions();
    this.onFormValueChange();
  }

  expandGroup(groupIndex: number): void {
    this.expandedGroupIndex = groupIndex;
  }

  collapseGroup(groupIndex: number): void {
    if (this.expandedGroupIndex === groupIndex) {
      this.expandedGroupIndex = -1;
    }
  }

  // Criteria Entries Management
  getCriteriaEntriesArray(groupIndex: number): FormArray {
    return this.criteriaGroupsArray
      .at(groupIndex)
      .get('entries') as FormArray;
  }

  addCriteriaEntry(groupIndex: number): void {
    const entries = this.getCriteriaEntriesArray(groupIndex);
    const newEntry: CriteriaEntryModel = {
      id: '',
      name: '',
      type: this.allowedTypes[0] || '',
      search: false,
      table: false,
      detail: false,
      andSearch: false,
      rangeSearch: false,
      order: entries.length,
      placeholder: '',
      description: ''
    };
    entries.push(this.createEntryGroup(newEntry));
    this.setEntryExpansion(groupIndex, entries.length - 1, true);
    this.rebuildLinkableEntryOptions();
    this.onFormValueChange();
  }

  linkExistingCriteria(groupIndex: number, entryId: string | null): void {
    if (!entryId) {
      this.linkSelections[groupIndex] = null;
      return;
    }

    const location = this.findEntryLocation(entryId);
    if (!location || location.groupIndex === groupIndex) {
      this.linkSelections[groupIndex] = null;
      return;
    }

    const sourceArray = this.getCriteriaEntriesArray(location.groupIndex);
    const targetArray = this.getCriteriaEntriesArray(groupIndex);
    const entryControl = sourceArray.at(location.entryIndex) as FormGroup;
    if (!entryControl) {
      this.linkSelections[groupIndex] = null;
      return;
    }

    sourceArray.removeAt(location.entryIndex);
    targetArray.push(entryControl);
    this.normalizeEntryOrders(location.groupIndex);
    this.normalizeEntryOrders(groupIndex);
    this.setEntryExpansion(groupIndex, targetArray.length - 1, true);
    this.linkSelections[groupIndex] = null;
    this.rebuildLinkableEntryOptions();
    this.onFormValueChange();
  }

  cloneCriteriaEntry(groupIndex: number, criteriaIndex: number): void {
    const source =
      this.document?.criteriaGroups[groupIndex]?.children?.[criteriaIndex];
    if (source) {
      this.requestCloneCriteria.emit({
        groupIndex,
        criteriaIndex,
        sourceCriteria: source
      });
    }
  }

  removeCriteriaEntry(groupIndex: number, criteriaIndex: number): void {
    const entries = this.getCriteriaEntriesArray(groupIndex);
    const entryForm = entries.at(criteriaIndex);
    const cid = entryForm.get('id')?.value;
    this.requestDeleteCriteria.emit({
      groupIndex,
      criteriaIndex,
      criteriaId: cid
    });
  }

  reorderCriteriaEntries(groupIndex: number, event: CdkDragDrop<any>): void {
    const destinationArray = this.getCriteriaEntriesArray(groupIndex);

    if (event.previousContainer === event.container) {
      moveItemInArray(destinationArray.controls, event.previousIndex, event.currentIndex);
      destinationArray.updateValueAndValidity();
      this.normalizeEntryOrders(groupIndex);
      this.rebuildLinkableEntryOptions();
      this.onFormValueChange();
      return;
    }

    const sourceGroupIndex = event.previousContainer.data as number;
    if (typeof sourceGroupIndex !== 'number') {
      return;
    }
    const sourceArray = this.getCriteriaEntriesArray(sourceGroupIndex);
    const movedControl = sourceArray.at(event.previousIndex);

    sourceArray.removeAt(event.previousIndex);
    destinationArray.insert(event.currentIndex, movedControl);
    this.setEntryExpansion(sourceGroupIndex, event.previousIndex, false);
    this.setEntryExpansion(groupIndex, event.currentIndex, true);

    sourceArray.updateValueAndValidity();
    destinationArray.updateValueAndValidity();
    this.normalizeEntryOrders(sourceGroupIndex);
    this.normalizeEntryOrders(groupIndex);
    this.rebuildLinkableEntryOptions();
    this.onFormValueChange();
  }

  // Value Display Overrides Management
  getValueDisplayOverrides(criteriaId: string | null | undefined): ValueDisplayModel[] {
    if (!criteriaId || typeof criteriaId !== 'string' || !this.valueDisplayOverridesForm) {
      return [];
    }
    const control = this.valueDisplayOverridesForm.get(criteriaId);
    if (!control) {
      return [];
    }
    const fa = control as FormArray;
    return Array.isArray(fa.value) ? fa.value : [];
  }

  addValueDisplayOverride(criteriaId: string): void {
    let fa = this.valueDisplayOverridesForm.get(
      criteriaId
    ) as FormArray;
    if (!fa) {
      fa = this.fb.array([]);
      this.valueDisplayOverridesForm.addControl(criteriaId, fa);
    }
    const newCtrl = this.fb.group({
      valueKey: ['', Validators.required],
      emoji: [''],
      displayText: ['']
    });
    fa.push(newCtrl);
    this.valueDisplayChange.emit({
      criteriaId,
      valueKey: '',
      action: 'add'
    });
  }

  addLabelValue(groupIndex: number, entryIndex: number): void {
    const fa = this.getLabelValuesFormArray(groupIndex, entryIndex);
    if (!fa) {
      return;
    }
    fa.push(
      this.fb.group({
        valueKey: ['', Validators.required],
        display: [''],
        color: [''],
        backgroundColor: ['']
      })
    );
    this.onFormValueChange();
  }

  removeLabelValue(
    groupIndex: number,
    entryIndex: number,
    valueIndex: number
  ): void {
    const fa = this.getLabelValuesFormArray(groupIndex, entryIndex);
    if (!fa) {
      return;
    }
    fa.removeAt(valueIndex);
    this.onFormValueChange();
  }

  updateValueDisplayOverride(
    criteriaId: string,
    valueKey: string,
    emoji: string,
    displayText?: string
  ): void {
    this.valueDisplayChange.emit({
      criteriaId,
      valueKey,
      emoji,
      displayText,
      action: 'update'
    });
  }

  removeValueDisplayOverride(criteriaId: string, valueKey: string): void {
    const fa = this.valueDisplayOverridesForm.get(
      criteriaId
    ) as FormArray;
    if (!fa) {
      return;
    }
    const idx = fa.controls.findIndex(
      (ctrl) => ctrl.get('valueKey')?.value === valueKey
    );
    if (idx >= 0) {
      fa.removeAt(idx);
      this.valueDisplayChange.emit({
        criteriaId,
        valueKey,
        action: 'remove'
      });
    }
  }

  addQuickValueDisplay(
    criteriaId: string,
    preset: 'yes' | 'no' | 'partial'
  ): void {
    const map: Record<string, string> = {
      yes: '✅',
      no: '❌',
      partial: '➖'
    };
    const emoji = map[preset];
    const key = preset;
    this.valueDisplayChange.emit({
      criteriaId,
      valueKey: key,
      emoji,
      action: 'add'
    });
  }

  // Validation methods
  validateDocument(): ValidationError[] {
    const errors: ValidationError[] = [];
    errors.push(...this.validateUniqueIds());
    this.validationErrors = errors;
    return errors;
  }

  validateCriteriaGroup(groupForm: FormGroup): ValidationError[] {
    const errs: ValidationError[] = [];
    if (groupForm.get('name')?.invalid) {
      errs.push({
        field: 'name',
        message: 'Group name is required'
      });
    }
    return errs;
  }

  validateCriteriaEntry(entryForm: FormGroup): ValidationError[] {
    const errs: ValidationError[] = [];
    if (entryForm.get('id')?.invalid) {
      errs.push({ field: 'id', message: 'Criteria ID is required' });
    }
    return errs;
  }

  validateUniqueIds(): ValidationError[] {
    const seen = new Map<string, number>();
    this.criteriaGroupsArray.controls.forEach((g) => {
      const gid = g.get('id')?.value;
      if (gid) {
        seen.set(gid, (seen.get(gid) || 0) + 1);
      }
      const entries = (g.get('entries') as FormArray).controls;
      entries.forEach((e) => {
        const cid = e.get('id')?.value;
        if (cid) {
          seen.set(cid, (seen.get(cid) || 0) + 1);
        }
      });
    });
    const dupes = Array.from(seen.entries()).filter(([, cnt]) => cnt > 1);
    return dupes.map(([id]) => ({
      field: id,
      message: `Duplicate ID "${id}" found`
    }));
  }

  hasValidationErrors(): boolean {
    return this.validateDocument().length > 0;
  }

  getFieldError(controlPath: string): string | null {
    const control = this.documentForm.get(controlPath);
    if (control && control.errors) {
      if (control.errors.required) {
        return 'This field is required';
      }
      if (control.errors.min) {
        return 'Value must be non-negative';
      }
    }
    return null;
  }

  // Event handling and state management
  onFormValueChange(): void {
    if (this.suppressFormChangeNotifications) {
      return;
    }
    if (!this.isDirty) {
      this.isDirty = true;
      this.dirtyChange.emit(this.isDirty);
    }
    this.formChangeSubject.next(++this.formChangeSequence);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyboardShortcut(event: KeyboardEvent): void {
    if (event.ctrlKey && event.shiftKey && event.key === 'N') {
      this.addCriteriaGroup();
      event.preventDefault();
    } else if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      if (this.expandedGroupIndex >= 0) {
        this.cloneCriteriaGroup(this.expandedGroupIndex);
      }
      event.preventDefault();
    } else if (event.ctrlKey && event.key === 'Enter') {
      this.saveRequested.emit();
      event.preventDefault();
    } else if (event.key === 'Delete' && this.focusedElementId) {
      event.preventDefault();
    }
  }

  onFocusChange(elementId: string): void {
    this.focusedElementId = elementId;
  }

  markFormDirty(): void {
    this.isDirty = true;
    this.dirtyChange.emit(this.isDirty);
  }

  resetDirtyState(): void {
    if (this.isDirty) {
      this.isDirty = false;
      this.dirtyChange.emit(this.isDirty);
    }
    if (this.documentForm) {
      this.documentForm.markAsPristine();
      this.documentForm.markAsUntouched();
    }
  }

  // Utility methods
  getTotalGroupsCount(): number {
    return this.criteriaGroupsArray.length;
  }

  getTotalCriteriaCount(): number {
    let total = 0;
    this.criteriaGroupsArray.controls.forEach((g) => {
      total += (g.get('entries') as FormArray).length;
    });
    return total;
  }

  flushPendingChanges(): void {
    if (this.suppressFormChangeNotifications) {
      return;
    }
    this.documentChange.emit(this.documentForm.value);
  }

  getLabelValuesForEntry(
    groupIndex: number,
    entryIndex: number
  ): Array<{
    key: string;
    display?: string;
    color?: string;
    backgroundColor?: string;
  }> {
    const formArray = this.getLabelValuesFormArray(groupIndex, entryIndex);
    if (!formArray) {
      return [];
    }

    return formArray.controls.reduce<
      Array<{
        key: string;
        display?: string;
        color?: string;
        backgroundColor?: string;
      }>
    >((acc, control) => {
      const value = control.value || {};
      const key = value?.valueKey;
      if (!key) {
        return acc;
      }
      acc.push({
        key: key.toString(),
        display: value.display,
        color: value.color,
        backgroundColor: value.backgroundColor
      });
      return acc;
    }, []);
  }

  getLabelValuesFormArray(groupIndex: number, entryIndex: number): FormArray | null {
    const entries = this.getCriteriaEntriesArray(groupIndex);
    const entryGroup = entries.at(entryIndex) as FormGroup | null;
    if (!entryGroup) {
      return null;
    }
    return entryGroup.get('labelValues') as FormArray | null;
  }

  getGroupDisplayName(groupIndex: number): string {
    const g = this.criteriaGroupsArray.at(groupIndex).get('name')?.value;
    return g || `Group ${groupIndex + 1}`;
  }

  getCriteriaDisplayName(
    groupIndex: number,
    criteriaIndex: number
  ): string {
    const e = (this.criteriaGroupsArray
      .at(groupIndex)
      .get('entries') as FormArray)
      .at(criteriaIndex)
      .get('name')
      ?.value;
    return e || `Criteria ${criteriaIndex + 1}`;
  }

  isGroupExpanded(groupIndex: number): boolean {
    return this.expandedGroupIndex === groupIndex;
  }

  shouldShowVirtualScroll(itemCount: number): boolean {
    return itemCount > 20;
  }

  // Accessibility helpers
  getGroupAriaLabel(groupIndex: number): string {
    return `Criteria group ${this.getGroupDisplayName(groupIndex)}`;
  }

  getCriteriaAriaLabel(
    groupIndex: number,
    criteriaIndex: number
  ): string {
    return `Criteria entry ${this.getCriteriaDisplayName(
      groupIndex,
      criteriaIndex
    )}`;
  }

  announceValidationErrors(): void {
    if (this.validationErrors.length) {
      console.warn(
        'Validation errors:',
        this.validationErrors.map((e) => e.message).join(', ')
      );
    }
  }

  // Emoji picker integration
  openEmojiPicker(criteriaId: string, valueKey: string): void {
    this.emojiMenuTrigger.openMenu();
  }

  selectEmoji(
    emoji: string,
    criteriaId: string,
    valueKey: string
  ): void {
    this.updateValueDisplayOverride(criteriaId, valueKey, emoji);
  }

  getEmojiPresets(): { label: string; emoji: string; key: string }[] {
    return [
      { label: 'Yes', emoji: '✅', key: 'yes' },
      { label: 'No', emoji: '❌', key: 'no' },
      { label: 'Partial', emoji: '➖', key: 'partial' }
    ];
  }

  private createEntryGroup(e: CriteriaEntryModel): FormGroup {
    return this.fb.group({
      id: [e.id, Validators.required],
      name: [e.name, Validators.required],
      type: [e.type, Validators.required],
      search: [!!e.search],
      table: [!!e.table],
      detail: [!!e.detail],
      andSearch: [!!e.andSearch],
      rangeSearch: [!!e.rangeSearch],
      order: [e.order, [Validators.required, Validators.min(0)]],
      placeholder: [serializeStructuredText(e.placeholder)],
      description: [serializeStructuredText(e.description)],
      labelValues: this.fb.array(this.buildLabelValueControls(e))
    });
  }

  private buildLabelValueControls(entry: CriteriaEntryModel): FormGroup[] {
    const values = entry.extraProperties?.values;
    if (!values || typeof values !== 'object') {
      return [];
    }

    return Object.entries(values).map(([key, rawValue]) => {
      const parsed =
        typeof rawValue === 'object' && rawValue !== null
          ? (rawValue as Record<string, any>)
          : ({} as Record<string, any>);
      return this.fb.group({
        valueKey: [key, Validators.required],
        display: [parsed.display || parsed.displayText || (typeof rawValue === 'string' ? rawValue : '')],
        color: [parsed.color || ''],
        backgroundColor: [parsed.backgroundColor || '']
      });
    });
  }

  private syncGroupTypeOptions(): void {
    const normalized = this.allowedTypes || [];
    this.groupTypeOptions = Array.from(new Set(['group', ...normalized]));
  }

  isEntryExpanded(groupIndex: number, entryIndex: number): boolean {
    const key = this.getEntryKey(groupIndex, entryIndex);
    return this.expandedEntries.has(key);
  }

  toggleEntryExpansion(groupIndex: number, entryIndex: number): void {
    const key = this.getEntryKey(groupIndex, entryIndex);
    if (this.expandedEntries.has(key)) {
      this.expandedEntries.delete(key);
    } else {
      this.expandedEntries.add(key);
    }
  }

  private setEntryExpansion(groupIndex: number, entryIndex: number, expanded: boolean): void {
    const key = this.getEntryKey(groupIndex, entryIndex);
    if (!key) {
      return;
    }
    if (expanded) {
      this.expandedEntries.add(key);
    } else {
      this.expandedEntries.delete(key);
    }
  }

  private getEntryKey(groupIndex: number, entryIndex: number): string {
    const control = this.getCriteriaEntriesArray(groupIndex)?.at(entryIndex);
    const id = control?.get('id')?.value;
    return id ? String(id) : `${groupIndex}:${entryIndex}`;
  }

  getDropListId(index: number): string {
    return `criteria-entries-${index}`;
  }

  getConnectedDropListIds(currentIndex: number): string[] {
    if (!this.criteriaGroupsArray || this.criteriaGroupsArray.length === 0) {
      return [];
    }
    const currentId = this.getDropListId(currentIndex);
    return this.criteriaGroupsArray.controls
      .map((_, idx) => this.getDropListId(idx))
      .filter(id => id !== currentId);
  }

  private findEntryLocation(entryId: string): { groupIndex: number; entryIndex: number } | null {
    for (let groupIdx = 0; groupIdx < this.criteriaGroupsArray.length; groupIdx++) {
      const entries = this.getCriteriaEntriesArray(groupIdx);
      for (let entryIdx = 0; entryIdx < entries.length; entryIdx++) {
        if (entries.at(entryIdx)?.get('id')?.value === entryId) {
          return { groupIndex: groupIdx, entryIndex: entryIdx };
        }
      }
    }
    return null;
  }

  private normalizeEntryOrders(groupIndex: number): void {
    const entries = this.getCriteriaEntriesArray(groupIndex);
    entries.controls.forEach((control, idx) => {
      control.get('order')?.setValue(idx, { emitEvent: false });
    });
  }

  private rebuildLinkableEntryOptions(): void {
    if (!this.criteriaGroupsArray || this.criteriaGroupsArray.length === 0) {
      this.linkableEntryOptions = [];
      return;
    }

    const groups = this.criteriaGroupsArray;
    this.linkableEntryOptions = groups.controls.map((_, groupIndex) => {
      const options: LinkableEntryOption[] = [];
      groups.controls.forEach((groupControl, idx) => {
        if (idx === groupIndex) {
          return;
        }
        const groupName = groupControl.get('name')?.value || `Group ${idx + 1}`;
        const entries = (groupControl.get('entries') as FormArray).controls;
        entries.forEach((entryControl, entryIdx) => {
          const id = entryControl.get('id')?.value;
          if (!id) {
            return;
          }
          options.push({
            id,
            label: entryControl.get('name')?.value || id,
            groupIndex: idx,
            groupName,
            entryIndex: entryIdx
          });
        });
      });

      return options.sort((a, b) => {
        const groupCompare = a.groupName.localeCompare(b.groupName);
        if (groupCompare !== 0) {
          return groupCompare;
        }
        return a.label.localeCompare(b.label);
      });
    });
  }
}
