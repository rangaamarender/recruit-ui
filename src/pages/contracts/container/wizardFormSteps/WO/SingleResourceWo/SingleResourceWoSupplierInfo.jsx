import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
// import { useForm } from 'react-hook-form';
import { Toolbar } from "primereact/toolbar";
import { useEffect } from 'react';

function SingleResourceWoSupplierInfo({setSkip}) {
    const [sidebarVisibleTable, setSidebarVisibleTable] = useState(false);
    const [sidebarVisibleAdd,setSidebarVisibleTableAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // const [checked, setChecked] = useState(true);
    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    //     setValue,
    //     watch,
    // } = useForm();
    const [products, setProducts] = useState([
        { id: 1, name: 'Ravi', email: '1099',supplierName:"---",payDescription:"Regular Hours(RT)", payRate:"$20", payType:"hr",  type: "29/02/2022",
        // payDescription:"payDescription" 
    },
    ]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newSupplierName, setNewSupplierName] = useState('');
    const [newPayDescription, setNewPayDescription] = useState('');
    const [newPayRate,setNewPayRate] =useState('');
    const [newPayType,setNewPayType] = useState('');
    const [type, setType] = useState('');



    const handleAddNewRow = () => {
        if (newName.trim() && newEmail.trim() && newSupplierName.trim() && newPayDescription.trim() && newPayRate.trim() && newPayType.trim() && type.trim()) {
            const newProduct = {
                id: products.length + 1,
                name: newName,
                email: newEmail,
                supplierName:newSupplierName,
                payDescription: newPayDescription,
                payRate: newPayRate,
                payType: newPayType,
                type: type,
            };
            setProducts(prevProducts => [...prevProducts, newProduct]);

            setNewName('');
            setNewEmail('');
            setNewSupplierName('');
            setNewPayDescription('');
            setNewPayRate('');
            setNewPayType('');
            setType('');
            
        }
        setSidebarVisibleTableAdd(false); //hide the Showing the Sidebar
    };
    const cancelAddRow = () => {
        setNewName('');
        setNewEmail('');
        setNewSupplierName('');
        setNewPayDescription('');
        setNewPayRate('');
        setNewPayType('');
        setType('');
       
        setSidebarVisibleTableAdd(false);
    };

    const optionType = [  
        { value: "20/02/2022", label: "20/02/2022" },
        { value: "09/02/2023", label: "09/02/2023" },
        { value: "29/02/2022", label: "29/02/2022" },

    ];
    const optionPayDescription = [
        { value: "Regular Hours(RT)", label: "Regular Hours(RT)" },
 
    ];
    const optionAmount = [
        { value: '1099', label: '1099' },
        { value: 'w2c', label: 'w2c' },
    ];
    const handleDelete = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    };
    const cancelEdit = () => {
        setNewName('');
        setNewEmail('');
        setNewSupplierName('');
        setNewPayDescription('');
        setNewPayRate('');
        setNewPayType('');
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
                        className='w-75' position='right'
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
                                        <div className="fs-4 fw-bold">Edit Work Order  Details</div></div>
                                    <div>
                                        <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTable(false)} />
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
                                     className='col-12 mb-2'
                                     value={newName} onChange={(e) => setNewName(e.target.value)} 
                                    
                                    />
                                <Dropdown className='col-12 mb-2'
                                    value={newEmail}
                                    options={optionAmount}
                                    onChange={(e) => setNewEmail(e.value)}
                                    placeholder="Amount"
                                />
                                <InputText
                                 placeholder="Supplier Name"
                                     className='col-12 mb-2'
                                     value={newSupplierName} onChange={(e) => setNewSupplierName(e.target.value)} 
                                    />
                                    <Dropdown
                                    value={newPayDescription}
                                    options={optionPayDescription}
                                    onChange={(e) => setNewPayDescription(e.value)}
                                    placeholder="Pay Description"
                                    className='col-12'
                                />
                                <InputText
                                 placeholder="Pay Rate"
                                     className='col-12 mb-2'
                                     value={newPayRate} onChange={(e) => setNewPayRate(e.target.value)} 
                                    />
                                     <InputText
                                 placeholder="Pay Type"
                                     className='col-12 mb-2'
                                     value={newPayType} onChange={(e) => setNewPayType(e.target.value)} 
                                    />
                                <Dropdown
                                    value={type}
                                    options={optionType}
                                    onChange={(e) => setType(e.value)}
                                    placeholder="Type"
                                    className='col-12'
                                />
                            </div>
                            <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
                                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                                    <Button
                                        label="CANCEL"
                                        onClick={cancelEdit}
                                        icon="pi pi-times"
                                        size="small"
                                        severity='secondary'
                                    />
                                    <Button
                                        label='UPDATE'
                                        // onClick={handleSubmit(handleEditRows)}
                                        onClick={handleEditRows}
                                        icon="pi pi-check"
                                        size="small"
                                        severity='primary'
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
                            setNewSupplierName(rowData.supplierName);
                            setNewPayDescription(rowData.payDescription);
                            setNewPayRate(rowData.payRate);
                            setNewPayType(rowData.payType);
                            setType(rowData.type);
                            setSidebarVisibleTable(true);
                        }}
                    />
                </>
                <i
                    className="pi pi-trash "
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        );
    };
    const handleEditRows = () => {
        if (selectedProduct && newName.trim() && newEmail.trim() && newSupplierName.trim() && newPayRate.trim() && newPayType.trim() && newPayDescription.trim() && type.trim()) {
            const updatedProducts = products.map((product) =>
                product.id === selectedProduct.id ? { ...product, name: newName, email: newEmail, supplierName: newSupplierName, payRate: newPayRate, payDescription: newPayDescription, payType: newPayType, type: type } : product
            );
            setProducts(updatedProducts);
        }
        // Reset state variables
        setNewName('');
        setNewEmail(' ');
        setNewSupplierName('');
        setNewPayDescription('');
        setNewPayRate('');
        setNewPayType('');
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
        const rightToolbarTemplate = () => {
            return (
              <>
                <Button
                label="ADD PAY RATES"
                icon='pi pi-plus'
                size="small"
                severity='primary'
                  onClick={() => setSidebarVisibleTableAdd(true)}
                />
              </>
            );
          };
          const priceTemplate = () => {
            return (
              <>
    <span className='fw-bold'>Supplier or Payroll - Pay Rates Details </span>
              </>
            );
          };
          useEffect(()=>{
            setSkip(true);
          },[setSkip]);
    return (
        <>
        <h4 className='fw-bold text-center'>Supplier or Payroll - Rates</h4>
        <Sidebar
                        visible={sidebarVisibleAdd}
                        blockScroll={true}
                        className='w-75' position='right'
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
                                        <div className="fs-4 fw-bold">Add Work Order Details</div></div>
                                    <div>
                                        <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTableAdd(false)} />
                                    </div>

                                </div>
                            </div>
                            </div>
                            <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <InputText className='col-12 mb-2' placeholder="Worker Name" value={newName} onChange={(e) => setNewName(e.target.value)} 
                     />
                     
                                <Dropdown value={newEmail} className='md:col-12 col-12 mb-2'
                        options={optionAmount}
                        onChange={(e) => setNewEmail(e.value)}
                        placeholder="Worker Type"
                                />
                                <InputText className='col-12 mb-2' placeholder="Supplier Name" value={newSupplierName} onChange={(e) => setNewSupplierName(e.target.value)} 
                     />
                     <Dropdown className='md:col-12 col-12 mb-2'
                                    value={newPayDescription}
                                    options={optionPayDescription}
                                    onChange={(e) => setNewPayDescription(e.value)}
                                    placeholder="Pay Description"
                                />
                                <InputText className='col-12 mb-2' placeholder="Pay Rate" value={newPayRate}
                                 onChange={(e) => setNewPayRate(e.target.value)} 
                     />
                       <InputText className='col-12 mb-2' placeholder="Pay Type" value={newPayType} onChange={(e) => setNewPayType(e.target.value)} 
                     />
                                <Dropdown className='md:col-12 col-12 mb-2'
                                    value={type}
                                    options={optionType}
                                    onChange={(e) => setType(e.value)}
                                    placeholder="Overheads"
                                />
                    
                            </div>
                            <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
                                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                                    <Button
                                        label="CANCEL"
                                        onClick={cancelAddRow}
                                        icon="pi pi-times"
                                        size="small"
                                        severity='secondary'
                                    />
                                    <Button
                                        label='ADD'
                                        onClick={handleAddNewRow}
                                        icon="pi pi-check"
                                        size="small"
                                        severity='primary'
                                    />
                                </div>
                            </div>
                        
                    </Sidebar>
                    
  <Toolbar  
       right={rightToolbarTemplate}
       left={priceTemplate}
     ></Toolbar>
                <DataTable
                    value={products}
                    editMode="row"
                    dataKey="id"
                    tableStyle={{ minWidth: '50rem' }}
                >
                     <Column field="supplierName" header="Supplier Name"
                    />
                    <Column field="name" header="Worker Name"
                    />
                    <Column field="email" header="Worker Type"
                    />
                    
                    <Column field="payDescription" header="Pay Description"
                    />
                    <Column field="payRate" header="Pay Rate"
                    />
                    <Column field="payType" header="Pay Type"
                    />
                    <Column field="type" header="Effictive Date"
                    />
                    {/* <Column field="payDescription" header="Pay Description"
                    />
                    <Column field="payRate" header="Pay Rate"
                    />
                    <Column field="payType" header="Pay Type"
                    />
                    <Column field="overheads" header="Overheads"
                    /> 
                     */}
                    <Column body={Actions} header="Actions" ></Column>
                </DataTable>
          
        </>
    );
}

export default SingleResourceWoSupplierInfo;