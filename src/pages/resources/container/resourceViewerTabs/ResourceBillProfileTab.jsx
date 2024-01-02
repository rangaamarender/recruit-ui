import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

const ResourceBillProfileTab = () => {
    const products = [
        {
            field: 'projectID',
            header: 'Project ID',
        },
        {
            field: 'regularDate',
            header: 'Regular Date',
        },
        {
            field: 'projectID',
            header: 'Project ID',
        },
        {
            field: 'projectID',
            header: 'Project ID',
        },
    ];
    const optionsColumn = () => {
        return (
            <div>
                <i className="pi pi-ellipsis-v" />
            </div>
        );
    };

    return (
        <>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }} size="small">
                <Column field="projectID" header="Project ID"></Column>
                <Column field="regularDate" header="Regular Date"></Column>
                <Column field="category" header="Expenses"></Column>
                <Column field="quantity" header="Over Time Rate"></Column>
                <Column field="quantity" header="Paid Vacation"></Column>
                <Column field="quantity" header="Start Date"></Column>
                <Column field="quantity" header="End Date"></Column>
                <Column body={optionsColumn} header=""></Column>
            </DataTable>
            <Button label="Add New" className="company-primary-text" icon="pi pi-plus-circle" text />
            <div className=" mt-4 d-flex">
                <p>History</p>
            </div>
        </>
    );
};

export default ResourceBillProfileTab;
