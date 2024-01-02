
// import ExpensesStep from "../container/ExpensesStep";
// import HoursStep from "../container/HoursStep";
// import TimesheetStep from "../container/TimesheetStep";

import ExpensesStep from "../container/wizardFormSteps/ExpensesStep";
import HoursStep from "../container/wizardFormSteps/HoursStep";
import TimesheetStep from "../container/wizardFormSteps/TimesheetStep";


const addTimesheetSteps = [
  {
    name: 'Timesheet',
    component: TimesheetStep,
    nextStep: 'Hours'
  },
  {
    name: 'Hours',
    component: HoursStep,
    nextStep: ''
  },
  {
    name: 'Expenses',
    component: ExpensesStep,
    nextStep: '',
  }
];

export default addTimesheetSteps