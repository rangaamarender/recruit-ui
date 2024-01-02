import React, { useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import employeeTimesheetActionMenu from '../config/employeeTimesheetActionMenu';
import employeeTimesheetSelectedColumns from '../config/employeeTimesheetSelectedColumns';
import handleEmployeeTimesheetActions from '../config/handleEmployeeTimesheetActions';
import EmployeeTimeSheetViewTab from '../container/EmployeeTimeSheetViewTab';
import HeaderViewerWithTabs from '../../../../components/viewers/HeaderViewerWithTabs';
import employeeTimesheetHeaderViewerOptions from '../config/employeeTimesheetHeaderViewerOptions';
import { employeeTimesheetData } from '../config/employeeTimesheetData';
import ViewerWithoutTabs from '../../../../components/viewers/ViewerWithoutTabs';

const AllTimesheetListTab = ({ columnConfig, handleFilterClick }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    console.log("timesheet", employeeTimesheetData)
    const [first,setFirst] = useState(0);
    const [last,setLast] = useState(10);
    const total = employeeTimesheetData.length;
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
    return (
        <>
             <ViewerWithoutTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                header={
                    <HeaderViewerWithTabs
                        name={selectedRowData?.data.contractTitle}
                        employeeType={selectedRowData?.data.contractID}
                        tags={selectedRowData?.data.status}
                        showTag={true}
                        // buttons={timesheetHeaderViewerBtn}
                        options={employeeTimesheetHeaderViewerOptions}
                        buttonFlag={false}
                    />
                }
                contentComponent={<EmployeeTimeSheetViewTab rowData={selectedRowData} />}
            />
            <CustomDataTable
                data={employeeTimesheetData}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={employeeTimesheetActionMenu}
                columnsConfig={columnConfig}
                selectedColumns={employeeTimesheetSelectedColumns}
                handleAction={handleEmployeeTimesheetActions}
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

export default AllTimesheetListTab;
