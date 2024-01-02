import React, {  useState } from 'react';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomCalender from '../../../../../../components/controls/CustomCalender';
import ReusableFileuploadWithTabel from '../../../../../../components/fileUpload/ResuableFileUploadWithTable';
import { useDispatch, useSelector } from 'react-redux';
import { storeUploadMsaData } from '../../../../../../redux/actions/contractActions';
import { useEffect } from 'react';
import timesheetResoursesData from '../../../../../../assets/__mockData__/timesheetResoursesData.json';
import { timesheetValidateFileType } from '../../../../../../components/fileUpload/config/validationFileTypes';

function SingleResourceUploadSuperVisorInfoClient({ control, errors,validationErrors,setValidationErrors }){

      let required = false;

const dispatch = useDispatch();
const docData = useSelector((state) => state.contract.uploadMsaData)

const [resources, setResources] = useState([]);
const [workOrders, setWorkOrders] = useState([]);
const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
const [timesheetFiles, setTimesheetFiles] = useState(docData);
console.log(resources,workOrders,setWorkOrders,selectedWorkOrder,setSelectedWorkOrder);//remove
useEffect(() => {
  dispatch(storeUploadMsaData(timesheetFiles))
})
useEffect(() => {
  const resourcesData = timesheetResoursesData.resourcesData.map((resource) => ({
    value: resource.id,
    label: resource.name,
    workOrders: resource.workOrders,
  }));
  setResources(resourcesData);
}, []);
    return (
        <>
            
            <h4 className="fw-bold text-center">Upload  Documents</h4>
            
      <CustomInputText
                    control={control}
                    errors={errors}
                    name="msaCode"
                    labelId="DocumentTitle.label"
                    defaultValue={null}
                    required={required}
                    placeholder="---"
                    requiredMsg="DocumentTitle.required"
                    className="md:col-12"
                />
                <div className="md:flex">
                      <CustomCalender
        control={control}
        errors={errors}
        name="startDate"
        labelId="startDate.label"
        requiredMsg="startDate.required"
        defaultValue=''
        showIcon={true}
        required={required}
        className="md:col-6"
      />
      <CustomCalender
        control={control}
        errors={errors}
        name="endDate"
        labelId="endDate.label"
        requiredMsg="endDate.required"
        defaultValue=''
        showIcon={true}
        required={required}
        className="md:col-6"
      />
      </div>
      <div className='col-12 md:col-12'>
                    <div className="  profilepic-border rounded rounded mt-1 p-5 d-flex justify-content-center align-items-center">
                     <ReusableFileuploadWithTabel
            files={timesheetFiles}
            setFiles={setTimesheetFiles}
            validateFileType={timesheetValidateFileType}
            name="fileUpload"
            fileTypes={['jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx']}
            maxFileSize={30}
            setValidationErrors={setValidationErrors}
            className="col-10 md:col-10"
          />
           {validationErrors && <div className="text-danger">{validationErrors}</div>}
        </div>
        </div>
        </>
    );
}
export default SingleResourceUploadSuperVisorInfoClient;