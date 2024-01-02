import React, { useState } from "react";
// import timesheetContracts from "../../../../assets/__mockData__/timesheetContracts.json";
import CustomDropdown from "../../../../components/controls/CustomDropdown";
import CustomCalender from "../../../../components/controls/CustomCalender";
import CustomInputText from "../../../../components/controls/CustomInputText";
import ReusableFileuploadWithTabel from "../../../../components/fileUpload/ResuableFileUploadWithTable";
import { timesheetValidateFileType } from "../../../../components/fileUpload/config/validationFileTypes";


function EmployeeTimesheetStep({ control, errors, currentStep, setCurrentStep, formData, setFormData, setValue, watch, setFinish, validationErrors, setValidationErrors }) {
  let required = false;
  const [timesheetFiles, setTimesheetFiles] = useState([]);

  const currentDate = new Date();
  const startDate = watch("startDate");
  
  const contractsData = [
    {
      "contractId": "C001",
      "contractName": "Contract 1",
      "lastApprovedDate": "12-09-2023",
      "workOrderStartDate":"09-13-2023",
      "chargeCode": {
        "chargeCodeId": "CC01",
        "tasks": [
          {
            "taskId": "T01",
            "taskDescription": "Task 1 - Description"
          },
          {
            "taskId": "T02",
            "taskDescription": "Task 2 - Description"
          }
        ]
      }
    },
    {
      "contractId": "C002",
      "contractName": "Contract 2",
      "lastApprovedDate": "",
      "workOrderStartDate":"10-05-2023",
      "chargeCode": {
        "chargeCodeId": "CC02",
        "tasks": [
          {
            "taskId": "T03",
            "taskDescription": "Task 3 - Description"
          },
          {
            "taskId": "T04",
            "taskDescription": "Task 4 - Description"
          }
        ]
      }
    }
  ];

  const contractOptions = contractsData.map(contract => ({
    label: contract.contractName,
    value: contract.contractId,
    chargeCode: contract.chargeCode || {} // Add chargeCode to options
  }));

  console.log(contractOptions,"123")

  const handleContractChange = (event) => {
    const contractId = event.value;
    const selectedContract = contractsData.find((contract) => contract.contractId === contractId);
  
    console.log(selectedContract,"selected contract")
  
    setFormData({
      ...formData,
      selectedContract: selectedContract,
    });
  
    setValue("workOrder", contractId);

    if (selectedContract) {

      // const startOfDay = new Date(selectedContract.lastUpdateDate);
      // startOfDay.setHours(0, 0, 0, 0);  // Set to midnight (start of the day)
  
      // const endOfDay = new Date(selectedContract.lastUpdateDate);
      // endOfDay.setHours(23, 59, 59, 999);
      // // Set the minStartDate based on the selected work order's lastUpdateDate
      // setMinStartDate(startOfDay);
      

      let startDate = null;

      if (!selectedContract.lastApprovedDate || isNaN(new Date(selectedContract.lastApprovedDate))) {
        startDate = new Date(selectedContract.workOrderStartDate);
      } else {
        const lastApprovedDate = new Date(selectedContract.lastApprovedDate);
        lastApprovedDate.setDate(lastApprovedDate.getDate() + 1);
        startDate = lastApprovedDate;
      }
  
      // Set the time of startDate to start of day (midnight)
  
      setValue("startDate", startDate);
      
    }
  
    setValue("endDate", "");
    setValue("totalHours", "");
  }
  return (
    <>
      <div className="formgrid grid mb-6">
        <div className="col-12 md:col-12">
          <CustomDropdown
            control={control}
            errors={errors}
            name="workOrder"
            labelId="workOrder.label"
            defaultValue=""
            options={contractOptions}
            required={required}
            onChange={handleContractChange}
            requiredMsg="workOrder.required"
            placeholder="Select workOrder"
            autoFocus
          />
        </div>



        <div class="col-12 md:col-4">
          <CustomCalender
            control={control}
            errors={errors}
            name="startDate"
            labelId="startDate.label"
            requiredMsg="startDate.required"
            defaultValue=""
            showIcon={true}
            required={required}
            disabled
          />
        </div>
        <div class="col-12 md:col-4">
          <CustomCalender
            control={control}
            errors={errors}
            name="endDate"
            labelId="endDate.label"
            requiredMsg="endDate.required"
            defaultValue=""
            showIcon={true}
            required={required}
            maxDate={currentDate}
            minDate={startDate}
          />
        </div>
        <div class="col-12 md:col-4">
          <CustomInputText
            control={control}
            errors={errors}
            name="totalHours"
            labelId="totalHours.label"
            requiredMsg="totalHours.required"
            defaultValue=""
            required={required}
            type="number"
          />
        </div>
        <div class="col-12">
          <ReusableFileuploadWithTabel
            files={timesheetFiles}
            setFiles={setTimesheetFiles}
            validateFileType={timesheetValidateFileType}
            name="fileUpload"
            fileTypes={['jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx']}
            maxFileSize={30}
            setValidationErrors={setValidationErrors}
          />
          {validationErrors && <div className="text-danger">{validationErrors}</div>}
        </div>
      </div>
    </>
  );
}

export default EmployeeTimesheetStep;
