import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Criteria, CriteriaValue, DataElement, Label } from '../../../../lib/gulp/model/model.module';
import { IUCAppState } from '../../redux/uc.app-state';
import { UCToggleGroupAction } from '../../redux/uc.action';
import {
    FeatureGroupLabel,
    FeatureGroupView,
    GroupedCriteriaStructure,
    MarkdownComparisonPayload
} from '../../models/feature-grouping.model';
import { isNullOrUndefined } from '../../shared/util/null-check';

@Injectable({
    providedIn: 'root'
})
export class FeatureGroupingService {
    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);
    private static readonly OTHER_COLUMN_GROUP_KEY = '__other-columns__';
    private static readonly OTHER_COLUMN_GROUP_NAME = 'Other Columns';
    private static readonly ID_COLUMN_KEY = 'id';

    constructor(private store: Store<IUCAppState>) {
    }

    private static parseOrder(criteria: Criteria | undefined): number {
        if (!criteria) {
            return Number.POSITIVE_INFINITY;
        }
        if (criteria.id === 'id') {
            return Number.NEGATIVE_INFINITY;
        }
        const order = criteria.order;
        if (isNullOrUndefined(order) || order === '') {
            return Number.POSITIVE_INFINITY;
        }
        const numericOrder = Number(order);
        return Number.isFinite(numericOrder) ? numericOrder : Number.POSITIVE_INFINITY;
    }

    private unwrapState(raw: any): IUCAppState {
        return raw && raw.state ? raw.state as IUCAppState : raw as IUCAppState;
    }

    public parseGroupedMarkdown(payload: MarkdownComparisonPayload): GroupedCriteriaStructure {
        const criteriaIndex = new Map<string, Criteria>();
        (payload.configuration?.criteria || []).forEach(criteria => criteriaIndex.set(criteria.id, criteria));

        const groups: FeatureGroupView[] = [];
        const flat: Criteria[] = [];
        const columnGroupMap: Record<string, string> = {};

        const dataElements: Array<DataElement> = payload.data?.dataElements || [];
        const groupSummaries: Map<string, { children: Array<string>; labels: Set<string> }> = payload.data?.groups || new Map();

        const seenGroups = new Set<string>();

        (payload.configuration?.criteria || []).forEach(criteria => {
            if (Array.isArray(criteria.children) && criteria.children.length > 0) {
                const childSet = new Set<string>();
                const children: Criteria[] = [];
                let primaryCriteria: Criteria | undefined;

                if (criteria.search) {
                    primaryCriteria = criteria;
                    children.push(criteria);
                    childSet.add(criteria.id);
                    columnGroupMap[criteria.id] = criteria.id;
                }

                criteria.children
                    .map(childId => criteriaIndex.get(childId))
                    .filter((child): child is Criteria => !!child)
                    .forEach(child => {
                        if (!childSet.has(child.id)) {
                            children.push(child);
                            childSet.add(child.id);
                        }
                        columnGroupMap[child.id] = criteria.id;
                    });

                const summary = groupSummaries.get(criteria.id) || groupSummaries.get(criteria.name);
                const labelValues = summary?.labels ? Array.from(summary.labels) : [];
                const firstLabel = this.findFirstLabel(dataElements, criteria.id);
                const label = this.buildLabelMetadata(criteria, firstLabel, labelValues);
                const isExcluded = this.isExcludedGroup(labelValues);

                groups.push({
                    key: criteria.id,
                    displayName: criteria.name,
                    label,
                    children,
                    isExcluded,
                    isExpanded: !isExcluded && criteria?.defaultExpanded === true,
                    defaultExpanded: criteria?.defaultExpanded === true,
                    primaryCriteria: primaryCriteria || null
                });
                seenGroups.add(criteria.id);
                if (criteria.name && criteria.name !== criteria.id) {
                    seenGroups.add(criteria.name);
                }
            } else {
                flat.push(criteria);
            }
        });

        groupSummaries.forEach((summary, groupKey) => {
            if (seenGroups.has(groupKey)) {
                return;
            }
            const childIds = summary.children || [];
            if (childIds.length === 0) {
                return;
            }
            const childSet = new Set<string>();
            const children: Criteria[] = [];

            const criteria = criteriaIndex.get(groupKey) || Array.from(criteriaIndex.values()).find(item => item.name === groupKey);
            let primaryCriteria: Criteria | undefined;
            if (criteria && criteria.search) {
                primaryCriteria = criteria;
                children.push(criteria);
                childSet.add(criteria.id);
                columnGroupMap[criteria.id] = groupKey;
            }

            childIds
                .map(childId => criteriaIndex.get(childId))
                .filter((child): child is Criteria => !!child)
                .forEach(child => {
                    if (!childSet.has(child.id)) {
                        children.push(child);
                        childSet.add(child.id);
                    }
                    if (!columnGroupMap[child.id]) {
                        columnGroupMap[child.id] = groupKey;
                    }
                });
            if (children.length === 0) {
                return;
            }
            const labelValues = summary.labels ? Array.from(summary.labels) : [];
            const firstLabel = this.findFirstLabel(dataElements, groupKey);
            const label = this.buildLabelMetadata(criteria, firstLabel, labelValues);
            const isExcluded = this.isExcludedGroup(labelValues);

            groups.push({
                key: groupKey,
                displayName: criteria?.name || groupKey,
                label,
                children,
                isExcluded,
                isExpanded: !isExcluded && criteria?.defaultExpanded === true,
                defaultExpanded: criteria?.defaultExpanded === true,
                primaryCriteria: primaryCriteria || null
            });
            seenGroups.add(groupKey);
            if (criteria?.name && criteria.name !== groupKey) {
                seenGroups.add(criteria.name);
            }
        });

        groups.sort((a, b) => {
            const criteriaA = criteriaIndex.get(a.key);
            const criteriaB = criteriaIndex.get(b.key);
            const orderA = FeatureGroupingService.parseOrder(criteriaA);
            const orderB = FeatureGroupingService.parseOrder(criteriaB);

            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return (a.displayName || a.key).localeCompare(b.displayName || b.key);
        });

        const groupedColumnKeys = new Set(Object.keys(columnGroupMap));
        const tableColumns = (payload.configuration?.criteria || [])
            .filter(criteria =>
                criteria.table === true &&
                criteria.id !== FeatureGroupingService.ID_COLUMN_KEY &&
                !groupedColumnKeys.has(criteria.id)
            );

        if (tableColumns.length > 0 && !groups.some(group => group.key === FeatureGroupingService.OTHER_COLUMN_GROUP_KEY)) {
            tableColumns
                .filter(criteria => criteria.id !== FeatureGroupingService.ID_COLUMN_KEY)
                .forEach(criteria => {
                    if (!columnGroupMap[criteria.id]) {
                        columnGroupMap[criteria.id] = FeatureGroupingService.OTHER_COLUMN_GROUP_KEY;
                    }
                });
            groups.push({
                key: FeatureGroupingService.OTHER_COLUMN_GROUP_KEY,
                displayName: FeatureGroupingService.OTHER_COLUMN_GROUP_NAME,
                label: { value: FeatureGroupingService.OTHER_COLUMN_GROUP_NAME },
                children: [],
                isExcluded: false,
                isExpanded: false,
                defaultExpanded: false,
                primaryCriteria: null
            });
        }

        return {
            groups,
            flat,
            columnGroupMap
        };
    }

    public getGroups(): Observable<FeatureGroupView[]> {
        return this.store.select(state => this.unwrapState(state).featureGroups || [])
            .pipe(distinctUntilChanged());
    }

    public getGroupExpandState(groupKey: string): Observable<boolean> {
        return this.store.select(state => {
            const appState = this.unwrapState(state);
            return appState.groupExpanded && appState.groupExpanded[groupKey] === true;
        })
            .pipe(distinctUntilChanged());
    }

    public toggleGroup(groupKey: string, expanded: boolean): void {
        this.store.dispatch(new UCToggleGroupAction(groupKey, expanded));
    }

    public getColumnGroupMap(): Observable<Record<string, string>> {
        return this.store.select(state => this.unwrapState(state).groupColumnLookup || {})
            .pipe(distinctUntilChanged());
    }

    public getVisibleCriteria(): Observable<Criteria[]> {
        return this.store.select(state => {
            const appState = this.unwrapState(state);
            return {
                columns: appState.currentColumns,
                criterias: appState.criterias
            };
        }).pipe(
            map(({columns, criterias}) => (columns || [])
                .map(column => criterias?.get ? criterias.get(column) : undefined)
                .filter((criteria): criteria is Criteria => !!criteria)
            )
        );
    }

    private findFirstLabel(dataElements: Array<DataElement>, groupKey: string): Label | null {
        for (const element of dataElements) {
            const group = element.getGroupData(groupKey);
            if (group && group.label && group.label.labels && group.label.labels.size > 0) {
                const iterator = group.label.labels.values();
                const next = iterator.next();
                if (!next.done) {
                    return next.value;
                }
            }
        }
        return null;
    }

    private buildLabelMetadata(criteria: Criteria | undefined, label: Label | null, labelValues: Array<string>): FeatureGroupLabel {
        const baseValue = label?.name || this.resolveLabelValueFallback(labelValues);
        const displayOverride = (label as unknown as { display?: string })?.display;
        const metadata: FeatureGroupLabel = {
            value: displayOverride || baseValue
        };

        if (label?.tooltip) {
            metadata.tooltip = label.tooltip.plain || label.tooltip.text || undefined;
        }

        const colors = this.resolveColors(criteria, label, baseValue);
        if (colors) {
            metadata.colors = colors;
        }

        return metadata;
    }

    private resolveColors(criteria: Criteria | undefined, label: Label | null, value: string | undefined) {
        let textColor = label?.color || null;
        let backgroundColor = label?.backgroundColor || null;
        let clazz = label?.clazz || null;

        if ((!textColor && !backgroundColor && !clazz) && criteria?.values && value) {
            const criteriaValue: CriteriaValue | undefined = criteria.values.get(value);
            if (criteriaValue) {
                textColor = criteriaValue.color || textColor;
                backgroundColor = criteriaValue.backgroundColor || backgroundColor;
                clazz = criteriaValue.clazz || clazz;
            }
        }

        if (textColor || backgroundColor || clazz) {
            return {
                text: textColor || undefined,
                background: backgroundColor || undefined,
                clazz: clazz || undefined
            };
        }
        return undefined;
    }

    private resolveLabelValueFallback(labelValues: Array<string>): string {
        if (!labelValues || labelValues.length === 0) {
            return '';
        }
        if (labelValues.length === 1) {
            return labelValues[0];
        }
        return 'Mixed';
    }

    private isExcludedGroup(labelValues: Array<string>): boolean {
        if (!labelValues || labelValues.length === 0) {
            return false;
        }
        const normalizedValues = labelValues.map(value => (value || '').trim().toLowerCase());
        return normalizedValues.length > 0 &&
            normalizedValues.every(value => FeatureGroupingService.EXCLUDED_LABELS.has(value));
    }
}