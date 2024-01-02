// actions.js
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const signupRequest = (data) => ({
  type: SIGNUP_REQUEST,
  payload: data,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
