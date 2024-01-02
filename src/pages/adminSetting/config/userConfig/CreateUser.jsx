import React from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
const CreateUser = ({ control, errors }) => {
    const required = true;

    const userRoleOptions = [{ value: 'admin', label: 'Admin' }];

    return (
        <>
            <>
                <div className="formgrid grid mb-6">
                    <div className="col-12 text-center">
                        <h3>User Profile</h3>
                    </div>
                    <div className="col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="userFirstName"
                            labelId="userFirstName.label"
                            defaultValue=""
                            required={required}
                            requiredMsg="userName.required"
                            placeholder="First Name"
                            autoFocus
                        />
                    </div>
                    <div className="col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="userLastName"
                            labelId="userLastName.label"
                            defaultValue=""
                            required={required}
                            requiredMsg="userLastName.required"
                            placeholder="Last Name"
                            autoFocus
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="userRole"
                            labelId="userRole.label"
                            defaultValue=""
                            options={userRoleOptions}
                            required={required}
                            placeholder="Select user role"
                            requiredMsg="userRole.required"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="name"
                            labelId="userEmail.label"
                            defaultValue=""
                            required={required}
                            requiredMsg="userEmail.required"
                            placeholder="Email"
                            autoFocus
                        />
                    </div>

                    <div className=" col-12 md:col-4">
                        <CustomInputPhoneNbr
                            control={control}
                            errors={errors}
                            name="phoneNumber"
                            labelId="phoneNbr"
                            maskFormat="(999) 999-9999"
                            defaultValue=""
                            required={required}
                            requiredMsg="phoneNumber.required"
                        />
                    </div>
                </div>
            </>
        </>
    );
};

export default CreateUser;
