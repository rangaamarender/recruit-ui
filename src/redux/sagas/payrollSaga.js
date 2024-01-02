import axios from "axios";
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPayrollSuccess, fetchPayrollFailure, FETCH_PAYROLL_REQUEST } from "../actions/payrollActions";

function* fetchPayroll() {
    try {
        console.log('******* Fetching the payroll data *********');
        const response = yield call(axios.get, 'http://localhost:8080/tenants');
        console.log(response.data, "add")
        yield put(fetchPayrollSuccess(response.data));
    } catch (error) {
        yield put(fetchPayrollFailure(error.message));
    }
}

function* payrollSaga() {
    yield takeLatest(FETCH_PAYROLL_REQUEST, fetchPayroll);
}

export default payrollSaga;