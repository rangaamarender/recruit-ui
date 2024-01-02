import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown'; 
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

const AddWorkorderDetailsStep = () => {
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option 2' },
        { value: 'option3', label: 'option 3' },
        { value: 'option4', label: 'option 4' },
    ];

    const [products, setProducts] = useState([
        { id: 1, name: 'demo', email: 'kk', WODescription: '', WOType: '', WORate: '', EnableInTimesheet: false },
        { id: 2, name: 'demdso', email: 'ksdk', WODescription: '', WOType: '', WORate: '', EnableInTimesheet: false },
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newWODescription, setNewWODescription] = useState('');
    const [newWOType, setNewWOType] = useState('');
    const [newWORate, setNewWORate] = useState('');
    const [newEnableInTimesheet, setNewEnableInTimesheet] = useState(false);

    // State to control the toast
    const [showToast, setShowToast] = useState(false);
    console.log(showToast);
    const toast = useRef(null);

    const onRowEditComplete = (e) => {
        let _products = [...products];
        let { newData, index } = e;
        _products[index] = newData;
        setProducts(_products);
    };

    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => {
                    options.editorCallback(e.target.value);
                }}
            />
        );
    };

    const dropdownEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={options}
                onChange={(e) => {
                    options.editorCallback(e.value);
                }}
            />
        );
    };

    const checkboxEditor = (options) => {
        return (
            <Checkbox
                inputId={`enableInTimesheet_${options.rowIndex}`}
                checked={options.value}
                onChange={(e) => {
                    options.editorCallback(e.checked);
                }}
            />
        );
    };

    const addRow = () => {
        setIsAdding(true);
    };

    const handleAddNewRow = () => {
        if (newName.trim() === '' || newEmail.trim() === '') {
            // Show toast for empty fields
            setShowToast(true);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all fields', life: 3000 });
        } else {
            const newProduct = {
                id: products.length + 1,
                name: newName,
                email: newEmail,
                WODescription: newWODescription,
                WOType: newWOType,
                WORate: newWORate,
                EnableInTimesheet: newEnableInTimesheet,
            };

            setProducts([...products, newProduct]);

            setNewName('');
            setNewEmail('');
            setNewWODescription('');
            setNewWOType('');
            setNewWORate('');
            setNewEnableInTimesheet(false);
            setIsAdding(false);
        }
    };

    const cancelAddRow = () => {
        setNewName('');
        setNewEmail('');
        setNewWODescription('');
        setNewWOType('');
        setNewWORate('');
        setNewEnableInTimesheet(false);
        setIsAdding(false);
    };

    const handleDelete = (productId) => {
        const updatedProducts = products.filter((product) => product.name !== productId);
        setProducts(updatedProducts);
    };

    const deleteIcon = (rowData) => {
        return (
            <div>
                <i className="pi pi-trash" style={{ cursor: 'pointer' }} onClick={() => handleDelete(rowData.name)} />
            </div>
        );
    };

    return (
        <div>
            <Button onClick={addRow} size='small' severity='secondary' className='mb-2'>Add WO Details</Button>
            {isAdding && (
                <div className='mb-2'>
                    <InputText
                        placeholder='name'
                        className=''
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <InputText
                        placeholder='email'
                        value={newEmail}
                        className='ms-2'
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <InputText
                        placeholder='WO Description'
                        value={newWODescription}
                        className='ms-2'
                        onChange={(e) => setNewWODescription(e.target.value)}
                    />
                    <Dropdown
                        placeholder='WO Type'
                        options={options}
                        value={newWOType}
                        onChange={(e) => setNewWOType(e.value)}
                        className='ms-2'
                    />
                    <InputText
                        placeholder='WO Rate'
                        value={newWORate}
                        className='ms-2'
                        onChange={(e) => setNewWORate(e.target.value)}
                    />
                    <Checkbox
                        inputId="enableInTimesheet"
                        checked={newEnableInTimesheet}
                        onChange={(e) => setNewEnableInTimesheet(e.checked)}
                        className='ms-2'
                    />
                    <Button icon="pi pi-check" onClick={handleAddNewRow} className="p-button-success ms-2" />
                    <Button icon="pi pi-times" onClick={cancelAddRow} className="p-button-danger ms-2" />
                </div>
            )}
            <div className="card p-fluid">
                <DataTable
                    value={products}
                    editMode="row"
                    dataKey="id"
                    onRowEditComplete={onRowEditComplete}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column field="id" header="ID" editor={(options) => textEditor(options)} editable />
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} editable />
                    <Column field="email" header="Email" editor={(options) => textEditor(options)} editable />
                    <Column field="WODescription" header="WO Description" editor={(options) => textEditor(options)} editable />
                    <Column field="WOType" header="WO Type" editor={(options) => dropdownEditor(options)} editable />
                    <Column field="WORate" header="WO Rate" editor={(options) => textEditor(options)} editable />
                    <Column
                        field="EnableInTimesheet"
                        header="Enable in Timesheet"
                        editor={(options) => checkboxEditor(options)}
                        editable
                    />
                    <Column
                        rowEditor
                        headerStyle={{ width: '10%', minWidth: '8rem' }}
                        bodyStyle={{ textAlign: 'center' }}
                    ></Column>
                    <Column body={deleteIcon} header="Actions"></Column>
                </DataTable>
            </div>
            {/* Toast for empty fields */}
            <Toast ref={toast} position="top-right" />
        </div>
    );
};

export default AddWorkorderDetailsStep;
