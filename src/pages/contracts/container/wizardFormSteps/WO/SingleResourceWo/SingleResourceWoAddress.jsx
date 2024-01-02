import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeExpenceData } from '../../../../../../redux/actions/timesheetActions';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import Country from '../../../../../../assets/__mockData__/countries.json';
import States from '../../../../../../assets/__mockData__/states.json';
import CustomInputMask from '../../../../../../components/controls/CustomInputMask';
import { Checkbox } from "primereact/checkbox";
function SingleResourceWoAddress({ control, errors, watch, setValue, validationErrors, setValidationErrors, setSkip }) {
    const dispatch = useDispatch();
    const expenceData = useSelector((state) => state.timesheet.expenceData);
    const [checked, setChecked] = useState(false);
    const [required, setRequired] = useState(false);
    const [expenses, setExpenses] = useState(expenceData);
    const expensesData = watch();
  
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const handleChange = (e) => {
        // handleAddExpense();
       
        setChecked(e.checked);      };
  //add
  const [sidebarVisibleAdd, setSidebarVisibleTableAdd] = useState(false);
  const [checkedBox,setCheckedBox] = useState(false);
  console.log(sidebarVisibleAdd,checkedBox,"checkedBox");
    useEffect(() => {
      dispatch(storeExpenceData(expenses));
    }, [dispatch, expenses]);
  console.log(expenceData, 'expenceData Redux')

  const handleAddExpense = (e) => {
    setCheckedBox(e.checked);
    setSidebarVisibleTableAdd(true)
    if (expensesData.title 
        && expensesData.addressLine2
         && 
        expensesData.city && expensesData.pin && expensesData.taxNumberPin
        ) {



      if (isEditMode && editIndex !== null) {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = {
          title: expensesData.title,
          addressLine2: expensesData.addressLine2,
          city: expensesData.city,
          pin: expensesData.pin,
          taxNumberPin:expensesData.taxNumberPin,
        };
        setExpenses(updatedExpenses);


      } else {
        const updatedExpenses = {
          title: expensesData.title,
          addressLine2: expensesData.addressLine2,
          city:expensesData.city,
          pin: expensesData.pin,
          taxNumberPin:expensesData.taxNumberPin
        };
        setExpenses([...expenses, updatedExpenses]);
      }

      setRequired(false);
    } else {
      setRequired(false);
    }
    setValue("title", "");
    setValue("addressLine2", "");
    setValue("city", "");

    setValue("pin", "");
    setValue("taxNumberPin","");
    setIsEditMode(false);
    setEditIndex(null);

    setValidationErrors("");
    
  };

  const handleEditExpense = (index) => {
    setIsEditMode(true);
    setEditIndex(index);

    const expenseToEdit = expenses[index];


    console.log(expenseToEdit)


    setValue("title", expenseToEdit.title);
    setValue("addressLine2", expenseToEdit.addressLine2);
    setValue("city", expenseToEdit.city);
    setValue("pin",expenseToEdit.pin);
    setValue("taxNumberPin",expenseToEdit.taxNumberPin);
  };


  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  useEffect(()=>{
    setSkip(true);
  },[setSkip]);
  const [selectedCountry, setSelectedCountry] = useState('');

//   const options = [
//       { value: 'option1', label: 'option1' },
//       { value: 'option2', label: 'option2' },
//       { value: 'option3', label: 'option3' },
//       { value: 'option4', label: 'option4' },
//   ];

  const handleCountryChange = (e) => {
      setValue('addressLine2', e.target.value);
      setSelectedCountry(e.value);
  };
// const handleCityChange = (selectedValue) => {
//     setValue('city', selectedValue.target.value);
//   };
  return (
    <>
   <div className=' flex-wrap p-fluid mb-5'>
        {/* <ReusableAddress control={control} errors={errors} setValue={setValue} /> */}
       <h4 className='fw-bold text-center'>Principal Worker Address Details</h4>
      <form>
        <div className='md:flex'>
        <CustomInputText
          control={control}
          errors={errors}
          name="title"
          labelId="addressLine1.label"
          required={false}
          requiredMsg='addressLine1.required'
          className=" md:col-6"
          autoFocus
        />
<CustomDropdown
          control={control}
          errors={errors}
        //   options={options2}
        options={Country.countries.map((country) => ({
            value: country.name,
            label: country.name,
        }))}
          name="addressLine2"
          labelId="addressLine2.label"
          required={false}
          requiredMsg='addressLine2.required'
          className=" md:col-6"
          onChange={handleCountryChange}
        />

</div>
<div className='md:flex'>

                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="city"
                    labelId="addressLine3.label"
                    defaultValue=""
                    options={
                        selectedCountry
                            ? States.states[selectedCountry].map((state) => ({
                                value: state,
                                label: state,
                            }))
                            : []
                    }
                    required={required}
                    requiredMsg="addressLine3.required"
                    placeholder="Select city"
                    className='md:col-4'
                    // onChange={handleCityChange}
                />
               
               <CustomInputText
          control={control}
          errors={errors}
          name="pin"
          labelId="addressLinePin.label"
          required={false}
          requiredMsg='addressLinePin.required'
          className=" md:col-4"
          autoFocus
        />
        <CustomInputMask
                control={control}
                errors={errors}
                name="taxNumberPin"
                labelId="addressLineTaxId.label"
                mask="99-9999999"
                defaultValue=""
                required={false}
                requiredMsg="addressLineTaxId.required"
                className=" md:col-4"
              />
            </div>  
            <div className="flex justify-content-start mt-2">
      <Checkbox onChange={handleChange} onClick={handleAddExpense} checked={checked}
     
      ></Checkbox>
      {/* <input
          type="checkbox"
          checked={checked}
          onClick={handleAddExpense}
          onChange={() => setIsChecked(!isChecked)}
        /> */}
           <label className='fw-bold ml-2'>Do you want to add another principal Work location for the worker ?</label>     
    </div>
        {/* <div className='float-end mt-2'>
          <Button
            // className='border border-2  p-text-center'
            type='button'
            onClick={handleAddExpense}
            size="small"
          >
            {isEditMode ? 'Update  Address' : 'Add Address'}
          </Button>               
        </div> */}

        {required && (
          <div className='col-md-12 mt-3 text-danger'>
            All fields are required.
          </div>
        )}
        
      </form>

      {expenses.length > 0 && (
        <div className="full-screen-table-container">
          <h4 className='fw-bold'>Address List</h4>
          <table className="table full-screen-table">
            <thead>
              <tr>
                <th>AddressLine1</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Pin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.title}</td>
                  <td>{expense.addressLine2}</td>
                  <td>{expense.city}</td>
                  <td>{expense.pin}</td>
                  <td>{expense.taxNumberPin}</td>
                  <td className="text-start">
                    <span
                      className="cursorPointer pe-3"
                      onClick={() => handleEditExpense(index)}
                    >
                      <i className="pi pi-pencil"></i>
                    </span>
                    <span
                      className="cursorPointer"
                      onClick={() => handleDeleteExpense(index)}
                    >
                      <i className="pi pi-trash"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {validationErrors && <div className="text-danger">{validationErrors}</div>}

    </div>
 
  </>  
  );
}

export default SingleResourceWoAddress;



// import { Sidebar } from '@coreui/coreui';
// import { Button } from 'primereact/button'
// import React, { useState } from 'react'

// function SingleResourceWoAddress() {

//   return (
//     <div><div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
//     <h5>Address List</h5>
    
//     <Button
//       label=""
//       severity="primary"
//       icon="pi pi-plus fs-5"
//       // onClick={addAddressActionHandler}
//       size="small"
//     />
    
//   </div></div>
//   )
// }

// export default SingleResourceWoAddress

//take checkbox
// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { InputText } from 'primereact/inputtext';
// import React, { useState } from 'react';
// import { Sidebar } from 'primereact/sidebar';
// import { Dropdown } from 'primereact/dropdown';
// import { Checkbox } from 'primereact/checkbox';
// import CustomInputText from '../../../../../../components/controls/CustomInputText';
// // import { useForm } from 'react-hook-form';

// function SingleResourceWoAddress() {
//     const [checked, setChecked] = useState(false);
//     const [sidebarVisibleTable, setSidebarVisibleTable] = useState(false);
//     const [sidebarVisibleAdd,setSidebarVisibleTableAdd] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const handleChange = (e) => {

//         setChecked(e.checked);
//         // if(valueToPass === "CheckedValue"){
//         //     dispatch(storeUploadMsaData(null));
//         //     }else{
//         //         dispatch(storeUploadMsaData(expenceData));
//         //     } 
//       };
//     const [products, setProducts] = useState([
//         { id: 1, name: 'description', email: '$20', type: "1.5%" },
//     ]);
//     const [newName, setNewName] = useState('');
//     const [newEmail, setNewEmail] = useState('');
//     const [type, setType] = useState('');
//     const handleAddNewRow = () => {
//         if (newName.trim() && newEmail.trim() && type.trim()) {
//             const newProduct = {
//                 id: products.length + 1,
//                 name: newName,
//                 email: newEmail,
//                 type: type,
//             };
//             setProducts(prevProducts => [...prevProducts, newProduct]);

//             setNewName('');
//             setNewEmail('');
//             setType('');

//         }
//         setSidebarVisibleTableAdd(false); //hide the Showing the Sidebar
//     };
//     const cancelAddRow = () => {
//         setNewName('');
//         setNewEmail('');
//         setType('');

//         setSidebarVisibleTableAdd(false);
//     };

//     const optionType = [
//         { value: '1.5%', label: '1.5%' },
//         { value: '1.8%', label: '1.8%' },
//     ];
//     const optionAmount = [
//         { value: '$20', label: '$20' },
//         { value: '30%', label: '30%' },
//     ];
//     const handleDelete = (productId) => {
//         setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
//     };
//     const cancelEdit = () => {
//         setNewName('');
//         setNewEmail('');
//         setType('');
//         setSidebarVisibleTable(false);
//     };
//     const Actions = (rowData) => {
//         return (
//             <div>
//                 <>
//                     <Sidebar
//                         visible={sidebarVisibleTable}
//                         blockScroll={true}
//                         className='w-75' position='right'
//                         onHide={() => setSidebarVisibleTable(false)}
//                     >
//                         <div className="h-screen">
//                             <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
//                                 <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
//                                     <div className="d-flex align-items-center">
//                                         <i
//                                             className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
//                                             onClick={() => setSidebarVisibleTable(false)}
//                                         />
//                                         <div className="fs-4 fw-bold">Edit Price Details</div></div>
//                                     <div>
//                                         <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTable(false)} />
//                                     </div>

//                                 </div>
//                             </div>
//                             <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
//                             <CustomInputText
//                             control={control}
//                             errors={errors}
//                             name="addressName"
//                             labelId="addressName"
//                             defaultValue=""
//                             placeholder="Ex: office, home etc.."
//                             autoFocus
//                         />
//                                 {/* <CustomInputText
//                                  control={control}
//                                  errors={errors}
//                                  name="newName"
//                                  labelId="email"
//                                  className="md:col-6 sm:col-12" */}
//                                  {/* <InputText
//                                  placeholder="Description"
//                                      className='col-12 mb-2'
//                                      value={newName} onChange={(e) => setNewName(e.target.value)} 

//                                     /> */}
//                                 {/* <Dropdown className='col-12 mb-2'
//                                     value={newEmail}
//                                     options={optionAmount}
//                                     onChange={(e) => setNewEmail(e.value)}
//                                     placeholder="Amount"
//                                 /> */}
//                                 {/* <Dropdown
//                                     value={type}
//                                     options={optionType}
//                                     onChange={(e) => setType(e.value)}
//                                     placeholder="Type"
//                                     className='col-12'
//                                 /> */}
//                             </div>
//                             <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
//                                 <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
//                                     <Button
//                                         label="CANCEL"
//                                         onClick={cancelEdit}
//                                         icon="pi pi-times"
//                                         className="company-secondary-btn"
//                                     />
//                                     <Button
//                                         label='UPDATE'
//                                         // onClick={handleSubmit(handleEditRows)}
//                                         onClick={handleEditRows}
//                                         icon="pi pi-check"
//                                         className="company-primary-btn"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </Sidebar>
//                     <i
//                         className="pi pi-pencil mr-3"
//                         onClick={() => {
//                             setSelectedProduct(rowData);
//                             setNewName(rowData.name); // Set the current name in the input field
//                             setNewEmail(rowData.email);
//                             setType(rowData.type);
//                             setSidebarVisibleTable(true);
//                         }}
//                     />
//                 </>
//                 <i
//                     className="pi pi-trash "
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => handleDelete(rowData.id)}
//                 />
//             </div>
//         );
//     };
//     const handleEditRows = () => {
//         if (selectedProduct && newName.trim() && newEmail.trim() && type.trim()) {
//             const updatedProducts = products.map((product) =>
//                 product.id === selectedProduct.id ? { ...product, name: newName, email: newEmail, type: type } : product
//             );
//             setProducts(updatedProducts);
//         }
//         // Reset state variables
//         setNewName('');
//         setNewEmail(' ');
//         setType('');
//         // reset();
//         setSelectedProduct(null);
//         setSidebarVisibleTable(false);
//     };
//     return (
//         <>
//         <Sidebar
//                         visible={sidebarVisibleAdd}
//                         blockScroll={true}
//                         className='w-75' position='right'
//                         onHide={() => setSidebarVisibleTableAdd(false)}
//                     >
//                         <div className="h-screen">
//                             <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
//                                 <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
//                                     <div className="d-flex align-items-center">
//                                         <i
//                                             className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
//                                             onClick={() => setSidebarVisibleTableAdd(false)}
//                                         />
//                                         <div className="fs-4 fw-bold">Add Address Details</div></div>
//                                     <div>
//                                         <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTableAdd(false)} />
//                                     </div>

