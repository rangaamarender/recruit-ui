import React from 'react';
import CustomInputPhoneNbr from '../../../../../components/controls/CustomInputPhoneNbr';
import CustomInputText from '../../../../../components/controls/CustomInputText';

function ContractSupervisorInfoStep({ control, errors }) {
    let required = false
    return (
        <>
            <div className=" flex-wrap gap-3 p-fluid">
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="supervisor"
                        labelId="supervisor.label"
                        defaultValue=""
                        required={required}
                        placeholder="Supervisor Name"
                        requiredMsg="supervisor.required"
                        className="md:col-6  sm:col-12"
                    />
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="supervisorTitle"
                        labelId="supervisorTitle.label"
                        defaultValue=""
                        required={required}
                        requiredMsg="supervisorTitle.required"
                        placeholder="Supervisor Title"
                        className="md:col-6  sm:col-12"
                    />
                </div>
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="supervisorEmail"
                        labelId="supervisorEmail.label"
                        placeholder="admin@tech.com"
                        defaultValue=""
                        required={required}
                        requiredMsg="supervisorEmail.required"
                        className="md:col-6  sm:col-12"
                    />
                    <CustomInputPhoneNbr
                        control={control}
                        errors={errors}
                        name="supervisorPhone"
                        labelId="supervisorPhone.label"
                        maskFormat="(999) 999-9999"
                        defaultValue=""
                        required={required}
                        requiredMsg="supervisorPhone.required"
                        className="md:col-6 sm:col-12"
                    />
                </div>

            </div>
        </>
    );
}

export default ContractSupervisorInfoStep;
