import React from 'react';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';

function Emergency({ control, errors, formData }) {
    const required = false;
console.log(formData,"123")
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
                        name="FirstName"
                        labelId="firstName"
                        defaultValue=""
                        required={required}
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
                        defaultValue=""
                        required={required}
                        requiredMsg="lastName.required"
                        placeholder="Last Name"
                    />
                </div>
                <div class=" col-12">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="relation"
                        labelId="Relation"
                        defaultValue=""
                        requiredMsg="Relation is required"
                        placeholder="--"
                    />
                </div>

                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="emailId"
                        labelId="Email"
                        defaultValue=""
                        required={required}
                        requiredMsg="Email is required"
                        placeholder="--"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="emailType"
                        labelId="Email Type"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="Email type is required"
                        placeholder="--"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputPhoneNbr
                        control={control}
                        errors={errors}
                        name="phoneNumber"
                        labelId="phoneNbr"
                        maskFormat="(999) 999-9999"
                        defaultValue=""
                        required={required}
                        requiredMsg="Phone number is required"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="phoneType"
                        labelId="Phone Type"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="Phone type is required"
                        placeholder="--"
                    />
                </div>
            </div>
        </>
    );
}

export default Emergency;