//                                 </div>
//                             </div>
//                             </div>
//                             <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
//                     <InputText placeholder="Description" value={newName} onChange={(e) => setNewName(e.target.value)} 
//                      />
//                      <div className="md:flex">
//                                 <Dropdown value={newEmail} className='md:col-6 col-12'
//                         options={optionAmount}
//                         onChange={(e) => setNewEmail(e.value)}
//                         placeholder="Amount"
//                                 />
//                                 <Dropdown className='md:col-6 col-12'
//                                     value={type}
//                                     options={optionType}
//                                     onChange={(e) => setType(e.value)}
//                                     placeholder="Type"
//                                 />
//                                 </div>
//                             </div>
//                             <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
//                                 <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
//                                     <Button
//                                         label="CANCEL"
//                                         onClick={cancelAddRow}
//                                         icon="pi pi-times"
//                                         className="company-secondary-btn"
//                                     />
//                                     <Button
//                                         label='ADD'
//                                         onClick={handleAddNewRow}
//                                         icon="pi pi-check"
//                                         className="company-primary-btn"
//                                     />
//                                 </div>
//                             </div>

//                     </Sidebar>
            
//                 <div><div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
//      <h5>Address List</h5>
    
//      <Button
//        label=""
//        severity="primary"
//        icon="pi pi-plus fs-5"
//        onClick={() => setSidebarVisibleTableAdd(true)}
//        size="small"
//      />
    
