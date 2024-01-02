import React, { useState } from 'react';
// import plusIcon from '../../../../assets/images/plusIcon.svg';
import CustomDomainInput from '../../../../components/controls/CustomDomainInput';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';

function DomainManagement({ domains, onAddDomain, onEditDomain, onDeleteDomain, error, setError }) {
    const { control, formState: { errors }, } = useForm();

    const [newDomain, setNewDomain] = useState('');
    const [editedDomainIndex, setEditedDomainIndex] = useState(null);

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

    const isSubdomain = (newDomain, existingDomains) => {
        const normalizedNewDomain = normalizeDomain(newDomain);
        const topLevelDomain = getTopLevelDomain(normalizedNewDomain);
        return existingDomains.some((existingDomain) => {
            const normalizedExistingDomain = normalizeDomain(existingDomain);
            const existingTopLevelDomain = getTopLevelDomain(normalizedExistingDomain);
            return topLevelDomain === existingTopLevelDomain;
        });
    };

    const handleAddDomain = () => {
        if (!newDomain) {
            setError('Website (URL) cannot be empty.');
            return;
        }

        let lowercasedDomain = newDomain.toLowerCase();

        if (!isValidUrl(lowercasedDomain)) {
            setError('Invalid website URL format');
            return;
        }

        let modifiedDomain = lowercasedDomain;
        // Check if the URL starts with http:// or https://
        if (!modifiedDomain.startsWith('http://') && !modifiedDomain.startsWith('https://')) {
            modifiedDomain = `http://${modifiedDomain}`;
        }

        if (domains && domains.length && isSubdomain(modifiedDomain, domains)) {
            setError('Duplicate Website (URL) not allowed');
            return;
        }

        if (editedDomainIndex !== null) {
            onEditDomain(editedDomainIndex, modifiedDomain);
            setNewDomain('');
            setEditedDomainIndex(null);
        } else {
            onAddDomain(modifiedDomain);
            setNewDomain('');
        }
        setError(null);
    };

    const handleEditDomain = (index) => {
        setEditedDomainIndex(index);
        setNewDomain(domains[index]);
    };

    const handleDeleteDomain = (index) => {
        if (domains.length === 1) {
            setError('At least one domain must remain.');
        } else {
            onDeleteDomain(index);
            setError(null);
        }
    };

    const handleDomainInputChange = (e) => {
        setNewDomain(e.target.value);
    };

    const handleDomainInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddDomain();
        }
    };

    return (
        <div>
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
                    className='col-11'
                />

                {/* <img src={plusIcon} alt="plusIcon" className="cursor-pointer ms-2" onClick={handleAddDomain} /> */}
                <div className='col-1'>
                    <Button icon="pi pi-plus" severity='' size='small' onClick={handleAddDomain} />
                </div>
            </div>
            {error && <p className="text-danger margin-top-25 mt-0 ms-2">{error}</p>}

            <>
                {domains.length > 0 && (
                    <table className="table table-hover">
                        <thead className='table-light'>
                            <tr>
                                <th>Approved Domains</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.map((domain, index) => (
                                <tr key={index}>
                                    <td>{domain}</td>
                                    <td>
                                        <i className="pi pi-pencil cursor-pointer pe-4" onClick={() => handleEditDomain(index)} />
                                        <i className="pi pi-trash cursor-pointer" onClick={() => handleDeleteDomain(index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </>
        </div>
    );
}

export default DomainManagement;
