import { IUCAppState, UcAppState } from '../uc.app-state';
import { UCRouterAction } from '../uc.action';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { isNullOrUndefined } from '../../shared/util/null-check';
import { ConfigurationService } from '../../components/comparison/configuration/configuration.service';
import { DataElement } from '../../../../lib/gulp/model/model.module';

export function routeReducer(state: IUCAppState = new UcAppState(), action: UCRouterAction): IUCAppState {
    if (action.type !== ROUTER_NAVIGATION) {
        return state;
    }
    const params = action.payload.routerState.queryParams;
    const indices = decodeURIComponent(params.elements || '');
    const search = decodeURIComponent(params.search || params['?search'] || '');
    const filter = decodeURIComponent(params.filter || '');
    const columns = params.columns || '';
    const maximized = params.hasOwnProperty('maximized') || params.hasOwnProperty('?maximized');
    const order = decodeURIComponent(params.order || params['?order'] || '+id');
    const groupsParam = decodeURIComponent(params.groups || params['?groups'] || '');
    const viewParam = (params.view || params['?view'] || '').toString().toLowerCase();
    state.internalLink = params.sectionLink;

    search.split(';').map((x: string) => x.trim()).forEach((x: string) => {
        const splits = x.split(':');
        if (splits.length > 1) {
            // at least one filter is active
            const key = splits.splice(0, 1);
            state.currentSearch.set(key[0], new Set(splits));
        }
    });
    state.currentFilter = filter.split(',')
        .filter((x: string) => x.trim().length > 0)
        .filter((x: string) => Number.isInteger(Number.parseFloat(x.trim())))
        .map((x: string) => Number.parseInt(x.trim()));
    state.currentColumns = columns.split(',')
        .filter((x: string) => x.trim().length > 0);
    state.routeColumnsPending = state.currentColumns.length > 0 ? [...state.currentColumns] : null;
    state.routeElementsPending = null;
    state.routeGroupsPending = null;
    if (Array.isArray(state.columnKeys) && state.columnKeys.length > 0 && state.columnsEnabled.length === state.columnKeys.length && state.currentColumns.length > 0) {
        const allowedColumns = new Set(state.currentColumns);
        let anyMatched = false;
        state.columnKeys.forEach((key, index) => {
            const enabled = allowedColumns.has(key);
            state.columnsEnabled[index] = enabled;
            state.columnsEnabledCache[index] = enabled;
            if (enabled) {
                anyMatched = true;
            }
        });
        if (anyMatched) {
            state.columnDisplayAll = state.columnsEnabled.filter(value => value).length === state.columnNames.length;
            state.currentChanged = true;
            state.loadedColumnsFromRoute = [];
        } else {
            state.loadedColumnsFromRoute = [...state.currentColumns];
        }
    } else {
        state.loadedColumnsFromRoute = [...state.currentColumns];
    }
    if (state.currentColumns.length === 0 && state.criterias) {
        const values = state.criterias.values();
        let crit = values.next().value;
        while (!isNullOrUndefined(crit)) {
            if (crit && crit.table === true) {
                state.currentColumns.push(crit.id);
            }
            crit = values.next().value;
        }
    }
    state.groupExpanded = {};
    const expandedGroupTokens = groupsParam.split(',')
        .map(x => x.trim())
        .filter(x => x.length > 0);
    expandedGroupTokens.forEach(key => state.groupExpanded[key] = true);
    if ((state.featureGroups || []).length > 0) {
        state.featureGroups = state.featureGroups.map(group => ({
            ...group,
            isExpanded: state.groupExpanded[group.key] === true && !group.isExcluded
        }));
    } else {
        state.groupExpandedFromRoute = true;
        state.routeGroupsPending = {...state.groupExpanded};
    }
    state.hydratingFromRoute = true;

    const elementTokens = (indices || '')
        .split(';')
        .map(token => token.trim())
        .filter(token => token.length > 0 && token.toLowerCase() !== 'none');
    if (state.elementsEnabled.length > 0) {
        const enabledSet = new Set(elementTokens.map(token => Number.parseInt(token, 10)).filter(idx => !Number.isNaN(idx) && idx >= 0));
        if (enabledSet.size > 0) {
            for (let i = 0; i < state.elementsEnabled.length; i++) {
                state.elementsEnabled[i] = enabledSet.has(i);
            }
            state.elementDisplayAll = enabledSet.size === state.elementsEnabled.length;
            state.currentChanged = true;
        }
        state.routeElementsPending = enabledSet.size > 0 ? Array.from(enabledSet) : null;
    } else {
        state.loadedElementsEnabled = [];
        elementTokens.forEach(token => {
            const parsed = Number.parseInt(token, 10);
            if (!Number.isNaN(parsed) && parsed >= 0) {
                state.loadedElementsEnabled[parsed] = true;
            }
        });
        state.routeElementsPending = elementTokens.map(token => Number.parseInt(token, 10)).filter(idx => !Number.isNaN(idx) && idx >= 0);
    }
    if (params.details) {
        const detailsKey = decodeURIComponent(params.details);

        if (!isNullOrUndefined(detailsKey) && detailsKey.length > 0) {
            state.detailsOpen = true;
            if (isNullOrUndefined(ConfigurationService.data.dataElements) || ConfigurationService.data.dataElements.length === 0) {
                state.detailsData = new DataElement(detailsKey, '', '', new Map());
            } else {
                state.detailsData = searchElement(state, detailsKey);
            }
        }
    }

    state.viewMode = viewParam === 'sheet' ? 'sheet' : 'table';
    state.currentlyMaximized = maximized;
    state.currentOrder = order.split(',');
    return state;
}

function searchElement(state: IUCAppState, detailsKey: string): DataElement {
    for (const element of ConfigurationService.data.dataElements) {
        if (element.name === detailsKey) {
            return element;
        }
    }
    return new DataElement(detailsKey, '', '', new Map());
}
