import React, { useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import ViewerWithTabs from '../../../../components/viewers/ViewerWithTabs';
import contractSelectedColumns from '../../config/contractSelectedColumns';
import handlecontractActions from '../../config/handleContractActions';
import viewContractTabs from '../../config/viewContractTabs';
import contractActionMenu from '../../config/contractActionMenu';
import HeaderViewerWithTabs from '../../../../components/viewers/HeaderViewerWithTabs';
import contractHeaderViewerBtn from '../../config/contractHeaderViewerBtn';
import contractHeaderViewerOptions from '../../config/contractHeaderViewerOptions';
import { fetchContractsRequest, handlecontractActionMenu } from '../../../../redux/actions/contractActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import MainTableLoaderSkeleton from '../../../../components/loaderSkeleton/MainTableLoaderSkeleton';

const AllContractListWoTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {
    //        'contractName',
   // 'relatedOrg.name',
    const contracts = [
        {
            contractID: 'PR-AV009',
            contractName: 'Contract Title',
            "relatedOrg":{
                name:"End Client"
            },
            workOrders: '4',
            startDate: '10/08/2018',
            endDate: '18/08/2020',
            programeFee: '2.14%',
            discounts: '1.5%',
            lastUpdate: '05/132020',
        },
        {
            contractID: 'PR-AV010',
            contractName: 'Contract Titles',
            "relatedOrg":{
                name:"End Client"
            },
            workOrders: '6',
            startDate: '30/08/2021',
            endDate: '24/10/2023',
            programeFee: '2.14%',
            discounts: '1.5%',
            lastUpdate: '05/132020',
        },
    ];

    const dispatch = useDispatch();

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    // const { contracts, loading, error } = useSelector((state) => state.contract);

    useEffect(() => {
        console.log('******** dispatching 111the event *************');
        dispatch(fetchContractsRequest());
    }, [dispatch]);

    const handleRowSelect = (rowData) => {
        // console.log(event.data.clientName,"viewHeaders");s
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
    const total = 2;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    if (total>0) {
        <>
            {/* <h6>Data  loading....</h6> */}
            <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={contracts.length} />
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
                        name={selectedRowData?.data?.clientName || ''}
                        // employeeType={selectedRowData?.data?.workOrders || ''}
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
                data={contracts}
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

export default AllContractListWoTab;
