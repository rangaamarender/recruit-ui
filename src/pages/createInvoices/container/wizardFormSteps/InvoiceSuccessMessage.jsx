import React from "react";
import { Button } from "primereact/button";
import checkSuccessIcon from "../../../../assets/images/checkSuccessIcon.svg";

const InvoiceSuccessMessage = ({ onViewInvoice, onSendInvoice, onDownloadInvoice }) => {
  return (
    <div className="text-center mt-4 fixed right-0 w-75 viewer-with-footer-body overflow-y-auto">
      <img src={checkSuccessIcon} className='cursor-pointer mb-4' alt="Company Logo" />
      <h3>Invoice created successfully!</h3>
      <p>
        Your invoice Created Successfully, Now you can Preview, <br /> download and send it directly to your client
      </p>
      <div className="mt-3">
        <Button type="button" severity='secondary' icon='pi pi-eye' label='Preview' size='small' className="me-3" onClick={onViewInvoice} />
        <Button type="button" severity='secondary' icon='pi pi-arrow-down' label='Download' size='small' className="" onClick={onDownloadInvoice} />
      </div>
      <div className="mt-3">
        <Button type="button" severity='' icon='' label='Send Invoice' size='small' className="" onClick={onSendInvoice} />
      </div>
    </div>
  );
};

export default InvoiceSuccessMessage;
