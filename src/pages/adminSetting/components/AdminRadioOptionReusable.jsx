import React, { useRef } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';

const AdminRadioOptionReusable = ({
    title,
    options,
    state,
    setState,
    showInputSwitch,
    onChange,
    checked,
    disabled,
    editMode,
    setEditMode,

}) => {
    const toast = useRef(null);

    const handleInputSwitchChange = (e) => {
        if (e.value && editMode) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `${title} cannot be enabled. Complete the current action first!`,
            });
        } else {
            setState(e.value);
            setEditMode(null);
            if (e.value) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: `${title} enabled successfully!`,
                });
            }
        }
    };
    const renderInputSwitch = () => {
        if (showInputSwitch) {
            return <InputSwitch checked={state} onChange={(e) => handleInputSwitchChange(e)} />;
        }
        return null;
    };
    return (
        <>
            <div className="card p-3">
                <div>
                    <Toast ref={toast} />
                </div>
                <div className="d-flex justify-content-between">
                    <div className="">{title}</div>
                    <div className="">{renderInputSwitch()}</div>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="row">
                        {options.map((option) => (
                            <div key={option.value} className="col-md-4 col-sm-6">
                                <div className="d-flex p-2 gap-1">
                                    <RadioButton
                                        inputId={option.value}
                                        name={`option-${title}`}
                                        value={option.value}
                                        onChange={onChange}
                                        checked={checked === option.value}
                                        disabled={disabled}
                                    />
                                    <label htmlFor={option.value} className="cursor-pointer p-text-secondary">
                                        {option.label}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRadioOptionReusable;

// import React from 'react';
// import { InputSwitch } from 'primereact/inputswitch';
// import { RadioButton } from 'primereact/radiobutton';

// const AdminRadioOptionReusable = ({
//     title,
//     options,
//     state,
//     setState,
//     showInputSwitch,
//     onChange,
//     checked,
//     disabled,
//     onInputSwitchChange
// }) => {

//     const handleInputSwitchChange = (e) => {
//         if (onInputSwitchChange) {
//           onInputSwitchChange(e);
//         }
//       };
//     const renderInputSwitch = () => {
//         if (showInputSwitch) {
//             return <InputSwitch checked={state} onChange={(e) => handleInputSwitchChange(e)} />;
//         }
//         return null;
//     };
//     return (
//         <>
//             <div className="card p-3">
//                 <div className="d-flex justify-content-between">
//                     <div className="">{title}</div>
//                     <div className="">{renderInputSwitch()}</div>
//                 </div>
//                 <hr></hr>
//                 <div className="container">
//                     <div className="row">
//                         {options.map((option) => (
//                             <div key={option.value} className="col-md-4 col-sm-6">
//                                 <div className="d-flex p-2 gap-1">
//                                     <RadioButton
//                                         inputId={option.value}
//                                         name={`option-${title}`}
//                                         value={option.value}
//                                         onChange={onChange}
//                                         checked={checked === option.value}
//                                         disabled={disabled}
//                                     />
//                                     <label htmlFor={option.value} className="cursor-pointer p-text-secondary">
//                                         {option.label}
//                                     </label>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminRadioOptionReusable;

