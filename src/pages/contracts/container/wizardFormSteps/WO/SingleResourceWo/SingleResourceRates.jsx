import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
// import { useForm } from 'react-hook-form';
// import { Checkbox } from 'primereact/checkbox';
// import { Toolbar } from 'primereact/toolbar';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useEffect } from 'react';
import SingleResourceRecruiterInfoChildcopy2 from './SingleResourceRecruiterInfoChildcopy2';
function SingleResourceRates({ setSkip }) {
    const [sidebarVisibleTable, setSidebarVisibleTable] = useState(false);
    const [sidebarVisibleAdd, setSidebarVisibleTableAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
//     const [checked, setChecked] = useState(true);
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         reset,
//         setValue,
//         watch,
//     } = useForm();
    const toastRef = useRef(null);
    const [products, setProducts] = useState([{ id: 1, name: 'description', email: '$20', type: 'True' }]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [type, setType] = useState('');
    // const handleAddNewRow = () => {
    //     if (newName.trim() && newEmail.trim() && type.trim()) {
    //         const newProduct = {
    //             id: products.length + 1,
    //             name: newName,
    //             email: newEmail,
    //             type: type,
    //         };
    //         setProducts(prevProducts => [...prevProducts, newProduct]);

    //         setNewName('');
    //         setNewEmail('');
    //         setType('');

    //     }
    //     setSidebarVisibleTableAdd(false); //hide the Showing the Sidebar
    // };
    const [dataAdded, setDataAdded] = useState(false);
    console.log(dataAdded,"dataAdded");
    const [showCreateRole, setShowCreateRole] = useState(false);
    const handleAddNewClick = () => {
        setShowCreateRole(true);
        setDataAdded(true); // Set dataAdded to true when the user clicks on "Add"
    };
    const handleAddNewRow = () => {
        if (newName && newEmail && type) {
            // Check for duplicates
            const isDuplicate = products.some(
                (product) => product.name === newName && product.email === newEmail && product.type === type
            );

            if (!isDuplicate) {
                const newProduct = {
                    id: products.length + 1,
                    name: newName,
                    email: newEmail,
                    type: type,
                };

                setProducts([...products, newProduct]);

                setNewName('');
                setNewEmail('');
                setType('');
                // setIsAdding(false);
            } else {
                // Handle duplicate entry, e.g., show an error message or prevent adding
                // alert('Duplicate entry: Name , Amount and Type combination already exists.');
                toastRef.current.show({
                    severity: 'warn',
                    summary: 'Error',
                    detail: 'Duplicate entry: Name , Amount and Type combination already exists.',
                    life: 4000,
                });
                //                 let closeSlider;
                // closeSlider = setTimeout(setSidebarVisibleTableAdd(false),5000);
            }
        }
        //         const myTimeout = setTimeout(myGreeting, 5000);
        // function myGreeting() {
        //   document.getElementById("demo").innerHTML = "Happy Birthday!"
        // }

        // setSidebarVisibleTableAdd(false); //hide the Showing the Sidebar
    };

    const cancelAddRow = () => {
        setNewName('');
        setNewEmail('');
        setType('');

        setSidebarVisibleTableAdd(false);
    };

    const optionType = [
        { value: 'True', label: 'True' },
        { value: 'False', label: 'False' },
    ];
    const optionAmount = [
        { value: '$20', label: '$20' },
        { value: '$10', label: '$10' },
    ];
    const handleDelete = (productId) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    };
    const cancelEdit = () => {
        setNewName('');
        setNewEmail('');
        setType('');
        setSidebarVisibleTable(false);
    };
    const Actions = (rowData) => {
        return (
            <div>
                <>
                    <Sidebar
                        visible={sidebarVisibleTable}
                        blockScroll={true}
                        className="w-75"
                        position="right"
                        onHide={() => setSidebarVisibleTable(false)}
                    >
                        <div className="h-screen">
                            <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                                <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
                                    <div className="d-flex align-items-center">
                                        <i
                                            className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
                                            onClick={() => setSidebarVisibleTable(false)}
                                        />
                                        <div className="fs-4 fw-bold">Edit Work Order Details</div>
                                    </div>
                                    <div>
                                        <i
                                            className="pi pi-times p-1 border-circle cursor-pointer"
                                            onClick={() => setSidebarVisibleTable(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                                {/* <CustomInputText
                                 control={control}
                                 errors={errors}
                                 name="newName"
                                 labelId="email"
                                 className="md:col-6 sm:col-12" */}
                                <InputText
                                    placeholder="Description"
                                    className="col-12 mb-2"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <Dropdown
                                    className="col-12 mb-2"
                                    value={newEmail}
                                    options={optionAmount}
                                    onChange={(e) => setNewEmail(e.value)}
                                    placeholder="Amount"
                                />
                                <Dropdown
                                    value={type}
                                    options={optionType}
                                    onChange={(e) => setType(e.value)}
                                    placeholder="Type"
                                    className="col-12"
                                />
                            </div>
                            <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
                                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                                    <Button
                                        label="CANCEL"
                                        onClick={cancelEdit}
                                        icon="pi pi-times"
                                        size="small"
                                        severity="secondary"
                                    />
                                    <Button
                                        label="UPDATE"
                                        // onClick={handleSubmit(handleEditRows)}
                                        onClick={handleEditRows}
                                        icon="pi pi-check"
                                        size="small"
                                        severity="primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                    <i
                        className="pi pi-pencil mr-3"
                        onClick={() => {
                            setSelectedProduct(rowData);
                            setNewName(rowData.name); // Set the current name in the input field
                            setNewEmail(rowData.email);
                            setType(rowData.type);
                            setSidebarVisibleTable(true);
                        }}
                    />
                </>
                <i className="pi pi-trash " style={{ cursor: 'pointer' }} onClick={() => handleDelete(rowData.id)} />
            </div>
        );
    };
    const handleEditRows = () => {
        if (selectedProduct && newName.trim() && newEmail.trim() && type.trim()) {
            const updatedProducts = products.map((product) =>
                product.id === selectedProduct.id ? { ...product, name: newName, email: newEmail, type: type } : product
            );
            setProducts(updatedProducts);
        }
        // Reset state variables
        setNewName('');
        setNewEmail(' ');
        setType('');
        // reset();
        setSelectedProduct(null);
        setSidebarVisibleTable(false);
    };
    //     const activeSwitch = (rowData) => (
    //     <>
    //     <Checkbox className='ml-6'
    //     onChange={e => setChecked(e.checked)} checked={checked}
    //     />
    //     </>
    // );

    useEffect(() => {
        setSkip(true);
    }, [setSkip]);
    return (
        <>
            <h4 className="fw-bold text-center">Work Order (WO) - Rates</h4>
            <Sidebar
                visible={sidebarVisibleAdd}
                blockScroll={true}
                className="w-75"
                position="right"
                onHide={() => setSidebarVisibleTableAdd(false)}
            >
                <div className="h-screen">
                    <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                        <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
                            <div className="d-flex align-items-center">
                                <i
                                    className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
                                    onClick={() => setSidebarVisibleTableAdd(false)}
                                />
                                <div className="fs-4 fw-bold">Add Work Order Details</div>
                            </div>
                            <div>
                                <i
                                    className="pi pi-times p-1 border-circle cursor-pointer"
                                    onClick={() => setSidebarVisibleTableAdd(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <InputText
                        className="col-12 mb-2"
                        placeholder="WorkOrder Description"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <div className="md:flex">
                        <Dropdown
                            value={newEmail}
                            className="md:col-6 col-12 mb-2"
                            options={optionAmount}
                            onChange={(e) => setNewEmail(e.value)}
                            placeholder="Rate"
                        />
                        <Dropdown
                            className="md:col-6 col-12 mb-2"
                            value={type}
                            options={optionType}
                            onChange={(e) => setType(e.value)}
                            placeholder="Enable Timesheet"
                        />
                    </div>
                </div>
                <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button
                            label="CANCEL"
                            onClick={cancelAddRow}
                            icon="pi pi-times"
                            size="small"
                            severity="secondary"
                        />
                        <Button
                            label="ADD"
                            onClick={handleAddNewRow}
                            icon="pi pi-check"
                            size="small"
                            severity="primary"
                        />
                    </div>
                </div>
                <Toast ref={toastRef} />
            </Sidebar>
            {!showCreateRole &&
                    <> 
                        <div className="flex justify-content-between">
                            <h4 className='fw-bold ml-2'>Work Order (WO) - Rates</h4>        
                            <Button className="w-1" icon="pi pi-plus" label="ADD" size="small" type="button" 
                            onClick={handleAddNewClick}
                            ></Button>
                        </div>
                        </>   
                    }
                     <div className='mb-2'>
                        {showCreateRole && <SingleResourceRecruiterInfoChildcopy2
                        
                        showCreateRole={showCreateRole} 
                        setShowCreateRole={setShowCreateRole}
                            onAddDepartment={handleAddNewRow}
                            // existingDepartments={existingDepartments}
                            setDataAdded={setDataAdded}
                        />}
                    </div>
            {/* <Toolbar right={rightToolbarTemplate} left={priceTemplate}></Toolbar> */}
            <DataTable value={products} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="WorkOrder Description" />
                <Column field="email" header="Rate" />
                <Column field="type" header="Enable Timesheet" />
                {/* <Column body={activeSwitch} header="Enable Timesheet" /> */}
                <Column body={Actions} header="Actions"></Column>
            </DataTable>
        </>
    );
}

export default SingleResourceRates;
