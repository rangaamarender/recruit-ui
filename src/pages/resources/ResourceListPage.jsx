import React, { useEffect, useRef, useState } from 'react';
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import resourceTabs from './config/resourceTabs';
import resourceColumnConfig from '../resources/config/resourceColumnConfig';
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
// import DataExportModal from '../../components/exportUtils/DataExportModal';
import EntityDashboardCounts from '../../components/dashboard/EntityDashboardCounts';
import resourceDashboardCounts from './config/resourceDashboardCounts';
import { WORKER_C2C, WORKER_W2, WORKER_1099 } from './config/resourceWizardSteps';
// import ColumnFilterMenu from '../../components/filterUtils/ColumnFilterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import { payloadDataForApi } from './data/payloadDataforApi';
import { createResourceRequest } from '../../redux/actions/resourceActions';
import WizardComponent from '../../components/viewers/WizardComponent';
import { resourceSidebar } from '../../redux/actions/expandMenuAction';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';

const ResourceListPage = () => {
    const columnFilterButtonRef = useRef(null);
    const resourcedDataTableRef = useRef(null);
    const dataTableRef = useRef(null);
    const dispatch = useDispatch();
    const value = useSelector((state) => state.expandMenu.resource);
    // const [currentStep, setCurrentStep] = useState(0);

    const [columnConfig, setColumnConfig] = useState(resourceColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(value);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [workerTypeCode, setWorkerTypeCode] = useState(WORKER_W2);

    const [showExportModal, setShowExportModal] = useState(false);
    // const { resources } = useSelector((state) => state.resource);

    // const { resources } = useSelector((state) => state.resource);

    useEffect(() => {
        dispatch(setCurrentPageName('Resource'));
    }, [dispatch]);

    useEffect(() => {
        if (columnConfig?.length > 0) {
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

    const exportResourceActionHandler = () => {
        setShowExportModal(true);
    };

    const columnFilterResourceActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };
    const filterResourceActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const addResourceActionHandler = () => {
        setSidebarVisible(true);
        // setCurrentStep(0);
    };

    const closeAddResourceActionHandler = () => {
        setSidebarVisible(false);
        dispatch(resourceSidebar(false));
    };

    const actionButtons = [
        {
            label: 'Export',
            icon: 'pi  pi-download fw-bold fs-6',
            actionHandler: exportResourceActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterResourceActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterResourceActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addResourceActionHandler,
        },
    ];

    // function to handle the API call
    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            dispatch(createResourceRequest({ formData }));
            setSidebarVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const formData = useSelector((state) => state.resource.formData);

    console.log(formData, 'formData');

    useEffect(() => {
        if (formData?.resourceType === 'WORKER_W2') {
            setWorkerTypeCode(WORKER_W2);
        } else if (formData?.resourceType === 'WORKER_C2C') {
            setWorkerTypeCode(WORKER_C2C);
        } else if (formData?.resourceType === 'WORKER_1099') {
            setWorkerTypeCode(WORKER_1099);
        }
    }, [formData]); // eslint-disable-next-line react-hooks/exhaustive-deps

    // const exportData = resources.map((item) => ({
    //     workerCode: item.workerCode,
    //     'personLegal.familyName': item.personLegal.familyName,
    //     'workerType.workerTypeName': item.workerType.workerTypeName,
    //     vendor: item.vendor,
    //     joinDate: item.workerStatus.effectiveDate,
    //     status: item.workerStatus.status,
    //     workerType: item.workerType.workerTypeCode,
    // }));

    return (
        <PlainLayout>
            {/* <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={exportData}
                dataTableRef={resourcedDataTableRef}
            /> */}
            {/* <ColumnFilterMenu
                columnConfig={columnConfig}
                setColumnConfig={setColumnConfig}
                handleCheckboxChange={handleCheckboxChange}
                columnFilterButtonRef={columnFilterButtonRef}
            /> */}

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
                title="Create Resource"
                visible={sidebarVisible}
                onHide={closeAddResourceActionHandler}
                steps={workerTypeCode}
                // setCurrentStep={setCurrentStep}
                // currentStep={currentStep}
                handleApiCall={handleApiCall} // API call function to the WizardComponent
                payloadDataForApi={payloadDataForApi}
                validations={[null]}
            />

            <EntityDashboardCounts widgetList={resourceDashboardCounts} />
            <TabMenuContainer
                tabItems={resourceTabs({
                    columnConfig,
                    handleFilterClick,
                    dataTableRef,
                    setColumnConfig,
                    showExportModal,
                    setShowExportModal,
                    resourcedDataTableRef
                })}
                actionButtons={actionButtons}
            />
        </PlainLayout>
    );
};

export default ResourceListPage;
