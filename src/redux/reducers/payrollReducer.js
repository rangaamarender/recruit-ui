import { FETCH_PAYROLL_REQUEST, FETCH_PAYROLL_SUCCESS, FETCH_PAYROLL_FAILURE } from "../actions/payrollActions";

const initialState = {
    payrolls: [],
    loading: false,
    error: null,
};

const payrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAYROLL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PAYROLL_SUCCESS:
            return { ...state, loading: false, payroll: action.payload };
        case FETCH_PAYROLL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default payrollReducer;