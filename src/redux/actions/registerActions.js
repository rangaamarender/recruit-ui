export const REGISTER_REQUEST = 'REGISTER_RQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerRequest = (data) => ({
    type: REGISTER_REQUEST,
    payload: data,
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
});

export const registerFailure = (err) => ({
    type: REGISTER_FAILURE,
    payload: err,
});
