import React, { useState } from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import CustomCalender from '../../../../../components/controls/CustomCalender';
import { Button } from 'primereact/button';
import WizardComponent from '../../../../../components/viewers/WizardComponent';
import { createCompanyRequest } from '../../../../../redux/actions/companiesActions';
import { payloadDataForApi } from '../../../../companies/data/payloadDataForApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Editor } from 'primereact/editor';
import companiesWizardSteps from '../../../../companies/config/companiesWizardSteps';
import { fetchCompaniesActive } from '../../../../../redux/actions/contractActions';

function SelectOrganization({ control, errors, setSkip, setCompaniesDynamicData }) {
    const companies = useSelector((state) => state.contract.activeCompanies);

    const effectiveDate = companies ? companies[0]?.status[0]?.effectiveDate : null;
    const effectiveDateFormat = effectiveDate ? new Date(effectiveDate) : null;
    const dispatch = useDispatch();
    const orgDomains = useSelector((state) => state.company.domainData);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchCompaniesActive());
    }, [dispatch]);

    useEffect(() => {
        setSkip(false);
    }, [setSkip]);

    let required = true;

    const handleApiCall = async (formData) => {
        try {
            dispatch(createCompanyRequest({ formData }));
            console.log('formData', formData);
            setSidebarVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const addContractActionHandler = () => {
        setSidebarVisible(true);
    };

    const closeAddContractActionHandler = () => {
        setSidebarVisible(false);
    };

    return (
        <div className="flex-wrap gap-3 p-fluid pb-5">
            <h4 className="fw-bold text-center">Master Service Agreement (MSA)</h4>
            <div className="md:flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    autoFocus
                    name="organizationID"
                    labelId="selectedOrganization.label"
                    options={companies.map((c) => ({
                        value: c.organizationID,
                        label: c.name,
                    }))}
                    required={required}
                    requiredMsg="selectedOrganization.required"
                    placeholder="Selected MSA Type"
                    className="md:col-11"
                />
                <WizardComponent
                    title="Add Contract"
                    visible={sidebarVisible}
                    onHide={closeAddContractActionHandler}
                    steps={companiesWizardSteps}
                    setCompaniesDynamicData={setCompaniesDynamicData} // dynamically adding option to selected Org Name
                    validations={[null]}
                    handleApiCall={handleApiCall} // API call function to the WizardComponent
                    payloadDataForApi={(formData) => payloadDataForApi(formData, orgDomains)}
                />

                <div className="col-1">
                    <Button icon="pi pi-plus" className="mt-4" size="small" onClick={addContractActionHandler} />
                </div>
            </div>
            {effectiveDate ? <small className="text-danger">Active from {effectiveDate}</small> : ''}

            <CustomInputText
                control={control}
                errors={errors}
                name="contractName"
                labelId="selectedOrganizationTitle.label"
                defaultValue=""
                placeholder="---"
                className="md:col-12"
                required={required}
                requiredMsg="selectedOrganizationTitle.required"
            />
            <div className="col-12">
                <label htmlFor="description">Description</label>
                <Editor name="description" style={{ height: '65px' }} />
            </div>
            <div className="md:flex">
                <CustomCalender
                    control={control}
                    errors={errors}
                    minDate={effectiveDateFormat}
                    name="startDate"
                    labelId="selectedOrganizationStartDate.label"
                    requiredMsg="selectedOrganizationStartDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6  sm:col-12"
                />
                <CustomCalender
                    control={control}
                    errors={errors}
                    name="endDate"
                    labelId="selectedOrganizationEndDate.label"
                    defaultValue=""
                    showIcon={true}
                    dateFormat="yy-mm-dd"
                    className="md:col-6  sm:col-12"
                />
            </div>
        </div>
    );
}

export default SelectOrganization;
