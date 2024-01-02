import React from 'react';
import { Chart } from 'primereact/chart';

const PayrollSubmited = () => {
    const data = {
        labels: [
            'Pay',
            'Bonus',
            'Commission',
            'Company Taxes',
            'Paid Time off',
            'Reimbursment',
            'Overtime',
            'Benefits',
        ],
        datasets: [
            {
                data: [300, 50, 100, 200, 100, 70, 120, 130], // Replace these values with your actual data
                backgroundColor: [
                    '#42A5F5',
                    '#66BB6A',
                    '#FFCA28',
                    '#EF5350',
                    '#022C44',
                    '#21675E',
                    '#FFC0CB',
                    '#FFD7E7',
                ], // Colors for each category
            },
        ],
    };
    const options = {
        cutout: '70%',
        legend: {
            display: false, // Hide legend as labels are displayed separately
        },
    };
    const chartStyle = { width: '300px', height: '300px' };
    return (
        <div>
            {/* content1 */}
            <div className="">
                <div className="">
                    <div className="fs-5 fw-bold">Payroll Submitted</div>
                    <div>
                        Pay will be debit on May 10th and 22 employee will be paid at 1st June. Make sure the funds
                        available
                    </div>
                </div>
            </div>
            {/* content2 */}
            <div className="d-flex justify-content-between mt-4 p-4">
                <div>
                    <h4>$157,983.07</h4>
                    Total Payroll
                </div>
                <div>
                    <h4>May 25, 2023</h4>
                    payroll Draft Date
                </div>
                <div>
                    <h4>June 1, 2023</h4>
                    Payroll Payment Date
                </div>
            </div>
            {/* content3 */}
            <div className='p-4'>
                <div className="fs-6 fw-bold">What Your Company Pays</div>
                <div>
                    <Chart type="doughnut" data={data} options={options} style={chartStyle} />
                </div>
            </div>
        </div>
    );
};

export default PayrollSubmited;
