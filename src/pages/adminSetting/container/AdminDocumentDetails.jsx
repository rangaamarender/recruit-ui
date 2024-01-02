import React, { useState } from 'react';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
// import CustomCheckbox from '../../../components/controls/CustomCheckbox';

const AdminDocumentDetails = ({ isEditClick, dataById, handleUpdate, selectedRow }) => {
    const { downloadable, expiryInd, monitorable, secure, docAttrDef } = dataById;
    // console.log(dataById);
    console.log(selectedRow);
    const [showEditForm, setShowEditForm] = useState(false);

    const onEditButtonClick = () => {
        setShowEditForm(true);
    };
    const renderInfoSection = (title, content) => (
        <div className="col-sm-12 col-md-4">
            <div className="p-text-secondary">{title}</div>
            <div className="p-text-primary">{content}</div>
        </div>
    );
    const {
        control,
        // handleSubmit,
        formState: { errors },
        // reset,
        // isDirty,
    } = useForm();

    const required = true;

    return (
        <>
            {showEditForm ? (
                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <form>
                        <div className="formgrid grid p-2 ">
                            <div className="col-12 md:col-6 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="documentAttName"
                                    labelId="documentNamelabel.label"
                                    defaultValue={selectedRow?.documentName}
                                    required={required}
                                    requiredMsg="documentNamelabel"
                                    placeholder="Document Name"
                                    autoFocus
                                />
                            </div>
                            <div className="col-12 md:col-6 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="documentDisplayName"
                                    labelId="documentDisplayName.label"
                                    defaultValue={selectedRow?.docDisplayName}
                                    required={required}
                                    requiredMsg="documentDisplayName"
                                    placeholder="Document Display Name"
                                />
                            </div>
                            {/* <CustomCheckbox
                                control={control}
                                name="checkbox1"
                                labelId="Download"
                                defaultValue={selectedRow.checkbox1}
                                className="col-12 md:col-3"
                                // rules={{ required: isDirty.checkbox1 && 'Checkbox is required' }}
                            /> */}
                            {/* <CustomCheckbox
                                control={control}
                                name="checkbox2"
                                labelId="Monitorable"
                                defaultValue={selectedRow.checkbox2}
                                className="col-12 md:col-3"
                                // rules={{ required: isDirty.checkbox2 && 'Checkbox is required' }}
                            /> */}
                            {/* <CustomCheckbox
                                control={control}
                                name="checkbox3"
                                labelId="Secure"
                                defaultValue={selectedRow.checkbox3}
                                className="col-12 md:col-3"
                                // rules={{ required: isDirty.checkbox3 && 'Checkbox is required' }}
                            /> */}
                            {/* <CustomCheckbox
                                control={control}
                                name="checkbox4"
                                labelId="ExpiryInd"
                                defaultValue={selectedRow.checkbox4}
                                className="col-12 md:col-3"
                                // rules={{ required: isDirty.checkbox4 && 'Checkbox is required' }}
                            /> */}
                        </div>
                        <div className="col-2">
                            <Button label="Update" size="small" onClick={() => handleUpdate()} type="button" />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="">
                    <div className="fs-5 fw-bold border-bottom flex align-items-center justify-content-between">
                        <div>Document Details</div>
                        <div>
                            {isEditClick && <i className="pi pi-pencil p-text-primary" onClick={onEditButtonClick}></i>}
                        </div>
                    </div>

                    <div className="row gutter-1 mt-3 px-2">
                        {renderInfoSection('Document Name', dataById.documentName)}
                        {renderInfoSection('Document Display Name', dataById.docDisplayName)}
                        {renderInfoSection('status', dataById.status)}
                    </div>

                    {/* checkbox */}
                    <div className="flex flex-wrap justify-content-between gap-3 mt-4">
                        <div className="flex align-items-center">
                            <Checkbox checked={downloadable} disabled />
                            <label htmlFor="downloadable" className="ml-2">
                                Downloadable
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={expiryInd} disabled />
                            <label htmlFor="Expiry Ind" className="ml-2">
                                Expiry Ind
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={monitorable} disabled />
                            <label htmlFor="monitorable" className="ml-2">
                                Monitorable
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={secure} disabled />
                            <label htmlFor="secure" className="ml-2">
                                Secured
                            </label>
                        </div>
                    </div>

                    <div className="fs-5 border-bottom mt-4 p-1">Document Attributions Def</div>
                    <div>
                        {docAttrDef?.map((attribute, index) => (
                            <>
                                <div key={index} className="row gutter-1 mt-3 px-2">
                                    {renderInfoSection('Attribute Name', attribute.documentAttrName)}
                                    {renderInfoSection('Attribute Display Name', attribute.attrDisplayName)}
                                    {renderInfoSection('Attribute Type', attribute.attrTyp)}
                                </div>
                                <div className="flex align-items-center">
                                    <Checkbox checked={attribute.required} disabled />
                                    <label htmlFor="attribute.required" className="ml-2">
                                        Required
                                    </label>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminDocumentDetails;
