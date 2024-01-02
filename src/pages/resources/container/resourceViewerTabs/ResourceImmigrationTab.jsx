import { Button } from 'primereact/button';
import React from 'react';
import { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';

const ResourceImmigrationTab = () => {
    const [expireReminder, setExpireReminder] = useState(true);
    return (
        <>
            {/* header */}
            <div className="mb-3 p-2 d-flex justify-content-between align-items-center gap-1">
                <div className="fs-6 fw-bold">Immigration</div>
                <Button className="company-secondary-btn" size="small">
                    Edit
                </Button>
            </div>
            {/* content 1*/}
            <div className="company-layout-bg rounded p-3 h-auto">
                <div className="row">
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Work Permit</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">H1B</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Document ID</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Start Date</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">End Date</p>
                        <p className="company-main-text p-0  mb-2">---</p>
                    </div>
                </div>
                <Checkbox checked={expireReminder} onChange={(e) => setExpireReminder(e.checked)} />
                <label htmlFor="expireReminder" className="company-main-text ml-5">
                    Remind me 6 months before expiration
                </label>
            </div>
            {/* content 2*/}
            <div className="company-layout-bg rounded p-3 h-auto mt-4">
                <div className="row">
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Passport No</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Passport issue Date</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Entered US First Time</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">End Date</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                </div>
                <Checkbox checked={expireReminder} onChange={(e) => setExpireReminder(e.checked)} />
                <label htmlFor="expireReminder" className="company-main-text ml-5">
                    Remind me 6 months before expiration
                </label>
            </div>
            {/* content 3 */}
            <div className="company-layout-bg rounded p-3 h-auto mb-6 mt-4">
                <div className="row">
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Passport No</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                    <div className="col-6 mb-1">
                        <p className="company-secondary-text p-0 mb-0">Passport issue Date</p>
                        <p className="company-main-text p-0  mb-2 fw-bold">---</p>
                    </div>
                </div>
                {/* notes */}
                <div className="company-secondary-text">Notes</div>
                <div className="company-main-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum natus ad accusamus reprehenderit!
                    Cum molestiae, architecto placeat fuga, velit accusantium suscipit asperiores sed quaerat
                    necessitatibus
                </div>
            </div>
        </>
    );
};

export default ResourceImmigrationTab;
