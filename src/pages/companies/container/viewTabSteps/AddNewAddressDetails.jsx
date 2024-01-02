import React, { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Toast } from 'primereact/toast';
import _ from 'lodash';
import { fetchAddressTypeRequest } from '../../../../redux/actions/adminResourceRoleAction';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
];

const AddNewAddressDetails = ({ setAddSidebarVisible }) => {
    const toast = useRef(null);
    const orgAddrescountries = useSelector((state) => state.company.countries);
    const addressType = useSelector((state) => state.adminRole.addressType);
    console.log(orgAddrescountries, "Countries")
    const { control, setValue, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.company.selectedCompany);

    const handleCountryChange = (selectedValue) => {
        setValue('countryCode', selectedValue.target.value);
    };

    const handleAddressType = (selectedValue) => {
        setValue('addressType', selectedValue.target.value);
    };

    useEffect(() => {
        dispatch(fetchAddressTypeRequest());
    }, [dispatch]);

    const createPayload = (company, newAddress) => {
        const orgAddresses = company.orgAddresses ?? [];
        return {
            organizationID: company.organizationID,
            orgAddresses: [...orgAddresses, newAddress],
        };
    };

    const onSubmit = (data) => {
        const newAddress = {
            ..._.pick(data, [
                'addressName',
                'address1',
                'address2',
                'address3',
                'address4',
                'address5',
                'city',
                'state',
                'postalCode',
                'postOfficeBox',
                'geoCode',
                'orgAddressID',
                'startDate',
                'endDate'
            ]),
            country: {
                countryCode: data.countryCode
            },
            orgAddressType: {
                addressType: data.addressType
            }
        };

        const payload = createPayload(selectedCompany, newAddress);
        dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
        setAddSidebarVisible(false);
    };

    const handleCancelEdit = () => {
        setAddSidebarVisible(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formgrid grid p-3 mb-6">
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='addressName'
                                labelId="addressName"
                                defaultValue=''
                                placeholder="Ex: office, home etc.."
                                autoFocus
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name='addressType'
                                labelId="addressType"
                                defaultValue=''
                                options={addressType?.map(type => ({
                                    value: type.addressType,
                                    label: type.displayName
                                }))}
                                required={false}
                                placeholder="Select address type"
                                onChange={handleAddressType}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='address1'
                                labelId="address1"
                                defaultValue=''
                                placeholder="Address line 1"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='address2'
                                labelId="address2"
                                defaultValue=''
                                placeholder="Address line 2"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name='countryCode'
                                labelId="countryCode"
                                defaultValue=''
                                options={orgAddrescountries?.map((country) => ({
                                    value: country.countryCode,
                                    label: country.countryName
                                }))}
                                required={false}
                                placeholder="Select country"
                                onChange={handleCountryChange}
                            />
                        </div>
                        <div className='col-12 md:col-6'>
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name='state'
                                labelId="state"
                                defaultValue=''
                                options={options}
                                required={false}
                                requiredMsg="state.required"
                                placeholder="Select state"
                            />
                        </div>
                        <div className='col-12 md:col-6'>
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name='city'
                                labelId="city"
                                defaultValue=''
                                options={options}
                                required={false}
                                requiredMsg="city.required"
                                placeholder="Select city"
                            />
                        </div>
                        <div className='col-12 md:col-6'>
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='postalCode'
                                labelId="postalCode"
                                defaultValue=''
                                placeholder="Zip"
                                required={false}
                                requiredMsg="postalCode.required"
                            />
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-sidebar-header d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                <Button type="button" severity="secondary" label="Cancel" size="small" onClick={handleCancelEdit} />
                                <Button type="submit" severity="primary" label="Add" size="small" className="ms-2 me-2" />
                            </div>
                        </div>
                    </div>
                </form>
            </>
        </>
    );
};

export default AddNewAddressDetails;
