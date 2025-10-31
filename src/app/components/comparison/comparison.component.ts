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

@Component({
    selector: 'comparison',
    templateUrl: './comparison.template.html',
    styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {
    static instance;

    public repository: string;
    public collapsedFilterGroups: { [groupKey: string]: boolean } = {};
    public ungroupedCollapsed: boolean = false;
    public filtersCollapsed: boolean = true;

    @ViewChild('genericTableHeader') genericTableHeader: PaperCardComponent;
    public activeRow: DataElement = new DataElement('placeholder', '', '', new Map());

    public detailsOpen: boolean = false;
    public settingsOpen: boolean = false;

    public changed = 0;
    private versionInformation: VersionInformation = new VersionInformation();

    constructor(public configurationService: ConfigurationService,
                private cd: ChangeDetectorRef,
                public store: Store<IUCAppState>) {
        if (isNullOrUndefined(ComparisonComponent.instance)) {
            ComparisonComponent.instance = this;
        }
        this.configurationService.loadComparison(this.cd);
        this.repository = this.configurationService.configuration.repository;
    }

    public getVersionInformation(): VersionInformation {
        return this.versionInformation;
    }

    public criteriaChanged(value: string, crit: Criteria) {
        const map = new Map<string, string | null>();
        map.set(crit.id, value || null);
        this.store.dispatch(new UCSearchUpdateAction(map));
        this.cd.markForCheck();
    }

    public getActive(state: { state: IUCAppState }, crit: Criteria) {
        if (isNullOrUndefined(state)) {
            return [];
        }
        const active = state.state.currentSearch.get(crit.id);

        if (!isNullOrUndefined(active)) {
            return Array.from(active).map(name => {
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
        import('xlsx').then((XLSX: any) => {
            const ws = XLSX.utils.aoa_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Comparisons');
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
            const blob = new Blob([wbout], {type: 'application/octet-stream'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'comparisons.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(err => console.error('Failed to create XLSX:', err));
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

    // rest omitted for brevity

    private relevantFilterGroups(groups: FeatureGroupView[] = []): FeatureGroupView[] {
        return (groups || []).filter(group => !!group && !group.isExcluded && this.groupHasSearchableChildren(group));
    }
}

