import React from 'react';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';

const LastPayrollChart = () => {
    const data = {
        labels: ['A'],
        datasets: [
            {
                data: [200],
                backgroundColor: ['#36A2EB'],
            },
        ],
    };
    const options = {
        cutout: '70%',
    };
    return (
        <>
            <div className="card mt-2 p-3">
                <div className="fs-6 fw-bold ">Last Payroll</div>
                <div className="flex gap-5 mt-2">
                    <div className="card p-1">
                        <div className="p-text-secondary">Check Date</div>
                        <div>09/02/2023</div>
                    </div>
                    <div className="card p-1">
                        <div className="p-text-secondary">Pay Period</div>
                        <div>06/16 - 06/31</div>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Chart type="doughnut" data={data} options={options} className='w-full' />
                    <div className="border-bottom mt-2">Report Package</div>
                    <div className='mt-2'>
                        <Button text label="Payroll Detail" size="small" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LastPayrollChart;
