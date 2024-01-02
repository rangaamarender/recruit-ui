export const FETCH_WORKER_TYPES_REQUEST = 'FETCH_WORKER_TYPES_REQUEST';
export const FETCH_WORKER_TYPES_SUCCESS = 'FETCH_WORKER_TYPES_SUCCESS';
export const FETCH_WORKER_TYPES_FAILURE = 'FETCH_WORKER_TYPES_FAILURE';

export const FETCH_ADDRESS_TYPE_REQUEST = 'FETCH_ADDRESS_TYPE_REQUEST';
export const FETCH_ADDRESS_TYPE_SUCCESS = 'FETCH_ADDRESS_TYPE_SUCCESS';
export const FETCH_ADDRESS_TYPE_FAILURE = 'FETCH_ADDRESS_TYPE_FAILURE';

export const FETCH_ADMINROLE_REQUEST = 'FETCH_ADMINROLE_REQUEST';
export const FETCH_ADMINROLE_SUCCESS = 'FETCH_ADMINROLE_SUCCESS';
export const FETCH_ADMINROLE_FAILURE = 'FETCH_ADMINROLE_FAILURE';

export const ADD_WORKER_TYPE_REQUEST = 'ADD_WORKER_TYPE_REQUEST';
export const ADD_WORKER_TYPE_SUCCESS = 'ADD_WORKER_TYPE_SUCCESS';
export const ADD_WORKER_TYPE_FAILURE = 'ADD_WORKER_TYPE_FAILURE';

export const FETCH_JOB_REQUEST = 'FETCH_JOB_REQUEST';
export const FETCH_JOB_SUCCESS = 'FETCH_JOB_SUCCESS';
export const FETCH_JOB_FAILURE = 'FETCH_JOB_FAILURE';

export const FETCH_WORKER_ATTRIBUTE_REQUEST = 'FETCH_WORKER_ATTRIBUTE_REQUEST';
export const FETCH_WORKER_ATTRIBUTE_SUCCESS = 'FETCH_WORKER_ATTRIBUTE_SUCCESS';
export const FETCH_WORKER_ATTRIBUTE_FAILURE = 'FETCH_WORKER_ATTRIBUTE_FAILURE';
export const PATCH_WORKER_TYPE_REQUEST = 'PATCH_WORKER_TYPE_REQUEST';
export const PATCH_WORKER_TYPE_SUCCESS = 'PATCH_WORKER_TYPE_SUCCESS';
export const PATCH_WORKER_TYPE_FAILURE = 'PATCH_WORKER_TYPE_FAILURE';

//Resource Status1
export const RESOURCE_STATUS_REQUEST = 'RESOURCE_STATUS_REQUEST';
export const RESOURCE_STATUS_SUCCESS = 'RESOURCE_STATUS_SUCCESS';
export const RESOURCE_STATUS_FAILURE = 'RESOURCE_STATUS_FAILURE';
export const FETCH_RESOURCE_STATUS = 'FETCH_RESOURCE_STATUS';
//Resource Status2
export const RESOURCE_STATUS_REQUEST1 = 'RESOURCE_STATUS_REQUEST1';
export const RESOURCE_STATUS_SUCCESS1 = 'RESOURCE_STATUS_SUCCESS1';
export const RESOURCE_STATUS_FAILURE1 = 'RESOURCE_STATUS_FAILURE1';
export const FETCH_RESOURCE_STATUS1 = 'FETCH_RESOURCE_STATUS1';

//Resource Department
export const CREATE_DEPARTMENT_REQUEST = 'CREATE_DEPARTMENT_REQUEST'
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS'
export const CREATE_DEPARTMENT_FAILURE = 'CREATE_DEPARTMENT_FAILURE'

export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE';

export const FETCH_DEPARTMENTID_REQUEST = 'FETCH_DEPARTMENTID_REQUEST';
export const FETCH_DEPARTMENTID_SUCCESS = 'FETCH_DEPARTMENTID_SUCCESS';
export const FETCH_DEPARTMENTID_FAILURE = 'FETCH_DEPARTMENTID_FAILURE';

export const UPDATE_DEPARTMENT_REQUEST = 'UPDATE_DEPARTMENT_REQUEST';
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS';
export const UPDATE_DEPARTMENT_FAILURE = 'UPDATE_DEPARTMENT_FAILURE';

export const fetchAdminRoleRequest = () => ({
    type: FETCH_ADMINROLE_REQUEST,
});

