import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react';

const ProfitLoseCard = (prop) => {
    const [lineChartData, setLineChartData] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});
    const [lineChartDropDown, setLineChartDropDown] = useState('Last 7 days');

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Income',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    tension: 0.4,
                },
                {
                    label: 'Expense',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    tension: 0.4,
                },
            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        setLineChartData(data);
        setLineChartOptions(options);
    }, []);

    const onDropDownChange = (e) => {
        setLineChartDropDown(e.target.value);
    };

    return (
        <>
            <Card className="custom-card p-3" title={prop.heading}>
                <div className="flex  align-items-center  justify-content-between">
                    <div className="flex  align-items-center  justify-content-center gap-1">
                        <div className="text-success">
                            {prop.profitValue}
                            <span className="pi pi-arrow-up" style={{ color: 'green' }} />
                        </div>
                        <div className="fw-bold">Or </div>
                        <div className="text-danger">
                            {prop.loseValue}
                            <span className="pi pi-arrow-down" style={{ color: 'red' }} />
                        </div>
                    </div>
                    <div className="flex  align-items-center  justify-content-center gap-3">
                        <div className="flex  align-items-center  justify-content-center gap-3">
                            <div className="text-success flex  align-items-center  justify-content-center gap-1">
                                {prop.incomeValue}
                                <div>Income</div>
                            </div>
                            <div className="text-danger flex  align-items-center  justify-content-center gap-2">
                                {prop.expenseValue}
                                <div>Expense </div>
                            </div>
                        </div>

                        <select
                            class="form-select"
                            aria-label="Last 7 Days"
                            value={lineChartDropDown}
                            onChange={onDropDownChange}
                        >
                            <option selected value={'last7Days'}>
                                Last 7 Days{' '}
                            </option>
                            <option selected value={'last15Days'}>
                                Last 15 days
                            </option>
                            <option selected value={'lastMonth'}>
                                Last Month
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <Chart type="line" height="345px" data={lineChartData} options={lineChartOptions} />
                </div>
            </Card>
        </>
    );
};

export default ProfitLoseCard;
