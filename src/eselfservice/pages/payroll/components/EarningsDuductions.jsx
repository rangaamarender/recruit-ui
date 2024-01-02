import React, { useRef } from 'react';
import { useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import { earningsDecuctionData } from '../config/earningsDecuctionData';
import earningsDecuctionsSelectedColumns from '../config/earningsDecuctionsSelectedColumns';
import earningsDecuctionActionMenu from '../config/earningsDecuctionActionMenu';
import handleEarningsDecuctionActions from '../config/handleEarningsDecuctionActions';
import earningsDecuctionColumnConfig from '../config/earningsDecuctionColumnConfig';
import { Button } from 'primereact/button';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import AddEarningsDecuctions from '../container/AddEarningsDecuctions';
import EarningsDeductionsViewTab from '../container/EarningsDeductionsViewTab';
// import resourceActionMenu from '../../../../resources/config/resourceActionMenu';

const EarningsDuductions = () => {
  
    const dataTableRef = useRef();

    const total = earningsDecuctionData.length;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    // const [columnConfig, setColumnConfig] = useState(earningsDecuctionColumnConfig);

    const columnConfig = earningsDecuctionColumnConfig
    const [addSidebarVisible, setAddSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [viewSidebarVisible, setViewSidebarVisible] = useState(false);

    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
        setViewSidebarVisible(true);
    };

    const handleRowUnselect = () => {
        setSelectedRowData(null);
        setViewSidebarVisible(false);
    };

    const toggleSidebar = () => {
        setViewSidebarVisible(!viewSidebarVisible);
    };
  
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
        // setCurrentPage(event.page);
    }

    const addEarningsDeductionsActionHandler = () => {
        setAddSidebarVisible(true);
    };

    // const closeEarningsDeductionsActionHandler = () => {
    //     setAddSidebarVisible(false);
    // };

    const handleOnHide = () => {
        setAddSidebarVisible(false);
    };

    return (
        <>
            <div>
            <Viewer
                    visible={addSidebarVisible}
                    onHide={handleOnHide}
                    header={
                        <TitleHeaderOnly
                            onClick={handleOnHide}
                            title={"Add Earnings & Deductions"}
                        />
                    }
                    contentComponent={<AddEarningsDecuctions  addSidebarVisible={setAddSidebarVisible}/>}
                />
           
                <div className="company-main-text fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
                    <h5>Earnings & Deductions</h5>
                    <div>
                        <Button
                            label="ADD"
                            severity="primary"
                            icon="pi pi-plus"
                            onClick={addEarningsDeductionsActionHandler}
                            size="small"
                        />
                    </div>
                </div>
               

                <Viewer
                visible={viewSidebarVisible}
                onHide={toggleSidebar}
                header={
                    <TitleHeaderOnly
                    onClick={toggleSidebar}
                    title={"Earnings & Deductions"}
                    />
                }
                contentComponent={<EarningsDeductionsViewTab rowData={selectedRowData} />}
            />

                <CustomDataTable
                    data={earningsDecuctionData}
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    actionMenu={earningsDecuctionActionMenu}
                    columnsConfig={columnConfig}
                    selectedColumns={earningsDecuctionsSelectedColumns}
                    handleAction={handleEarningsDecuctionActions}
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

export default EarningsDuductions;