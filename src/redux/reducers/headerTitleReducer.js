import {
    SET_CURRENT_PAGE_NAME,
    SET_SELECTED_IMAGE,
    SET_SELECTED_PROFILE_PICTURE,
    TENANT_NAME_REQUEST,
    TENANT_NAME_SUCCESS,
    TENANT_NAME_ERROR,
    FETCH_TENANT_NAME,
    TENANT_LOGO_REQUEST,
    TENANT_LOGO_SUCCESS,
    TENANT_LOGO_ERROR,
    FETCH_LOGO_NAME,
    TENANT_COLOR_REQUEST,
    TENANT_COLOR_SUCCESS,
    TENANT_COLOR_ERROR,
    FETCH_COLOR_NAME,
} from '../actions/headerTitleActions';

const initialState = {
    currentPageName: 'Dashboard', // Default page name
    selectedImage: null,
    selectedTenantName: null,
    loading: false,
    error: null,
    success: false,
    selectedProfilePicture: null,
    setTenantColor: null,
};

const headerTitleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE_NAME:
            return {
                ...state,
                currentPageName: action.payload,
            };
        case SET_SELECTED_IMAGE:
            return {
                ...state,
                selectedImage: action.payload,
            };

        case SET_SELECTED_PROFILE_PICTURE:
            return {
                ...state,
                selectedProfilePicture: action.payload,
            };
        case TENANT_NAME_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case TENANT_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                selectedTenantName: action.payload,
            };
        case TENANT_NAME_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_TENANT_NAME:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case TENANT_LOGO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case TENANT_LOGO_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                selectedImage:action.payload
            };
        case TENANT_LOGO_ERROR:
            return {
                ...state,
                image: null,
                // loading: false,
                error: action.payload,
            };
        case FETCH_LOGO_NAME:
            return {
                ...state,
                loading: true,
                error: null,
            };
            //tenant Color
            case TENANT_COLOR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case TENANT_COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                setTenantColor: action.payload,
            };
        case TENANT_COLOR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_COLOR_NAME:
            return {
                ...state,
                loading: true,
                error: null,
            };
        default:
            return state;
    }
};

export default headerTitleReducer;
