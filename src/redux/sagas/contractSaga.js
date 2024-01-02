import { call, put, takeLatest } from 'redux-saga/effects';
import {
    CREATE_CONTRACT_REQUEST,
    FETCH_COMPANY_ACTIVE_REQUEST,
    FETCH_CONTRACTS_REQUEST,
    fetchCompaniesActiveError,
    fetchCompaniesActiveSuccess,
    fetchContractsFailure,
    fetchContractsSuccess,
} from '../actions/contractActions';
// import { contractsApi } from '../../services/contractService';
// import axios from 'axios';

// import { cal put,  takeLatest } from 'redux-saga/effects';
import { FETCH_CONTRACTS_LOAD_REQUEST, contractSummaryFailure, FETCH_CONTRACT_REQUEST, contractSummarySuccess, fetchContractsLoadFailure,  fetchContractsLoadSuccess } from '../actions/contractActions';
import { contractsApi } from '../../services/contractService';
import axios from 'axios';
import { getAPIUrl } from '../../utils/config';
function* fetchContracts(action) {
    try {
        const { currentPage, rows } = action.payload;
        const response = yield call(contractsApi, currentPage, rows);
        yield put(fetchContractsSuccess(response.data));
    } catch (error) {
        yield put(fetchContractsFailure(error.message));
    }
}
function* fetchContractsLoadAsync() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/v1/contract/summary');
        yield put(fetchContractsLoadSuccess(response));
    } catch (error) {
        yield put(fetchContractsLoadFailure(error.message));
    }
}
function* fetchContractSummary(action) {
    try {
        const { payload: contractID } = action;

        const response = yield call(
            axios.get,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${contractID}`
        );
        // console.log(response, 'dataApiPayLoad');
        yield put(contractSummarySuccess(response));
    } catch (error) {
        yield put(contractSummaryFailure(error.message));
    }
}

function* fetchCompanyActive(action) {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=0&limit=10&status=ACTIVE'
        );
        console.log(response.data.content, '9000');
        yield put(fetchCompaniesActiveSuccess(response.data.content));
    } catch (error) {
        yield put(fetchCompaniesActiveError(error.message));
    }
}

function* createContracts(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract',
            data1
        );
        // yield put(fetchContractsSuccess(response.data));
        console.log(response);
    } catch (error) {
        console.log(error.response,'9000-err')
        yield put(fetchContractsFailure(error.response.data.lrapierror.message));
    }
}

function* contractSaga() {
    yield takeLatest(FETCH_CONTRACTS_REQUEST, fetchContracts);
    yield takeLatest(FETCH_COMPANY_ACTIVE_REQUEST, fetchCompanyActive);
    yield takeLatest(CREATE_CONTRACT_REQUEST, createContracts);
    yield takeLatest(FETCH_CONTRACTS_LOAD_REQUEST, fetchContractsLoadAsync);
    yield takeLatest(FETCH_CONTRACT_REQUEST,fetchContractSummary);
}

export default contractSaga;
