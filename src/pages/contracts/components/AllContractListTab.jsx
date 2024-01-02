import React, { useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import contractSelectedColumns from '../config/contractSelectedColumns';
import handlecontractActions from '../config/handleContractActions';
import viewContractTabs from '../config/viewContractTabs';
import contractActionMenu from '../config/contractActionMenu';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import contractHeaderViewerBtn from '../config/contractHeaderViewerBtn';
import contractHeaderViewerOptions from '../config/contractHeaderViewerOptions';
import { contractSummaryRequest, fetchContractsLoadRequest,  handlecontractActionMenu } from '../../../redux/actions/contractActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MainTableLoaderSkeleton from '../../../components/loaderSkeleton/MainTableLoaderSkeleton';

const AllContractListTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {

    const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const { contractSummary, loading, error,contractSummaryWithNavigation, contractSummarySelected } = useSelector((state) => state.contract);
    const total = contractSummaryWithNavigation.totalElements;
    console.log(contractSummary,contractSummaryWithNavigation,loading,error,selectedRowData,"contractSummary");
    useEffect(() => {
        dispatch(fetchContractsLoadRequest());
    }, [dispatch]);

    const handleRowSelect = (rowData) => {
        // console.log(event.data.clientName,"viewHeaders");s
        dispatch(contractSummaryRequest(rowData.data.contractID));
        setSelectedRowData(rowData);
        setSidebarVisible(!sidebarVisible);
    };

    const handleRowUnselect = (e) => {
        setSelectedRowData(null);
        setSidebarVisible(!sidebarVisible);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        dispatch(handlecontractActionMenu(''));
    };
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    if (total>0) {
        <>
            {/* <h6>Data  loading....</h6> */}
            <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={contractSummary.length} />
        </>
    }

    // if (loading) {
    //     return (
    //         <>
    //             <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={10}  />
    //         </>
    //     );
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (contracts && contracts.length <= 0) {
    //     return <div>Error</div>;
    // }
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };
    return (
        <div>
            <ViewerWithTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={viewContractTabs}
                header={
                    <HeaderViewerWithTabs
                        name={contractSummarySelected?.contractName || ''}
                        // employeeType={selectedRowData?.data?.contractTitle || ''}
                        // tags="Submitted"
                        showTag={false}
                        buttons={contractHeaderViewerBtn}
                        options={contractHeaderViewerOptions}
                        onClick={toggleSidebar}
                        buttonFlag={false}
                    />
                }
            />
            <CustomDataTable
                data={contractSummary}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={contractActionMenu}
                selectedColumns={contractSelectedColumns}
                handleAction={handlecontractActions}
                columnsConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                rows={10}
                paginator
                first={first}
                last={last}
                totalRecords={total}
                onPage={onCustomPage}
                currentPageReportTemplate={`{first} to {last} of ${total}`}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </div>
    );
};

export default AllContractListTab;
