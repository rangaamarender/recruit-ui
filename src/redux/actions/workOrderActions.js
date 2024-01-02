export const FETCH_ACTIVE_CONTRACTS_REQUEST = 'FETCH_ACTIVE_CONTRACTS_REQUEST';
export const FETCH_ACTIVE_CONTRACTS_SUCCESS = 'FETCH_ACTIVE_CONTRACTS_SUCCESS';
export const FETCH_ACTIVE_CONTRACTS_ERROR = 'FETCH_ACTIVE_CONTRACTS_ERROR';

export const fetchActiveContracts = () => ({
    type: FETCH_ACTIVE_CONTRACTS_REQUEST,
});

export const fetchActiveContractsSuccess = (data) => ({
    type: FETCH_ACTIVE_CONTRACTS_SUCCESS,
    payload: data,
});

export const fetchActiveContractsError = (err) => ({
    type: FETCH_ACTIVE_CONTRACTS_ERROR,
    payload: err,
});
