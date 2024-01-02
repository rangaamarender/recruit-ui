import { Button } from 'primereact/button';
import React from 'react'
import CustomInputText from '../../../../components/controls/CustomInputText';
import Viewer from '../../../../components/viewers/Viewer';
import { RiPencilFill } from 'react-icons/ri';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';

function EmergencyContact({ setActive }) {

    const toast = useRef(null);
    const required = false


    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);


    const onSubmit = (data) => {
        setIsEdit(false);
        setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Emergency Contact updated successfully!',
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
            <div className='rounded border p-2'>

                <div className="text-end">
                    {!isEdit && (
                        <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                    )}
                </div>
                <div className="formgrid grid mt-2 mb-2 ">
                    <div className="col-12 md:col-4 mb-2">
                        <label className='p-text-secondary'>Name</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Relation</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Work Phone</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>


                    <div className="col-12 md:col-4  ">
                        <label className='p-text-secondary'>Mobile</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>
                    <div className="col-12 md:col-4  ">
                        <label className='p-text-secondary'>Home Phone</label>
                        <p className="p-text-primary">{"---"}</p>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
            {isEdit && (
                <Viewer
                    visible={isEdit}
                    onHide={handleOnHide}
                    header={
                        <TitleHeaderOnly
                            onClick={handleOnHide}
                            title={"Edit Emergency Contact"}
                        />
                    }
                    contentComponent={
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3">
                                <div className="col-12 md:col-12">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="name"
                                        labelId="Name"
                                        placeholder="Name"
                                        defaultValue={"---"}
                                        autoFocus
                                        required={required}
                                        requiredMsg="Name is required"

                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="relation"
                                        labelId="Relation"
                                        defaultValue={"---"}
                                        placeholder=""
                                        required={required}
                                        requiredMsg="Relation is required"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputPhoneNbr
                                        control={control}
                                        errors={errors}
                                        name="workPhone"
                                        labelId="Work Phone"
                                        maskFormat="(999) 999-9999"
                                        defaultValue=""
                                        required={required}
                                        requiredMsg="Work Phone is required"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputPhoneNbr
                                        control={control}
                                        errors={errors}
                                        name="mobile"
                                        labelId="Mobile"
                                        maskFormat="(999) 999-9999"
                                        defaultValue=""
                                        required={required}
                                        requiredMsg="Mobile is required"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputPhoneNbr
                                        control={control}
                                        errors={errors}
                                        name="homwPhone"
                                        labelId="Home Phone"
                                        maskFormat="(999) 999-9999"
                                        defaultValue=""
                                        required={required}
                                        requiredMsg="Home Phone is required"
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

export default EmergencyContact