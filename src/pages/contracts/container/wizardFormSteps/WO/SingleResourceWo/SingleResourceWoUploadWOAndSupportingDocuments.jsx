
// import React, { useEffect, useState } from 'react';
// import { Button } from 'primereact/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { storeExpenceData } from '../../../../../../redux/actions/timesheetActions';
// import { validateFileSize, validateFileType } from '../../../../../timesheet/config/timesheetDocumentsType';
// import CustomInputText from '../../../../../../components/controls/CustomInputText';
// import CustomCalender from '../../../../../../components/controls/CustomCalender';


// function SingleResourceWoUploadWOAndSupportingDocuments({ control, errors, watch, setValue, validationErrors,setValidationErrors, setSkip }) {
//   const dispatch = useDispatch();
//   const expenceData = useSelector((state) => state.timesheet.expenceData);

//   const [required, setRequired] = useState(false);
//   const [expenses, setExpenses] = useState(expenceData);
//   const expensesData = watch();

//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [document, setDocument] = useState();
//   const [fileValidationError, setFileValidationError] = useState("");

//   useEffect(() => {
//     dispatch(storeExpenceData(expenses))
//   })
//   console.log(expenceData, 'expenceData Redux')

//   const handleAddExpense = () => {
//     if (expensesData.title 
//         && expensesData.startDates
//          && 
//         expensesData.expensesDate && document) {

//       const originalDate = new Date(expensesData.expensesDate);
//       const month = String(originalDate.getMonth() + 1).padStart(2, '0');
//       const day = String(originalDate.getDate()).padStart(2, '0');
//       const year = originalDate.getFullYear();
//       const formatedDate = `${month}/${day}/${year}`;

//       const originalstartDate = new Date(expensesData.startDates);
//       const monthstartDate = String(originalstartDate.getMonth() + 1).padStart(2, '0');
//       const daystartDate = String(originalstartDate.getDate()).padStart(2, '0');
//       const yearstartDate = originalstartDate.getFullYear();
//       const formatedDatestartDate = `${monthstartDate}/${daystartDate}/${yearstartDate}`;

//       if (isEditMode && editIndex !== null) {
//         const updatedExpenses = [...expenses];
//         updatedExpenses[editIndex] = {
//           title: expensesData.title,
//         //   amount: expensesData.amount,
//         startDates:formatedDatestartDate,
//           date: formatedDate,
//           file: document,
//         //   description: expensesData.description
//         };
//         setExpenses(updatedExpenses);


//       } else {
//         const updatedExpenses = {
//           title: expensesData.title,
//         //   amount: expensesData.amount,
//         startDates:formatedDatestartDate,
//           date: formatedDate,
//           file: document,
//         //   description: expensesData.description
//         };
//         setExpenses([...expenses, updatedExpenses]);
//       }

//       setRequired(false);
//     } else {
//       setRequired(false);
//     }
//     setValue("title", "");
//     // setValue("amount", "");
//     setValue("startDates","");
//     setValue("expensesDate", "");
//     setValue("fileUpload", "");
//     // setValue("description", "");

//     setIsEditMode(false);
//     setEditIndex(null);

//     setValidationErrors("")
//   };

//   const handleEditExpense = (index) => {
//     setIsEditMode(true);
//     setEditIndex(index);

//     const expenseToEdit = expenses[index];
//     const fileName = expenseToEdit.file.name;

//     console.log(expenseToEdit)
//     console.log(fileName)

//     setValue("title", expenseToEdit.title);
//     // setValue("amount", expenseToEdit.amount);
//     setValue("startDates",new Date(expenseToEdit.startDates));
//     setValue("expensesDate", new Date(expenseToEdit.date));
//     // setValue("description", expenseToEdit.description);
//     // setValue("fileUpload", expenseToEdit.file)

//   };


//   const handleDeleteExpense = (index) => {
//     const updatedExpenses = [...expenses];
//     updatedExpenses.splice(index, 1);
//     setExpenses(updatedExpenses);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     // Check file type
//     if (!validateFileType(file)) {
//       setFileValidationError("File types are allowed: jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx");
//       setDocument(null);
//       return;
//     }

//     // Check file size
//     if (!validateFileSize(file)) {
//       setFileValidationError("Maximum file size allowed is 30MB");
//       setDocument(null);
//       return;
//     }

//     setFileValidationError("");
//     setDocument(file);
//   };

//   useEffect(()=>{
//     setSkip(true);
//   },[setSkip]);

//   return (
//     <div className=' flex-wrap p-fluid mb-5'>
//        <h4 className='fw-bold text-center'>Upload WO and supporting Documents</h4>
//       <form>
//         <CustomInputText
//           control={control}
//           errors={errors}
//           name="title"
//           labelId="DocumentTitle.label"
//           required={false}
//           requiredMsg='DocumentTitle.required'
//           className=" md:col-12"
//           autoFocus
//         />

//         <div className="flex">
//           {/* <CustomInputText
//             control={control}
//             errors={errors}
//             name="amount"
//             type="number"
//             labelId="amount.label"
//             required={true}
//             requiredMsg='amount.required'
//             className=" md:col-6"
//           /> */}
// <CustomCalender
//             control={control}
//             errors={errors}
//             name="startDates"
//             labelId="documentStartDate.label"
//             required={false}
//             requiredMsg='documentStartDate.required'
//             showIcon={true}
//             className="md:col-6 sm:col-12"
//           />
//           <CustomCalender
//             control={control}
//             errors={errors}
//             name="expensesDate"
//             labelId="documentEndDate.label"
//             required={false}
//             requiredMsg='documentEndDate.required'
//             showIcon={true}
//             className="md:col-6 sm:col-12"
//           />
//         </div>

