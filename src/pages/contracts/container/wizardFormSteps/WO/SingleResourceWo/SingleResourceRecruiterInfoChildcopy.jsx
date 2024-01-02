import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const SingleResourceRecruiterInfoChildcopy = ({ setShowCreateRole, onAddDepartment, existingDepartments, setDataAdded }) => {
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
        <InputText autoFocus
                            className="w-full md:w-14rem" placeholder="Description" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    <Dropdown
            className="w-full md:w-14rem"
            optionLabel="dept"
            optionValue="dept"
            placeholder="Amount"
            value={department}
            options={[
              { id: 1, dept: '$20' },
              { id: 2, dept: '1.2%' },
            ]}
            onChange={(e) => setDepartment(e.value)}
          />
          <Dropdown
            className="w-full md:w-14rem"
            optionLabel="dept"
            optionValue="dept"
            placeholder="Type"
            value={department}
            options={
              [{ id: 'Percentage', dept: 'Percentage' },
              { id: 'Flat per Ch', dept: 'Flat per Ch' },]
          }
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

export default SingleResourceRecruiterInfoChildcopy;