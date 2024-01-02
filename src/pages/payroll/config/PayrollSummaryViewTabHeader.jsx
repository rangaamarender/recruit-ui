import React from 'react'
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const PayrollSummaryViewTabHeader = () => {
  return (
    <div>
        <div className="company-layout-bg m-0 d-flex justify-content-between align-items-center gap-3 p-0  ">
            <div className="d-flex justify-content-start align-items-center gap-3">
              <Avatar size="xlarge" shape="circle">
                <i className="pi pi-shopping-bag fs-3"></i>
              </Avatar>
              <div className="">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <div className="company-main-text p-0 fs-6 fw-bold mb-0 mr-2">
                    Abhishek pulluri
                  </div>
                </div>

                <div className=" d-flex justify-content-start align-items-center gap-3 mt-2">
                  <Button
                    text
                    label="PAID"
                    className="bg-white company-secondary-text w-auto p-1"
                  />
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default PayrollSummaryViewTabHeader