import { Button } from 'primereact/button';
import React from 'react';

const PayrollAction = () => {
    return (
        <>
            <div className="flex flex-column justify-content-center align-items-center p-3">
                <div className="fs-6 fw-bold">Payroll Actions</div>
                <div>
                    <Button label="Off-cycle Payroll" text />
                </div>
            </div>
        </>
    );
};

export default PayrollAction;
