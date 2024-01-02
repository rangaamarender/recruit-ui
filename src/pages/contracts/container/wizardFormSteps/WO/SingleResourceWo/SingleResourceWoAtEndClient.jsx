import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import WizardComponent from '../../../../../../components/viewers/WizardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { createCompanyRequest, fetchCompaniesRequest } from '../../../../../../redux/actions/companiesActions';
import companiesWizardSteps from '../../../../../companies/config/companiesWizardSteps';
import { payloadDataForApi } from '../../../../../companies/data/payloadDataForApi';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';

function SingleResourceWoAtEndClient({ control, errors, setValue, setSkip }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarVisibleTable, setSidebarVisibleTable] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sample, setSample] = useState();
    const [isShown, setIsShown] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const { companies } = useSelector((state) => state.company);
    const orgDomains = useSelector((state) => state.company.domainData);
    const dispatch = useDispatch();

    // const options = [
    //     { value: 'option1', label: 'option1' },
    //     { value: 'option2', label: 'option2' },
    //     { value: 'option3', label: 'option3' },
    //     { value: 'option4', label: 'option4' },
    // ];
    //created dropdown newly added value
    useEffect(() => {
        setValue('selectedMsa', sample?.name);
        // if(isShown === true){
        //     setValue('selectedMsa', sample?.name);  
        // }
        // console.log("sample?.organizationID", sample?.phoneNumber)
        setValue(sample?.phoneNumber);
        setValue(sample?.taxClassification);
    }, [sample,setValue])
    let required = false;


    useEffect(() => {
        dispatch(fetchCompaniesRequest());

    }, [dispatch]);
    const addContractActionHandler = () => {
        setSidebarVisible(true);
    };
    const closeAddContractActionHandler = () => {
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
    const [products, setProducts] = useState([
        { id: 1, name: 'TEK systems', email: 'www.google.com', type: "+919774321899" },
    ]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [type, setType] = useState('');



    const optionType = [
        { value: '+919774321899', label: '+919774321899' }
    ];
    const optionAmount = [
        { value: "www.google.com", label: "www.google.com" },
    ];
    const handleDelete = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    };
    const cancelEdit = () => {
        setNewName('');
        setNewEmail('');
        setType('');
        setSidebarVisibleTable(false);
    };
    const Actions = (rowData) => {
        return (
            <div>
                <>
                    <Sidebar
                        visible={sidebarVisibleTable}
                        blockScroll={true}
                        className='w-75' position='right'
                        onHide={() => setSidebarVisibleTable(false)}
                    >
                        <div className="h-screen">
                            <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                                <div className="flex justify-content-between align-items-center company-secondary-background p-3 mb-3">
                                    <div className="d-flex align-items-center">
                                        <i
                                            className="pi pi-arrow-left mx-2 p-2 rounded-circle company-primary-background text-50 cursor-pointer"
                                            onClick={() => setSidebarVisibleTable(false)}
                                        />
                                        <div className="fs-4 fw-bold">Edit Work Order  Details</div></div>
                                    <div>
                                        <i className="pi pi-times p-1 border-circle cursor-pointer" onClick={() => setSidebarVisibleTable(false)} />
                                    </div>

                                </div>
                            </div>
                            <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                                {/* <CustomInputText
                             control={control}
                             errors={errors}
                             name="newName"
                             labelId="email"
                             className="md:col-6 sm:col-12" */}
                                <InputText
                                    placeholder="organization Name"
                                    className='col-12 mb-2'
                                    value={newName} onChange={(e) => setNewName(e.target.value)}

                                />
                                <Dropdown className='col-12 mb-2'
                                    value={newEmail}
                                    options={optionAmount}
                                    onChange={(e) => setNewEmail(e.value)}
                                    placeholder="Web Address"
                                />
                                <Dropdown
                                    value={type}
                                    options={optionType}
                                    onChange={(e) => setType(e.value)}
                                    placeholder="Phone Number"
                                    className='col-12'
                                />
                            </div>
                            <div className="fixed bottom-0 company-secondary-background w-75 h-custom-10">
                                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                                    <Button
                                        label="CANCEL"
                                        onClick={cancelEdit}
                                        icon="pi pi-times"
                                        className="company-secondary-btn"
                                    />
                                    <Button
                                        label='UPDATE'
                                        // onClick={handleSubmit(handleEditRows)}
                                        onClick={handleEditRows}
                                        icon="pi pi-check"
                                        className="company-primary-btn"
                                    />
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                    {/* <i
                        className="pi pi-pencil mr-3"
                        onClick={() => {
                            setSelectedProduct(rowData);
                            setNewName(rowData.name); // Set the current name in the input field
                            setNewEmail(rowData.email);
                            setType(rowData.type);
                            setSidebarVisibleTable(true);
                        }}
                    /> */}
                </>
                <i
                    className="pi pi-trash "
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        );
    };
    const handleEditRows = () => {
        if (selectedProduct && newName.trim() && newEmail.trim() && type.trim()) {
            const updatedProducts = products.map((product) =>
                product.id === selectedProduct.id ? { ...product, name: newName, email: newEmail, type: type } : product
            );
            setProducts(updatedProducts);
        }
        // Reset state variables
        setNewName('');
        setNewEmail(' ');
        setType('');
        // reset();
        setSelectedProduct(null);
        setSidebarVisibleTable(false);
    };

    // dropdown linked data
    const handleDropdownChange = (selectedValue) => {
        const selectedCompany = companies.find((company) => company.name === selectedValue);
        setSelectedCompany(selectedCompany || null);
    };
    // const isShowned = selectedCompany !== null; // check and remove
    // console.log(selectedCompany.authSignataryPhone,"selectedComapny");
    useEffect(() => {
        setSkip(true);
    }, [setSkip]);
    return (
        <>
            <div className="p-fluid mb-6">
                <h4 className='fw-bold text-center'>Add end Client if Applicable</h4>
                <h6 className='fw-bold text-center'>Principal Work location for the worker</h6>
                <div className="flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        autoFocus
                        name="selectedMsa"
                        labelId="endClientName.label"
                        options={companies.map((c) => ({
                            value: c.name,
                            label: c.name
                        }))}
                        required={required}
                        requiredMsg="endClientName.required"
                        placeholder="Selected MSA Type"
                        onChange={(e) => { handleDropdownChange(e.value); setValue('selectedMsa', e.value); setIsShown(false) }} // dropdown linked data
                        className="md:col-11"
                    // value={selectedCompany ? selectedCompany.name : null} // never take value
                    />
                    <WizardComponent
                        title="Add Contract"
                        visible={sidebarVisible}
                        onHide={closeAddContractActionHandler}
                        steps={companiesWizardSteps}
                        setSample={setSample}
                        setIsShown={setIsShown}
                        validations={[
                            null
                        ]}
                        handleApiCall={handleApiCall} // API call function to the WizardComponent
                        payloadDataForApi={(formData) => payloadDataForApi(formData, orgDomains)}
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
                                <div className="col-sm-12 col-md-4 mb-1">
                                    <label className='p-text-primary'>EndClient Name</label>
                                    <h6 className='p-text-secondary'>{selectedCompany?.name}</h6>
                                </div>
                                {/* <div className="col-sm-12 col-md-4 mb-1">
                     <label>EIN</label>
                     <h6>{selectedCompany?.authSignataryPhone}</h6>
                        </div> */}
                                {/* <div className="col-sm-12 col-md-4 mb-1">
                     <label>Web Address</label>
                     <h6>{selectedCompany?.authSignataryPhone}</h6>
                        </div> */}
                                <div className="col-sm-12 col-md-4 mb-1">
                                    <label className='p-text-primary'>Email ID</label>
                                    <h6 className='p-text-secondary'>{selectedCompany?.authSignataryEmail}</h6>
                                </div>
                                <div className="col-sm-12 col-md-4 mb-1">
                                    <label className='p-text-primary'>Phone Number</label>
                                    <h6 className='p-text-secondary'>{selectedCompany?.authSignataryPhone}</h6>
                                </div>
                                {/* <div className="col-sm-12 col-md-4 mb-1">
                     <label>Fax</label>
                     <h6>{selectedCompany?.authSignataryPhone}</h6>
                        </div> */}
                            </>
                        ) : (
                            <>
                                <div className="col-sm-12 col-md-4 mb-1">
                                    <label className='p-text-primary'>EndClient Name</label>
                                    <h6 className='p-text-secondary'>{sample?.name}</h6>
                                </div>
                                {/* <div className="col-sm-12 col-md-4 mb-1">
                            <label>EIN</label>
                            <h6>{sample?.phoneNumber}</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Web Address</label>
                            <h6>{sample?.phoneNumber}</h6>
                        </div> */}
                                <div className="col-sm-12 col-md-4 mb-1">
                                    <label className='p-text-primary'>Tax Classification</label>
                                    <h6 className='p-text-secondary'>{sample?.taxClassification}</h6>
                                </div>
                                <div className="col-sm-12 col-md-4 mb-1">
                                    <label className='p-text-primary'>Phone Number</label>
                                    <h6 className='p-text-secondary'>{sample?.phoneNumber}</h6>
                                </div>
                                {/* <div className="col-sm-12 col-md-4 mb-1">
                            <label>Fax</label>
                            <h6>{sample?.phoneNumber}</h6>
                        </div> */}
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
            <div className='mb-4'>
                <h4 className='fw-bold
                '>Organizations</h4>
                <DataTable
                    value={products}
                    editMode="row"
                    dataKey="id"
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column field="name" header="Organization Name"
                    />
                    <Column field="email" header="Web Address"
                    />
                    <Column field="type" header="Phone Number"
                    />
                    <Column body={Actions} header="Actions" ></Column>
                </DataTable>
            </div>
        </>
    );
}

export default SingleResourceWoAtEndClient;