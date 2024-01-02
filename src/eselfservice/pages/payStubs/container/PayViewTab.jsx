import React from 'react';

function PayViewTab({ rowData }) {
 
  const data = rowData?.data || {};


  return (
    <div>
      {Object.keys(data).length > 0 && (
        <>
      
          <div class="container mt-2">
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Pay Date</label>
                <p className='p-text-primary'>{data.payDate}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary' >Start Date</label>
                <p className='p-text-primary'>{data.startDate}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary' >End Date</label>
                <p className='p-text-primary'>{data.endDate}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Hours</label>
                <p className='p-text-primary'>{data.hours}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Ems</label>
                <p className='p-text-primary'>{data.ems}</p>
              </div>
            </div>
          </div>
        
          
        </>
      )}
      
    </div>
  );
}

export default PayViewTab;
