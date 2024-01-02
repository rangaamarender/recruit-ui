import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const SingleResourceRecruiterInfoChild = ({ setShowCreateRole, onAddDepartment, existingDepartments, setDataAdded }) => {
  const [department, setDepartment] = useState('');
  const [validationErrors, setValidationErrors] = useState('');

  const handleAddDept = () => {
    const trimmedDepartment = department.trim();

    if (trimmedDepartment === '') {
      setValidationErrors('Recruiter Name is required');
    } else if (existingDepartments.some((dept) => dept.toLowerCase() === trimmedDepartment.toLowerCase())) {
      setValidationErrors('Recruiter Name already exists');
    } else {
      onAddDepartment(trimmedDepartment);
      setDepartment('');
      setValidationErrors('');
      setShowCreateRole(false);
      setDataAdded(false); // Set dataAdded to true when a new department is added
    }
  };

  const hideaddDept = () => {
    setShowCreateRole(false);
    setDataAdded(false);
  };

  return (
    <>
      <div>
        <div className="p-inputgroup">
          <Dropdown
            className="w-full md:w-14rem"
            optionLabel="dept"
            optionValue="dept"
            placeholder="Recruiter Name"
            autoFocus
            value={department}
            options={[
              { id: 1, dept: 'Ravi' },
              { id: 2, dept: 'Ramesh' },
              { id: 3, dept: 'Swathi' },
            ]}
            onChange={(e) => setDepartment(e.value)}
          />
          <Button type="button" icon="pi pi-check" onClick={handleAddDept} />
          <Button type="button" severity="secondary" icon="pi pi-times" onClick={hideaddDept} />
        </div>

        {validationErrors && <div className="text-danger">{validationErrors}</div>}
      </div>
    </>
  );
};

export default SingleResourceRecruiterInfoChild;