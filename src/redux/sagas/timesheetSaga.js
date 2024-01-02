// tenantSaga.js
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchTimesheetsSuccess,
    fetchTimesheetsFailure,
    fetchTimesheetsRequest,
    FETCH_TIMESHEETS_REQUEST,
    CREATE_TIMESHEET_REQUEST,
    createTimesheetSuccess,
    
    createTimesheetFailure,
    fetchTimesheetFailure,
    fetchTimesheetSuccess,
    FETCH_TIMESHEET_REQUEST
} from '../actions/timesheetActions';

function* fetchTimesheets() {
    try {
        const response = yield call(axios.get, 'http://192.168.40.61:8080/api/raves/v1/timecard');
        console.log(response.data.content, "add")
        yield put(fetchTimesheetsSuccess(response.data.content));
    } catch (error) {
        yield put(fetchTimesheetsFailure(error.message));
    }
}


function* fetchTimesheet(action) {
    try {
        const { payload: timeCardID } = action;
        const response = yield call(axios.get, `http://192.168.40.61:8080/api/raves/v1/timecard/${timeCardID}`);
        yield put(fetchTimesheetSuccess(response.data));
    } catch (error) {
        yield put(fetchTimesheetFailure(error.message));
    }
}

function* createTimesheet(action) {
    try {
        const { formData } = action.payload;
        const response = yield call(axios.post, 'http://192.168.40.61:8080/api/raves/v1/timecard', formData);
        if (response.status === 200) {
            yield put(createTimesheetSuccess());
            yield put(fetchTimesheetsRequest());
        } else {
            yield put(createTimesheetFailure(response.statusText));
        }
    } catch (error) {
        yield put(createTimesheetFailure(error.message));
    }
}

function* timesheetSaga() {
    yield takeLatest(FETCH_TIMESHEETS_REQUEST, fetchTimesheets);
    yield takeLatest(FETCH_TIMESHEET_REQUEST, fetchTimesheet);
    yield takeLatest(CREATE_TIMESHEET_REQUEST, createTimesheet);
}

export default timesheetSaga;

