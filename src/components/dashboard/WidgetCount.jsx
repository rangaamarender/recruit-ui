//WidgetCount.jsx

import { Chart } from 'primereact/chart';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import defaultGraphIcon from '../../assets/images/defaultGraphIcon.svg';
import defaultWidgetIcon from '../../assets/images/defaultWidgetIcon.svg';

const WidgetCount = ({ widgetData }) => {
    const defaultLabel = 'Title';
    const defaultCount = '1000';
    const defaultColor = '#ff6600';
    const defaultGraphType = 'line';

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const chartOptions = {
        type: widgetData.graphType || defaultGraphType,
        data: {
            labels: ['', '', '', '', '', ''],
            datasets: [
                {
                    data: widgetData.graphData,
                    fill: false,
                    borderColor: widgetData.borderColor || defaultColor,
                    tension: 0.1,
                },
            ],
        },
        options: {
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
        },
    };

    return (
        <>
            {isLoading ? (
                <div className="m-2">
                    <Skeleton className="h-5rem" />
                </div>
            ) : (
                <Card className="p-2 mb-2">
                    <div className="">
                        <h6 className="widget-label float-start">{widgetData.label || defaultLabel}</h6>
                        {widgetData.icon ? (
                            <img src={widgetData.icon} alt="icon" className="float-end" />
                        ) : (
                            <img src={defaultWidgetIcon} alt="icon" className="float-end" />
                        )}
                    </div>

                    <div className="widget-header d-flex">
                        <h3 className="">{widgetData.count || defaultCount}</h3>
                        {widgetData.graphData ? (
                            <Chart
                                type={chartOptions.type}
                                data={chartOptions.data}
                                options={chartOptions.options}
                                className="ps-3"
                                width="100px"
                            />
                        ) : (
                            <div className="ps-3 pt-2">
                                <img src={defaultGraphIcon} alt="icon" className="float-end" />
                            </div>
                        )}
                    </div>
                </Card>
            )}
        </>
    );
};

export default WidgetCount;
