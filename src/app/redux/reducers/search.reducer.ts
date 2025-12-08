import { IUCAppState, UcAppState } from '../uc.app-state';
import { UCClickAction, UCSearchUpdateAction } from '../uc.action';
import { isNullOrUndefined } from '../../shared/util/null-check';

export function clickReducer(state: IUCAppState, action: UCClickAction): IUCAppState {
    const column = state.currentColumns[action.index];
    const criteria = state.criterias ? state.criterias.get(column) : undefined;
    if (!criteria) {
        return state;
    }
    const search = state.currentSearch.get(criteria.id);
    if (criteria.rangeSearch) {
        if (search === undefined) {
            state.currentSearch.set(criteria.id, new Set([action.val]));
        } else {
            const s = search.values().next().value;
            if (s && (s.trim() === action.val || s.trim().startsWith(action.val + ',') ||
                s.indexOf(',' + action.val + ',') > -1 ||
                s.endsWith(',' + action.val))) {
                return state;
            }
            state.currentSearch.set(criteria.id, new Set([s + ',' + action.val]));
        }
    } else {
        if (search === undefined) {
            state.currentSearch.set(criteria.id, new Set([action.val]));
        } else {
            search.add(action.val);
            state.currentSearch.set(criteria.id, search);
        }
    }
    return state;
}

export function searchReducer(state: IUCAppState = new UcAppState(), action: UCSearchUpdateAction): IUCAppState {
    for (const [key, value] of action.criterias) {
        const elements = state.currentSearch.get(key) || new Set<string>();
        const criteria = state.criterias ? state.criterias.get(key) : undefined;
        if (!criteria) {
            continue;
        }

        if (value === null) {
            state.currentSearch.delete(key);
            continue;
        }

        if (criteria.rangeSearch) {
            if (value.length === 0) {
                state.currentSearch.delete(key);
            } else {
                state.currentSearch.set(key, new Set([value]));
            }
            continue;
        }

        if (elements.has(value)) {
            elements.delete(value);
        } else {
            const existing = state.currentSearch.get(key);
            if (isNullOrUndefined(existing)) {
                state.currentSearch.set(key, new Set([value]));
            } else if (existing) {
                existing.add(value);
            }
        }
    }
    return state;
}
