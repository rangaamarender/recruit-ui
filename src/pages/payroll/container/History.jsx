import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React from 'react';
import WidgetHeader from '../../DashBoard1/components/WidgetHeader';

const History = () => {
    const timelineData = [
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Changed the Bank Information</div>
                        <div className="fw-bold">Annie Desmont</div>
                        <div className="text-color-secondary">Jun 28,2023 2.00pm</div>
                    </div>
                </div>
            ),
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Pay Increase from $45.00 to $56.00</div>
                        <div className="fw-bold">Annie Desmont</div>
                        <div className="text-color-secondary">Jun 28,2023 1.00pm</div>
                    </div>
                </div>
            ),
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Pay Increase from $45.00 to $56.00</div>
                        <div className="fw-bold">Annie Desmont</div>
                        <div className="text-color-secondary">Jun 28,2023 1.00pm</div>
                    </div>
                </div>
            ),
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Changed the Bank Information</div>
                        <div className="fw-bold">Annie Desmont</div>
                        <div className="text-color-secondary">Jun 28,2023 2.00pm</div>
                    </div>
                </div>
            ),
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Pay Increase from $45.00 to $56.00</div>
                        <div className="fw-bold">Annie Desmont</div>
                        <div className="text-color-secondary">Jun 28,2023 1.00pm</div>
                    </div>
                </div>
            ),
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Pay Increase from $45.00 to $56.00</div>
                        <div className="fw-bold">Annie Desmont</div>
                        <div className="text-color-secondary">Jun 28,2023 1.00pm</div>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <>
            <Card className="p-3" header={<WidgetHeader heading="History" />}>
                <Timeline
                    className="dashBoard-timeline"
                    align="right"
                    value={timelineData}
                    opposite={(item) => item.status}
                />
            </Card>
        </>
    );
};

export default History;
