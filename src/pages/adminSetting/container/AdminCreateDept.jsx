import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';




const AdminCreateDept = ({
    setShowDept,
    pendingAction,
    inputRef,
}) => {
    const [department, setDepartment] = useState('');
    
    // useEffect(() => {
    //     if (pendingAction === 'inputAddNew') {
    //         inputRef && inputRef.current && inputRef.current.focus();
    //     }
    // }, [pendingAction, inputRef]);

    // const handleAddDept = () => {
    //     const trimmedDepartment = department.trim();

    //     if (trimmedDepartment === '') {
    //         setValidationErrors('Department Name is required');
    //     } else if (existingDepartments.some((dept) => dept.toLowerCase() === trimmedDepartment.toLowerCase())) {
    //         setValidationErrors('Department Name already exists');
    //     } else {
    //         onAddDepartment(trimmedDepartment);
    //         setDepartment('');
    //         setValidationErrors('');
    //         setShowDept(false);
    //         showSuccess();
    //     }
    // };

    // const handleAddDept = () => {
    //     const data = {
    //         deptName: 'Adminstration10'
    //     };
    //     dispatch(createDepartmentRequest(data))
    //     dispatch(fetchDepartmentSuccess())
    // };
    // const handleAddDept = () => {
    //     const apiUrl = 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department';
    //     const postData = {
    //         deptName: 'Testing'
    //     };
    
    //     axios.post(apiUrl, postData)
    //       .then(response => {
    //         console.log('POST successful:', response.data);
    //         // Handle the response as needed
    //       })
    //       .catch(error => {
    //         console.error('Error making POST request:', error);
    //         // Handle errors as needed
    //       });
    //   };
    

    const hideaddDept = () => {
        setShowDept(false);
    };

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
                    <Button type="button" icon="pi pi-check"
                    //  onClick={handleAddDept}
                      />
                    <Button type="button" severity="secondary" icon="pi pi-times" onClick={hideaddDept} />
                </div>

                {/* {validationErrors && <div className="text-danger">{validationErrors}</div>} */}
            </div>
        </>
    );
};

export default AdminCreateDept;
