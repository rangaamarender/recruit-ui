import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React from 'react';
import WidgetHeader from '../../DashBoard1/components/WidgetHeader';

const HistoryTab = () => {
    const timelineData = [
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}>Changed the Status to Not in Consideration</div>
                        <div className="fw-bold">Annie Deshmukh</div>
                    </div>
                </div>
            ),
            date: '2017-01-02 00:00:00.0 ',
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}> Consideration</div>
                        <div className="fw-bold">John</div>
                    </div>
                </div>
            ),
            date: ' 2017-01-02 00:00:00.0',
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}> Consideration</div>
                        <div className="fw-bold">Max</div>
                    </div>
                </div>
            ),
            date: ' 2017-01-05 00:00:00.0',
        },
        {
            status: (
                <div className="callOut">
                    <div className="">
                        <div style={{ fontSize: '13px' }}> Consideration</div>
                        <div className="fw-bold">Mike</div>
                    </div>
                </div>
            ),
            date: ' 2017-01-05 00:00:00.0',
        },
    ];
    const timeZone = 'America/New_York';
    // const timeZone = 'Asia/Kolkata';
    function convertToUserTimeZone(dateString, timeZone) {
        try {
            const date = new Date(dateString);

            return date.toLocaleString('en-US', { timeZone: timeZone });
        } catch (error) {
            console.error('Error converting date:', error);
            return 'Invalid Date';
        }
    }
    const timelineDataWithTimezone = timelineData.map((item) => ({
        status: item.status,
        date: convertToUserTimeZone(item.date, timeZone),
    }));
    return (
        <>
            <Card
                className="custom-card p-2 m-1"
                header={<WidgetHeader heading="Activity" type="button" buttonLabel="View All" />}
            >
                <Timeline
                    className="dashBoard-timeline"
                    align="right"
                    value={timelineDataWithTimezone}
                    opposite={(item) => item.status}
                    content={(item) => <small className="text-color-secondary">{item.date}</small>}
                />
                {/* timelineData is hardcode data */}
            </Card>
        </>
    );
};

export default HistoryTab;
