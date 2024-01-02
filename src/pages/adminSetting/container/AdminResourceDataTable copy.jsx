import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Toast } from 'primereact/toast';
import AdminCreateDept from '../container/AdminCreateDept';
import InlineEditDataTable from '../components/InlineEditDataTable';

const AdminResourceDataTable = ({ editMode, setEditMode }) => {
    const toast = useRef(null);
    const [resources, setResources] = useState([
        { id: 1, resourceType: 'Internal (Own Employees)', label: 'W2' },
        { id: 2, resourceType: 'External (External Employees with no supplier)', label: '1099 Independent' },
        { id: 3, resourceType: 'External (External Employees associate with supplier)', label: 'Corp to Corp' },
    ]);

    const [resstatus, setResStatus] = useState([
        { id: 1, status: 'Billable (Assign to external clients )', label: 'Client' },
        { id: 2, status: 'Non-Billable (Assign to internal roles )', label: 'Internal' },
    ]);

    const [resDept, setResDept] = useState([
        { id: 1, dept: 'Engineering' },
        { id: 2, dept: 'Marketing' },
        { id: 3, dept: 'Sales' },
    ]);

    const [editingRow, setEditingRow] = useState(null);
    const [editedLabel, setEditedLabel] = useState(''); //  state for edited label
    const [editingResStatusRow, setEditingResStatusRow] = useState(null);
    const [editedResStatus, setEditedResStatus] = useState('');
    const [editingDeptRow, setEditingDeptRow] = useState(null);
    const [editedDept, setEditedDept] = useState('');
    // const [editMode, setEditMode] = useState(false);
    const [showDept, setShowDept] = useState(false); // for Create Department
    const [pendingAction, setPendingAction] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (pendingAction) {
            inputRef.current && inputRef.current.focus();
        }
    }, [pendingAction]);

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
        if (editingRow === rowData.id) {
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

    const actionTemplateResourceStatus = (rowData) => {
        if (editingResStatusRow === rowData.id) {
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
        } else {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit(rowData)} />
                </div>
            );
        }
    };

    const actionTemplateDept = (rowData) => {
        if (editingDeptRow === rowData.id) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTickDept(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelDeptEdit()}
                        className=""
                    />
                </div>
            );
        } else {
            return (
                <div className="d-flex align-item-center gap-4 cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleDeptEdit(rowData)} />
                    <AiOutlineDelete className="m-1" size="1rem" onClick={() => handleDeleteDept(rowData)} />
                </div>
            );
        }
    };

    const handleEdit = (rowData) => {
        if (editMode || showDept) {
            showError(`inputLabel_${rowData.id}`);
        } else {
            setEditingRow(rowData.id);
            setEditedLabel(rowData.label);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };
    const handleResStatusEdit = (rowData) => {
        if (editMode || showDept) {
            showError(`inputResStatus_${rowData.id}`);
        } else {
            setEditingResStatusRow(rowData.id);
            setEditedResStatus(rowData.label);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleDeptEdit = (rowData) => {
        if (editMode || showDept) {
            showError(`inputDept_${rowData.id}`);
        } else {
            setEditingDeptRow(rowData.id);
            setEditedDept(rowData.dept);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleTick = (rowData) => {
        const trimmedEditedLabel = editedLabel.trim().toLowerCase().replace(/\s+/g, ''); // Remove spaces

        if (!trimmedEditedLabel) {
            showErrorBlankValue();
        } else {
            const isDuplicate = resources.some(
                (r) => r.id !== rowData.id && r.label.trim().toLowerCase().replace(/\s+/g, '') === trimmedEditedLabel
            );

            if (isDuplicate) {
                showErrorDuplicate();
            } else {
                const updatedResources = resources.map((r) => (r.id === rowData.id ? { ...r, label: editedLabel } : r));
                setResources(updatedResources);
                setEditingRow(null);
                setEditMode(false); // Reset edit mode
                showSuccess();
            }
        }
    };

    const showErrorBlankValue = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Enter Your Input',
        });
    };

    const showErrorDuplicate = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Duplicate value. Please choose a different value.',
        });
    };
    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Value updated Succesfully.',
        });
    };

    const handleTickResStatus = (rowData) => {
        const trimmedEditableResStatus = editedResStatus.trim().toLowerCase().replace(/\s+/g, '');
        if (!trimmedEditableResStatus) {
            showErrorBlankValue();
        } else {
            const isResStatusDuplicate = resstatus.some(
                (r) =>
                    r.id !== rowData.id && r.label.trim().toLowerCase().replace(/\s+/g, '') === trimmedEditableResStatus
            );
            if (isResStatusDuplicate) {
                showErrorDuplicate();
            } else {
                const updatedResStatus = resstatus.map((r) =>
                    r.id === rowData.id ? { ...r, label: editedResStatus } : r
                );
                setResStatus(updatedResStatus);
                setEditingResStatusRow(null);
                setEditMode(false); // Reset edit mode
                showSuccess();
            }
        }
    };
    const handleTickDept = (rowData) => {
        const trimmedEditableDept = editedDept.trim().toLocaleLowerCase().replace(/\s+/g, '');
        if (!trimmedEditableDept) {
            showErrorBlankValue();
        } else {
            const isDeptDuplicate = resDept.some(
                (r) => r.id !== rowData.id && r.dept.trim().toLowerCase().replace(/\s+/g, '') === trimmedEditableDept
            );
            if (isDeptDuplicate) {
                showErrorDuplicate();
            } else {
                const updatedDept = resDept.map((r) => (r.id === rowData.id ? { ...r, dept: editedDept } : r));
                setResDept(updatedDept);
                setEditingDeptRow(null);
                setEditMode(false); // Reset edit mode
                showSuccess();
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingRow(null);
        setEditMode(false); // Reset edit mode
    };
    const handleCancelResStatusEdit = () => {
        setEditingResStatusRow(null);
        setEditMode(false); // Reset edit mode
    };
    const handleCancelDeptEdit = () => {
        setEditingDeptRow(null);
        setEditMode(false); // Reset edit mode
    };

    const inputTextTemplate = (rowData) => {
        return editingRow === rowData.id ? (
            <InputText
                id={`inputLabel_${rowData.id}`}
                value={editedLabel}
                onChange={(e) => handleInputChange(e, rowData)}
                autoFocus={pendingAction === `inputLabel_${rowData.id}`}
                ref={inputRef}
                className='form-control'
            />
        ) : (
            rowData.label
        );
    };
    const columns = [
        { field: 'resourceType', header: 'Resource Type', body: null, width: '60%' },
        { field: 'label', header: '', body: inputTextTemplate, width: '40%' },
    ];

    const inputTextResStatus = (rowData) => {
        return editingResStatusRow === rowData.id ? (
            <InputText
                id={`inputResStatus_${rowData.id}`}
                value={editedResStatus}
                onChange={(e) => handleResStatusInputChange(e, rowData)}
                autoFocus={pendingAction === `inputResStatus_${rowData.id}`}
                ref={inputRef}
                className='form-control'
            />
        ) : (
            rowData.label
        );
    };
    const columnsResStatus = [
        { field: 'status', header: 'Resource Status', body: null, width: '60%' },
        { field: 'label', header: '', body: inputTextResStatus, width: '40%' },
    ];
    const inputTextDept = (rowData) => {
        return editingDeptRow === rowData.id ? (
            <InputText
                id={`inputDept_${rowData.id}`}
                value={editedDept}
                onChange={(e) => handleDeptInputChange(e, rowData)}
                autoFocus={pendingAction === `inputDept_${rowData.id}`}
                ref={inputRef}
                className='form-control'
            />
        ) : (
            rowData.dept
        );
    };

    const handleInputChange = (e) => {
        setEditedLabel(e.target.value);
    };
    const handleResStatusInputChange = (e) => {
        setEditedResStatus(e.target.value);
    };
    const handleDeptInputChange = (e) => {
        setEditedDept(e.target.value);
    };

    const handleDeleteDept = (rowData) => {
        if (editMode || showDept) {
            showError(`inputDept_${rowData.id}`);
        } else {
            const deleteDept = resDept.filter((item) => item !== rowData);
            setResDept(deleteDept);
            clearPendingAction();
        }
    };
    const handleDept = () => {
        if (editMode) {
            showError('inputAddNew');
        } else {
            setShowDept(true);
            clearPendingAction();
        }
    };
    const existingDepartments = resDept.map((dept) => dept.dept.toLowerCase());

    const handleAddDepartment = (newDepartment) => {
        setResDept((prevResDept) => [...prevResDept, { id: prevResDept.length + 1, dept: newDepartment }]);
    };

    return (
        <div>
            <div className="row">
                <h4 className="p-text-primary">Resource Settings</h4>
                <h6 className='p-text-primary'>Mandatory Onboarding options for resources</h6>
                {/* Resource Type */}
                <div>
                    <Toast ref={toast} />
                </div>
                <div>
                    <InlineEditDataTable data={resources} columns={columns} actionTemplate={actionTemplate} />
                </div>
                {/* Resource Status */}
                <div className="mt-4">
                    <InlineEditDataTable
                        data={resstatus}
                        columns={columnsResStatus}
                        actionTemplate={actionTemplateResourceStatus}
                    />
                </div>
                {/* Add New Button */}
                <div className="text-end mt-3">
                    {!showDept && (
                        <Button
                            icon="pi pi-plus fw-bold"
                            label="Add New"
                            size="small"
                            text
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
                            pendingAction={pendingAction}
                            inputRef={inputRef}
                            showDept={showDept}
                            setShowDept={setShowDept}
                            onAddDepartment={handleAddDepartment}
                            existingDepartments={existingDepartments}
                            showSuccess={showSuccess}
                        />
                    )}
                </div>
                {/* Resource Department */}
                <div className="">
                    <DataTable value={resDept} size="small" dataKey="id">
                        <Column
                            field="dept"
                            header="Resource Department"
                            style={{ width: '72%' }}
                            body={inputTextDept}
                        />
                        <Column
                            body={actionTemplateDept}
                            headerStyle={{ width: '10%', minWidth: '1rem' }}
                            bodyStyle={{ textAlign: 'center' }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default AdminResourceDataTable;
