import {
    RESOURCE_SIDEBAR_VISIBLE,
    COMPANY_SIDEBAR_VISIBLE,
    CONTRACT_SIDEBAR_VISIBLE,
    TIMESHEET_SIDEBAR_VISIBLE,
} from '../actions/expandMenuAction';

const initialState = {
    resource: false,
    company: false,
    contract: false,
    timesheet: false,
};

const expandMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESOURCE_SIDEBAR_VISIBLE:
            return { ...state, resource: action.payload };
        case COMPANY_SIDEBAR_VISIBLE:
            return { ...state, company: action.payload };
        case CONTRACT_SIDEBAR_VISIBLE:
            return { ...state, contract: action.payload };
        case TIMESHEET_SIDEBAR_VISIBLE:
            return { ...state, timesheet: action.payload };
        default:
            return state;
    }
};

export default expandMenuReducer;
