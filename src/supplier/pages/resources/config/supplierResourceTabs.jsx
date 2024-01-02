import React from 'react';
import AllResourcesListTab from '../components/AllResourcesListTab';
import BillableResourcesListTab from '../components/BillableResourcesListTab';
import NonBillableResourceListTab from '../components/NonBillableResourceListTab';
import BenchResourcesListTab from '../components/BenchResourcesListTab';
import TerminatedResourcesListTab from '../components/TerminatedResourcesListTab';

const supplierRsourceTabs = ({ columnConfig, resourceFilters, setResourceFilters, handleFilterClick, resourcedDataTableRef }) => [
    {
        id: 'allResourceList',
        label: 'All',

        content: (
            <AllResourcesListTab
                columnConfig={columnConfig}
                resourceFilters={resourceFilters}
                setResourceFilters={setResourceFilters}
                handleFilterClick={handleFilterClick}
                dataTableRef={resourcedDataTableRef}
            />
        ),
    },
    {
        id: 'BillableResourceList',
        label: 'Billable',

        content: <BillableResourcesListTab />,
    },
    {
        id: 'NonBillableResourceList',
        label: 'Non Billable',

        content: <NonBillableResourceListTab />,
    },
    {
        id: 'NonBillableResourceList',
        label: 'Bench',

        content: <BenchResourcesListTab />,
    },
    {
        id: 'NonBillableResourceList',
        label: 'Terminated',

        content: <TerminatedResourcesListTab />,
    },
];

export default resourceTabs;
