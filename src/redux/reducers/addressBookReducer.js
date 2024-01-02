import {
    FETCH_ADDRESSBOOK_FAILURE,
    FETCH_ADDRESSBOOK_SUCCESS,
    FETCH_ADDRESSBOOK_REQUEST,
} from '../actions/addressBookAction';

const initialState = {
    addressBooks: [],
    loading: false,
    error: null,
};

const addressBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDRESSBOOK_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADDRESSBOOK_SUCCESS:
            return { ...state, loading: false, addressBooks: action.payload };
        case FETCH_ADDRESSBOOK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default addressBookReducer;
