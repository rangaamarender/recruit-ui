import {
    WORKER_ATTR_REQUEST,
    WORKER_ATTR_SUCCESS,
    WORKER_ATTR_ERROR,
    Fetch_WORKER_ATTR,
    Fetch_WORKER_ATTR_ERROR,
    Fetch_WORKER_ATTR_SUCCESS,
    STATUS_WORKER_ATTR,
    UPDATE_WORKER_ATTR
} from '../actions/adminSettingsAction';

const initialState = {
    loading: false,
    error: null,
    success: false,
    workerAttrDef: [],
};

const adminSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WORKER_ATTR_REQUEST:
        case Fetch_WORKER_ATTR:
        case STATUS_WORKER_ATTR:
        case UPDATE_WORKER_ATTR:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case WORKER_ATTR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case WORKER_ATTR_ERROR:
        case Fetch_WORKER_ATTR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Fetch_WORKER_ATTR_SUCCESS:
            return {
                ...state,
                loading: false,
                workerAttrDef: action.payload,
                error: null,
            };

        default:
            return state;
    }
};

export default adminSettingsReducer;
