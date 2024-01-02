import React, { useEffect } from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomCalender from '../../../../components/controls/CustomCalender';

function Documents({ control, errors, setSkip, formData }) {
  const required = true;

  // console.log(formData, "address");


  useEffect(() => {
    setSkip(true)
  })

  return (
    <>
      <div className="formgrid grid mb-5">
        <div className='col-12 text-center'>
          <h3>Documents</h3>
          {/* <small>text come here</small> */}
        </div>
        <div className='col-12'>
          <CustomInputText
            control={control}
            errors={errors}
            name="documentName"
            labelId="documentName"
            defaultValue=""
            required={required}
            placeholder="Document Name"
            requiredMsg="documentName.required"
            autoFocus
          />
        </div>
        <div className='col-12 md:col-6'>
          <CustomInputText
            control={control}
            errors={errors}
            name="docNumber"
            labelId="docNumber"
            placeholder="123456ABC"
            defaultValue=""
            required={required}
            requiredMsg="docNumber.required"
          />
        </div>
        <div className='col-12 md:col-3'>
          <CustomCalender
            control={control}
            errors={errors}
            name="issuedDt"
            labelId="issuedDt"
            requiredMsg="issuedDt.required"
            defaultValue=''
            showIcon={true}
            required={required}
          />
        </div>
        <div className='col-12 md:col-3'>
          <CustomCalender
            control={control}
            errors={errors}
            name="expirationDate"
            labelId="expirationDate"
            requiredMsg="expirationDate.required"
            defaultValue=''
            showIcon={true}
            required={required}
          />
        </div>
      </div>
    </>
  );
}

export default Documents;
