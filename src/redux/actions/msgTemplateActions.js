// src/actions/msgTemplateActions.js
export const FETCH_MSG_TEMPLATES_REQUEST='FETCH_MSG_TEMPLATES_REQUEST';
export const FETCH_MSG_TEMPLATES_SUCCESS='FETCH_MSG_TEMPLATES_SUCCESS';
export const FETCH_MSG_TEMPLATES_FAILURE='FETCH_MSG_TEMPLATES_FAILURE';
export const ADD_MSG_TEMPLATE_REQUEST='ADD_MSG_TEMPLATE_REQUEST';
export const ADD_MSG_TEMPLATE_SUCCESS='ADD_MSG_TEMPLATE_SUCCESS';
export const ADD_MSG_TEMPLATE_FAILURE='ADD_MSG_TEMPLATE_FAILURE';

export const SELECT_MSG_TEMPLATE = 'SELECT_MSG_TEMPLATE';
export const SELECT_MSG_TEMPLATE_SUCCESS = 'SELECT_MSG_TEMPLATE_SUCCESS';
export const SELECT_MSG_TEMPLATE_FAILURE = 'SELECT_MSG_TEMPLATE_FAILURE';

export const fetchMsgTemplatesRequest = () => ({
    type: FETCH_MSG_TEMPLATES_REQUEST,
  });
  
  export const fetchMsgTemplatesSuccess = (msgTemplates) => ({
    type: FETCH_MSG_TEMPLATES_SUCCESS,
    payload: msgTemplates,
  });
  
  export const fetchMsgTemplatesFailure = (error) => ({
    type: FETCH_MSG_TEMPLATES_FAILURE,
    payload: error,
  });
  
  export const addMsgTemplateRequest = (msgTemplate) => ({
    type: ADD_MSG_TEMPLATE_REQUEST,
    payload: msgTemplate,
  });
  
  export const addMsgTemplateSuccess = () => ({
    type: ADD_MSG_TEMPLATE_SUCCESS,
  });
  
  export const addMsgTemplateFailure = (error) => ({
    type: ADD_MSG_TEMPLATE_FAILURE,
    payload: error,
  });
  
  export const selectMsgTemplate = (templateId) => ({
    type: SELECT_MSG_TEMPLATE,
    payload: templateId,
  });
  
  export const selectMsgTemplateSuccess = (template) => ({
    type: SELECT_MSG_TEMPLATE_SUCCESS,
    payload: template,
  });
  
  export const selectMsgTemplateFailure = (error) => ({
    type: SELECT_MSG_TEMPLATE_FAILURE,
    payload: error,
  });