import {
    FETCH_ADDRESS_TYPE_REQUEST,
    FETCH_ADDRESS_TYPE_SUCCESS,
    FETCH_ADDRESS_TYPE_FAILURE,
    FETCH_WORKER_TYPES_REQUEST,
    FETCH_WORKER_TYPES_SUCCESS,
    FETCH_WORKER_TYPES_FAILURE,
    FETCH_ADMINROLE_REQUEST,
    FETCH_ADMINROLE_SUCCESS,
    FETCH_ADMINROLE_FAILURE,
    ADD_WORKER_TYPE_SUCCESS,
    ADD_WORKER_TYPE_FAILURE,
    ADD_WORKER_TYPE_REQUEST,
    FETCH_JOB_REQUEST,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILURE,
    FETCH_WORKER_ATTRIBUTE_REQUEST,
    FETCH_WORKER_ATTRIBUTE_SUCCESS,
    FETCH_WORKER_ATTRIBUTE_FAILURE,
    CREATE_LOAD_DOCUMENTS_DATA,
    CREATE_SUCCESS_DOCUMENTS_DATA,
    CREATE_ERROR_DOCUMENTS_DATA,
    FETCH_DOCUMENTS_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    FETCH_DOCUMENT_REQUEST,
    FETCH_DOCUMENT_SUCCESS,
    FETCH_DOCUMENT_FAILURE,
    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_FAILURE,
    PATCH_WORKER_TYPE_REQUEST,
    PATCH_WORKER_TYPE_SUCCESS,
    PATCH_WORKER_TYPE_FAILURE,
    RESOURCE_STATUS_REQUEST,
    RESOURCE_STATUS_SUCCESS,
    RESOURCE_STATUS_FAILURE,
    FETCH_RESOURCE_STATUS,
    RESOURCE_STATUS_REQUEST1,
    RESOURCE_STATUS_SUCCESS1,
    RESOURCE_STATUS_FAILURE1,
    FETCH_RESOURCE_STATUS1,
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAILURE,
    FETCH_TIMESHEET_DOCUMENT_REQUEST,
    FETCH_TIMESHEET_DOCUMENT_SUCCESS,
    FETCH_TIMESHEET_DOCUMENT_FAILURE,
    CREATE_TIMESHEET_LOAD_DOCUMENTS,
    CREATE_TIMESHEET_SUCCESS_DOCUMENTS,
    CREATE_TIMESHEET_ERROR_DOCUMENTS,
    FETCH_CONTRACT_DOCUMENT_REQUEST,
    FETCH_CONTRACT_DOCUMENT_SUCCESS,
    FETCH_CONTRACT_DOCUMENT_FAILURE,
    CREATE_CONTRACT_LOAD_DOCUMENTS,
    CREATE_CONTRACT_SUCCESS_DOCUMENTS,
    CREATE_CONTRACT_ERROR_DOCUMENTS,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE,
} from '../actions/adminResourceRoleAction';

const initialState = {
    workerAttributes: [],
    job: [],
    role: [],
    workerTypes: [],
    addressType: [],
    roleData: {},
    workerType: {},
    loading: false,
    error: null,
    uploadDocument: {},
    selectedDocumentData: {},
    patching: false,
    patchError: null,
    resourceStatus: null,
    resourceStatus1: null,
    documentList: [],
    TimeSheetDocumentsList: [],
    contractsDocumentsList: [],
    contractAssignDocumentsList: [],
};

const adminResourceRoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADMINROLE_REQUEST:
        case ADD_WORKER_TYPE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADMINROLE_SUCCESS:
            return { ...state, loading: false, role: action.payload };

        case FETCH_ADMINROLE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_WORKER_TYPE_SUCCESS:
            return { ...state, workerType: action.response, error: null };
        case ADD_WORKER_TYPE_FAILURE:
            return { ...state, workerType: {}, error: action.error };

        case FETCH_WORKER_TYPES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORKER_TYPES_SUCCESS:
            return { ...state, loading: false, workerTypes: action.payload };
        case FETCH_WORKER_TYPES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_ADDRESS_TYPE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADDRESS_TYPE_SUCCESS:
            return { ...state, loading: false, addressType: action.payload };
        case FETCH_ADDRESS_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_JOB_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_JOB_SUCCESS:
            return { ...state, loading: false, job: action.payload };
        case FETCH_JOB_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_WORKER_ATTRIBUTE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORKER_ATTRIBUTE_SUCCESS:
            return { ...state, loading: false, workerAttributes: action.payload };
        case FETCH_WORKER_ATTRIBUTE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_LOAD_DOCUMENTS_DATA:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_SUCCESS_DOCUMENTS_DATA:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_ERROR_DOCUMENTS_DATA:
            return { ...state, loading: false, error: action.payload };
        case FETCH_DOCUMENTS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DOCUMENTS_SUCCESS:
            return { ...state, loading: false, documentList: action.payload.data.content };
        case FETCH_DOCUMENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DOCUMENT_SUCCESS:
            return { ...state, loading: false, selectedDocumentData: action.payload.data };
        case FETCH_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case PATCH_WORKER_TYPE_REQUEST:
            return {
                ...state,
                patching: true,
                patchError: null,
            };

        case PATCH_WORKER_TYPE_SUCCESS:
            return {
                ...state,
                patching: false,
                patchError: null,
            };

        case PATCH_WORKER_TYPE_FAILURE:
            return {
                ...state,
                patching: false,
                patchError: action.error,
            };
        //Resource Status
        case RESOURCE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case RESOURCE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                resourceStatus: action.payload,
            };
        case RESOURCE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_RESOURCE_STATUS:
            return {
                ...state,
                loading: true,
                error: null,
            };
        //Resource Status1
        case RESOURCE_STATUS_REQUEST1:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case RESOURCE_STATUS_SUCCESS1:
            return {
                ...state,
                loading: false,
                success: true,
                resourceStatus1: action.payload,
            };
        case RESOURCE_STATUS_FAILURE1:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_RESOURCE_STATUS1:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case DELETE_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case DELETE_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_TIMESHEET_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TIMESHEET_DOCUMENT_SUCCESS:
            return { ...state, loading: false, TimeSheetDocumentsList: action.payload.data.content };
        case FETCH_TIMESHEET_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CREATE_TIMESHEET_LOAD_DOCUMENTS:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_TIMESHEET_SUCCESS_DOCUMENTS:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_TIMESHEET_ERROR_DOCUMENTS:
            return { ...state, loading: false, error: action.payload };
        case FETCH_CONTRACT_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACT_DOCUMENT_SUCCESS:
            return { ...state, loading: false, contractsDocumentsList: action.payload.data.content };
        case FETCH_CONTRACT_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CREATE_CONTRACT_LOAD_DOCUMENTS:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_CONTRACT_SUCCESS_DOCUMENTS:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_CONTRACT_ERROR_DOCUMENTS:
            return { ...state, loading: false, error: action.payload };
        case FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS:
            return { ...state, loading: false, contractAssignDocumentsList: action.payload};
        case FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default adminResourceRoleReducer;
