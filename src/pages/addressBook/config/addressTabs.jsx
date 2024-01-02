import React from 'react';
import AllAddressListTab from '../components/AllAddressListTab';
import ActiveAddressListTab from '../components/ActiveAddressListTab';
import InActiveAddressListTab from '../components/InActiveAddressListTab';
import ExpiringAddressListTab from '../components/ExpiringAddressListTab';

const addressTabs = [
    {
        id: 'allUsersList',
        label: 'All',

        content: <AllAddressListTab />,
    },
    {
        id: 'activeUsersList',
        label: 'Active',

        content: <ActiveAddressListTab />,
    },
    {
        id: 'inactiveUsersList',
        label: 'Inactive',

        content: <InActiveAddressListTab />,
    },
    {
        id: 'expiringUsersList',
        label: 'Expiring',

        content: <ExpiringAddressListTab />,
    },
];

export default addressTabs;
