import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAddressBookFailure,
    fetchAddressBookSuccess,
    FETCH_ADDRESSBOOK_REQUEST,
} from '../actions/addressBookAction';

function* fetchAddressBook() {
    try {
        console.log('******* Fetching the data *********');

        const response = yield call(axios.get, 'https://dummyjson.com/users?limit=20');
        console.log(response.data.users);

        yield put(fetchAddressBookSuccess(response.data.users));
    } catch (error) {
        yield put(fetchAddressBookFailure(error.message));
    }
}

function* addressBookSaga() {
    yield takeLatest(FETCH_ADDRESSBOOK_REQUEST, fetchAddressBook);
}

export default addressBookSaga;
