import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Toast } from 'primereact/toast';
// import AdminCreateDept from '../../../../../adminSetting/container/AdminCreateDept';
import SingleResourceRecruiterInfoChildcopy2 from './SingleResourceRecruiterInfoChildcopy2';

const SingleResourceRecruiterInfoChildcopy3 = () => {
    const toast = useRef(null);


    const [resDept, setResDept] = useState([
        { id: 1, dept: 'Engineering' , type:"Online"},
        { id: 2, dept: 'Marketing', type:"Offline" },
        { id: 3, dept: 'Sales',type:"Both" },
    ]);

    // const [editingRow, setEditingRow] = useState(null);

    const [editingDeptRow, setEditingDeptRow] = useState(null);
    const [editedDept, setEditedDept] = useState('');
    const [editMode, setEditMode] = useState(false);
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


    const handleCancelDeptEdit = () => {
        setEditingDeptRow(null);
        setEditMode(false); // Reset edit mode
    };




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

  //   const inputTextType = (rowData) => {
  //     return editingDeptRow === rowData.id ? (
  //         <InputText
  //             id={`inputDept_${rowData.id}`}
  //             value={editedDept}
  //             onChange={(e) => handleDeptInputChange(e, rowData)}
  //             autoFocus={pendingAction === `inputDept_${rowData.id}`}
  //             ref={inputRef}
  //             className='form-control'
  //         />
  //     ) : (
  //         rowData.dept
  //     );
  // };
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

    const handleAddDepartment = (newDepartment,newType) => {
        setResDept((prevResDept) => [...prevResDept, { id: prevResDept.length + 1, dept: newDepartment
          , type: newType
        }]);
    };

    return (
        <div>
            <div className="row">
                {/* Resource Type */}
                <div>
                    <Toast ref={toast} />
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
                        <SingleResourceRecruiterInfoChildcopy2
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
                            field="type"
                            header="Resource Type"
                            style={{ width: '72%' }}
                            // body={inputTextType}
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

export default SingleResourceRecruiterInfoChildcopy3;