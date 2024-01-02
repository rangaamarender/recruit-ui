import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import timesheetActionMenu from '../config/timesheetActionMenu';
import timesheetColumnConfig from '../config/timesheetColumnConfig';
import timesheetSelectedColumns from '../config/timesheetSelectedColumns';
import handleTimesheetActions from '../config/handleTimesheetActions';
import Viewer from '../../../components/viewers/Viewer';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import timesheetHeaderViewerBtn from '../config/timesheetHeaderViewerBtn';
import timesheetHeaderViewerOptions from '../config/timesheetHeaderViewerOptions';
import TimeSheetViewTab from '../container/viewTabSteps/TimeSheetViewTab';


const InactiveTimesheetListTab = ({ columnConfig, handleFilterClick }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);    const data = [
        {
            resources: 'Ram',
            role: "C2C Employee",
            type: 'Superior',
            contractID: "1",
            contractTitle: 'Manager',
            startDate: '1/10/2023',
            endDate: '9/10/2023',
            totalHours: "8",
            status: 'INACTIVE'
        }
    ];
    const total = data.length;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);

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

    const handleCloseSideBar = () => {
        setSidebarVisible(false)
    }

    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    }
    return (
        <Card>
            <Viewer
                visible={sidebarVisible}
                onHide={toggleSidebar}
                header={
                    <HeaderViewerWithTabs
                        name={selectedRowData?.data?.resources || ''}
                        employeeType={selectedRowData?.data?.role || ''}
                        tags="Submitted"
                        showTag={true}
                        buttons={timesheetHeaderViewerBtn}
                        options={timesheetHeaderViewerOptions}
                        onClick={handleCloseSideBar}
                        buttonFlag={false}
                    />
                }
                contentComponent={<TimeSheetViewTab rowData={selectedRowData} />}
            />            <CustomDataTable
                data={data}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={timesheetActionMenu}
                columnsConfig={timesheetColumnConfig}
                selectedColumns={timesheetSelectedColumns}
                handleAction={handleTimesheetActions}
                columnConfig={columnConfig}
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
        </Card>
    );
};

export default InactiveTimesheetListTab;