//    </div></div>
//             <div className="p-fluid" >
//                 <DataTable
//                     value={products}
//                     editMode="row"
//                     dataKey="id"
//                     tableStyle={{ minWidth: '50rem' }}
//                 >
//                     <Column field="name" header="Address Line"
//                     />
//                     <Column field="email" header="Country"
//                     />
//                     <Column field="type" header="State"
//                     />
//                     <Column body={Actions} header="Actions" ></Column>
//                 </DataTable>
//                 <div className="flex justify-content-start mt-2">
//       <Checkbox onChange={handleChange} checked={checked}
//     //   setValidationErrors={setValidationErrors}
//       > 
//       {/* {validationErrors && <div className="text-danger">{validationErrors}</div>} */}
//       <label>Do you want to add one More Address?</label>
//       </Checkbox>
                
//     </div>
//             </div>
//         </>
//     );
// }

// export default SingleResourceWoAddress;

// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import { InputText } from 'primereact/inputtext';
// import React, { useState } from 'react';
// import { Sidebar } from 'primereact/sidebar';
// import { Dropdown } from 'primereact/dropdown';
// // import { useForm } from 'react-hook-form';

// function SingleResourceWoAddress() {
//     const [sidebarVisibleTable, setSidebarVisibleTable] = useState(false);
//     const [sidebarVisibleAdd,setSidebarVisibleTableAdd] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([
//         { id: 1, name: 'description', email: '$20', type: "1.5%" },
//     ]);
//     const [newName, setNewName] = useState('');
//     const [newEmail, setNewEmail] = useState('');
//     const [type, setType] = useState('');
//     const handleAddNewRow = () => {
//         if (newName.trim() && newEmail.trim() && type.trim()) {
//             const newProduct = {
//                 id: products.length + 1,
//                 name: newName,
//                 email: newEmail,
//                 type: type,
//             };
//             setProducts(prevProducts => [...prevProducts, newProduct]);

