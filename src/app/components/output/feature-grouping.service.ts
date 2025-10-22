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

@Injectable({
    providedIn: 'root'
})
export class FeatureGroupingService {
    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);

    constructor(private store: Store<IUCAppState>) {
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
                const children: Criteria[] = criteria.children
                    .map(childId => criteriaIndex.get(childId))
                    .filter((child): child is Criteria => !!child);

                children.forEach(child => columnGroupMap[child.id] = criteria.id);

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
                    isExpanded: false
                });
                seenGroups.add(criteria.id);
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
            const children: Criteria[] = childIds
                .map(childId => criteriaIndex.get(childId))
                .filter((child): child is Criteria => !!child);
            if (children.length === 0) {
                return;
            }
            children.forEach(child => {
                if (!columnGroupMap[child.id]) {
                    columnGroupMap[child.id] = groupKey;
                }
            });

            const criteria = criteriaIndex.get(groupKey) || Array.from(criteriaIndex.values()).find(item => item.name === groupKey);
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
                isExpanded: false
            });
            seenGroups.add(groupKey);
        });

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
        const metadata: FeatureGroupLabel = {
            value: baseValue
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
