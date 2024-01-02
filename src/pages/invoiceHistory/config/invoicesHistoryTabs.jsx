import React from 'react';
import Invoiced from '../components/Invoiced';

const invoicesHistoryTabs = ({ columnConfig, handleFilterClick, dataTableRef }) => [
    {
        id: 'toInvoices',
        label: 'To Invoices',

        content: (
            <Invoiced columnConfig={columnConfig} handleFilterClick={handleFilterClick} dataTableRef={dataTableRef} />
        ),
    },
];

export default invoicesHistoryTabs;
