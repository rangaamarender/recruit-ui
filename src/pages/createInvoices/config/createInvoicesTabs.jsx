import React from 'react';
import ToInvoiceListTab from '../components/ToInvoiceListTab';
import InvoiceGenerateListTab from '../components/InvoiceGenerateListTab';

const createInvoicesTabs = ({ columnConfig, handleFilterClick, dataTableRef }) => [
    {
        id: 'toInvoiceListTab',
        label: 'To Invoices',

        content: <ToInvoiceListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
            dataTableRef={dataTableRef} />,
    },
    {
        id: 'invoiceGenerateListTab',
        label: 'Generate',

        content: <InvoiceGenerateListTab
            columnConfig={columnConfig}
            handleFilterClick={handleFilterClick}
            dataTableRef={dataTableRef} />,
    }
];

export default createInvoicesTabs;
