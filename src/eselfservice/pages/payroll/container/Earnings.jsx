import React, { useRef, useState } from 'react'
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import addBankInformationSteps from '../../bankInformation/config/addBankInformationSteps';
import WizardComponent from '../../../../components/viewers/WizardComponent';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import AddEarnings from './AddEarnings';

function Earnings() {


    const toast = useRef()
    const required = false

    const { control, handleSubmit, formState: { errors } } = useForm();
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    const [sidebarVisible, setSidebarVisible] = useState(false);


    const [isEdit, setIsEdit] = useState(false);


    const onSubmit = (data) => {
        setIsEdit(false);
        // setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Bank Information updated successfully!',
        });
    };


    const handleEditAccount = () => {
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    const addEmergencyContactActionHandler = () => {
        setSidebarVisible(true);
    };

    const closeemergencyContactActionHandler = () => {
        setSidebarVisible(false);
    };



const handleOnHide = ()=>{
    setSidebarVisible(false);
}










    return (
        <>

            <Viewer
                visible={sidebarVisible}
                onHide={handleOnHide}
                header={
                    <TitleHeaderOnly
                        onClick={handleOnHide}
                        title={"Create Earnings"}
                   
                    />
                }
                contentComponent={<AddEarnings />}
            />
            <Toast ref={toast} />
            <div>
                {/* accounts */}

                <div className="company-main-text fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
                    <h5>Earnings</h5>
                    <div>
                        <Button
                            label="Add Earning"
                            severity="primary"
                            icon="pi pi-plus"
                            onClick={addEmergencyContactActionHandler}
                            size="small"
                        />
                    </div>
                </div>

                {/* Map over the earningsData array to display account information */}


                {isEdit && (
                    <Viewer
                        visible={isEdit}
                        onHide={handleCancelEdit}
                        header={
                            <TitleHeaderOnly
                                onClick={handleCancelEdit}
                                title={"Edit Bank Information"}
                            />
                        }
                        contentComponent={
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
                                        <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancelEdit} />
                                        <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
                                    </div>
                                </div>
                            </form>
                        }
                    />
                )}



                <div className="rounded border p-2">
                    <div className="formgrid grid mt-2 mb-2">

                        <div className="col-12 md:col-4 ">
                            <label className='p-text-secondary'>Earning 1</label>
                            <p className="p-text-primary">{"Overtime"}</p>
                        </div>
                        <div className="col-12 md:col-4 ">
                            <label className='p-text-secondary'>Type</label>
                            <p className="p-text-primary">{"Hourly"}</p>
                        </div>
                        <div className="col-12 md:col-4 ">
                            <label className='p-text-secondary'>Hours</label>
                            <p className="p-text-primary">{"10"}</p>
                        </div>

                    </div>
                </div>
            </div>

        </ >
    )
}

export default Earnings
