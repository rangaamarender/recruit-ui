import React from 'react';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputEmail from '../../../components/controls/CustomInputEmail';
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';

const AdminDetails = ({ control, errors }) => {
    let required = true;
    return (
        <div>
            <div className="md:flex">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="firstName"
                    labelId="firstName.label"
                    required={required}
                    requiredMsg="firstName.required"
                    className="md:col-6 col-12"
                />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="lastName"
                    labelId="lastName.label"
                    required={required}
                    requiredMsg="lastName.required"
                    className="md:col-6 col-12"
                />
            </div>
            <CustomInputText
                control={control}
                errors={errors}
                name="title"
                required={required}
                labelId="title.label"
                requiredMsg="title.required"
                className="col-12"
            />
            <CustomInputEmail
                control={control}
                errors={errors}
                name="email"
                required={required}
                labelId="Email"
                requiredMsg="email.required"
                className="col-12"
                disabled={true}
                defaultValue="test@gmail.com"
            />
            <CustomInputPhoneNbr
                control={control}
                errors={errors}
                name="phoneNumber"
                required={required}
                maskFormat="(999) 999-9999"
                labelId="phoneNumber.label"
                requiredMsg="phoneNumber.required"
                className="col-12"
            />
        </div>
    );
};

export default AdminDetails;
