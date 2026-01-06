import { IUCAppState } from '../uc.app-state';
import { Criteria, CriteriaData, CriteriaTypes, DataElement, Label } from '../../../../lib/gulp/model/model.module';
import { ConfigurationService } from '../../components/comparison/configuration/configuration.service';
import { isNullOrUndefined } from '../../shared/util/null-check';

function parseCriteriaOrder(criteria: Criteria | undefined): number {
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

function buildOrderedColumnKeys(state: IUCAppState): Array<string> {
    const keys = Array.isArray(state.columnKeys) ? state.columnKeys : [];
    const groups = Array.isArray(state.featureGroups) ? state.featureGroups : [];
    if (keys.length === 0 || groups.length === 0) {
        return keys;
    }

    const keyOrderIndex = new Map<string, number>();
    keys.forEach((key, index) => keyOrderIndex.set(key, index));

    const primaryKeys: string[] = keys.filter(key => key === 'id' || key === 'ShortDescription');
    const added = new Set<string>(primaryKeys);
    const groupedKeys: string[] = [];
    const groupLookup = state.groupColumnLookup || {};
    const criterias = state.criterias;

    groups.forEach(group => {
        const childKeys = new Set<string>();
        (group.children || []).forEach(child => {
            if (child?.id) {
                childKeys.add(child.id);
            }
        });
        keys.forEach(key => {
            if (groupLookup[key] === group.key) {
                childKeys.add(key);
            }
        });

        const sortedChildren = Array.from(childKeys).filter(key => !primaryKeys.includes(key));
        sortedChildren.sort((a, b) => {
            const orderA = parseCriteriaOrder(criterias?.get(a));
            const orderB = parseCriteriaOrder(criterias?.get(b));
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return (keyOrderIndex.get(a) ?? 0) - (keyOrderIndex.get(b) ?? 0);
        });

        sortedChildren.forEach(key => {
            if (!added.has(key)) {
                groupedKeys.push(key);
                added.add(key);
            }
        });
    });

    const remaining = keys.filter(key => !added.has(key));
    remaining.sort((a, b) => {
        const orderA = parseCriteriaOrder(criterias?.get(a));
        const orderB = parseCriteriaOrder(criterias?.get(b));
        if (orderA !== orderB) {
            return orderA - orderB;
        }
        return (keyOrderIndex.get(a) ?? 0) - (keyOrderIndex.get(b) ?? 0);
    });

    return primaryKeys.concat(groupedKeys, remaining);
}

export function filterColumns(state: IUCAppState, columns: Map<string, boolean> = new Map()): IUCAppState {
    if (state.criterias === null) {
        return state;
    }

    const currentColumns: Array<string> = [];
    const groupLookup = state.groupColumnLookup || {};
    const expandedState = state.groupExpanded || {};
    const excludedGroups = new Set<string>();
    const enabledLookup = new Map<string, boolean>();

    state.columnKeys.forEach((key, index) => {
        enabledLookup.set(key, state.columnsEnabled[index] === true);
    });

    (state.featureGroups || []).forEach(group => {
        if (group.isExcluded) {
            excludedGroups.add(group.key);
        }
    });

    const orderedKeys = buildOrderedColumnKeys(state);
    orderedKeys.forEach(value => {
        if (!enabledLookup.get(value)) {
            return;
        }
        const criteria = state.criterias ? state.criterias.get(value) : undefined;
        // If criteria not found, skip? Or keep? Original code crashed if null.
        if (!criteria) return;

        const groupKey = groupLookup[value];
        if (!isNullOrUndefined(groupKey)) {
            const isExcluded = excludedGroups.has(groupKey);
            const isExpanded = expandedState[groupKey] === true;
            // Skip if group is excluded or collapsed
            if (isExcluded || !isExpanded) {
                return;
            }
        }
        currentColumns.push(value);
    });
    state.currentColumns = currentColumns;

    const columnNames: string[] = [];
    const columnTypes: CriteriaTypes[] = [];
    state.currentColumns.forEach(key => {
        const criteria: Criteria | undefined = state.criterias?.get(key);
        if (criteria) {
            columnNames.push(criteria.name);
            columnTypes.push(criteria.type);
        }
    });
    state.currentColumnNames = columnNames;
    state.columnTypes = columnTypes;

    const columnOrder: number[] = [];
    state.currentOrder.forEach(pk => {
        let index;
        if (pk.startsWith('-') && (index = state.currentColumns.indexOf(pk.substring(1))) !== -1) {
            columnOrder[index] = -1;
        } else if (pk.startsWith('+') && (index = state.currentColumns.indexOf(pk.substring(1))) !== -1) {
            columnOrder[index] = 1;
        } else if ((index = state.currentColumns.indexOf(pk)) !== -1) {
            columnOrder[index] = 1;
        }
    });
    state.columnOrder = columnOrder;

    return state;
}

export function filterElements(state: IUCAppState, criterias: Map<string, Criteria> | null = null) {
    // Initialize state.criteria if null
    if (state.criterias === null && criterias !== null) {
        state.criterias = criterias;
        state.currentChanged = true;
    }

    // Stop filtering if criteria is null
    if (state.criterias === null) {
        return state;
    }

    // Get data elements if null return
    const data: Array<DataElement> = ConfigurationService.data.dataElements;
    if (isNullOrUndefined(data)) {
        return state;
    }

    // Start building array used for table
    const dataElements: Array<Array<CriteriaData | null | undefined>> = [];
    const indexes: Array<number> = [];

    data.forEach((dataElement, i) => {
        if (state.currentFilter.indexOf(i) !== -1 || !state.elementsEnabled[i]) {
            return;
        }

        let includeData = true;
        state.currentSearch.forEach((filterValueSet, filterCriteriaKey) => {
            const filterCriteria = state.criterias ? state.criterias.get(filterCriteriaKey) : undefined;
            if (isNullOrUndefined(filterCriteria)) {
                return;
            }

            // Filter for number label columns
            if (filterCriteria && filterCriteria.rangeSearch) {
                const currentSearchSet = state.currentSearch.get(filterCriteriaKey);
                if (currentSearchSet && currentSearchSet.size > 0) {
                    // take the field or an empty string (to prevent null pointer errors)
                    const queries = (currentSearchSet.values().next().value || '').trim()
                    // replace spaces with empty strings
                        .replace(' ', '')
                        // remove elements that contain letters.
                        // first group is a comma followed by some characters (not comma) that contains a letter
                        // the second group is the same only with a comma at the end
                        // the third group is if there is no comma at all
                        .replace(/,[^,]*[a-zA-Z][^,]*|[^,]*[a-zA-Z][^,]*,|[^,]*[a-zA-Z][^,]*/g, '').split(',');
                    if (queries.length === 0 || queries.map((y: string) => y.length === 0).reduce((p: boolean, c: boolean) => p && c)) {
                        return;
                    }
                    let includeElement = false;
                    for (const query of queries) {
                        const splits = query.split('-');
                        let a = Number.MAX_VALUE;
                        let b = Number.MIN_VALUE;
                        if (splits.length === 1) {
                            a = b = Number.parseInt(splits[0]);
                            // only one number in the query
                        } else if (splits.length === 2 && splits[0].length === 0) {
                            // only one number in the query and it is negative
                            a = b = -1 * Number.parseInt(splits[1]);
                        } else if (splits.length === 2 && splits[0].length > 0 && splits[1].length > 0) {
                            // range search with two positive numbers
                            a = Number.parseInt(splits[0]);
                            b = Number.parseInt(splits[1]);
                            if (a > b) {
                                const c = b;
                                b = a;
                                a = c;
                            }
                        } else if (splits.length === 2 && splits[0].length > 0 && splits[1].length === 0) {
                            // intermittent range search, something like `250-` inbetween entering valid states
                            a = b = Number.parseInt(splits[0]);
                        } else if (splits.length === 3 && splits[0].length === 0 && splits[2].length === 0) {
                            // intermittent range search, something like `-250-` inbetween entering valid states
                            a = b = -1 * Number.parseInt(splits[1]);
                        } else if (splits.length === 3 && splits[0].length === 0 && splits[2].length > 0) {
                            // range search with first number negative
                            a = -1 * Number.parseInt(splits[1]);
                            b = Number.parseInt(splits[2]);
                        } else if (splits.length === 3 && splits[1].length === 0) {
                            // range search with second number negative
                            a = -1 * Number.parseInt(splits[2]);
                            b = Number.parseInt(splits[0]);
                        } else if (splits.length === 4 && splits[0].length === 0 && splits[2].length === 0) {
                            // range search with both numbers negative
                            a = -1 * Number.parseInt(splits[0]);
                            b = -1 * Number.parseInt(splits[1]);
                            if (a > b) {
                                const c = b;
                                b = a;
                                a = c;
                            }
                        }
                        const criteriaData = dataElement.criteriaData.get(filterCriteriaKey);
                        if (isNullOrUndefined(criteriaData)) {
                            includeElement = includeElement = false;
                        } else {
                            if (criteriaData && criteriaData.labels) {
                                criteriaData.labels.forEach((label: Label) => {
                                    const numberValue = Number.parseInt(label.name);
                                    if (a <= numberValue && numberValue <= b) {
                                        includeElement = true;
                                    }
                                });
                            }
                        }
                    }
                    includeData = includeData && includeElement;
                }
            }
            // filter for Label columns
            else {
                // fulfills query if filter set is empty
                let fulfillsField = (filterCriteria && filterCriteria.andSearch) || isNullOrUndefined(filterValueSet) || filterValueSet.size === 0;
                // Check for each value in filter if
                filterValueSet.forEach(filterValue => {
                    // if criteria data has one label
                    let fulfillsQuery = false;
                    const criteriaData = dataElement.criteriaData.get(filterCriteriaKey);
                    if (isNullOrUndefined(criteriaData)) {
                        fulfillsQuery = false;
                    } else {
                        if (criteriaData && criteriaData.labels) {
                            criteriaData.labels.forEach((label: Label, labelKey: string) => {
                                fulfillsQuery = fulfillsQuery || (labelKey === filterValue)
                            });
                        }
                    }

                    if (filterCriteria && filterCriteria.andSearch) {
                        fulfillsField = fulfillsField && fulfillsQuery;
                    } else {
                        fulfillsField = fulfillsField || fulfillsQuery;
                    }
                });
                includeData = includeData && fulfillsField;
            }
        });

        if (includeData) {
            const dataElement: DataElement = data[i];
            const criteriaDataArray: (CriteriaData | undefined)[] = [];
            state.currentColumns.forEach(key => {
                criteriaDataArray.push(dataElement.getCriteriaData(decodeURIComponent(key)));
            });
            dataElements.push(criteriaDataArray);
            indexes.push(i);
        }
    });

    if (state.rowIndexes.length !== indexes.length) {
        state.currentChanged = true;
    } else {
        for (let i = 0; i < indexes.length; i++) {
            state.currentChanged = state.currentChanged || indexes[i] === state.rowIndexes[i];
        }
    }
    state.rowIndexes = indexes;
    if (state.currentElements.length !== dataElements.length) {
        state.currentChanged = true;
    } else {
        for (let i = 0; i < dataElements.length; i++) {
            state.currentChanged = state.currentChanged || dataElements[i] === state.currentElements[i];
        }
    }
    state.currentElements = dataElements;
    return state;
}
