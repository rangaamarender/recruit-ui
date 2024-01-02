import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { pendingTableData } from '../config/pendingTableData';
import DashBoardTableHeader from '../components/DashBoardTableHeader';
import { Card } from 'react-bootstrap';

import { CCol, CRow } from '@coreui/react';

const DashBoardPendingEmployeeContainer = () => {
    return (
        <>
            <CRow className="mb-3 mt-4 ">
                <CCol md={3}>
                    <Image
                        src="https://as2.ftcdn.net/v2/jpg/05/11/38/49/1000_F_511384979_yUlm9QIk9DAgSXEZDZHqClpM6fnBx2wX.jpg"
                        alt="Image"
                        width="250"
                        height="310"
                        className="img-fluid"
                    />
                </CCol>
                <CCol md={9}>
                    <Card>
                        <div className="rounded">
                            <DataTable value={pendingTableData} header={<DashBoardTableHeader />} size="small">
                                <Column field="resourceName" header="Full Name" />
                                <Column field="resourceId" header="Employee ID" />
                                <Column field="role" header="Role" />
                                <Column field="status" header="Status" />
                            </DataTable>
                        </div>
                    </Card>
                </CCol>
            </CRow>
        </>
    );
};

export default DashBoardPendingEmployeeContainer;
