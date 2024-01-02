import React, { useEffect, useState } from 'react';
import CustomCalender from '../../../../../../components/controls/CustomCalender';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import { FileUpload } from 'primereact/fileupload';
import { useDispatch, useSelector } from 'react-redux';
import { WORKER_C2C, WORKER_W2 } from '../../../../../resources/config/resourceWizardSteps';
import { createResourceRequest, fetchResourceRequest } from '../../../../../../redux/actions/resourceActions';
import WizardComponent from '../../../../../../components/viewers/WizardComponent';
import { payloadDataForApi } from '../../../../../resources/data/payloadDataforApi';
import { Button } from 'primereact/button';

function SingleResourceWorkorderRates({ control, errors, watch, setValue }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [workerTypeCode, setWorkerTypeCode] = useState(WORKER_C2C);
    const [sample, setSample] = useState();
    const [selectWorkerTypeData, setSelectWorkerTypeData] = useState([]);
    console.log(sample, 'setSample-909');
    const resources = useSelector((state) => state.resource.resources);
    const [resource, setResource] = useState(resources);
    // const { role } = useSelector((state) => state.adminRole);
    console.log(
        resources.map((r) => r.personLegal.familyName),
        'resources'
    );
    const dispatch = useDispatch();
    const startDate = watch('WOStartDate');
    // const options = [
    //     { value: '1099', label: '1099' },
    //     { value: 'w2c', label: 'w2c' },
    // ];
    const optionTypes = [
        { value: 'Option1', label: 'Option1' },
        { value: 'Option2', label: 'Option2' },
    ];
    const customBase64Uploader = async (event) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob());

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            // const base64data = reader.result;
        };
    };
    useEffect(() => {
        setValue('EmploymentStatus', sample?.familyName);
    }, [sample,setValue]);
    let required = false;
    useEffect(() => {
        fetch('http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType') // worker api
            .then((response) => response.json())
            .then((selectWorkerTypeData) => {
                console.log(selectWorkerTypeData, 'contractData');
                setSelectWorkerTypeData(selectWorkerTypeData);
            });
    }, []);
    useEffect(() => {
        setResource(resources);
    }, [resources]);
    const addResourceActionHandler = () => {
        setSidebarVisible(true);
        setCurrentStep(0);
    };

    const closeAddResourceActionHandler = () => {
        setSidebarVisible(false);
    };
    // function to handle the API call
    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            dispatch(createResourceRequest({ formData }));
            setSidebarVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const formData = useSelector((state) => state.resource.formData);

    console.log(formData, 'formData');

    useEffect(() => {
        if (formData?.workerTypeCode === 'W2Employee') {
            setWorkerTypeCode(WORKER_C2C);
        } else if (formData?.workerTypeCode === 'C2cEmployee') {
            setWorkerTypeCode(WORKER_W2);
        }
    }, [formData]); // eslint-disable-next-line react-hooks/exhaustive-deps

    console.log(formData, 'formData');
    // useEffect(() => {
    //     dispatch(fetchResourceRequest());

    // }, [dispatch]);

    useEffect(() => {
        // dispatch(fetchAdminRoleRequest());
        dispatch(fetchResourceRequest());
    }, [dispatch]);
    // const test=()=>{
    //     setValue('EmploymentStatus', 'test')

    // }
    return (
        <>
            <div className=" flex-wrap gap-3 p-fluid mb-5">
                <h4 className="fw-bold text-center">Work Order - Rates</h4>
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        autoFocus
                        name="EmploymentStatus"
                        labelId="selectWorker.label"
                        // options={options}
                        // options={role.map((c)=> ({
                        //   value:c.workerTypeName,
                        //   label:c.workerTypeName
                        // }))}
                        options={resource.map((r) => ({
                            value: r.personLegal.familyName,
                            label: r.personLegal.familyName,
                        }))}
                        required={required}
                        requiredMsg="selectWorker.required"
                        placeholder="Selected Worker"
                        // onChange={handleCountryChange}
                        className="md:col-8  sm:col-12"
                    />
                    <WizardComponent
                        title="Create Resource"
                        visible={sidebarVisible}
                        onHide={closeAddResourceActionHandler}
                        steps={workerTypeCode}
                        setCurrentStep={setCurrentStep}
                        currentStep={currentStep}
                        handleApiCall={handleApiCall} // API call function to the WizardComponent
                        payloadDataForApi={payloadDataForApi}
                        validations={[null]}
                        setSample={setSample}
                    />
                    <div>
                        {/* <Button
                                        label='ADD'
                                        onClick={addResourceActionHandler}
                                        icon="pi pi-plus"
                                        className="company-primary-btn mt-5"
                                    /> */}
                        <div className="col-1">
                            <Button
                                icon="pi pi-plus"
                                className="mt-4"
                                size="small"
                                onClick={addResourceActionHandler}
                            />
                        </div>
                    </div>
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="selectWorkerType"
                        labelId="selectWorkerType.label"
                        defaultValue=""
                        // options={options}
                        options={selectWorkerTypeData.map((data) => ({
                            value: data.workerTypeName,
                            label: data.workerTypeName,
                        }))}
                        required={required}
                        requiredMsg="selectWorkerType.required"
                        placeholder="Select Worker Type"
                        className="md:col-3  sm:col-12"
                    />
                </div>
                <div className="col-12">
                    <div className="centered-container">
                        <FileUpload
                            mode="basic"
                            disabled
                            name="demo[]"
                            url="/api/upload"
                            accept="image/*"
                            customUploaduploadHandler={customBase64Uploader}
                            className="custom-calander-bg m-3"
                        />
                    </div>
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
                        required={false}
                        // requiredMsg="WOTitle.required"
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
                        options={optionTypes}
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
                        options={optionTypes}
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
                        options={optionTypes}
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
                        options={optionTypes}
                        required={required}
                        requiredMsg="paymentTeam.required"
                        placeholder="Select payment term"
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
                        defaultValue=""
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
                        defaultValue=""
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

export default SingleResourceWorkorderRates;
