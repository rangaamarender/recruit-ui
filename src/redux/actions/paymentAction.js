export const FETCH_PAYMENT_REQUEST = 'FETCH_PAYMENT_REQUEST';
export const FETCH_PAYMENT_SUCCESS = 'FETCH_PAYMENT_SUCCESS';
export const FETCH_PAYMENT_FAILURE = 'FETCH_PAYMENT_FAILURE';

export const CREATE_PAYMENT_REQUEST = 'CREATE_PAYMENT_REQUEST'
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS'
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE'

export const fetchPaymentRequest = (paymentData) => ({
    type: FETCH_PAYMENT_REQUEST,
    payload: paymentData
});

export const fetchPaymentSuccess = (payment) => ({
    type: FETCH_PAYMENT_SUCCESS,
    payload: payment,
});
export const fetchPaymentFailure = (error) => ({
    type: FETCH_PAYMENT_FAILURE,
    payload: error,
});

export const createPaymentRequest = (formData) => ({
    type: CREATE_PAYMENT_REQUEST,
    payload: formData 
});

export const createPaymentSuccess = (formData) => ({
    type: CREATE_PAYMENT_SUCCESS,
    payload: formData
})

export const createPaymentFailure = (error) => ({
    type: CREATE_PAYMENT_FAILURE,
    payload: error
})


