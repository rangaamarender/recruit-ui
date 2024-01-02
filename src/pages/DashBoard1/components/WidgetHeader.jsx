import React from 'react';
import { Button } from 'primereact/button';

const WidgetHeader = ({
    heading,
    placeholder,
    onDropdownChange,
    dropdownValue,
    dropDownOptions,
    type,
    buttonLabel,
    icon,
}) => {
    return (
        <>
            <div className="flex  align-items-center  justify-content-between mt-1">
                <div className="fs-5 fw-bold"> {heading}</div>
                {type === 'dropDown' ? (
                    <select className="w-auto p-2 rounded" value={dropdownValue} onChange={onDropdownChange}>
                        {dropDownOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <Button label={buttonLabel} text icon={icon} />
                )}
            </div>
        </>
    );
};

export default WidgetHeader;
