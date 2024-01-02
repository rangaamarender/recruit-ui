import React, { useEffect, useState } from "react";
import timesheetResoursesData from "../../../../assets/__mockData__/timesheetResoursesData.json";
import CustomDropdown from "../../../../components/controls/CustomDropdown";
import CustomCalender from "../../../../components/controls/CustomCalender";
import CustomInputText from "../../../../components/controls/CustomInputText";
import ReusableFileuploadWithTabel from "../../../../components/fileUpload/ResuableFileUploadWithTable";
import { timesheetValidateFileType } from "../../../../components/fileUpload/config/validationFileTypes";
import { useDispatch, useSelector } from "react-redux";
import { storeTimesheetDoc } from "../../../../redux/actions/timesheetActions";

function TimesheetStep({ control, errors, currentStep, setCurrentStep, formData, setFormData, setValue, watch, setFinish, validationErrors, setValidationErrors }) {
  let required = true;
  const dispatch = useDispatch();
  const docData = useSelector((state) => state.timesheet.timesheetDocData);

  const [resources, setResources] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [timesheetFiles, setTimesheetFiles] = useState(docData);
  const [minStartDate, setMinStartDate] = useState(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  console.log(selectedWorkOrder)

  useEffect(() => {
    dispatch(storeTimesheetDoc(timesheetFiles));
  }, [timesheetFiles, dispatch]);

  const currentDate = new Date();
  const startDate = watch("startDate");
  // const endDate = watch("endDate");

  useEffect(() => {
    const resourcesData = timesheetResoursesData.resourcesData.map((resource) => ({
      value: resource.id,
      label: resource.name,
      workOrders: resource.workOrders,
    }));
    setResources(resourcesData);
   // Check if a resource is already selected and set the workOrders accordingly
   const selectedResource = resourcesData.find((resource) => resource.value === formData.resource);

   if (selectedResource && selectedResource.workOrders) {
     let tempWorkOrders = selectedResource.workOrders.map((workOrder) => ({
       value: workOrder.id,
       label: workOrder.workOrderName,
       chargeCode: workOrder.chargeCode,
       lastUpdateDate: new Date(workOrder.lastUpdateDate),
     }));
     setWorkOrders(tempWorkOrders);
   }
 }, [formData.resource]);

 useEffect(() => {
  setFinish(false);
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleResourceChange = (event) => {
    const resourceId = event.value;
    const selectedResource = resources.find((resource) => resource.value === resourceId);

    setValue("totalHours", "");
    setValue("startDate", "");
    setValue("endDate", "");
    setValue("workOrder", "");

    setTimesheetFiles([]);

    let tempWorkOrders = [];

    if (selectedResource && selectedResource.workOrders) {
      tempWorkOrders = selectedResource.workOrders.map((workOrder) => ({
        value: workOrder.id,
        label: workOrder.workOrderName,
        chargeCode: workOrder.chargeCode,
        lastUpdateDate: new Date(workOrder.lastUpdateDate),
      }));
    }

    setWorkOrders(tempWorkOrders);
    setMinStartDate(null); // Clear the minStartDate when changing the resource

    setValue("resource", resourceId);
  };

  const handleWorkOrderChange = (event) => {
    const workOrderId = event.value;
    const selectedWorkOrder = workOrders.find((workOrder) => workOrder.value === workOrderId);

    setSelectedWorkOrder(selectedWorkOrder);

    setFormData({
      ...formData,
      selectedWorkOrder: selectedWorkOrder,
    });

    setValue("workOrder", workOrderId);
    setValue("totalHours", "");
    setValue("startDate", "");
    setValue("endDate", "");
    setTimesheetFiles([]);
    if (selectedWorkOrder) {

      const startOfDay = new Date(selectedWorkOrder.lastUpdateDate);
      startOfDay.setHours(0, 0, 0, 0); // Set to midnight (start of the day)
  
      const endOfDay = new Date(selectedWorkOrder.lastUpdateDate);
      endOfDay.setHours(23, 59, 59, 999);
      // Set the minStartDate based on the selected work order's lastUpdateDate
      setMinStartDate(startOfDay);

      // setValue("startDate", startOfDay);
      // setValue("endDate", startOfDay);

    }
  };

  return (
    <>
      <div class="formgrid grid mb-6">
        <div class="col-12 md:col-6">
          <CustomDropdown
            control={control}
            errors={errors}
            name="resource"
            labelId="resource.label"
            defaultValue=""
            options={resources}
            required={required}
            onChange={handleResourceChange}
            requiredMsg="resource.required"
            placeholder="Select Resource"
            autoFocus
          />
        </div>
        <div class="col-12 md:col-6">
          <CustomDropdown
            control={control}
            errors={errors}
            name="workOrder"
            labelId="workOrder.label"
            defaultValue=""
            options={workOrders}
            required={required}
            onChange={handleWorkOrderChange}
            requiredMsg="workOrder.required"
            placeholder="Select Work Order"
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
            maxDate={currentDate}
            minDate={minStartDate} // Set the minDate based on selected work order
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

export default TimesheetStep;
