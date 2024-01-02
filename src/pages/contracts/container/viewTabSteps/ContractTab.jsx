import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ContractDeductions = () => {

   
    const contracts = [
        {
            contractID:'PR-AV009',
            contractTitle:"Contract Title",
            clientName:'Tata Consultancy',
            workOrders:"4",
            startDate:'10/08/2018',
            endDate:'18/08/2020',
            programeFee:'2.14%',
            discounts:"1.5%",
            lastUpdate:'05/132020'
        },
        {
            contractID:'PR-AV010',
            contractTitle:"Contract Titles",
            clientName:'Infosyss',
            workOrders:"6",
            startDate:'30/08/2021',
            endDate:'24/10/2023',
            programeFee:'2.14%',
            discounts:"1.5%",
            lastUpdate:'05/132020'
        },
    ]



    const optionsColumn = () => {
        return (
            <div>
                <i className="pi pi-ellipsis-v" />
            </div>
        );
    };
 
    return (
        <>
            {/* <div className="formgrid grid m-2"> */}

                <DataTable value={contracts} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    tableStyle={{ minWidth: '50rem' }} size="small">
                    <Column field="contractID" header="Resource ID"></Column>
                    <Column field="contractTitle" header="Resource Title"></Column>
                    <Column field="clientName" header="Expenses"></Column>
                    <Column field="workOrders" header="Vendor"></Column>
                    <Column field="startDate" header="Join Date"></Column>
                    <Column field="programeFee" header="Status"></Column>

                    <Column body={optionsColumn} ></Column>
                </DataTable>
                
        </>
    );
};

export default ContractDeductions;