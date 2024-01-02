// src/sagas/msgTemplateSaga.js
import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ADD_MSG_TEMPLATE_REQUEST, FETCH_MSG_TEMPLATES_REQUEST, SELECT_MSG_TEMPLATE, addMsgTemplateFailure, addMsgTemplateSuccess, fetchMsgTemplatesFailure, fetchMsgTemplatesSuccess, selectMsgTemplateFailure, selectMsgTemplateSuccess } from '../actions/msgTemplateActions';

function* fetchMsgTemplates() {
  try {
    const searchCriteira ={
      "offSet":0,
      "pageSize":25,
      "supplierId":69,
      "groupId":97
    };
    const response = yield call(axios.post, 'http://localhost:8080/v1/msgTemplates/retrieveBy',searchCriteira);
    yield put(fetchMsgTemplatesSuccess(response.data));
  } catch (error) {
    yield put(fetchMsgTemplatesFailure(error.message));
  }
}

function* addMsgTemplate(action) {
  try {
    yield call(axios.post, 'https://api.example.com/add-template', action.payload);
    yield put(addMsgTemplateSuccess());
    yield call(fetchMsgTemplates); // Refresh the template list after adding
  } catch (error) {
    yield put(addMsgTemplateFailure(error.message));
  }
}

function* selectMsgTemplate(action) {
  try {
    const encodedParam = encodeURIComponent(action.payload);
    const response = yield call(axios.post, `http://localhost:8080/v1/msgTemplates/retrieveMsgTemplate/${encodedParam}`); // Replace with your API endpoint
    yield put(selectMsgTemplateSuccess(response.data));
  } catch (error) {
    yield put(selectMsgTemplateFailure(error.message));
  }
}
 

function* msgTemplateSaga() {
  yield takeLatest(FETCH_MSG_TEMPLATES_REQUEST, fetchMsgTemplates);
  yield takeLatest(ADD_MSG_TEMPLATE_REQUEST, addMsgTemplate);
  yield takeEvery(SELECT_MSG_TEMPLATE, selectMsgTemplate);
}

export default msgTemplateSaga;
