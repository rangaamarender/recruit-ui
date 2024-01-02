import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react';
import WidgetHeader from './WidgetHeader';

const SalesCard = () => {
    const [salesChartData, setSalesChartData] = useState({});
    const [salesChartOptions, setSalesChartOptions] = useState({});
    const [salesChartDropDown, setSalesChartDropDown] = useState('Last Week');

    const salesChartDropDownOptions = [
        { label: 'Last Week', value: 'weekly' },
        { label: 'Last 15 Days', value: 'last15days' },
        { label: 'Last Month', value: 'lastMonth' },
    ];
    const onDropdownChange = (e) => {
        setSalesChartDropDown(e.target.value);
    };

    useEffect(() => {
        const data = {
            labels: ['0', '10', '20', '30'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620, 100, 344, 346, 123],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1,
                },
            ],
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        };

        setSalesChartData(data);
        setSalesChartOptions(options);
    }, []);
    const subTitle = () => {
        return (
            <>
                <div className="flex justify-content-center gap-2">
                    <div className="fs-5 fw-bold">$158k</div>
                    <div className="d-flex w-100 justify-content-between">
                        <Badge value="8.5%" severity="success" className="pi pi-arrow-up p-1 fs-6"></Badge>
                    </div>
                </div>
                <small>($125 avg.score)</small>
            </>
        );
    };
    return (
        <>
            <Card
                className="custom-card p-3"
                header={
                    <WidgetHeader
                        heading="Sales"
                        onDropdownChange={onDropdownChange}
                        dropdownValue={salesChartDropDown}
                        dropDownOptions={salesChartDropDownOptions}
                        type="dropDown"
                        buttonLabel="Show More"
                    />
                }
                subTitle={subTitle}
            >
                <Chart type="bar" data={salesChartData} options={salesChartOptions} />
                {/* data and options are static  */}
            </Card>
        </>
    );
};

export default SalesCard;
