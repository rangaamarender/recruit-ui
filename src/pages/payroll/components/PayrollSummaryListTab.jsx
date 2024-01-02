import React, { useState, useEffect } from 'react';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import viewPayrollSummaryTabs from '../config/viewPayrollSummaryTabs';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import payrollSummaryActionMenu from '../config/payrollSummaryActionMenu';
import payrollSummaryColumnConfig from '../config/payrollSummaryColumnConfig';
import payrollSummarySelectedColumns from '../config/payrollSummarySelectedColumns';
import handlePayrollSummaryAction from '../config/handlePayrollSummaryAction';
import { payrollSummaryData } from '../config/payrollSummaryData';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import { useDispatch } from 'react-redux';
import { fetchPayrollRequest } from '../../../redux/actions/payrollActions';
import payrollSummaryHeaderViwerBtn from '../config/payrollSummaryHeaderViewerBtn';
import payrollSummaryHeaderVieweroptions from '../config/payrollSummaryHeaderVieweroptions';

const PayrollSummaryListTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {
    const dispatch = useDispatch();
    // const { payrolls, loading, error } = useSelector((state) => state.payroll)
    const total = payrollSummaryData.length;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    useEffect(() => {
        console.log('******** dispatching payroll Data *************');
        dispatch(fetchPayrollRequest());
    }, [dispatch]);

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const handleRowSelect = (event) => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    // if (error) {
    //   return <div>Error: {error}</div>;
    // }

    // if (payrolls && payrolls.length <= 0) {
    //   return <div>Error</div>;
    // }

    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };
    return (
        <>
            <ViewerWithTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={viewPayrollSummaryTabs}
                header={
                    <HeaderViewerWithTabs
                        name="Abhishek Pulluri"
                        buttons={payrollSummaryHeaderViwerBtn}
                        options={payrollSummaryHeaderVieweroptions}
                        buttonFlag={false}
                        onClick={toggleSidebar}
                    />
                }
            />
            <CustomDataTable
                data={payrollSummaryData}
                // data={payrolls}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={payrollSummaryActionMenu}
                columnsConfig={payrollSummaryColumnConfig}
                selectedColumns={payrollSummarySelectedColumns}
                // handleAction={handlePayrollSummaryAction}
                handleAction={(action, rowData) => handlePayrollSummaryAction(action, rowData, setSidebarVisible)}
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                rows={10}
                paginator
                first={first}
                last={last}
                totalRecords={total}
                currentPageReportTemplate={`{first} to {last} of ${total}`}
                onPage={onCustomPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </>
    );
};

export default PayrollSummaryListTab;
