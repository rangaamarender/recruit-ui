import React, { useEffect, useRef, useState } from 'react'
import PlainLayout from '../../../components/layouts/PlainLayout'
import TabMenuContainer from '../../../components/tabmenu/TabMenuContainer'
import employeeTimesheetTabs from './config/employeeTimesheetTabs';
import EntityDashboardCounts from '../../../components/dashboard/EntityDashboardCounts';
import employeeTimesheetDashboardCount from './config/employeeTimesheetDashboardCount';
import employeeTimesheetColumnConfig from './config/employeeTimesheetColumnConfig';
import { initFilters } from '../../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../../components/filterUtils/columnFilterUtils';
import DataExportModal from '../../../components/exportUtils/DataExportModal';
import { employeeTimesheetData } from './config/employeeTimesheetData';
import { useDispatch } from 'react-redux';
import addEmployeeTimesheetSteps from './config/addEmployeeTimesheetSteps';
// import { createTimesheetRequest, storeExpenceData, storeTimesheetDoc } from '../../redux/actions/timesheetActions';
import WizardComponent from '../../../components/viewers/WizardComponent';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';

function EmployeeTimesheetListPage() {
    const dispatch = useDispatch();
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
   

    const [columnConfig, setColumnConfig] = useState(employeeTimesheetColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        dispatch(setCurrentPageName('Timesheet'));
    }, [dispatch])

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

    // const exportTimesheetActionHandler = () => {
    //     setShowExportModal(true);
    // };

    const columnFilterTimesheetActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };
    const filterTimesheetActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };


    const addTimesheettActionHandler = () => {
        setSidebarVisible(true);
    };


    const closeAddTimesheetActionHandler = () => {
        setSidebarVisible(false);
    };

    const actionButtons = [
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterTimesheetActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterTimesheetActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addTimesheettActionHandler,
        },
    ];

   

    return (
        <PlainLayout>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={employeeTimesheetData}
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
            <WizardComponent
                title="Add Timesheet"
                visible={sidebarVisible}
                onHide={closeAddTimesheetActionHandler}
                steps={addEmployeeTimesheetSteps}
                handleApiCall=""
                payloadDataForApi=""
                validationMode={true}
                validations={[
                    // async () => {
                    //     // Custom validation for step 0
                    //     if (!timesheetFiles || timesheetFiles.length === 0) {
                    //         return 'Select timesheet document.';
                    //     }
                    //     return null; // Validation passed
                    // },
                   null,
                   null,
                   null
                    // async () => {
                    //     // Custom validation for step 2
                    //     if (!expenceData || expenceData.length === 0) {
                    //         return 'Need minimum one expense.';
                    //     }
                    //     return null; // Validation passed
                    // },
                ]}
            />

            <EntityDashboardCounts widgetList={employeeTimesheetDashboardCount} />
            <TabMenuContainer
                tabItems={employeeTimesheetTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons}
            />

        </PlainLayout>
    )
}

export default EmployeeTimesheetListPage