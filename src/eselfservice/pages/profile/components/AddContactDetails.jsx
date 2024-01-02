import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../../redux/actions/resourceActions';
import { workerID } from '../../WorkerId';

function AddContactDetails({onAddDependent, setSidebarVisable }) {


    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);


    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);

    const createPayload = (resource, newContactDetails) => {
        const existingContactDetails = resource.personLegal?.secondaryContactDetails || [];

        const updatedPersonLegal = {
            secondaryContactDetails: [
                ...existingContactDetails,
                newContactDetails]
        };
        return {
            workerID: resource.workerID,
            personLegal: updatedPersonLegal
        };
    };


    const onSubmit = (data) => {
        const formattedDialNumber = data.dialNumber.replace(/\D/g, '');

        const newContactDetails = {
            ..._.pick(data, ['emailId',]),
            emailType: 'testEmailType',
            phoneType: 'LandLine',
            phoneNumber: {
                dialNumber: formattedDialNumber
            }
        };

        const payload = createPayload(selectedResource, newContactDetails);
        dispatch(updateResourceRequest(selectedResource.workerID, payload));

        onAddDependent(newContactDetails);
    };


    const handleCancel = () => {
        setSidebarVisable(false)
        reset()
    };

    return (
        <>
            <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='ps-2 mt-2'>Contact Details</h5>
                    <div class="formgrid grid mb-6 p-2">

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

export default AddContactDetails