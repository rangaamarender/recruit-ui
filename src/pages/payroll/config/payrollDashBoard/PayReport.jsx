import React from 'react';

const PayReport = () => {
    const reports = [
        {
            label1: 'Year End Reports are here!',
            label2: 'Year end Reports and tax form in one place',
        },
        {
            label1: 'Year End Reports are here!',
            label2: 'Year end Reports and tax form in one place',
        },
        {
            label1: 'Year End Reports are here!',
            label2: 'Year end Reports and tax form in one place',
        },
        {
            label1: 'Year End Reports are here!',
            label2: 'Year end Reports and tax form in one place',
        },
    ];

    return (
        <div className="card p-3">
            <div className="flex justify-content-between border-bottom">
                <div className="fs-6 fw-bold">Reports</div>
                <div>
                    <i className="pi pi-ellipsis-v cursor-pointer" />
                </div>
            </div>
            {reports.map((report, index) => (
                <div key={index} className="mt-2 d-flex align-items-center gap-3">
                    <i className="pi pi-book" />
                    <div>
                        <div className="fw-bold">{report.label1}</div>
                        <div className="p-text-secondary">{report.label2}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PayReport;
