import React from 'react';
import AllCompaniesListTab from '../components/AllCompaniesListTab';
import ActiveCompaniesListTab from '../components/ActiveCompaniesListTab';
import InactiveCompaniesListTab from '../components/InactiveCompaniesListTab';

const companiesTabs = ({ showExportModal, setShowExportModal, columnConfig, handleFilterClick, dataTableRef, setColumnConfig }) => [
    {
        id: 'allCompaniesList', 
        label: 'All', 

        content: (
            <AllCompaniesListTab 
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />
        ),
    },
    {
        id: 'activeCompaniesList', 
        label: 'Active',  

        content: (
            <ActiveCompaniesListTab  
                columnConfig={columnConfig}
                handleFilerClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />
        ),
    },
    {
        id: 'inActiveCompaniesList', 
        label: 'Inactive', 

        content: (
            <InactiveCompaniesListTab 
                columnConfig={columnConfig}
                handleFilerClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />
        ),
    },
];

export default companiesTabs;