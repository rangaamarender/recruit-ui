import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import WizardComponent from '../../../../components/viewers/WizardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { createCompanyRequest, fetchCompaniesRequest } from '../../../../redux/actions/companiesActions';
import companiesWizardSteps from '../../../companies/config/companiesWizardSteps';
import { payloadDataForApi } from '../../../companies/data/payloadDataForApi';

function SingleResourceWoAtEndClient({ control, errors, setValue, setSkip, companiesDynamicData }) {
    let required = true;

    const [sidebarVisible, setSidebarVisible] = useState(false);
    // const [sample, setSample] = useState();
    const [isShown, setIsShown] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const { companies } = useSelector((state) => state.company);
    // const orgDomains = useSelector((state) => state.company.domainData);
    const domainAvailable = useSelector((state) => state.company.domainAvailable);

    const dispatch = useDispatch();

    useEffect(() => {
        setSkip(true)
    })

    //created dropdown newly added value
    useEffect(() => {
        setValue('organizationID', companiesDynamicData?.name);
        // if(isShown === true){
        //     setValue('selectedMsa', sample?.name);  
        // }
        // console.log("sample?.organizationID", sample?.phoneNumber)
        setValue(companiesDynamicData?.phoneNumber);
        setValue(companiesDynamicData?.taxClassification);
    }, [companiesDynamicData, setValue])

    // console.log("companiesDynamicData", companiesDynamicData);

    useEffect(() => {
        dispatch(fetchCompaniesRequest());
    }, [dispatch]);

    const addContractActionHandler = () => {
        setSidebarVisible(true);
    };

    const closeAddCompaniesActionHandler = () => {
        setSidebarVisible(false);
    };

    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            dispatch(createCompanyRequest({ formData }));
            console.log("formData", formData)
            // setCompanies(formData);
            // setIsCompanies(true)
            setSidebarVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // dropdown linked data
    const handleDropdownChange = (selectedValue) => {
        const selectedCompany = companies.find((company) => company.organizationID === selectedValue);
        setSelectedCompany(selectedCompany || null);
        console.log("selectedCompany", selectedCompany);

    };

    return (
        <>
            <div className="p-fluid mb-6">
                <h3 className=' text-center'>Supplier</h3>
                <p className=' text-center'>Select Supplier or Create Supplier</p>
                <div className="flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        autoFocus
                        name="organizationID"
                        labelId="selectSupplier.label"
                        options={companies.map((c) => ({
                            value: c.organizationID,
                            label: c.name
                        }))}
                        required={required}
                        requiredMsg="selectSupplier.required"
                        placeholder="Selected Supplier"
                        onChange={(e) => {
                            handleDropdownChange(e.value);
                            setValue('organizationID', e.value);
                            setIsShown(false)
                        }} // dropdown linked data
                        className="md:col-11"
                    // value={selectedCompany ? selectedCompany.name : null} // never take value
                    />
                    <WizardComponent
                        title="Create Supplier"
                        visible={sidebarVisible}
                        onHide={closeAddCompaniesActionHandler}
                        steps={companiesWizardSteps}
                        // setSample={setSample}
                        // setIsShown={setIsShown}
                        handleApiCall={handleApiCall} // API call function to the WizardComponent
                        // payloadDataForApi={(formData) => payloadDataForApi(formData, orgDomains)}
                        // validations={[
                        //     async () => {
                        //         // Custom validation for step 0
                        //         if (!orgDomains || orgDomains.length === 0) {
                        //             return 'Need atleast one Domain.';
                        //         }
                        //         return null; // Validation passed
                        //     },
                        //     // Add more validation functions for other steps as needed
                        //     null, // No custom validation for step 2
                        //     null,
                        //     null,
                        //     // ...
                        // ]}
                        payloadDataForApi={(formData) => payloadDataForApi(formData)} // pass the data payloadDataForApi function
                        validations={[
                            async () => {
                                // Custom validation for step 0
                                if (domainAvailable === true) {
                                    return 'This Company already Registered';
                                }
                                return null; // Validation passed
                            },
                            null,
                            null,
                            null,
                        ]}
                    />
                    <div className='col-1'>
                        <Button icon="pi pi-plus" className="mt-4" size='small' onClick={addContractActionHandler} />
                    </div>
                </div>
                <div className="container mt-2">
                    <div className="row mb-2">
                        {/* p-text-secondary for lavel , p-text-primary */}
                        {isShown === false ? (
                            <>
                                <div className="formgrid grid">
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Supplier Name</label>
                                        <p className="p-text-primary">{selectedCompany?.name}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">EIN</label>
                                        <p className="p-text-primary">{selectedCompany?.taxId}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Web Address</label>
                                        <p className="p-text-primary">{selectedCompany?.orgDomains[0]?.domain}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Email ID</label>
                                        <p className="p-text-primary">{selectedCompany?.orgCommunications[0]?.authSignataryEmail}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Phone Number</label>
                                        <p className="p-text-primary">{selectedCompany?.phoneNumber}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Fax</label>
                                        <p className="p-text-primary">{selectedCompany?.fax}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="formgrid grid">
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Supplier Name</label>
                                        <p className="p-text-primary">{companiesDynamicData?.name}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">EIN</label>
                                        <p className="p-text-primary">{companiesDynamicData?.taxId}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Web Address</label>
                                        <p className="p-text-primary">{companiesDynamicData?.orgDomains[0]?.domain}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Email ID</label>
                                        <p className="p-text-primary">{companiesDynamicData?.orgCommunications[0]?.authSignataryEmail}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Phone Number</label>
                                        <p className="p-text-primary">{companiesDynamicData?.phoneNumber}</p>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <label className="p-text-secondary">Fax</label>
                                        <p className="p-text-primary">{companiesDynamicData?.fax}</p>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* {isShowned && isShown === true ?(
                            <h6>{selectedCompany.name}</h6>
                        ) : (
                           null
                        )} */}
                    </div>
                </div>
            </div>

        </>
    );
}

export default SingleResourceWoAtEndClient;