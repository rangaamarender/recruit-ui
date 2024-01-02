import React, { useEffect, useState, useRef } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import resourceSelectedColumns from '../config/resourceSelectedColumns';
import handleResourceAction from '../config/handleResourceAction';
import resourceActionMenu from '../config/resourceActionMenu';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import { resourceViewTabs } from '../config/viewResourceTab';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchResourceByIdRequest,
    fetchResourceRequest,
    paginationhResourceRequest,
} from '../../../redux/actions/resourceActions';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import resourceHeaderViewerBtn from '../config/resourceHeaderViewerBtn';
import resourceHeaderViewerOptions from '../config/resourceHeaderViewerOptions';
import MainTableLoaderSkeleton from '../../../components/loaderSkeleton/MainTableLoaderSkeleton';
import { Toast } from 'primereact/toast';
import DataExportModal from '../../../components/exportUtils/DataExportModal';

const AllResourcesListTab = ({
    columnConfig,
    handleFilterClick,
    dataTableRef,
    showExportModal,
    setShowExportModal,
}) => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { resources, loading, error, allResources, selectedResource } = useSelector((state) => state.resource);
    console.log(selectedResource, "selectedResource1111");

    console.log(resources, "resources")

    const total = allResources.totalElements;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);

    useEffect(() => {
        dispatch(fetchResourceRequest());
        dispatch(paginationhResourceRequest());
    }, [dispatch]);

    const handleRowSelect = (selectedRow) => {
        console.log('SelectedRow : ', selectedRow.data);
        dispatch(fetchResourceByIdRequest(selectedRow.data.workerID));
        setSidebarVisible(true);
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(false);
    };

    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
        // setCurrentPage(event.page);
    };
    useEffect(() => {
        if (loading) {
            <>
                <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={resources.length} />
            </>
        }

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${error}`, sticky: false },);
        }

        if (!resources || resources.length === 0) {
            toast.current.show({ severity: 'warn', summary: 'Error', life: '500', detail: 'No data available. Wait Data Loading...' });
        }

    }, [loading, resources, error]); // eslint-disable-line react-hooks/exhaustive-deps

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (resources && resources.length <= 0) {
    //     return <div>Error</div>;
    // }


    const resourceModifiedData = resources.map(item => {
        // const authSignataryFn = (item.orgCommunications[0]?.authSignataryFn) || '';
        // const authSignataryLn = (item.orgCommunications[0]?.authSignataryLn) || '';
        // // Check if orgAddresses is an array and has at least one element 
        // const orgAddresses = item.orgAddresses || [];
        // const firstOrgAddress = orgAddresses[0] || {};
        // const city = firstOrgAddress.city || '';
        // const state = firstOrgAddress.state || '';
        return {
            ...item,
            // concatenatedName: `${authSignataryFn} ${authSignataryLn}`,
            // location: city && state ? `${city} ${state}` : '',
        };
    });

    // const exportResourceModifiedData = resources.map(item => {
    //     const country = item.country || {};
    //     const authSignataryFn = item.orgCommunications?.[0]?.authSignataryFn || '';
    //     const authSignataryLn = item.orgCommunications?.[0]?.authSignataryLn || '';
    //     const authSignataryPhone = item.orgCommunications?.[0]?.authSignataryPhone || '';
    //     const authSignataryEmail = item.orgCommunications?.[0]?.authSignataryEmail || '';

    //     // Check if orgAddresses is an array and has at least one element 
    //     const orgAddresses = item.orgAddresses || [];
    //     const firstOrgAddress = orgAddresses[0] || {};
    //     const city = firstOrgAddress.city || '';
    //     const state = firstOrgAddress.state || '';
    //     const countryName = country.countryName || '';
    //     const status = item.status?.[0] || {};
    //     const effectiveDate = status.effectiveDate || '';
    //     const statusCode = status.statusCode || '';

    //     return {
    //         ...item,
    //         concatenatedName: `${authSignataryFn} ${authSignataryLn}`,
    //         location: city && state ? `${city} ${state}` : '',
    //         "orgCommunications.0.authSignataryPhone": authSignataryPhone,
    //         "orgCommunications.0.authSignataryEmail": authSignataryEmail,
    //         "status.0.effectiveDate": effectiveDate,
    //         "status.0.statusCode": statusCode,
    //         "country.countryName": countryName,
    //     };
    // });

    return (
        <div>
            <Toast ref={toast} />
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={"exportResourceModifiedData"}
                dataTableRef={dataTableRef}
            />
            <ViewerWithTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={resourceViewTabs}
                header={
                    <HeaderViewerWithTabs
                        // name="Abhishek Pulluri"
                        // name={"selectedResource?.personLegal.givenName"}
                        // employeeType={"selectedResource?.workerType.workerTypeCode"}
                        // tags={"selectedResource?.workerStatus[0].status"}
                        name="Abhishek Pulluri"
                        employeeType={""}
                        tags={""}
                        showTag={false}
                        buttons={resourceHeaderViewerBtn}
                        options={resourceHeaderViewerOptions}
                        buttonFlag={false}
                        onClick={toggleSidebar}
                    />
                }
            />

            <CustomDataTable
                data={resourceModifiedData}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={resourceActionMenu}
                columnsConfig={columnConfig}
                selectedColumns={resourceSelectedColumns}
                handleAction={handleResourceAction}
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
            // sortable
            />
        </div>
    );
};

export default AllResourcesListTab;
