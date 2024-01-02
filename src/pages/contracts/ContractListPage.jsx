import React, { useEffect, useRef, useState } from 'react';
import PlainLayout from '../../components/layouts/PlainLayout';
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer';
import WizardComponent from '../../components/viewers/WizardComponent';
import contractTabs from './config/contractTabs';
import EntityDashboardCounts from '../../components/dashboard/EntityDashboardCounts';
import contractDashboardCount from './config/contractDashboardCount';
import contractColumnConfig from './config/contractColumnConfig';
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';
import AddMsaSteps from './config/AddMsaSteps';
import DataExportModal from '../../components/exportUtils/DataExportModal';
import { contractData } from './config/contractData';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import { payloadDataForApi } from '../contracts/data/payloadDataForApi';
import { contractSidebar } from '../../redux/actions/expandMenuAction';
import { storeUploadMsaData } from '../../redux/actions/contractActions';
import AddWoSrSteps from './config/AddWoSrSteps';
import AddWoMrSteps from './config/AddWoMrSteps';

function ContractListPage() {
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const dispatch = useDispatch();
    const value = useSelector((state)=>state.expandMenu.contract)
    const expenceData = useSelector((state) => state.contract.uploadMsaData);
    useEffect(() => {
        dispatch(storeUploadMsaData([]))
        
    }, [dispatch])

    const [columnConfig, setColumnConfig] = useState(contractColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(value);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    //MSA_WO_STEPS
    const contractSteps = useSelector((state) => state.contract.contractSteps);
    const [mySteps,setMySteps] = useState(AddMsaSteps);
    // console.log(mySteps,"mySteps");
    useEffect(()=>{
        if(contractSteps === 'singleResourceWoSwitch'){
        setMySteps(AddMsaSteps)
        }
        else if(contractSteps === 'multipleResourceWoIndividualSwitch'){
        setMySteps(AddWoSrSteps)
        }
        else if(contractSteps === 'multipleResourceWoBlendedSwitch'){
        setMySteps(AddWoMrSteps)
        }
    },[contractSteps]);
    //MSA_WO_STEPS
    useEffect(() => {
        dispatch(setCurrentPageName('Contract'));
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

    const exportContractActionHandler = () => {
        setShowExportModal(true);
    };

    const columnFilterContractActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };

    const filterContractActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const addContractActionHandler = () => {
        setSidebarVisible(true);
    };

    const closeAddContractActionHandler = () => {
        setSidebarVisible(false);
        dispatch(contractSidebar(false))
    };

    const actionButtons = [
        {
            label: 'Export',
            icon: 'pi  pi-download fw-bold fs-6',
            actionHandler: exportContractActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterContractActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterContractActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-plus fw-normal fs-5',
            actionHandler: addContractActionHandler,
        },
    ];
    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            // dispatch(createCompanyRequest({ formData }));
            console.log('formData', formData);
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
                exportData={contractData}
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
                title="Create Client Contract "
                visible={sidebarVisible}
                onHide={closeAddContractActionHandler}
                // steps={AddMsaSteps}
                steps={mySteps}
            //      validations={[
            //         null
            // ]}
                validations={[
                    null,
                    async () => {
                        // Custom validation for step 2 - upload MSA valiadation
                         if (!expenceData || expenceData.length === 0) {
                            return 'Enter  Required fields.';
                        }
                //         return null;// Validation passed
                //         // if(checked = true){ // true+1 (address)
                //         //     if(expenceData > 1 && )
                //         // }
                    }
                ]}
                handleApiCall={handleApiCall} // API call function to the WizardComponent
                payloadDataForApi={(formData) => payloadDataForApi(formData)}
            />
            <EntityDashboardCounts widgetList={contractDashboardCount} />
            <TabMenuContainer
                tabItems={contractTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons}
            />
        </PlainLayout>
    );
}

export default ContractListPage;
