import React from 'react'
import CustomDropdown from '../../../../components/controls/CustomDropdown'
import CustomInputText from '../../../../components/controls/CustomInputText'
import CustomEditor from '../../../../components/controls/CustomEditor';
import CustomCalender from '../../../../components/controls/CustomCalender';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';

function AddEarningsDecuctions({addSidebarVisible}) {
    const required = false

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();


    const categoryOptions = [
        { value: 'earnings', label: 'Earnings' },
        { value: 'deductions', label: 'Deductions' }
    ];
    const typeOptions = [
        { value: 'fixed', label: 'Fixed' },
        { value: 'variable', label: 'Variable' }
    ];
    const frequencyOptions = [
        { value: 'hourly', label: 'Hourly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
        
    ];

    const onSubmit = () => {
        // setActive("all")

        // toast.current.show({
        //     severity: 'success',
        //     summary: 'Success Message',
        //     detail: 'Deduction Added successfully',
        // });
    };

   

      const handleCancel = () => {
        addSidebarVisible(false)
       reset()
    };

    return (
        <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
             <h5 className='ps-3 mt-2'>Earnings & Deductions</h5>
            <div className="formgrid grid p-3">
               
                <div className="col-12 md:col-6">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="category"
                        labelId="Category"
                        defaultValue=""
                        options={categoryOptions}
                        required={required}
                        placeholder=""
                        requiredMsg=""
                    />
                </div>
                <div className="col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="name"
                        labelId="Name"
                        defaultValue={"---"}
                        placeholder=""
                        required={required}
                        requiredMsg=""
                    />
                </div>
                <div className="col-12 md:col-12">
                    <CustomEditor
                        control={control}
                        errors={errors}
                        name="description"
                        labelId="description.label"
                        style={{ height: "150px" }}
                        onTextChange={(e) => setValue("description", e.htmlValue)}
                    />
                </div >
                <div className="col-12 md:col-4">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="type"
                        labelId="Type"
                        defaultValue=""
                        options={typeOptions}
                        required={required}
                        placeholder=""
                        requiredMsg=""
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="rate"
                        labelId="Rate"
                        defaultValue={"---"}
                        placeholder=""
                        required={required}
                        requiredMsg=""
                    />
                </div>


                <div className="col-12 md:col-4">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="frequency"
                        labelId="Frequency"
                        defaultValue=""
                        options={frequencyOptions}
                        required={required}
                        placeholder=""
                        requiredMsg=""
                    />
                </div>
                <div className="col-12 md:col-6 mb-6">
                    <CustomCalender
                        control={control}
                        errors={errors}
                        name="startDate"
                        labelId="startDate.label"
                        required={required}
                        requiredMsg='startDate.required'
                        showIcon={true}
                    />
                </div>
                <div className="col-12 md:col-6 mb-6">
                    <CustomCalender
                        control={control}
                        errors={errors}
                        name="endDate"
                        labelId="endDate.label"
                        required={required}
                        requiredMsg='endDate.required'
                        showIcon={true}
                    />
                </div>
                <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3 h-custom-10'>
                    <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancel} />
                    <Button type="submit" severity='primary' label='Create' size='small' className="ms-2 me-2" />
                </div>
            </div>
        </form>
        </div>
    )
}

export default AddEarningsDecuctions