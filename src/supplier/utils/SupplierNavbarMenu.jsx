import {
    cilBriefcase,
    cilHome,
    cilDescription,
    cilClock,
    cilUser,
    cilGroup,
    cilBuilding,
   
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CNavItem } from '@coreui/react';
import React from 'react';

const SupplierNavbarMenu = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/recruit/supplierDashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Contracts',
        to: '/recruit/supplierContracts',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Compliance',
        to: '/recruit/supplierCompliance',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Resources',
        to: '/recruit/supplierResources',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
        role: 'user',
    },
   
    {
        component: CNavItem,
        name: 'Timesheets',
        to: '/recruit/supplierTimesheets',
        icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'General Profile',
        to: '/recruit/supplierProfile',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        role: 'user',
    },
   
    {
        component: CNavItem,
        name: 'User Management',
        to: '/recruit/supplierUserManagement',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
];

export default SupplierNavbarMenu;
