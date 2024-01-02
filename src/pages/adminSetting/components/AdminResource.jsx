import React, { useState, useRef, useEffect } from 'react';
import AdminResourceDataTable from '../container/AdminResourceDataTable';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import CustomInputText from '../../../components/controls/CustomInputText';
import { useForm } from 'react-hook-form';
import CustomDropdown from '../../../components/controls/CustomDropdown';
import CustomCheckbox from '../../../components/controls/CustomCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWorkerAttr,
    statusWorkerAttr,
    updateWorkerAttr,
    workerAttrRequest,
} from '../../../redux/actions/adminSettingsAction';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import { InputSwitch } from 'primereact/inputswitch';

const AdminResource = () => {
    const toast = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [editWorker, setEditWorker] = useState(false);
    const [workerData, setWorkerData] = useState();
    const [visibleRight, setVisibleRight] = useState(false);
    const [addAttribute, setAddAttribute] = useState(false);
    const [editAttribute, setEditAttribute] = useState(false);
    const [attributeData, setAttributeData] = useState([]);
    const dispatch = useDispatch();
    const workerAttrDef = useSelector((state) => state.adminSettings.workerAttrDef);
    const required = true;

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm();

    const data = watch();

    useEffect(() => {
        dispatch(fetchWorkerAttr());
    }, [dispatch]);

    const onSubmit = (res) => {
        const data = {
            attrName: res.attrName,
            attrDspName: res.attrDspName,
            displayOrder: 2,
            attrType: res.attrType,
            definedList: !res.definedList ? false : res.definedList,
            required: !res.required ? false : res.required,
            uniqueType: !res.uniqueType ? null : res.uniqueType,
            attrListValues: res.definedList ? attributeData : null,
        };
        dispatch(workerAttrRequest({ data }));
        setVisibleRight(false);
    };

    const attrTypeOptions = [
        { value: 'STRING', label: 'STRING' },
        { value: 'DATE', label: 'DATE' },
        { value: 'DATETIME', label: 'DATETIME' },
        { value: 'NUMBER', label: 'NUMBER' },
        { value: 'TIME', label: 'TIME' },
    ];

    const uniqueTypeOptions = [
        { value: 'UNIQUE', label: 'UNIQUE' },
        { value: 'UNIQUE_ACTIVE', label: 'UNIQUE_ACTIVE' },
    ];

    const handleAttributeAdd = () => {
        if (data.value && data.displayOrder) {
            setAddAttribute(false);
            setAttributeData([...attributeData, { value: data.value, displayOrder: data.displayOrder }]);
        }
        setValue('value', '');
        setValue('displayOrder', attributeData.length + 1);
    };

    const handleAttributeUpdate = () => {
        if (data.value && data.displayOrder) {
            setEditAttribute(false);
            const indexToUpdate = attributeData.findIndex((attr) => attr.displayOrder === data.displayOrder);
            const updatedAttributeData = [...attributeData];
            updatedAttributeData[indexToUpdate] = {
                ...updatedAttributeData[indexToUpdate],
                value: data.value,
                displayOrder: data.displayOrder,
            };
            setAttributeData(updatedAttributeData);
        }
        setValue('value', '');
        setValue('displayOrder', '');
    };

    const handleSidebarClose = () => {
        reset();
        setVisibleRight(false);
        setEditWorker(false);
        setAddAttribute(false);
        setEditAttribute(false);
    };

    const handleUpdate = (res) => {
        const data1 = {
            id: workerData.attrDefId,
            data: {
                attrName: res.attrName,
                attrDspName: res.attrDspName,
                displayOrder: 2,
                attrType: res.attrType,
                definedList: !res.definedList ? false : res.definedList,
                required: !res.required ? false : res.required,
                uniqueType: !res.uniqueType ? null : res.uniqueType,
                attrListValues: res.definedList ? attributeData : null,
            },
        };
        dispatch(updateWorkerAttr({ data1 }));
        handleSidebarClose();
    };

    const handleAttributeEdit = () => {
        setEditAttribute(true);
        setAddAttribute(false);
    };

    const handleWorkerAdd = () => {
        reset();
        setVisibleRight(true);
        setAttributeData([]);
    };
    return (
        <div>
            <Toast ref={toast} />
            <div>
                <AdminResourceDataTable editMode={editMode} setEditMode={setEditMode} />
            </div>

            <div className="flex justify-content-between align-items-center my-4">
                <h5>Worker Attribute Definations</h5>
                <Button icon="pi pi-plus fs-5" size="small" type="button" onClick={handleWorkerAdd} />
            </div>

            <div>
                <div className="flex justify-content-between align-items-center px-2 w-full">
                    <h6 className="font-bold w-5">Attribute Name</h6>
                    <h6 className="font-bold w-5">Status</h6>
                    <h6 className="font-bold w-2">Edit</h6>
                </div>
                {workerAttrDef.map((data) => {
                    return (
                        <div className="flex justify-content-between align-items-center bg-white border-bottom p-2 w-full">
                            <div className="w-5">{data.attrName}</div>
                            <div className="w-5">
                                <InputSwitch
                                    checked={data.status === 'ACTIVE' ? true : false}
                                    onChange={() => {
                                        const data1 = {
                                            attrDefId: data.attrDefId,
                                            status: data.status === 'ACTIVE' ? 'DISCARDED' : 'ACTIVE',
                                        };
                                        dispatch(statusWorkerAttr({ data1 }));
                                    }}
                                />
                            </div>
                            <i
                                className="pi pi-pencil cursor-pointer w-2"
                                onClick={() => {
                                    setEditWorker(true);
                                    setVisibleRight(true);
                                    setValue('attrName', data.attrName);
                                    setValue('attrDspName', data.attrDspName);
                                    setValue('attrType', data.attrType);
                                    setValue('uniqueType', data.uniqueType);
                                    setValue('required', data.required);
                                    setValue('definedList', data.definedList);
                                    setAttributeData(data.attrListValues);
                                    setWorkerData(data);
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            <Sidebar
                visible={visibleRight}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleSidebarClose}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly
                        title={
                            editWorker
                                ? 'Edit Resource Characteristic Definations'
                                : 'Add Resource Characteristic Definations'
                        }
                        onClick={handleSidebarClose}
                    />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <div className="md:flex">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="attrName"
                            labelId="attrName.label"
                            required={required}
                            requiredMsg="attrName.required"
                            className="col-12 md:col-6"
                        />
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="attrDspName"
                            labelId="attrDspName.label"
                            requiredMsg="attrDspName.required"
                            className="col-12 md:col-6"
                            required={required}
                        />
                    </div>
                    <div className="md:flex">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="attrType"
                            labelId="attrType.label"
                            options={attrTypeOptions}
                            disabled={editWorker}
                            placeholder="Select your Attribute Type"
                            requiredMsg="attrType.required"
                            className="col-12 md:col-6"
                            required={required}
                        />
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="uniqueType"
                            disabled={editWorker}
                            labelId="uniqueType.label"
                            className="col-12 md:col-6"
                            options={uniqueTypeOptions}
                            placeholder="Select your Unique Type"
                        />
                    </div>
                    <div className="md:flex">
                        <CustomCheckbox
                            control={control}
                            // disabled={editWorker}
                            errors={errors}
                            name="required"
                            className="col-6 md:col-3"
                            labelId="required.label"
                        />
                        <CustomCheckbox
                            control={control}
                            errors={errors}
                            disabled={editWorker}
                            name="definedList"
                            className="col-6 md:col-3"
                            labelId="definedList.label"
                        />
                    </div>
                    {data.definedList && (
                        <div className="border p-3">
                            <div className="flex justify-content-between align-items-center">
                                <h3>Attribute List</h3>
                                {!addAttribute && (
                                    <Button
                                        icon="pi pi-plus fs-5"
                                        size="small"
                                        onClick={() => {
                                            setAddAttribute(true);
                                            setValue('value', '');
                                            setValue('displayOrder', attributeData.length + 1);
                                            setEditAttribute(false);
                                        }}
                                    />
                                )}
                            </div>

                            {addAttribute && (
                                <div>
                                    {/*<h3>ADD</h3>*/}
                                    <div className="flex align-items-center gap-1">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="value"
                                            labelId="value.label"
                                            requiredMsg="value.required"
                                            required={required}
                                            className="col-5"
                                        />
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            type="number"
                                            disabled={true}
                                            name="displayOrder"
                                            labelId="displayOrder.label"
                                            requiredMsg="displayOrder.required"
                                            required={required}
                                            className="hidden"
                                        />
                                        <Button
                                            icon="pi pi-times"
                                            severity="secondary"
                                            onClick={() => setAddAttribute(false)}
                                        />
                                        <Button icon="pi pi-plus" onClick={handleAttributeAdd} />
                                    </div>
                                </div>
                            )}

                            {editAttribute && (
                                <div>
                                    {/*<h3>EDIT</h3>*/}
                                    <div className="flex align-items-center gap-1">
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name="value"
                                            labelId="value.label"
                                            requiredMsg="value.required"
                                            required={required}
                                            className="col-5"
                                        />
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            type="number"
                                            disabled={true}
                                            name="displayOrder"
                                            labelId="displayOrder.label"
                                            requiredMsg="displayOrder.required"
                                            required={required}
                                            className="col-5 hidden"
                                        />
                                        <Button
                                            icon="pi pi-times"
                                            severity="secondary"
                                            onClick={() => setEditAttribute(false)}
                                        />
                                        <Button icon="pi pi-check" onClick={handleAttributeUpdate} />
                                    </div>
                                </div>
                            )}

                            {attributeData.length >= 1 && (
                                <table className="table table-striped">
                                    <thead className="table-light">
                                        <th>value</th>
                                        <th>order</th>
                                        <th>options</th>
                                    </thead>

                                    <tbody>
                                        {attributeData.map((data) => (
                                            <tr>
                                                <td>{data.value}</td>
                                                <td>{data.displayOrder}</td>
                                                <td>
                                                    <i
                                                        className="pi pi-pencil cursor-pointer"
                                                        onClick={() => {
                                                            handleAttributeEdit();
                                                            setValue('value', data.value);
                                                            setValue('displayOrder', data.displayOrder);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
                <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button
                            label="Cancel"
                            type="button"
                            severity="secondary"
                            onClick={handleSidebarClose}
                            size="small"
                        />
                        {editWorker ? (
                            <Button label="Update" size="small" onClick={handleSubmit(handleUpdate)} />
                        ) : (
                            <Button label="Submit" size="small" onClick={handleSubmit(onSubmit)} />
                        )}
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};

export default AdminResource;
