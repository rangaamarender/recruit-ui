import React from 'react'
import ReusableAddExpenses from '../../../../components/expenses/ReusableAddExpenses'
// import ReusableAddExpenses from '../../../../components/expenses/ReusableAddExpenses'

function ExpensesStep({control, errors, watch, setValue, validationErrors,setValidationErrors,formData}) {
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
    />
   </div>
  )
}

export default ExpensesStep