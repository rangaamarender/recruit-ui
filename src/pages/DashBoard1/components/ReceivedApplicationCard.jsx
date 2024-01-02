import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react';
import WidgetHeader from './WidgetHeader';

const ReceivedApplicationCard = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            datasets: [
                {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                    ],
                    label: 'My dataset',
                },
            ],
            labels: ['New Applications', 'Shortlisted', 'Submitted', 'Interview', 'Offer Mode', 'Placed'],
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    return (
        <>
            <Card className="custom-card p-3" header={<WidgetHeader heading="Application Received" />}>
                <Chart type="polarArea" data={chartData} options={chartOptions} />
            </Card>
        </>
    );
};

export default ReceivedApplicationCard;
