import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { VersionInformation } from '../../../assets/VersionInformation';
import { PaperCardComponent } from '../polymer/paper-card/paper-card.component';
import { Store } from '@ngrx/store';
import { IUCAppState } from '../../redux/uc.app-state';
import { ConfigurationService } from './configuration/configuration.service';
import { UCClickAction, UCDetailsAction, UCNewStateAction, UCSearchUpdateAction, UCTableOrderAction } from '../../redux/uc.action';
import { isNullOrUndefined } from '../../shared/util/null-check';

import { Criteria, DataElement, Label } from '../../../../lib/gulp/model/model.module';
import { FeatureGroupView } from '../../models/feature-grouping.model';
import { ComparisonTemplateExportService } from './settings/comparison-template-export.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryModalComponent } from './add-entry/add-entry-modal.component';
import { DatasetManifestService } from '../datasets/dataset-manifest.service';
import { FeatureGroupingService } from '../output/feature-grouping.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'comparison',
    templateUrl: './comparison.template.html',
    styleUrls: ['./comparison.component.css'],
    standalone: false
})
export class ComparisonComponent {
    public repository: string;
    public collapsedFilterGroups: { [groupKey: string]: boolean } = {};
    public ungroupedCollapsed: boolean = false;
    public filtersCollapsed: boolean = true;

    @ViewChild('genericTableHeader') genericTableHeader!: PaperCardComponent;
    public activeRow: DataElement = new DataElement('placeholder', '', '', new Map());

    public detailsOpen: boolean = false;
    public settingsOpen: boolean = false;

    public changed = 0;
    private versionInformation: VersionInformation = new VersionInformation();

    private templateDownloadInProgress = false;

    constructor(public configurationService: ConfigurationService,
                private templateExportService: ComparisonTemplateExportService,
                private cd: ChangeDetectorRef,
                public store: Store<{ state: IUCAppState }>,
                private dialog: MatDialog,
                private datasetManifestService: DatasetManifestService,
                private featureGroupingService: FeatureGroupingService) {
        this.configurationService.loadComparison(this.cd);
        this.repository = this.configurationService.configuration.repository;
    }

    public getVersionInformation(): VersionInformation {
        return this.versionInformation;
    }

    public getRepositoryUrl(): string {
        return environment.repositoryUrl;
    }

    public getGithubPagesUrl(): string {
        return environment.githubPagesUrl;
    }

    public criteriaChanged(value: string | string[], crit: Criteria) {
        const map = new Map<string, string | null>();
        const val = Array.isArray(value) ? value.join(',') : value;
        map.set(crit.id, val || null);
        this.store.dispatch(new UCSearchUpdateAction(map));
        this.cd.markForCheck();
    }

    public getActive(state: IUCAppState | null, crit: Criteria) {
        if (isNullOrUndefined(state)) {
            return [];
        }
        const active = state!.currentSearch.get(crit.id);

        if (!isNullOrUndefined(active)) {
            return Array.from(active!).map(name => {
                return {
                    id: name,
                    text: name
                }
            });
        }

        return [];
    }

    public showDetails(index: number) {
        this.store.dispatch(new UCDetailsAction(ConfigurationService.data.dataElements[index]));
    }

    public deferredUpdate() {
        setTimeout(() => {
            this.changed > 0 ? (this.changed = this.changed - 100) : (this.changed = this.changed + 100);
        }, 100);
    }

    public setViewMode(mode: string) {
        this.store.dispatch({type: 'UPDATE_SETTINGS', operation: 'ViewMode', mode});
    }

