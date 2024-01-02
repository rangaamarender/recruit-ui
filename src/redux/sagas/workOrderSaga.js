import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_ACTIVE_CONTRACTS_REQUEST,
    fetchActiveContractsError,
    fetchActiveContractsSuccess,
} from '../actions/workOrderActions';

function* fetchActiveContracts(action) {
    try {
        const response = yield call(axios.get, 'http://192.168.40.56:8081/api/raves/v1/activecontracts');
        console.log(response,'9000-active')
        yield put(fetchActiveContractsSuccess(response.data));
    } catch (error) {
        yield put(fetchActiveContractsError(error));
    }
}

function* workOrderSaga() {
    yield takeLatest(FETCH_ACTIVE_CONTRACTS_REQUEST, fetchActiveContracts);
}

export default workOrderSaga;
