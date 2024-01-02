import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react';
import WidgetHeader from './WidgetHeader';

const ActiveTenantCard = () => {
    const [barChartData, setBarChartData] = useState({});
    const [barChartOptions, setBarChartOptions] = useState({});
    const [activeTenantsDropDown, setActiveTenantsDropDown] = useState('2023');
    console.log(activeTenantsDropDown);
    const activeTenantsDropDownOptions = [
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
    ];

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'New',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, -59, 80, -81, 56, -55, 40],
                },
                {
                    label: 'Old',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [28, -48, -40, 19, -86, 27, -90],
                },
            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };

        setBarChartData(data);
        setBarChartOptions(options);
    }, []);
    const onDropdownChange = (event) => {
        setActiveTenantsDropDown(event.target.value);
      
    };
    return (
        <>
            <Card
                className="custom-card p-3"
                header={
                    <WidgetHeader
                        heading="Active Tenants[2298]"
                        onDropdownChange={onDropdownChange}
                        dropdownValue={activeTenantsDropDown}
                        dropDownOptions={activeTenantsDropDownOptions}
                        // placeholder="2023"
                        type="dropDown"
                    />
                }
            >
                <div>
                    <Chart type="bar" data={barChartData} options={barChartOptions} />
                </div>
            </Card>
        </>
    );
};

export default ActiveTenantCard;
