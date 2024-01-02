import React, { useEffect, useRef, useState } from 'react'
import TabMenuContainer from '../../../components/tabmenu/TabMenuContainer'
import documentColumnConfig from './config/documentColumnConfig';
import { initFilters } from '../../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../../components/filterUtils/columnFilterUtils';
import DataExportModal from '../../../components/exportUtils/DataExportModal';
import { documentData } from './config/documentData';
import { useDispatch } from 'react-redux';
import documentTabs from './config/documentTabs';
import documentDashboardCount from './config/documentDashboardCount';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import PlainLayout from '../../../components/layouts/PlainLayout';
import EntityDashboardCounts from '../../../components/dashboard/EntityDashboardCounts';
import Viewer from '../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import AddDocuments from './container/AddDocuments';

function EmployeeDocumentsListPage() {
    const dispatch = useDispatch();
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);


    const [columnConfig, setColumnConfig] = useState(documentColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    console.log(sidebarVisible)

    useEffect(() => {
        dispatch(setCurrentPageName('Documents'));
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

    // const exportExpensesActionHandler = () => {
    //     setShowExportModal(true);
    // };

    const columnFilterDocumentsActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };
    const filterDocumentsActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };


    const addDocumentsActionHandler = () => {
        setSidebarVisible(true);
    };


    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    const actionButtons = [
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterDocumentsActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterDocumentsActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addDocumentsActionHandler,
        },
    ];



    return (
        <PlainLayout>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={documentData}
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
            <Viewer
                visible={sidebarVisible}
                onHide={handleOnHide}
                header={
                    <TitleHeaderOnly
                        onClick={handleOnHide}
                        title={"Add Documents"}
                    />
                }
                contentComponent={<AddDocuments setSidebarVisable={setSidebarVisible} />}
            />

            {/* <WizardComponent
                title="Add Documents"
                visible={sidebarVisible}
                onHide={closeAddDocumentsActionHandler}
                steps={addDocumentsSteps}
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
            /> */}

            <EntityDashboardCounts widgetList={documentDashboardCount} />
            <TabMenuContainer
                tabItems={documentTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons}
            />

        </PlainLayout>
    )
}

export default EmployeeDocumentsListPage