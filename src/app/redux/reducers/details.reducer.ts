import { IUCAppState, UcAppState } from '../uc.app-state';
import { UCAction, UCDetailsAction } from '../uc.action';
import { isNullOrUndefined } from '../../shared/util/null-check';
import { ConfigurationService } from '../../components/comparison/configuration/configuration.service';

export function toggleDetailsReducer(state: IUCAppState = new UcAppState(), action: UCDetailsAction): IUCAppState {
    state.detailsOpen = !isNullOrUndefined(action.data);
    if (state.detailsOpen) {
        state.detailsData = action.data;
    }
    return state;
}

export function detailsReducer(state: IUCAppState = new UcAppState(), action: UCAction): IUCAppState {
    return state;
}

export function setDetails(state: IUCAppState): IUCAppState {
    if (!state.detailsOpen) {
        return state;
    }
    ConfigurationService.data.dataElements.forEach(dataElement => {
        if (state.detailsData && dataElement.name === state.detailsData.name) {
            state.detailsData = dataElement;
        }
    });
    return state;
}
