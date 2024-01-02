import React, { useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import createInvoicesColumnConfig from '../config/createInvoicesColumnConfig';
import createInvoicesSelectedColumns from '../config/createInvoicesSelectedColumns';
// import handleCreateInvoicesAction from '../config/handleCreateInvoicesAction';
import generateInvoicesActionMenu from '../config/generateInvoicesActionMenu';
import Viewer from '../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
// import CreatedInvoiceView from '../container/viewTabSteps/CreatedInvoiceView';
import HoursStatusTableView from '../container/viewTabSteps/HoursStatusTableView';
import { generateInvoicesData } from '../config/generateInvoicesData';
import handleGenerateInvoicesAction from '../config/handleGenerateInvoicesAction';
import { handleActions } from '../../../redux/actions/companiesActions';
import { useDispatch, useSelector } from 'react-redux';
import CreateInvoiceStep from '../container/wizardFormSteps/CreateInvoiceStep';
// import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
// import companiesHeaderViewerBtn from '../../companies/config/companiesHeaderViewerBtn';
// import companiesHeaderViewerOptions from '../../companies/config/companiesHeaderViewerOptions';

const InvoiceGenerateListTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {
    const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const action = useSelector((state) => state.company.action);

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
        dispatch(handleActions('viewInvoice'))
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

    const total = generateInvoicesData.length;
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

                    // header={<HeaderViewerWithTabs
                    //     name={"Employee Name"}
                    //     buttons={companiesHeaderViewerBtn}
                    //     options={companiesHeaderViewerOptions}
                    //     buttonFlag={false} 
                    // />}

                    contentComponent={action==='viewInvoice'?<HoursStatusTableView rowData={selectedRowData} />:<CreateInvoiceStep/>}
                />

                <CustomDataTable
                    data={generateInvoicesData}
                    //value={companies}
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    actionMenu={generateInvoicesActionMenu}
                    columnsConfig={createInvoicesColumnConfig}
                    selectedColumns={createInvoicesSelectedColumns}
                    handleAction={handleGenerateInvoicesAction}
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

export default InvoiceGenerateListTab;
