import React from 'react';
import DashBoardGraphTabs from '../components/DashBoardGraphTabs';
import CompanyProfileCard from '../../DashBoard1/components/CompanyProfileCard';
import { Card } from 'primereact/card';
import { CCol, CRow } from '@coreui/react';

const DashBoardGraphContainer = () => {
    return (
        <>
            <CRow className="mb-3 mt-3">
                <CCol md={9}>
                    <Card className="p-3">
                        <DashBoardGraphTabs />
                    </Card>
                </CCol>
                <CCol md={3}>
                    <CompanyProfileCard
                        companyName="Lucid Technologies.inc"
                        mailId="info@lucidtech.com"
                        Address="8600, freeport Pkwy, STE 300"
                        footerButton="View more"
                    />
                </CCol>
            </CRow>
        </>
    );
};

export default DashBoardGraphContainer;
