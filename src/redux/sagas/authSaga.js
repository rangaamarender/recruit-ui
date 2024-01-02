// authSaga.js
import { put, takeLatest, call } from 'redux-saga/effects';

import { loginFailure, loginSuccess } from '../actions/authActions';
import { authApi } from '../../services/authService';

function* loginUser(action) {
    try {
        const { username, password } = action.payload;
        console.log(' Authenticating the user:' + username);
        const response = yield call(authApi.login, username, password); // Replace with your API call
        console.log(' response ' + response.ok);
        if (response.ok) {
            const token = response.data.token;
            console.log(' ------> Got the token :' + token + ' isAuthenticated--> ' + response.data.isAuthenticated);
            yield put(loginSuccess(response.data));
        } else {
            yield put(loginFailure('Authentication failed'));
        }
    } catch (error) {
        yield put(loginFailure('Network error -- please try after sometime.'));
    }
}

export function* watchLoginUser() {
    yield takeLatest('LOGIN_REQUEST', loginUser);
}
