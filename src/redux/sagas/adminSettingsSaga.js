import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    Fetch_WORKER_ATTR,
    STATUS_WORKER_ATTR,
    UPDATE_WORKER_ATTR,
    WORKER_ATTR_REQUEST,
    fetchWorkerAttrDefSuccess,
    workerAttrError,
    workerAttrSuccess,
} from '../actions/adminSettingsAction';

function* workerAttr(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef',
            data
        );

        if (response.status === 200) {
            yield put(workerAttrSuccess(response.data.value));
        }
        yield call(getWorkerAttr);
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* getWorkerAttr(action) {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef'
        );
        yield put(fetchWorkerAttrDefSuccess(response.data));
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* setStatusWorkerAttr(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef/${data1.attrDefId}/${data1.status}`
        );
        console.log(response)
        yield call(getWorkerAttr);
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* updateWorkerAttr(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef/${data1.id}`,
            data1.data
        );
        console.log(response)
        yield call(getWorkerAttr);
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* adminSettingsSaga() {
    yield takeLatest(WORKER_ATTR_REQUEST, workerAttr);
    yield takeLatest(Fetch_WORKER_ATTR, getWorkerAttr);
    yield takeLatest(STATUS_WORKER_ATTR, setStatusWorkerAttr);
    yield takeLatest(UPDATE_WORKER_ATTR, updateWorkerAttr);
}

export default adminSettingsSaga;
