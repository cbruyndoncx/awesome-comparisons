import { IUCAppState } from '../uc.app-state';
import { CriteriaData, CriteriaTypes, Label } from '../../../../lib/gulp/model/model.module';
import { isNullOrUndefined } from '../../shared/util/null-check';

export function sortElements(state: IUCAppState): IUCAppState {
    if (state.currentOrder === null) {
        return state;
    }
    const keys: Array<number> = state.currentOrder.map(value => {
        const key: string = value.substring(1);
        if (state.currentColumns.indexOf(key) !== -1) {
            return state.currentColumns.indexOf(key);
        } else {
            return 0;
        }
    });
    const direction: Array<number> = state.currentOrder.map(key => {
        if (key.startsWith('+')) {
            return 1;
        } else if (key.startsWith('-')) {
            return -1;
        } else {
            // Default is positive (ascending)
            return 1;
        }
    });

    const combined: Array<{
        currentElements: Array<CriteriaData | null | undefined>,
        indexes: number
    }> = [];
    state.currentElements.forEach((value, index) => combined.push({
        currentElements: value,
        indexes: state.rowIndexes[index]
    }));
    combined.sort((a, b) => sort(a.currentElements, b.currentElements, state.columnTypes, keys, direction));
    if (state.currentElements.length !== combined.length) {
        state.currentChanged = true;
    } else {
        for (let i = 0; i < combined.length; i++) {
            state.currentChanged = state.currentChanged ||
                state.currentElements[i] === combined[i].currentElements ||
                state.rowIndexes[i] === combined[i].indexes;
        }
    }
    state.currentElements = combined.map(element => element.currentElements);
    state.rowIndexes = combined.map(element => element.indexes);

    return state;
}

/*
 * Sort two dataElements based on a list of criteria (keys) in ascending/descending (direction) order
 */
function sort(first: Array<CriteriaData | null | undefined>,
              second: Array<CriteriaData | null | undefined>,
              types: Array<CriteriaTypes>,
              keys: Array<number>,
              directions: Array<number>) {
    const stringCompare = (s1: string, s2: string) => {
        if (isNullOrUndefined(s1) && isNullOrUndefined(s2)) {
            return 0;
        }
        if (isNullOrUndefined(s1)) {
            return 1;
        }
        if (isNullOrUndefined(s2)) {
            return -1;
        }
        return s1.toLowerCase() > s2.toLowerCase() ? 1 : s1.toLowerCase() < s2.toLowerCase() ? -1 : 0;
    };
    const numberCompare = (n1: number, n2: number) => n1 > n2 ? 1 : n1 < n2 ? -1 : 0;

    if (isNullOrUndefined(first) && isNullOrUndefined(second) || first.length === 0 && second.length === 0) {
        return 0;
    }
    if (isNullOrUndefined(first) || first.length === 0 && second.length > 0) {
        return -1;
    }
    if (isNullOrUndefined(first) || first.length > 0 && second.length === 0) {
        return 1;
    }

    let result = 0;
    let index = 0;
    while (result === 0 && index < keys.length) {
        const criteriaDataFirst = first[keys[index]];
        const criteriaDataSecond = second[keys[index]];
        if (isNullOrUndefined(criteriaDataFirst) && isNullOrUndefined(criteriaDataSecond)) {
            result = 0;
        } else if (isNullOrUndefined(criteriaDataFirst)) {
            result = 1;
        } else if (isNullOrUndefined(criteriaDataSecond)) {
            result = -1;
        } else {
            switch (types[keys[index]]) {
                case CriteriaTypes.NAME_URL:
                    result = stringCompare(criteriaDataFirst!.text, criteriaDataSecond!.text);
                    break;
                case CriteriaTypes.TEXT:
                case CriteriaTypes.MARKDOWN:
                    result = stringCompare(criteriaDataFirst!.text, criteriaDataSecond!.text);
                    break;
                case CriteriaTypes.RATING:
                    const r1: number = <number>criteriaDataFirst!.rating;
                    const r2: number = <number>criteriaDataSecond!.rating;
                    result = numberCompare(r1, r2);
                    break;
                case CriteriaTypes.REPOSITORY:
                case CriteriaTypes.LABEL:
                    // TODO improve label sorting (label weighting...)
                    const l1: Label = criteriaDataFirst!.getFirstLabel();
                    const l2: Label = criteriaDataSecond!.getFirstLabel();
                    if (isNullOrUndefined(l1) && isNullOrUndefined(l2)) {
                        result = 0;
                    } else if (isNullOrUndefined(l1)) {
                        result = 1;
                    } else if (isNullOrUndefined(l2)) {
                        result = -1;
                    } else {
                        result = stringCompare(l1.name, l2.name)
                    }
                    break;
                default:
                    result = 0;
            }
        }
        if (result === 0) {
            index++;
        }
    }
    return directions[index] * result;
}
