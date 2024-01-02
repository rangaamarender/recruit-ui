import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomCalender from '../../../../components/controls/CustomCalender';
// import CustomInputMask from '../../../../components/controls/CustomInputMask';
import CustomInputText from '../../../../components/controls/CustomInputText';
// import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { updateResourceRequest } from '../../../../redux/actions/resourceActions';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { fetchWorkerAttributeRequest, fetchWorkerTypesRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
// import { values } from 'lodash';
// import _ from 'lodash';

function EditResourceProfile({ active, setActive }) {

    const { control, setValue, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const workerAttributeList = useSelector((state) => state.adminRole.workerAttributes);
    const workerTypes = useSelector((state) => state.adminRole.workerTypes);
    const selectedResource = useSelector((state) => state.resource.selectedResource);
    console.log("workerAttributeListEdit", workerAttributeList);

    useEffect(() => {
        dispatch(fetchWorkerAttributeRequest());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchWorkerTypesRequest());
    }, [dispatch]);


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

    // const onSubmit = (data) => {
    //     const updatedData = {
    //         personLegal: { ...selectedResource?.personLegal, ...data.personLegal },
    //     };
    //     const updatedResource = { ...selectedResource, ...updatedData };
    //     dispatch(updateResourceRequest(selectedResource.workerID, updatedResource));
    //     setIsEdit(false);
    //     setActive('all');
    // }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const createPayload = (data) => {
        return {
            workerID: selectedResource.workerID,
            joiningDate: formatDate(data.joiningDate),
            workerType: {
                workerTypeCode: selectedResource.workerType.workerTypeCode,
                name: selectedResource.workerType.name,
            },
            personLegal: {
                personLegalID: selectedResource.personLegal.personLegalID,
                givenName: data.personLegal.givenName,
                middleName: data.personLegal.middleName,
                familyName: data.personLegal.familyName,
                preferredName: data.personLegal.preferredName,
                birthDate: formatDate(data.personLegal.birthDate),
                gender: data.personLegal.gender,
                maritalStatus: data.personLegal.maritalStatus,
                primaryContactDetails: selectedResource.personLegal.primaryContactDetails.map((contact) => ({
                    personLegalContactID: contact.personLegalContactID,
                    contactType: contact.contactType,
                    phoneNumber: {
                        countryDialingCode: contact.phoneNumber.countryDialingCode,
                        areaDialingCode: contact.phoneNumber.areaDialingCode,
                        dialNumber: contact.phoneNumber.dialNumber,
                        phoneExtension: contact.phoneNumber.phoneExtension,
                        access: contact.phoneNumber.access,
                    },
                    emailId: contact.emailId,
                    startDate: formatDate(contact.startDate),
                    endDate: contact.endDate,
                })),
            },
            workerStatus: selectedResource.workerStatus.map((status) => ({
                workerStatusId: status.workerStatusId,
                status: status.status,
                effectiveDate: formatDate(status.effectiveDate),
                workerInActiveStatusCode: status.workerInActiveStatusCode,
                reasonCode: status.reasonCode,
                statusReasonText: status.statusReasonText,
            })),
            workerAttributes: selectedAttributeValues,
            // Add other properties as needed
        };
    };

    const onSubmit = (data) => {
        const updatedData = createPayload(data);
        dispatch(updateResourceRequest(selectedResource.workerID, updatedData));

        setIsEdit(false);
        setActive('all');
    };


    const handleEdit = () => {
        setIsEdit(true);
        setActive('editResourceProfile');
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive("all");
    };

    return (
        <>
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Employee Profile</div>
                {!isEdit && (
                    <div className="d-flex justify-content-between align-items-center gap-3">
                        <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                    </div>
                )}
            </div>

            {isEdit ? (
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                    <div className="formgrid grid p-3">
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.givenName"
                                labelId="firstName.label"
                                placeholder="first name"
                                defaultValue={selectedResource?.personLegal.givenName}
                                autoFocus
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.familyName"
                                labelId="lastName.label"
                                placeholder="last name"
                                defaultValue={selectedResource?.personLegal.familyName}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.preferredName"
                                labelId="displayName.label"
                                placeholder="Display name"
                                defaultValue={selectedResource?.personLegal.preferredName}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            {selectedResource?.personLegal?.primaryContactDetails.map((item, index) => (
                                <CustomInputText
                                    key={index}
                                    control={control}
                                    errors={errors}
                                    name={`personLegal.primaryContactDetails[${index}].emailId`}
                                    labelId={`primaryEmailId.label`}
                                    placeholder="admin@example.com"
                                    defaultValue={item.emailId}
                                // disabled
                                />
                            ))}
                        </div>

                        <div className="col-12 md:col-6">
                            <CustomCalender
                                control={control}
                                errors={errors}
                                name="personLegal.birthDate"
                                labelId="DOB"
                                showIcon={true}
                                // placeholder="YYYY-MM-DD"
                                placeholder="mm-dd-yyyy"
                                defaultValue={selectedResource?.personLegal?.birthDate}
                            />
                        </div>

                        <div className="col-12 md:col-6">
                            <CustomCalender
                                control={control}
                                errors={errors}
                                name="joiningDate"
                                labelId="startDate.label"
                                showIcon={true}
                                // placeholder="YYYY-MM-DD"
                                placeholder="mm-dd-yyyy"
                                defaultValue={selectedResource?.joiningDate || null}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.gender"
                                labelId="gender.label"
                                placeholder="Gender"
                                defaultValue={selectedResource?.personLegal?.gender || null}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="personLegal.maritalStatus"
                                labelId="maritalStatus.label"
                                placeholder="Marital Status"
                                defaultValue={selectedResource?.personLegal?.maritalStatus || null}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="resourceType"
                                labelId="resourceType.label"
                                defaultValue={selectedResource?.workerType?.name}
                                options={workerTypes?.map(workerType => ({
                                    value: workerType.workerTypeCode,
                                    label: workerType.workerTypeName
                                }))}
                                placeholder="Select Resource type"
                            // disabled
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="status"
                                labelId="status.label"
                                defaultValue={selectedResource?.workerStatus?.map((item) =>
                                    item.status).join(', ') || ''}
                                options={selectedResource?.workerStatus?.map((item) => ({
                                    value: item.status,
                                    label: item.status,
                                }))}
                                placeholder="Select Status"
                            // disabled
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="personLegal.invoiceCycle"
                                labelId="invoiceCycle.label"
                                defaultValue={selectedResource?.invoiceCycle || null}
                                options={[
                                    { value: 'Option 1', label: 'Option 1' },
                                    { value: 'Option 2', label: 'Option 2' },  
                                ]}
                                placeholder="Select Invoice cycle"
                            />
                        </div>

                        <>
                            {selectedResource?.workerAttributes.map((attr) => {
                                const attributeDefinition = workerAttributeList.find(
                                    (definition) => definition.attrDefId === attr.workerAttributeDef?.attrDefId
                                );

                                if (!attributeDefinition) {
                                    // Skip attributes that don't have a matching definition
                                    return null;
                                }

                                const attributeName = attributeDefinition?.attrDspName || attr.workerAttributeDef?.attrDefId;
                                const attributeListValues = attributeDefinition?.attrListValues;
                                const selectedValue = attr.attrValue;

                                return (
                                    <div key={attributeDefinition.attrDefId} className="col-12 mb-3">
                                        <div className='border rounded p-2'>
                                            <label htmlFor={attr.workerAttributeDef.attrName} className='py-2'>
                                                {attributeName} {attr.required && <span style={{ color: 'red' }}>*</span>}
                                            </label>
                                            <div className="p-grid p-dir-col border-top border-grey py-3 formgroup-inline gap-5">
                                                {attributeDefinition.definedList ? (
                                                    attributeListValues.length > 6 ? (
                                                        <Dropdown
                                                            className='me-1'
                                                            value={selectedValue || ''}
                                                            options={attributeListValues.map(value => ({
                                                                value: value.attrListValueID,
                                                                label: value.value
                                                            }))}
                                                            onChange={(e) => handleAttributeChange(attr, e.value)}
                                                            placeholder={`Select ${attributeName}`}
                                                        />
                                                    ) : (
                                                        attributeListValues.map((value) => (
                                                            <div key={value.attrListValueID} className="p-field-radiobutton">
                                                                <RadioButton
                                                                    className='me-1'
                                                                    inputId={value.attrListValueID}
                                                                    name={attr.workerAttributeDef.attrName}
                                                                    value={value.attrListValueID}
                                                                    checked={selectedValue === value.attrListValueID}
                                                                    onChange={(e) => handleAttributeChange(attr, e.value)}
                                                                />
                                                                <label htmlFor={value.attrListValueID}>{value.value}</label>
                                                            </div>
                                                        ))
                                                    )
                                                ) : (
                                                    <InputText
                                                        id={attr.workerAttributeDef.attrName}
                                                        name={attr.workerAttributeDef.attrName}
                                                        value={selectedValue || ''}
                                                        onChange={(e) => handleAttributeChange(attr, e.target.value)}
                                                        placeholder={`Enter ${attributeName}`}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>

                        <div className="col-12 mb-6"></div>
                        <div className="p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                            <Button type="button" severity="secondary" label="Cancel" size="small" className="" onClick={handleCancelEdit} />
                            <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    <div className="formgrid grid m-2">
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>First Name</label>
                            <p className="p-text-primary">{selectedResource?.personLegal?.givenName || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Last Name</label>
                            <p className="p-text-primary">{selectedResource?.personLegal?.familyName || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Display Name</label>
                            <p className="p-text-primary">{selectedResource?.personLegal?.preferredName || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Primary Email ID</label>
                            <p className="p-text-primary">
                                {selectedResource?.personLegal?.primaryContactDetails.map((item, index) => (
                                    <p key={index} className="p-text-primary">{item.emailId}</p>
                                ))}
                            </p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>DOB</label>
                            <p className="p-text-primary">{selectedResource?.personLegal?.birthDate || '--'}</p>
                        </div>

                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Start Date</label>
                            <p className="p-text-primary">{selectedResource?.joiningDate || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Gender</label>
                            <p className="p-text-primary">{selectedResource?.personLegal?.gender || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Marital Status</label>
                            <p className="p-text-primary">{selectedResource?.personLegal?.maritalStatus || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Employee Type</label>
                            <p className="p-text-primary">{selectedResource?.workerType?.name || '--'}</p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Current Status</label>
                            <p className="p-text-primary">
                                {selectedResource?.workerStatus?.map((item) => item.status).join(', ') || ''}
                            </p>
                        </div>
                        <div className="col-12 md:col-6">
                            <label className='p-text-secondary'>Invoice Cycle</label>
                            <p className="p-text-primary">{selectedResource?.invoiceCycle || '--'}</p>
                        </div>

                        {selectedResource?.workerAttributes?.map((attr, index) => {
                            const attributeDefinition = workerAttributeList.find(
                                (definition) => definition.attrDefId === attr.workerAttributeDef?.attrDefId
                            );

                            const attributeName = attributeDefinition?.attrDspName || attr.workerAttributeDef?.attrDefId;
                            const attributeListValues = attributeDefinition?.attrListValues;

                            if (attributeDefinition && attributeListValues) {
                                const attributeValue = attributeListValues.find((value) => value.attrListValueID === attr.attrValue)?.value || attr.attrValue;

                                return (
                                    <div key={index} className="col-12 md:col-6">
                                        <label className='p-text-secondary'>{attributeName}</label>
                                        <p className="p-text-primary">{attributeValue}</p>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}

                    </div>
                </>
            )}
        </>
    );
}

export default EditResourceProfile;
