export const SET_CURRENT_PAGE_NAME = 'SET_CURRENT_PAGE_NAME';
export const SET_SELECTED_IMAGE = 'SET_SELECTED_IMAGE';
export const SET_SELECTED_TENANT_NAME = 'SET_SELECTED_TENANT_NAME';
export const SET_SELECTED_PROFILE_PICTURE = 'SET_SELECTED_PROFILE_PICTURE';
export const TENANT_NAME_REQUEST = 'TENANT_NAME_REQUEST';
export const TENANT_NAME_SUCCESS = 'TENANT_NAME_SUCCESS';
export const TENANT_NAME_ERROR = 'TENANT_NAME_ERROR';
export const FETCH_TENANT_NAME = 'FETCH_TENANT_NAME';

export const TENANT_LOGO_REQUEST = 'TENANT_LOGO_REQUEST';
export const TENANT_LOGO_SUCCESS = 'TENANT_LOGO_SUCCESS';
export const TENANT_LOGO_ERROR = 'TENANT_LOGO_ERROR';
export const FETCH_LOGO_NAME = 'FETCH_LOGO_NAME';

export const TENANT_COLOR_REQUEST = 'TENANT_COLOR_REQUEST';
export const TENANT_COLOR_SUCCESS = 'TENANT_COLOR_SUCCESS';
export const TENANT_COLOR_ERROR = 'TENANT_COLOR_ERROR';
export const FETCH_COLOR_NAME = 'FETCH_COLOR_NAME';



export const setCurrentPageName = (pageName) => ({
    type: SET_CURRENT_PAGE_NAME,
    payload: pageName,
  });


export const setSelectedImage = (image) => ({
  type: SET_SELECTED_IMAGE,
  payload: image,
});

export const TenantNameRequest = (data) => ({
  type: TENANT_NAME_REQUEST,
  payload:data
});
export const TenantNameSuccess = (name) => ({
  type: TENANT_NAME_SUCCESS,
  payload:name
});
export const TenantNameError = (err) => ({
  type: TENANT_NAME_ERROR,
  payload:err
});

export const fetchTenantName = (value) => ({
  type: FETCH_TENANT_NAME,
  payload:value
});

export const TenantLogoRequest = (imageUrl) => ({
  type: TENANT_LOGO_REQUEST,
  payload:imageUrl
});
export const TenantLogoSuccess = (data) => ({
  type: TENANT_LOGO_SUCCESS,
  payload:data
  
});
export const TenantLogoError = (err) => ({
  type: TENANT_LOGO_ERROR,
  payload:err
});

export const fetchLogoName = () => ({
  type: FETCH_LOGO_NAME,
});

export const setSelectedProfilePicture = (image) => ({
  type: SET_SELECTED_PROFILE_PICTURE,
  payload: image,
});

// Tenant Color
export const TenantColorRequest = (data) => ({
  type: TENANT_COLOR_REQUEST,
  payload:data
});
export const TenantColorSuccess = (color) => ({
  type: TENANT_COLOR_SUCCESS,
  payload:color
});
export const TenantColorError = (err) => ({
  type: TENANT_COLOR_ERROR,
  payload:err
});

export const fetchTenantColor = () => ({
  type: FETCH_COLOR_NAME,
});