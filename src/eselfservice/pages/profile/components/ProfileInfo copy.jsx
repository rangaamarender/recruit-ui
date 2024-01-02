import React, { useEffect, useRef, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri'
import personalInformation from "./../../../../assets/__mockData__/personalInformation.json"
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from "../../../../components/controls/CustomInputText"
import CustomCalender from "../../../../components/controls/CustomCalender"
import CustomInputMask from "../../../../components/controls/CustomInputMask"
import { Toast } from 'primereact/toast';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceByIdRequest } from '../../../../redux/actions/resourceActions';

function ProfileInfo({ active, setActive }) {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);

    useEffect(() => {
        const workerID = '4aee8ffe-b29d-4e89-b925-6a68d49a09c5'; // Your specific workerID

        // Dispatch action to fetch resource by workerID
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);


    console.log(selectedResource)


    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);

    const onSubmit = (data) => {
        setIsEdit(false);
        setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Profile information updated successfully!',
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

    const { personalDetails } = personalInformation;

    return (
        <>
            <div className=''>
                <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className='name-view-heading'>Profile Info</div>
                    {!isEdit && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    )}

                </div>
                <Toast ref={toast} />

                {isEdit && (
                    <Viewer
                        visible={isEdit}
                        onHide={handleCancelEdit}
                        header={
                            <TitleHeaderOnly
                                onClick={handleCancelEdit}
                                title={"Edit Profile Info"}
                            />
                        }
                        contentComponent={
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formgrid grid p-3">
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="firstName"
                                            labelId="First Name"
                                            placeholder="Firsty name"
                                            defaultValue={personalDetails.firstName}
                                            autoFocus
                                            required={true}
                                            requiredMsg="first name is required"

                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="lastName"
                                            labelId="Last Name"
                                            defaultValue={personalDetails.lastName}
                                            placeholder="Last name"
                                            required={true}
                                            requiredMsg="abc"
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="displayName"
                                            labelId="Display Name"
                                            defaultValue={personalDetails.displayName}
                                            placeholder="Display name"
                                            required={true}
                                            requiredMsg="bbn"
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="primaryEmail"
                                            labelId="Primary Email ID"
                                            defaultValue={personalDetails.primaryEmailID}
                                            disabled
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomCalender
                                            control={control}
                                            errors={errors}
                                            name="dob"
                                            labelId="DOB"
                                            showIcon={true}
                                            placeholder="YYYY-MM-DD"
                                            defaultValue={personalDetails.DOB}
                                            required={true}
                                            requiredMsg="nmm"
                                        />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <CustomInputMask
                                            control={control}
                                            errors={errors}
                                            name="ssnNumber"
                                            labelId="SSN "
                                            mask="999-99-9999"
                                            defaultValue={personalDetails.SSN}
                                            disabled
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

                {!isEdit && (
                    <>
                        <div className="formgrid grid m-2">
                            <div className="col-12 md:col-6 mb-2">
                                <label className='p-text-secondary'>First Name</label>
                                <p className="p-text-primary">{selectedResource.personLegal.givenName}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Last Name</label>
                                <p className="p-text-primary">{selectedResource.personLegal.familyName}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Display Name</label>
                                <p className="p-text-primary">{selectedResource.personLegal.displayName}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Primary Email ID</label>
                                <p className="p-text-primary">
                                    {selectedResource.primaryContactDetails &&
                                        selectedResource.primaryContactDetails[0]?.emailId}
                                </p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>DOB</label>
                                <p className="p-text-primary">{selectedResource.personLegal.birthDate}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>SSN</label>
                                <p className="p-text-primary">{""}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>DL Number</label>
                                <p className="p-text-primary">{""}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>License-Exp</label>
                                <p className="p-text-primary">{""}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Start Date</label>
                                <p className="p-text-primary">{ }</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Gender</label>
                                <p className="p-text-primary">{selectedResource.gender}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Marital Status</label>
                                <p className="p-text-primary">{selectedResource.maritalStatus}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Employee Type</label>
                                <p className="p-text-primary">{selectedResource.workerType.workerTypeCode}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Current Status</label>
                                <p className="p-text-primary">{selectedResource.workerStatus.status}</p>
                            </div>
                            <div className="col-12 md:col-6  mb-2">
                                <label className='p-text-secondary'>Invoice Cycle</label>
                                <p className="p-text-primary">{""}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default ProfileInfo