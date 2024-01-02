import React from 'react';

function ExpenseViewTab({ rowData }) {
  const data = rowData?.data || {};

  return (
    <div>
      {Object.keys(data).length > 0 && (
        <>
      
          <div class="container mt-2">
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Contract</label>
                <p className='p-text-primary'>{data.contract}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary' >Title</label>
                <p className='p-text-primary'>{data.title}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Date</label>
                <p className='p-text-primary'>{data.date}</p>
              </div>
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Amount</label>
                <p className='p-text-primary'>{data.amount}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5 col-md-6">
                <label className='p-text-secondary'>Status</label>
                <p className='p-text-primary'>{data.status}</p>
              </div>
            </div>
          </div>

          </>
      )}
      
    </div>
  );
}

export default ExpenseViewTab;
