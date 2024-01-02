import React, { useState } from 'react';

import CustomCalender from '../../../../../components/controls/CustomCalender';
import ReusableFileuploadWithTabel from '../../../../../components/fileUpload/ResuableFileUploadWithTable';
import { useDispatch, useSelector } from 'react-redux';
import { storeUploadMsaData } from '../../../../../redux/actions/contractActions';
import { useEffect } from 'react';
import timesheetResoursesData from '../../../../../assets/__mockData__/timesheetResoursesData.json';
import { timesheetValidateFileType } from '../../../../../components/fileUpload/config/validationFileTypes';
import { fetchContractsAssignDocumentRequest } from '../../../../../redux/actions/adminResourceRoleAction';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';

function UploadMsaAndDocument({ control, errors, validationErrors, setValidationErrors, setFinish }) {
    let required = false;

    const dispatch = useDispatch();
    const docData = useSelector((state) => state.contract.uploadMsaData);

    const [resources, setResources] = useState([]);
    const [workOrders, setWorkOrders] = useState([]);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
    const [timesheetFiles, setTimesheetFiles] = useState(docData);
    console.log(resources, workOrders, setWorkOrders, selectedWorkOrder, setSelectedWorkOrder); //remove
    // useEffect(()=>{
    //   setFinish(true);
    // },[setFinish])
    useEffect(() => {
        dispatch(storeUploadMsaData(timesheetFiles));
    });
    useEffect(() => {
        const resourcesData = timesheetResoursesData.resourcesData.map((resource) => ({
            value: resource.id,
            label: resource.name,
            workOrders: resource.workOrders,
        }));
        setResources(resourcesData);
    }, []);
    const dataApi = useSelector((state) => state.adminRole.contractAssignDocumentsList);
    console.log(dataApi);

    useEffect(() => {
        dispatch(fetchContractsAssignDocumentRequest());
    }, [dispatch]);


    return (
        <>
            <h4 className="fw-bold text-center">Upload MSA And Supporting Documents</h4>

            <div className="col-12 md:col-12">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="country"
                    labelId="DocumentTitle.label"
                    defaultValue=""
                    options={dataApi.map((data, index) => ({
                        label: data.documentName,
                        value: data.documentDefID,
                    }))}
                    required={required}
                    placeholder="Select Document type"
                    requiredMsg="DocumentTitle.required"
                />
            </div>
            <div className="md:flex">
                <CustomCalender
                    control={control}
                    errors={errors}
                    name="startDate"
                    labelId="startDate.label"
                    requiredMsg="startDate.required"
                    defaultValue=""
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
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6"
                />
            </div>
            <div className="col-12 md:col-12">
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
export default UploadMsaAndDocument;
