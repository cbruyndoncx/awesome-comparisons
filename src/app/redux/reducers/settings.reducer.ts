import { IUCAppState } from '../uc.app-state';
import { UCToggleGroupAction } from '../uc.action';
import { isNullOrUndefined } from '../../shared/util/null-check';

export function toggleGroup(state: IUCAppState, action: UCToggleGroupAction): IUCAppState {
    if (isNullOrUndefined(state.groupExpanded)) {
        state.groupExpanded = {};
    }
    const group = (state.featureGroups || []).find(g => g.key === action.groupKey);
    if (isNullOrUndefined(group) || !group || group.isExcluded) {
        return state;
    }

    state.groupExpanded[action.groupKey] = action.expanded;
    state.featureGroups = state.featureGroups.map(existing => {
        if (existing.key !== action.groupKey) {
            return existing;
        }
        return {
            ...existing,
            isExpanded: action.expanded
        };
    });

    // Enable/disable columns based on group expansion
    if (group) {
        const groupChildKeys = new Set((group.children || []).map(c => c.id));
        if (group.primaryCriteria) {
            groupChildKeys.add(group.primaryCriteria.id);
        }

        state.columnKeys.forEach((colKey, index) => {
            if (groupChildKeys.has(colKey)) {
                const criteria = state.criterias ? state.criterias.get(colKey) : undefined;
                // Only enable the column if it has table: true in its configuration
                if (action.expanded) {
                    state.columnsEnabled[index] = criteria?.table === true;
                } else {
                    state.columnsEnabled[index] = false;
                }
            }
        });
    }

    state.currentChanged = true;
    return state;
}

export function columnDisplayChange(state: IUCAppState, index: number): IUCAppState {
    state.columnsEnabled[index] = !state.columnsEnabled[index];
    state.columnDisplayAll = state.columnsEnabled.filter(value => value).length === state.columnNames.length;
    state.tableExpand = state.columnDisplayAll;
    return state;
}

export function columnDisplayAll(state: IUCAppState, enable: boolean): IUCAppState {
    state.columnsEnabled = state.columnsEnabled.map(() => enable);
    state.columnDisplayAll = enable;
    state.tableExpand = enable;
    return state;
}
