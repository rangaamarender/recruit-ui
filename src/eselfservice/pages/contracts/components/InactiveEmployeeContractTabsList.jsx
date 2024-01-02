import React, { useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import ViewerWithTabs from '../../../../components/viewers/ViewerWithTabs';
import employeeContractColumnConfig from '../config/employeeContractColumnConfig';
import employeeContractSelectedColumns from '../config/employeeContractSelectedColumns';
import handleEmployeeContractActions from '../config/handleEmployeeContractActions';
import viewEmployeeContractTabs from '../config/viewEmployeeContractTabs';
import employeeContractActionMenu from '../config/employeeContractActionMenu';
import HeaderViewerWithTabs from '../../../../components/viewers/HeaderViewerWithTabs';
import employeeContractHeaderViewerOptions from '../config/employeeContractHeaderViewerOptions';



const InactiveEmployeeContractTabsList = ({ columnConfig, handleFilterClick, dataTableRef }) => {

const contracts = [
    {
        contractID:'PR-AV005',
        contractTitle:"Contract Title",
        contractOwner:"Own",
        clientName:'Tata Consultancy',
        location:"---",
        startDate:'09/09/2018',
        endDate:'09/08/2020',
    }
    
]

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
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    }
    
    const total = 2;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    return (
        <>
           <ViewerWithTabs visible={sidebarVisible} onHide={toggleSidebar} tabs={viewEmployeeContractTabs} 
            
            header={<HeaderViewerWithTabs
                name="Contracts"
                employeeType="ContractsViewer"
                tags="Submitted"
                // showTag={true}
                buttons={""}
                options={employeeContractHeaderViewerOptions}
                buttonFlag={false} 
            />}
            
            />
            <CustomDataTable
                data={contracts}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={employeeContractActionMenu}
                columnsConfig={employeeContractColumnConfig}
                selectedColumns={employeeContractSelectedColumns}
                handleAction={handleEmployeeContractActions}
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

export default InactiveEmployeeContractTabsList;
