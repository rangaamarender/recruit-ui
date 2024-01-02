import { Button } from 'primereact/button';
import React from 'react'
import CustomInputText from '../../../../components/controls/CustomInputText';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { Toast } from 'primereact/toast';
import { RiPencilFill } from 'react-icons/ri';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomDropdown from '../../../../components/controls/CustomDropdown';


function FederalTaxInformation({ setActive }) {
    const toast = useRef(null);
    const required = false


    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);

    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    const onSubmit = (data) => {
        setIsEdit(false);
        setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Federal Tax Info updated successfully!',
        });
    };

    const handleEdit = () => {
        setIsEdit(true);
        setActive('all')

    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("all")
    };

    const handleOnHide = () => {

        setIsEdit(false);
        setActive("all")
    }

    return (
        <>
            <>

                <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className='name-view-heading'>Federal Tax Info</div>
                    {!isEdit && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    )}

                </div>
                <div className="formgrid grid m-2 ">
                    <div className="col-12 md:col-4 mb-2">
                        <label className='p-text-secondary'>Which W-4 does Employee has?</label>
                        <p className="p-text-primary">{"Previous W-4"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>WithHolding status (line 3)</label>
                        <p className="p-text-primary">{"Single"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Total number of allowances (line 5)</label>
                        <p className="p-text-primary">{"2"}</p>
                    </div>


                    <div className="col-12 md:col-4  ">
                        <label className='p-text-secondary'>Additional withHold (line 6)</label>
                        <p className="p-text-primary">{"None"}</p>
                    </div>
                    <div className="col-12 md:col-4  ">
                        <label className='p-text-secondary'>Amount</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>
                    <div className="col-12 md:col-4  ">
                        <label className='p-text-secondary'>Exempt from withHold (line 7)</label>
                        <p className="p-text-primary">{"Not exempt"}</p>
                    </div>
                </div>
            </>
            <Toast ref={toast} />
            {isEdit && (
                <Viewer
                    visible={isEdit}
                    onHide={handleOnHide}
                    header={
                        <TitleHeaderOnly
                            onClick={handleOnHide}
                            title={"Edit Federal Tax Info"}
                        />
                    }
                    contentComponent={
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3">
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="WhichW4"
                                        labelId="Which W-4 does Employee has?"
                                        defaultValue=""
                                        options={options}
                                        required={required}
                                        placeholder=""
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="withHoldStatus"
                                        labelId="WithHolding status (line 3)"
                                        defaultValue=""
                                        options={options}
                                        required={required}
                                        placeholder=""
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="noOfAllowances"
                                        labelId="Total number of allowances (line 5)"
                                        defaultValue={"---"}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="AdditionalWithHold"
                                        labelId="Additional withHold (line 6)"
                                        defaultValue=""
                                        options={options}
                                        required={required}
                                        placeholder=""
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="amount"
                                        labelId="Enter Amount"
                                        defaultValue={"---"}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="exemptFromWithHold"
                                        labelId="Exempt from withHold (line 7)"
                                        defaultValue=""
                                        options={options}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="earnedIncomeCredit"
                                        labelId="Earned income credit (EIC) (reference from 8862, if provided)"
                                        defaultValue=""
                                        options={options}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="exemptFromFederalTax"
                                        labelId="Is this employee exempt from federal tax?"
                                        defaultValue=""
                                        options={options}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>


                                <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3'>
                                    <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancelEdit} />
                                    <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
                                </div>
                            </div>
                        </form>
                    }
                />
            )}

        </>
    )
}

export default FederalTaxInformation