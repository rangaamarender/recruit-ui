import React, { useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import expenseActionMenu from '../config/expenseActionMenu';
import expenseSelectedColumns from '../config/expenseSelectedColumns';
import HeaderViewerWithTabs from '../../../../components/viewers/HeaderViewerWithTabs';
import { expenseData } from '../config/expenseData';
import expenseHeaderViewerOptions from '../config/expenseHeaderViewerOptions';
import handleExpenseActions from '../config/handleExpenseActions';
import ExpenseViewTab from '../container/ExpenseViewTab';
import ViewerWithoutTabs from '../../../../components/viewers/ViewerWithoutTabs';

const PendingExpensesListTab = ({ columnConfig, handleFilterClick }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    console.log("timesheet", selectedRowData)
    console.log("timesheet", sidebarVisible)
    const [first,setFirst] = useState(0);
    const [last,setLast] = useState(10);
    const total = expenseData.length;
    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
        setSidebarVisible(true);
    };

    const handleRowUnselect = () => {
        setSelectedRowData(null);
        setSidebarVisible(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const onCustomPage= (event) => {
        setFirst(event.first); 
        setLast(event.last);
        // setCurrentPage(event.page);
    }

const pendingExpenses = [
    {
        title:"Title Name1",
        contract:'Contract Name1',
        date:'10/02/2023',
        amount:"$405.00",
        status:'Pending'
    },
    {
        title:"Title Name2",
        contract:'Contract Name2',
        date:'13/02/2023',
        amount:"$403.00",
        status:'Pending'
    }
]
   


    return (
        <>
            <ViewerWithoutTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                header={
                    <HeaderViewerWithTabs
                        name={selectedRowData?.data.contract}
                        employeeType={""}
                        tags={selectedRowData?.data.status}
                        showTag={true}
                        // buttons={timesheetHeaderViewerBtn}
                        options={expenseHeaderViewerOptions}
                        buttonFlag={false}
                    />
                }
                contentComponent={<ExpenseViewTab rowData={selectedRowData} />}
            />
            
            <CustomDataTable
                data={pendingExpenses}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={expenseActionMenu}
                columnsConfig={columnConfig}
                selectedColumns={expenseSelectedColumns}
                handleAction={handleExpenseActions}
                handleFilterClick={handleFilterClick}
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

export default PendingExpensesListTab;
