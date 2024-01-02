import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { RiPencilFill } from 'react-icons/ri';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateResourceRequest } from '../../../../redux/actions/resourceActions';

function EditResourceAddress({ active, setActive }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const selectedResource = useSelector((state) => state.resource.selectedResource);

    const onSubmit = (data) => {
        const updatedworkerStatus = selectedResource.workerStatus.map((item, index) => ({
            ...item, ...data.workerStatus[index],
        }));
        const updatedData = {
            personLegal: { ...selectedResource.personLegal, ...data.personLegal },
            workerStatus: updatedworkerStatus,
        };
        const updatedResource = { ...selectedResource, ...updatedData };
        dispatch(updateResourceRequest(selectedResource.workerID, updatedResource));
    }

    const handleEdit = () => {
        setIsEdit(true);
        setActive('editResourceAddress');
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("all");
    };

    return (
        <>
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Address</div>
                {!isEdit && (
                    <div className="d-flex justify-content-between align-items-center gap-3">
                        <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                    </div>
                )}
            </div>

            {isEdit ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formgrid grid p-3">
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.givenName"
                                labelId="firstName.label"
                                placeholder="first name"
                                defaultValue={"Phone"}
                                autoFocus
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.familyName"
                                labelId="lastName.label"
                                placeholder="Email"
                                defaultValue={"Email"}
                            />
                        </div>
                        <div className="p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                            <Button type="button" severity="secondary" label="Cancel" size="small" className="" onClick={handleCancelEdit} />
                            <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    <div className="formgrid grid m-2">
                        <div className="col-12 md:col-6">
                            <label className='label-name'>Address 1</label>
                            <p className="label-name-view">{"Hyderabad"}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='label-name'>Address 2</label>
                            <p className="label-name-view">{"Madhapur"}</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default EditResourceAddress;