//             setNewName('');
//             setNewEmail('');
//             setType('');

//         }
//         setSidebarVisibleTableAdd(false); //hide the Showing the Sidebar
//     };
//     const cancelAddRow = () => {
//         setNewName('');
//         setNewEmail('');
//         setType('');

//         setSidebarVisibleTableAdd(false);
//     };

//     const optionType = [
//         { value: '1.5%', label: '1.5%' },
//         { value: '1.8%', label: '1.8%' },
//     ];
//     const optionAmount = [
//         { value: '$20', label: '$20' },
//         { value: '30%', label: '30%' },
//     ];
//     const handleDelete = (productId) => {
//         setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
//     };
//     const cancelEdit = () => {
//         setNewName('');
//         setNewEmail('');
//         setType('');
//         setSidebarVisibleTable(false);
//     };
//     const Actions = (rowData) => {
//         return (
//             <div>
//                 <>
//                     <Sidebar
//                         visible={sidebarVisibleTable}
//                         blockScroll={true}
//                         className='w-75' position='right'
//                         onHide={() => setSidebarVisibleTable(false)}
//                     >
//                         <div className="h-screen">
//                             <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
//                                 <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
//                                     <div className="d-flex align-items-center">
//                                         <i
//                                             className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
//                                             onClick={() => setSidebarVisibleTable(false)}
//                                         />
//                                         <div className="fs-4 fw-bold">Edit Price Details</div></div>
//                                     <div>
//                                         <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTable(false)} />
//                                     </div>

