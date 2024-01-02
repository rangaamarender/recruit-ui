import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

const AddWorkorderDetailsStep = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'demo', email: 'kk' },
        { id: 2, name: 'demdso', email: 'ksdk' },
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

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
            };

            setProducts([...products, newProduct]);

            setNewName('');
            setNewEmail('');
            setIsAdding(false);
        }
    };

    const cancelAddRow = () => {
        setNewName('');
        setNewEmail('');
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
                {/* {console.log(rowData, 'rowData')} */}
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
                    <Column field="id" header="ID" editor={(options) => textEditor(options)} editable={false} />
                    <Column field="name" header="WO Description" editor={(options) => textEditor(options)} editable />
                    <Column field="email" header="Name" editor={(options) => textEditor(options)} editable />

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
