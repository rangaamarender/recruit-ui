import React, { useEffect, useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import companiesActionMenu from '../config/companiesActionMenu';
import companiesColumnConfig from '../config/companiesColumnConfig';
import companiesSelectedColumns from '../config/companiesSelectedColumns';
import handleCompanyAction from '../config/handleCompanyAction';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import CompaniesViewTabHeader from './CompaniesViewTabHeader';
import viewCompaniesTabs from '../config/viewCompaniesTabs';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCompaniesRequest,
    fetchCompanyRequest,
    paginationhCompanyRequest,
} from '../../../redux/actions/companiesActions';
import MainTableLoaderSkeleton from '../../../components/loaderSkeleton/MainTableLoaderSkeleton';
import DataExportModal from '../../../components/exportUtils/DataExportModal';

const InactiveCompaniesListTab = ({
    showExportModal,
    setShowExportModal,
    columnConfig,
    handleFilterClick,
    dataTableRef,
}) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const dispatch = useDispatch();
    const { companies, allCompanies, loading, error } = useSelector((state) => state.company);

    const total = allCompanies.totalElements;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);

    useEffect(() => {
        dispatch(fetchCompaniesRequest());
        dispatch(paginationhCompanyRequest());
    }, [dispatch]);

    const handleRowSelect = (selectedRow) => {
        setSidebarVisible(!sidebarVisible);
        // console.log("SelectedRow : ", selectedRow.data);
        dispatch(fetchCompanyRequest(selectedRow.data.organizationID));
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    if (loading) {
        return (
            <>
                <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={companies.length} />
            </>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!companies || companies.length === 0) {
        return <div>No companies found.</div>;
    }

    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };

    const data = [
        {
            name: 'QData',
            location: 'Hyderabad',
            orgRoles: 'Client',
            authSignataryFn: 'Anthony',
            authSignataryPhone: '9999999999',
            createdOn: '09-06-2023',
        },
    ];

    return (
        <>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={data}
                dataTableRef={dataTableRef}
            />
            <ViewerWithTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={viewCompaniesTabs}
                header={<CompaniesViewTabHeader />}
            />
            <CustomDataTable
                data={data}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={companiesActionMenu}
                columnsConfig={companiesColumnConfig}
                selectedColumns={companiesSelectedColumns}
                handleAction={handleCompanyAction}
                rows={10}
                paginator
                first={first}
                last={last}
                totalRecords={total}
                currentPageReportTemplate={`{first} to {last} of ${total}`}
                onPage={onCustomPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </>
    );
};

export default InactiveCompaniesListTab;