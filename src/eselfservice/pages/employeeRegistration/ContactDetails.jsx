import React from 'react'
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';
import CustomInputText from '../../../components/controls/CustomInputText';
import ReusableAddress from '../../../components/address/ReusableAddress';
import CustomDropdown from '../../../components/controls/CustomDropdown';


function ContactDetails({ control, errors, setSkip, setValue }) {
  const required = false

  const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
  ];

  return (
    <div class="formgrid grid mb-6">
      <div class=" col-12 md:col-6">
        <CustomInputPhoneNbr
          control={control}
          errors={errors}
          name="dialNumber"
          labelId="phoneNbr"
          maskFormat="(999) 999-9999"
          defaultValue=""
          disabled
        />
      </div>
      <div class=" col-12 md:col-6">
        <CustomInputText
          control={control}
          errors={errors}
          name="emailId"
          labelId="Email"
          defaultValue=""
          disabled
        />
      </div>
      <div class=" col-12" >
        <ReusableAddress control={control} errors={errors} setValue={setValue} />

      </div>

      <div class=" col-12 md:col-6">
        <CustomDropdown
          control={control}
          errors={errors}
          name="addressType"
          labelId="Address Type"
          defaultValue=""
          options={options}
          required={required}
          requiredMsg="Address type is required"
          placeholder="Select Address type"
        />
      </div>
    </div>
  )
}

export default ContactDetails