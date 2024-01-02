import React, { useEffect, useRef, useState } from 'react'
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import payrollTabs from './config/payrollTabs';
import payrollDashboardCount from './config/payrollDashboardCount';
import EntityDashboardCounts from "../../components/dashboard/EntityDashboardCounts"
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
import payrollSummaryColumnConfig from './config/payrollSummaryColumnConfig';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';
import { payrollSummaryData } from './config/payrollSummaryData';
import DataExportModal from '../../components/exportUtils/DataExportModal';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';

const PayrollListPage = () => {
    const dispatch = useDispatch();
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const [columnConfig, setColumnConfig] = useState(payrollSummaryColumnConfig);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(()=>{
        dispatch(setCurrentPageName('Payroll'));
    },[dispatch])

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

    const columnFilterPayrollActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };
    const filterPayrollActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const exportPayrollActionHandler = () => {
        setShowExportModal(true);
    };


    const actionButtons = [
        {
            label: 'Export',
            icon: 'pi  pi-download fw-bold fs-6',
            actionHandler: exportPayrollActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6 ',
            actionHandler: columnFilterPayrollActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterPayrollActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            // actionHandler: addPayrollActionHandler,
        },
    ];

    return (
        <PlainLayout>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={payrollSummaryData}
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
            <EntityDashboardCounts widgetList={payrollDashboardCount} />
            <TabMenuContainer tabItems={payrollTabs({ columnConfig, handleFilterClick,dataTableRef })} actionButtons={actionButtons} />
        </PlainLayout>
    )
}

export default PayrollListPage;