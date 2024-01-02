import {
    cilAddressBook,
    cilBuilding,
    cilCalculator,
    cilCalendar,
    cilCreditCard,
    cilDescription,
    cilDollar,
    cilGroup,
    cilHome,
    cilSettings,
    cilTask,
    cilTextStrike,
    cilUser,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavGroup, CNavItem } from '@coreui/react';

import React from 'react';

const AdminNavbarMenu = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/recruit/dashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Widgets',
        to: '/recruit/',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Address Book',
        to: '/recruit/addressBook',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Resources',
        to: '/recruit/resources',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Companies',
        to: '/recruit/companies',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    },

    {
        component: CNavGroup,
        name: 'Users',
        to: '/recruit/',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Dashboard',
                to: '/recruit/',
            },
            {
                component: CNavItem,
                name: 'Users',
                to: '/recruit/',
            },
        ],
    },
    {
        component: CNavGroup,
        name: 'Contracts',
        to: '/recruit/contracts',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Contracts MSA',
                to: '/recruit/contracts',
            },
            {
                component: CNavItem,
                name: 'Contracts WO',
                to: '/recruit/contractListWoPage',
            },
        ],
    },
    {
        component: CNavItem,
        name: 'Timesheets',
        to: '/recruit/timesheets',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
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
    {
        component: CNavItem,
        name: 'Meetings',
        to: '/recruit/meetings',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Admin Setting',
        to: '/recruit/adminSetting',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
];

export default AdminNavbarMenu;