//                                 </div>
//                             </div>
//                             <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
//                                 {/* <CustomInputText
//                                  control={control}
//                                  errors={errors}
//                                  name="newName"
//                                  labelId="email"
//                                  className="md:col-6 sm:col-12" */}
//                                  <InputText
//                                  placeholder="Description"
//                                      className='col-12 mb-2'
//                                      value={newName} onChange={(e) => setNewName(e.target.value)} 

//                                     />
//                                 <Dropdown className='col-12 mb-2'
//                                     value={newEmail}
//                                     options={optionAmount}
//                                     onChange={(e) => setNewEmail(e.value)}
//                                     placeholder="Amount"
//                                 />
//                                 <Dropdown
//                                     value={type}
//                                     options={optionType}
//                                     onChange={(e) => setType(e.value)}
//                                     placeholder="Type"
//                                     className='col-12'
//                                 />
//                             </div>
//                             <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
//                                 <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
//                                     <Button
//                                         label="CANCEL"
//                                         onClick={cancelEdit}
//                                         icon="pi pi-times"
//                                         className="company-secondary-btn"
//                                     />
//                                     <Button
//                                         label='UPDATE'
//                                         // onClick={handleSubmit(handleEditRows)}
//                                         onClick={handleEditRows}
//                                         icon="pi pi-check"
//                                         className="company-primary-btn"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </Sidebar>
//                     <i
//                         className="pi pi-pencil mr-3"
//                         onClick={() => {
//                             setSelectedProduct(rowData);
//                             setNewName(rowData.name); // Set the current name in the input field
//                             setNewEmail(rowData.email);
//                             setType(rowData.type);
//                             setSidebarVisibleTable(true);
//                         }}
//                     />
//                 </>
//                 <i
//                     className="pi pi-trash "
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => handleDelete(rowData.id)}
//                 />
//             </div>
//         );
//     };
//     const handleEditRows = () => {
//         if (selectedProduct && newName.trim() && newEmail.trim() && type.trim()) {
//             const updatedProducts = products.map((product) =>
//                 product.id === selectedProduct.id ? { ...product, name: newName, email: newEmail, type: type } : product
//             );
//             setProducts(updatedProducts);
//         }
//         // Reset state variables
//         setNewName('');
//         setNewEmail(' ');
//         setType('');
//         // reset();
//         setSelectedProduct(null);
//         setSidebarVisibleTable(false);
//     };
//     return (
//         <>
//         <Sidebar
//                         visible={sidebarVisibleAdd}
//                         blockScroll={true}
//                         className='w-75' position='right'
//                         onHide={() => setSidebarVisibleTableAdd(false)}
//                     >
//                         <div className="h-screen">
//                             <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
//                                 <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
//                                     <div className="d-flex align-items-center">
//                                         <i
//                                             className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
//                                             onClick={() => setSidebarVisibleTableAdd(false)}
//                                         />
//                                         <div className="fs-4 fw-bold">Add Price Details</div></div>
//                                     <div>
//                                         <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTableAdd(false)} />
//                                     </div>

