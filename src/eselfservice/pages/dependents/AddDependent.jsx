import React, { useEffect } from 'react'
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomCalender from '../../../components/controls/CustomCalender';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { fetchRelationshipRequest, fetchResourceByIdRequest, updateResourceRequest } from '../../../redux/actions/resourceActions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import { workerID } from '../WorkerId';

function AddDependent({onAddDependent, setSidebarVisable }) {


    const { control, handleSubmit, formState: { errors }, reset, setValue} = useForm();
    const required = false;

    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);
    const relationships = useSelector((state) => state.resource.relationships);


    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
        dispatch(fetchRelationshipRequest());
    }, [dispatch]);

    const createPayload = (resource, newPersonDependent) => {
        const existingDependents = resource.personLegal?.personDependents || [];

        const updatedPersonLegal = {
            personDependents: [
                ...existingDependents,
                newPersonDependent]
        };
         return {
            workerID: resource.workerID,
            personLegal: updatedPersonLegal
        };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const onSubmit = (data) => {
    
        const newPersonDependents = {
            ..._.pick(data, ['firstName', 'lastName', 'relation']),
            brithDate: formatDate(data.brithDate)
        };
    
        const payload = createPayload(selectedResource, newPersonDependents);
        dispatch(updateResourceRequest(selectedResource.workerID, payload));

        onAddDependent(newPersonDependents)
    };


    const handleCancel = () => {
        setSidebarVisable(false)
        reset()
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
                    <h5 className='ps-2 mt-2'>Dependents</h5>
                    <div class="formgrid grid mb-6 p-2">

                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="firstName"
                                labelId="firstName.label"
                                defaultValue={""}
                                requiredMsg="firstName.required"
                                placeholder="First Name"
                                autoFocus
                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="lastName"
                                labelId="LastName"
                                defaultValue={''}
                                required={required}
                                requiredMsg="lastName.required"
                                placeholder="Last Name"
                            />
                        </div>

                        <div class=" col-12 md:col-6">
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

                        <div class=" col-12 md:col-6">
                            <CustomCalender
                                control={control}
                                errors={errors}
                                name="brithDate"
                                labelId="DOB.label"
                                requiredMsg="DOB.required"
                                defaultValue={''}
                                showIcon={true}
                                required={required}
                                placeholder="mm-dd-yyyy"

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

export default AddDependent