import {
    FETCH_ACTIVE_CONTRACTS_REQUEST,
    FETCH_ACTIVE_CONTRACTS_SUCCESS,
    FETCH_ACTIVE_CONTRACTS_ERROR,
} from '../actions/workOrderActions';

const initialState = {
    loading: false,
    error: null,
    success: false,
    activeContracts: [],
};

const workOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_CONTRACTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ACTIVE_CONTRACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                activeContracts: action.payload,
            };
        case FETCH_ACTIVE_CONTRACTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default workOrderReducer;
