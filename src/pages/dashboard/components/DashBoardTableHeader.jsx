import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import React from 'react';

const DashBoardTableHeader = () => {
    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Promotion Data',
                data: [10, 7, 12, 14, 13, 12, 9, 4, 2, 1.5, 1],
                borderColor: '#1769aa',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options1 = {
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    return (
        <>
            <div className="d-flex flex-wrap align-items-center justify-content-between ">
                <div className="flex align-items-center justify-content-center gap-2 ">
                    <div className="fs-5 font-bold">Pending[381]</div>
                    <div style={{ width: '150px', height: 'auto' }}>
                        <Chart type="line" data={data1} options={options1} />
                    </div>
                </div>

                <div>
                    <Button
                        className="company-primary-text"
                        label="Create International Employee"
                        text
                        icon="pi pi-plus"
                    />
                    <Button className="company-primary-text" label="Create Employee" text icon=" pi pi-plus" />
                </div>
            </div>
        </>
    );
};

export default DashBoardTableHeader;
