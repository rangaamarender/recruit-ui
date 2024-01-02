import React from 'react';
import { Button } from 'primereact/button';
// import { AiOutlineDollarCircle } from "react-icons/ai"

const ReviewPayroll = () => {
    return (
        <div>
            {/* content1 */}

            <div className="">
                <div className="fs-5 fw-bold">Pay Submit</div>
                <div className="p-text-secondary">
                    Please spend a brief moment reviwing this numbers, time off and addition earning
                </div>
            </div>

            {/* content2 */}
            <div className="d-flex justify-content-between">
                <div className="p-3 d-flex">
                    <div className="card d-flex p-3 justify-content-between">
                        <div className="d-flex gap-4 justify-content-between">
                            {/* <div className='fw-bold'><span className='fs-5'><AiOutlineDollarCircle /></span>Amount will debited from your</div> */}
                            <div className="fw-bold">
                                <span className="fs-5"></span>Amount will debited from your
                            </div>
                            <div>
                                <Button label="Master Card" size='small' />
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="fs-5 fw-bold">$157,983.07</div>
                            <div>on may 10th and 22 employees will be paid 1st jun</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="m-auto mt-3">
                        {/* <img src="https://cdni.iconscout.com/illustration/premium/thumb/payroll-3540224-2966952.png?f=webp" alt="runpayroll" style={{ height: "150px", width: "300px" }} /> */}
                    </div>
                </div>
            </div>
            {/* content3 */}
            <div className="row justify-content-center align-items-center">
                <div className="col-7 border-end">
                    <div className="row p-3 d-flex align-items-center fw-bold">Detail Payment</div>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="">Total wages net</div>
                        <div className='fw-bold'>$124,120.00</div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="">Total Company Taxes</div>
                        <div className='fw-bold'>$1530.00</div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="">Total Reimbursement</div>
                        <div className='fw-bold'>$40.00</div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="">Total Company Benefit</div>
                        <div className='fw-bold'>$32053.07</div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <div className="">Total Payroll</div>
                        <div className='fw-bold'>$157983.07</div>
                    </div>
                </div>
                <div className="col-5 d-flex flex-column justify-content-center align-items-center p-5 mt-5">
                    <div className="fw-bold">Run Payroll Summary</div>
                    <div className="mt-1">
                        <Button label="View Full Summary" size="small" text />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPayroll;
