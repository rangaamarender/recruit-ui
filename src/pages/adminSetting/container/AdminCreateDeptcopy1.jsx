import React, { useState,useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AdminCreateDeptcopy1 = ({setShowDept, onAddDepartment,existingDepartments,pendingAction,inputRef,showSuccess }) => {
    const [department, setDepartment] = useState('');
    const [validationErrors, setValidationErrors] = useState('');

    useEffect(() => {
        if (pendingAction === 'inputAddNew') {
            inputRef && inputRef.current && inputRef.current.focus();
        }
    }, [pendingAction, inputRef]);

    const handleAddDept = () => {
        const trimmedDepartment = department.trim();

        if (trimmedDepartment === '') {
            setValidationErrors('Department Name is required');
        } else if (existingDepartments.some((dept) => dept.toLowerCase() === trimmedDepartment.toLowerCase())) {
            setValidationErrors('Department Name already exists');
        } else {
            onAddDepartment(trimmedDepartment);
            setDepartment('');
            setValidationErrors('');
            setShowDept(false);
            showSuccess();
        }
    };

    const hideaddDept = () => {
        setShowDept(false)
    }
    
    return (
        <>
            <div>
                <div className="p-inputgroup">
                    <InputText
                        className="w-full md:w-14rem"
                        placeholder="Department Name"
                        autoFocus={pendingAction === 'inputAddNew'}
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        ref={inputRef}
                    />
                    <Button type="button" icon="pi pi-check" onClick={handleAddDept}  />
                    <Button  type="button" severity="secondary" icon="pi pi-times" onClick={hideaddDept} />
                </div>

                {validationErrors && <div className="text-danger">{validationErrors}</div>}
            </div>
        </>
    );
};

export default AdminCreateDeptcopy1;