export const fetchAdminRoleSuccess = (role) => ({
    type: FETCH_ADMINROLE_SUCCESS,
    payload: role,
});

export const fetchAdminRoleFailure = (error) => ({
    type: FETCH_ADMINROLE_FAILURE,
    payload: error,
});

export const addWorkerTypeRequest = (workerType) => ({
    type: ADD_WORKER_TYPE_REQUEST,
    workerType,
});

export const addWorkerTypeSuccess = (response) => ({
    type: ADD_WORKER_TYPE_SUCCESS,
    response,
});

export const addWorkerTypeFailure = (error) => ({
    type: ADD_WORKER_TYPE_FAILURE,
    error,
});

export const fetchWorkerTypesRequest = () => ({
    type: FETCH_WORKER_TYPES_REQUEST,
});

export const fetchWorkerTypesSuccess = (workerTypes) => ({
    type: FETCH_WORKER_TYPES_SUCCESS,
    payload: workerTypes,
});

export const fetchWorkerTypesFailure = (error) => ({
    type: FETCH_WORKER_TYPES_FAILURE,
    payload: error,
});

export const fetchAddressTypeRequest = () => ({
    type: FETCH_ADDRESS_TYPE_REQUEST,
});

export const fetchAddressTypeSuccess = (addressType) => ({
    type: FETCH_ADDRESS_TYPE_SUCCESS,
    payload: addressType,
});

export const fetchAddressTypeFailure = (error) => ({
    type: FETCH_ADDRESS_TYPE_FAILURE,
    payload: error,
});

export const FETCH_DOCUMENTS_REQUEST = 'FETCH_DOCUMENTS_REQUEST';
export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_FAILURE = 'FETCH_DOCUMENTS_FAILURE';

export const fetchDocumentsRequest = () => ({
    type: FETCH_DOCUMENTS_REQUEST,
});

export const fetchDocumentsSuccess = (documentsList) => ({
    type: FETCH_DOCUMENTS_SUCCESS,
    payload: documentsList,
});

export const fetchDocumentsFailure = (error) => ({
    type: FETCH_DOCUMENTS_FAILURE,
    payload: error,
});

export const fetchJobRequest = (isBillable) => ({
    type: FETCH_JOB_REQUEST,
    payload: { isBillable }
})

export const fetchJobSuccess = (job) => ({
    type: FETCH_JOB_SUCCESS,
    payload: job,
});

export const fetchJobFailure = (error) => ({
    type: FETCH_JOB_FAILURE,
    payload: error
})

export const fetchWorkerAttributeRequest = () => ({
    type: FETCH_WORKER_ATTRIBUTE_REQUEST
})
export const fetchWorkerAttributeSuccess = (data) => ({
    type: FETCH_WORKER_ATTRIBUTE_SUCCESS,
    payload: data,
})
export const fetchWorkerAttributeFailure = (error) => ({
    type: FETCH_WORKER_ATTRIBUTE_FAILURE,
    payload: error,
})

//admin Documents
export const CREATE_LOAD_DOCUMENTS_DATA = 'CREATE_LOAD_DOCUMENTS_DATA';
export const CREATE_SUCCESS_DOCUMENTS_DATA = 'CREATE_SUCCESS_DOCUMENTS_DATA';
export const CREATE_ERROR_DOCUMENTS_DATA = 'CREATE_ERROR_DOCUMENTS_DATA';

export const createDocumentData = (document) => ({
    type: CREATE_LOAD_DOCUMENTS_DATA,
    payload: document,
});
export const createSuccessDocumentData = (document) => ({
    type: CREATE_SUCCESS_DOCUMENTS_DATA,
    payload: document,
});
export const createErrorDocumentData = (error) => ({
    type: CREATE_ERROR_DOCUMENTS_DATA,
    payload: error,
});

// document getById
export const FETCH_DOCUMENT_REQUEST = 'FETCH_DOCUMENT_REQUEST';
export const FETCH_DOCUMENT_SUCCESS = 'FETCH_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENT_FAILURE = 'FETCH_DOCUMENT_FAILURE';

export const fetchDocumentRequest = (documentID) => ({
    type: FETCH_DOCUMENT_REQUEST,
    payload: documentID,
});

export const fetchDocumentSuccess = (document) => ({
    type: FETCH_DOCUMENT_SUCCESS,
    payload: document,
});

export const fetchDocumentFailure = (error) => ({
    type: FETCH_DOCUMENT_FAILURE,
    payload: error,
});

