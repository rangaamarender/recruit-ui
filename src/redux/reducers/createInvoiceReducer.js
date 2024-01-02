// createInvoiceReducer.js
import { HANDLE_ACTION } from '../actions/companiesActions';

const initialState = {
  createInvoice: [],
  action: '',
  loading: false,
  error: null,
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case HANDLE_ACTION:
      return { ...state, action: action.payload }
    default:
      return state;
  }
};

export default companiesReducer;