import React from 'react';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import CustomInputMask from '../../../components/controls/CustomInputMask';


function BankDetails({ control, errors }) {
    const required = false;

    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    return (
        <>
            <div class="formgrid grid mb-6">
                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="accountName"
                        labelId="Account Name"
                        defaultValue=""
                        required={required}
                        requiredMsg="firstName.required"
                        placeholder="Account Name"
                        autoFocus
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="accountNumber"
                        labelId="Account Number"
                        defaultValue=""
                        requiredMsg="lastName.required"
                        placeholder="Account Number"
                    />
                </div>

                <div class=" col-12 md:col-6">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="bankName"
                        labelId="Bank Name"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="Bank name is required"
                        placeholder="Select Bank name"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="barnchName"
                        labelId="Branch Name"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="Branch name is required"
                        placeholder="Select Branch name"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputMask
                        control={control}
                        errors={errors}
                        name="bankID"
                        labelId="Bank ID"
                        defaultValue=""
                        mask="999999999"
                        required={required}
                        requiredMsg="Bank ID is required"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputMask
                        control={control}
                        errors={errors}
                        name="routingNumber"
                        labelId="Routing Number"
                        defaultValue=""
                        mask="999999999"
                        required={required}
                        requiredMsg="Routing number is required"
                    />
                </div>
                <div class=" col-12">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="typeOfAccount"
                        labelId="Type of Account"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="Type of Account is required"
                        placeholder="Select Type of Account"
                    />
                </div>
                {/* <div class=" col-12 profilepic-border rounded rounded p-5 d-flex justify-content-center align-items-center">
                <div className=''>
                    <CustomInputFile
                        control={control}
                        errors={errors}
                        name="document"
                        requiredMsg="Document is required"
                        defaultValue=""
                        required={required}
                    />
                  <span>JPG, PNG,DOC or PDF smaller than 30 MB</span>
                </div>
          </div>       */}
            </div>
        </>
    );
}

export default BankDetails;
