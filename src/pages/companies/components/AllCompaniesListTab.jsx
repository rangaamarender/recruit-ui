import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import {
    fetchCompaniesRequest,
    fetchCompanyRequest,
    handleActions,
    paginationhCompanyRequest,
} from '../../../redux/actions/companiesActions';
import companiesActionMenu from '../config/companiesActionMenu';
import companiesHeaderViewerBtn from '../config/companiesHeaderViewerBtn';
import companiesHeaderViewerOptions from '../config/companiesHeaderViewerOptions';
import companiesSelectedColumns from '../config/companiesSelectedColumns';
import handleCompanyAction from '../config/handleCompanyAction';
import viewCompaniesTabs from '../config/viewCompaniesTabs';
import { Toast } from 'primereact/toast';
import MainTableLoaderSkeleton from '../../../components/loaderSkeleton/MainTableLoaderSkeleton';
import DataExportModal from '../../../components/exportUtils/DataExportModal';

const AllCompaniesListTab = ({
    columnConfig,
    handleFilterClick,
    dataTableRef,
    showExportModal,
    setShowExportModal,
}) => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { companies, loading, error, selectedCompany, allCompanies } = useSelector((state) => state.company);

    const total = allCompanies.totalElements;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);

    const companiesModifiedData = companies.map(item => {
        const authSignataryFn = (item.orgCommunications[0]?.authSignataryFn) || '';
        const authSignataryLn = (item.orgCommunications[0]?.authSignataryLn) || '';
        // Check if orgAddresses is an array and has at least one element 
        const orgAddresses = item.orgAddresses || [];
        const firstOrgAddress = orgAddresses[0] || {};
        const city = firstOrgAddress.city || '';
        const state = firstOrgAddress.state || '';
        return {
            ...item,
            concatenatedName: `${authSignataryFn} ${authSignataryLn}`,
            location: city && state ? `${city} ${state}` : '',
        };
    });

    const exportCompaniesModifiedData = companies.map(item => {
        const country = item.country || {};
        const authSignataryFn = item.orgCommunications?.[0]?.authSignataryFn || '';
        const authSignataryLn = item.orgCommunications?.[0]?.authSignataryLn || '';
        const authSignataryPhone = item.orgCommunications?.[0]?.authSignataryPhone || '';
        const authSignataryEmail = item.orgCommunications?.[0]?.authSignataryEmail || '';

        // Check if orgAddresses is an array and has at least one element 
        const orgAddresses = item.orgAddresses || [];
        const firstOrgAddress = orgAddresses[0] || {};
        const city = firstOrgAddress.city || '';
        const state = firstOrgAddress.state || '';
        const countryName = country.countryName || '';
        const status = item.status?.[0] || {};
        const effectiveDate = status.effectiveDate || '';
        const statusCode = status.statusCode || '';

        return {
            ...item,
            concatenatedName: `${authSignataryFn} ${authSignataryLn}`,
            location: city && state ? `${city} ${state}` : '',
            "orgCommunications.0.authSignataryPhone": authSignataryPhone,
            "orgCommunications.0.authSignataryEmail": authSignataryEmail,
            "status.0.effectiveDate": effectiveDate,
            "status.0.statusCode": statusCode,
            "country.countryName": countryName,
        };
    });

    useEffect(() => {
        dispatch(paginationhCompanyRequest());
        dispatch(fetchCompaniesRequest());
    }, [dispatch]);

    const handleRowSelect = (selectedRow) => {
        // console.log('selectedRow : ', selectedRow.data);
        dispatch(fetchCompanyRequest(selectedRow.data.organizationID));
        setSidebarVisible(true);
    };

    const handleRowUnselect = () => {
        setSidebarVisible(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        dispatch(handleActions(''));
    };

    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };

    useEffect(() => {
        if (loading) {
            <>
                {/* <h6>Data  loading....</h6> */}
                <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={companies.length} />
            </>
        }

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${error}`, sticky: false },);
        }

        if (!companies || companies.length === 0) {
            toast.current.show({ severity: 'warn', summary: 'Error', life: '500', detail: 'No data available. Wait Data Loading...' });
        }
    }, [loading, companies, error]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <Toast ref={toast} />
            <div>
                <DataExportModal
                    showExportModal={showExportModal}
                    setShowExportModal={setShowExportModal}
                    columnConfig={columnConfig}
                    exportData={exportCompaniesModifiedData}
                    dataTableRef={dataTableRef}
                />
                <ViewerWithTabs
                    visible={sidebarVisible}
                    onHide={toggleSidebar}
                    tabs={viewCompaniesTabs}
                    header={
                        <HeaderViewerWithTabs
                            name={selectedCompany?.name}
                            employeeType={""}
                            tags={selectedCompany?.status?.[0]?.statusCode || ''}
                            showTag={true}
                            buttons={companiesHeaderViewerBtn}
                            options={companiesHeaderViewerOptions}
                            buttonFlag={false} // if we want to ellipsis make it false
                            onClick={toggleSidebar}
                        />
                    }
                />
                <CustomDataTable
                    // data={companies}
                    data={companiesModifiedData}
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    actionMenu={companiesActionMenu}
                    columnsConfig={columnConfig}
                    selectedColumns={companiesSelectedColumns}
                    handleAction={handleCompanyAction}
                    columnConfig={columnConfig}
                    handleFilterClick={handleFilterClick}
                    dataTableRef={dataTableRef}
                    rows={10}
                    paginator
                    first={first}
                    last={last}
                    totalRecords={total}
                    currentPageReportTemplate={`{first} to {last} of ${total}`}
                    onPage={onCustomPage}
                    rowsPerPageOptions={[10, 25, 50]}
                    sortable
                />
            </div>
        </>
    );
};

export default AllCompaniesListTab;
