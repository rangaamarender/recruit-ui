import React, { useEffect } from 'react';
import CustomInputText from '../controls/CustomInputText';
import CustomDropdown from '../controls/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddressTypeRequest } from '../../redux/actions/adminResourceRoleAction';
// import { fetchCountries } from '../../redux/actions/companiesActions';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
];

function ReusableAddress({ control, errors, setValue }) {
    let required = true;

    const dispatch = useDispatch();
    const orgAddrescountries = useSelector((state) => state.company.countries);
    const addressType = useSelector((state) => state.adminRole.addressType);

    const handleCountryChange = (selectedValue) => {
        setValue('orgAddrescountry', selectedValue.target.value);
    };

    const handleAddressType = (selectedValue) => {
        setValue('addressType', selectedValue.target.value);
    };

    useEffect(() => {
        dispatch(fetchAddressTypeRequest());
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(fetchCountries());
    // }, [dispatch])

    return (
        <div className="formgrid grid">
            <div className='col-12 text-center'>
                <h3>Address</h3>
                {/* <small>text come here</small> */}
            </div>
            <div className='col-12 md:col-6'>
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
            <div className='col-12 md:col-6'>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="addressType"
                    labelId="addressType"
                    defaultValue=""
                    options={addressType?.map(type => ({
                        value: type.addressType,
                        label: type.displayName
                    }))}
                    onChange={handleAddressType}
                    required={required}
                    requiredMsg="addressType.required"
                    placeholder="Select address type"
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
                    name="orgAddrescountry"
                    labelId="countryCode"
                    defaultValue=""
                    options={orgAddrescountries?.map(country => ({
                        value: country.countryCode,
                        label: country.countryName
                    }))}
                    onChange={handleCountryChange}
                    required={required}
                    requiredMsg="countryCode.required"
                    placeholder="Select country"
                />
            </div>
            <div className='col-12 md:col-6'>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="state"
                    labelId="state"
                    defaultValue=""
                    options={options}
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
