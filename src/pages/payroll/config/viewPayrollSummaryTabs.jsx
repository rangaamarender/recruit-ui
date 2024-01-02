import BankInfo from "../container/BankInfo";
import OverView from "../container/OverView";
import PayrollDocument from "../container/PayrollDocuments";
import TaxInfo from "../container/TaxInfo";
import History from "../container/History";

const viewPayrollSummaryTabs = [
    {
        id: 'overView',
        label: 'Overview',
        content: <OverView />
        
    },
    {
        id: 'taxInfo',
        label: 'Tax info',
        content: <TaxInfo />
    },
    {
        id: 'bankinginfo',
        label: 'Banking Information',
        content: <BankInfo />
    },
    {
        id: 'payrollDocument',
        label: 'Payroll Documents',
        content: <PayrollDocument />
    },
    {
        id: 'history',
        label: 'History',
        content: <History />
    },
];

export default viewPayrollSummaryTabs;
