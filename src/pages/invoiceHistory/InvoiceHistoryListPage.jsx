import { Menu } from 'primereact/menu';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EntityDashboardCounts from '../../components/dashboard/EntityDashboardCounts';
import DataExportModal from '../../components/exportUtils/DataExportModal';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
import TitleHeaderOnly from '../../components/header/TitleHeaderOnly';
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import createInvoicesColumnConfig from './config/createInvoicesColumnConfig';
import createInvoicesDashboardCounts from './config/createInvoicesDashboardCounts';
import { createInvoicesData } from './config/createInvoicesData';
import invoicesHistoryTabs from './config/invoicesHistoryTabs';
import EditInvoiceStep from './container/wizardFormSteps/EditInvoiceStep';
import ViewerWithFooter from '../../components/viewers/ViewerWithFooter';

const InvoiceHistoryListPage = () => {
    const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const [columnConfig, setColumnConfig] = useState(createInvoicesColumnConfig);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        dispatch(setCurrentPageName('Invoice History'));
    }, [dispatch]);

    useEffect(() => {
        if (columnConfig.length > 0) {
            initFilters(columnConfig);
        }
    }, [columnConfig]);

    const handleCheckboxChange = (event) => {
        const updatedColumn = columnConfig?.map((col) => {
            if (col.field === event.target.name) {
                col.isSelected = !col.isSelected;
                col.isChecked = !col.isChecked;
            }
            return col;
        });
        setColumnConfig(updatedColumn);
    };

    const exportInvoiceHistoryActionHandler = () => {
        setShowExportModal(true);
    };

    const columnFilterInvoiceHistoryActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };

    const filterInvoiceHistoryActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const addInvoiceHistoryActionHandler = () => {
        setSidebarVisible(true);
    };

    // const closeAddInvoiceHistoryActionHandler = () => {
    //     setSidebarVisible(false);
    // };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const actionButtons = [
        {
            label: 'Export',
            icon: 'pi  pi-download fw-bold fs-6 ',
            actionHandler: exportInvoiceHistoryActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6 ',
            actionHandler: columnFilterInvoiceHistoryActionHandler,

            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterInvoiceHistoryActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi pi-plus fw-normal fs-5',
            actionHandler: addInvoiceHistoryActionHandler,
        },
    ];

    const handleScroll = (event) => {
        const viewerBody = event.target;
        setScrollPosition(viewerBody.scrollTop);
    };

    return (
        <>
            <PlainLayout>
                <DataExportModal
                    showExportModal={showExportModal}
                    setShowExportModal={setShowExportModal}
                    columnConfig={columnConfig}
                    exportData={createInvoicesData}
                    dataTableRef={dataTableRef}
                />
                <Menu
                    model={columnFilterUtils({
                        columnConfig,
                        setColumnConfig,
                        handleCheckboxChange,
                    })}
                    popup
                    ref={columnFilterButtonRef}
                    id="popup_menu_right"
                    popupAlignment="right"
                    className="p-2"
                />

                <ViewerWithFooter
                    visible={sidebarVisible}
                    onHide={toggleSidebar}
                    header={<TitleHeaderOnly onClick={handleOnHide} title={'Edit Invoice'} scrollPosition={scrollPosition} />}
                    // contentComponent={<CreateInvoiceStep rowData={selectedRowData} />}
                    contentComponent={<EditInvoiceStep handleScroll={handleScroll} />}
                />

                <EntityDashboardCounts widgetList={createInvoicesDashboardCounts} />
                <TabMenuContainer
                    tabItems={invoicesHistoryTabs({ columnConfig, handleFilterClick, dataTableRef })}
                    actionButtons={actionButtons}
                />
            </PlainLayout>
        </>
    );
};

export default InvoiceHistoryListPage;
