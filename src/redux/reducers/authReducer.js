// reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
    username: null,
    role:null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                isAuthenticated: false,
                token: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                username: action.payload.username,
                role:action.payload.role,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                error: action.payload.error,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                username: null,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
