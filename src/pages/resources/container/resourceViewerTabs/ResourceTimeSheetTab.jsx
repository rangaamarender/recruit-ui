import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import { Dropdown } from 'primereact/dropdown';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Button } from 'primereact/button';

const ResourceTimeSheetTab = () => {
    const [timeSheetType, setTimeSheetType] = useState(null);
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
    const timeSheetOptionRef = useRef(null);
    const timeSheetOptions = [
        { id: 'view', label: <div className="p-2 fw-bold">View</div> },
        { id: 'download', label: <div className="p-2 fw-bold">Download</div> },
    ];
    const optionsColumn = () => {
        return (
            <div>
                <Menu
                    model={timeSheetOptions}
                    popup
                    ref={timeSheetOptionRef}
                    id="popup_menu_left"
                    className="w-auto p-2"
                />
                <i
                    className="pi pi-ellipsis-v"
                    onClick={(event) => {
                        event.stopPropagation();
                        timeSheetOptionRef.current?.toggle(event);
                    }}
                />
            </div>
        );
    };
    const timeSheetTypeOptions = [{ name: 'Approved Timesheet', code: 'approvedTimesheet' }];
    return (
        <>
            <div className="mb-3 mt-2  d-flex justify-content-between align-items-center gap-1">
                <Dropdown
                    size="small"
                    value={timeSheetType}
                    onChange={(e) => setTimeSheetType(e.value)}
                    options={timeSheetTypeOptions}
                    optionLabel="name"
                    placeholder="Approved Timesheet"
                    className=" company-layout-bg m-0 w-full md:w-14rem"
                />
                <div className="  d-flex justify-content-center align-items-center gap-1">
                    <Button icon="pi pi-clock" className="company-secondary-btn w-100 px-2" size="large" />
                    <Button icon="pi pi-filter-fill" className="company-secondary-btn w-100 px-2" />
                </div>
            </div>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }} size="small">
                <Column field="projectID" header="Project ID"></Column>
                <Column field="projectTitle" header="Project Title"></Column>
                <Column field="quantity" header="Start Date"></Column>
                <Column field="quantity" header="End Date"></Column>
                <Column field="hours" header="Hours"></Column>
                <Column field="Status" header="Status"></Column>

                <Column body={optionsColumn} header=""></Column>
            </DataTable>
        </>
    );
};

export default ResourceTimeSheetTab;