//                                 </div>
//                             </div>
//                             </div>
//                             <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
//                     <InputText placeholder="Description" value={newName} onChange={(e) => setNewName(e.target.value)} 
//                      />
//                      <div className="md:flex">
//                                 <Dropdown value={newEmail} className='md:col-6 col-12'
//                         options={optionAmount}
//                         onChange={(e) => setNewEmail(e.value)}
//                         placeholder="Amount"
//                                 />
//                                 <Dropdown className='md:col-6 col-12'
//                                     value={type}
//                                     options={optionType}
//                                     onChange={(e) => setType(e.value)}
//                                     placeholder="Type"
//                                 />
//                                 </div>
//                             </div>
//                             <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
//                                 <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
//                                     <Button
//                                         label="CANCEL"
//                                         onClick={cancelAddRow}
//                                         icon="pi pi-times"
//                                         className="company-secondary-btn"
//                                     />
//                                     <Button
//                                         label='ADD'
//                                         onClick={handleAddNewRow}
//                                         icon="pi pi-check"
//                                         className="company-primary-btn"
//                                     />
//                                 </div>
//                             </div>

//                     </Sidebar>
//             <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
//             <h5>Address List</h5>
//             <Button
//               label=""
//               severity="primary"
//               icon="pi pi-plus fs-5"
//               onClick={() =>(
//                 // addRow,
//                 setSidebarVisibleTableAdd(true))}
//               size="small"
//             />
//           </div>
//             <div className="p-fluid" >
//                 <DataTable
//                     value={products}
//                     editMode="row"
//                     dataKey="id"
//                     tableStyle={{ minWidth: '50rem' }}
//                 >
//                     <Column field="name" header="Description"
//                     />
//                     <Column field="email" header="Amount"
//                     />
//                     <Column field="type" header="Type"
//                     />
//                     <Column body={Actions} header="Actions" ></Column>
//                 </DataTable>
//             </div>
//         </>
//     );
// }
// export default SingleResourceWoAddress;

