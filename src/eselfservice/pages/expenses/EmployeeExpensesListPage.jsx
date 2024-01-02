import React, { useEffect, useRef, useState } from 'react'
import TabMenuContainer from '../../../components/tabmenu/TabMenuContainer'
import expenseColumnConfig from './config/expenseColumnConfig';
import { initFilters } from '../../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../../components/filterUtils/columnFilterUtils';
import DataExportModal from '../../../components/exportUtils/DataExportModal';
import { expenseData } from './config/expenseData';
import { useDispatch, useSelector } from 'react-redux';
import WizardComponent from '../../../components/viewers/WizardComponent';
import expenseTabs from './config/expenseTabs';
import expenseDashboardCount from './config/expenseDashboardCount';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import PlainLayout from '../../../components/layouts/PlainLayout';
import EntityDashboardCounts from '../../../components/dashboard/EntityDashboardCounts';
import addExpenseSteps from './config/AddExpensesSteps';

function EmployeeExpensesListPage() {
    const dispatch = useDispatch();
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
   

    const [columnConfig, setColumnConfig] = useState(expenseColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

console.log(sidebarVisible)

    useEffect(() => {
        dispatch(setCurrentPageName('Expenses'));
    }, [dispatch])


    const expenceData = useSelector((state) => state.timesheet.expenceData);


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

    // const exportExpensesActionHandler = () => {
    //     setShowExportModal(true);
    // };

    const columnFilterExpensesActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };
    const filterExpensesActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };


    const addExpensesActionHandler = () => {
        setSidebarVisible(true);
    };


    const closeAddExpenseActionHandler = () => {
        setSidebarVisible(false);
    };

    const actionButtons = [
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterExpensesActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterExpensesActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addExpensesActionHandler,
        },
    ];

   

    return (
        <PlainLayout>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={expenseData}
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
                title="Add Expense"
                visible={sidebarVisible}
                onHide={closeAddExpenseActionHandler}
                steps={addExpenseSteps}
                handleApiCall=""
                payloadDataForApi=""
                validationMode={true}
                validations={[
                    async () => {
                        if (!expenceData || expenceData.length === 0) {
                            return 'Need minimum one expense.';
                        }
                        return null; // Validation passed
                    },
                ]}
            />

            <EntityDashboardCounts widgetList={expenseDashboardCount} />
            <TabMenuContainer
                tabItems={expenseTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons}
            />

        </PlainLayout>
    )
}

export default EmployeeExpensesListPage