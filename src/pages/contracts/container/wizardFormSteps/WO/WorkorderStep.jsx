import React from 'react';
// import { Toast } from 'primereact/toast';
// import { FileUpload } from 'primereact/fileupload';
import CustomCalender from '../../../../../components/controls/CustomCalender';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import CustomInputText from '../../../../../components/controls/CustomInputText';

function WorkorderStep({ control, errors, watch }) {

    // const toastRef = useRef(null);

    const startDate = watch('WOStartDate')
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
    ];

    let required = false
    return (
        <>
            <div className=" flex-wrap gap-3 p-fluid mb-5">
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="selectWorker"
                        labelId="selectWorker.label"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="selectWorker.required"
                        placeholder="Select Worker"
                        className="md:col-8  sm:col-12"
                    />
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="selectWorkerType"
                        labelId="selectWorkerType.label"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="selectWorkerType.required"
                        placeholder="Select Worker Type"
                        className="md:col-4  sm:col-12"
                    />

                </div>
                
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="WBSCode"
                        labelId="WBSCode.label"
                        placeholder="WBS Code"
                        defaultValue=""
                        required={required}
                        requiredMsg="WBSCode.required"
                        className="md:col-6  sm:col-12"
                    />
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="WOTitle"
                        labelId="WOTitle.label"
                        placeholder="Title"
                        defaultValue=""
                        required={required}
                        requiredMsg="WOTitle.required"
                        className="md:col-6  sm:col-12"
                    />
                </div>
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="timesheetCycle"
                        labelId="timesheetCycle.label"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="timesheetCycle.required"
                        placeholder="Select timesheet cycle"
                        className="md:col-6  sm:col-12"
                    />
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="invoiceCycle"
                        labelId="invoiceCycle.label"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="invoiceCycle.required"
                        placeholder="Select invoice cycle"
                        className="md:col-6  sm:col-12"
                    />
                </div>
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="timesheetApprovalWorkflow"
                        labelId="timesheetApprovalWorkflow.label"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="timesheetApprovalWorkflow.required"
                        placeholder="Select timesheet approval"
                        className="md:col-6  sm:col-12"
                    />
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="paymentTeam"
                        labelId="paymentTeam.label"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="paymentTeam.required"
                        placeholder="Select payment team"
                        className="md:col-6  sm:col-12"
                    />
                </div>
                <div className="md:flex">
                    <CustomCalender
                        control={control}
                        errors={errors}
                        name="WOStartDate"
                        labelId="WOStartDate.label"
                        requiredMsg="WOStartDate.required"
                        defaultValue=''
                        showIcon={true}
                        required={required}
                        className="md:col-6  sm:col-12"
                    />
                    <CustomCalender
                        control={control}
                        errors={errors}
                        name="WOEndDate"
                        labelId="WOEndDate.label"
                        requiredMsg="WOEndDate.required"
                        defaultValue=''
                        minDate={startDate}
                        showIcon={true}
                        required={required}
                        className="md:col-6  sm:col-12"
                    />
                </div>
            </div>
        </>
    );
}

export default WorkorderStep;
