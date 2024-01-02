import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import { Toast } from 'primereact/toast';

const EditDocuments = ({ setActive }) => {

    const { handleSubmit } = useForm();
    // const { control, handleSubmit, formState: { errors } } = useForm();
    const toast = useRef(null)

    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.company.selectedCompany);
    const action = useSelector((state) => state.company.action);

    const onSubmit = (data) => {
        const updatedCompany = { ...selectedCompany, ...data };
        dispatch(updateCompanyRequest(selectedCompany.organizationID, updatedCompany));
        setIsEdit(false);
        setActive('all');

        // toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Profile Updated Successfully' })
    };

    const handleEdit = () => {
        setIsEdit(true);
        setActive("editDocuments")
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("all")
    };

    return (
        <>
            <Toast ref={toast} />

            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Documents</div>
                {!isEdit && action !== 'view' && (
                    <div className="d-flex justify-content-between align-items-center gap-3">
                        <RiPencilFill
                            onClick={handleEdit}
                            className="d-none cursor-pointer company-primary-text company-main-text fs-4"
                        // className="cursor-pointer company-primary-text company-main-text fs-4"
                        />
                    </div>
                )}
            </div>
            {isEdit ? (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formgrid grid p-3">
                            {/* <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="addressName"
                                    labelId="addressName"
                                    defaultValue={selectedCompany.addressName}
                                    placeholder="Ex: office, home etc.."
                                    autoFocus
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="address1"
                                    labelId="address1"
                                    defaultValue="address1"
                                    placeholder="Address line 1"
                                />
                            </div> */}
                            <div className='p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3'>
                                <Button type="button" severity='secondary' label='Cancel' size='small' className="" onClick={handleCancelEdit} />
                                <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
                            </div>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div class="formgrid grid m-2">
                        {/* <div class="col-12 md:col-6">
                            <label class>Ex: office, home etc..</label>
                            <p className='fw-bold'>{selectedCompany.addressName}</p>
                        </div>
                        <div class="col-12 md:col-6">
                            <label>Address Line 1</label>
                            <p className='fw-bold'>{"address1"}</p>
                        </div> */}

                        <h6 className='p-3'> No Data Available...</h6>
                    </div>
                </>
            )}
        </>
    );
};

export default EditDocuments;
