// resourceActions.js
export const FETCH_RESOURCE_REQUEST = 'FETCH_RESOURCE_REQUEST';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE';

export const FETCH_RESOURCE_BY_ID_REQUEST = 'FETCH_RESOURCE_BY_ID_REQUEST';
export const FETCH_RESOURCE_BY_ID_SUCCESS = 'FETCH_RESOURCE_BY_ID_SUCCESS';
export const FETCH_RESOURCE_BY_ID_FAILURE = 'FETCH_RESOURCE_BY_ID_FAILURE';

export const CREATE_RESOURCE_REQUEST = 'CREATE_RESOURCE_REQUEST';
export const CREATE_RESOURCE_SUCCESS = 'CREATE_RESOURCE_SUCCESS';
export const CREATE_RESOURCE_FAILURE = 'CREATE_RESOURCE_FAILURE';

export const UPDATE_RESOURCE_REQUEST = 'UPDATE_RESOURCE_REQUEST';
export const UPDATE_RESOURCE_SUCCESS = 'UPDATE_RESOURCE_SUCCESS';
export const UPDATE_RESOURCE_FAILURE = 'UPDATE_RESOURCE_FAILURE';

export const RESOURCE_STORE = 'RESOURCE_STORE';

export const DELETE_DEPENDENT_REQUEST = 'DELETE_DEPENDENT_REQUEST';
export const DELETE_DEPENDENT_SUCCESS = 'DELETE_DEPENDENT_SUCCESS';
export const DELETE_DEPENDENT_FAILURE = 'DELETE_DEPENDENT_FAILURE';


export const PAGINATION_RESOURCE_REQUEST = 'PAGINATION_RESOURCE_REQUEST';
export const PAGINATION_RESOURCE_SUCCESS = 'PAGINATION_RESOURCE_SUCCESS';
export const PAGINATION_RESOURCE_FAILURE = 'PAGINATION_RESOURCE_FAILURE';

export const FETCH_RELATIONSHIP_REQUEST = 'FETCH_RELATIONSHIP_REQUEST';
export const FETCH_RELATIONSHIP_SUCCESS = 'FETCH_RELATIONSHIP_SUCCESS';
export const FETCH_RELATIONSHIP_FAILURE = 'FETCH_RELATIONSHIP_FAILURE';

export const fetchResourceRequest = () => ({
    type: FETCH_RESOURCE_REQUEST,
}); 

export const fetchResourceSuccess = (resources) => ({
    type: FETCH_RESOURCE_SUCCESS,
    payload: resources, 
});

export const fetchResourceFailure = (error) => ({
    type: FETCH_RESOURCE_FAILURE, 
    payload: error, 
});

export const fetchResourceByIdRequest = (workerID) => ({
    type: FETCH_RESOURCE_BY_ID_REQUEST,
    payload: workerID,
  });

  export const fetchResourceByIdSuccess = (resource) => ({
    type: FETCH_RESOURCE_BY_ID_SUCCESS,
    payload: resource,
  });

  export const fetchResourceByIdFailure = (error) => ({
    type: FETCH_RESOURCE_BY_ID_FAILURE,
    payload: error,
  });

export const createResourceRequest = (formData) => ({
    type: CREATE_RESOURCE_REQUEST,
    payload: formData,
});

export const createResourceSuccess = () => ({
    type: CREATE_RESOURCE_SUCCESS,
});

export const createResourceFailure = (error) => ({
    type: CREATE_RESOURCE_FAILURE,
    payload: error,
});

export const updateResourceRequest = (workerID, data) => ({
    type: UPDATE_RESOURCE_REQUEST,
    payload:  { workerID, data },
});

export const updateResourceSuccess = (resource) => ({
    type: UPDATE_RESOURCE_SUCCESS,
    payload: resource,
});

export const updateResourceFailure = (error) => ({
    type: UPDATE_RESOURCE_FAILURE,
    payload: error,
});

export const resourceStore = (data) =>({
    type:RESOURCE_STORE,
    payload:data
})

export const paginationhResourceRequest = () => ({
    type: PAGINATION_RESOURCE_REQUEST,
});

export const paginationResourceSuccess = (allResources) => ({
    type: PAGINATION_RESOURCE_SUCCESS,
    payload: allResources,
});

export const paginationResourceFailure = (error) => ({
    type: PAGINATION_RESOURCE_FAILURE,
    payload: error,
});

export const fetchRelationshipRequest = () => ({
    type: FETCH_RELATIONSHIP_REQUEST,
}); 

export const fetchRelationshipSuccess = (relationships) => ({
    type: FETCH_RELATIONSHIP_SUCCESS,
    payload: relationships, 
});

export const fetchRelationshipFailure = (error) => ({
    type: FETCH_RELATIONSHIP_FAILURE, 
    payload: error, 
});

export const deleteDependentRequest = (workerID, personDepId) => ({
    type: DELETE_DEPENDENT_REQUEST,
    payload: { workerID, personDepId },
});

export const deleteDependentSuccess = (personDepId) => ({
    type: DELETE_DEPENDENT_SUCCESS,
    payload: personDepId,
});

export const deleteDependentFailure = (error) => ({
    type: DELETE_DEPENDENT_FAILURE,
    payload: error,
});

