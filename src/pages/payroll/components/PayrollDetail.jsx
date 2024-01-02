import React, { useState } from 'react';
import payrollDetailSelectedColumn from '../config/payrollDetailSelectedColumn';
import payrollDetailColumnConfig from '../config/payrollDetailColumnConfig';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import viewPayrollSummaryTabs from '../config/viewPayrollSummaryTabs';
import payrollSummaryHeaderViwerBtn from '../config/payrollSummaryHeaderViewerBtn';
import payrollSummaryHeaderVieweroptions from '../config/payrollSummaryHeaderVieweroptions';
import handlePayrollSummaryAction from '../config/handlePayrollSummaryAction';
import payrollSummaryActionMenu from '../config/payrollSummaryActionMenu';
import { Calendar } from 'primereact/calendar';
const PayrollDetail = ({ columnConfig, handleFilterClick, dataTableRef }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [dates, setDates] = useState(null);

    const payrollDetailsData = [
        {
            name: 'Abhishek Pulluri',
            workeType: 'FTE',
            hours: '120 hrs',
            bonus: '$123.00',
            grossPay: '$1123.00',
            deduction: '$23.00',
            netPay: '$2423.00',
            paymentType: '',
        },
        {
            name: 'Abhishek Pulluri',
            workeType: 'FTE',
            hours: '120 hrs',
            bonus: '$123.00',
            grossPay: '$1123.00',
            deduction: '$23.00',
            netPay: '$2423.00',
            paymentType: '',
        },
    ];
    const total = payrollDetailsData.length;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    const handleRowSelect = (event) => {
        setSidebarVisible(!sidebarVisible);
    };
    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
    };
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };
    return (
        <>
            <div className="p-3 flex gap-5">
                <div className="fs-6 flex mt-2 gap-1">
                    <div className="p-text-secondary">Pay Date : </div>
                    <div className="fw-bold"> May1, 2023</div>
                </div>
                <div className="fs-6 gap-1 d-flex align-items-center justify-content-center ">
                    <div className="p-text-secondary">Pay Period : </div>
                    <div>
                        <Calendar
                            value={dates}
                            onChange={(e) => setDates(e.value)}
                            showIcon 
                        />
                    </div>
                </div>
            </div>
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
                data={payrollDetailsData}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={payrollSummaryActionMenu}
                columnsConfig={payrollDetailColumnConfig}
                selectedColumns={payrollDetailSelectedColumn}
                handleAction={handlePayrollSummaryAction}
                // handleAction={(action, rowData) => handlePayrollSummaryAction(action, rowData, setSidebarVisible)}
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

export default PayrollDetail;
