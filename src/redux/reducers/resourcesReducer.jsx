// resourcesReducer.js
import {
    FETCH_RESOURCE_REQUEST,
    FETCH_RESOURCE_SUCCESS,
    FETCH_RESOURCE_FAILURE,

    CREATE_RESOURCE_REQUEST,
    CREATE_RESOURCE_SUCCESS,
    CREATE_RESOURCE_FAILURE,

    UPDATE_RESOURCE_REQUEST,
    UPDATE_RESOURCE_SUCCESS,
    UPDATE_RESOURCE_FAILURE,

    FETCH_RESOURCE_BY_ID_REQUEST,
    FETCH_RESOURCE_BY_ID_SUCCESS,
    FETCH_RESOURCE_BY_ID_FAILURE,

    RESOURCE_STORE,

    PAGINATION_RESOURCE_REQUEST,
    PAGINATION_RESOURCE_SUCCESS,
    PAGINATION_RESOURCE_FAILURE,

    FETCH_RELATIONSHIP_REQUEST,
    FETCH_RELATIONSHIP_SUCCESS,
    FETCH_RELATIONSHIP_FAILURE,
} from '../actions/resourceActions';

const initialState = {
    resources: [],
    selectedResource: {},
    allResources: [],
    loading: false,
    error: null,
    formData: {},
    relationships: [],
};

const resourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESOURCE_REQUEST:
        case CREATE_RESOURCE_REQUEST:
        case UPDATE_RESOURCE_REQUEST:
        case FETCH_RESOURCE_BY_ID_REQUEST:
        case PAGINATION_RESOURCE_REQUEST:
        case FETCH_RELATIONSHIP_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RESOURCE_SUCCESS:
            return { ...state, loading: false, resources: action.payload };
        case PAGINATION_RESOURCE_SUCCESS:
            return { ...state, loading: false, allResources: action.payload };
        case FETCH_RELATIONSHIP_SUCCESS:
            return { ...state, loading: false, relationships: action.payload};
        case FETCH_RESOURCE_FAILURE:
        case CREATE_RESOURCE_FAILURE:
        case UPDATE_RESOURCE_FAILURE:
        case FETCH_RESOURCE_BY_ID_FAILURE:
        case PAGINATION_RESOURCE_FAILURE:
         case FETCH_RELATIONSHIP_FAILURE:   
            return { ...state, loading: false, error: action.payload };
        case CREATE_RESOURCE_SUCCESS:
        case UPDATE_RESOURCE_SUCCESS:
            return { ...state, loading: false, selectedResource: action.payload };
        case FETCH_RESOURCE_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedResource: action.payload };
        case RESOURCE_STORE:
            return { ...state, formData: action.payload }
        default:
            return state;
    }
};

export default resourceReducer;
