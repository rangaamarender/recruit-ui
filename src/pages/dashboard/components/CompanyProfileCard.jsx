import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';
import { Image } from 'primereact/image';

const CompanyProfileCard = () => {
    const footer = (
        <div className="flex flex-wrap justify-content-center ">
            <Button label="View more" text />
        </div>
    );
    const title = <p className="fs-5 fw-bold  company-main-text">Company Profile</p>;
    return (
        <>
            <Card className="w-100" footer={footer} title={title}>
                <div className="flex flex-column h-100 ">
                    <div className="text-center">
                        <Image src="https://illustoon.com/photo/5416.png" alt="Image" preview width="250" />
                        <div className="fs-5 company-main-text">Lucid Technologies.inc</div>

                        <div className="fs-6 company-secondary-text">info@lucidtech.com</div>

                        <div className="fs-6 company-secondary-text">8600, freeport Pkwy, STE 300</div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default CompanyProfileCard;
