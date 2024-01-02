import React from 'react';
import { RiBuildingLine, RiUser2Line, RiBriefcaseLine } from 'react-icons/ri';
import { HiOutlineDocumentDuplicate, HiOutlineUsers } from 'react-icons/hi';
import { FaFileInvoice } from 'react-icons/fa';
import { BiDollarCircle } from 'react-icons/bi';
import { BsGift } from 'react-icons/bs';
import { AiOutlineClockCircle, AiOutlineMail } from 'react-icons/ai';
import AdminResource from '../components/AdminResource';
import AdminContract from '../components/AdminContract';
import AdminTimeSheet from '../components/AdminTimeSheet';
import AdminCompanies from '../components/AdminCompanies';
import AdminDocument from '../components/AdminDocument';
import AdminInvoice from '../components/AdminInvoice';
import AdminPayroll from '../components/AdminPayroll';
import AdminBenefit from '../components/AdminBenefit';
import AdminMailTemplate from '../components/AdminMailTemplate';
import AdminPayment from '../components/AdminPayment';
import AdminUsers from '../components/AdminUsers';

const AdminMenuItem = [
    {
        name: 'Company Settings',
        icon: <RiBuildingLine />,
        component: <AdminCompanies />,
    },
    {
        name: 'Users Settings',
        icon: <HiOutlineUsers />,
        component: <AdminUsers />,
    },
    {
        name: 'Resource Settings',
        icon: <RiUser2Line />,
        component: <AdminResource />,
    },
    {
        name: 'Contract Settings',
        icon: <RiBriefcaseLine />,
        component: <AdminContract />,
    },

    {
        name: 'Timesheet Settings',
        icon: <AiOutlineClockCircle />,
        component: <AdminTimeSheet />,
    },
    {
        name: 'Document Setting',
        icon: <HiOutlineDocumentDuplicate />,
        component: <AdminDocument />,
    },
    {
        name: 'Invoice Settings',
        icon: <FaFileInvoice />,
        component: <AdminInvoice />,
    },
    {
        name: 'Payroll Settings',
        icon: <BiDollarCircle />,
        component: <AdminPayroll />,
    },
    {
        name: 'Benefits Settings',
        icon: <BsGift />,
        component: <AdminBenefit />,
    },
    {
        name: 'Mail Templates',
        icon: <AiOutlineMail />,
        component: <AdminMailTemplate />,
    },
    {
        name: 'Payment Settings',
        icon: <BiDollarCircle />,
        component: <AdminPayment />,
    },
];

export default AdminMenuItem;
