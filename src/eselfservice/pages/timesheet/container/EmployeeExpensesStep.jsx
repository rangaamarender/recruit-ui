import React from 'react'
import ReusableAddExpenses from '../../../../components/expenses/ReusableAddExpenses'

function EmployeeExpensesStep({ control, errors, watch, setValue, validationErrors,setValidationErrors,formData}) {
  return (
    <div>
     <ReusableAddExpenses
     control={control}
     errors={errors}
     watch={watch}
     setValue={setValue}
     validationErrors={validationErrors}
     setValidationErrors={setValidationErrors}
     formData={formData}
     showDropdown={false}
     />
    </div>
  )
}

export default EmployeeExpensesStep