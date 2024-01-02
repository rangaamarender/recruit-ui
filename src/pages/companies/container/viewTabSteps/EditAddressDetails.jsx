import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import _ from 'lodash';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Toast } from 'primereact/toast';
import { fetchAddressTypeRequest } from '../../../../redux/actions/adminResourceRoleAction';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
];

const EditAddressDetails = ({ selectedRowData, setViewSidebarVisible }) => {
    const toast = useRef(null);
    const orgAddrescountries = useSelector((state) => state.company.countries);
    const addressType = useSelector((state) => state.adminRole.addressType);

    const { control, setValue, handleSubmit, formState: { errors }, } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.company.selectedCompany);
    const action = useSelector((state) => state.company.action);

    // console.log(selectedRowData);

    const handleCountryChange = (selectedValue, index) => {
        setValue(`orgAddresses[${index}].countryCode`, selectedValue.target.value);
    };

    const handleAddressType = (selectedValue, index) => {
        // setValue('addressType', selectedValue.target.value);
        setValue(`orgAddresses[${index}].addressType`, selectedValue.target.value);
    };

    useEffect(() => {
        dispatch(fetchAddressTypeRequest());
    }, [dispatch])

    const createPayload = (company) => {
        return {
            organizationID: company.organizationID,
            orgAddresses: company.orgAddresses.map((address) => ({
                ..._.pick(address, [
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
                    countryCode: address.countryCode
                },
                orgAddressType: {
                    addressType: address.addressType
                }
            }))
        };
    };

    const onSubmit = (data) => {
        const updatedCompany = { ...selectedCompany, ...data };
        const payload = createPayload(updatedCompany);

        dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
        setIsEdit(false);
    };

    const handleEdit = () => {
        setIsEdit(true);
        // setActive('editAddressDetails');
    };

    const handleCancelEdit = () => {
        // setViewSidebarVisible(false)
        setIsEdit(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className="name-view-heading">Address</div>
                {(!isEdit && action !== 'view' && selectedCompany?.orgAddresses?.length > 0) && (
                    <div className="d-flex justify-content-between align-items-center gap-3">
                        <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                    </div>
                )}
            </div>

            {isEdit ? (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {selectedCompany?.orgAddresses?.map((item, index) => (
                            <div className="formgrid grid p-3 mb-6" key={index}>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name={`orgAddresses[${index}].addressName`}
                                        labelId="addressName"
                                        defaultValue={item.addressName}
                                        placeholder="Ex: office, home etc.."
                                        autoFocus
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name={`orgAddresses[${index}].addressType`}
                                        labelId="addressType"
                                        defaultValue={item.orgAddressType?.addressType}
                                        options={addressType?.map(type => ({
                                            value: type.addressType,
                                            label: type.displayName
                                        }))}
                                        required={false}
                                        placeholder="Select address type"
                                        onChange={(selectedValue) => handleAddressType(selectedValue, index)}
                                    // onChange={handleCountryChange}
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name={`orgAddresses[${index}].address1`}
                                        labelId="address1"
                                        defaultValue={item.address1}
                                        placeholder="Address line 1"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name={`orgAddresses[${index}].address2`}
                                        labelId="address2"
                                        defaultValue={item.address2}
                                        placeholder="Address line 2"
                                    />
                                </div>

                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name={`orgAddresses[${index}].countryCode`}
                                        labelId="countryCode"
                                        defaultValue={item.country?.countryCode}

                                        options={orgAddrescountries?.map((country) => ({
                                            value: country.countryCode,
                                            label: country.countryName
                                        }))}
                                        required={false}
                                        placeholder="Select country"
                                        onChange={(selectedValue) => handleCountryChange(selectedValue, index)}
                                    // onChange={handleCountryChange}
                                    />
                                </div>
                                <div className='col-12 md:col-6'>
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name={`orgAddresses[${index}].state`}
                                        labelId="state"
                                        defaultValue={item.state}
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
                                        name={`orgAddresses[${index}].city`}
                                        labelId="city"
                                        defaultValue={item.city}
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
                                        name={`orgAddresses[${index}].postalCode`}
                                        labelId="postalCode"
                                        defaultValue={item.postalCode}
                                        placeholder="Zip"
                                        required={false}
                                        requiredMsg="postalCode.required"
                                    />
                                </div>

                                <div className="col-12 md:col-6">
                                    <div className="p-sidebar-header d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                        <Button type="button" severity="secondary" label="Cancel" size="small" onClick={handleCancelEdit} />
                                        <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                </>
            ) : (
                <>
                    {/* Display the data in view mode */}
                    {selectedCompany?.orgAddresses && selectedCompany?.orgAddresses?.length > 0 ? (

                        selectedCompany?.orgAddresses?.map((item, index) => (
                            <div key={index} className="formgrid grid m-2">
                                <div className="col-12 md:col-6">
                                    <label className="p-text-secondary">Ex: office, home etc..</label>
                                    <p className="p-text-primary">{item.addressName}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className="p-text-secondary">Address Type</label>
                                    <p className="p-text-primary">{item?.orgAddressType?.addressType}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className='p-text-secondary'>Address Line 1</label>
                                    <p className='p-text-primary'>{item.address1}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className='p-text-secondary'>Address Line 2</label>
                                    <p className='p-text-primary'>{item.address2}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className="p-text-secondary">Country</label>
                                    <p className="p-text-primary">{item?.country?.countryName}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className='p-text-secondary'>State</label>
                                    <p className='p-text-primary'>{item.state}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className='p-text-secondary'>City</label>
                                    <p className='p-text-primary'>{item.city}</p>
                                </div>
                                <div className="col-12 md:col-6">
                                    <label className='p-text-secondary'>Postal Code</label>
                                    <p className='p-text-primary'>{item.postalCode}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h6 className='p-3'>No Data Available</h6>
                    )}
                </>
            )}
        </>
    );
};

export default EditAddressDetails;
