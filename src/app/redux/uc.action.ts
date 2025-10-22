import { Action } from '@ngrx/store';
import {
    CLICK_ACTION,
    NEW_STATE_ACTION,
    TOGGLE_DETAILS_ACTION,
    TOGGLE_GROUP,
    UPDATE_DATA,
    UPDATE_ORDER,
    UPDATE_SEARCH,
    UPDATE_SETTINGS
} from './uc.reducers';
import { IUCAppState } from './uc.app-state';
import { Criteria, DataElement } from '../../../lib/gulp/model/model.module';
import { GroupedCriteriaStructure } from '../models/feature-grouping.model';

export class UCAction implements Action {
    type!: string;
    value: number;
}

export class UCRouterAction extends UCAction {
    payload: any;
}

export class UCDataUpdateAction extends UCAction {
    override type = UPDATE_DATA;

    constructor(public criterias: Map<string, Criteria>, public grouping?: GroupedCriteriaStructure) {
        super();
    }
}

export class UCSearchUpdateAction extends UCAction {
    override type = UPDATE_SEARCH;

    constructor(public criterias: Map<string, string>) {
        super();
    }
}

export class UCTableOrderAction extends UCAction {
    override type = UPDATE_ORDER;

    constructor(public index: number, public ctrl: boolean) {
        super();
    }
}

export class UCSettingsUpdateAction extends UCAction {
    override type = UPDATE_SETTINGS;

    constructor(public enable: boolean, public operation: string) {
        super();
    }
}

export class UCClickAction extends UCAction {
    override type = CLICK_ACTION;

    constructor(public val: string, public index: number) {
        super();
    }
}

export class UCNewStateAction extends UCAction {
    override type = NEW_STATE_ACTION;

    constructor(public newState: IUCAppState) {
        super();
    }
}

export class UCDetailsAction extends UCAction {
    override type = TOGGLE_DETAILS_ACTION;

    constructor(public data: DataElement) {
        super();
    }
}

export class UCToggleGroupAction extends UCAction {
    override type = TOGGLE_GROUP;

    constructor(public groupKey: string, public expanded: boolean) {
        super();
    }
}
