


import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { AiOutlineDelete } from 'react-icons/ai';
import { Toast } from 'primereact/toast';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import SingleResourceRecruiterInfoChild from './SingleResourceRecruiterInfoChild';


const SingleResourceRecruiterInfoParent = ({control,errors, setSkip}) => {
    const toast = useRef(null);
    const [resDept, setResDept] = useState([
        { id: 1, dept: 'Ravi' },
        { id: 2, dept: 'Swathi' },
    ]);
        const options = [
        { value: 'AccountManger1', label: 'AccountManger1' },
        { value: 'AccountManger2',label: 'AccountManger2' },
    ];
    const [dataAdded, setDataAdded] = useState(false);
    let required = true;
    const [showCreateRole, setShowCreateRole] = useState(false);
    const existingDepartments = resDept.map((dept) => dept.dept.toLowerCase());
    const handleAddDepartment = (newDepartment) => {
        setResDept((prevResDept) => [...prevResDept, { id: prevResDept.length + 1, dept: newDepartment }]);
    };
    const handleAddNewClick = () => {
        setShowCreateRole(true);
        setDataAdded(true); // Set dataAdded to true when the user clicks on "Add"
    };


    const [editingDeptRow, setEditingDeptRow] = useState(null);

    const [editMode, setEditMode] = useState(false); // New state variable to track edit mode
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

                </div>
            );
        } else {
            return (
                <div className="d-flex align-item-center gap-4 cursor-pointer">

                    <AiOutlineDelete className="m-1" size="1rem" onClick={() => handleDeleteDept(rowData)} />
                </div>
            );
        }
    };

    const handleDeleteDept = (rowData) => {
        // if (editMode || showDept) {
        //     showError(`inputDept_${rowData.id}`);
        // } else {
        //     const deleteDept = resDept.filter((item) => item !== rowData);
        //     setResDept(deleteDept);
        //     clearPendingAction();
        // }
        if (editMode || showDept || dataAdded === true) {
            showError(`inputDept_${rowData.id}`);
        //             toast.current.show({
        //     severity: 'error',
        //     summary: 'Error',
        //     detail: 'Cannot delete without submitting data',
        //     life: 3000, // Show for 3 seconds
        // });
        return;
        } else {
            const deleteDept = resDept.filter((item) => item !== rowData);
            setResDept(deleteDept);
            clearPendingAction();
        }
    };
useEffect(()=>{
    setSkip(false);
},[setSkip]);
console.log(setEditingDeptRow,setEditMode,setShowDept,"setEditingDeptRow");
    return (
        <div>
 <div className=" flex-wrap gap-3 p-fluid">
                <h4 className="fw-bold text-center" >Account Manager Info</h4>
                <Toast ref={toast} />
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="accountManager"
                    labelId="accountManager.label"
                    defaultValue=""
                    options={options}
                    required={required}
                    requiredMsg="accountManager.required"
                    placeholder="Select selectedMsa type"
                    className="md:col-12"
                />
            </div>
                        <Toast ref={toast} />       
                     {!showCreateRole &&
                    <> 
                        <div className="flex justify-content-between">
                            <h4 className='fw-bold ml-2'>RecruiterInfo</h4>        
                            <Button className="w-1" icon="pi pi-plus" label="ADD" size="small" type="button" onClick={handleAddNewClick}></Button>
                        </div>
                        </>   
                    }
                    <div className='mb-2'>
                        {showCreateRole && <SingleResourceRecruiterInfoChild showCreateRole={showCreateRole} setShowCreateRole={setShowCreateRole}
                            onAddDepartment={handleAddDepartment}
                            existingDepartments={existingDepartments}
                            setDataAdded={setDataAdded}
                        />}
                    </div>

                    <div className="">
                        <DataTable value={resDept} size="small" dataKey="id" className="card">
                            <Column
                                field="dept"
                                header="RecruiterName"
                                style={{ width: '72%' }}
                            />
                            <Column
                                body={actionTemplateDept}
                                headerStyle={{ width: '3%', minWidth: '1rem' }}
                                bodyStyle={{ textAlign: 'center' }}
                            ></Column>
                        </DataTable>
                    </div>
                </div>
    );
};

export default SingleResourceRecruiterInfoParent;