// import React from 'react'

// function SingleResourceWoAddress() {
//   return (
//     <div>SingleResourceWoAddress</div>
//   )
// }

// export default SingleResourceWoAddress

// import moment from 'moment';
//   const localizer = momentLocalizer(moment);
//   import { Calendar, momentLocalizer } from 'react-big-calendar';
//   const handleCreateEvent = () => {
//     const startMoment = moment(data.startTime, 'HH:mm');
//     const endMoment = moment(data.endTime, 'HH:mm');
//     const newEvent = {
//         meetingId: meetingId,
//         title: data.eventTitle,
//         description: eventDescription,
//         start: new Date(
//             selectedDate.getFullYear(),
//             selectedDate.getMonth(),
//             selectedDate.getDate(),
//             startMoment.hour(),
//             startMoment.minute()
//         ),
//         end: new Date(
//             selectedDate.getFullYear(),
//             selectedDate.getMonth(),
//             selectedDate.getDate(),
//             endMoment.hour(),
//             endMoment.minute()
//         ),
//         formattedStartTime: startMoment.format('hh:mm A'),
//         formattedEndTime: endMoment.format('hh:mm A'),
//         timezone: data.timezone,
//         name: data.firstName,
//     };
//     if (endMoment.isBefore(startMoment)) {
//         setEndTimeErr("EndTime cant't be greater than StartTime");
//     } else {
//         setEndTimeErr('');
//         setEvents([...events, newEvent]);
//         setEventDescription('');
//         handleAddEventClose();
//         reset();
//     }
// };

// import React, { useState, useRef, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { Toast } from 'primereact/toast';
// import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
// import SingleResourceRecruiterInfoChild from './SingleResourceRecruiterInfoChild';


// const SingleResourceWoAddress = ({control,errors, setSkip}) => {
//     const toast = useRef(null);
//     const [resDept, setResDept] = useState([
//         { id: 1, dept: 'Ravi' },
//         { id: 2, dept: 'Swathi' },
//     ]);
//         const options = [
//         { value: 'AccountManger1', label: 'AccountManger1' },
//         { value: 'AccountManger2',label: 'AccountManger2' },
//     ];
//     const [dataAdded, setDataAdded] = useState(false);
//     let required = true;
//     const [showCreateRole, setShowCreateRole] = useState(false);
//     const existingDepartments = resDept.map((dept) => dept.dept.toLowerCase());
//     const handleAddDepartment = (newDepartment) => {
//         setResDept((prevResDept) => [...prevResDept, { id: prevResDept.length + 1, dept: newDepartment }]);
//     };
//     const handleAddNewClick = () => {
//         setShowCreateRole(true);
//         setDataAdded(true); // Set dataAdded to true when the user clicks on "Add"
//     };


//     const [editingDeptRow, setEditingDeptRow] = useState(null);

//     const [editMode, setEditMode] = useState(false); // New state variable to track edit mode
//     const [showDept, setShowDept] = useState(false); // for Create Department
//     const [pendingAction, setPendingAction] = useState(null);

//     const inputRef = useRef(null);

//     useEffect(() => {
//         if (pendingAction) {
//             inputRef.current && inputRef.current.focus();
//         }
//     }, [pendingAction]);

