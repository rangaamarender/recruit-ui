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
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import React from 'react';

const NavBarMenu = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/recruit/dashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Widgets',
        to: '/recruit/widgets',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
        role: 'admin',
    },
    {
        component: CNavItem,
        name: 'Address Book',
        to: '/recruit/addressBook',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        role: 'admin',
    },
    {
        component: CNavItem,
        name: 'Resources',
        to: '/recruit/resources',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Companies',
        to: '/recruit/companies',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Contracts',
        to: '/recruit/contracts',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Timesheets',
        to: '/recruit/timesheets',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Create Invoices',
        to: '/recruit/createInvoices',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Invoice History',
        to: '/recruit/invoiceHistory',
        icon: <CIcon icon={cilTextStrike} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Payroll',
        to: '/recruit/payroll',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
        role: 'user',
    },
    {
        component: CNavItem,
        name: 'Meetings',
        to: '/recruit/meetings',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
        role: 'admin',
    },
    {
        component: CNavItem,
        name: 'Admin Setting',
        to: '/recruit/adminSetting',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        role: 'admin',
    },
];

const AdminNavBarMenu = [
    {
        component: CNavItem,
        name: 'Resources',
        to: '/recruit/resources',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
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

const UserNavBarMenu = [
    {
        component: CNavItem,
        name: 'Resources',
        to: '/recruit/resources',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
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

export default NavBarMenu;

