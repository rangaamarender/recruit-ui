import React from 'react';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomCalender from '../../../components/controls/CustomCalender';


function Dependents({ control, errors }) {
    const required = false;

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

                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="relation"
                        labelId="Relation"
                        defaultValue=""
                        required={required}
                        requiredMsg="Relation is required"
                        placeholder="--"
                    />
                </div>

                <div class=" col-12 md:col-6">
                    <CustomCalender
                        control={control}
                        errors={errors}
                        name="DOB"
                        labelId="DOB"
                        requiredMsg="endDate.required"
                        defaultValue=""
                        showIcon={true}
                        required={required}

                    />
                </div>

            </div>
        </>
    );
}

export default Dependents;