// document update
export const UPDATE_DOCUMENT_REQUEST = 'UPDATE_DOCUMENT_REQUEST';
export const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
export const UPDATE_DOCUMENT_FAILURE = 'UPDATE_DOCUMENT_FAILURE';

export const updateDocumentRequest = (documentID, data) => ({
    type: UPDATE_DOCUMENT_REQUEST,
    payload: { documentID, data },
});

export const updateDocumentSuccess = (document) => ({
    type: UPDATE_DOCUMENT_SUCCESS,
    payload: document,
});

export const updateDocumentFailure = (error) => ({
    type: UPDATE_DOCUMENT_FAILURE,
    payload: error,
});
//   type: FETCH_JOB_FAILURE,
//   payload: error
// })

export const patchWorkerTypeRequest = (workerTypeCode, payload) => ({
  type: PATCH_WORKER_TYPE_REQUEST,
  workerTypeCode,
  payload
});

export const patchWorkerTypeSuccess = (data) => ({
  type: PATCH_WORKER_TYPE_SUCCESS,
  payload: data,
});

export const patchWorkerTypeFailure = (error) => ({
  type: PATCH_WORKER_TYPE_FAILURE,
  payload:error,
});

//Resource Status
export const ResourceStatusRequest = (data) => ({
  type: RESOURCE_STATUS_REQUEST,
  payload:data
});
export const ResourceStatusSuccess = (status) => ({
  type: RESOURCE_STATUS_SUCCESS,
  payload:status
});
export const ResourceStatusError = (err) => ({
  type: RESOURCE_STATUS_FAILURE,
  payload:err
});

export const fetchResourceStatus = (value) => ({
  type: FETCH_RESOURCE_STATUS,
  payload:value
});

//Resource Status2
export const ResourceStatusRequest1 = (data) => ({
  type: RESOURCE_STATUS_REQUEST1,
  payload:data
});
export const ResourceStatusSuccess1 = (status1) => ({
  type: RESOURCE_STATUS_SUCCESS1,
  payload:status1
});
export const ResourceStatusError1 = (err) => ({
  type: RESOURCE_STATUS_FAILURE1,
  payload:err
});

export const fetchResourceStatus1 = (value1) => ({
  type: FETCH_RESOURCE_STATUS1,
  payload:value1
});

//Resource Department
export const fetchDepartmentRequest = () => ({
  type: FETCH_DEPARTMENT_REQUEST,
});

export const fetchDepartmentSuccess = (department) => ({
  type: FETCH_DEPARTMENT_SUCCESS,
  payload: department,
});

export const fetchDepartmentFailure = (error) => ({
  type: FETCH_DEPARTMENT_FAILURE,
  payload: error,
});

export const fetchDepartmentIdRequest = (departmentID) => ({
  type: FETCH_DEPARTMENTID_REQUEST,
  payload: departmentID,
});

export const fetchDepartmentIdSuccess = (dept) => ({
  type: FETCH_DEPARTMENTID_SUCCESS,
  payload: dept,
});

export const fetchDepartmentIdFailure = (error) => ({
  type: FETCH_DEPARTMENTID_FAILURE,
  payload: error,
});

export const createDepartmentRequest = (dataPost) => ({
  type: CREATE_DEPARTMENT_REQUEST,
  payload: dataPost
});

export const createDepartmentSuccess = (dataPost) => ({
  type: CREATE_DEPARTMENT_SUCCESS,
  payload:dataPost
})

export const createDepartmentFailure = (error) => ({
  type: CREATE_DEPARTMENT_FAILURE,
  payload: error
})

export const updateDepartmentRequest = (departmentID, data) => ({
  type: UPDATE_DEPARTMENT_REQUEST,
  payload: { departmentID, data },
});

export const updateDepartmentSuccess = (dept) => ({
  type: UPDATE_DEPARTMENT_SUCCESS,
  payload: dept,
});

export const updateDepartmentFailure = (error) => ({
  type: UPDATE_DEPARTMENT_FAILURE,
  payload: error,
});
// document delete
export const DELETE_DOCUMENT_REQUEST = 'DELETE_DOCUMENT_REQUEST';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';

export const deleteDocumentRequest = (documentID) => ({
    type: DELETE_DOCUMENT_REQUEST,
    payload: { documentID },
});

export const deleteDocumentSuccess = (document) => ({
    type: DELETE_DOCUMENT_SUCCESS,
    payload: document,
});

export const deleteDocumentFailure = (error) => ({
    type: DELETE_DOCUMENT_FAILURE,
    payload: error,
});


