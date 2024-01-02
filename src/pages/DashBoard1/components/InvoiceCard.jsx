import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import WidgetHeader from './WidgetHeader';

const InvoiceCard = (prop) => {
    const cardFooter = (
        <div className="flex  justify-content-end align-items-center gap-2 mt-4">
            <Button label={prop.footerButton1} severity="Secondary" size="small" />
            <Button label={prop.footerButton2} severity="warning" size="small" />
        </div>
    );
    return (
        <>
            <Card
                className="custom-card p-3"
                header={<WidgetHeader heading="Quick Invoice" type="button" buttonLabel="Add" icon="pi pi-plus" />}
                footer={cardFooter}
            >
                <div className="row g-2">
                    <div className="col-md-6   col-sm-12">
                        <InputText placeholder="Customer Name" className="w-100 p-inputtext-sm" />
                    </div>
                    <div className="col-md-6 col-sm-12 ">
                        <InputText placeholder=" Customer Email " className="w-100 p-inputtext-sm" />
                    </div>
                </div>

                <InputText className="w-100 mt-2 p-inputtext-sm" placeholder="Customer Address " />
                <div className="mt-5">
                    <div className="flex  align-items-center  justify-content-between">
                        <div className="fw-bold">Sub Total:</div>
                        <div className="fw-bold">$4995.00</div>
                    </div>
                    <div className="flex  align-items-center  justify-content-between">
                        <div className=" fw-bold">Estimated Tax.(12%)</div>
                        <div className=" fw-bold">$625.89</div>
                    </div>
                    <div className="flex  align-items-center  justify-content-between">
                        <div className=" fw-bold">Discount</div>
                        <div className=" fw-bold">$100</div>
                    </div>
                    <Divider type="dashed" />
                    <div className="flex  align-items-center  justify-content-between">
                        <div className=" fw-bold fs-5">Grand Total</div>
                        <div className=" fw-bold fs-5">$5519.38</div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default InvoiceCard;
