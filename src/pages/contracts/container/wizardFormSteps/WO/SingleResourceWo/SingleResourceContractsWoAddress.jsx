import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { storeExpenceData } from '../../../../../../redux/actions/timesheetActions';
import ReusableAddressForm from '../../../../../../components/address/ReusableAddressForm';


function SingleResourceContractsWoAddress({ control, errors, watch, setValue, validationErrors, setValidationErrors, setSkip }) {
    const dispatch = useDispatch();
    const expenceData = useSelector((state) => state.timesheet.expenceData);
  
    const [required, setRequired] = useState(false);
    const [expenses, setExpenses] = useState(expenceData);
    const expensesData = watch();
  
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);


    useEffect(() => {
      dispatch(storeExpenceData(expenses));
    }, [dispatch, expenses]);
  console.log(expenceData, 'expenceData Redux')

  const handleAddExpense = (e) => {
    if (expensesData.title  && expensesData.addressLine2 && expensesData.city && expensesData.pin && expensesData.taxNumberPin) {
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
console.log(required);
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

    setValidationErrors("")
  };

  const handleEditExpense = (index) => {
    setIsEditMode(true);
    setEditIndex(index);
    const expenseToEdit = expenses[index];
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


  const handleCountryChange = (e) => {
      setValue('addressLine2', e.target.value);
      setSelectedCountry(e.value);
  };

  return (
    <div className=' flex-wrap p-fluid mb-5'>
   <h4 className='fw-bold text-center'>Address</h4>

<form>
<ReusableAddressForm
          control={control}
          errors={errors}
          setValue={setValue}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
        />
                <div className='float-end mt-2'>
          <Button
            type='button'
            onClick={handleAddExpense}
            size="small"
          >
            {isEditMode ? 'Update  Address' : 'Add Address'}
          </Button>               
        </div>
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
  );
}
export default SingleResourceContractsWoAddress;