    public downloadXlsxFromTable(payload: { columns?: string[]; columnKeys?: string[]; items?: any[]; index?: number[]; types?: string[]; dataElements?: any[] }) {
        const baseColumns = payload?.columns || this.configurationService.tableColumns;
        const items = payload?.items || [];
        const types = payload?.types || [];
        const indexMap = payload?.index || [];
        const dataElements = payload?.dataElements || [];

        // prepend element name/url so the spreadsheet includes element context
        const columns = ['Element Name', 'Element URL', ...baseColumns];
        const rows: any[] = [];
        // header
        rows.push(columns);

        for (let ri = 0; ri < items.length; ri++) {
            const item = items[ri] || [];
            const rowIndex = (Array.isArray(indexMap) && typeof indexMap[ri] === 'number') ? indexMap[ri] : ri;
            const element = dataElements && dataElements[rowIndex] ? dataElements[rowIndex] : null;
            const row: any[] = [];
            row.push(element ? (element.name || '') : '');
            row.push(element ? (element.url || '') : '');

            const columnKeys = payload?.columnKeys || [];
        for (let ci = 0; ci < baseColumns.length; ci++) {
            const entry = item[ci];
            if (!entry) {
                row.push('');
                continue;
            }
            // Determine type using columnKeys -> configuration, or fallback to provided types
            let t: string | undefined = undefined;
            const key = columnKeys[ci];
            if (key && this.configurationService.configuration) {
                const crit = this.configurationService.configuration.getCriteria(key);
                t = crit ? crit.type : undefined;
            }
            if (!t) {
                t = (types && types[ci]) || (entry && (entry.type || entry.contentType));
            }

            if (t === 'LABEL') {
                const labelsRaw = entry?.labelArray || entry?.labels || null;
                let labels: any[] = [];
                if (Array.isArray(labelsRaw)) {
                    labels = labelsRaw;
                } else if (labelsRaw && typeof labelsRaw === 'object' && typeof labelsRaw.entries === 'function') {
                    // Map-like
                    labels = Array.from(labelsRaw.values());
                } else if (labelsRaw && typeof labelsRaw === 'object') {
                    // plain object
                    labels = Object.values(labelsRaw);
                }
                const text = labels.map((l: any) => (l && (l.display || l.name) ? (l.display || l.name) : '')).filter(Boolean).join('; ');
                row.push(text);
                continue;
            }
            if (t === 'REPOSITORY') {
                if (Array.isArray(entry?.urlList) && entry.urlList.length > 0) {
                    row.push(entry.urlList.join('; '));
                    continue;
                }
            }
            // prefer tableText, then summaryText, then text/content
            const cell = entry?.tableText || entry?.summaryText || entry?.text || entry?.content || '';
            row.push(cell);
        }
            rows.push(row);
        }

        import('xlsx').then((mod: any) => {
            const XLSX = (mod && (mod.default || mod)) || mod;
            console.debug('downloadXlsxFromTable: columns=', columns?.length, 'rows=', rows.length, 'moduleHasUtils=', !!(XLSX && XLSX.utils));
            if (!XLSX || !XLSX.utils) {
                console.error('downloadXlsxFromTable: xlsx module missing utils, module:', XLSX);
                return;
            }
            try {
                const ws = XLSX.utils.aoa_to_sheet(rows);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Comparisons');
                const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
                const blob = new Blob([wbout], {type: 'application/octet-stream'});
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'comparisons.xlsx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (err) {
                console.error('Failed to create XLSX from table payload:', err);
            }
        }).catch(err => console.error('Failed to import xlsx module:', err));
    }

