import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import { pendingTableData } from '../../dashboard/config/pendingTableData';
import DashBoardTableHeader from '../../dashboard/components/DashBoardTableHeader';

const PendingTable = () => {
    return (
        <>
            <div className="rounded">
                <DataTable value={pendingTableData} header={<DashBoardTableHeader />} size="small">
                    <Column field="resourceName" header="Full Name" />
                    <Column field="resourceId" header="Employee ID" />
                    <Column field="role" header="Role" />
                    <Column field="status" header="Status" />
                </DataTable>
            </div>
        </>
    );
};

export default PendingTable;
