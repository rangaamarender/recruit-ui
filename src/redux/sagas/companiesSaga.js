// companiesSaga.jsx
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    CREATE_COMPANY_REQUEST,
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    PAGINATION_COMPANY_REQUEST,
    UPDATE_COMPANY_REQUEST,
    createCompanyFailure,
    createCompanySuccess,
    fetchCompaniesFailure,
    fetchCompaniesRequest,
    fetchCompaniesSuccess,
    fetchCompanyFailure,
    fetchCompanySuccess,
    paginationCompanyFailure,
    paginationCompanySuccess,
    paginationhCompanyRequest,
    updateCompanyFailure,
    updateCompanySuccess,
    FETCH_COUNTRIES_REQUEST,
    FETCH_TAX_CLASSIFICATIONS_REQUEST,
    setCountries,
    setTaxClassifications,
    CHECK_DOMAIN_REQUEST,
    checkDomainSuccess,
    checkDomainFailure,
} from '../actions/companiesActions';

function* fetchCompanies() {
    try {
        // const response = yield call(axios.get, 'http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=0&limit=100');
        const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=0&limit=100');
        yield put(fetchCompaniesSuccess(response.data.content));
    } catch (error) {
        yield put(fetchCompaniesFailure(error.message));
    }
}

function* fetchCompany(action) {
    try {
        const { payload: organizationID } = action;
        // const response = yield call(axios.get, `http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization/${organizationID}`);
        const response = yield call(axios.get, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization/${organizationID}`);
        yield put(fetchCompanySuccess(response.data));
    } catch (error) {
        yield put(fetchCompanyFailure(error.message));
    }
}

function* createCompany(action) {
    try {
        const { formData } = action.payload;
        // const response = yield call(axios.post, 'http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization', formData);
        const response = yield call(axios.post, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization', formData);
        if (response.status === 200) {
            yield put(createCompanySuccess());
            yield put(fetchCompaniesRequest());
            yield put(paginationhCompanyRequest());
        } else {
            // yield put(createCompanyFailure(response.statusText));
            const errorMessage = response.data?.lrapierror?.message || 'Failed to create company';
            yield put(createCompanyFailure(errorMessage));

        }
    } catch (error) {
        // yield put(createCompanyFailure(error.message));
        const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to create company';
        yield put(createCompanyFailure(errorMessage));
    }
}

function* updateCompany(action) {
    try {
        const { organizationID, data } = action.payload;
        // const response = yield call(axios.patch, `http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization/${organizationID}`, data);
        const response = yield call(axios.patch, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization/${organizationID}`, data);
        if (response.status === 200) {
            yield put(updateCompanySuccess(response.data));
            yield put(fetchCompaniesRequest());
        } else {
            const errorMessage = response.data?.lrapierror?.message || 'Failed to update company';
            yield put(updateCompanyFailure(errorMessage));
        }

    } catch (error) {
        const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to update company';
        yield put(updateCompanyFailure(errorMessage));
    }
}

function* paginationCompanies() {
    try {
        // const response = yield call(axios.get, 'http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=0&limit=100');
        const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=0&limit=100');
        yield put(paginationCompanySuccess(response.data));
    } catch (error) {
        yield put(paginationCompanyFailure(error.message));
    }
}

function* fetchCountries() {
    try {
        // const response = yield call(axios.get, 'http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/country');
        const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/country');
        console.log(response,"dataC");
        yield put(setCountries(response.data));
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

function* fetchTaxClassifications(action) {
    const { payload: countryCode } = action;
    try {
        // const response = yield call(axios.get, `http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/taxclassification?countryCode=${countryCode}`);
        const response = yield call(axios.get, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/taxclassification?countryCode=${countryCode}`);
        yield put(setTaxClassifications(response.data));
    } catch (error) {
        console.error('Error fetching tax classification data:', error);
    }
}

function* checkDomain(action) {
    try {
        const { payload: domain } = action;
        // const response = yield call(axios.get, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/organization/${domain}/mapped`);
        const response = yield call(axios.get,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/organization/domainmapped?domain=${domain}`
        );
        yield put(checkDomainSuccess(response.data));
    } catch (error) {
        yield put(checkDomainFailure(error.message));
    }
}

function* companiesSaga() {
    yield takeLatest(FETCH_COMPANIES_REQUEST, fetchCompanies);
    yield takeLatest(CREATE_COMPANY_REQUEST, createCompany);
    yield takeLatest(UPDATE_COMPANY_REQUEST, updateCompany);
    yield takeLatest(FETCH_COMPANY_REQUEST, fetchCompany);
    yield takeLatest(PAGINATION_COMPANY_REQUEST, paginationCompanies);
    yield takeLatest(FETCH_COUNTRIES_REQUEST, fetchCountries);
    yield takeLatest(FETCH_TAX_CLASSIFICATIONS_REQUEST, fetchTaxClassifications);
    yield takeLatest(CHECK_DOMAIN_REQUEST, checkDomain);
}

export default companiesSaga;
