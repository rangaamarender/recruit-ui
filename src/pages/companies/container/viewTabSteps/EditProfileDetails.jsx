import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import {
    updateCompanyRequest,
    fetchCountries,
    fetchTaxClassifications,
} from '../../../../redux/actions/companiesActions';
import CustomInputMask from '../../../../components/controls/CustomInputMask';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
import _ from 'lodash';
import { Toast } from 'primereact/toast';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
];

const EditProfileDetails = ({ setActive }) => {
    const { control, setValue, handleSubmit, formState: { errors }, } = useForm();
    const toast = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.company.countries);
    const taxClassifications = useSelector((state) => state.company.taxClassifications);
    const selectedCompany = useSelector((state) => state.company.selectedCompany);
    const action = useSelector((state) => state.company.action);

    const createPayload = (updatedCompany) => {
        return {
            name: updatedCompany.name ?? '',
            phoneNumber: updatedCompany.phoneNumber ?? '',
            fax: updatedCompany.fax ?? '',
            taxId: updatedCompany.taxId ?? '',
            tradeName: updatedCompany.tradeName ?? '',
            country: {
                countryCode: updatedCompany?.country ?? '',
            },
            stateOfInc: updatedCompany.stateOfInc ?? '',
            taxClassification: {
                taxClassCode: updatedCompany.taxClassification ?? '',
            },
        };
    };

    const onSubmit = (data) => {
        const updatedCompany = _.merge({}, selectedCompany, data);
        const payload = createPayload(updatedCompany);
        dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
        setIsEdit(false);
        setActive('all');
    };

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleCountryChange = (selectedValue) => {
        setValue('country', selectedValue.target.value);
        dispatch(fetchTaxClassifications(selectedValue.value));
    };

    const handleEdit = () => {
        setIsEdit(true);
        setActive('editProfileDetails');
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive('all');
    };

    return (
        <>
            <Toast ref={toast} />
            <div className={isEdit ? 'test3' : ''}>
                <div className="company-main-text fs-6  p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className="name-view-heading">Profile</div>
                    {!isEdit && action !== 'view' && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill
                                onClick={handleEdit}
                                className="cursor-pointer company-primary-text company-main-text fs-4"
                            />
                        </div>
                    )}
                </div>
                {isEdit ? (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3 mb-6">
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="name"
                                        labelId="companyName"
                                        placeholder="Company name"
                                        defaultValue={selectedCompany?.name}
                                        autoFocus
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="tradeName"
                                        labelId="dba"
                                        defaultValue={selectedCompany?.tradeName}
                                        placeholder="DBA or Trade name"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="country"
                                        labelId="countryOfIncorporation"
                                        defaultValue={selectedCompany?.country?.countryCode || ''}
                                        options={countries.map((country) => ({
                                            value: country.countryCode,
                                            label: country.countryName,
                                        }))}
                                        onChange={handleCountryChange}
                                        required={false}
                                        placeholder="Select country"
                                        requiredMsg="countryOfIncorporation.required"
                                    />
                                </div>
                                <div class=" col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="stateOfInc"
                                        labelId="stateOfIncorporation.label"
                                        defaultValue={selectedCompany?.stateOfInc || ''}
                                        options={options}
                                        required={false}
                                        placeholder="Select State"
                                        requiredMsg="stateOfIncorporation.required"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="taxClassification"
                                        labelId="taxClassification"
                                        defaultValue={selectedCompany?.taxClassification?.taxClassCode || ''}
                                        options={
                                            taxClassifications.length > 0
                                                ? taxClassifications.map((tc) => ({
                                                    value: tc.taxClassCode,
                                                    label: tc.description,
                                                }))
                                                : []
                                        }
                                        required={false}
                                        placeholder="Select Tax Classification"
                                        requiredMsg="taxClassification.required"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputMask
                                        control={control}
                                        errors={errors}
                                        name="taxId"
                                        labelId="ein"
                                        mask="99-9999999"
                                        defaultValue={selectedCompany?.taxId}
                                    // disabled
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputPhoneNbr
                                        control={control}
                                        errors={errors}
                                        name="phoneNumber"
                                        labelId="phoneNbr"
                                        maskFormat="(999) 999-9999"
                                        defaultValue={selectedCompany?.phoneNumber}
                                        requiredMsg="phoneNumber.required"
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputMask
                                        control={control}
                                        errors={errors}
                                        name="fax"
                                        labelId="fax"
                                        mask="(999) 999-9999"
                                        defaultValue={selectedCompany?.fax}
                                    />
                                </div>
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="status"
                                        labelId="status.label"
                                        defaultValue={
                                            selectedCompany?.status
                                                ?.map((statusItem) => statusItem.statusCode)
                                                .join(', ') || ''
                                        }
                                        options={selectedCompany?.status?.map((statusItem) => ({
                                            value: statusItem.statusCode,
                                            label: statusItem.statusCode,
                                        }))}
                                        placeholder="Select Status"
                                    />
                                </div>

                            </div>
                            <div className="p-sidebar-header h-custom-10 fixed bottom-0 col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                <Button type="button" severity="secondary" label="Cancel" size="small" className="" onClick={handleCancelEdit} />
                                <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="formgrid grid m-2">
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Company name</label>
                                <p className="p-text-primary">{selectedCompany?.name}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">DBA (if different)</label>
                                <p className="p-text-primary">{selectedCompany?.tradeName || ''}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Employer Identification Number (EIN)</label>
                                <p className="p-text-primary">{selectedCompany?.taxId}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Country of Incorporation</label>
                                <p className="p-text-primary">{selectedCompany?.country?.countryName || ''}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">State of Incorporation</label>
                                <p className="p-text-primary">{selectedCompany?.stateOfInc || ''}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Tax Classification</label>
                                <p className="p-text-primary">
                                    {selectedCompany?.taxClassification?.taxClassName || ''}
                                </p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Phone</label>
                                <p className="p-text-primary">{selectedCompany?.phoneNumber || ''}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Fax</label>
                                <p className="p-text-primary">{selectedCompany?.fax || ''}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Status</label>
                                <p className="p-text-primary">
                                    {selectedCompany?.status?.map((statusItem) => statusItem.statusCode).join(', ') || ''}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default EditProfileDetails;
