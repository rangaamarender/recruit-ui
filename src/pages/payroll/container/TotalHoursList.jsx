import React from 'react'
import PlainCustomDataTable from '../../../components/datatable/PlainCustomDataTable';
import totalHoursSelectedColumn from '../config/totalHoursSelectedColumn';
import totalHoursColumnConfig from '../config/totalHoursColumnConfig';

const TotalHoursList = () => {
  const hrsTotal = [
    {
      name: "Abhishek Pulluri",
      hrsWork: "172 Hours hrs",
      rates:"$60.00",
      amount:"$2300.00",
      totalPay: "$2500.00",
    },
  ]
 
  return (
    <div>
      {/* content1 */}
      <div className='l-width-70 m-auto p-3 d-flex align-items-center justify-content-between border-bottom'>
        <div className=''>
          <div className='fs-5 fw-bold'>
            Total Earnings
          </div>
          <div className='p-text-secondary'>
            Edit or Update Earnings
          </div>
        </div>
      </div>
      {/* DataTable */}
      <div className='l-width-70 m-auto'>
        <div className='p-3'>
          <PlainCustomDataTable
            data={hrsTotal}
            selectedColumns={totalHoursSelectedColumn}
            columnsConfig={totalHoursColumnConfig}
          />
        </div>
      </div>
    </div>
  )
}

export default TotalHoursList