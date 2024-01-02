import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceRequest, paginationhResourceRequest } from '../../../../redux/actions/resourceActions';
import { useEffect } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import resourceSelectedColumns from '../../../resources/config/resourceSelectedColumns';
import handleResourceAction from '../../../resources/config/handleResourceAction';
import resourceActionMenu from '../../../resources/config/resourceActionMenu';
import resourceColumnConfig from '../../../resources/config/resourceColumnConfig';
import { useState } from 'react';

const ContractResources = () => {
    const dispatch = useDispatch();
    const dataTableRef = useRef();
    const { resources, loading, error, allResources } = useSelector((state) => state.resource);
    // const [resourceTableData, setResourceTableData] = useState(resourceData);
    const total = allResources.totalElements;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    const [columnConfig, setColumnConfig] = useState(resourceColumnConfig);
    console.log(setColumnConfig);
    // const [sidebarVisible, setSidebarVisible] = useState(false);
    // const [handleFilterClick, setHandleFilterClick] = useState(false);
    useEffect(() => {

        dispatch(fetchResourceRequest());
        dispatch(paginationhResourceRequest());
    }, [dispatch]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (resources && resources.length <= 0) {
        return <div>No Results found</div>;
    }
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
        // setCurrentPage(event.page);
    }
    return (
        <>
            <div className="m-4">

                {/* <DataTable value={resources} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    tableStyle={{ minWidth: '50rem' }} size="small">
                    <Column field="workerCode" header="Resource ID"></Column>
                    <Column field="personLegal.familyName" header="Resource Title"></Column>
                    <Column field="workerType.workerTypeName" header="Expenses"></Column>
                    <Column field="workerType.workerTypeDesc" header="Vendor"></Column>
                    <Column field="workerStatus.effectiveDate" header="Join Date"></Column>
                    <Column field="workerStatus.status" header="Status"></Column>

                    <Column body={optionsColumn} ></Column>
                </DataTable> */}
                <CustomDataTable
                    data={resources}
                    actionMenu={resourceActionMenu}
                    columnsConfig={columnConfig}
                    selectedColumns={resourceSelectedColumns}
                    handleAction={handleResourceAction}
                    dataTableRef={dataTableRef}
                    rows={10}
                    paginator
                    first={first}
                    last={last}
                    totalRecords={total}
                    currentPageReportTemplate={`{first} to {last} of ${total}`}
                    onPage={onCustomPage}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </div>
        </>
    );
};

export default ContractResources;