import { Button } from "primereact/button";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiPencilFill } from 'react-icons/ri';
import CustomInputText from "../../../../.././components/controls/CustomInputText"
import CustomInputPhoneNbr from "../../../../.././components/controls/CustomInputPhoneNbr";
import CustomInputMask from "../../../../.././components/controls/CustomInputMask";
import { useSelector } from "react-redux";

export default function ContractProfileTabMode({ active, setActive }) {
            const {contractSummarySelected} = useSelector((state) => state.contract);
    const selectedCompany= contractSummarySelected;
    const [isEdit, setIsEdit] = useState(false);
    // const [selectedCompany, setSelectedCompany] = useState(
    //     {
    //         name: "Infosysys Private Limited",
    //         createdDate: "20/11/2023",
    //         WebAddress: "www.google.com",
    //         phoneNumber: "(264)-2552-162",
    //         fax: "(264)-2552-162"
    //     }
    // );
    // console.log(setSelectedCompany);
    const handleEdit = () => {
        setIsEdit(true);
        setActive('editProfileDetails')
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("readMode")
    };

    useEffect(() => {
        if (active === 'editProfileDetails') {
            setIsEdit(true);
        }
    }, [isEdit, active]);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // const updatedCompany = { ...selectedCompany, ...data };
        // dispatch(updateContractsRequest(selectedCompany.organizationID, updatedCompany));
        // setIsEdit(true);
        console.log(data, "update");
    };

    const editViewIconToggle = useSelector((state) => state.contract.contractAction);

    return (
        <div>
            {/* <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Profile</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    {!isEdit && editViewIconToggle !== 'view' && (<RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />)}
                </div>

            </div> */}
            {isEdit ? (<>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formgrid grid p-3">
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="name"
                                labelId="companyName"
                                placeholder="Company name"
                                defaultValue={selectedCompany.name}
                                autoFocus
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputPhoneNbr
                                control={control}
                                errors={errors}
                                name="phoneNumber"
                                labelId="phoneNbr"
                                maskFormat="(999) 999-9999"
                                defaultValue={selectedCompany.phoneNumber}
                                requiredMsg="phoneNumber.required"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputMask
                                control={control}
                                errors={errors}
                                name="fax"
                                labelId="fax"
                                mask="(999) 999-9999"
                                defaultValue={selectedCompany.fax}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="WebAddress"
                                labelId="WebAddress"
                                placeholder="Web Address"
                                defaultValue={selectedCompany.WebAddress}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="createdDate"
                                labelId="createdDate"
                                placeholder="Web Address"
                                defaultValue={selectedCompany.createdDate}
                            />
                        </div>

                        <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3'>
                            <Button type="button" security='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancelEdit} />
                            <Button type="submit" security='primary' label='Update' size='small' className="ms-2 me-2" onClick={handleCancelEdit} />
                        </div>
                    </div>
                </form>
            </>) : (
            <>
             <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Contract Profile</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    {!isEdit && editViewIconToggle !== 'view' && (<RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />)}
                </div>

            </div>
<div className="formgrid grid m-2">
                      <div className="col-12 md:col-6">
                            <label>Contract Name</label>
                            <p className='fw-bold'>{selectedCompany?.contractName || ''}</p>
                        </div>
                               
                        <div className="col-12 md:col-6">
                             <label>Company Name</label>
                            <p className='fw-bold'>{selectedCompany?.relatedOrg?.name || ''}</p>
                        </div>              
                        <div className="col-12 md:col-6">
                            <label>Start Date</label>
                            <p className='fw-bold'>{selectedCompany?.startDate|| ''}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label>Status</label>
                            <p className='fw-bold'>{selectedCompany?.contractStatus|| ''}</p>
                        </div>
                  </div>
                  <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div>Contract Accounts</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <RiPencilFill
                        // onClick={handleEdit}
                        className="cursor-pointer company-primary-text company-main-text fs-4"
                    />
                </div>
            </div>
{selectedCompany?.contractAccounts?.map((item, index) => 
( 
<div key={index} className="formgrid grid m-2">
                      <div className="col-12 md:col-6">
                            <label>Contract Account Name</label>
                            <p className='fw-bold'>{item?.contractAccountName || ''}</p>
                     </div>
                        <div className="col-12 md:col-6">
                            <label>Contract NextBillDate</label>
                            <p className='fw-bold'>{item?.nextBillDate || ''}</p>
                        </div>              
                        <div className="col-12 md:col-6">
                            <label>Contract StartDate</label>
                            <p className='fw-bold'>{item?.startDate || ''}</p>
                        </div>            
            </div>
            ))
        }
            </>
            )}
        </div>
    )
}