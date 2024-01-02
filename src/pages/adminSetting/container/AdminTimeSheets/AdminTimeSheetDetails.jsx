import React, { useEffect, useState } from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import CustomCheckboxDoument from '../../../../components/common/CustomCheckboxDoument';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputTextArea from '../../../../components/controls/CustomInputTextArea';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const AdminTimeSheetDetails = ({
    formData,
    // handleInputChange,
    setFormData,
    isEditClick,
    dataById,
    handleCheckbox1Change,
    handleCheckbox2Change,
    handleCheckbox3Change,
    handleCheckbox4Change,
    attributeTypeOptions,
    showEditForm,
    setShowEditForm,
    checkbox3,
}) => {
    const {
        control,
        // handleSubmit,
        formState: { errors },
        reset,
        // isDirty,
        setValue,
        getValues,
        watch,
    } = useForm();
    const { downloadable, expiryInd, monitorable, secure, docAttrDef } = dataById;

    const expiryValue = watch('checkbox3');
    const [showAttForm, setShowAttForm] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [documentAttrDefinitions, setDocumentAttrDefinitions] = useState(docAttrDef);

    // console.log(documentAttrDefinitions);
    const onEditButtonClick = () => {
        setShowEditForm(true);
    };
    const renderInfoSection = (title, content) => (
        <div className="col-sm-12 col-md-4">
            <div className="p-text-secondary">{title}</div>
            <div className="p-text-primary">{content}</div>
        </div>
    );
    const renderInfoSection2 = (title, content) => (
        <div className="col-sm-12 col-md-3">
            <div className="p-text-secondary">{title}</div>
            <div className="p-text-primary">{content}</div>
        </div>
    );
    const collectAndAddFormData = () => {
        const { documentAttrName, attrDisplayName, attrType, Description, required } = getValues();

        const displayOrder = documentAttrDefinitions.length + 1;
        const uniqueId = Math.random();

        const formData = {
            id: selectedRow ? selectedRow.id : uniqueId,
            documentAttrName,
            attrDisplayName,
            attrType,
            Description,
            required,
            displayOrder: selectedRow ? selectedRow.displayOrder : displayOrder,
        };

        if (selectedRow === null) {
            setDocumentAttrDefinitions([...documentAttrDefinitions, formData]);
        } else {
            const updatedDefinitions = [...documentAttrDefinitions];
            const rowIndexToEdit = updatedDefinitions.findIndex((definition) => definition.id === selectedRow.id);

            if (rowIndexToEdit !== -1) {
                updatedDefinitions[rowIndexToEdit] = formData;
                setDocumentAttrDefinitions(updatedDefinitions);
                setSelectedRow(null);
            }
        }
        reset({
            documentAttrName: '',
            attrDisplayName: '',
            attrType: '',
            Description: '',
            required: false,
        });
    };
    const handleDelete = (rowId) => {
        const updatedDefinitions = documentAttrDefinitions.filter((definition) => definition.id !== rowId);

        updatedDefinitions.forEach((definition, index) => {
            definition.displayOrder = index + 1;
        });

        setDocumentAttrDefinitions(updatedDefinitions);
    };
    const required = true;
    const handleEdit = (rowData, rowIndex) => {
        setShowAttForm(true);
        Object?.keys(rowData).forEach((key) => {
            setValue(key, rowData[key]);
        });

        setSelectedRow({ id: rowData.id, displayOrder: rowData.displayOrder });
    };
    const [documentName, setDocumentName] = useState('');

    useEffect(() => {
        setDocumentName(dataById.documentName || '');
    }, [dataById.documentName]);

    const handleInputChange = (fieldName, value) => {
        setDocumentName(value);

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

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
                                    name="documentName"
                                    labelId="documentNamelabel.label"
                                    required={required}
                                    requiredMsg="documentNamelabel"
                                    placeholder="Document Name"
                                    autoFocus
                                    defaultValue={documentName}
                                    // value={formData.documentName}
                                    onChange={(e) => handleInputChange('documentName', e.target.value)}
                                />
                            </div>
                            <div className="col-12 md:col-6 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="docDisplayName"
                                    labelId="documentDisplayName.label"
                                    required={required}
                                    requiredMsg="documentDisplayName"
                                    placeholder="Document Display Name"
                                    defaultValue={dataById.docDisplayName}
                                    // value={formData.docDisplayName}
                                    onChange={(e) => handleInputChange('docDisplayName', e.target.value)}
                                />
                            </div>
                            {/* checkbox */}
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox1"
                                labelId="Download"
                                defaultValue={downloadable}
                                className="col-12 md:col-3"
                                value={formData.checkbox1}
                                onChange={handleCheckbox1Change}
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox2"
                                labelId="Secure"
                                defaultValue={secure}
                                className="col-12 md:col-3"
                                value={formData.checkbox2}
                                onChange={handleCheckbox2Change}
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox3"
                                labelId="Expiry Ind"
                                defaultValue={expiryInd}
                                className="col-12 md:col-3"
                                onChange={handleCheckbox3Change}
                                value={formData.checkbox3}
                            />

                            {watch('checkbox3') && (
                                <CustomCheckboxDoument
                                    disabled={!watch('checkbox3')}
                                    control={control}
                                    name="checkbox4"
                                    labelId="Monitorable"
                                    defaultValue={monitorable}
                                    className="col-12 md:col-3"
                                    dependentField={{ value: expiryValue }}
                                    value={formData.checkbox4}
                                />
                            )}

                            {showAttForm ? (
                                <form>
                                    <div className="flex justify-content-between align-items-center border-bottom p-1">
                                        <div className="fs-5 fw-bold">Document Attributions Def</div>
                                        <Button
                                            icon="pi pi-plus fs-5"
                                            className=""
                                            size="small"
                                            type="button"
                                            onClick={collectAndAddFormData}
                                        />
                                    </div>

                                    <div className="formgrid grid p-2">
                                        <div className="col-12 md:col-4">
                                            <CustomInputText
                                                control={control}
                                                errors={errors}
                                                name="documentAttrName"
                                                labelId="documentAttrName.label"
                                                // defaultValue={}
                                                requiredMsg="documentAttrName"
                                                placeholder="Attr. Display Name"
                                            />
                                        </div>
                                        <div className="col-12 md:col-4">
                                            <CustomInputText
                                                control={control}
                                                errors={errors}
                                                name="attrDisplayName"
                                                labelId="attrDisplayName.label"
                                                defaultValue=""
                                                requiredMsg="attrDisplayName"
                                                placeholder="Attr. Display Name"
                                            />
                                        </div>

                                        <div className="col-12 md:col-4">
                                            <CustomDropdown
                                                control={control}
                                                errors={errors}
                                                name="attrType"
                                                labelId="attrType.label"
                                                defaultValue=""
                                                requiredMsg="attrType"
                                                placeholder="Attribute Type"
                                                options={attributeTypeOptions}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-12">
                                        <CustomInputTextArea
                                            control={control}
                                            errors={errors}
                                            name="Description"
                                            labelId="descriptionDescription.label"
                                            defaultValue=""
                                            requiredMsg="descriptionDescription"
                                            placeholder="Description"
                                        />
                                    </div>
                                    <CustomCheckboxDoument
                                        control={control}
                                        name="required"
                                        labelId="Required"
                                        defaultValue={false}
                                    />
                                </form>
                            ) : null}
                        </div>

                        {/* table */}
                        {documentAttrDefinitions?.length > 0 ? (
                            <div>
                                <DataTable value={documentAttrDefinitions} size="small">
                                    <Column field="documentAttrName" header="Attr. Display Name" />
                                    <Column field="attrDisplayName" header="Attr. Display Name" />
                                    <Column field="attrType" header="Attribute Type" />
                                    <Column
                                        header="Required"
                                        body={(rowData) => <Checkbox checked={rowData.required} disabled={true} />}
                                    />
                                    <Column
                                        header="Actions"
                                        body={(rowData, rowIndex) => (
                                            <>
                                                <i
                                                    className="pi pi-pencil p-1 cursor-pointer"
                                                    onClick={() => handleEdit(rowData, rowIndex)}
                                                />
                                                <i
                                                    className="pi pi-trash p-1 cursor-pointer"
                                                    onClick={() => handleDelete(rowData.id)}
                                                />
                                            </>
                                        )}
                                    />
                                </DataTable>
                            </div>
                        ) : (
                            <> No Document Attributions Def</>
                        )}
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
                            <Checkbox checked={secure} disabled />
                            <label htmlFor="secure" className="ml-2">
                                Secured
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
                    </div>

                    <div className="fs-5 border-bottom mt-4 p-1">Document Attributions Def</div>
                    <div>
                        {documentAttrDefinitions?.map((attribute, index) => (
                            <>
                                <div key={index} className="row gutter-1 mt-3 px-2">
                                    {renderInfoSection2('Attribute Name', attribute.documentAttrName)}
                                    {renderInfoSection2('Attribute Display Name', attribute.attrDisplayName)}
                                    {renderInfoSection2('Attribute Type', attribute.attrType)}
                                    {renderInfoSection2(
                                        <div className="flex align-items-center">
                                            <Checkbox checked={attribute.required} disabled />
                                            <label htmlFor="attribute.required" className="ml-2">
                                                Required
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminTimeSheetDetails;
