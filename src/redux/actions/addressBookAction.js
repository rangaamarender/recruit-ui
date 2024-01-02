// addressBook.js
export const FETCH_ADDRESSBOOK_REQUEST = 'FETCH_ADDRESSBOOK_REQUEST';
export const FETCH_ADDRESSBOOK_SUCCESS = 'FETCH_ADDRESSBOOK_SUCCESS';
export const FETCH_ADDRESSBOOK_FAILURE = 'FETCH_ADDRESSBOOK_FAILURE';

export const fetchAddressBookRequest = () => ({
    type: FETCH_ADDRESSBOOK_REQUEST,
});

export const fetchAddressBookSuccess = (addressBooks) => ({
    type: FETCH_ADDRESSBOOK_SUCCESS,
    payload: addressBooks,
});

export const fetchAddressBookFailure = (error) => ({
    type: FETCH_ADDRESSBOOK_FAILURE,
    payload: error,
});
