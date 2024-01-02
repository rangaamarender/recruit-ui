import React, { useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import createInvoicesColumnConfig from './../config/createInvoicesColumnConfig';
import createInvoicesSelectedColumns from '../config/createInvoicesSelectedColumns';
import handleCreateInvoicesAction from '../config/handleCreateInvoicesAction';
import createInvoicesActionMenu from '../config/createInvoicesActionMenu';
import { createInvoicesData } from '../config/createInvoicesData';
import Viewer from '../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
// import CreatedInvoiceView from '../container/viewTabSteps/CreatedInvoiceView';
import HoursStatusTableView from '../container/viewTabSteps/HoursStatusTableView';

const ToInvoiceListTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {
    // const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    // const { contracts, loading, error } = useSelector((state) => state.contract);

    // useEffect(() => {
    //     console.log('******** dispatching 111the event *************');
    //     dispatch(fetchContractsRequest());
    // }, [dispatch]);

    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
        setSidebarVisible(true);
    };

    const handleRowUnselect = (e) => {
        setSelectedRowData(null);
        setSidebarVisible(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    }

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (contracts && contracts.length <= 0) {
    //     return <div>Error</div>;
    // }

    const total = createInvoicesData.length;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);

    return (
        <>
            <div>
                <Viewer
                    visible={sidebarVisible}
                    onHide={toggleSidebar}
                    header={
                        <TitleHeaderOnly
                            onClick={handleOnHide}
                            title={"David Warner"}
                        />
                    }
                    contentComponent={<HoursStatusTableView rowData={selectedRowData} />}
                />

                <CustomDataTable
                    data={createInvoicesData}
                    //value={companies}
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    actionMenu={createInvoicesActionMenu}
                    columnsConfig={createInvoicesColumnConfig}
                    selectedColumns={createInvoicesSelectedColumns}
                    handleAction={handleCreateInvoicesAction}
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
                />
            </div>
        </>
    );
};

export default ToInvoiceListTab;
