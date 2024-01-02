import React, { useState, useEffect } from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
import CustomCalander from '../../../../components/controls/CustomCalender';
// import CustomInputMask from '../../../../components/controls/CustomInputMask';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { resourceStore } from '../../../../redux/actions/resourceActions';
import { fetchJobRequest, fetchWorkerTypesRequest, fetchWorkerAttributeRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const ResourceProfile = ({ control, errors, data, setValue, setSkip, formData }) => {
    let required = false;
    const dispatch = useDispatch();
    const workerTypes = useSelector((state) => state.adminRole.workerTypes);
    const deptListApi = useSelector((state) => state.adminRole.job);
    const workerAttributeList = useSelector((state) => state.adminRole.workerAttributes);

    // console.log("workerAttributeList", workerAttributeList);

    // State to keep track of selected attributes and values
    const [selectedAttributeValues, setSelectedAttributeValues] = useState([]);

    const handleAttributeChange = (attribute, selectedValue) => {
        const existingIndex = selectedAttributeValues.findIndex(
            (item) => item.attrDefId === attribute.attrDefId
        );

        if (existingIndex !== -1) {
            // Update existing entry
            const updatedValues = [...selectedAttributeValues];
            updatedValues[existingIndex] = {
                attrDefId: attribute.attrDefId,
                attrListValueID: selectedValue,
            };
            setSelectedAttributeValues(updatedValues);
        } else {
            // Add new entry
            setSelectedAttributeValues((prevSelected) => [
                ...prevSelected,
                {
                    attrDefId: attribute.attrDefId,
                    attrListValueID: selectedValue,
                },
            ]);
        }

        // You can perform additional actions here based on the selected values
        console.log('workerAttributes:', selectedAttributeValues);
        setValue('workerAttributes', selectedAttributeValues);
    };

    useEffect(() => {
        dispatch(fetchWorkerAttributeRequest());
    }, [dispatch]);

    const uniqueDepartments = Array.from(new Set(deptListApi.map((item) => item.deptName)));
    const departments = uniqueDepartments.map((deptName) => {
        // Assuming that each department object in deptListApi has a property named deptID
        const deptID = deptListApi.find((item) => item.deptName === deptName)?.deptID;

        return {
            value: deptID,
            label: deptName,
        };
    });

    const [selectedDepartment, setSelectedDepartment] = useState('');
    // const [selectedStatus, setSelectedStatus] = useState('');
    const [isBillable, setIsBillable] = useState(null); // false

    useEffect(() => {
        dispatch(fetchWorkerTypesRequest());
        dispatch(fetchJobRequest(isBillable !== undefined ? isBillable : false, selectedDepartment));
    }, [dispatch, isBillable, selectedDepartment]);

    useEffect(() => {
        dispatch(resourceStore(data));
    }, [dispatch, data.resourceType]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDepartmentChange = (selectedOption) => {
        setValue('deptID', selectedOption.value);
        setSelectedDepartment(selectedOption.value);
    };

    const handleStatusChange = (selectedOption) => {
        const isBillableValue = selectedOption.value === true;
        setValue('resourceStatus', isBillableValue);
        setIsBillable(isBillableValue);
        setSelectedDepartment('');
        setValue('deptID', '');
    };

    useEffect(() => {
        setSkip(false);
    }, [setSkip]);

    return (
        <>
            <div className="formgrid grid">
                <div className='col-12 text-center'>
                    <h5>Resource</h5>
                </div>
                <div className="col-12 md:col-4">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="givenName"
                        labelId="firstName.label"
                        defaultValue=""
                        placeholder="first name"
                        required={required}
                        requiredMsg="firstName.required"
                        autoFocus
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="middleName"
                        labelId="middleName.label"
                        defaultValue=""
                        placeholder="middle name"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="familyName"
                        labelId="lastName.label"
                        defaultValue=""
                        placeholder="last name"
                        required={required}
                        requiredMsg="lastName.required"
                    />
                </div>

                {/* <div className="col-12 md:col-4">
                    <CustomInputMask
                        control={control}
                        errors={errors}
                        name="ssnNumber"
                        labelId="ssnNumber.label"
                        defaultValue=""
                        mask="999-99-9999"
                        required={required}
                        requiredMsg="ssnNumber.required"
                    />
                </div> */}

                <div className="col-12 md:col-4">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="emailId"
                        labelId="primaryEmailId.label"
                        defaultValue=""
                        placeholder="admin@example.com"
                        required={required}
                        requiredMsg="primaryEmailId.required"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomInputPhoneNbr
                        control={control}
                        errors={errors}
                        name="dialNumber"
                        labelId="phoneNbr"
                        maskFormat="(999) 999-9999"
                        defaultValue=""
                        required={required}
                        requiredMsg="phoneNumber.required"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="resourceType"
                        labelId="resourceType.label"
                        defaultValue=""
                        options={workerTypes?.map(workerType => ({
                            value: workerType.workerTypeCode,
                            label: workerType.workerTypeName
                        }))}
                        required={required}
                        placeholder="Select Resource type"
                        requiredMsg="resourceType.required"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="resourceStatus"
                        labelId="resourceStatus.label"
                        defaultValue=""
                        options={[
                            { value: true, label: 'Billable' },
                            { value: false, label: 'Non-billable' },
                        ]}
                        required={required}
                        onChange={handleStatusChange}
                        placeholder="Select Resource status"
                        requiredMsg="resourceStatus.required"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="deptID"
                        labelId="resourceDepartment.label"
                        defaultValue=""
                        options={departments}
                        required={required}
                        onChange={handleDepartmentChange}
                        placeholder="Select Resource Department"
                        requiredMsg="resourceDepartment.required"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <CustomCalander
                        control={control}
                        errors={errors}
                        name="joiningDate"
                        labelId="startDate.label"
                        required={required}
                        requiredMsg="startDate.required"
                        // placeholder="yyyy-mm-dd"
                        placeholder="mm-dd-yyyy"
                        defaultValue=""
                        showIcon={true}
                    />
                </div>

                {/* default value */}
                {/* {workerAttributeList.map((attribute) => (
                    <div key={attribute.attrDefId} className="col-12 mb-3">
                        <div className='border rounded p-2'>
                            <label htmlFor={attribute.attrName} className='py-2'>
                                {attribute.attrDspName} {attribute.required && <span style={{ color: 'red' }}>*</span>}
                            </label>
                            <div className="p-grid p-dir-col border-top border-grey py-3 formgroup-inline gap-5">
                                {attribute.definedList ? (
                                    attribute.attrListValues.length > 2 ? (
                                        <Dropdown
                                            className='me-1'
                                            value={(selectedAttributeValues.find(item => item.attrDefId === attribute.attrDefId) || {}).attrListValueID || (attribute.required ? attribute.attrListValues[0].attrListValueID : null)}
                                            options={attribute.attrListValues.map(value => ({
                                                value: value.attrListValueID,
                                                label: value.value
                                            }))}
                                            onChange={(e) => handleAttributeChange(attribute, e.value)}
                                            placeholder={`Select ${attribute.attrDspName}`}
                                        />
                                    ) : (
                                        attribute.attrListValues.map((value, index) => (
                                            <div key={value.attrListValueID} className="p-field-radiobutton">
                                                <RadioButton
                                                    className='me-1'
                                                    inputId={value.attrListValueID}
                                                    name={attribute.attrName}
                                                    value={value.attrListValueID}
                                                    checked={(selectedAttributeValues.some(
                                                        (item) => item.attrDefId === attribute.attrDefId && item.attrListValueID === value.attrListValueID
                                                    ) || (attribute.required && index === 0))}
                                                    onChange={(e) => handleAttributeChange(attribute, e.value)}
                                                />
                                                <label htmlFor={value.attrListValueID}>{value.value}</label>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    // Use InputText if definedList is false
                                    <InputText
                                        id={attribute.attrName}
                                        name={attribute.attrName}
                                        value={selectedAttributeValues.find(item => item.attrDefId === attribute.attrDefId)?.attrListValueID || ''}
                                        onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                                        placeholder={`Enter ${attribute.attrDspName}`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))} */}

                {workerAttributeList.map((attribute) => (
                    <div key={attribute.attrDefId} className="col-12 mb-3">
                        <div className='border rounded p-2'>
                            <label htmlFor={attribute.attrName} className='py-2'>
                                {attribute.attrDspName} {attribute.required && <span style={{ color: 'red' }}>*</span>}
                            </label>
                            <div className="p-grid p-dir-col border-top border-grey py-3 formgroup-inline gap-5">
                                {attribute.definedList ? (
                                    attribute.attrListValues.length > 6 ? (
                                        <Dropdown
                                            className='me-1'
                                            value={selectedAttributeValues.find(item => item.attrDefId === attribute.attrDefId)?.attrListValueID || attribute.attrListValues[0].attrListValueID}
                                            options={attribute.attrListValues.map(value => ({
                                                value: value.attrListValueID,
                                                label: value.value
                                            }))}
                                            onChange={(e) => handleAttributeChange(attribute, e.value)}
                                            placeholder={`Select ${attribute.attrDspName}`}
                                        />
                                    ) : (
                                        attribute.attrListValues.map((value) => (
                                            <div key={value.attrListValueID} className="p-field-radiobutton">
                                                <RadioButton
                                                    className='me-1'
                                                    inputId={value.attrListValueID}
                                                    name={attribute.attrName}
                                                    value={value.attrListValueID}
                                                    checked={selectedAttributeValues.some(
                                                        (item) => item.attrDefId === attribute.attrDefId && item.attrListValueID === value.attrListValueID
                                                    )}
                                                    onChange={(e) => handleAttributeChange(attribute, e.value)}
                                                />
                                                <label htmlFor={value.attrListValueID}>{value.value}</label>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    // Use InputText if definedList is false
                                    <InputText
                                        id={attribute.attrName}
                                        name={attribute.attrName}
                                        value={selectedAttributeValues.find(item => item.attrDefId === attribute.attrDefId)?.attrListValueID || ''}
                                        onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                                        placeholder={`Enter ${attribute.attrDspName}`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
};

export default ResourceProfile;
