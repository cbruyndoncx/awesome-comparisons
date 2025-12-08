import { IUCAppState } from '../uc.app-state';
import { ConfigurationService } from '../../components/comparison/configuration/configuration.service';
import { isNullOrUndefined } from '../../shared/util/null-check';
import { FeatureGroupView, GroupedCriteriaStructure } from '../../models/feature-grouping.model';

export function initSettings(state: IUCAppState): IUCAppState {
    // Set elements settings
    const elementNames: Array<string> = [];
    const elementsEnabled: Array<boolean> = [];
    ConfigurationService.data.dataElements.forEach((value, index) => {
        elementNames.push(value.name);
        if (state.loadedElementsEnabled.length > 0) {
            elementsEnabled.push(!isNullOrUndefined(state.loadedElementsEnabled[index]));
        } else if (value.name === 'Template') {
            elementsEnabled.push(false);
        } else {
            elementsEnabled.push(true);
        }
    });
    state.elementNames = elementNames;
    state.elementsEnabled = elementsEnabled;
    state.elementDisplayAll = false;

    const pendingElements = state.routeElementsPending && state.routeElementsPending.length > 0
        ? state.routeElementsPending
        : Object.keys(state.loadedElementsEnabled).length > 0
            ? Object.entries(state.loadedElementsEnabled)
                .filter(([, enabled]) => enabled === true)
                .map(([idx]) => Number.parseInt(idx, 10))
                .filter(idx => !Number.isNaN(idx) && idx >= 0)
            : [];
    if (pendingElements.length > 0) {
        const allowed = new Set(pendingElements);
        state.elementsEnabled = state.elementsEnabled.map((_, idx) => allowed.has(idx));
        state.elementDisplayAll = allowed.size === state.elementsEnabled.length && state.elementsEnabled.length > 0;
        state.currentChanged = true;
        state.routeElementsPending = null;
        state.loadedElementsEnabled = [];
    } else if (state.loadedElementsEnabled.length > 0) {
        state.currentChanged = true;
        state.loadedElementsEnabled = [];
    }

    // Set column settings
    state = initColumn(state);

    // LaTeX settings removed in v3 (kept for historical reference)

    return state;
}

export function initColumn(state: IUCAppState): IUCAppState {
    const columnKeys: Array<string> = [];
    const columnNames: Array<string> = [];
    const columnsEnabled: Array<boolean> = [];
    const columnsEnabledCache: Array<boolean> = [];
    if (state.criterias) {
        state.criterias.forEach((value, key) => {
            const name: string = value.id.length !== 0 ? key : value.name;
            columnKeys.push(key);
            columnNames.push(name);
            columnsEnabled.push(value.table);
            columnsEnabledCache.push(value.table);
        });
    }
    state.columnKeys = columnKeys;
    state.columnNames = columnNames;
    state.columnsEnabled = columnsEnabled;
    state.columnsEnabledCache = columnsEnabledCache;
    const pendingColumns = state.routeColumnsPending && state.routeColumnsPending.length > 0
        ? state.routeColumnsPending
        : state.loadedColumnsFromRoute;
    if (Array.isArray(pendingColumns) && pendingColumns.length > 0) {
        const allowed = new Set(pendingColumns);
        let anyMatched = false;
        state.columnKeys.forEach((key, index) => {
            const enabled = allowed.has(key);
            state.columnsEnabled[index] = enabled;
            state.columnsEnabledCache[index] = enabled;
            if (enabled) {
                anyMatched = true;
            }
        });
        if (!anyMatched) {
            state.columnsEnabled = columnsEnabled;
            state.columnsEnabledCache = columnsEnabledCache;
        }
        state.loadedColumnsFromRoute = [];
        state.routeColumnsPending = null;
        state.currentChanged = true;
    }
    state.columnDisplayAll = state.columnsEnabled.filter(value => value).length === columnNames.length;
    return state;
}

export function applyGrouping(state: IUCAppState, grouping?: GroupedCriteriaStructure): IUCAppState {
    if (isNullOrUndefined(grouping) || !grouping) {
        state.featureGroups = [];
        state.groupColumnLookup = {};
        state.groupExpanded = {};
        return state;
    }

    const existingExpanded = state.groupExpanded || {};
    const overrideExpanded = state.groupExpandedFromRoute === true;
    const nextExpanded: { [key: string]: boolean } = {};
    grouping.groups.forEach((group: FeatureGroupView) => {
        let isExpanded: boolean;
        if (overrideExpanded) {
            isExpanded = !group.isExcluded && existingExpanded[group.key] === true;
        } else {
            const hasPersistedValue = Object.prototype.hasOwnProperty.call(existingExpanded, group.key);
            const persistedExpanded = hasPersistedValue && existingExpanded[group.key] === true;
            const defaultExpanded = group.defaultExpanded === true;
            isExpanded = !group.isExcluded && (hasPersistedValue ? persistedExpanded : defaultExpanded);
        }
        nextExpanded[group.key] = isExpanded;
    });

    state.groupExpanded = nextExpanded;
    state.groupColumnLookup = grouping.columnGroupMap ? {...grouping.columnGroupMap} : {};
    state.featureGroups = grouping.groups.map((group: FeatureGroupView) => ({
        ...group,
        children: group.children ? [...group.children] : [],
        isExpanded: !group.isExcluded && nextExpanded[group.key] === true
    }));
    state.routeGroupsPending = null;
    state.groupExpandedFromRoute = false;

    return state;
}
