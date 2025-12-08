import { IUCAppState, UcAppState } from './uc.app-state';
import {
    UCAction,
    UCClickAction,
    UCDataUpdateAction,
    UCDetailsAction,
    UCNewStateAction,
    UCRouterAction,
    UCSearchUpdateAction,
    UCSettingsUpdateAction,
    UCTableOrderAction,
    UCToggleGroupAction
} from './uc.action';
import { isNullOrUndefined } from '../shared/util/null-check';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

// Import Reducers
import { clickReducer, searchReducer } from './reducers/search.reducer';
import { detailsReducer, setDetails, toggleDetailsReducer } from './reducers/details.reducer';
import { filterReducer, changeOrder } from './reducers/data.reducer';
import { routeReducer } from './reducers/route.reducer';
import { columnDisplayAll, columnDisplayChange, toggleGroup } from './reducers/settings.reducer';

// Import Utils
import { updateElements } from './utils/state-url.util';
import { filterColumns, filterElements } from './utils/filtering.util';
import { sortElements } from './utils/sorting.util';
import { applyGrouping, initColumn, initSettings } from './utils/initialization.util';

export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const UPDATE_MODAL = 'UPDATE_MODAL';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
const UPDATE_ROUTE = ROUTER_NAVIGATION;
export const CLICK_ACTION = 'CLICK_ACTION';
export const NEW_STATE_ACTION = 'NEW_STATE_ACTION';
export const TOGGLE_DETAILS_ACTION = 'TOGGLE_DETAILS_ACTION';
export const TOGGLE_GROUP = 'TOGGLE_GROUP';

const update_actions =
    [UPDATE_SEARCH, UPDATE_MODAL, UPDATE_FILTER, UPDATE_DATA, UPDATE_ORDER, UPDATE_SETTINGS, CLICK_ACTION, UPDATE_ROUTE, TOGGLE_GROUP];

let reloadedState = false;

export function masterReducer(state: IUCAppState = new UcAppState(), action: UCAction) {
    switch (action.type) {
        case TOGGLE_DETAILS_ACTION:
            state = toggleDetailsReducer(state, <UCDetailsAction>action);
            state = updateElements(state);
            break;
        case CLICK_ACTION:
            state = clickReducer(state, <UCClickAction>action);
            break;
        case UPDATE_SEARCH:
            state = searchReducer(state, <UCSearchUpdateAction>action);
            break;
        case UPDATE_MODAL:
            state = detailsReducer(state, action);
            break;
        case UPDATE_FILTER:
            state = filterReducer(state, action);
            break;
        case UPDATE_ROUTE:
            state = routeReducer(state, <UCRouterAction>action);
            break;
        case UPDATE_DATA: {
            const dataAction = <UCDataUpdateAction>action;
            state.criterias = dataAction.criterias;
            state = initSettings(state);
            state = applyGrouping(state, dataAction.grouping);
            state = filterColumns(state);
            state = setDetails(state);
            break;
        }
        case UPDATE_ORDER:
            state = changeOrder(state, <UCTableOrderAction>action);
            state = sortElements(state);
            break;
        case UPDATE_SETTINGS:
            const act: UCSettingsUpdateAction = <UCSettingsUpdateAction>action;
            switch (act.operation) {
                case 'ColumnDisplayAll':
                    state = columnDisplayAll(state, act.enable);
                    state = filterColumns(state);
                    break;
                case 'ColumnChange':
                    if (act.value !== undefined) {
                        state = columnDisplayChange(state, act.value);
                        state = filterColumns(state);
                    }
                    break;
                case 'ElementDisplayAll':
                    state.elementsEnabled = state.elementsEnabled.map(() => act.enable);
                    state.elementDisplayAll = act.enable;
                    state.currentChanged = true;
                    break;
                case 'ElementChange':
                    if (act.value !== undefined) {
                        state.elementsEnabled[act.value] = !state.elementsEnabled[act.value];
                        state.elementDisplayAll = state.elementsEnabled.filter(value => value).length === state.elementNames.length;
                        state.currentChanged = true;
                    }
                    break;
                case 'TableExpand':
                    if (act.enable) {
                        state = columnDisplayAll(state, act.enable);
                    } else {
                        state.columnsEnabled = state.columnsEnabledCache;
                        state.columnDisplayAll = act.enable;
                    }
                    state = filterColumns(state);
                    state.tableExpand = act.enable;
                    break;
            }
            switch (act.operation) {
                // Latex-related settings removed in v3

                case 'SettingsOpenChange':
                    if (!act.enable && !state.columnDisplayAll) {
                        state.columnsEnabledCache = state.columnsEnabled;
                    }
                    break;
                case 'DetailsDisplayTooltips':
                    state.detailsDisplayTooltips = act.enable;
                    break;
                case 'LabelColorsEnabled':
                    state.labelColorsEnabled = act.enable;
                    break;
                case 'ShowMissingIndicators':
                    state.showMissingIndicators = act.enable;
                    break;
                case 'ViewMode':
                    const mode = (act as any).mode;
                    state.viewMode = mode === 'sheet' ? 'sheet' : 'table';
                    state.currentChanged = true;
                    break;
            }
            break;
        case TOGGLE_GROUP:
            state = toggleGroup(state, <UCToggleGroupAction>action);
            state = filterColumns(state);
            break;
        case NEW_STATE_ACTION:
            if (!isNullOrUndefined((<UCNewStateAction>action).newState)) {
                state = (<UCNewStateAction>action).newState;
                reloadedState = true;
                // allow changes to take effect 0.2 seconds after a state was reloaded.
                setTimeout(() => reloadedState = false, 200);
            }
            break;
    }
    if (update_actions.indexOf(action.type) > -1 || action.type === UPDATE_ROUTE && !reloadedState) {
        if (action.type === UPDATE_ROUTE) {
            state.currentElements = [];
            state.currentSearch = new Map();
            state.currentFilter = [];
            state.currentDetails = -1;
        }
        state.currentChanged = false;
        state = filterElements(state);
        state = sortElements(state);
        state = updateElements(state);
    }
    return state;
}
