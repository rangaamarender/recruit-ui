import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useDispatch, useSelector } from 'react-redux';
import {
    
    createContractsData,
    fetchDocumentRequest,
    updateDocumentRequest,
} from '../../../redux/actions/adminResourceRoleAction';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import CustomInputTextArea from '../../../components/controls/CustomInputTextArea';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import CustomCheckboxDoument from '../../../components/common/CustomCheckboxDoument';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import AdminContractsTable from '../container/AdminContracts/AdminContractsTable';
import AdminContractsDetails from '../container/AdminContracts/AdminContractsDetails';

function AdminContract() {
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
        setValue,
        getValues,
    } = useForm();
    // const dataApi = useSelector((state) => state.adminRole.documentList);

    const expiryValue = watch('checkbox3');

    const handleExpiryChange = (checked) => {
        if (!checked) {
            setValue('checkbox3', false);
            setValue('checkbox4', false);
        }
    };
    const dataById = useSelector((state) => state.adminRole.selectedDocumentData);

    const required = true;
    const dispatch = useDispatch();
    const [visibleRight, setVisibleRight] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarVisibleWizard, setSidebarVisibleWizard] = useState(false);
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const [isEditClick, setIsEditClick] = useState(false);
    const [selectedTableRow, setSelectedTableRow] = useState(null);
    const [documentAttrDefinitions, setDocumentAttrDefinitions] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [checkbox1, setCheckbox1] = useState(dataById?.downloadable);
    const [checkbox2, setCheckbox2] = useState(dataById?.secure);
    const [checkbox3, setCheckbox3] = useState(dataById?.expiryInd);
    const [checkbox4, setCheckbox4] = useState(dataById?.monitorable);
    const [showEditForm, setShowEditForm] = useState(false);

    console.log(setCheckbox1);
    console.log(setCheckbox2);
    console.log(setCheckbox3);
    console.log(setCheckbox4);
    console.log(setCheckbox4);
    console.log(activeRowMenu);

    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'warn', summary: '', detail: 'Please fill in all required fields.' });
    };

    const collectAndAddFormData = () => {
        const { documentAttrName, attrDisplayName, attrType, Description, required } = getValues();
        if (!documentAttrName.trim() || !attrDisplayName.trim() || !attrType.trim()) {
            show();
            return;
        }

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

        reset();
    };

    const handleEdit = (rowData, rowIndex) => {
        Object.keys(rowData).forEach((key) => {
            setValue(key, rowData[key]);
        });

        setSelectedRow({ id: rowData.id, displayOrder: rowData.displayOrder });
    };

    const attributeTypeOptions = [
        { label: 'STRING', value: 'STRING' },
        { label: 'NUMBER', value: 'NUMBER' },
        { label: 'DATE', value: 'DATE' },
    ];
    const onViewClick = (event) => {
        setSidebarVisible(true);
        setIsEditClick(false);
        setShowEditForm(false);
    };
    const onEditClick = (event) => {
        setSidebarVisible(true);
        setIsEditClick(true);
        setShowEditForm(false);
    };
    // console.log(activeRowMenu);

    const onDeleteClick = async () => {
        const apiUrl = `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${activeRowMenu}`;

        try {
            await axios.get(apiUrl);
        } catch (error) {
            console.log(error);
        }
    };
    const action = {
        onViewClick,
        onEditClick,
        onDeleteClick,
    };
    const onSubmit = (data) => {
        const apiPayLoad = {
            documentName: data.documentName,
            docDisplayName: data.docDisplayName,
            status: data.status,
            downloadable: data.checkbox1,
            secure: data.checkbox2,
            expiryInd: data.checkbox3 || false,
            monitorable: data.checkbox3 ? data.checkbox4 || false : false,

            docAttrDef: documentAttrDefinitions.length ? documentAttrDefinitions : null,
        };

        dispatch(createContractsData(apiPayLoad));
        reset();
        setSidebarVisibleWizard(false);
    };

    const [formData, setFormData] = useState({
        documentName: '',
        docDisplayName: '',
        status: 'ACTIVE',
        downloadable: checkbox1 || false,
        secure: checkbox2 || false,
        expiryInd: checkbox3 || false,
        monitorable: checkbox3 ? checkbox4 || false : false,
        docAttrDef: documentAttrDefinitions.length ? documentAttrDefinitions : null,
    });

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    const handleUpdate = () => {
        const id = dataById.documentDefID;
        dispatch(updateDocumentRequest(id, formData));
        reset();
    };
    const handleCheckbox1Change = () => {
        setFormData((prevData) => ({
            ...prevData,
            downloadable: !prevData.downloadable,
        }));
    };

    const handleCheckbox2Change = () => {
        setFormData((prevData) => ({
            ...prevData,
            secure: !prevData.secure,
        }));
    };

    const handleCheckbox3Change = () => {
        handleExpiryChange();
        setFormData((prevData) => ({
            ...prevData,
            expiryInd: !prevData.expiryInd,
        }));
    };

    const handleCheckbox4Change = () => {
        setFormData((prevData) => ({
            ...prevData,
            monitorable: !prevData.monitorable,
        }));
    };

    const handleCancel = () => {
        setVisibleRight(false);
        reset();
    };
    const handleRowSelect = (event) => {
        const clickedRowData = event.data;
        setSelectedTableRow(clickedRowData);
        dispatch(fetchDocumentRequest(clickedRowData.documentDefID));
        setSidebarVisible(!sidebarVisible);
        setIsEditClick(true);
        setShowEditForm(false);
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
        reset();
    };
    const toggleSidebar = () => {
        setSidebarVisible(false);
        reset();
    };

    const handleDelete = (rowId) => {
        const updatedDefinitions = documentAttrDefinitions.filter((definition) => definition.id !== rowId);

        updatedDefinitions.forEach((definition, index) => {
            definition.displayOrder = index + 1;
        });

        setDocumentAttrDefinitions(updatedDefinitions);
    };
    const onRowClick = (event) => {
        const rowData = event.data;
        console.log(rowData);
    };

    return (
        <>
            <Toast ref={toast} />
            <Sidebar
                visible={sidebarVisible}
                onHide={toggleSidebar}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Add Resource Definitions" onClick={toggleSidebar} />
                </div>
                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <AdminContractsDetails
                        isEditClick={isEditClick}
                        dataById={dataById}
                        handleUpdate={handleUpdate}
                        selectedRow={selectedTableRow}
                        documentAttrDefinitions={documentAttrDefinitions}
                        handleInputChange={handleInputChange}
                        formData={formData}
                        checkbox1={checkbox1}
                        checkbox2={checkbox2}
                        checkbox3={checkbox3}
                        checkbox4={checkbox4}
                        handleCheckbox1Change={handleCheckbox1Change}
                        handleCheckbox2Change={handleCheckbox2Change}
                        handleCheckbox3Change={handleCheckbox3Change}
                        handleCheckbox4Change={handleCheckbox4Change}
                        attributeTypeOptions={attributeTypeOptions}
                        setShowEditForm={setShowEditForm}
                        showEditForm={showEditForm}
                        handleDelete={handleDelete}
                        setFormData={setFormData}
                    />
                </div>
                {showEditForm ? (
                    <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                        <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                            <Button
                                label="Cancel"
                                type="button"
                                severity="secondary"
                                onClick={toggleSidebar}
                                size="small"
                            />
                            <Button
                                label="Update"
                                size="small"
                                onClick={(documentDefID) => handleSubmit(handleUpdate(dataById.documentDefID))}
                            />
                        </div>
                    </div>
                ) : null}
            </Sidebar>

            <Sidebar
                visible={visibleRight}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleCancel}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Add Resource Document Definition" onClick={handleCancel} />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <form>
                        <div className="formgrid grid p-2 ">
                            <div className="col-12 md:col-12 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="documentName"
                                    labelId="documentNamelabel.label"
                                    defaultValue=""
                                    required={required}
                                    requiredMsg="documentNamelabel"
                                    placeholder="Document Name"
                                    autoFocus
                                />
                            </div>
                            <div className="col-12 md:col-12 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="docDisplayName"
                                    labelId="documentDisplayName.label"
                                    defaultValue=""
                                    required={required}
                                    requiredMsg="documentDisplayName"
                                    placeholder="Document Display Name"
                                />
                            </div>

                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox1"
                                labelId="Download"
                                defaultValue={false}
                                className="col-12 md:col-3"
                                rules={{ required: isDirty.checkbox1 && 'Checkbox is required' }}
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox2"
                                labelId="Secure"
                                defaultValue={false}
                                className="col-12 md:col-3"
                                rules={{ required: isDirty.checkbox2 && 'Checkbox is required' }}
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox3"
                                labelId="Expiry Ind"
                                defaultValue={false}
                                className="col-12 md:col-3"
                                rules={{ required: isDirty.checkbox3 && 'Checkbox is required' }}
                                onChange={handleExpiryChange}
                            />
                            {watch('checkbox3') && (
                                <CustomCheckboxDoument
                                    disabled={!watch('checkbox3')}
                                    control={control}
                                    name="checkbox4"
                                    labelId="Monitorable"
                                    defaultValue={false}
                                    className="col-12 md:col-3"
                                    rules={{ required: isDirty.checkbox4 && 'Checkbox is required' }}
                                    dependentField={{ value: expiryValue }}
                                />
                            )}
                        </div>
                        {/* Attribute */}
                        {/* setShowAttForm */}
                        <form>
                            <div className="flex justify-content-between align-items-center border-bottom p-1">
                                <div className="fs-5 fw-bold">Resource Attribution Definitions</div>
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
                                        defaultValue=""
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
                                rules={{ required: isDirty.checkbox1 && 'Checkbox is required' }}
                            />
                        </form>
                    </form>
                    {documentAttrDefinitions?.length ? (
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
                    ) : null}
                </div>
                {/* table */}

                <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button label="Cancel" type="button" severity="secondary" onClick={handleCancel} size="small" />
                        <Button label="Submit" size="small" onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>
            </Sidebar>
            {/* 121212 */}
            <div className="flex justify-content-between align-items-center border-bottom p-1">
                <div className="fs-4 fw-bold">Resource Documents</div>
                <Button icon="pi pi-plus fs-5" className="" size="small" onClick={() => setVisibleRight(true)} />
            </div>
            <AdminContractsTable
                sidebarVisible={sidebarVisibleWizard}
                setSidebarVisible={setSidebarVisibleWizard}
                handleRowSelect={handleRowSelect}
                handleRowUnselect={handleRowUnselect}
                setActiveRowMenu={setActiveRowMenu}
                isEditClick={isEditClick}
                setIsEditClick={setIsEditClick}
                action={action}
                onRowClick={onRowClick}
                selectedTableRow={selectedTableRow}
                activeRowMenu={activeRowMenu}
            />
        </>
    );
}

export default AdminContract;
