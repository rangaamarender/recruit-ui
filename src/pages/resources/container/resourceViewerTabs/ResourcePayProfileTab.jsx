import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

const ResourcePayProfileTab = () => {
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
    // const events = [
    //     {
    //         status: 'Ordered',
    //         date: '15/10/2020 10:30',
    //         icon: 'pi pi-shopping-cart',
    //         color: '#9C27B0',
    //         image: 'game-controller.jpg',
    //     },
    //     {
    //         status: 'Processing',
    //         date: '15/10/2020 14:00',
    //         icon: 'pi pi-cog',
    //         color: '#673AB7',
    //     },
    //     {
    //         status: 'Shipped',
    //         date: '15/10/2020 16:15',
    //         icon: 'pi pi-shopping-cart',
    //         color: '#FF9800',
    //     },
    //     {
    //         status: 'Delivered',
    //         date: '16/10/2020 10:00',
    //         icon: 'pi pi-check',
    //         color: '#607D8B',
    //     },
    // ];
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
            <Button label="Add New" icon="pi pi-plus-circle" className="company-primary-text" text />
            <div className=" mt-4 d-flex">
                <p>History</p>
            </div>
        </>
    );
};

export default ResourcePayProfileTab;
