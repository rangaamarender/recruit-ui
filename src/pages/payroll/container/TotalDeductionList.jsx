import React from 'react';
import PlainCustomDataTable from '../../../components/datatable/PlainCustomDataTable';
import { Button } from 'primereact/button';

const TotalDeductionList = () => {
    const deductionData = [
        {
            name: 'Abhishek Pulluri',
            amount: '$2300.00',
            additionalDeduction: '$50.00',
            totalDeduction: '$100.00',
        },
    ];
    const nameTemp = (rowData) => (
        <div>
            <div>{rowData.name}</div>
            <div className="fw-normal">FTE - $82,000/Year</div>
        </div>
    );
    const personalNote = () => (
        <div>
            <Button text label="Add Note" icon="pi pi-plus" size="small" />
        </div>
    );
    const paymentType = () => (
        <div>
            <Button text label="Direct Deposit" size="small" />
        </div>
    );
    const totalDeductionSelectedColumn = [
        'name',
        'amount',
        'additionalDeduction',
        'totalDeduction',
        'paymentType',
        'personalNote',
    ];
    const totalDeductionColumnConfig = [
        {
            field: 'name',
            header: 'Employees',
            body: nameTemp,
        },
        {
            field: 'amount',
            header: 'Amount',
        },
        {
            field: 'additionalDeduction',
            header: 'Additional Deduction',
        },
        {
            field: 'totalDeduction',
            header: 'Total Deduction',
        },
        {
            field: 'paymentType',
            header: 'Payment Type',
            body: paymentType,
        },
        {
            field: 'personalNote',
            header: 'Personal Note',
            body: personalNote,
        },
    ];

    return (
        <div>
            {/* content1 */}
            <div className="l-width-70 m-auto p-3 d-flex align-items-center justify-content-between border-bottom">
                <div className="">
                    <div className="fs-5 fw-bold">Total Deductions</div>
                    <div className="p-text-secondary">Edit or Update Deduction</div>
                </div>
            </div>
            {/* DataTable */}
            <div className="l-width-70 m-auto">
                <div className="p-3">
                    <PlainCustomDataTable
                        data={deductionData}
                        selectedColumns={totalDeductionSelectedColumn}
                        columnsConfig={totalDeductionColumnConfig}
                    />
                </div>
            </div>
        </div>
    );
};

export default TotalDeductionList;
