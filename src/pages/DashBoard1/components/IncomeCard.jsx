import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react';
import WidgetHeader from './WidgetHeader';

const IncomeCard = () => {
    const [doughnutChartData, setDoughnutChartData] = useState({});
    const [doughnutChartOptions, setDoughnutChartOptions] = useState({});
    const [doughnutChartDropDown, setDoughnutChartDropDown] = useState('Weekly');
    const doughnutChartDropDownOptions = [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
    ];
    const onDropdownChange = (event) => {
        setDoughnutChartDropDown(event.target.value);
    };
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            datasets: [
                {
                    data: [300, 100, 80],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--gray-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--gray-400'),
                    ],
                },
            ],
        };
        const options = {
            cutout: '60%',
        };

        setDoughnutChartData(data);
        setDoughnutChartOptions(options);
    }, []);
    return (
        <>
            <Card
                className="custom-card p-3"
                header={
                    <WidgetHeader
                        heading="Income"
                        onDropdownChange={onDropdownChange}
                        dropdownValue={doughnutChartDropDown}
                        dropDownOptions={doughnutChartDropDownOptions}
                        type="dropDown"
                    />
                }
            >
                <Chart type="doughnut" data={doughnutChartData} options={doughnutChartOptions} />
                {/* chart data and  options are hand code data*/}
                <div className="flex  align-items-center  justify-content-between">
                    <div className="text-success fw-bold">Open Invoices</div>
                    <div className="text-success fw-bold">$300</div>
                </div>
                <div className="flex  align-items-center  justify-content-between">
                    <div className="text-danger fw-bold">OverDue Invoices</div>
                    <div className="text-danger fw-bold">$100</div>
                </div>
                <div className="flex  align-items-center  justify-content-between">
                    <div className="text-secondary fw-bold">Paid Last 30 Days</div>
                    <div className="text-secondary fw-bold">$80</div>
                </div>
            </Card>
        </>
    );
};

export default IncomeCard;
