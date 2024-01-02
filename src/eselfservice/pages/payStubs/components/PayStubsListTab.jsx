import React, { useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import payActionMenu from '../config/payActionMenu';
import paySelectedColumns from '../config/paySelectedColumns';
import Viewer from '../../../../components/viewers/Viewer';
import { payData } from '../config/payData';
import handlePayActions from '../config/handlePayActions';
import PayViewTab from '../container/PayViewTab';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';

const PayStubsListTab = ({ columnConfig, handleFilterClick }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    console.log("timesheet", selectedRowData)
    console.log("timesheet", sidebarVisible)
    const [first,setFirst] = useState(0);
    const [last,setLast] = useState(10);
    const total = payData.length;
   
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
             <Viewer
                visible={sidebarVisible}
                onHide={toggleSidebar}
                header={
                    <TitleHeaderOnly
                    onClick={toggleSidebar}
                    title={"Pay Stubs"}
                    />
                }
                contentComponent={<PayViewTab rowData={selectedRowData} />}
            />
            <CustomDataTable
                data={payData}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={payActionMenu}
                columnsConfig={columnConfig}
                selectedColumns={paySelectedColumns}
                handleAction={handlePayActions}
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

export default PayStubsListTab;
