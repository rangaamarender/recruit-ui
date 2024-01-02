import React, { useEffect, useRef, useState } from 'react'
import PlainLayout from '../../components/layouts/PlainLayout'
import TabMenuContainer from '../../components/tabmenu/TabMenuContainer'
import WizardComponent from '../../components/viewers/WizardComponent';
// import contractTabs from './config/contractTabs';
// import contractTabsMsa from './config/contractTabsMsa';
import EntityDashboardCounts from "../../components/dashboard/EntityDashboardCounts"
import contractDashboardCount from './config/contractDashboardCount';
import contractColumnConfig from './config/contractColumnConfig';
import { initFilters } from '../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../components/filterUtils/columnFilterUtils';
// import AddMsaSteps  from './container/wizardFormSteps/MSA/AddMsaSteps'
import DataExportModal from '../../components/exportUtils/DataExportModal';
import { contractData } from './config/contractData';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageName } from '../../redux/actions/headerTitleActions';
import { payloadDataForApi } from '../contracts/data/payloadDataForApi';
// import { handleContractActions } from '../../redux/actions/contractActions';
// import AddWoSteps from './container/wizardFormSteps/WO/AddWoStep';
// import contractTabs from './config/contractTabs';
import AddWoSteps from './config/AddWoSteps';  
import AddWoStepsWoSrSteps from './config/AddWoStepsWoMrSteps';
import AddWoStepsWoMrSteps from './config/AddWoStepsWoMrSteps';
import contractWoTabs from './config/contractWoTabs'; //add MultiResource Indivial and blended rate Config files also

function ContractListWoPage() {
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const dispatch = useDispatch();

    const [columnConfig, setColumnConfig] = useState(contractColumnConfig);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(()=>{
        dispatch(setCurrentPageName('Contract'));
    },[dispatch])

    useEffect(() => {
        if (columnConfig.length > 0) {
            initFilters(columnConfig);
        }
    }, [columnConfig]);
//MODULE_WO_STEPS
const contractSteps = useSelector((state) => state.contract.contractSteps);
const [mySteps,setMySteps] = useState(AddWoSteps);
// console.log(mySteps,"mySteps");
useEffect(()=>{
    if(contractSteps === 'singleResourceWoSwitch'){
    setMySteps(AddWoSteps)
    }
    else if(contractSteps === 'multipleResourceWoIndividualSwitch'){
    setMySteps(AddWoStepsWoSrSteps)
    }
    else if(contractSteps === 'multipleResourceWoBlendedSwitch'){
    setMySteps(AddWoStepsWoMrSteps)
    }
},[contractSteps]);
//MODULE_WO_STEPS
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
        // dispatch(handleContractActions(''));
    };

    const actionButtons = [
        {
            label: 'Export',
            icon: 'pi pi-fw pi-download',
            actionHandler: exportContractActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi pi-fw pi-server',
            actionHandler: columnFilterContractActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi pi-fw pi-filter',
            actionHandler: filterContractActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi pi-fw pi-plus',
            actionHandler: addContractActionHandler,
        },
    ];
    const handleApiCall = async (formData) => {
        try {
            // Dispatch the action to make the POST request
            // dispatch(createCompanyRequest({ formData }));
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
                title="Create Contract WO"
                visible={sidebarVisible}
                setVisible={setSidebarVisible}
                onHide={closeAddContractActionHandler}
                steps={mySteps}
                validations={[
                    null
                ]}
                handleApiCall={handleApiCall} // API call function to the WizardComponent
                payloadDataForApi={(formData) => payloadDataForApi(formData)} 
            />
            <EntityDashboardCounts widgetList={contractDashboardCount} />
            <TabMenuContainer tabItems={contractWoTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons} />
        </PlainLayout>
    )
}

export default ContractListWoPage