import PayPeriodList from './PayPeriodList';
import PayrollSubmited from './PayrollSubmited';
import ReviewPayroll from './ReviewPayroll';
import TimeOffList from './TimeOffList';
import TotalDeductionList from './TotalDeductionList';
import TotalHoursList from './TotalHoursList';
import PayConfirmList from './PayConfirmList';

const RunPayrollParent = [
    {
        component: <PayPeriodList />,
        nextstep: 'Total Hours',
    },
    {
        component: <TotalHoursList />,
        nextstep: 'Total Deduction',
    },
    {
        component: <TotalDeductionList />,
        nextstep: 'Time Off',
    },
    {
        component: <TimeOffList />,
        nextstep: 'Pay Confirm',
    },
    {
        component: <PayConfirmList />,
        nextstep: 'Time Off',
    },
    {
        component: <ReviewPayroll />,
        nextstep: 'Payroll Submitted',
    },
    {
        component: <PayrollSubmited />,
        nextstep: 'Review Payroll',
    },
];

export default RunPayrollParent;
