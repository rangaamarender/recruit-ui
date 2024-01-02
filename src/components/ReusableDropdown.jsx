import { Dropdown } from 'primereact/dropdown';
import React from 'react';

const ReusableDropdown = ({ placeholder, options, value, onChange }) => {
    return (
        <>
            <Dropdown
                options={options}
                value={value}
                onChange={(e) => onChange(e.value)}
                placeholder={placeholder}
                optionLabel="name"
                className="fw-bold "
                size="small"
            />
        </>
    );
};

export default ReusableDropdown;
