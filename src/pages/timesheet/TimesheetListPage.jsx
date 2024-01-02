import React, { useEffect, useRef, useState } from 'react';
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import timesheetTabs from './config/timesheetTabs';
import EntityDashboardCounts from '../../components/dashboard/EntityDashboardCounts';
import timesheetDashboardCount from './config/timesheetDashboardCount';
import timesheetColumnConfig from './config/timesheetColumnConfig';
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';
import DataExportModal from '../../components/exportUtils/DataExportModal';
import { timesheetData } from './config/timesheetData';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import addTimesheetSteps from './config/addTimesheetSteps';
import { createTimesheetRequest, storeExpenceData, storeTimesheetDoc } from '../../redux/actions/timesheetActions';
import WizardComponent from '../../components/viewers/WizardComponent';
import { payloadDataForApi } from './data/payloadDataForApi';
import { timesheetSidebar } from '../../redux/actions/expandMenuAction';

function TimesheetListPage() {
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const dispatch = useDispatch();
    const value = useSelector((state)=>state.expandMenu.timesheet)

    const [columnConfig, setColumnConfig] = useState(timesheetColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(value);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        dispatch(setCurrentPageName('Timesheet'));
    }, [dispatch]);

    useEffect(() => {
        if (columnConfig.length > 0) {
            initFilters(columnConfig);
        }
    }, [columnConfig]);

    // const timesheetFiles = useSelector((state) => state.timesheet.timesheetDocData)

    const expenceData = useSelector((state) => state.timesheet.expenceData);
    // const validationHoursStep = useSelector((state) => state.timesheet.hoursStepValidationFunction)
// console.log(expenceData,"expensesData")

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

    const exportTimesheetActionHandler = () => {
        setShowExportModal(true);
    };

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

    useEffect(() => {
        dispatch(storeExpenceData([]));
        dispatch(storeTimesheetDoc([]));
    }, [sidebarVisible, dispatch]);

    const closeAddTimesheetActionHandler = () => {
        setSidebarVisible(false);
        dispatch(timesheetSidebar(false))
    };


    const actionButtons = [
        {
            label: 'Export',
            icon: 'pi  pi-download fw-bold fs-6',
            actionHandler: exportTimesheetActionHandler,
            severity: 'secondary',
        },
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

    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            dispatch(createTimesheetRequest({ formData }));
            console.log("formData", formData)
            setSidebarVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <PlainLayout>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={timesheetData}
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
                steps={addTimesheetSteps}
                handleApiCall={handleApiCall}
                payloadDataForApi={payloadDataForApi}
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
                    async () => {
                        // Custom validation for step 2
                        if (!expenceData || expenceData.length === 0) {
                            return 'Need minimum one expense.';
                        }
                        return null; // Validation passed
                    },
                ]}
            />

            <EntityDashboardCounts widgetList={timesheetDashboardCount} />
            <TabMenuContainer
                tabItems={timesheetTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons}
            />
        </PlainLayout>
    );
}

export default TimesheetListPage;
