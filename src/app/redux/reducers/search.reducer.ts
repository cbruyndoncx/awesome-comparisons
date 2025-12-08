import { IUCAppState, UcAppState } from '../uc.app-state';
import { UCClickAction, UCSearchUpdateAction } from '../uc.action';
import { isNullOrUndefined } from '../../shared/util/null-check';

export function clickReducer(state: IUCAppState, action: UCClickAction): IUCAppState {
    const column = state.currentColumns[action.index];
    const criteria = state.criterias ? state.criterias.get(column) : undefined;
    if (!criteria) {
        return state;
    }
    
    // Create immutable copies for proper change detection
    const newCurrentSearch = new Map(state.currentSearch);
    const search = newCurrentSearch.get(criteria.id);
    
    if (criteria.rangeSearch) {
        if (search === undefined) {
            newCurrentSearch.set(criteria.id, new Set([action.val]));
        } else {
            const s = search.values().next().value;
            if (s && (s.trim() === action.val || s.trim().startsWith(action.val + ',') ||
                s.indexOf(',' + action.val + ',') > -1 ||
                s.endsWith(',' + action.val))) {
                return state;
            }
            newCurrentSearch.set(criteria.id, new Set([s + ',' + action.val]));
        }
    } else {
        if (search === undefined) {
            newCurrentSearch.set(criteria.id, new Set([action.val]));
        } else {
            const newSearch = new Set(search);
            newSearch.add(action.val);
            newCurrentSearch.set(criteria.id, newSearch);
        }
    }
    
    return {
        ...state,
        currentSearch: newCurrentSearch
    };
}

export function searchReducer(state: IUCAppState = new UcAppState(), action: UCSearchUpdateAction): IUCAppState {
    // Create immutable copies of Maps and Sets for proper change detection
    const newCurrentSearch = new Map(state.currentSearch);
    
    for (const [key, value] of action.criterias) {
        const elements = newCurrentSearch.get(key) || new Set<string>();
        const criteria = state.criterias ? state.criterias.get(key) : undefined;
        if (!criteria) {
            continue;
        }

        if (value === null) {
            newCurrentSearch.delete(key);
            continue;
        }

        if (criteria.rangeSearch) {
            if (value.length === 0) {
                newCurrentSearch.delete(key);
            } else {
                newCurrentSearch.set(key, new Set([value]));
            }
            continue;
        }

        // Create immutable Set for proper change detection
        const newElements = new Set(elements);
        
        if (newElements.has(value)) {
            newElements.delete(value);
            // If empty after removal, remove the key entirely
            if (newElements.size === 0) {
                newCurrentSearch.delete(key);
            } else {
                newCurrentSearch.set(key, newElements);
            }
        } else {
            const existing = newCurrentSearch.get(key);
            if (isNullOrUndefined(existing)) {
                newCurrentSearch.set(key, new Set([value]));
            } else if (existing) {
                newElements.add(value);
                newCurrentSearch.set(key, newElements);
            }
        }
    }
    
    // Return new state with immutable search data
    return {
        ...state,
        currentSearch: newCurrentSearch
    };
}