// timeSheet get all
export const FETCH_TIMESHEET_DOCUMENT_REQUEST = 'FETCH_TIMESHEET_DOCUMENT_REQUEST';
export const FETCH_TIMESHEET_DOCUMENT_SUCCESS = 'FETCH_TIMESHEET_DOCUMENT_SUCCESS';
export const FETCH_TIMESHEET_DOCUMENT_FAILURE = 'FETCH_TIMESHEET_DOCUMENT_FAILURE';

export const fetchTimeSheetDocumentRequest = () => ({
    type: FETCH_TIMESHEET_DOCUMENT_REQUEST,
});

export const fetchTimeSheetDocumentSuccess = (TimeSheetDocumentsList) => ({
    type: FETCH_TIMESHEET_DOCUMENT_SUCCESS,
    payload: TimeSheetDocumentsList,
});

export const fetchTimeSheetDocumentFailure = (error) => ({
    type: FETCH_TIMESHEET_DOCUMENT_FAILURE,
    payload: error,
});
//timeSheet Documents
export const CREATE_TIMESHEET_LOAD_DOCUMENTS = 'CREATE_TIMESHEET_LOAD_DOCUMENTS';
export const CREATE_TIMESHEET_SUCCESS_DOCUMENTS = 'CREATE_TIMESHEET_SUCCESS_DOCUMENTS';
export const CREATE_TIMESHEET_ERROR_DOCUMENTS = 'CREATE_TIMESHEET_ERROR_DOCUMENTS';

export const createTimeSheetData = (TimeSheetDocuments) => ({
    type: CREATE_TIMESHEET_LOAD_DOCUMENTS,
    payload: TimeSheetDocuments,
});
export const createSuccessTimeSheetData = (TimeSheetDocuments) => ({
    type: CREATE_TIMESHEET_SUCCESS_DOCUMENTS,
    payload: TimeSheetDocuments,
});
export const createErrorTimeSheetData = (error) => ({
    type: CREATE_TIMESHEET_ERROR_DOCUMENTS,
    payload: error,
});
// contract get all
export const FETCH_CONTRACT_DOCUMENT_REQUEST = 'FETCH_CONTRACT_DOCUMENT_REQUEST';
export const FETCH_CONTRACT_DOCUMENT_SUCCESS = 'FETCH_CONTRACT_DOCUMENT_SUCCESS';
export const FETCH_CONTRACT_DOCUMENT_FAILURE = 'FETCH_CONTRACT_DOCUMENT_FAILURE';

export const fetchContractsDocumentRequest = () => ({
    type: FETCH_CONTRACT_DOCUMENT_REQUEST,
});

export const fetchContractsDocumentSuccess = (contractDocumentsList) => ({
    type: FETCH_CONTRACT_DOCUMENT_SUCCESS,
    payload: contractDocumentsList,
});

export const fetchContractsDocumentFailure = (error) => ({
    type: FETCH_CONTRACT_DOCUMENT_FAILURE,
    payload: error,
});
//create contracts Documents
export const CREATE_CONTRACT_LOAD_DOCUMENTS = 'CREATE_CONTRACT_LOAD_DOCUMENTS';
export const CREATE_CONTRACT_SUCCESS_DOCUMENTS = 'CREATE_CONTRACT_SUCCESS_DOCUMENTS';
export const CREATE_CONTRACT_ERROR_DOCUMENTS = 'CREATE_CONTRACT_ERROR_DOCUMENTS';

export const createContractsData = (contractsDocuments) => ({
    type: CREATE_CONTRACT_LOAD_DOCUMENTS,
    payload: contractsDocuments,
});
export const createSuccessContractsData = (contractsDocuments) => ({
    type: CREATE_CONTRACT_SUCCESS_DOCUMENTS,
    payload: contractsDocuments,
});
export const createErrorContractsData = (error) => ({
    type: CREATE_CONTRACT_ERROR_DOCUMENTS,
    payload: error,
});
// contract Assign Document get all
export const FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST = 'FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST';
export const FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS = 'FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS';
export const FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE = 'FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE';

export const fetchContractsAssignDocumentRequest = () => ({
    type: FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST,
});

export const fetchContractsAssignDocumentSuccess = (contractAssignDocumentsList) => ({
    type: FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS,
    payload: contractAssignDocumentsList,
});

export const fetchContractsAssignDocumentFailure = (error) => ({
    type: FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE,
    payload: error,
});