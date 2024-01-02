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


function PayProfile({ setActive }) {
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
        // setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Pay profile updated successfully!',
        });
    };

    const handleEdit = () => {
        setIsEdit(true);
        // setActive('all')

    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        // setActive("all")
    };

    const handleOnHide = () => {

        setIsEdit(false);
        // setActive("all")
    }

    return (
        <>
            <>

                <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className='name-view-heading'>Pay Profile</div>
                    {!isEdit && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    )}

                </div>

                <div className="formgrid grid m-2">
                    <div className="col-12 md:col-4">
                        <label className='p-text-secondary'>Pay rate</label>
                        <p className="p-text-primary mb-0 ">{"$ 40.000"}</p>
                        <p className='p-text-secondary'>*Added on 10/20/2023</p>
                    </div>
                    <div className="col-12 md:col-4 mb-2">
                        <label className='p-text-secondary'>Pay type</label>
                        <p className="p-text-primary">{"Hourly"}</p>
                    </div>
                    <div className="col-12 md:col-4">
                        <label className='p-text-secondary'>Employment type</label>
                        <p className="p-text-primary">{"Full time"}</p>
                    </div>
                    <div className="col-12 md:col-4">
                        <label className='p-text-secondary'>Department</label>
                        <p className="p-text-primary">{"LTI-Lucid Technologies inc"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Basis of pay</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Pay schedule</label>
                        <p className="p-text-primary">{"Semi-Monthly"}</p>
                    </div>
                    <div className="col-12 md:col-4">
                        <label className='p-text-secondary'>Standard hours per pay period</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>

                    <div className="col-12 md:col-4">
                        <label className='p-text-secondary'>Seasonal employee</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>

                    {/* <div className="col-12 md:col-4">
                            <label className='p-text-secondary'>Hourly pay rate</label>
                            <p className="p-text-primary">{"$ 40.000"}</p>
                        </div>
                        <div className="col-12 md:col-4">
                            <label className='p-text-secondary'>Department</label>
                            <p className="p-text-primary">{"LTI-Lucid Technologies inc"}</p>
                        </div> */}
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
                            title={"Edit Pay Profile"}
                        />
                    }
                    contentComponent={
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3">
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="payRate"
                                        labelId="Pay Rate"
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
                                        name="payType"
                                        labelId="Pay Type"
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
                                        name="employeeType"
                                        labelId="Employee Type"
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
                                        name="department"
                                        labelId="Department"
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
                                        name="basisOfPay"
                                        labelId="Basis of Pay"
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
                                        name="paySchedule"
                                        labelId="Pay Schedule"
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
                                        name="standardHours"
                                        labelId="Standard hours per pay period"
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
                                        name="seasonalEmployee"
                                        labelId="seasonalEmployee"
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

export default PayProfile