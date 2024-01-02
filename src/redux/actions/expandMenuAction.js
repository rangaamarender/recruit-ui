export const RESOURCE_SIDEBAR_VISIBLE = 'RESOURCE_SIDEBAR_VISIBLE';
export const COMPANY_SIDEBAR_VISIBLE = 'COMPANY_SIDEBAR_VISIBLE';
export const CONTRACT_SIDEBAR_VISIBLE = 'CONTRACT_SIDEBAR_VISIBLE';
export const TIMESHEET_SIDEBAR_VISIBLE = 'TIMESHEET_SIDEBAR_VISIBLE';

export const resourceSidebar = (action) => ({
    type: RESOURCE_SIDEBAR_VISIBLE,
    payload: action,
});
export const companySidebar = (action) => ({
    type: COMPANY_SIDEBAR_VISIBLE,
    payload: action,
});
export const contractSidebar = (action) => ({
    type: CONTRACT_SIDEBAR_VISIBLE,
    payload: action,
});
export const timesheetSidebar = (action) => ({
    type: TIMESHEET_SIDEBAR_VISIBLE,
    payload: action,
});
