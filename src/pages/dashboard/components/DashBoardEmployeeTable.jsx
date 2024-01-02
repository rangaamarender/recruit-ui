import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { pendingTableData } from '../config/pendingTableData';
import DashBoardTableHeader from './DashBoardTableHeader';
import { Card } from 'react-bootstrap';

const DashBoardEmployeeTable = () => {
    return (
        <Card>
            <div className="mb-5">
                <DataTable value={pendingTableData} header={<DashBoardTableHeader />} size="small">
                    <Column field="resourceName" header="Full Name" />
                    <Column field="resourceId" header="Employee ID" />
                    <Column field="role" header="Role" />
                    <Column field="status" header="Status" />
                </DataTable>
            </div>
        </Card>
    );
};

export default DashBoardEmployeeTable;
