import React,{useState} from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PayrollPaySleep from './PayrollPaySleep';
import ViewerWithFooter from '../../../components/viewers/ViewerWithFooter';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';

const OverView = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    

    const DataPayroll = [
        {
            checkDate: 'March 15, 2023',
            checkNumber: '0101',
            totalPaid: '$9365.00',
            netPay: '$7380.00',
        },
    ];
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const handleOnHide = () => {
        setSidebarVisible(false);
    };
    const handleScroll = (event) => {
        const viewerBody = event.target;
        setScrollPosition(viewerBody.scrollTop);
    };
    return (
        <>
        <div>
        <ViewerWithFooter
                    visible={sidebarVisible}
                    onHide={toggleSidebar}
                    header={
                        <TitleHeaderOnly onClick={handleOnHide} title={'Paysleep #303941'} scrollPosition={scrollPosition} />
                    }
                    contentComponent={<PayrollPaySleep handleScroll={handleScroll}/>}
                // contentComponent={"Invoice view here"}
                />
        </div>
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Details</div>
            </div>

            <div className="formgrid grid m-2">
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">ID</label>
                    <p className="p-text-primary">#303941</p>
                </div>

                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Employee Name</label>
                    <p className="p-text-primary">Abhishek Pulluri</p>
                </div>
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Hours</label>
                    <p className="p-text-primary">136</p>
                </div>
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Gross</label>
                    <p className="p-text-primary">$9365.00</p>
                </div>
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Taxes</label>
                    <p className="p-text-primary">95.35%</p>
                </div>
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Net Pay</label>
                    <p className="p-text-primary">$9539.70</p>
                </div>
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Status</label>
                    <p className="p-text-primary">Paid</p>
                </div>
                <div className="col-12 md:col-3">
                    <label className="p-text-secondary">Pay Schedule</label>
                    <p className="p-text-primary">Weekly</p>
                </div>
            </div>

            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Summary</div>
                <div className="">
                    <span className="fw-normal">Pay Period : 05/22/2023 - 05/12/2023 </span>
                    <Button text label="Preview paysleep" size="small" icon="pi pi-eye" onClick={()=>setSidebarVisible(true)} />
                    <Button text label="Download paysleep" size="small" icon="pi pi-download" />
                </div>
            </div>
            <div className="formgrid grid m-2">
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Gross Pay</label>
                    <p className="p-text-primary">$9365.00</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Bonus</label>
                    <p className="p-text-primary">$365.00</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Loan (Plan 1)</label>
                    <p className="p-text-primary">$200.00</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Income Tax</label>
                    <p className="p-text-primary">$2150.00</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Net Pay</label>
                    <p className="p-text-primary">$7380.00</p>
                </div>
            </div>

            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Pay Stubs - Abhishek Pulluri</div>
            </div>

            <div className="flex p-3 gap-3">
                <span className="p-text-secondary">
                    Check Date from :{' '}
                    <Calendar
                        id="startDate"
                        name="startDate"
                        placeholder="Start Date"
                        showIcon
                        className="date-pick-icon"
                    />
                </span>
                <span className="p-text-secondary">
                    To :{' '}
                    <Calendar id="EndDate" name="EndDate" placeholder="End Date" showIcon className="date-pick-icon" />
                </span>
                <div className="mt-1 gap-2">
                    <Button label="Find" size="small" />
                </div>
            </div>
            <div className="mt-2 p-3">
                <DataTable value={DataPayroll} tableStyle={{ minWidth: '50rem' }} size="small">
                    <Column field="checkDate" header="Check Date"></Column>
                    <Column field="checkNumber" header="Check Number"></Column>
                    <Column field="totalPaid" header="Total Paid"></Column>
                    <Column field="netPay" header="Net Pay"></Column>
                </DataTable>
            </div>

            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Time Tracking</div>
            </div>
            <div className="formgrid grid m-2">
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Regular</label>
                    <p className="p-text-primary">158h 54m</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Overtime</label>
                    <p className="p-text-primary">0h</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Double</label>
                    <p className="p-text-primary">0h</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Approved/Total Hours</label>
                    <p className="p-text-primary">158h 54m / 158h 54m</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">PTO</label>
                    <p className="p-text-primary">0h</p>
                </div>
                <div className="col-12 md:col-2">
                    <label className="p-text-secondary">Holidays (Paid)</label>
                    <p className="p-text-primary">0h</p>
                </div>
            </div>
        </>
    );
};

export default OverView;
