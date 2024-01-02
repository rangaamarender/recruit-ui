import {
    cilAddressBook,
    cilDescription,
    cilDollar,
    cilHome,
    cilTextStrike,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import React from 'react';

const ManagerNavbarMenu = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/recruit/dashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Address Book',
        to: '/recruit/addressBook',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Create Invoices',
        to: '/recruit/createInvoices',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Invoice History',
        to: '/recruit/invoiceHistory',
        icon: <CIcon icon={cilTextStrike} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Payroll',
        to: '/recruit/payroll',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    },
];

export default ManagerNavbarMenu;

