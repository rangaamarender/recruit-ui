import React, { useState } from 'react';
import documentActionMenu from '../config/documentActionMenu';
import documentSelectedColumns from '../config/documentSelectedColumns';
import HeaderViewerWithTabs from '../../../../components/viewers/HeaderViewerWithTabs';
import { documentData } from '../config/documentData';
import documentHeaderViewerOptions from '../config/documentHeaderViewerOptions';
import handleDocumentActions from '../config/handleDocumentActions';
// import ExpenseViewTab from '../container/ExpenseViewTab';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import ViewerWithoutTabs from '../../../../components/viewers/ViewerWithoutTabs';

const SharedDocumentListTab = ({ columnConfig, handleFilterClick }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    console.log(sidebarVisible)
    console.log("timesheet", documentData)

    const [first,setFirst] = useState(0);
    const [last,setLast] = useState(10);
    const total = documentData.length;
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

    const sharedDocuments = [
        {
            title:"LCA-Lucidtech001",
            docNumber:'3119765433',
            category: '--',
            issueDate:'03/01/2016',
            expiryDate:'10/01/2023',
            updatedOn:'09/01/2021',
           
        },
        {
            title:"LCA-Lucidtech002",
            docNumber:'3119765434',
            category: '--',
            issueDate:'03/01/2017',
            expiryDate:'10/01/2024',
            updatedOn:'01/01/2022',
           
        },
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
                        tags="Approved"
                        showTag={true}
                        // buttons={timesheetHeaderViewerBtn}
                        options={documentHeaderViewerOptions}
                        buttonFlag={false}
                    />
                }
                // contentComponent={<ExpenseViewTab rowData={selectedRowData} />}
            />
            <CustomDataTable
                data={sharedDocuments}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={documentActionMenu}
                columnsConfig={columnConfig}
                selectedColumns={documentSelectedColumns}
                handleAction={handleDocumentActions}
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

export default SharedDocumentListTab;
