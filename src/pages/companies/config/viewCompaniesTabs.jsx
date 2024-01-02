import React from 'react';
import ProfileCompaniesTab from '../container/viewTabSteps/ProfileCompaniesTab';
import NoteCompaniesTab from '../container/viewTabSteps/NoteCompaniesTab';
import DocumentCompaniesTab from '../container/viewTabSteps/DocumentCompaniesTab';
import UsersCompaniesTab from '../container/viewTabSteps/UsersCompaniesTab';
import ResourceCompaniesTab from '../container/viewTabSteps/ResourceCompaniesTab';
import ContractCompaniesTab from '../container/viewTabSteps/ContractCompaniesTab';
import HistoryCompaniesTab from '../container/viewTabSteps/HistoryCompaniesTab';
import DeductionsCompaniesTab from '../container/viewTabSteps/DeductionsCompaniesTab';
import AddressCompaniesTab from '../container/viewTabSteps/AddressCompaniesTab';

const vieCompaniesTabs = [
    {
        id: 'profile',
        label: 'Profile',
        content: <ProfileCompaniesTab />,
    },
    {
        id: 'address',
        label: 'Address',
        content: <AddressCompaniesTab />,
    },
    {
        id: 'note',
        label: 'Note',
        content: <NoteCompaniesTab />,
    },
    {
        id: 'documents',
        label: 'Documents',
        content: <DocumentCompaniesTab />,
    },
    {
        id: 'users',
        label: 'Users',
        content: <UsersCompaniesTab />,
    },
    {
        id: 'resources',
        label: 'Resources',
        content: <ResourceCompaniesTab />,
    },
    {
        id: 'contract',
        label: 'Contract',
        content: <ContractCompaniesTab />,
    },
    {
        id: 'deductions',
        label: 'Deductions',
        content: <DeductionsCompaniesTab />
    },
    {
        id: 'history',
        label: 'History',
        content: <HistoryCompaniesTab />,
    },
];

export default vieCompaniesTabs;
