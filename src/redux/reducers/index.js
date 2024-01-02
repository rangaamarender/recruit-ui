// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import msgTemplateReducer from './msgTemplateReducer';
import sidebarReducer from './sidebarReducer';
import signupReducer from './signupReducer';
import timesheetReducer from './timesheetReducer';
import contractReducer from './contractReducer';
import companiesReducer from './companiesReducer';
import headerTitleReducer from './headerTitleReducer';
import resourceReducer from './resourcesReducer';
import createInvoiceReducer from './createInvoiceReducer';
import payrollReducer from './payrollReducer';
import adminResourceRoleReducer from './adminResourceRoleReducer';
import expandMenuReducer from './expandMenuReducer';
import registerReducer from './registerReducer';
import paymentReducer from './paymentReducer';
import adminSettingsReducer from './adminSettingsReducers';
import workOrderReducer from './workOrderReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    msgTemplate: msgTemplateReducer,
    signup: signupReducer,
    sidebar: sidebarReducer,
    timesheet: timesheetReducer,
    contract: contractReducer,
    company: companiesReducer,
    headerTitle: headerTitleReducer,
    resource: resourceReducer,
    payroll: payrollReducer,
    adminRole: adminResourceRoleReducer,
    invoice: createInvoiceReducer,
    expandMenu: expandMenuReducer,
    register: registerReducer,
    payment: paymentReducer,
    adminSettings: adminSettingsReducer,
    workOrder: workOrderReducer,
    // Add other reducers here
});

export default rootReducer;
