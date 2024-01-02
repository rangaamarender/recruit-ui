import {
    FETCH_TIMESHEETS_REQUEST,
    FETCH_TIMESHEETS_SUCCESS,
    FETCH_TIMESHEETS_FAILURE,

    FETCH_TIMESHEET_REQUEST,
    FETCH_TIMESHEET_SUCCESS,
    FETCH_TIMESHEET_FAILURE,

    CREATE_TIMESHEET_REQUEST,
    CREATE_TIMESHEET_SUCCESS,
    CREATE_TIMESHEET_FAILURE,

    HOURS_STEP_VALIDATION_FUNCTION,
    STORE_EXPENCE_DATA,
    STORE_TIMESHEET_DOC,
} from '../actions/timesheetActions';

const initialState = {
    timesheets: [],
    selectedTimesheet: {},
    expenceData: [],
    timesheetDocData: [],
    loading: false,
    error: null,
    hoursStepValidationFunction: function () { }, // Add validationFunction to your initial state
};

const timesheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TIMESHEETS_REQUEST:
        case FETCH_TIMESHEET_REQUEST:
        case CREATE_TIMESHEET_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TIMESHEETS_SUCCESS:
            return { ...state, loading: false, timesheets: action.payload };
        case FETCH_TIMESHEET_SUCCESS:
            return { ...state, loading: false, selectedTimesheet: action.payload };
        case CREATE_TIMESHEET_SUCCESS:
            return { ...state, loading: false, selectedTimesheet: action.payload };
        case FETCH_TIMESHEETS_FAILURE:
        case FETCH_TIMESHEET_FAILURE:
        case CREATE_TIMESHEET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case HOURS_STEP_VALIDATION_FUNCTION:
            return { ...state, hoursStepValidationFunction: action.payload };
        case STORE_EXPENCE_DATA:
            return { ...state, expenceData: action.payload };
        case STORE_TIMESHEET_DOC:
            return { ...state, timesheetDocData: action.payload };

        default:
            return state;
    }
};

export default timesheetReducer;
