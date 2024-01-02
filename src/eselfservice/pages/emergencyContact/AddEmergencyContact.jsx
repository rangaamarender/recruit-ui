import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelationshipRequest, fetchResourceByIdRequest, updateResourceRequest } from '../../../redux/actions/resourceActions';
import _ from 'lodash';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import { workerID } from '../WorkerId';

function AddEmergencyContact({onAddContact, setSidebarVisable }) {

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const dispatch = useDispatch();


    const { selectedResource } = useSelector((state) => state.resource);
    const relationships = useSelector((state) => state.resource.relationships);


    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
        dispatch(fetchRelationshipRequest());
    }, [dispatch]);

    const createPayload = (resource, newPersonEmergencyContact) => {
        const existingContacts = resource.personLegal?.personEmergencyContact || [];

        const updatedPersonLegal = {
            personEmergencyContact: [
                ...existingContacts,
                newPersonEmergencyContact]
        };

        return {
            workerID: resource.workerID,
            personLegal: updatedPersonLegal
        };
    };

    const onSubmit = (data) => {
        const formattedDialNumber = data.dialNumber.replace(/\D/g, '');

        const newPersonEmergencyContact = {
            ..._.pick(data, ['firstName', 'lastName', 'relation', 'emailId']),
            emailType: 'testEmailType',
            phoneType: 'LandLine',
            phoneNumber: {
                dialNumber: formattedDialNumber
            }
        };

        const payload = createPayload(selectedResource, newPersonEmergencyContact);
        dispatch(updateResourceRequest(selectedResource.workerID, payload));

        onAddContact(newPersonEmergencyContact)
    
    };

    const handleCancel = () => {
        setSidebarVisable(false);
        reset();
    };

    const relationshipOptions = relationships.map((relationship, index) => ({
        label: relationship,
        value: index,
    }));

    const handleRelationship = (selectedValue) => {
        setValue('relation', selectedValue.target.value);
    };


    return (
        <>
            <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='ps-2 mt-2'>Emergency Contact</h5>

                    <div class="formgrid grid mb-6 p-2" >
                        <div class="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='firstName'
                                labelId="firstName.label"
                                defaultValue={""}
                                requiredMsg="name.required"
                                placeholder="First name"
                                autoFocus
                            />
                        </div>
                        <div class="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='lastName'
                                labelId="lastName.label"
                                defaultValue={''}

                                requiredMsg="name.required"
                                placeholder="Last name"
                            />
                        </div>
                        {/* Add similar CustomInputText components for other fields */}
                        <div class="col-12  md:col-6">
                            {/* <CustomDrop
                                control={control}
                                errors={errors}
                                name='relation'
                                labelId="relation.label"
                                defaultValue={''}
                                requiredMsg="Relation is required"
                                placeholder="--"
                            /> */}
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="relation"
                                labelId="relation.label"
                                defaultValue=""
                                options={relationshipOptions}
                                onChange={handleRelationship}
                                requiredMsg="Relation is required"
                                placeholder="Select relationship"
                            />
                        </div>
                        <div class="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='emailId'
                                labelId="email.label"
                                defaultValue={''}

                                requiredMsg="Email is required"
                                placeholder="Email Id"
                            />
                        </div>
                        <div class="col-12 md:col-6">
                            <CustomInputPhoneNbr
                                control={control}
                                errors={errors}
                                name='dialNumber'
                                labelId="phoneNumber.label"
                                maskFormat="(999) 999-9999"
                                defaultValue={''}
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