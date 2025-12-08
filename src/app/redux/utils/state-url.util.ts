import { IUCAppState } from '../uc.app-state';
import { ConfigurationService } from '../../components/comparison/configuration/configuration.service';
import { DataElement } from '../../../../lib/gulp/model/model.module';
import { isNullOrUndefined } from '../../shared/util/null-check';

export function updateElements(state: IUCAppState): IUCAppState {
    if (state.hydratingFromRoute) {
        state.hydratingFromRoute = false;
        state.currentSaved = true;
        state.currentChanged = false;
        return state;
    }
    if (state.currentChanged || !state.currentSaved) {
        putStateIntoURL(state);
        state.currentSaved = true;
    }
    return state;
}

export function putStateIntoURL(state: IUCAppState) {
    let query = '';
    if (state.currentSearch.size > 0) {
        query = 'search=';
        for (const [key, value] of state.currentSearch) {
            let crit = key;
            for (const val of value) {
                crit += `:${val}`;
            }
            query += `${encodeURIComponent(crit)};`;
        }
        query = query.slice(0, -1);
    }
    const totalElements = ConfigurationService.data?.dataElements?.length || state.elementsEnabled.length;
    if (totalElements > 0) {
        const enabledIndices: number[] = [];
        for (let index = 0; index < totalElements; index++) {
            if (state.elementsEnabled[index]) {
                enabledIndices.push(index);
            }
        }
        if (enabledIndices.length > 0 && enabledIndices.length < totalElements) {
            if (query.length > 0) {
                query += '&';
            }
            query += 'elements=' + enabledIndices.join(';');
        }
    }
    if (state.currentFilter.length > 0) {
        if (query.length > 0) {
            query += '&';
        }
        query += 'filter=';
        for (const filter of state.currentFilter) {
            query += `${filter},`;
        }
        query = query.slice(0, -1);
    }
    if (state.currentColumns.length > 0) {
        if (query.length > 0) {
            query += '&';
        }
        query += 'columns=';
        for (const column of state.currentColumns) {
            query += `${encodeURIComponent(column)},`;
        }
        query = query.slice(0, -1);
    }
    if (state.currentlyMaximized) {
        if (query.length > 0) {
            query += '&';
        }
        query += 'maximized=';
    }
    if (state.currentOrder.length > 0) {
        if (query.length > 0) {
            query += '&';
        }
        query += 'order=';
        for (const order of state.currentOrder) {
            query += `${encodeURIComponent(order)},`;
        }
        query = query.slice(0, -1);
    }
    const expandedGroups = Object.keys(state.groupExpanded || {}).filter(key => state.groupExpanded[key]);
    if (expandedGroups.length > 0) {
        if (query.length > 0) {
            query += '&';
        }
        query += 'groups=';
        expandedGroups.forEach(groupKey => {
            query += `${encodeURIComponent(groupKey)},`;
        });
        query = query.slice(0, -1);
    }
    if (state.viewMode === 'sheet') {
        if (query.length > 0) {
            query += '&';
        }
        query += 'view=sheet';
    }
    if (state.detailsOpen && !isNullOrUndefined(state.detailsData)) {
        if (query.length > 0) {
            query += '&';
        }
        query += 'details=';
        query += (<DataElement>state.detailsData).name;
    }
    const questionMark = query.length > 0;
    if (window.location.hash.length > 1) {
        query += window.location.hash;
    }
    if (query.length > 0) {
        window.history.pushState(state, '', (questionMark ? '?' : '') + query);
    }
}
