import React from 'react';
import CustomInputText from '../controls/CustomInputText';
import CustomDropdown from '../controls/CustomDropdown';
import Country from '../../assets/__mockData__/countries.json';
import States from '../../assets/__mockData__/states.json';
import CustomInputMask from '../controls/CustomInputMask';


const ReusableAddressForm = ({ control, errors, setValue, selectedCountry, handleCountryChange }) => {
    return (
      <>
        <div className='md:flex'>
          <CustomInputText
            control={control}
            errors={errors}
            name="title"
            labelId="addressLine1.label"
            required={false}
            requiredMsg='addressLine1.required'
            className=" md:col-6"
            autoFocus
          />
          <CustomDropdown
            control={control}
            errors={errors}
            options={Country.countries.map((country) => ({
              value: country.name,
              label: country.name,
            }))}
            name="addressLine2"
            labelId="addressLine2.label"
            required={false}
            requiredMsg='addressLine2.required'
            className=" md:col-6"
            onChange={handleCountryChange}
          />
        </div>
        <div className='md:flex'>
          <CustomDropdown
            control={control}
            errors={errors}
            name="city"
            labelId="addressLine3.label"
            defaultValue=""
            options={
              selectedCountry
                ? States.states[selectedCountry].map((state) => ({
                  value: state,
                  label: state,
                }))
                : []
            }
            required={false}
            requiredMsg="addressLine3.required"
            placeholder="Select city"
            className='md:col-4'
          />
          <CustomInputText
            control={control}
            errors={errors}
            name="pin"
            labelId="addressLinePin.label"
            required={false}
            requiredMsg='addressLinePin.required'
            className=" md:col-4"
            autoFocus
          />
          <CustomInputMask
            control={control}
            errors={errors}
            name="taxNumberPin"
            labelId="addressLineTaxId.label"
            mask="99-9999999"
            defaultValue=""
            required={false}
            requiredMsg="addressLineTaxId.required"
            className=" md:col-4"
          />
        </div>
      </>
    );
  };
  
  export default ReusableAddressForm;