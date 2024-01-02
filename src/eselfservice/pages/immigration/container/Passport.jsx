import { Button } from 'primereact/button';
import React from 'react'
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomCalender from '../../../../components/controls/CustomCalender';
import Viewer from '../../../../components/viewers/Viewer';
import { RiPencilFill } from 'react-icons/ri';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { useRef,useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';

function Passport({setActive}) {
    const toast = useRef(null); 
    const required = false

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);

    const onSubmit = (data) => {
        setIsEdit(false);
        setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Passport details updated successfully!',
          });
    };

    const handleEdit = () => {
        setIsEdit(true);
        setActive('all')
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("all")
    };

    const handleOnHide = ()=>{

        setIsEdit(false);
        setActive("all")
    }

    return (
        <>
            <div className='rounded border p-2 mt-4'>


                <div className="formgrid grid m-2">
                    <div className="col-12 md:col-3 mb-2">
                     <label className='p-text-secondary'>Passport Number</label>
                     <p className="p-text-primary">{"---"}</p>
                 </div>
                 <div className="col-12 md:col-3  mb-2">
                     <label className='p-text-secondary'>Passport Issue Date</label>
                     <p className="p-text-primary">{"---"}</p>
                 </div>
                 <div className="col-12 md:col-4  mb-2">
                     <div className='formgroup-inline'>
                         <div className='field-checkbox'>
                             <input type='checkbox' id="passport" className='cursor-pointer  custom-checkbox'

                                    // checked={isCheckboxChecked}
                                    readOnly
                                />
                                <label for="passport" className='fw-bold cursor-pointer'> Remind me 6 months before expiration </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-2 mb-2 text-end ">
                        {!isEdit && (
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        )}
                    </div>

                    <div className="col-12 md:col-3 ">
                     <label className='p-text-secondary'>Password Exp Date</label>
                     <p className="p-text-primary">{"---"}</p>
                 </div>
                 <div className="col-12 md:col-3 ">
                     <label className='p-text-secondary'>Entered US First Time</label>
                     <p className="p-text-primary">{"---"}</p>
                 </div>
                </div>

                <Toast ref={toast} />
                {isEdit && (
                    <Viewer
                        visible={isEdit}
                        onHide={handleOnHide}
                        header={
                            <TitleHeaderOnly
                                onClick={handleOnHide}
                                title={"Edit Passport Deatils"}
                            />
                        }
                        contentComponent={
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3">
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="passportNumber"
                                        labelId="Passport Number"
                                        placeholder="Passport number"
                                        defaultValue={""}
                                        autoFocus
                                        required={required}
                                        requiredMsg="Passport number is required"
            
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomCalender
                                        control={control}
                                        errors={errors}
                                        name="passportIssueDate"
                                        labelId="Passport Issue Date"
                                        showIcon={true}
                                        placeholder="YYYY-MM-DD"
                                        defaultValue={""}
                                        required={required}
                                        requiredMsg="nmm"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomCalender
                                        control={control}
                                        errors={errors}
                                        name="passportExpDate"
                                        labelId="Passport Exp Date"
                                        showIcon={true}
                                        placeholder="YYYY-MM-DD"
                                        defaultValue={""}
                                        required={required}
                                        requiredMsg="nmm"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomCalender
                                        control={control}
                                        errors={errors}
                                        name="enteredUSfirstTime"
                                        labelId="Entered US First Time"
                                        showIcon={true}
                                        placeholder="YYYY-MM-DD"
                                        defaultValue={""}
                                        required={required}
                                        requiredMsg="nmm"
                                    />
                                </div>
                               
                                <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3'>
                                    <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancelEdit} />
                                    <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
                                </div>
                            </div>
                        </form>
                        }
                    />
                )}
                

            </div>

        </>
    )
}

export default Passport


//     <div className='rounded border p-2 mt-4'>
//         <div className="formgrid grid m-2">
//             <div className="col-12 md:col-4 mb-2">
//                 <label className='p-text-secondary'>Passport Number</label>
//                 <p className="p-text-primary">{"---"}</p>
//             </div>
//             <div className="col-12 md:col-4  mb-2">
//                 <label className='p-text-secondary'>Passport Issue Date</label>
//                 <p className="p-text-primary">{"---"}</p>
//             </div>
//             <div className="col-12 md:col-4  mb-2">
//                 <div className='formgroup-inline'>
//                     <div className='field-checkbox'>
//                         <input type='checkbox' id="expenses" className='cursor-pointer  custom-checkbox'

//                             // checked={isCheckboxChecked}
//                             readOnly
//                         />
//                         <label for="expenses" className='fw-bold cursor-pointer'> Remember me 6 months before expiration </label>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-12 md:col-4 ">
//                 <label className='p-text-secondary'>Password Exp Date</label>
//                 <p className="p-text-primary">{"---"}</p>
//             </div>
//             <div className="col-12 md:col-4 ">
//                 <label className='p-text-secondary'>Entered US First Time</label>
//                 <p className="p-text-primary">{"---"}</p>
//             </div>
//         </div>

//     </div>
// )