import React, { useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import timesheetActionMenu from '../config/timesheetActionMenu';
import timesheetSelectedColumns from '../config/timesheetSelectedColumns';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import timesheetHeaderViewerBtn from '../config/timesheetHeaderViewerBtn';
import timesheetHeaderViewerOptions from '../config/timesheetHeaderViewerOptions';
import { timesheetData } from '../config/timesheetData';
import TimeSheetViewTab from '../container/viewTabSteps/TimeSheetViewTab';
import handleTimesheetActions from '../config/handleTimesheetActions';
import { useDispatch } from 'react-redux';
import { handleActions } from '../../../redux/actions/companiesActions';
import ViewerWithoutTabs from '../../../components/viewers/ViewerWithoutTabs';


const ActiveTimesheetListTab = ({ columnConfig, handleFilterClick }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
   
    const dispatch = useDispatch();

    console.log("timesheet", timesheetData)
    // const action = useSelector((state) => state.company.action);


    const [first,setFirst] = useState(0);
    const [last,setLast] = useState(10);
    const total = timesheetData.length;
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
        dispatch(handleActions('viewTimesheet'))
    };


    const onCustomPage= (event) => {
        setFirst(event.first); 
        setLast(event.last);
        // setCurrentPage(event.page);
    }


    // console.log(selectedRowData.data)
    return (
        <>
             <ViewerWithoutTabs
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
                        onClick={toggleSidebar}
                        buttonFlag={false}
                    />
                }
                // contentComponent={<TimeSheetViewTab rowData={selectedRowData} />}
                contentComponent={<TimeSheetViewTab rowData={selectedRowData} />}
            />
            <CustomDataTable
                data={timesheetData}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={timesheetActionMenu}
                columnsConfig={columnConfig}
                selectedColumns={timesheetSelectedColumns}
                handleAction={handleTimesheetActions}
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

export default ActiveTimesheetListTab;
