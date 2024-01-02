import React, { useEffect } from 'react';
import { Card } from 'primereact/card';
import PlainLayout from '../../components/layouts/PlainLayout';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import { CCol, CRow } from '@coreui/react';
import DashBoardGraphTabs from '../dashboard/components/DashBoardGraphTabs';
import TransactionCard from './components/TransactionCard';
import PendingTable from './components/PendingTable';
import PromotionCard from './components/PromotionCard';
import SalesCard from './components/SalesCard';
import InvoiceCard from './components/InvoiceCard';
import ReceivedApplicationCard from './components/ReceivedApplicationCard';
import ActiveTenantCard from './components/ActiveTenantCard';
import CompanyProfileCard from './components/CompanyProfileCard';
import ProfitLoseCard from './components/ProfitLoseCard';
import IncomeCard from './components/IncomeCard';
import PaymentOverViewCard from './components/PaymentOverViewCard';
import AssessmentCard from './components/AssessmentCard';
import SalesTable from './components/SalesTable';
import TimeLineCard from './components/TimeLineCard';
import DashboardButtonCard from './components/DashboardButtonCard';

const Widgets = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageName('Dashboard'));
    }, [dispatch]);

    return (
        <PlainLayout>

            <div>
                {/* <CRow xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 4 }}>
                    <DashboardWidget />
                </CRow> */}

                <CRow className=" mb-4">
                    <CCol md={7}>
                        <SalesTable />
                    </CCol>
                    <CCol md={5}>
                        <TimeLineCard />
                    </CCol>
                </CRow>
                {/* profit and lose */}
                <CRow className="mb-4">
                    <CCol md={8}>
                        <ProfitLoseCard
                            heading="Profit & Lose "
                            expenseValue="$36k"
                            profitValue=" $22"
                            incomeValue="$58k"
                            loseValue="$XXXs"
                        />
                    </CCol>
                    <CCol md={4}>
                        <IncomeCard />
                    </CCol>
                </CRow>
                {/* resource/contracts */}
                <CRow className="mb-4">
                    <CCol md={8}>
                        <Card className="p-3">
                            <DashBoardGraphTabs />
                        </Card>
                    </CCol>
                    <CCol md={4}>
                        <CompanyProfileCard
                            companyName="Lucid Technologies.inc"
                            mailId="info@lucidtech.com"
                            Address="8600, freeport Pkwy, STE 300"
                            footerButton="View more"
                        />
                    </CCol>
                </CRow>
                {/* Active tenants */}

                <CRow className="mb-4">
                    <CCol md={8}>
                        <ActiveTenantCard />
                    </CCol>
                    <CCol md={4}>
                        <DashboardButtonCard
                            button1="Post a Job"
                            button2="Upload Resume"
                            button3="Schedule an Interview"
                        />
                    </CCol>
                </CRow>
                {/*ReceivedApplicationCard  */}
                <CRow className="mb-4">
                    <CCol md={4}>
                        <ReceivedApplicationCard />
                    </CCol>
                    <CCol md={8} className="flex flex-column gap-4">
                        <AssessmentCard
                            fullName="Anil Kumar Patu"
                            time="3 days ago"
                            description="Oracle Forms and reports"
                        />
                    </CCol>
                </CRow>
                {/*InvoiceCard  */}
                <CRow className="mb-4">
                    <CCol md={5}>
                        <InvoiceCard footerButton1="Add More Details" footerButton2="Send Money" />
                    </CCol>
                    <CCol md={4}>
                        <PaymentOverViewCard />
                    </CCol>
                    <CCol md={3}>
                        <SalesCard />
                    </CCol>
                </CRow>
                {/*  pendingTable*/}
                <CRow className="mb-4">
                    <CCol md={9}>
                        <PendingTable />
                    </CCol>
                    <CCol md={3}>
                        <PromotionCard heading="Promotions" promotionNumber={48} expiringDays={30} />
                    </CCol>
                </CRow>
                {/*PendingTable  */}
                <CRow className="mb-4">
                    <CCol md={9}>
                        <PendingTable />
                    </CCol>
                    <CCol md={3}>
                        <TransactionCard />
                    </CCol>
                </CRow>
            </div>
        </PlainLayout>
    );
};

export default Widgets;
