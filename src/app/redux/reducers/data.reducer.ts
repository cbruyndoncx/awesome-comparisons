import { IUCAppState, UcAppState } from '../uc.app-state';
import { UCAction, UCTableOrderAction } from '../uc.action';

export function changeOrder(state: IUCAppState, action: UCTableOrderAction): IUCAppState {
    const key: string = state.currentColumns[action.index];
    const prefix: string = state.currentOrder.indexOf('+'.concat(key)) === -1 ? '+' : '-';

    if (action.ctrl) {
        const index = state.currentOrder.indexOf((prefix === '-' ? '+' : '-').concat(key));
        if (index !== -1) {
            state.currentOrder[index] = prefix.concat(key);
        } else {
            state.currentOrder.push(prefix.concat(key));
        }
    } else {
        state.columnOrder = [];
        state.currentOrder = [prefix + key];
    }

    state.columnOrder[action.index] = prefix === '+' ? 1 : -1;
    return state;
}

export function filterReducer(state: IUCAppState = new UcAppState(), action: UCAction): IUCAppState {
    return state;
}
