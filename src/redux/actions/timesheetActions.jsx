export const FETCH_TIMESHEETS_REQUEST = 'FETCH_TIMESHEETS_REQUEST';
export const FETCH_TIMESHEETS_SUCCESS = 'FETCH_TIMESHEETS_SUCCESS';
export const FETCH_TIMESHEETS_FAILURE = 'FETCH_TIMESHEETS_FAILURE';

export const CREATE_TIMESHEET_REQUEST = 'CREATE_TIMESHEET_REQUEST'
export const CREATE_TIMESHEET_SUCCESS = 'CREATE_TIMESHEET_SUCCESS'
export const CREATE_TIMESHEET_FAILURE = 'CREATE_TIMESHEET_FAILURE'

export const FETCH_TIMESHEET_REQUEST = 'FETCH_TIMESHEET_REQUEST';
export const FETCH_TIMESHEET_SUCCESS = 'FETCH_TIMESHEET_SUCCESS';
export const FETCH_TIMESHEET_FAILURE = 'FETCH_TIMESHEET_FAILURE';

export const HOURS_STEP_VALIDATION_FUNCTION = 'HOURS_STEP_VALIDATION_FUNCTION';
export const STORE_EXPENCE_DATA = 'STORE_EXPENCE_DATA';
export const STORE_TIMESHEET_DOC = 'STORE_TIMESHEET_DOC';


export const fetchTimesheetsRequest = () => ({
    type: FETCH_TIMESHEETS_REQUEST,
});

export const fetchTimesheetsSuccess = (timesheets) => ({
    type: FETCH_TIMESHEETS_SUCCESS,
    payload: timesheets,
});

export const fetchTimesheetsFailure = (error) => ({
    type: FETCH_TIMESHEETS_FAILURE,
    payload: error,
});


export const fetchTimesheetRequest = (timeCardID) => ({
    type: FETCH_TIMESHEET_REQUEST,
    payload: timeCardID,
});

export const fetchTimesheetSuccess = (timesheet) => ({
    type: FETCH_TIMESHEET_SUCCESS,
    payload: timesheet,
});

export const fetchTimesheetFailure = (error) => ({
    type: FETCH_TIMESHEET_FAILURE,
    payload: error,
});

export const createTimesheetRequest = (formData) => ({
    type: CREATE_TIMESHEET_REQUEST,
    payload: formData
});

export const createTimesheetSuccess = () => ({
    type: CREATE_TIMESHEET_SUCCESS,
})

export const createTimesheetFailure = (error) => ({
    type: CREATE_TIMESHEET_FAILURE,
    payload: error
})

export const hoursStepValidationFunction = (validationFunction) => ({
  type: HOURS_STEP_VALIDATION_FUNCTION,
  payload: validationFunction,
});

export const storeExpenceData = (data) =>({
   type: STORE_EXPENCE_DATA,
   payload:data
})

export const storeTimesheetDoc = (data) =>({
   type: STORE_TIMESHEET_DOC,
   payload:data
})