//     const showError = (inputId) => {
//         toast.current.show({
//             severity: 'error',
//             summary: 'Error',
//             detail: 'Complete the current action first!',
//         });

//         setPendingAction(inputId);
//     };
//     const clearPendingAction = () => {
//         setPendingAction(null);
//     };


//     const actionTemplateDept = (rowData) => {
//         if (editingDeptRow === rowData.id) {
//             return (
//                 <div className="d-flex gap-2">

//                 </div>
//             );
//         } else {
//             return (
//                 <div className="d-flex align-item-center gap-4 cursor-pointer">

//                     <AiOutlineDelete className="m-1" size="1rem" onClick={() => handleDeleteDept(rowData)} />
//                 </div>
//             );
//         }
//     };

//     const handleDeleteDept = (rowData) => {
//         // if (editMode || showDept) {
//         //     showError(`inputDept_${rowData.id}`);
//         // } else {
//         //     const deleteDept = resDept.filter((item) => item !== rowData);
//         //     setResDept(deleteDept);
//         //     clearPendingAction();
//         // }
//         if (editMode || showDept || dataAdded === true) {
//             showError(`inputDept_${rowData.id}`);
//         //             toast.current.show({
//         //     severity: 'error',
//         //     summary: 'Error',
//         //     detail: 'Cannot delete without submitting data',
//         //     life: 3000, // Show for 3 seconds
//         // });
//         return;
//         } else {
//             const deleteDept = resDept.filter((item) => item !== rowData);
//             setResDept(deleteDept);
//             clearPendingAction();
//         }
//     };
// useEffect(()=>{
//     setSkip(false);
// },[setSkip]);
// console.log(setEditingDeptRow,setEditMode,setShowDept,"setEditingDeptRow");
//     return (
//         <div>
//  <div className=" flex-wrap gap-3 p-fluid">
//                 <h4 className="fw-bold text-center" >Account Manager Info</h4>
//                 <Toast ref={toast} />
//                 <CustomDropdown
//                     control={control}
//                     errors={errors}
//                     name="accountManager"
//                     labelId="accountManager.label"
//                     defaultValue=""
//                     options={options}
//                     required={required}
//                     requiredMsg="accountManager.required"
//                     placeholder="Select selectedMsa type"
//                     className="md:col-12"
//                 />
//             </div>
//                         <Toast ref={toast} />       
//                      {!showCreateRole &&
//                     <> 
//                         <div className="flex justify-content-between">
//                             <h4 className='fw-bold ml-2'>RecruiterInfo</h4>        
//                             <Button className="w-1" icon="pi pi-plus" label="ADD" size="small" type="button" onClick={handleAddNewClick}></Button>
//                         </div>
//                         </>   
//                     }
//                     <div className='mb-2'>
//                         {showCreateRole && <SingleResourceRecruiterInfoChild showCreateRole={showCreateRole} setShowCreateRole={setShowCreateRole}
//                             onAddDepartment={handleAddDepartment}
//                             existingDepartments={existingDepartments}
//                             setDataAdded={setDataAdded}
//                         />}
//                     </div>

//                     <div className="">
//                         <DataTable value={resDept} size="small" dataKey="id" className="card">
//                             <Column
//                                 field="dept"
//                                 header="RecruiterName"
//                                 style={{ width: '72%' }}
//                             />
//                             <Column
//                                 body={actionTemplateDept}
//                                 headerStyle={{ width: '3%', minWidth: '1rem' }}
//                                 bodyStyle={{ textAlign: 'center' }}
//                             ></Column>
//                         </DataTable>
//                     </div>
//                 </div>
//     );
// };

// export default SingleResourceWoAddress;

// import React from 'react'

// function SingleResourceWoAddress() {
//   return (
//     <div>SingleResourceWoAddress</div>
//   )
// }

// export default SingleResourceWoAddress