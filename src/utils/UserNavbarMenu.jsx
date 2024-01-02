import {
    cilBriefcase,
    // cilClipboard,
    cilCalculator,
    cilCreditCard,
    cilDescription,
    cilFile,
    cilEnvelopeOpen,
    cilHome,
    cilClock,
    cilUser,
    cilPeople,
    cilBank,
    cilDollar
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import React from 'react';

const UserNavbarMenu = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/recruit/employeeDashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Contracts',
        to: '/recruit/employeeContracts',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Timesheets',
        to: '/recruit/employeeTimesheets',
        icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Expenses',
        to: '/recruit/employeeExpenses',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Pay Stubs',
        to: '/recruit/employeePayStubs',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Payroll',
        to: '/recruit/employeePayroll',
        icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    },
    // {
    //     component: CNavItem,
    //     name: 'Immigration',
    //     to: '/recruit/employeeImmigration',
    //     icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    // },
    {
        component: CNavItem,
        name: 'Bank Information',
        to: '/recruit/employeeBankDetails',
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Documents',
        to: '/recruit/employeeDocuments',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Resumes',
        to: '/recruit/employeeResume',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Emergency Contact',
        to: '/recruit/employeeEmergencyContact',
        icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Dependents',
        to: '/recruit/employeeDependents',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Profile',
        to: '/recruit/employeeProfile',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
];

export default UserNavbarMenu;
