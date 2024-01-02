// companiesReducer.js
import {
  CREATE_COMPANY_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,

  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,

  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,

  UPDATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,

  STORE_DOMAIN_DATA,
  STORE_DOMAIN,
  HANDLE_ACTION,

  PAGINATION_COMPANY_REQUEST,
  PAGINATION_COMPANY_SUCCESS,
  PAGINATION_COMPANY_FAILURE,

  FETCH_COUNTRIES_SUCCESS,
  FETCH_TAX_CLASSIFICATIONS_SUCCESS,
  CHECK_DOMAIN_SUCCESS,
  CHECK_DOMAIN_REQUEST,
  CHECK_DOMAIN_FAILURE,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FAILURE,

} from '../actions/companiesActions';

const initialState = {
  checkDomainData:[],
  domainAvailable: null, 
  countries: [],
  taxClassifications: [],
  companies: [],
  domainData: [],
  allCompanies: [],
  selectedCompany: {},
  domainIndex: '',
  action: '',
  loading: false,
  error: null,
  domainEmailValidation: function () { },

};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
    case FETCH_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
    case CREATE_COMPANY_REQUEST:
    case PAGINATION_COMPANY_REQUEST:
    case FETCH_COUNTRIES_REQUEST:
      return { ...state, loading: true, error: null };
    case PAGINATION_COMPANY_SUCCESS:
      return { ...state, loading: false, allCompanies: action.payload };
    case FETCH_COMPANIES_SUCCESS:
      return { ...state, loading: false, companies: action.payload };
    case FETCH_COMPANY_SUCCESS:
      return { ...state, loading: false, selectedCompany: action.payload };
    case UPDATE_COMPANY_SUCCESS:
    case CREATE_COMPANY_SUCCESS:
      return { ...state, loading: false, selectedCompany: action.payload };
    case FETCH_COMPANIES_FAILURE:
    case CREATE_COMPANY_FAILURE:
    case UPDATE_COMPANY_FAILURE:
    case FETCH_COMPANY_FAILURE:
    case PAGINATION_COMPANY_FAILURE:
    case FETCH_COUNTRIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case STORE_DOMAIN_DATA:
      return { ...state, domainData: action.payload };
    case STORE_DOMAIN:
      return { ...state, domainIndex: action.payload };
    case HANDLE_ACTION:
      return { ...state, action: action.payload }

    case FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload };

    case FETCH_TAX_CLASSIFICATIONS_SUCCESS:
      return { ...state, taxClassifications: action.payload };
      
    case CHECK_DOMAIN_REQUEST:
      return { ...state, loading: true, error: null, domainAvailable: null };

    case CHECK_DOMAIN_SUCCESS:
      return { ...state, loading: false, domainAvailable: action.payload, };

    case CHECK_DOMAIN_FAILURE:
      return { ...state, loading: false, error: action.payload, domainAvailable: null };

    default:
      return state;
  }
};

export default companiesReducer;