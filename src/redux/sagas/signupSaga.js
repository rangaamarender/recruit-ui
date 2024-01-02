// SignupSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
 
import { SIGNUP_REQUEST, signupFailure, signupSuccess } from '../actions/signupActions';
import axios from 'axios';
 


function* signupFlow(action) {
  try {
    // const { user, personal, company } = action.payload;
    
    // const signupService = new signupService();

    // yield call(signupService.signupUser, user);
    // yield call(signupService.savePersonalDetails, personal);
    // yield call(signupService.saveCompanyDetails, company);
    
    const { data } = action.payload;
    const response = yield call(axios.post, 'http://20.42.92.222/submgt-0.0.1-SNAPSHOT/api/v1/signup', data);
    // const response = yield call(axios.post, 'http://192.168.40.95:8080/signup', data);

    if (response.status === 200) {
      yield put(signupSuccess());
    }
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function* signupSaga() {
  yield takeEvery(SIGNUP_REQUEST, signupFlow);
}

export default signupSaga;