//         <div className="centered-container">
//           <input
//             type="file"
//             name="fileUpload"
//             onChange={handleFileChange}
//           className='p-text-center'
//           />
//           {/* <div className='mt-2'>jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx</div> */}
//           {/* fileTypes={['jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx']}
//            <CustomInputFile
//             control={control}
//             errors={errors}
//             name="fileUpload"
//             onChange={handleFileChange}
//           /> */}
//         </div>
//         {fileValidationError && (
//           <div className="text-danger">{fileValidationError}</div>
//         )}

//         {/* <CustomEditor
//           control={control}
//           errors={errors}
//           name="description"
//           labelId="description.label"
//           className="md:col-12 sm:col-12"
//           style={{ height: "150px" }}
//           onTextChange={(e) => setValue("description", e.htmlValue)}
//         /> */}

//         <div className='float-end mt-2'>
//           <Button
//             className='border border-2  p-text-center'
//             type='button'
//             onClick={handleAddExpense}
//           >
//             {isEditMode ? 'Update  WO' : 'Upload WO'}
//           </Button>
//         </div>

//         {required && (
//           <div className='col-md-12 mt-3 text-danger'>
//             All fields are required.
//           </div>
//         )}
//       </form>

//       {expenses.length > 0 && (
//         <div className="full-screen-table-container">
//           <h4 className='fw-bold'>Documents</h4>
//           <table className="table full-screen-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 {/* <th>Amount</th> */}
//                 <th>Start/Upload Date </th>
//                 <th>Expiry Date</th>
//                 {/* <th>File Name</th> */}
//                 {/* <th>Description</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenses.map((expense, index) => (
//                 <tr key={index}>
//                   <td>{expense.title}</td>
//                   <td>{expense.startDates}</td>
//                   <td>{expense.date}</td>

//                   {/* <td>{expense.file.name}</td> */}
//                   {/* <td dangerouslySetInnerHTML={{ __html: expense.description }}></td> */}
//                   <td className="text-start">
//                     <span
//                       className="cursorPointer pe-3"
//                       onClick={() => handleEditExpense(index)}
//                     >
//                       <i className="pi pi-pencil"></i>
//                     </span>
//                     <span
//                       className="cursorPointer"
//                       onClick={() => handleDeleteExpense(index)}
//                     >
//                       <i className="pi pi-trash"></i>
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {validationErrors && <div className="text-danger">{validationErrors}</div>}

//     </div>
//   );
// }

// export default SingleResourceWoUploadWOAndSupportingDocuments;

import React, {  useState } from 'react';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomCalender from '../../../../../../components/controls/CustomCalender';
import ReusableFileuploadWithTabel from '../../../../../../components/fileUpload/ResuableFileUploadWithTable';
import { useDispatch, useSelector } from 'react-redux';
import { storeUploadMsaData } from '../../../../../../redux/actions/contractActions';
import { useEffect } from 'react';
import timesheetResoursesData from '../../../../../../assets/__mockData__/timesheetResoursesData.json';
import { timesheetValidateFileType } from '../../../../../../components/fileUpload/config/validationFileTypes';

function SingleResourceWoUploadWOAndSupportingDocuments({ control, errors,validationErrors,setValidationErrors, setFinish }){

      let required = false;

const dispatch = useDispatch();
const docData = useSelector((state) => state.contract.uploadMsaData)

const [resources, setResources] = useState([]);
const [workOrders, setWorkOrders] = useState([]);
const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
const [timesheetFiles, setTimesheetFiles] = useState(docData);
console.log(resources,workOrders,setWorkOrders,selectedWorkOrder,setSelectedWorkOrder);//remove
// useEffect(()=>{
//   setFinish(true);
// },[setFinish])
useEffect(() => {
  dispatch(storeUploadMsaData(timesheetFiles))
})
useEffect(() => {
  const resourcesData = timesheetResoursesData.resourcesData.map((resource) => ({
    value: resource.id,
    label: resource.name,
    workOrders: resource.workOrders,
  }));
  setResources(resourcesData);
}, []);
    return (
        <>
            
            <h4 className="fw-bold text-center">Upload WO And Supporting Documents</h4>
            
      <CustomInputText
                    control={control}
                    errors={errors}
                    name="msaCode"
                    labelId="DocumentTitle.label"
                    defaultValue={null}
                    required={required}
                    placeholder="---"
                    requiredMsg="DocumentTitle.required"
                    className="md:col-12"
                />
                <div className="md:flex">
                      <CustomCalender
        control={control}
        errors={errors}
        name="startDate"
        labelId="startDate.label"
        requiredMsg="startDate.required"
        defaultValue=''
        showIcon={true}
        required={required}
        className="md:col-6"
      />
      <CustomCalender
        control={control}
        errors={errors}
        name="endDate"
        labelId="endDate.label"
        requiredMsg="endDate.required"
        defaultValue=''
        showIcon={true}
        required={required}
        className="md:col-6"
      />
      </div>
      <div className='col-12 md:col-12'>
                    <div className="  profilepic-border rounded rounded mt-1 p-5 d-flex justify-content-center align-items-center">
                     <ReusableFileuploadWithTabel
            files={timesheetFiles}
            setFiles={setTimesheetFiles}
            validateFileType={timesheetValidateFileType}
            name="fileUpload"
            fileTypes={['jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx']}
            maxFileSize={30}
            setValidationErrors={setValidationErrors}
            className="col-10 md:col-10"
          />
           {validationErrors && <div className="text-danger">{validationErrors}</div>}
        </div>
        </div>
        </>
    );
}
export default SingleResourceWoUploadWOAndSupportingDocuments;