    public downloadXlsx() {
        // Build a simple XLSX file from current table data using SheetJS (xlsx)
        const columns = this.configurationService.tableColumns;
        const rows: any[] = [];
        // header row
        rows.push(columns);
        // data rows
        const items = this.configurationService.dataElements;
        for (const item of items) {
            const row: any[] = [];
            for (const col of columns) {
                const value = item.criteriaData.get(col);
                if (!value) {
                    row.push('');
                    continue;
                }
                switch (value.type) {
                    case (value as any).type: // pass-through to avoid TS complaining
                        // treat markdown/rating/text types
                        if ((value as any).tableText) {
                            row.push((value as any).tableText);
                        } else if ((value as any).text) {
                            row.push((value as any).text);
                        } else {
                            row.push('');
                        }
                        break;
                    default:
                        row.push('');
                }
            }
            rows.push(row);
        }
        // Use dynamic import to avoid loading xlsx for every user if not used
        import('xlsx').then((mod: any) => {
            const XLSX = (mod && (mod.default || mod)) || mod;
            console.debug('downloadXlsx: columns=', columns?.length, 'dataElements=', (items || []).length, 'moduleHasUtils=', !!(XLSX && XLSX.utils));
            if (!XLSX || !XLSX.utils) {
                console.error('downloadXlsx: xlsx module missing utils, module:', XLSX);
                return;
            }
            try {
                const ws = XLSX.utils.aoa_to_sheet(rows);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Comparisons');
                const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
                const blob = new Blob([wbout], {type: 'application/octet-stream'});
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'comparisons.xlsx';
                // append to body to increase chance the click works in all browsers
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (err) {
                console.error('Failed to create XLSX:', err);
            }
        }).catch(err => console.error('Failed to import xlsx module:', err));
    }

    public isComparisonTemplateDownloadDisabled(): boolean {

        const criteriaReady = Array.isArray(this.configurationService?.criteria) &&
            this.configurationService.criteria.length > 0;
        return this.templateDownloadInProgress || !criteriaReady;
    }

    public downloadComparisonTemplate(): void {
        if (this.isComparisonTemplateDownloadDisabled()) {
            return;
        }
        this.templateDownloadInProgress = true;
        this.templateExportService.downloadTemplate()
            .catch(err => console.error('Failed to download comparison template:', err))
            .finally(() => {
                this.templateDownloadInProgress = false;
                this.cd.markForCheck();
            });
    }

    /**
     * Callback functions dispatching to redux store
     */
    public changeOrder(change: { index: number, ctrl: boolean }) {
        if (!isNullOrUndefined(change)) {
            this.store.dispatch(new UCTableOrderAction(change.index, change.ctrl));
        }
    }

    public criteriaClicked(val: { event: MouseEvent, key: Label, index: number }) {
        this.store.dispatch(new UCClickAction(val.key.name, val.index));
    }

    public dispatchNewState(newState: any) {
        this.store.dispatch(new UCNewStateAction(<IUCAppState>newState));
    }

    public closeDetails() {
        this.store.dispatch(new UCDetailsAction(null));
    }

    public groupHasSearchableChildren(group: FeatureGroupView): boolean {
        return Array.isArray(group.children) && group.children.some(child => child.search);
    }

    public groupHasPrimaryControl(group: FeatureGroupView): boolean {
        return !!this.getPrimaryCriteria(group);
    }

    public getPrimaryCriteria(group: FeatureGroupView) {
        return group?.primaryCriteria || null;
    }

    public getCriteriaValues(criteria: Criteria) {
        const index = this.configurationService.criteria.findIndex(item => item.id === criteria.id);
        return index !== -1 ? this.configurationService.criteriaValues[index] : [];
    }

    public getUngroupedCriteria(groups: FeatureGroupView[]): Criteria[] {
        const groupedIds = new Set<string>();
        (groups || []).forEach(group => {
            (group.children || []).forEach(child => groupedIds.add(child.id));
        });
        return this.configurationService.criteria.filter(criteria => criteria.search && !groupedIds.has(criteria.id));
    }

    public groupLabelText(group: FeatureGroupView): string {
        const labelText = group?.label?.value || '';
        if (this.groupHasPrimaryControl(group) || (labelText && labelText.trim() === (group?.displayName || '').trim())) {
            return '';
        }
        return labelText;
    }

    public getPlaceholder(criteria: Criteria): string {
        if (!criteria) {
            return '';
        }
        return criteria.rangeSearch ? (criteria.placeholder || '') : '';
    }

    public toggleGroupCollapse(group: FeatureGroupView): void {
        if (!group) {
            return;
        }
        const nextState = !this.isGroupCollapsed(group);
        this.collapsedFilterGroups = {
            ...this.collapsedFilterGroups,
            [group.key]: nextState
        };
    }

    public isGroupCollapsed(group: FeatureGroupView): boolean {
        if (!group || !group.key) {
            return false;
        }
        return this.collapsedFilterGroups[group.key] === true;
    }

    public toggleUngroupedCollapse(): void {
        this.ungroupedCollapsed = !this.ungroupedCollapsed;
    }

    public isUngroupedCollapsed(): boolean {
        return this.ungroupedCollapsed;
    }

    public collapseIndicator(collapsed: boolean): string {
        return collapsed ? '+' : '\u2212';
    }

    public toggleFiltersCollapsed(): void {
        this.filtersCollapsed = !this.filtersCollapsed;
    }

    public resetCriteriaSelections(): void {
        const clearMap = new Map<string, string | null>();
        (this.configurationService.criteria || [])
            .filter(criteria => criteria.search)
            .forEach(criteria => clearMap.set(criteria.id, null));
        if (clearMap.size === 0) {
            return;
        }
        this.store.dispatch(new UCSearchUpdateAction(clearMap));
        this.cd.markForCheck();
    }

    public areAllFilterGroupsCollapsed(groups: FeatureGroupView[]): boolean {
        const relevantGroups = this.relevantFilterGroups(groups);
        const hasUngrouped = this.getUngroupedCriteria(groups).length > 0;
        const groupsCollapsed = relevantGroups.length === 0 || relevantGroups.every(group => this.isGroupCollapsed(group));
        const otherCollapsed = !hasUngrouped || this.isUngroupedCollapsed();
        return groupsCollapsed && otherCollapsed;
    }

    // Backwards-compatible alias: some templates/components still call areAllGroupsCollapsed
    public areAllGroupsCollapsed(groups: FeatureGroupView[]): boolean {
        return this.areAllFilterGroupsCollapsed(groups);
    }

    // Safe wrappers for templates: some compiled templates or other code may have overwritten
    // the identifier 'areAllGroupsCollapsed' with a non-function value at runtime. Use these
    // wrappers in templates to avoid "is not a function" runtime errors.
    public safeAreAllGroupsCollapsed(groups: FeatureGroupView[]): boolean {
        const candidate: any = (this as any).areAllGroupsCollapsed;
        if (typeof candidate === 'function') {
            try { return candidate.call(this, groups); } catch (e) { return this.areAllFilterGroupsCollapsed(groups); }
        }
        if (typeof candidate === 'boolean') {
            return candidate;
        }
        return this.areAllFilterGroupsCollapsed(groups);
    }

    public safeAreAllFilterGroupsExpanded(groups: FeatureGroupView[]): boolean {
        const candidate: any = (this as any).areAllFilterGroupsExpanded;
        if (typeof candidate === 'function') {
            try { return candidate.call(this, groups); } catch (e) { return this.areAllFilterGroupsExpanded(groups); }
        }
        if (typeof candidate === 'boolean') {
            return candidate;
        }
        return this.areAllFilterGroupsExpanded(groups);
    }

    public areAllFilterGroupsExpanded(groups: FeatureGroupView[]): boolean {
        const relevantGroups = this.relevantFilterGroups(groups);
        const hasUngrouped = this.getUngroupedCriteria(groups).length > 0;
        const groupsExpanded = relevantGroups.length === 0 || relevantGroups.every(group => !this.isGroupCollapsed(group));
        const otherExpanded = !hasUngrouped || !this.isUngroupedCollapsed();
        return groupsExpanded && otherExpanded;
    }


    public hasActiveFilters(searchState: Map<string, Set<string>>): boolean {
        if (!searchState) {
            return false;
        }
        for (const [, values] of searchState.entries()) {
            if (values && values.size > 0) {
                return true;
            }
        }
        return false;
    }

    public getActiveFilters(searchState: Map<string, Set<string>>): Array<{ id: string; label: string; values: string[] }> {
        if (!searchState) {
            return [];
        }
        const results: Array<{ id: string; label: string; values: string[] }> = [];
        searchState.forEach((values, key) => {
            if (values && values.size > 0) {
                const criteria = this.configurationService.configuration?.getCriteria(key);
                const label = criteria?.name || key;
                results.push({
                    id: key,
                    label,
                    values: Array.from(values)
                });
            }
        });
        results.sort((a, b) => a.label.localeCompare(b.label));
        return results;
    }

    public removeFilter(criteriaId: string, value: string): void {
        if (!criteriaId || !value) {
            return;
        }
        const update = new Map<string, string | null>();
        update.set(criteriaId, value);
        this.store.dispatch(new UCSearchUpdateAction(update));
        this.cd.markForCheck();
    }

    public toggleTableExpand(next: boolean): void {
        this.store.dispatch({type: 'UPDATE_SETTINGS', enable: next, operation: 'TableExpand'});
        this.deferredUpdate();
    }

    public setAllGroupCollapse(groups: FeatureGroupView[] = [], collapse: boolean = false): void {
        const nextState = {...this.collapsedFilterGroups};
        this.relevantFilterGroups(groups).forEach(group => {
            nextState[group.key] = collapse;
        });
        this.collapsedFilterGroups = nextState;

    }

    private relevantFilterGroups(groups: FeatureGroupView[] = []): FeatureGroupView[] {
        return (groups || []).filter(group => !!group && !group.isExcluded && this.groupHasSearchableChildren(group));
    }

    public openAddEntryModal(): void {
        this.datasetManifestService.getActiveDataset()
            .pipe(take(1))
            .subscribe(dataset => {
                if (!dataset) {
                    console.error('No active dataset found');
                    return;
                }

                this.store.pipe(take(1)).subscribe((raw: any) => {
                    // Handle both wrapped ({ state: IUCAppState }) and unwrapped (IUCAppState) formats
                    const state = raw && raw.state ? raw.state as IUCAppState : raw as IUCAppState;
                    const featureGroups = state.featureGroups || [];

                    console.log('Opening modal with feature groups:', featureGroups.length);
                    console.log('Feature groups:', featureGroups);

                    const dialogRef = this.dialog.open(AddEntryModalComponent, {
                        width: '90vw',
                        maxWidth: '1200px',
                        maxHeight: '90vh',
                        disableClose: true,
                        hasBackdrop: true,
                        panelClass: 'add-entry-dialog-panel',
                        data: {
                            dataset,
                            criteria: this.configurationService.criteria || [],
                            featureGroups,
                            repository: {
                                owner: 'cbruyndoncx',
                                repo: 'awesome-comparisons',
                                branch: 'main'
                            }
                        }
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        if (result?.action === 'submitted') {
                            console.log('Entry submitted to GitHub');
                        }
                    });
                });
            });
    }
}
