import {
    FETCH_PAYMENT_FAILURE,
  FETCH_PAYMENT_REQUEST,
  FETCH_PAYMENT_SUCCESS,

  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
} from '../actions/paymentAction';

const initialState = {
    payments: [],
    makePayment: {},
    loading: false,
    success: false,
    error: null,
  };

  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case  FETCH_PAYMENT_REQUEST:
        // case CREATE_PAYMENT_REQUEST:
        return { ...state, loading: true, error:null };
        case CREATE_PAYMENT_REQUEST:
          return { ...state, loading: true, makePayment:action.payload }
      case FETCH_PAYMENT_SUCCESS:
        return { ...state, loading: false, success: true, payments: action.payload };
        case CREATE_PAYMENT_SUCCESS:
          return { ...state, loading: true, error:null,makePayment:action.payload }
      case FETCH_PAYMENT_FAILURE:
        case CREATE_PAYMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default paymentReducer;