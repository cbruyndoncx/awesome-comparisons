// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/components/config-admin/config-admin-shell-component.spec.md
// (spec:ddd2411e) (code:3b6f9b41)

import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';

import { ConfigWorkspaceService } from './config-workspace.service';
import { ConfigAlertService, AlertMessage } from './config-alert.service';
import {
  ConfigCatalogItem,
  ConfigDocumentModel,
  CriteriaEntryModel,
  CriteriaGroupModel
} from '../../models/config-document.model';
import { ConfigCriteriaFormComponent } from './config-criteria-form.component';
import { DiffOptions } from './config-diff-viewer.component';

@Component({
    selector: 'uc-config-admin-shell',
    templateUrl: './config-admin-shell.component.html',
    styleUrls: ['./config-admin-shell.component.css'],
    standalone: false
})
export class ConfigAdminShellComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly isSavingSubject = new BehaviorSubject<boolean>(false);
  private catalogItemsSnapshot: ConfigCatalogItem[] = [];
  private currentDocument: ConfigDocumentModel | null = null;
  @ViewChild(ConfigCriteriaFormComponent) private criteriaForm?: ConfigCriteriaFormComponent;
  
  totalGroups = 0;
  totalCriteria = 0;

  catalogItems$: Observable<ConfigCatalogItem[]> = this.configWorkspace.catalog$;
  selectedDocument$: Observable<ConfigDocumentModel | null> = this.configWorkspace.activeDocument$;
  isDirty$: Observable<boolean> = this.configWorkspace.activeDocument$.pipe(
    map(doc => doc?.isDirty ?? false)
  );
  isLoading$: Observable<boolean> = this.configWorkspace.isLoading$;
  hasUnsavedChanges = false;
  isSaving$ = this.isSavingSubject.asObservable();
  alertMessages$: Observable<AlertMessage[]> = this.alerts.messages$;

  @Output() configSaved = new EventEmitter<ConfigDocumentModel>();
  @Output() navigationRequested = new EventEmitter<string>();

  allowedTypes: string[] = [
    'MARKDOWN',
    'LABEL',
    'TEXT',
    'RATING',
    'REPOSITORY',
    'NAME_URL',
    'BOOLEAN'
  ];

  previewMode: 'diff' | 'raw' = 'diff';
  diffViewMode: 'unified' | 'split' = 'unified';
  diffTheme: 'light' | 'dark' = 'light';
  diffOptions: DiffOptions = {
    ignoreWhitespace: false,
    ignoreCase: false,
    showWhitespace: false
  };

  constructor(
    private readonly configWorkspace: ConfigWorkspaceService,
    private readonly alerts: ConfigAlertService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    console.log('[ConfigAdminShellComponent] ngOnInit called');

    this.catalogItems$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (items) => {
        this.catalogItemsSnapshot = items ?? [];
      },
      error: (err) => {
      }
    });

    this.selectedDocument$.pipe(takeUntil(this.destroy$)).subscribe(doc => {
      this.currentDocument = doc;
      this.totalGroups = doc?.criteriaGroups?.length || 0;
      this.totalCriteria = doc?.criteriaGroups?.reduce((sum, group) => sum + (group.children?.length || 0), 0) || 0;
      this.previewMode = this.previewMode || 'diff';
      this.diffViewMode = this.diffViewMode || 'unified';
      this.diffTheme = this.diffTheme || 'light';
    });
    this.isDirty$.pipe(takeUntil(this.destroy$)).subscribe(isDirty => {
      Promise.resolve().then(() => {
        this.hasUnsavedChanges = isDirty;
        this.cdr.markForCheck();
      });
    });

    // Service constructor no longer calls refreshCatalog(), so the component must.
    this.loadCatalog();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCatalog(): void {
    console.log('[ConfigAdminShellComponent] loadCatalog called');
    this.configWorkspace.refreshCatalog().pipe(takeUntil(this.destroy$)).subscribe({
      next: (catalog) => console.log('[ConfigAdminShellComponent] Catalog loaded:', catalog.length, 'items'),
      error: error => console.error('[ConfigAdminShellComponent] Failed to load catalog:', error)
    });
  }



  onCatalogSelect(encodedPath: string): void {
    if (this.currentDocument?.isDirty && !this.confirmDiscardChanges()) {
      return;
    }
    const match = this.catalogItemsSnapshot.find(item => item.encodedPath === encodedPath);
    if (match) {
      this.configWorkspace.selectDocument(match);
    }
  }

  onCatalogDrawerToggle(): void {
    // Responsive drawer handled by container layout; no-op placeholder.
  }

  onDocumentChange(partial: any): void {
    this.configWorkspace.applyDocumentFormValue(partial);
    this.configWorkspace.markDocumentDirty();
  }

  onDirtyChange(isDirty: boolean): void {
    if (isDirty) {
      this.configWorkspace.markDocumentDirty();
    } else {
      this.configWorkspace.clearDirtyState();
    }
  }

  onCloneGroup(event: { sourceGroup: CriteriaGroupModel }): void {
    if (event?.sourceGroup) {
      this.configWorkspace.cloneCriteriaGroup(event.sourceGroup);
    }
  }

  onCloneCriteria(event: { sourceCriteria: CriteriaEntryModel; groupId?: string; groupIndex?: number }): void {
    if (!event?.sourceCriteria) {
      return;
    }
    const groupId =
      event.groupId ??
      (typeof event.groupIndex === 'number' && this.currentDocument?.criteriaGroups?.[event.groupIndex]
        ? this.currentDocument.criteriaGroups[event.groupIndex].id
        : event.sourceCriteria.parentId);
    if (!groupId) {
      return;
    }
    this.configWorkspace.cloneCriteriaEntry(event.sourceCriteria, groupId);
  }

  onDeleteGroup(event: { groupId: string }): void {
    if (event?.groupId) {
      this.configWorkspace.removeCriteriaGroup(event.groupId);
    }
  }

  onDeleteCriteria(event: { groupId?: string; groupIndex?: number; criteriaId: string }): void {
    if (!event?.criteriaId) {
      return;
    }
    const groupId =
      event.groupId ??
      (typeof event.groupIndex === 'number' && this.currentDocument?.criteriaGroups?.[event.groupIndex]
        ? this.currentDocument.criteriaGroups[event.groupIndex].id
        : undefined);
    if (!groupId) {
      return;
    }
    this.configWorkspace.removeCriteriaEntry(groupId, event.criteriaId);
  }

  onValueDisplayChange(event: {
    criteriaId: string;
    valueKey: string;
    emoji?: string;
    displayText?: string;
    action: 'add' | 'update' | 'remove';
  }): void {
    if (!event?.criteriaId) {
      return;
    }
    if (event.action === 'remove') {
      this.configWorkspace.removeValueDisplayOverride(event.criteriaId, event.valueKey);
      return;
    }
    if (event.action === 'add' && !event.valueKey) {
      return;
    }
    const key = event.valueKey || `value-${Date.now()}`;
    this.configWorkspace.updateValueDisplayOverride(
      event.criteriaId,
      key,
      event.emoji || '',
      event.displayText
    );
  }

  trackAlert(index: number, alert: AlertMessage): string {
    return alert?.id || String(index);
  }

  onDiffViewModeChange(mode: 'unified' | 'split' | undefined | null): void {
    const nextMode: 'unified' | 'split' = mode === 'split' ? 'split' : 'unified';
    if (this.diffViewMode !== nextMode) {
      this.diffViewMode = nextMode;
    }
  }

  onPreviewModeChange(mode: 'diff' | 'raw' | undefined | null): void {
    const nextMode: 'diff' | 'raw' = mode === 'raw' ? 'raw' : 'diff';
    if (this.previewMode !== nextMode) {
      this.previewMode = nextMode;
    }
  }

  onDiffOptionsChange(options: DiffOptions): void {
    this.diffOptions = options;
  }

  saveDocument(): void {
    this.criteriaForm?.flushPendingChanges();
    this.isSavingSubject.next(true);
    this.configWorkspace
      .saveDocument()
      .pipe(takeUntil(this.destroy$), finalize(() => this.isSavingSubject.next(false)))
      .subscribe({
        next: result => {
          if (result.success) {
            this.configWorkspace.clearDirtyState();
            this.criteriaForm?.resetDirtyState();
            this.loadCatalog();
            if (this.currentDocument) {
              this.configSaved.emit(this.currentDocument);
            }
          } else {
            console.error('Save failed:', result.message);
          }
        },
        error: error => console.error('Failed to save document:', error)
      });
  }

  discardChanges(): void {
    if (!this.confirmDiscardChanges()) {
      return;
    }
    this.configWorkspace
      .revertDocument()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: doc => {
          this.currentDocument = doc;
        },
        error: error => console.error('Failed to revert document:', error)
      });
  }

  toggleDiffView(): void {
    this.previewMode = this.previewMode === 'diff' ? 'raw' : 'diff';
  }

  copyYamlToClipboard(): void {
    const yaml = this.currentYaml;
    if (!yaml) {
      return;
    }
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(yaml).catch(err => console.error('Failed to copy YAML:', err));
    }
  }

  refreshPreview(): void {
    // Preview content derived from workspace state; no explicit action required.
  }

  close(): void {
    if (this.currentDocument?.isDirty && !this.confirmDiscardChanges()) {
      return;
    }
    this.navigationRequested.emit('/admin/config');
  }

  canDeactivate(): boolean {
    if (this.currentDocument?.isDirty) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

  get currentYaml(): string {
    if (!this.currentDocument) {
      return '';
    }
    return this.previewMode === 'raw'
      ? this.currentDocument.rawYaml || ''
      : this.configWorkspace.generatePreviewYaml(this.currentDocument);
  }

  private confirmDiscardChanges(): boolean {
    return confirm('You have unsaved changes. Are you sure you want to discard them?');
  }
}
