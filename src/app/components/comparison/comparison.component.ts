import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { VersionInformation } from '../../../assets/VersionInformation';
import { PaperCardComponent } from '../polymer/paper-card/paper-card.component';
import { LatexTableComponent } from '../output/latex-table/latex-table.component';
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
    public filtersCollapsed: boolean = false;

    @ViewChild(LatexTableComponent) latexTable: LatexTableComponent;
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

    public latexDownload() {
        if (!this.latexTable || !this.latexTable.element) {
            return;
        }
        let content: string = this.latexTable.element.nativeElement.textContent;
        content = content.substring(content.indexOf('%'));
        const blob: Blob = new Blob([content], {type: 'text/plain'});
        const downloadUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = 'latextable.tex';
        anchor.click();
        window.URL.revokeObjectURL(downloadUrl);
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

    public setAllGroupCollapse(groups: FeatureGroupView[] = [], collapse: boolean = false): void {
        const nextState = {...this.collapsedFilterGroups};
        this.relevantFilterGroups(groups).forEach(group => {
            nextState[group.key] = collapse;
        });
        this.collapsedFilterGroups = nextState;

        if (this.getUngroupedCriteria(groups).length > 0) {
            this.ungroupedCollapsed = collapse;
        }
    }

    public areAllFilterGroupsCollapsed(groups: FeatureGroupView[]): boolean {
        const relevantGroups = this.relevantFilterGroups(groups);
        const hasUngrouped = this.getUngroupedCriteria(groups).length > 0;
        const groupsCollapsed = relevantGroups.length === 0 || relevantGroups.every(group => this.isGroupCollapsed(group));
        const otherCollapsed = !hasUngrouped || this.isUngroupedCollapsed();
        return groupsCollapsed && otherCollapsed;
    }

    public areAllFilterGroupsExpanded(groups: FeatureGroupView[]): boolean {
        const relevantGroups = this.relevantFilterGroups(groups);
        const hasUngrouped = this.getUngroupedCriteria(groups).length > 0;
        const groupsExpanded = relevantGroups.length === 0 || relevantGroups.every(group => !this.isGroupCollapsed(group));
        const otherExpanded = !hasUngrouped || !this.isUngroupedCollapsed();
        return groupsExpanded && otherExpanded;
    }

    private relevantFilterGroups(groups: FeatureGroupView[] = []): FeatureGroupView[] {
        return (groups || []).filter(group => !!group && !group.isExcluded && this.groupHasSearchableChildren(group));
    }
}
