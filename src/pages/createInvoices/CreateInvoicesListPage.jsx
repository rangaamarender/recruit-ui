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
import createInvoicesTabs from './config/createInvoicesTabs';
import CreateInvoiceStep from './container/wizardFormSteps/CreateInvoiceStep';
import ViewerWithFooter from '../../components/viewers/ViewerWithFooter';

const CreateInvoicesListPage = () => {
    const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const [columnConfig, setColumnConfig] = useState(createInvoicesColumnConfig);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (event) => {
        const viewerBody = event.target;
        setScrollPosition(viewerBody.scrollTop);
    };

    useEffect(() => {
        dispatch(setCurrentPageName('Create Invoices'));
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

    const exportCreateInvoiceActionHandler = () => {
        setShowExportModal(true);
    };

    const columnFilterCreateInvoiceActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };

    const filterCreateInvoiceActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const addCreateInvoiceActionHandler = () => {
        setSidebarVisible(true);
    };

    // const closeAddCreateInvoiceActionHandler = () => {
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
            icon: 'pi pi-download  fw-bold fs-6',
            actionHandler: exportCreateInvoiceActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterCreateInvoiceActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterCreateInvoiceActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addCreateInvoiceActionHandler,
        },
    ];

    return (
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
                header={
                    <TitleHeaderOnly
                        scrollPosition={scrollPosition}
                        onClick={handleOnHide}
                        title={'Create Invoice'}
                        // nextStep={steps[currentStep].nextStep}
                        // progress={progress}
                    />
                }
                // contentComponent={<CreateInvoiceStep rowData={selectedRowData} />}
                contentComponent={<CreateInvoiceStep handleScroll={handleScroll} />}
            />

            <EntityDashboardCounts widgetList={createInvoicesDashboardCounts} />
            <TabMenuContainer
                tabItems={createInvoicesTabs({ columnConfig, handleFilterClick, dataTableRef })}
                actionButtons={actionButtons}
            />
        </PlainLayout>
    );
};

export default CreateInvoicesListPage;
