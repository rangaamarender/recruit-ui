import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, fetchUserSuccess, fetchUserFailure } from '../actions/userActions';
import { getUserData } from '../services/api'; // Example API function

function* fetchUser() {
  try {
    const user = yield call(getUserData);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

function* userSaga() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUser);
}

export default userSaga;
