import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';

const DashboardButtonCard = (prop) => {
    return (
        <>
            <Card className="custom-card p-2 flex flex-column">
                <Button
                    label={prop.button1}
                    severity="warning"
                    size="small"
                    icon="pi pi-plus-circle"
                    className="mb-1 w-100 text-start "
                />
                <Button
                    label={prop.button2}
                    severity="secondary"
                    size="small"
                    icon="pi pi-upload"
                    className="mb-1 w-100 text-start"
                />
                <Button
                    label={prop.button3}
                    severity="secondary"
                    icon="pi pi-calendar"
                    className="mb-1 w-100 text-start"
                    size="small "
                />
            </Card>
        </>
    );
};

export default DashboardButtonCard;
