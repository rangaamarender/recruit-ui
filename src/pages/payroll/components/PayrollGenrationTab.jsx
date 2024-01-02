import React from 'react';

import LastPayrollChart from '../config/payrollDashBoard/LastPayrollChart';
import UpcomingPayroll from '../config/payrollDashBoard/UpcomingPayroll';
import PayrollTaxes from '../config/payrollDashBoard/PayrollTaxes';
import PayReport from '../config/payrollDashBoard/PayReport';
import PayrollFirstContainer from '../config/payrollDashBoard/PayrollFirstContainer';

const PayrollGenrationTab = () => {
    return (
        <>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-12">
                                <div className="">
                                    <PayrollFirstContainer />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card mt-4">
                                    <UpcomingPayroll />
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="row flex">
                                    <div className="col-6 col-md-6">
                                        <div className="card">
                                            <PayReport />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="card">
                                            <PayReport />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="">
                            <LastPayrollChart />
                        </div>
                        <div className="card mt-3">
                            <PayrollTaxes />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayrollGenrationTab;
