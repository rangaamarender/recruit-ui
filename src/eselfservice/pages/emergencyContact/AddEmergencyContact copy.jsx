import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../redux/actions/resourceActions';

function AddEmergencyContact({ setSidebarVisable }) {

    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const required = false;

    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);

    useEffect(() => {
        const workerID = '498f5ba2-7bb6-420c-9d4a-49a07a5a96f0';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);


    console.log(selectedResource)


    const onSubmit = (data) => {

        const updatedData = {
            personLegal: { ...selectedResource.personLegal, ...data.personLegal },
        };
        console.log(updatedData,"updatedData")

       
        const updatedResource = { ...selectedResource, ...updatedData };
        dispatch(updateResourceRequest(selectedResource.workerID, updatedResource));

        console.log(updatedResource,"updatedResource")
        

    }



    // const onSubmit = () => {

    //     // toast.current.show({
    //     //     severity: 'success',
    //     //     summary: 'Success Message',
    //     //     detail: 'Deduction Added successfully',
    //     // });
    // };



    const handleCancel = () => {
        setSidebarVisable(false)
        reset()
    };


    return (
        <>
            <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='ps-2 mt-2'>Emergency Contact</h5>
                    <div class="formgrid grid mb-6 p-2">
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personEmergencyContact.firstName"
                                labelId="firstName.label"
                                // defaultValue={selectedResource?.personEmergencyContact?.firstName}
                                defaultValue={selectedResource?.personLegal?.personEmergencyContact.map((item) => item.firstName) || null}
                                required={required}
                                requiredMsg="name.required"
                                placeholder=""
                                autoFocus
                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personEmergencyContact.lastName"
                                labelId="lastName.label"
                                // defaultValue={selectedResource?.personEmergencyContact?.lastName}
                                defaultValue={selectedResource?.personLegal?.personEmergencyContact.map((item) => item.lastName) || null}
                                required={required}
                                requiredMsg="name.required"
                                placeholder=""
                                autoFocus
                            />
                        </div>
                        <div class=" col-12  md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personEmergencyContact.relation"
                                labelId="relation.label"
                                // defaultValue={selectedResource?.personEmergencyContact?.relation}
                                defaultValue={selectedResource?.personLegal?.personEmergencyContact.map((item) => item.lastName) || null}
                                requiredMsg="Relation is required"
                                placeholder="--"
                            />
                        </div>

                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personEmergencyContact.emailId"
                                labelId="email.label"
                                // defaultValue={selectedResource?.personEmergencyContact?.emailId}
                                defaultValue={selectedResource?.personLegal?.personEmergencyContact.map((item) => item.lastName) || null}
                                required={required}
                                requiredMsg="Email is required"
                                placeholder="--"
                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputPhoneNbr
                                control={control}
                                errors={errors}
                                name="personEmergencyContact.phoneNumber.dialNumber"
                                labelId="phoneNumber.label"
                                maskFormat="(999) 999-9999"
                                // defaultValue={selectedResource?.personEmergencyContact?.phoneNumber?.dialNumber}
                                 defaultValue={selectedResource?.personLegal?.personEmergencyContact.map((item) => item.lastName) || null}
                                required={required}
                                requiredMsg="Phone number is required"
                            />
                        </div>
                        <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3 h-custom-10'>
                            <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancel} />
                            <Button type="submit" severity='primary' label='Create' size='small' className="ms-2 me-2" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEmergencyContact