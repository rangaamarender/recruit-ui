import React from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputMask from '../../../../components/controls/CustomInputMask';

function CompaniesAddUsersStep({ control, errors }) {
  let required = false

  const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
  ];

  return (
    <>
      <div className="formgrid grid">
        <div className='col-12 text-center'>
          <h3>Add Users</h3>
          {/* <small>text come here</small> */}
        </div>
        <div className="col-12 md:col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="userFirstName"
            labelId="firstName"
            defaultValue=""
            required={required}
            placeholder="First Name"
            requiredMsg="firstName.required"
            autoFocus
          />
        </div>
        <div className="col-12 md:col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="userLastName"
            labelId="lastName"
            defaultValue=""
            placeholder="Last Name"
          />
        </div>
        <div className="col-12">
          <CustomInputText
            control={control}
            errors={errors}
            name="userEmail"
            labelId="authSignataryEmail"
            placeholder="admin@tech.com"
            defaultValue=""
            required={required}
            requiredMsg="authSignataryEmail.required"
          />
        </div>
        <div className="col-12 md:col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="UserEmailID"
            labelId="emailID"
            defaultValue=""
            required={required}
            placeholder="Email id"
            requiredMsg="emailID.required"
          />
        </div>
        <div className='col-12 md:col-6'>
          <CustomDropdown
            control={control}
            errors={errors}
            name="userEmailType"
            labelId="emailType"
            defaultValue=""
            options={options}
            required={required}
            requiredMsg="emailType.required"
            placeholder="Select email type"
          />
        </div>
        <div className="col-12 md:col-6">
          <CustomInputMask
            control={control}
            errors={errors}
            name="userPhoneNumber"
            labelId="phoneNumber"
            defaultValue=""
            mask="(999) 999-9999"
            required={required}
            placeholder="Phone number"
            requiredMsg="phoneNumber.required"
          />
        </div>
        <div className="col-12 md:col-6">
          <CustomDropdown
            control={control}
            errors={errors}
            name="userPhoneType"
            labelId="phoneType"
            defaultValue=""
            options={options}
            required={required}
            requiredMsg="phoneType.required"
            placeholder="Select phone type"
          />
        </div>
      </div >
    </>
  );
}

export default CompaniesAddUsersStep;
