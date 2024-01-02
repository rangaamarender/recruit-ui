import { Button } from 'primereact/button';
import React from 'react'
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { Toast } from 'primereact/toast';
import { RiPencilFill } from 'react-icons/ri';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomDropdown from '../../../../components/controls/CustomDropdown';


function StateTaxInformation({ setActive }) {
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
            detail: 'State Tax Info updated successfully!',
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
                    <div className='name-view-heading'>State Tax Info</div>
                    {!isEdit && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    )}

                </div>
                <div className="formgrid grid m-2 ">
                    <div className="col-12 md:col-4 mb-2">
                        <label className='p-text-secondary'>State where the employee lives</label>
                        <p className="p-text-primary">{"Texas"}</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Does the employee work in the state where they live?</label>
                        <p className="p-text-primary">---</p>
                    </div>
                    <div className="col-12 md:col-4  mb-2">
                        <label className='p-text-secondary'>Is this employee exempt from any state taxes?</label>
                        <p className="p-text-primary">---</p>
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
                            title={"Edit State Tax Info"}
                        />
                    }
                    contentComponent={
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3">
                                <div className="col-12 md:col-12">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="state"
                                        labelId="State where the employee lives"
                                        defaultValue=""
                                        options={options}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-12">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="stateWhereLive"
                                        labelId="Does the employee work in the state where they live? "
                                        defaultValue=""
                                        options={options}
                                        placeholder=""
                                        required={required}
                                        requiredMsg=""
                                    />
                                </div>
                                <div className="col-12 md:col-12">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="stateTaxExempt"
                                        labelId="Is this employee exempt from any state taxes?"
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

export default StateTaxInformation