import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER_REQUEST, registerFailure, registerSuccess } from '../actions/registerActions';

function* registerUser(action) {
    try {
        const { data } = action.payload;
        const response = yield call(axios.post, 'http://20.42.92.222/submgt-0.0.1-SNAPSHOT/api/v1/completeSignup', data);
        if (response.status === 200) {
            yield put(registerSuccess());
        }
    } catch (err) {
        yield put(registerFailure(err));
    }
}

function* registerSaga() {
    yield takeLatest(REGISTER_REQUEST, registerUser);
}
export default registerSaga;
