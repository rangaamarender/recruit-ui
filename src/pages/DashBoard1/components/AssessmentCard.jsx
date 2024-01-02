import { Card } from 'primereact/card';
import React from 'react';
import WidgetHeader from './WidgetHeader';
import { Badge } from 'primereact/badge';

const AssessmentCard = (prop) => {
    return (
        <>
            <Card
                className="custom-card p-3"
                header={<WidgetHeader heading=" Recent Assessments" type="button" buttonLabel="Show More" />}
            >
                <Card className=" p-2 rounded mb-1 border-1">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1"> {prop.fullName}</h5>
                        <small>{prop.time}</small>
                    </div>
                    <p className="mb-1">{prop.description}</p>
                    <div className="d-flex w-100 justify-content-between">
                        <Badge
                            severity="success"
                            value={
                                <i className="pi pi-star" style={{ fontSize: '1rem' }}>
                                    4.3
                                </i>
                            }
                        ></Badge>
                        <Badge severity="success" value={<small style={{ fontSize: '1rem' }}>Cleared</small>}></Badge>
                    </div>
                </Card>

                <Card className="p-2 rounded  mb-1 border-1">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small>3 days ago</small>
                    </div>
                    <p className="mb-1">{prop.description}</p>
                    <div className="d-flex w-100 justify-content-between">
                        <Badge
                            severity="danger"
                            value={
                                <i className="pi pi-star" style={{ fontSize: '1rem' }}>
                                    2.1
                                </i>
                            }
                        ></Badge>
                        <Badge severity="danger" value={<small style={{ fontSize: '1rem' }}>Failed</small>}></Badge>
                    </div>
                </Card>
            </Card>
        </>
    );
};

export default AssessmentCard;
