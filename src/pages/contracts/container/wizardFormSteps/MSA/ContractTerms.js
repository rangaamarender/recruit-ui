import React, { useState } from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import TitleHeaderOnly from '../../../../../components/header/TitleHeaderOnly';
import CustomCalander from '../../../../../components/controls/CustomCalender';
import CustomCheckbox from '../../../../../components/controls/CustomCheckbox';
import { createContractRequest } from '../../../../../redux/actions/contractActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ContractTerms = ({ control, errors, data, setValue }) => {
    const required = true;
    const apierr = useSelector((state) => state.contract.error);

    const [priceData, setPriceData] = useState([]);
    const [priceDataEdit, setPriceDataEdit] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const dispatch = useDispatch();
    const billpayUnits = [
        { value: 'WEEKLY', label: 'Weekly' },
        { value: 'MONTHLY', label: 'Monthly' },
    ];

    const priceTypeOptions = [
        { value: 'PERCENTAGE', label: 'Percantage' },
        { value: 'MONETARY', label: 'Flat Rate' },
    ];

    const weeklyBillCycle = [
        { value: 1, label: 'Sunday' },
        { value: 2, label: 'Monday' },
        { value: 3, label: 'Tuesday' },
        { value: 4, label: 'Wednesday' },
        { value: 5, label: 'Thursday' },
        { value: 6, label: 'Friday' },
        { value: 7, label: 'Saturday' },
    ];

    const monthlyBillCycle = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' },
        { value: '13', label: '13' },
        { value: '14', label: '14' },
        { value: '15', label: '15' },
        { value: '16', label: '16' },
        { value: '17', label: '17' },
        { value: '18', label: '18' },
        { value: '19', label: '19' },
        { value: '20', label: '20' },
        { value: '21', label: '21' },
        { value: '22', label: '22' },
        { value: '23', label: '23' },
        { value: '24', label: '24' },
        { value: '25', label: '25' },
        { value: '26', label: '26' },
        { value: '27', label: '27' },
        { value: '28', label: '28' },
    ];

    const handleAddPriceDetails = () => {
        setVisibleRight(true);
        setValue('priceStartDate', data.startDate);
    };

    const handleSidebarClose = () => {
        setVisibleRight(false);
        setPriceDataEdit(false);
        setValue('discountName', '');
        setValue('priceStartDate', '');
        setValue('priceEndDate', '');
        setValue('netChargeBoo', '');
        setValue('discountType', '');
        setValue('amount', '');
    };

    const handlePriceSubmit = () => {
        const formattedStartDate = data.priceStartDate ? moment(data.priceStartDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = data.priceEndDate ? moment(data.priceEndDate).format('YY-MM-DD') : null;

        const contractDiscounts = {
            discountName: data.discountName,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            netChargeBoo: data.netChargeBoo,
            priority: 1,
            discountStep: [
                {
                    stepThreshold: 0,
                    discountPct: data.discountType === 'PERCENTAGE' ? data.amount : null,
                    discountAmount: data.discountType === 'MONETARY' ? data.amount : null,
                    discountType: data.discountType,
                },
            ],
        };
        setPriceData([...priceData, contractDiscounts]);
    };

    // const handlePriceEdit = () => {
    //     setVisibleRight(true);
    //     setPriceDataEdit(true);
    //     // prepoplate the data
    // };

    const handlePriceEdit = (index) => {
        const selectedPriceData = priceData[index];

        // Prepopulate the form fields with the selected data
        setValue('discountName', selectedPriceData.discountName);
        setValue('priceStartDate', selectedPriceData.startDate);
        setValue('priceEndDate', selectedPriceData.endDate);
        setValue('netChargeBoo', selectedPriceData.netChargeBoo);
        setValue('discountType', selectedPriceData.discountStep[0].discountType);
        setValue(
            'amount',
            selectedPriceData.discountStep[0].discountPct || selectedPriceData.discountStep[0].discountAmount
        );

        setVisibleRight(true);
        setPriceDataEdit(true);
    };

    // const handlePriceUpdate = () => {
    //     setVisibleRight(false);
    //     setPriceDataEdit(false);
    //     // update the priceData
    // };

    // const handlePriceUpdate = () => {
    // // Update the priceData with the edited data
    // const updatedPriceData = [...priceData];
    // const editedPriceIndex = /* your logic to get the index of the edited item */;

    // updatedPriceData[editedPriceIndex] = {
    //     discountName: data.discountName,
    //     startDate: data.priceStartDate,
    //     endDate: data.priceEndDate,
    //     netChargeBoo: data.netChargeBoo,
    //     priority: 1,
    //     discountStep: [
    //         {
    //             stepThreshold: 0,
    //             discountPct: data.discountType === 'PERCENTAGE' ? data.amount : null,
    //             discountAmount: data.discountType === 'MONETARY' ? data.amount : null,
    //             discountType: data.discountType,
    //         },
    //     ],
    // };

    const handleFinish = () => {
        const formattedStartDate = data.startDate ? moment(data.startDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = data.endDate ? moment(data.endDate).format('YYYY-MM-DD') : null;
        const data1 = {
            contractName: data.contractName,
            relatedOrg: {
                organizationID: data.organizationID,
            },
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            contractAccounts: [
                {
                    contractAccountName: data.contractAccountName,
                    contractBillingDetails: [
                        {
                            billPeriod: 0,
                            billPeriodUnits: data.billPeriodUnits,
                            billCycle: data.billCycle,
                            paymentDueDays: 0,
                            expensesBillBoo: data.expensesBillBoo,
                        },
                    ],
                },
            ],
            contractDiscounts: [priceData],
        };
        dispatch(createContractRequest({ data1 }));
    };

    return (
        <div>
            <div>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="contractAccountName"
                    required={required}
                    labelId="Contract Term Name"
                    requiredMsg="email"
                    className="col-12"
                />
                <div className="border p-2">
                    <div className="fs-6 font-bold">Billing Details</div>
                    <div className="md:flex ">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="billPeriod"
                            required={required}
                            labelId="Bill Frequency"
                            type="number"
                            requiredMsg="email"
                            className="md:col-4 col-12"
                        />

                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="billPeriodUnits"
                            labelId="Bill Period Units"
                            options={billpayUnits}
                            requiredMsg="email"
                            required={required}
                            placeholder="Select your Bill Period Units"
                            className="md:col-4 col-12"
                            defaultValue="MONTHLY"
                        />
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="billCycle"
                            labelId="Bill Cycle"
                            requiredMsg="email"
                            required={required}
                            options={
                                data.billPeriodUnits === 'WEEKLY'
                                    ? weeklyBillCycle
                                    : data.billPeriodUnits === 'MONTHLY'
                                    ? monthlyBillCycle
                                    : []
                            }
                            placeholder="Select your Bill Cycle"
                            className="md:col-4 col-12"
                        />
                    </div>
                    <div className="md:flex align-items-end">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="paymentDueDays"
                            required={required}
                            labelId="Payment Due Days"
                            type="number"
                            requiredMsg="email"
                            className="md:col-6 col-12"
                        />
                        <CustomCheckbox
                            control={control}
                            errors={errors}
                            required={required}
                            name="expensesBillBoo"
                            requiredMsg="email"
                            className="md:col-6 col-12"
                            labelId="Generate Seperate Bill for Expenses"
                        />
                    </div>
                </div>
            </div>
            <div className="border p-2 mt-3 border-round">
                <div className="flex justify-content-between">
                    <div className="fs-6 font-bold">Price Details</div>
                    <div>
                        <Button icon="pi pi-plus" onClick={handleAddPriceDetails} />
                    </div>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead className="table-light">
                            <th>Name</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </thead>

                        <tbody>
                            {priceData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.discountName}</td>
                                    <td>{data.discountStep[0].discountType}</td>
                                    <td>{data.discountStep[0].discountPct || data.discountStep[0].discountAmount}</td>
                                    <td>{data.startDate}</td>
                                    <td>{data.endDate}</td>
                                    <td>
                                        <i className="pi pi-pencil cursor-pointer" onClick={handlePriceEdit} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Sidebar
                visible={visibleRight}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleSidebarClose}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly
                        title={priceDataEdit ? 'Edit Price Details' : 'Add Price Details'}
                        onClick={handleSidebarClose}
                    />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="discountName"
                        required={required}
                        labelId="Name"
                        requiredMsg="email"
                        className="md:col-12 col-12"
                    />
                    <div className="md:flex">
                        <CustomCalander
                            control={control}
                            required={required}
                            showIcon={true}
                            errors={errors}
                            minDate={data.startDate}
                            className="md:col-6 col-12"
                            name="priceStartDate"
                            labelId="startDate.label"
                            requiredMsg="date.required"
                        />
                        <CustomCalander
                            control={control}
                            required={required}
                            showIcon={true}
                            errors={errors}
                            className="md:col-6 col-12"
                            name="priceEndDate"
                            labelId="endTime.label"
                            requiredMsg="date.required"
                        />
                    </div>
                    <div className="md:flex">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="discountType"
                            labelId="Type"
                            options={priceTypeOptions}
                            requiredMsg="email"
                            required={required}
                            placeholder="Select Price Type"
                            className="md:col-6 col-12"
                        />

                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="amount"
                            required={required}
                            labelId="Amount"
                            type="number"
                            requiredMsg="email"
                            className="md:col-6 col-12"
                        />
                    </div>
                    <div>
                        <CustomCheckbox
                            control={control}
                            errors={errors}
                            required={required}
                            name="netChargeBoo"
                            requiredMsg="email"
                            className="md:col-6 col-12"
                            labelId="Net charge"
                        />
                    </div>
                </div>

                <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button
                            label="Cancel"
                            type="button"
                            severity="secondary"
                            onClick={handleSidebarClose}
                            size="small"
                        />

                        {priceDataEdit ? (
                            <Button label="Update" size="small" />
                        ) : (
                            <Button label="Add" size="small" onClick={handlePriceSubmit} />
                        )}
                    </div>
                </div>
            </Sidebar>
            <button onClick={handleFinish}>finish</button><br/>
            <span className='text-danger'>{apierr}</span>
        </div>
    );
};

export default ContractTerms;
