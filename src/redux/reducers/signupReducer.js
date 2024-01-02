// reducer.js

import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../actions/signupActions";

 
  
  const initialState = {
    step: 0, // Current step of the signup process
    loading: false, // Loading state while making API requests
    error: null, // Error message if signup fails
    success: false, // Flag indicating if signup was successful
  };
  
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          success: false,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      // Add more cases for other actions if needed
  
      default:
        return state;
    }
  };
  
  export default signupReducer;
  