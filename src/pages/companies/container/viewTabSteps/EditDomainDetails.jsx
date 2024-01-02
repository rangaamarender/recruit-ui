import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeDomainData } from '../../../../redux/actions/companiesActions';
import { useEffect } from 'react';
import EditDomainManagement from './EditDomainManagement';

const EditDomainDetails = ({ setActive, active }) => {
    const dispatch = useDispatch();
    const orgDomains = useSelector((state) => state.company.domainData);

    const [approvedDomains, setApprovedDomains] = useState(orgDomains);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(storeDomainData(approvedDomains));
    }, [approvedDomains, dispatch]);

    // Function to handle adding, editing, and deleting domains
    const handleAddDomain = (newDomain) => {
        setApprovedDomains([...approvedDomains, newDomain]);
    };

    const handleEditDomain = (index, newDomain) => {
        const updatedDomains = [...approvedDomains];
        updatedDomains[index] = newDomain;
        setApprovedDomains(updatedDomains);
    };

    const handleDeleteDomain = (index) => {
        if (approvedDomains.length === 1) {
            setError('At least one domain must remain.');
        } else {
            const updatedDomains = approvedDomains.filter((_, i) => i !== index);
            setApprovedDomains(updatedDomains);
            setError(null);
        }
    };

    const selectedCompany = useSelector((state) => state.company.selectedCompany);

    return (
        <>
            <div className="formgrid grid p-3 m-0">
                <div class="col-12">
                    <EditDomainManagement
                        domains={selectedCompany?.orgDomains}
                        test="domain.domain"
                        onAddDomain={handleAddDomain}
                        onEditDomain={handleEditDomain}
                        onDeleteDomain={handleDeleteDomain}
                        error={error}
                        setError={setError}
                        setActive={setActive}
                        active={active}
                    />
                </div>
            </div>
        </>
    );
};

export default EditDomainDetails;
