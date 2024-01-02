import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';

const ResourcePayStubsTab = () => {
    const overlayPanel = useRef(null);
    const products = [
        {
            field: 'projectID',
            header: 'Project ID',
        },
        {
            field: 'projectTitle',
            header: 'Project Title',
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

    return (
        <>
            <div className="mb-3  mt-3 d-flex justify-content-between align-items-center gap-1">
                <div className="company-main-text fs-6 fw-bold"> Showing 1 to 10 out of 50 entries</div>
                <div className="  d-flex justify-content-center align-items-center gap-1">
                    <>
                        <Button
                            onClick={(e) => overlayPanel.current.toggle(e)}
                            icon="pi pi-clock"
                            className="company-secondary-btn w-100 px-2"
                            size="large"
                        />
                        <OverlayPanel ref={overlayPanel} breakpoints>
                            <div className="w-25 h-50"></div>
                        </OverlayPanel>
                    </>

                    <Button icon="pi pi-filter-fill" className="company-secondary-btn w-100 px-2" />
                </div>
            </div>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }} size="small">
                <Column field="payDate" header="Pay Date"></Column>
                <Column field="startDate" header="Start Date"></Column>
                <Column field="endDate" header="End Date"></Column>
                <Column field="hours" header="Hours"></Column>
                <Column field="ems" header="EMS"></Column>
                <Column field="difference" header="Difference"></Column>
            </DataTable>
        </>
    );
};

export default ResourcePayStubsTab;
