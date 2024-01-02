import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/registerActions';

const initialState = {
    loading: false,
    error: null,
    success: false,
    user: {},
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                user: action.payload,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        default:
            return state;
    }
};

export default registerReducer;
