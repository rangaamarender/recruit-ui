import {
  ADD_MSG_TEMPLATE_FAILURE,
  ADD_MSG_TEMPLATE_REQUEST,
  ADD_MSG_TEMPLATE_SUCCESS,
  FETCH_MSG_TEMPLATES_FAILURE,
  FETCH_MSG_TEMPLATES_REQUEST,
  FETCH_MSG_TEMPLATES_SUCCESS,
  SELECT_MSG_TEMPLATE,
  SELECT_MSG_TEMPLATE_FAILURE,
  SELECT_MSG_TEMPLATE_SUCCESS,
} from "../actions/msgTemplateActions";

// src/reducers/msgTemplateReducer.js
const initialState = {
  msgTemplates: [],
  selectedMsgTemplate: null,
  loading: false,
  error: null,
};

const msgTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MSG_TEMPLATES_REQUEST:
    case ADD_MSG_TEMPLATE_REQUEST:
      return { ...state, loading: true };
    case FETCH_MSG_TEMPLATES_SUCCESS:
      return { ...state, loading: false, msgTemplates: action.payload };
    case FETCH_MSG_TEMPLATES_FAILURE:
    case ADD_MSG_TEMPLATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_MSG_TEMPLATE_SUCCESS:
      return { ...state, loading: false };
    case SELECT_MSG_TEMPLATE:
      return {
        ...state,
        loading: true,
        selectedMsgTemplate: action.payload,
      };
    case SELECT_MSG_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedMsgTemplate: action.payload,
      };
    case SELECT_MSG_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default msgTemplateReducer;
