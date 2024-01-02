import TimeSheetViewTab from "../container/viewTabSteps/TimeSheetViewTab";
import TimesheetEdit from "../container/viewTabSteps/TimesheetEdit";

const handleTimesheetActions = (action, rowData) => {
    switch (action) {
        case 'viewTimesheet':
            // Implement view action logic
            console.log('Viewing:',);
            return <TimeSheetViewTab rowData={rowData}  />
        case 'editTimesheet':
            // Implement edit action logic
            console.log('Editing:');
            return <TimesheetEdit/>
        case 'delete':
            // Implement delete action logic
            console.log('Deleting:');
            break;
        default:
            break;
    }
};

export default handleTimesheetActions;

