import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react';
import WidgetHeader from './WidgetHeader';

const PaymentOverViewCard = () => {
    const [paymentOverViewChartData, setPaymentOverViewChartData] = useState({});
    const [paymentOverViewChartOptions, setPaymentOverViewChartOptions] = useState({});
    const [paymentOverviewDropDown, setPaymentOverviewDropDown] = useState("Weekly");
    const paymentOverviewDropDownOptions = [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
    ];

    const onDropdownChange = (event) => {
        setPaymentOverviewDropDown(event.target.value);
    };

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['W1', 'W2', 'W3', 'W4'],
            datasets: [
                {
                    label: 'Received Amount',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4,
                },
                {
                    label: 'Due Amount',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    tension: 0.4,
                },
            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
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

        setPaymentOverViewChartData(data);
        setPaymentOverViewChartOptions(options);
    }, []);
    return (
        <>
            <Card
                className="custom-card p-3"
                header={
                    <WidgetHeader
                        heading="Payment Overview"
                        onDropdownChange={onDropdownChange}
                        dropdownValue={paymentOverviewDropDown}
                        dropDownOptions={paymentOverviewDropDownOptions}
                        type="dropDown"
                    />
                }
            >
                <div className="mt-2">
                    <Chart type="line" data={paymentOverViewChartData} options={paymentOverViewChartOptions} />
                </div>
            </Card>
        </>
    );
};

export default PaymentOverViewCard;
