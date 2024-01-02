import React, { useState } from 'react';
import CustomInputText from '../controls/CustomInputText';
import CustomDropdown from '../controls/CustomDropdown';
import Country from '../../assets/__mockData__/countries.json';
import States from '../../assets/__mockData__/states.json';

function ReusableAddress({ control, errors, setValue }) {
    const [selectedCountry, setSelectedCountry] = useState('');

    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    const handleCountryChange = (e) => {
        setValue('countryCode', e.target.value);
        setSelectedCountry(e.value);
    };

    let required = true;

    return (
        <div className="formgrid grid">
            <div className='col-12 '>
                <h3>Address</h3>
                {/* <small>text come here</small> */}
            </div>
            <div className='col-12'>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="addressName"
                    labelId="addressName"
                    defaultValue=""
                    placeholder="Ex: office, home etc.."
                    required={required}
                    requiredMsg="addressName.required"
                    autoFocus
                />
            </div>
            <div className='col-12'>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="address1"
                    labelId="address1"
                    defaultValue=""
                    placeholder="Address line 1"
                    required={required}
                    requiredMsg="address1.required"
                />
            </div>
            <div className='col-12'>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="address2"
                    labelId="address2"
                    placeholder="Address line 2"
                    defaultValue=""
                />
            </div>
            <div className='col-12 md:col-6'>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="countryCode"
                    labelId="countryCode"
                    defaultValue=""
                    options={Country.countries.map((country) => ({
                        value: country.name,
                        label: country.name,
                    }))}
                    required={required}
                    requiredMsg="countryCode.required"
                    placeholder="Select country"
                    onChange={handleCountryChange}
                />
            </div>
            <div className='col-12 md:col-6'>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="state"
                    labelId="state"
                    defaultValue=""
                    options={
                        selectedCountry
                            ? States.states[selectedCountry].map((state) => ({
                                value: state,
                                label: state,
                            }))
                            : []
                    }
                    required={required}
                    requiredMsg="state.required"
                    placeholder="Select state"
                />
            </div>
            <div className='col-12 md:col-6'>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="city"
                    labelId="city"
                    defaultValue=""
                    options={options}
                    required={required}
                    requiredMsg="city.required"
                    placeholder="Select city"
                />
            </div>
            <div className='col-12 md:col-6'>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="postalCode"
                    labelId="postalCode"
                    defaultValue=""
                    placeholder="Zip"
                    required={required}
                    requiredMsg="postalCode.required"
                />
            </div>
        </div>
    );
}

export default ReusableAddress;
