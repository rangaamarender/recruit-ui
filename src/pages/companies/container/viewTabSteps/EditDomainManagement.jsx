import React, { useState, useRef } from 'react';
import CustomDomainInput from '../../../../components/controls/CustomDomainInput';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { deleteDomain, updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast'
// import _ from 'lodash';

function EditDomainManagement({ domains, onEditDomain, onDeleteDomain, active, error, setError, setActive }) {
    const { control, formState: { errors }, } = useForm();
    const toast = useRef(null);

    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [domainData, setDomainData] = useState('');
    const [newDomain, setNewDomain] = useState('');
    const [editedDomainIndex, setEditedDomainIndex] = useState(null);
    const action = useSelector((state) => state.company.action);

    const [mode, setMode] = useState('');

    const normalizeDomain = (domain) => {
        // Ensure the domain is lowercase and remove "http://" or "https://"
        const lowerDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
        return `https://www.${lowerDomain}`;
    };

    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/(www\.)?)?([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
        return urlPattern.test(url);
    };

    const getTopLevelDomain = (domain) => {
        // Split the domain by periods and get the last two parts
        const parts = domain.split('.');
        const topLevelDomain = parts.slice(-2).join('.');
        return topLevelDomain;
    };

    const isDuplicateDomain = (newDomain, existingDomains) => {
        const normalizedNewDomain = normalizeDomain(newDomain);
        const topLevelDomain = getTopLevelDomain(normalizedNewDomain);
        return existingDomains.some((existingDomain) => {
            const normalizedExistingDomain = normalizeDomain(existingDomain.domain);
            const existingTopLevelDomain = getTopLevelDomain(normalizedExistingDomain);
            return topLevelDomain === existingTopLevelDomain || normalizedExistingDomain === normalizedNewDomain;
        });
    };

    const handleAddDomain = () => {
        if (!newDomain) {
            // setError('Website (URL) cannot be empty.');
            toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Website (URL) cannot be empty.', sticky: false });
            return;
        }

        let modifiedDomain = newDomain.toLowerCase(); // Convert to lowercase

        if (!modifiedDomain.startsWith('http://') && !modifiedDomain.startsWith('https://')) {
            // Add the default "http://" prefix
            modifiedDomain = `http://${modifiedDomain}`;
        }

        if (!isValidUrl(modifiedDomain)) {
            // setError('Invalid website URL format');
            toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Invalid website URL format.', sticky: false });
            return;
        }

        if (editedDomainIndex !== null) {
            onEditDomain(editedDomainIndex, modifiedDomain);
            setNewDomain('');
            setEditedDomainIndex(null);
        } else {
            if (isDuplicateDomain(modifiedDomain, domains)) {
                // setError('Duplicate Domain not allowed');
                toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Duplicate Domain not allowed.', sticky: false });
                return;
            }

            // Extract necessary fields from selectedCompany
            const { organizationID, orgDomains } = selectedCompany;

            const domain = modifiedDomain;
            const data1 = { domain };
            setNewDomain('');

            // Append the new domain to the existing array
            const updatedDomains = [...orgDomains, data1];

            const updatedCompany = { organizationID, orgDomains: updatedDomains }
            dispatch(updateCompanyRequest(organizationID, updatedCompany))
        }
        setError(null);
        setNewDomain('');
        setMode('')
        setActive('all');

        // toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Domain Added Successfully' })
    };

    const handleEditDomain = (index) => {
        setEditedDomainIndex(index);
        setNewDomain(domains[index].domain.toLowerCase());
        setId(domains[index].domainID);
        setMode('edit');
        setActive('editDomainDetails')
    };

    // const handleEditDomain = (index) => {
    //     const editedDomain = domains[index].domain.toLowerCase();

    //     // Assuming authSignataryEmail is part of the selectedCompany's orgCommunications
    //     const authSignataryEmail = selectedCompany.orgCommunications[0]?.authSignataryEmail;

    //     // Check if the edited domain matches authSignataryEmail
    //     if (editedDomain === authSignataryEmail) {
    //         // Perform your actions for editing the domain here
    //         setEditedDomainIndex(index);
    //         setNewDomain(domains[index].domain.toLowerCase());
    //         setId(domains[index].domainID);
    //         setMode('edit');
    //         setActive('editDomainDetails');
    //     } else {
    //         // Show a warning or error message indicating that the domain doesn't match authSignataryEmail
    //         toast.current.show({
    //             severity: 'error',
    //             summary: 'Warning',
    //             detail: 'You are not allowed to edit this domain.',
    //             sticky: false
    //         });
    //     }
    // };

    // const handleEditDomain = (index) => {
    //     const editedDomain = extractDomain(domains[index].domain.toLowerCase());

    //     const authSignataryEmail = selectedCompany.orgCommunications[0]?.authSignataryEmail;
    //     const authSignataryDomain = extractDomain(authSignataryEmail);

    //     if (editedDomain === authSignataryDomain) {
    //         setEditedDomainIndex(index);
    //         setNewDomain(domains[index].domain.toLowerCase());
    //         setId(domains[index].domainID);
    //         setMode('edit');
    //         setActive('editDomainDetails');
    //     } else {
    //         toast.current.show({
    //             severity: 'error',
    //             summary: 'Warning',
    //             detail: 'You are not allowed to edit this domain.',
    //             sticky: false
    //         });
    //     }
    // };

    // Function to extract domain from email
    // const extractDomain = (email) => {
    //     const atIndex = email.indexOf('@');
    //     return atIndex !== -1 ? email.slice(atIndex + 1) : email;
    // };


    const handleDomainInputChange = (e) => {
        setNewDomain(e.target.value);
        setDomainData(e.target.value);
        setError('')
    };

    const handleDomainInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (mode === 'add') {
                handleAddDomain();
            } else if (mode === 'edit') {
                handleUpdate();
            }
        }
    };

    const selectedCompany = useSelector((state) => state.company.selectedCompany);

    const handleUpdate = () => {
        if (!domainData) {
            // setError('Duplicate or Website (URL) cannot be empty.');
            toast.current.show({ severity: 'error', summary: 'Warning', detail: 'Duplicate or Website (URL) cannot be empty.', sticky: false });
            return;
        }

        let modifiedDomain = domainData.toLowerCase();

        if (!modifiedDomain.startsWith('http://') && !modifiedDomain.startsWith('https://')) {
            // Add the default "http://" prefix
            modifiedDomain = `http://${modifiedDomain}`;
        }

        if (!isValidUrl(modifiedDomain)) {
            // setError('Invalid website URL format');
            toast.current.show({ severity: 'error', summary: 'Warning', detail: `Invalid website URL format`, sticky: false });

            return;
        }

        if (isDuplicateDomain(modifiedDomain, domains)) {
            // setError('Duplicate Domain not allowed');
            toast.current.show({ severity: 'error', summary: 'Warning', detail: `Duplicate Domain not allowed`, sticky: false });

            return;
        }

        const updatedDomains = [...domains];
        updatedDomains[editedDomainIndex] = { domain: modifiedDomain, domainID: id };

        // Extract necessary fields from selectedCompany
        const { organizationID } = selectedCompany;
        const updatedCompany = { organizationID, orgDomains: updatedDomains }
        dispatch(updateCompanyRequest(organizationID, updatedCompany));

        // Clear the input fields and reset the mode
        setNewDomain('');
        setEditedDomainIndex(null);
        setError(null);
        setMode('');
        setActive('all');

        // toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Domain Updated Successfully' })
    };

    const handleDeleteDomain = (index) => {
        if (domains.length === 1) {
            // setError('At least one domain must remain.');
            // toast.current.show({ severity: 'warn', summary: 'Success Message', detail: 'Domain Deleted Successfully' })
            toast.current.show({ severity: 'error', summary: 'Warning', detail: `You can't Delete All Domains, At least one domain must remain.`, sticky: false });

        } else {
            const updatedDomains = [...domains];
            // Remove the deleted domain from the array
            updatedDomains.splice(index, 1);

            // Dispatch the action to delete the domain
            dispatch(deleteDomain(selectedCompany.organizationID, index));

            // Update the company in the local state without the deleted domain
            const updatedCompany = {
                organizationID: selectedCompany.organizationID,
                orgDomains: updatedDomains,
            };

            dispatch(updateCompanyRequest(selectedCompany.organizationID, updatedCompany));
            setError(null);

            // toast.current.show({ severity: 'success', summary: 'Success', detail: 'Domain Deleted Successfully' })
        }
    };

    return (
        <>
            <div>
                <Toast ref={toast} />

                <div className="company-main-text  fw-bold border-bottom d-flex align-items-center justify-content-between mb-2">
                    <div className='name-view-heading mb-3'>Domains</div>
                    <div className=''>
                        {mode === '' && action !== 'view' && <Button
                            size='small'
                            icon='pi pi-plus fs-5'
                            severity='primary'
                            title='Add New Domain'
                            className="ms-3 mb-3"
                            onClick={() => { setMode('add'); setNewDomain(''); setActive('editDomainDetails') }} />
                        }
                    </div>
                </div>

                {mode === 'add' && (
                    <div className="flex align-items-center">
                        <CustomDomainInput
                            control={control}
                            errors={errors}
                            name="domain"
                            labelId="domain"
                            value={newDomain}
                            onChange={handleDomainInputChange}
                            onKeyPress={handleDomainInputKeyPress}
                            placeholder="http://www.example.com"
                            required={true}
                            defaultValue=""
                            requiredMsg="domain.required"
                            className="md:col-9 me-1"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <Button
                                className=""
                                icon='pi pi-plus'
                                title='Add Domain'
                                size='small'
                                severity='primary'
                                type="button"
                                onClick={handleAddDomain}
                            />
                            <Button
                                className=""
                                icon='pi pi-times'
                                severity="secondary"
                                title='Cancel'
                                size='small'
                                type="button"
                                onClick={() => { setMode(''); setError(''); setActive('all') }}
                            />
                        </div>
                    </div>
                )}
                {mode === 'edit' && (
                    <div className="flex align-items-center">
                        <CustomDomainInput
                            control={control}
                            errors={errors}
                            name="domain"
                            labelId="domain"
                            value={newDomain}
                            onChange={handleDomainInputChange}
                            onKeyPress={handleDomainInputKeyPress}
                            placeholder="http://www.example.com"
                            required={true}
                            defaultValue=""
                            requiredMsg="domain.required"
                            className="md:col-9 me-1"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <Button
                                className=""
                                icon='pi pi-check'
                                title='Update Domain'
                                size='small'
                                severity='primary'
                                type="button"
                                onClick={handleUpdate}
                            />
                            <Button
                                className=""
                                icon='pi pi-times'
                                size='small'
                                severity="secondary"
                                title='Cancel'
                                type="button"
                                onClick={() => { setMode(''); setError(''); setActive('all') }}
                            />
                        </div>
                    </div>
                )}

                {error && <p className="text-danger margin-top-25 mb-3 ms-2">{error}</p>}

                <>
                    {domains?.length > 0 && (
                        <table className="table table-hover">
                            <thead className='table-light'>
                                <tr>
                                    <th>Approved Domains</th>
                                    {
                                        active === 'all' && action !== 'view' &&
                                        <th>Actions</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {domains.map((domain, index) => (
                                    <tr key={index}>
                                        <td>{domain.domain}</td>
                                        {active === 'all' && action !== 'view' &&
                                            <td>
                                                <i className="pi pi-pencil cursor-pointer pe-4" title='Edit Domain' onClick={() => handleEditDomain(index)} />
                                                <i className="pi pi-trash cursor-pointer" title='Delete Domain' onClick={() => handleDeleteDomain(index)} />
                                            </td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            </div>
        </>
    );
}

export default EditDomainManagement;
