import React from 'react'
import PayrollDash from './PayrollDash'
import PayrollAction from './PayrollAction'

const PayrollFirstContainer = () => {
  return (
    <div>
         <div className="card">
                <div className='d-flex w-full'>
                <div className="w-8">
                <PayrollDash/>
                </div>
                <div className="w-4 py-6 border-start">
                <PayrollAction />  
                </div>
                </div>
            </div>
    </div>
  )
}

export default PayrollFirstContainer