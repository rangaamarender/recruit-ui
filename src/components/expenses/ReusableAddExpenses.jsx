import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeExpenceData } from '../../redux/actions/timesheetActions';
import CustomInputText from '../controls/CustomInputText';
import CustomCalender from '../controls/CustomCalender';
import CustomEditor from '../controls/CustomEditor';
import { Button } from 'primereact/button';
import { timesheetValidateFileType, validateFileSize } from '../fileUpload/config/validationFileTypes';
import CustomDropdown from '../controls/CustomDropdown';

function ReusableAddExpenses({ control, errors, watch, setValue, validationErrors,setValidationErrors,formData, showDropdown }) {
  const dispatch = useDispatch();

  console.log(formData.weekData,"weekdata---")
  // console.logformData(formData.timeCardItems, "timecard")
  console.log(formData.timeCardItems,"timecard")

  const expenceData = useSelector((state) => state.timesheet.expenceData);

  const [required, setRequired] = useState(false);
  const [expenses, setExpenses] = useState(expenceData);
  const expensesData = watch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [document, setDocument] = useState();
  const [fileValidationError, setFileValidationError] = useState("");

  useEffect(() => {
    dispatch(storeExpenceData(expenses))
  })
  console.log(expenceData, 'expenceData Redux')
  console.log(formData.timeCardItems,"123FormDAta")

  const handleAddExpense = () => {
    if (expensesData.title && expensesData.amount && expensesData.expensesDate && document) {

      const originalDate = new Date(expensesData.expensesDate);
      const month = String(originalDate.getMonth() + 1).padStart(2, '0');
      const day = String(originalDate.getDate()).padStart(2, '0');
      const year = originalDate.getFullYear();
      const formatedDate = `${month}/${day}/${year}`;

      if (isEditMode && editIndex !== null) {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = {
          title: expensesData.title,
          amount: expensesData.amount,
          date: formatedDate,
          file: document,
          description: expensesData.description
        };
        setExpenses(updatedExpenses);


      } else {
        const updatedExpenses = {
          title: expensesData.title,
          amount: expensesData.amount,
          date: formatedDate,
          file: document,
          description: expensesData.description
        };
        setExpenses([...expenses, updatedExpenses]);
      }

      setRequired(false);
    } else {
      setRequired(true);
    }
    setValue("title", "");
    setValue("amount", "");
    setValue("expensesDate", "");
    setValue("fileUpload", "");
    setValue("description", "");

    setIsEditMode(false);
    setEditIndex(null);

    setValidationErrors("")
  };

  const handleEditExpense = (index) => {
    setIsEditMode(true);
    setEditIndex(index);

    const expenseToEdit = expenses[index];
    const fileName = expenseToEdit.file.name;

    console.log(expenseToEdit)
    console.log(fileName)

    setValue("title", expenseToEdit.title);
    setValue("amount", expenseToEdit.amount);
    setValue("expensesDate", new Date(expenseToEdit.date));
    setValue("description", expenseToEdit.description);
    // setValue("fileUpload", expenseToEdit.file)

  };


  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Check file type
    if (!timesheetValidateFileType(file)) {
      setFileValidationError("File types are allowed: jpeg, jpg, gif, pdf, svg, png, doc, docx, xls, xlsx");
      setDocument(null);
      return;
    }

    // Check file size
    if (!validateFileSize(file)) {
      setFileValidationError("Maximum file size allowed is 30MB");
      setDocument(null);
      return;
    }

    setFileValidationError("");
    setDocument(file);
  };

  const contractOptions = [
    { value: 'contract1', label: 'Contract 1' },
    { value: 'contract2', label: 'Contract 2' },
    { value: 'contract3', label: 'Contract 3' },
];

const handleContractChange = (event)=>{
const contractId = event.value
  setValue("contract", contractId)
  
}

  return (
    <div className=' flex-wrap p-fluid mb-5'>
      <form>
        <CustomInputText
          control={control}
          errors={errors}
          name="title"
          labelId="title.label"
          required={true}
          requiredMsg='title.required'
          className=" md:col-12"
          autoFocus
        />
         {showDropdown && (
        <CustomDropdown
            control={control}
            errors={errors}
            name="contract"
            labelId="contract.label"
            defaultValue=""
            options={contractOptions}
            onChange={handleContractChange}
            placeholder="Select contract"
          />
         )}

        <div className="flex">
          <CustomInputText
            control={control}
            errors={errors}
            name="amount"
            type="number"
            labelId="amount.label"
            required={true}
            requiredMsg='amount.required'
            className=" md:col-6"
          />

          <CustomCalender
            control={control}
            errors={errors}
            name="expensesDate"
            labelId="expensesDate.label"
            required={true}
            requiredMsg='expensesDate.required'
            showIcon={true}
            className="md:col-6 sm:col-12"
          />
        </div>

        <div className="centered-container">
          <input
            type="file"
            name="fileUpload"
            onChange={handleFileChange}
          />
          {/* <CustomInputFile
            control={control}
            errors={errors}
            name="fileUpload"
            onChange={handleFileChange}
          /> */}
        </div>
        {fileValidationError && (
          <div className="text-danger">{fileValidationError}</div>
        )}

        <CustomEditor
          control={control}
          errors={errors}
          name="description"
          labelId="description.label"
          className="md:col-12 sm:col-12"
          style={{ height: "150px" }}
          onTextChange={(e) => setValue("description", e.htmlValue)}
        />

        <div className='float-end'>
          <Button
            className='border border-2  p-text-center'
            type='button'
            size="small"
            onClick={handleAddExpense}
          >
            {isEditMode ? 'Update expense' : 'Add Expense'}
          </Button>
        </div>

        {required && (
          <div className='col-md-12 mt-3 text-danger'>
            All fields are required.
          </div>
        )}
      </form>

      {expenses.length > 0 && (
        <div className="full-screen-table-container">
          <h5>Expenses:</h5>
          <table className="table full-screen-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Expenses Date</th>
                <th>File Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>

                  <td>{expense.file.name}</td>
                  <td dangerouslySetInnerHTML={{ __html: expense.description }}></td>
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

<div className='mb-6'></div>
    </div>
  );
}

export default ReusableAddExpenses;
