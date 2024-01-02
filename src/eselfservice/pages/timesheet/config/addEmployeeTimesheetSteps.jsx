
import EmployeeExpensesStep from "../container/EmployeeExpensesStep";
import EmployeeHoursStep from "../container/EmployeeHoursStep";
import EmployeeTimesheetStep from "../container/EmployeeTimesheetStep";


const addEmployeeTimesheetSteps = [
  {
    name: 'Timesheet',
    component: EmployeeTimesheetStep,
    nextStep: 'Hours'
  },
  {
    name: 'Hours',
    component: EmployeeHoursStep,
    nextStep: ''
  },
  {
    name: 'Expenses',
    component: EmployeeExpensesStep,
    nextStep: '',
  }
];

export default addEmployeeTimesheetSteps