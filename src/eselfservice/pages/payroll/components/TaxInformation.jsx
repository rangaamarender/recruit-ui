import React from 'react'
import FederalTaxInformation from '../container/FederalTaxInformation'
import StateTaxInformation from '../container/StateTaxInformation'
import { useState } from 'react'

function TaxInformation() {
    const [active, setActive] = useState("all")
  return (
    <div >
     <div className='rounded border mt-4 p-2'>
        {(active === 'all' || active === 'editProfileDetails') &&
            <FederalTaxInformation setActive={setActive} active={active} />}
        {(active === 'all' || active === 'editContactDetails') &&
            <StateTaxInformation setActive={setActive} active={active} />}
       

    </div>




    </div>
  )
}

export default TaxInformation