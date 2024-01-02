import React from 'react';

function EmployeeCompanyProfiles() {
  return (

    <>
      <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
        <div>Profile</div>
      </div>

      <div className="formgrid grid m-2">
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Company name</label>
          <p className='p-text-primary'>Infosysys Private Limited</p>
        </div>

        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Phone</label>
          <p className='p-text-primary'>(264)-2552-162</p>
        </div>
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Fax</label>
          <p className='p-text-primary'>---</p>
        </div>
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Web Address</label>
          <p className='p-text-primary'>www.google.com</p>
        </div>
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Created Date</label>
          <p className='p-text-primary'>Oct 29, 2023 </p>
        </div>
      </div>
      <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
        <div>CEO Details</div>
      </div>

      <div className="formgrid grid m-2">
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>CEO name</label>
          <p className='p-text-primary'>Ravi chandran</p>
        </div>
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Author Signatory Email</label>
          <p className='p-text-primary'>ravichandran@Infosysys.com</p>
        </div>

      </div>
      <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
        <div>Address</div>
      </div>

      <div className="formgrid grid m-2">
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Address 1</label>
          <p className='p-text-primary'>(264)-2552-162</p>
        </div>
        <div className="col-12 md:col-6">
          <label className='p-text-secondary'>Address 2</label>
          <p className='p-text-primary'>(264)-2552-162
          </p>
        </div>

      </div>
    </>
  )
}

export default EmployeeCompanyProfiles