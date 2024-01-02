import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';
import WidgetHeader from './WidgetHeader';
import companyCardImg from '../../../assets/images/companyCardImg.png';

const CompanyProfileCard = (prop) => {
    return (
        <>
            <Card className="custom-card p-3" header={<WidgetHeader heading="Company Profile" />}>
                <div className="w-100 flex justify-content-center ">
                    <img width={145} alt='companyImg' className="img-fluid" src={companyCardImg} />
                </div>

                <div className="flex flex-column h-100 ">
                    <div className="text-center">
                        <div className="fs-5 company-main-text"> {prop.companyName} </div>

                        <div className="fs-6 company-secondary-text"> {prop.mailId} </div>

                        <div className="fs-6 company-secondary-text"> {prop.Address} </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-content-center ">
                    <Button label={prop.footerButton} text   />
                </div>
            </Card>
        </>
    );
};

export default CompanyProfileCard;
