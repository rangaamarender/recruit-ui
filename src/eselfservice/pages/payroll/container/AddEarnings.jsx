import { Button } from 'primereact/button';
import React from 'react'
import { useForm } from 'react-hook-form';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { useState } from 'react';
import { useRef } from 'react';

function AddEarnings() {

    const toast = useRef()
    const required = false

    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    const [sidebarVisible, setSidebarVisible] = useState(false);




    const onSubmit = (data) => {
        // setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Bank Information updated successfully!',
        });
    };

    const handleClearForm = () => {
        reset();
      };

      const handleCancel = () => {
       setSidebarVisible(false)
       reset()
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formgrid grid p-3">
                <div className="col-12 md:col-12">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="earning1"
                        labelId="Earning 1"
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
                        name="type"
                        labelId="Type"
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
                        name="hours"
                        labelId="Hours"
                        defaultValue={"---"}
                        placeholder=""
                        required={required}
                        requiredMsg=""
                    />
                </div>
                <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3'>
                    <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancel} />
                    <Button type="submit" severity='primary' label='Create' size='small' className="ms-2 me-2" />
                </div>
            </div>
        </form>
    )
}

export default AddEarnings