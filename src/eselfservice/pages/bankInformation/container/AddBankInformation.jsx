import React, { useEffect } from 'react'
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputMask from '../../../../components/controls/CustomInputMask';
import CustomInputFile from '../../../../components/controls/CustomInputFile';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../../redux/actions/resourceActions';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { workerID } from '../../WorkerId';


function AddBankInformation({handleAddBankDetails, setSidebarVisable }) {

    // const [toastMessage, setToastMessage] = useState('');
    // const [toastSeverity, setToastSeverity] = useState('');

    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const required = false;

    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);
    console.log(selectedResource, "resource")

    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);


    const createPayload = (resource, newPersonBankDetails) => {
        const existingDependents = resource.personLegal?.personBankDetails || [];

        const updatedPersonLegal = {
            personBankDetails: [
                ...existingDependents,
                newPersonBankDetails]
        };
        return {
            workerID: resource.workerID,
            personLegal: updatedPersonLegal
        };
    };

    const onSubmit =(data) => {
     
            const newPersonBankDetails = {
                ..._.pick(data, [
                    'accountName',
                    'accountNumber',
                    'bankName',
                    'branchName',
                    'bankID',
                    'routingNumber',
                    'accountType']),
            };
            const payload = createPayload(selectedResource, newPersonBankDetails);

            dispatch(updateResourceRequest(selectedResource.workerID, payload));
            handleAddBankDetails(newPersonBankDetails);
    };

    const handleCancel = () => {
        setSidebarVisable(false)
        reset()
    };


    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    return (
        <>

            {/* {toastMessage && (
                <div className={`toast ${toastSeverity}`}>
                    <div className="toast-body">{toastMessage}</div>
                </div>
            )} */}
            <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='ps-2 mt-2'>Bank Information</h5>
                    <div class="formgrid grid mb-6 p-2">

                        <div class=" col-12 md:col-12">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="bankName"
                                labelId="bankName.label"
                                defaultValue=""
                                options={options}
                                requiredMsg="Bank name is required"
                                placeholder="Select Bank name"
                                autoFocus
                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="accountName"
                                labelId="accountName.label"
                                defaultValue=""
                                required={required}
                                requiredMsg="accountName.required"
                                placeholder="Account Name"

                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="accountNumber"
                                labelId="accountNumber.label"
                                defaultValue=""
                                requiredMsg="lastName.required"
                                placeholder="Account Number"
                                type="number"
                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="accountType"
                                labelId="accountType.label"
                                defaultValue=""
                                requiredMsg="accountType.required"
                                placeholder="Account Type"
                            />
                        </div>


                        <div class=" col-12 md:col-6">
                            <CustomInputMask
                                control={control}
                                errors={errors}
                                name="routingNumber"
                                labelId="routingNumber.label"
                                defaultValue=""
                                mask="999999999"

                                requiredMsg="Routing number is required"
                            />
                        </div>

                        {/* <div class=" col-12 md:col-12">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="bankAddress"
                                labelId="bankAddress.label"
                                defaultValue=""
                                requiredMsg="bankAddress.required"
                                placeholder="Bank Address"
                            />
                        </div> */}

                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="branchName"
                                labelId="branchName.label"
                                defaultValue=""
                                requiredMsg="branchName.required"
                                placeholder="Branch Name"
                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="bankID"
                                labelId="bankID.label"
                                defaultValue=""
                                requiredMsg="bankID.required"
                                placeholder="Bank ID"
                            />
                        </div>


                        <div className='col-12 md:col-12'>
                            <div class="  profilepic-border rounded rounded mt-1 p-5 d-flex justify-content-center align-items-center">
                                <div className=''>
                                    <label className='p-text-secondary'>UPLOAD VOID CHEQUE</label>
                                    <CustomInputFile
                                        control={control}
                                        errors={errors}
                                        name="document"
                                        requiredMsg="Document is required"
                                        defaultValue=""
                                        required={required}
                                    />
                                    <span>JPG, PNG, DOC or PDF smaller than 30 MB</span>
                                </div>
                            </div>
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

export default AddBankInformation