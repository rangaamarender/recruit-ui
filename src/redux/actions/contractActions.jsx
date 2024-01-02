// contractActions.js
export const FETCH_CONTRACTS_REQUEST = 'FETCH_CONTRACTS_REQUEST';
export const FETCH_CONTRACTS_SUCCESS = 'FETCH_CONTRACTS_SUCCESS';
export const FETCH_CONTRACTS_FAILURE = 'FETCH_CONTRACTS_FAILURE';

export const HANDLE_CONTRACT_ACTION_MENU = 'HANDLE_CONTRACT_ACTION_MENU';
export const FETCH_CONTRACTS_LOAD_REQUEST = 'FETCH_CONTRACTS_LOAD_REQUEST';
export const FETCH_CONTRACTS_LOAD_SUCCESS = 'FETCH_CONTRACTS_LOAD_SUCCESS';
export const FETCH_CONTRACTS_LOAD_FAILURE = 'FETCH_CONTRACTS_LOAD_FAILURE';

// export const HANDLE_CONTRACT_ACTION_MENU='HANDLE_CONTRACT_ACTION_MENU';
//upload MSA
export const STORE_UPLOAD_MSA_DATA = 'STORE_UPLOAD_MSA_DATA';
//contract MSA to WO steps
export const CONTRACTSTEP = 'CONTRACTSTEP';

export const fetchContractsRequest = (currentPage, rows) => ({
    type: FETCH_CONTRACTS_REQUEST,
    payload: { currentPage, rows },
});

export const fetchContractsSuccess = (contracts) => ({
    type: FETCH_CONTRACTS_SUCCESS,
    payload: contracts,
});

export const fetchContractsFailure = (error) => ({
    type: FETCH_CONTRACTS_FAILURE,
    payload: error,
});

export const handlecontractActionMenu = (mode) => ({
    type: HANDLE_CONTRACT_ACTION_MENU,
    payload: mode,
});

//upload MSA
export const storeUploadMsaData = (data) => ({
    type: STORE_UPLOAD_MSA_DATA,
    payload: data,
});
export const constractSteps = (step) => ({
    type: CONTRACTSTEP,
    payload: step,
});

// dynamic field Data
export const ADD_DYNAMIC_DATA = 'ADD_DYNAMIC_DATA';

export const addDynamicData = (data) => ({
    type: ADD_DYNAMIC_DATA,
    payload: data,
});

// create Contract

export const CREATE_CONTRACT_REQUEST = 'CREATE_CONTRACT_REQUEST';
export const CREATE_CONTRACT_SUCCESS = 'CREATE_CONTRACT_SUCCESS';
export const CREATE_CONTRACT_ERROR = 'CREATE_CONTRACT_ERROR';
export const FETCH_COMPANY_ACTIVE_REQUEST = 'FETCH_COMPANY_ACTIVE_REQUEST';
export const FETCH_COMPANY_ACTIVE_SUCCESS = 'FETCH_COMPANY_ACTIVE_SUCCESS';
export const FETCH_COMPANY_ACTIVE_ERROR = 'FETCH_COMPANY_ACTIVE_ERROR';

export const createContractRequest = (data1) => ({
    type: CREATE_CONTRACT_REQUEST,
    payload: data1,
});

export const createContractSuccess = () => ({
    type: CREATE_CONTRACT_SUCCESS,
});

export const createContractError = (err) => ({
    type: CREATE_CONTRACT_ERROR,
    payload: err,
});

export const fetchCompaniesActive = () => ({
    type: FETCH_COMPANY_ACTIVE_REQUEST,
});

export const fetchCompaniesActiveSuccess = (data) => ({
    type: FETCH_COMPANY_ACTIVE_SUCCESS,
    payload: data,
});

export const fetchCompaniesActiveError = (err) => ({
    type: FETCH_COMPANY_ACTIVE_ERROR,
    payload: err,
});
//     payload: data
// });

export const fetchContractsLoadRequest = () => ({
  type: FETCH_CONTRACTS_LOAD_REQUEST,
})

export const fetchContractsLoadSuccess = (contractSummary) => ({
  type: FETCH_CONTRACTS_LOAD_SUCCESS,
  payload: contractSummary
})

export const fetchContractsLoadFailure = (error) => ({
  type: FETCH_CONTRACTS_LOAD_FAILURE,
  payload: error
})
//getById
export const FETCH_CONTRACT_REQUEST = 'FETCH_CONTRACT_REQUEST';
export const FETCH_CONTRACT_SUCCESS = 'FETCH_CONTRACT_SUCCESS';
export const FETCH_CONTRACT_FAILURE = 'FETCH_CONTRACT_FAILURE';

export const contractSummaryRequest = (contractSummaryID) => ({
    type: FETCH_CONTRACT_REQUEST,
    payload: contractSummaryID,
});

export const contractSummarySuccess = (contractSummary) => ({
    type: FETCH_CONTRACT_SUCCESS,
    payload: contractSummary,
});

export const contractSummaryFailure = (error) => ({
    type: FETCH_CONTRACT_FAILURE,
    payload: error,
});
