import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import PayrollWizardComponent from '../../../../components/viewers/PayrollWizardComponent';
import RunPayrollParent from '../../container/RunPayrollParent';

const PayrollDash = () => {
    const [date, setDate] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <>
            <div>
                <PayrollWizardComponent
                    title="Run Payroll"
                    visible={sidebarVisible}
                    onHide={() => setSidebarVisible(false)}
                    steps={RunPayrollParent}
                />
            </div>
            <div className="p-4">
                <div className="fs-6 fw-bold">Upcoming</div>
                <div className="flex gap-3">
                    <div className="card p-3">
                        <div>Check Date</div>
                        <div>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
                        </div>
                    </div>
                    <div className="card p-3">
                        <div>Pay Period</div>
                        <div>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <Button label="Run Payroll" className="w-full" onClick={() => setSidebarVisible(true)}/>
                </div>
            </div>
        </>
    );
};

export default PayrollDash;
