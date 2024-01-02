import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import { Toast } from 'primereact/toast';
import InlineEditDataTable from '../components/InlineEditDataTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    ResourceStatusRequest,
    ResourceStatusRequest1,
    fetchResourceStatus,
    fetchResourceStatus1,
    fetchWorkerTypesRequest,
    //  patchWorkerTypeRequest
} from '../../../redux/actions/adminResourceRoleAction';
import axios from 'axios';
// import AdminCreateDept from './AdminCreateDept';

const AdminResourceDataTable = ({ editMode, setEditMode }) => {
    const workerTypes = useSelector((state) => state.adminRole.workerTypes);
    const resourceStatus = useSelector((state) => state.adminRole.resourceStatus);
    console.log(resourceStatus, 'resourceStatus');
    const resourceStatus1 = useSelector((state) => state.adminRole.resourceStatus1);
    console.log(resourceStatus1, 'resourceStatus1');
    // const department = useSelector((state) => state.adminRole.department);
    // const {loading} = useSelector((state) => state.adminRole);
    // console.log(loading,'department')
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [editingRow, setEditingRow] = useState(null);
    const [editedLabel, setEditedLabel] = useState(''); //  state for edited label
    const [editingResStatusRow, setEditingResStatusRow] = useState(null);
    const [editingResStatusRow1, setEditingResStatusRow1] = useState(null);
    const [editedResStatus, setEditedResStatus] = useState('');
    const [editedResStatus1, setEditedResStatus1] = useState('');
    const [pendingAction, setPendingAction] = useState(null);
    // const [showDept, setShowDept] = useState(false); 
    const inputRef = useRef(null);


    // const finalResStatusTable = [
    //     { name: resourceStatus.name, value: resourceStatus.value },
    //     { name: resourceStatus1.name, value: resourceStatus1.value },
    //   ];

//   const [resStatus, setResStatus] = useState(finalResStatusTable);

    // useEffect(() => {
    //     if (pendingAction) {
    //         inputRef.current && inputRef.current.focus();
    //     }
    // }, [pendingAction]);

    const dataToDisplay = Array.isArray(resourceStatus) ? resourceStatus : [resourceStatus];
    const dataToDisplay1 = Array.isArray(resourceStatus1) ? resourceStatus1 : [resourceStatus1];


    useEffect(()=>{
        // const status = 'BILLABLE'
        dispatch(fetchResourceStatus())
        dispatch(fetchResourceStatus1())
        dispatch(fetchWorkerTypesRequest());
        // dispatch(fetchDepartmentRequest())
    },[dispatch])
 

    const showError = (inputId) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Complete the current action first!',
        });

        setPendingAction(inputId);
    };
    const clearPendingAction = () => {
        setPendingAction(null);
    };

    const actionTemplate = (rowData) => {
        if (editingRow === rowData.workerTypeName) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTick(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelEdit()}
                        className=""
                    />
                </div>
            );
        } else {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleEdit(rowData)} />
                </div>
            );
        }
    };

    // const actionTemplateDepartment = (rowData) => {
    //     if (editingRow === rowData.deptID) {
    //         return (
    //             <div className="d-flex gap-2">
    //                 <Button
    //                     type="button"
    //                     size="small"
    //                     icon="pi pi-check fs-6"
    //                     onClick={() => handleTick(rowData)}
    //                     className=""
    //                 />
    //                 <Button
    //                     type="button"
    //                     size="small"
    //                     severity="secondary"
    //                     icon="pi pi-times fs-6"
    //                     onClick={() => handleCancelEdit()}
    //                     className=""
    //                 />
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="cursor-pointer">
    //                 <FiEdit2 className="m-1" size="1rem" onClick={() => handleEdit(rowData)} />
    //             </div>
    //         );
    //     }
    // };

    // const actionTemplateResourceStatus = (rowData) => {
    //     if (editingResStatusRow === rowData.value) {
    //         return (
    //             <div className="d-flex gap-2">
    //                 <Button
    //                     type="button"
    //                     size="small"
    //                     icon="pi pi-check fs-6"
    //                     onClick={() => handleTickResStatus(rowData)}
    //                     className=""
    //                 />
    //                 <Button
    //                     type="button"
    //                     size="small"
    //                     severity="secondary"
    //                     icon="pi pi-times fs-6"
    //                     onClick={() => handleCancelResStatusEdit()}
    //                     className=""
    //                 />
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="cursor-pointer">
    //                 <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit(rowData)} />
    //             </div>
    //         );
    //     }
    // };

    // const actionTemplateResourceStatus1 = (rowData) => {
    //     if (editingResStatusRow1 === rowData.value) {
    //         return (
    //             <div className="d-flex gap-2">
    //                 <Button
    //                     type="button"
    //                     size="small"
    //                     icon="pi pi-check fs-6"
    //                     onClick={() => handleTickResStatus1(rowData)}
    //                     className=""
    //                 />
    //                 <Button
    //                     type="button"
    //                     size="small"
    //                     severity="secondary"
    //                     icon="pi pi-times fs-6"
    //                     onClick={() => handleCancelResStatusEdit1()}
    //                     className=""
    //                 />
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="cursor-pointer">
    //                 <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit1(rowData)} />
    //             </div>
    //         );
    //     }
    // };

    const actionTemplateResourceStatus = (rowData) => {
        if (rowData && editingResStatusRow === rowData.value) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTickResStatus(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelResStatusEdit()}
                        className=""
                    />
                </div>
            );
        } else if (rowData) {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit(rowData)} />
                </div>
            );
        } else {
            return null; // or handle the case when rowData is null
        }
    };
    
    const actionTemplateResourceStatus1 = (rowData) => {
        if (rowData && editingResStatusRow1 === rowData.value) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTickResStatus1(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelResStatusEdit1()}
                        className=""
                    />
                </div>
            );
        } else if (rowData) {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit1(rowData)} />
                </div>
            );
        } else {
            return null; // or handle the case when rowData is null
        }
    };
    
    const handleEdit = (rowData) => {
        console.log(rowData, 'rowData');
        if (editMode) {
            showError(`inputLabel_${rowData.workerTypeName}`);
        } else {
            setEditingRow(rowData.workerTypeName);
            setEditedLabel(rowData.workerTypeName);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleResStatusEdit = (rowData) => {
        if (editMode) {
            showError(`inputResStatus_${rowData.value}`);
        } else {
            setEditingResStatusRow(rowData.value);
            setEditedResStatus(rowData.value);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleResStatusEdit1 = (rowData) => {
        if (editMode) {
            showError(`inputResStatus_${rowData.value}`);
        } else {
            setEditingResStatusRow1(rowData.value);
            setEditedResStatus1(rowData.value);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleTick = async (rowData) => {
        const trimmedEditedLabel = editedLabel.trim();
        if (!trimmedEditedLabel) {
            showErrorBlankValue();
            return;
        }
        const payload = {
            workerTypeCode: rowData.workerTypeCode,
            workerTypeName: trimmedEditedLabel,
        };
        try {
            const response = await axios.patch(
                `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType/${rowData.workerTypeCode}`,
                payload
            );
            if (response.status === 200) {
                setEditingRow(null);
                setEditMode(false);
                dispatch(fetchWorkerTypesRequest());
                clearPendingAction();
                showSuccess();
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Axios PATCH error:', error);
        }
    };

    //   const handleTickResStatus = (rowData) => {
    //     const data = {
    //         name: 'BILLABLE',
    //         value: editedResStatus,
    //         type: 'STRING'
    //     };
    //     dispatch(ResourceStatusRequest({ data }));
    // };

    // const handleTickResStatus = (rowData) => {
    //     const updatedResStatus = resStatus.map((r) =>
    //     r.value === rowData.value ? { ...r, value: editedResStatus } : r
    //   );
    //     const data = {
    //         name: rowData.name,
    //         value: editedResStatus,
    //         type: 'STRING',
    //     };
    //     // console.log(data)
    //     dispatch(ResourceStatusRequest({data}));
    //     setResStatus(updatedResStatus);
    //     // dispatch(fetchResourceStatus());
    //     setEditingResStatusRow(null);
    //     setEditMode(false); // Reset edit mode
    //     showSuccess();
    // };
    const handleTickResStatus = async (rowData) => {
        const data = {
            name: rowData.name,
            value: editedResStatus,
            type: 'STRING',
        };
        
        try {
            // Dispatch ResourceStatusRequest for the edited status
            await dispatch(ResourceStatusRequest({data}));
            // Reset editing status after successful dispatch
            setEditingResStatusRow(null);
            setEditMode(false); // Reset edit mode
            const updatedStatuses = ['BILLABLE', 'NONBILLABLE'];
        await dispatch(fetchResourceStatus({ statuses: updatedStatuses }));
            // Show success message
            showSuccess();
        } catch (error) {
            console.error('Error dispatching ResourceStatusRequest:', error);
            // Handle error if needed
        }
    };

    const handleTickResStatus1 = async (rowData) => {
        const data = {
            name: rowData.name,
            value: editedResStatus1,
            type: 'STRING',
        };
        
        try {
            // Dispatch ResourceStatusRequest for the edited status
            await dispatch(ResourceStatusRequest1({data}));
            // Reset editing status after successful dispatch
            setEditingResStatusRow(null);
            setEditMode(false); // Reset edit mode
            // Show success message
            showSuccess();
        } catch (error) {
            console.error('Error dispatching ResourceStatusRequest:', error);
            // Handle error if needed
        }
    };
    

    const showErrorBlankValue = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Enter Your Input',
        });
    };

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Value updated Succesfully.',
        });
    };

    const handleCancelEdit = () => {
        setEditingRow(null);
        setEditMode(false);
    };

    const handleCancelResStatusEdit = () => {
        setEditingResStatusRow(null);
        setEditMode(false); // Reset edit mode
    };

    const handleCancelResStatusEdit1 = () => {
        setEditingResStatusRow1(null);
        setEditMode(false); // Reset edit mode
    };

    const inputTextTemplate = (rowData) => {
        return editingRow === rowData.workerTypeName ? (
            <InputText
                id={`inputLabel_${rowData.workerTypeName}`}
                value={editedLabel}
                onChange={(e) => handleInputChange(e, rowData)}
                autoFocus={pendingAction === `inputLabel_${rowData.workerTypeName}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData.workerTypeName
        );
    };
    const columns = [
        { field: 'workerTypeCode', header: 'Resource Type', body: null, width: '60%' },
        { field: 'workerTypeName', header: '', body: inputTextTemplate, width: '40%' },
    ];

    const inputTextResStatus = (rowData) => {
        return editingResStatusRow === rowData?.value ? (
            <InputText
                id={`inputResStatus_${rowData?.value}`}
                value={editedResStatus}
                onChange={(e) => handleResStatusInputChange(e)}
                autoFocus={pendingAction === `inputResStatus_${rowData?.value}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData?.value
        );
    };

    const inputTextResStatus1 = (rowData) => {
        return editingResStatusRow1 === rowData?.value ? (
            <InputText
                id={`inputResStatus_${rowData?.value}`}
                value={editedResStatus1}
                onChange={(e) => handleResStatusInputChange1(e)}
                autoFocus={pendingAction === `inputResStatus_${rowData?.value}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData?.value
        );
    };

    const resourceStatusColumn = [
        { field: 'name', header: 'Resource Status', body: null, width: '60%' },
        { field: 'value', header: '',
         body: inputTextResStatus, 
         width: '40%' },
    ];
    const resourceStatusColumn1 = [
        { field: 'name', body: null, width: '60%' },
        { field: 'value', header: '',
         body: inputTextResStatus1, 
         width: '40%' },
    ];

    // const departmentColumn = [
    //     { field: 'deptName', header: 'Resource Department'},
    // ]

    const handleInputChange = (e) => {
        setEditedLabel(e.target.value);
    };
    const handleResStatusInputChange = (e) => {
        setEditedResStatus(e.target.value);
    };
    const handleResStatusInputChange1 = (e) => {
        setEditedResStatus1(e.target.value);
    };

    // const handleDept = () => {
    //         setShowDept(true);
    // };
    return (
        <div>
            <div className="row">
                <h4 className="p-text-primary">Resource Settings</h4>
                <h6 className="p-text-primary">Mandatory Onboarding options for resources</h6>
                {/* Resource Type */}
                <div>
                    <Toast ref={toast} />
                </div>
                <div>
                    <InlineEditDataTable data={workerTypes} columns={columns} actionTemplate={actionTemplate} />
                </div>
                <div>
                    <InlineEditDataTable
                        data={dataToDisplay}
                        // data={resStatus}
                        columns={resourceStatusColumn}
                        actionTemplate={actionTemplateResourceStatus}
                    />
                </div>
                <div>
                    <InlineEditDataTable
                        data={dataToDisplay1}
                        // data={resStatus}
                        columns={resourceStatusColumn1}
                        actionTemplate={actionTemplateResourceStatus1}
                    />
                </div>
                {/* addnewButton for Department */}
                {/* <div className="text-end mt-3">
                    {!showDept && (
                        <Button
                            icon="pi pi-plus fw-bold"
                            size="small"
                            type="button"
                            onClick={handleDept}
                            autoFocus={pendingAction === 'inputAddNew'}
                            ref={inputRef}
                        ></Button>
                    )}
                </div>
                <div className="mb-2">
                    {showDept && (
                        <AdminCreateDept
                            // pendingAction={pendingAction}
                            // inputRef={inputRef}
                            showDept={showDept}
                            setShowDept={setShowDept}
                            // onAddDepartment={handleAddDepartment}
                            // existingDepartments={existingDepartments}
                            // showSuccess={showSuccess}
                        />
                    )}
                </div>
                <div>
                    <InlineEditDataTable
                        data={department}
                        columns={departmentColumn}
                        // actionTemplate={actionTemplateDepartment}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default AdminResourceDataTable;

