import React from 'react';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import CustomInputMask from '../../../components/controls/CustomInputMask';

const CompanyProfile = ({ control, errors }) => {
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];
    let required = true;
    return (
        <div>
            <span className="p-input-icon-right">
                <i className="pi pi-building" />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="companyName"
                    labelId="companyName"
                    required={required}
                    requiredMsg="companyName.required"
                />
            </span>
            <CustomInputPhoneNbr
                control={control}
                errors={errors}
                name="phoneNumber"
                labelId="phoneNumber.label"
                maskFormat="(999) 999-9999"
            />
            <CustomInputText
                control={control}
                errors={errors}
                name="webAddress"
                labelId="webAddress.label"
                required={required}
                requiredMsg="webAddress.required"
            />
            <CustomDropdown
                control={control}
                errors={errors}
                name="taxClassification"
                labelId="taxClassification"
                required={required}
                requiredMsg="taxClassification.required"
                options={options}
            />
            <CustomDropdown
                control={control}
                errors={errors}
                name="stateOfIncorporation"
                labelId="stateOfIncorporation.label"
                required={required}
                requiredMsg="stateOfIncorporation.required"
                options={options}
            />
            <CustomInputMask
                control={control}
                errors={errors}
                name="ein"
                labelId="ein"
                mask="99-9999999"
                disabled={true}
                defaultValue="99-9999999"
            />
            <CustomDropdown
                control={control}
                errors={errors}
                name="intrestedModule"
                labelId="intrestedModule.label"
                required={required}
                requiredMsg="intrestedModule.required"
                options={options}
            />
        </div>
    );
};

export default CompanyProfile;
