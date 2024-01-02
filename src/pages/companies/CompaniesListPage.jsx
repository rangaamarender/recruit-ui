import React, { useEffect, useRef, useState } from 'react';
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import companiesTabs from './config/companiesTabs';
import WizardComponent from '../../components/viewers/WizardComponent';
import companiesWizardSteps from './config/companiesWizardSteps';
import EntityDashboardCounts from '../../components/dashboard/EntityDashboardCounts';
import companiesDashboardCounts from './config/companiesDashboardCounts';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';
import { Menu } from 'primereact/menu';
import companiesColumnConfig from './config/companiesColumnConfig';
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
import { payloadDataForApi } from './data/payloadDataForApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';

import { createCompanyRequest, storeDomainData } from '../../redux/actions/companiesActions';
import { companySidebar } from '../../redux/actions/expandMenuAction';
// import { Toast } from 'primereact/toast';

const CompaniesListPage = () => {

    const dispatch = useDispatch();
    const domainAvailable = useSelector((state) => state.company.domainAvailable);

    const value = useSelector((state) => state.expandMenu.company);
    const [sidebarVisible, setSidebarVisible] = useState(value);
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const [columnConfig, setColumnConfig] = useState(companiesColumnConfig);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        dispatch(setCurrentPageName('Companies'));
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

    const exportCompaniesActionHandler = () => {
        setShowExportModal(true);
    };

    const columnFilterCompaniesActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };

    const filterCompaniesActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const addCompaniesActionHandler = () => {
        setSidebarVisible(true);
    };
    useEffect(() => {
        dispatch(storeDomainData([]));
    }, [sidebarVisible, dispatch]);

    const closeAddCompaniesActionHandler = () => {
        setSidebarVisible(false);
        dispatch(companySidebar(false));
    };

    const actionButtons = [
        {
            label: 'Export',
            actionHandler: exportCompaniesActionHandler,
            icon: 'pi  pi-download fw-bold fs-6',
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6 ',
            actionHandler: columnFilterCompaniesActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterCompaniesActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addCompaniesActionHandler,
        },
    ];

    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            dispatch(createCompanyRequest({ formData }));
            console.log('formData', formData);
            setSidebarVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <PlainLayout>
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
                title="Create Company Profile"
                visible={sidebarVisible}
                onHide={closeAddCompaniesActionHandler}
                steps={companiesWizardSteps}
                handleApiCall={handleApiCall} // API call function to the WizardComponent
                payloadDataForApi={(formData) => payloadDataForApi(formData)} // pass the data payloadDataForApi function
                validations={[
                    async () => {
                        // Custom validation for step 0
                        if (domainAvailable === true) {
                            return 'This Company already Registered';
                        }
                        return null; // Validation passed
                    },
                    null,
                    null,
                    null,
                ]}
            />

            <EntityDashboardCounts widgetList={companiesDashboardCounts} />
            <TabMenuContainer
                tabItems={companiesTabs({
                    columnConfig,
                    handleFilterClick,
                    dataTableRef,
                    setColumnConfig,
                    showExportModal,
                    setShowExportModal
                })}
                actionButtons={actionButtons}
            />
        </PlainLayout >
    );
};

export default CompaniesListPage;
