export const FETCH_PAYROLL_REQUEST = 'FETCH_PAYROLL_REQUEST';
export const FETCH_PAYROLL_SUCCESS = 'FETCH_PAYROLL_SUCCESS';
export const FETCH_PAYROLL_FAILURE = 'FETCH_PAYROLL_FAILURE';

export const fetchPayrollRequest = () => ({
    type: FETCH_PAYROLL_REQUEST,
});

export const fetchPayrollSuccess = (payroll) => ({
    type: FETCH_PAYROLL_SUCCESS,
    payload: payroll,
});

export const fetchPayrollFailure = (error) => ({
    type: FETCH_PAYROLL_FAILURE,
    payload: error,
});
