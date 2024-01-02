import PayrollDetail from '../components/PayrollDetail';
import PayrollGenrationTab from '../components/PayrollGenrationTab';
import PayrollReports from '../components/PayrollReports';
import PayrollSummaryListTab from '../components/PayrollSummaryListTab';

const payrollTabs = ({ columnConfig, handleFilterClick, dataTableRef }) => [
    {
        id: 'payrollGenration',
        label: 'Payroll Genration',

        content: (
            <div>
                <PayrollGenrationTab />
            </div>
        ),
    },
    {
        id: 'payrollSummary',
        label: 'Payroll Summary',

        content: (
            <PayrollSummaryListTab
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
            />
        ),
    },
    {
        id: 'payrollDetail',
        label: 'Payroll Detail',

        content: (
            <div>
                <PayrollDetail
                    columnConfig={columnConfig}
                    handleFilterClick={handleFilterClick}
                    dataTableRef={dataTableRef}
                />
            </div>
        ),
    },
    {
        id: 'payrollReports',
        label: 'Payroll Reports',

        content: (
            <div>
                <PayrollReports />
            </div>
        ),
    },
];

export default payrollTabs;
