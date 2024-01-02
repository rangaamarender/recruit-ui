import React, { useEffect, useState } from 'react';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveContracts } from '../../../../../redux/actions/workOrderActions';

function ContractsWoCreateFirstStep({ control, errors, setValue }) {
    const contracts = useSelector((state) => state.workOrder.activeContracts);
    const dispatch = useDispatch();
    const [selectedContract, setSelectedContract] = useState(null);
    const [selectedBillingDetails, setSelectedBillingDetails] = useState(null);

    let required = false;

    useEffect(() => {
        dispatch(fetchActiveContracts());
    }, [dispatch]);

    console.log(selectedContract, '90001');
    console.log(selectedBillingDetails, '90001-billd');

    return (
        <div className="p-fluid mb-6">
            <h4 className="fw-bold text-center">Work Order</h4>
            <div className="fw-bold text-center">Master Service Agreement(MSA)</div>
            <div className="flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    autoFocus
                    name="selectedMsa"
                    labelId="Contract MSA"
                    options={contracts.map((data) => ({
                        value: data.contractID,
                        label: data.contractName,
                    }))}
                    onChange={(e) => {
                        setValue('selectedMsa', e.target.value);
                        const selectedContract = contracts.find((contract) => contract.contractID === e.target.value);
                        setSelectedContract(selectedContract);
                    }}
                    required={required}
                    requiredMsg="workOrderNameRate.required"
                    placeholder="Selected MSA Type"
                    className="md:col-11"
                />
            </div>
            {selectedContract && (
                <div className="mt-2">
                    {/* Display selected contract information */}
                    <div className="flex mb-5">
                        <div className="col-sm-12 col-md-4 mb-1">
                            <div className="p-text-primary">Organization Name</div>
                            <div className="p-text-secondary">{selectedContract.relatedOrg.name}</div>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <div className="p-text-primary">EIN</div>
                            <div className="p-text-secondary">{selectedContract.relatedOrg.taxId}</div>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <div className="p-text-primary">Web Address</div>
                            <div className="p-text-secondary">{selectedContract.relatedOrg.orgDomains[0].domain}</div>
                        </div>
                    </div>
                    {/* Add other details as needed */}
                    <div className="flex">
                        <div className="col-sm-12 col-md-4 mb-1">
                            <div className="p-text-primary">Email ID</div>
                            <div className="p-text-secondary">
                                {selectedContract.relatedOrg.orgCommunications[0].authSignataryEmail}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <div className="p-text-primary">Phone Number</div>
                            <div className="p-text-secondary">
                                {selectedContract.relatedOrg.orgCommunications[0].authSignataryPhone}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <div className="p-text-primary">Fax</div>
                            <div className="p-text-secondary">{selectedContract.relatedOrg.fax}</div>
                        </div>
                    </div>
                </div>
            )}
            <hr />
            <div>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="discountType"
                    labelId="Contract Terms"
                    options={selectedContract?.contractAccounts.map((data) => ({
                        value: data.contractAccountId,
                        label: data.contractAccountName,
                    }))}
                    onChange={(e) => {
                        setValue('discountType', e.target.value);
                        const billingDetails = selectedContract.contractAccounts.find(
                            (contract) => contract.contractAccountId === e.target.value
                        );
                        setSelectedBillingDetails(billingDetails);
                    }}
                    requiredMsg="email"
                    required={required}
                    placeholder="Select Contract Terms"
                    className="md:col-6 col-12"
                />
            </div>

            {selectedContract?.contractAccounts && (
                <div className="flex gap-5">
                    <div className="border p-2">
                        <div className="fs-6 font-bold">Billing Details</div>

                        <div>
                            Billing Frequency : {selectedBillingDetails?.contractBillingDetails[0].billPeriodUnits}
                        </div>
                        <div>Billing Period Units : {selectedBillingDetails?.contractBillingDetails[0].billPeriod}</div>
                        <div>Billing Cycle : {selectedBillingDetails?.contractBillingDetails[0].billCycle}</div>
                    </div>
                    <div className="border p-2">
                        <div className="fs-6 font-bold">Price Details</div>
                        <div>Name : {selectedBillingDetails?.contractBillingDetails[0].billPeriodUnits}</div>
                        <div>Type : {selectedBillingDetails?.contractBillingDetails[0].billCycle}</div>
                        <div>Amount: {selectedBillingDetails?.contractBillingDetails[0].billPeriodUnits}</div>
                        <div>Start Date {selectedBillingDetails?.contractBillingDetails[0].billPeriodUnits}</div>
                        <div>End Date {selectedBillingDetails?.contractBillingDetails[0].billPeriodUnits}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContractsWoCreateFirstStep;
