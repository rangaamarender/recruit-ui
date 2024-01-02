import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_COLOR_NAME,
    FETCH_LOGO_NAME,
    FETCH_TENANT_NAME,
    TENANT_COLOR_REQUEST,
    TENANT_LOGO_REQUEST,
    TENANT_NAME_REQUEST,
    TenantColorError,
    TenantColorSuccess,
    TenantLogoError,
    TenantLogoSuccess,
    TenantNameError,
    TenantNameSuccess,
} from '../actions/headerTitleActions';

function* companyName(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams',
            data
        );

        if (response.status === 200) {
            yield put(TenantNameSuccess(response.data.value));
        }
    } catch (error) {
        yield put(TenantNameError(error));
    }
}

function* fetchCompanyName(action) {
    try {
        // const { name } = action.payload;
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams/COMPANYNAME'
        );

        if (response.status === 200) {
            yield put(TenantNameSuccess(response.data.value));
        }
    } catch (error) {
        yield put(TenantNameError(error));
    }
}

function* companyLogo(action) {
    try {
        const { formData } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/tenant/logo',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        yield call(fetchCompanyLogo);
        yield put(TenantLogoSuccess(response.url));
        console.log(response, 'img');
    } catch (error) {
        yield put(TenantLogoError(error));
    }
}

function* fetchCompanyLogo(action) {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/tenant/logo',
            {
                responseType: 'arraybuffer',
            }
        );
        console.log(response, 'resonse');
        console.log(response.data, 'resonse33');

        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        yield put(TenantLogoSuccess({ imageUrl }));
    } catch (error) {
        yield put(TenantLogoError(error));
    }
}

//Tenant Color
function* CompanyColor(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams',
            data
        );

        if (response.status === 200) {
            yield put(TenantColorSuccess(response.data));
        }
    } catch (error) {
        yield put(TenantColorError(error));
    }
}

function* fetchCompanyColor() {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams/COMPANYCOLOR'
        );

        if (response.status === 200) {
            yield put(TenantColorSuccess(response.data.value));
        }
    } catch (error) {
        yield put(TenantColorError(error));
    }
}

function* headerTitleSaga() {
    yield takeLatest(TENANT_NAME_REQUEST, companyName);
    yield takeLatest(FETCH_TENANT_NAME, fetchCompanyName);
    yield takeLatest(TENANT_LOGO_REQUEST, companyLogo);
    yield takeLatest(FETCH_LOGO_NAME, fetchCompanyLogo);
    yield takeLatest(TENANT_COLOR_REQUEST, CompanyColor);
    yield takeLatest(FETCH_COLOR_NAME, fetchCompanyColor);
}

export default headerTitleSaga;
