import {
    ADD_DYNAMIC_DATA,
    CONTRACTSTEP,
    FETCH_CONTRACTS_FAILURE,
    FETCH_CONTRACTS_REQUEST,
    FETCH_CONTRACTS_SUCCESS,
    HANDLE_CONTRACT_ACTION_MENU,
    STORE_UPLOAD_MSA_DATA,
    CREATE_CONTRACT_ERROR,
    CREATE_CONTRACT_REQUEST,
    CREATE_CONTRACT_SUCCESS,
    FETCH_COMPANY_ACTIVE_REQUEST,
    FETCH_COMPANY_ACTIVE_ERROR,
    FETCH_COMPANY_ACTIVE_SUCCESS,
} from '../actions/contractActions';
import {    FETCH_CONTRACTS_LOAD_FAILURE, FETCH_CONTRACTS_LOAD_REQUEST, FETCH_CONTRACTS_LOAD_SUCCESS, FETCH_CONTRACT_FAILURE, FETCH_CONTRACT_REQUEST, FETCH_CONTRACT_SUCCESS } from '../actions/contractActions';

const initialState = {
    contracts: [],
    activeCompanies: [],
    loading: false,
    error: null,
    contractActionMenu: '',
    uploadMsaData: [], // upload MSA
    contractSteps:'',
    contractSummary: [],
    contractSummaryWithNavigation: [],
    contractSummarySelected: {}
};

const contractReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTRACTS_REQUEST:
        case CREATE_CONTRACT_REQUEST:
        case FETCH_COMPANY_ACTIVE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACTS_SUCCESS:
            return { ...state, loading: false, contracts: action.payload };
        case FETCH_CONTRACTS_FAILURE:
        case CREATE_CONTRACT_ERROR:
        case FETCH_COMPANY_ACTIVE_ERROR:
            return { ...state, loading: false, error: action.payload };
        case HANDLE_CONTRACT_ACTION_MENU:
            return { ...state, contractAction: action.payload };
        case STORE_UPLOAD_MSA_DATA: //upload MSA
            return { ...state, uploadMsaData: action.payload };
        case CONTRACTSTEP:
            return { ...state, contractSteps: action.payload };
        case ADD_DYNAMIC_DATA:
            return { ...state, dynamicSampleData: action.payload };
        case CREATE_CONTRACT_SUCCESS:
            return { ...state, loading: false };
        case FETCH_COMPANY_ACTIVE_SUCCESS:
            return { ...state, loading: false, activeCompanies: action.payload };
        case FETCH_CONTRACTS_LOAD_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACTS_LOAD_SUCCESS:
            return { ...state, loading: false, contractSummary: action.payload.data.content, contractSummaryWithNavigation: action.payload.data };
        case FETCH_CONTRACTS_LOAD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_CONTRACT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACT_SUCCESS:
            return { ...state, loading: false, contractSummarySelected: action.payload.data };
        case FETCH_CONTRACT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default contractReducer;
