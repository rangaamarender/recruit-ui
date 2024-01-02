// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { useForm } from 'react-hook-form';
// import { RiPencilFill } from 'react-icons/ri';
// import { useDispatch, useSelector } from 'react-redux';
// import CustomInputText from '../../../../components/controls/CustomInputText';
// import CustomDropdown from '../../../../components/controls/CustomDropdown';
// import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
// import CustomInputMask from '../../../../components/controls/CustomInputMask';
// import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';

// const ContractProfiles = ({setActive}) => {
//     const options = [
//         { value: 'option1', label: 'option1' },
//         { value: 'option2', label: 'option2' },
//         { value: 'option3', label: 'option3' },
//         { value: 'option4', label: 'option4' },
//     ];

//     const { control, handleSubmit, formState: { errors } } = useForm();
//     const [isEdit, setIsEdit] = useState(false);
//     const dispatch = useDispatch();
//     const selectedCompany = useSelector((state) => state.company.selectedCompany);

//     const onSubmit = (data) => {
//         const updatedCompany = { ...selectedCompany, ...data };
//         dispatch(updateCompanyRequest(selectedCompany.organizationID, updatedCompany));
//         setIsEdit(true);
//     };

//     const handleEdit = () => {
//         setIsEdit(true);
//         setActive('editProfileDetails')
//     };

//     const handleCancelEdit = () => {
//         setIsEdit(false);
//         setActive("all")
//     };

//     return (
//         <>
//             <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
//                 <div>Profile</div>
//                 <div className="d-flex justify-content-between align-items-center gap-3">
//                     <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
//                 </div>
//             </div>
//             {isEdit ? (
//                 <>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="formgrid grid p-3">
//                             <div className="col-12 md:col-6">
//                                 <CustomInputText
//                                     control={control}
//                                     errors={errors}
//                                     name="name"
//                                     labelId="companyName"
//                                     placeholder="Company name"
//                                     defaultValue={selectedCompany.name}
//                                     autoFocus
//                                 />
//                             </div>
//                             <div className="col-12 md:col-6">
//                                 <CustomInputText
//                                     control={control}
//                                     errors={errors}
//                                     name="dba"
//                                     labelId="dba"
//                                     defaultValue="Business Name"
//                                     placeholder="DBA name"
//                                 />
//                             </div>
//                             <div className="col-12 md:col-6">
//                                 <CustomInputMask
//                                     control={control}
//                                     errors={errors}
//                                     name="taxId"
//                                     labelId="ein"
//                                     mask="99-9999999"
//                                     defaultValue={selectedCompany.taxId}
//                                     disabled
//                                 />
//                             </div>
//                             <div className="col-12 md:col-6">
//                                 <CustomDropdown
//                                     control={control}
//                                     errors={errors}
//                                     name="taxClassification"
//                                     labelId="taxClassification"
//                                     defaultValue=""
//                                     options={options}
//                                     placeholder="Select Tax Classification"
//                                 />
//                             </div>
//                             <div className="col-12 md:col-6">
//                                 <CustomInputPhoneNbr
//                                     control={control}
//                                     errors={errors}
//                                     name="phoneNumber"
//                                     labelId="phoneNbr"
//                                     maskFormat="(999) 999-9999"
//                                     defaultValue={selectedCompany.phoneNumber}
//                                     requiredMsg="phoneNumber.required"
//                                 />
//                             </div>
//                             <div className="col-12 md:col-6">
//                                 <CustomInputMask
//                                     control={control}
//                                     errors={errors}
//                                     name="fax"
//                                     labelId="fax"
//                                     mask="(999) 999-9999"
//                                     defaultValue={selectedCompany.fax}
//                                 />
//                             </div>
//                             <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3'>
//                                 <Button type="button" security='secondary' label='Cancel' size='small' className="" onClick={handleCancelEdit} />
//                                 <Button type="submit" security='primary' label='Update' size='small' className="ms-2 me-2" />
//                             </div>
//                         </div>
//                     </form>
//                 </>
//             ) : (
//                 <>
//                     <div className="formgrid grid m-2">
//                         <div className="col-12 md:col-6">
//                             <label>Company name</label>
//                             <p className='fw-bold'>{selectedCompany.name}</p>
//                         </div>
//                         <div className="col-12 md:col-6">
//                             <label>DBA (if different)</label>
//                             <p className='fw-bold'>{"Business Name"}</p>
//                         </div>
//                         <div className="col-12 md:col-6">
//                             <label>EIN</label>
//                             <p className='fw-bold'>{selectedCompany.taxId}</p>
//                         </div>
//                         <div className="col-12 md:col-6">
//                             <label>Tax Classification</label>
//                             <p className='fw-bold'>{selectedCompany.taxClassification}</p>
//                         </div>
//                         <div className="col-12 md:col-6">
//                             <label>Phone</label>
//                             <p className='fw-bold'>{selectedCompany.phoneNumber}</p>
//                         </div>
//                         <div className="col-12 md:col-6">
//                             <label>Fax</label>
//                             <p className='fw-bold'>{selectedCompany.fax}</p>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default ContractProfiles;

import React from 'react';
import { RiPencilFill } from 'react-icons/ri';


export default function ContractProfiles(){
return(

<>
<div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Users</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <RiPencilFill
                        // onClick={handleEdit}
                        className="cursor-pointer company-primary-text company-main-text fs-4"
                    />
                </div>
            </div>

<div className="formgrid grid m-2">
                      <div className="col-12 md:col-6">
                            <label>Company name</label>
                            <p className='fw-bold'>Infosysys Private Limited</p>
                        </div>
                               
                        <div className="col-12 md:col-6">
                             <label>Phone</label>
                            <p className='fw-bold'>(264)-2552-162</p>
                        </div>              
                        <div className="col-12 md:col-6">
                            <label>Fax</label>
                            <p className='fw-bold'>---</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label>Web Address</label>
                            <p className='fw-bold'>www.google.com</p>
                        </div>
                  </div>
                  <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>CEO Details</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <RiPencilFill
                        // onClick={handleEdit}
                        className="cursor-pointer company-primary-text company-main-text fs-4"
                    />
                </div>
            </div>

<div className="formgrid grid m-2">
                      <div className="col-12 md:col-6">
                            <label>CEO name</label>
                            <p className='fw-bold'>Ravi chandran</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label>Author Signatory Email</label>
                            <p className='fw-bold'>ravichandran@Infosysys.com</p>
                        </div>              
                       
            </div>
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Address</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <RiPencilFill
                        // onClick={handleEdit}
                        className="cursor-pointer company-primary-text company-main-text fs-4"
                    />
                </div>
            </div>

<div className="formgrid grid m-2">
                      <div className="col-12 md:col-6">
                            <label>Address 1</label>
                            <p className='fw-bold'>(264)-2552-162</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label>Address 2</label>
                            <p className='fw-bold'>(264)-2552-162
                            </p>
                        </div>              
                       
            </div>
                  </>
                )
}