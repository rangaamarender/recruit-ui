export const WORKER_ATTR_REQUEST = 'WORKER_ATTR_REQUEST';
export const WORKER_ATTR_SUCCESS = 'WORKER_ATTR_SUCCESS';
export const WORKER_ATTR_ERROR = 'WORKER_ATTR_ERROR';
export const Fetch_WORKER_ATTR = 'Fetch_WORKER_ATTR';
export const Fetch_WORKER_ATTR_SUCCESS = 'Fetch_WORKER_ATTR_SUCCESS';
export const Fetch_WORKER_ATTR_ERROR = 'Fetch_WORKER_ATTR_ERROR';
export const STATUS_WORKER_ATTR = 'STATUS_WORKER_ATTR';
export const UPDATE_WORKER_ATTR = 'UPDATE_WORKER_ATTR';

export const workerAttrRequest = (data) => ({
    type: WORKER_ATTR_REQUEST,
    payload: data,
});

export const workerAttrSuccess = () => ({
    type: WORKER_ATTR_SUCCESS,
});

export const workerAttrError = (err) => ({
    type: WORKER_ATTR_ERROR,
    payload: err,
});

export const fetchWorkerAttr = () => ({
    type: Fetch_WORKER_ATTR,
});

export const fetchWorkerAttrDefSuccess = (data) => ({
    type: Fetch_WORKER_ATTR_SUCCESS,
    payload: data,
});

export const fetchWorkerAttrError = (err) => ({
    type: Fetch_WORKER_ATTR_ERROR,
    payload: err,
});

export const statusWorkerAttr = (data1) => ({
    type: STATUS_WORKER_ATTR,
    payload: data1,
});

export const updateWorkerAttr = (data1) => ({
    type: UPDATE_WORKER_ATTR,
    payload: data1,
});

