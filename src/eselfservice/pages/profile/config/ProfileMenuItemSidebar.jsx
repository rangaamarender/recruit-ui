import React from 'react';
import {   RiFileList2Line, RiLockLine, RiUser2Line } from 'react-icons/ri';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import PersonalInformation from '../components/PersonalInformation';
import Notifications from '../components/Notifications';
import AccountActivity from '../components/AccountActivity';
import SecuritySettings from '../components/SecuritySettings';



const ProfileMenuItems = [
    {
        name: 'Personal Information',
        icon: <RiUser2Line />,
        component: <PersonalInformation />,
    },
    {
        name: 'Notification',
        icon: <MdOutlineNotificationsNone />,
        component: <Notifications />,
    },

    {
        name: 'Account Activity',
        icon: <RiFileList2Line />,
        component: <AccountActivity />
    },
    {
        name: 'Security Setting',
        icon: <RiLockLine />,
        component: <SecuritySettings />
    },

];

export default ProfileMenuItems