import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_PAYMENT_REQUEST,
    fetchPaymentSuccess,
    fetchPaymentFailure,
    CREATE_PAYMENT_REQUEST,
    createPaymentSuccess,
    createPaymentFailure,
} from '../actions/paymentAction';

function* fetchpayment(action) {
    try {
        const { payload: subscriptionID } = action;
        const response = yield call(
            axios.get,
            `http://20.42.92.222/submgt-0.0.1-SNAPSHOT/paymentMethods/${subscriptionID}`
        );
        console.log(response, 'responseAdminApi');
        yield put(fetchPaymentSuccess(response.data));
    } catch (error) {
        yield put(fetchPaymentFailure(error.message));
    }
}
function* createPayment(action) {
    const data = action.payload;
    try {
        const response = yield call(axios.post, 'http://20.42.92.222/submgt-0.0.1-SNAPSHOT/paymentMethod/1', data);
        console.log(response, 'responsepost');
        yield put(createPaymentSuccess(response));
        yield call(fetchpayment());
    } catch (error) {
        const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to create payment';
        yield put(createPaymentFailure(errorMessage));
    }
}

function* paymentSaga() {
    yield takeLatest(FETCH_PAYMENT_REQUEST, fetchpayment);
    yield takeLatest(CREATE_PAYMENT_REQUEST, createPayment);
}

export default paymentSaga;
