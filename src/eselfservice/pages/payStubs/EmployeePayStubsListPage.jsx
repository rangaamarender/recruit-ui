import React, { useEffect, useRef, useState } from 'react'
import PlainLayout from '../../../components/layouts/PlainLayout'
import TabMenuContainer from '../../../components/tabmenu/TabMenuContainer'
import EntityDashboardCounts from '../../../components/dashboard/EntityDashboardCounts';
import payColumnConfig from './config/payColumnConfig';
import { initFilters } from '../../../components/filterUtils/tableDataFilterUtils';
import { Menu } from 'primereact/menu';
import { columnFilterUtils } from '../../../components/filterUtils/columnFilterUtils';
import DataExportModal from '../../../components/exportUtils/DataExportModal';
import { payData } from './config/payData';
import { useDispatch, useSelector} from 'react-redux';
// import WizardComponent from '../../../components/viewers/WizardComponent';
import payTabs from './config/payTabs';
import payDashboardCount from './config/payDashboardCount';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { fetchResourceByIdRequest } from '../../../redux/actions/resourceActions';

function EmployeePayStubsListPage() {
    const dispatch = useDispatch();
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
   
    const { selectedResource } = useSelector((state) => state.resource);

    useEffect(() => {
        const workerID = '4aee8ffe-b29d-4e89-b925-6a68d49a09c5'; // Your specific workerID

        // Dispatch action to fetch resource by workerID
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);


    console.log(selectedResource)


    const [columnConfig, setColumnConfig] = useState(payColumnConfig);
    const [handleFilterClick, setHandleFilterClick] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);

    useEffect(() => {
        dispatch(setCurrentPageName('Pay Stubs'));
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

    const columnFilterPayActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };

    const filterPayActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };

    const actionButtons = [
        {
            label: '',
            icon: 'pi  pi-server fw-bold fs-6',
            actionHandler: columnFilterPayActionHandler,
            severity: 'secondary',
        },
        {
            label: '',
            icon: 'pi  pi-filter-fill fw-normal fs-6',
            actionHandler: filterPayActionHandler,
            severity: 'secondary',
        }
    ];

   

    return (
        <PlainLayout>
            <DataExportModal
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
                columnConfig={columnConfig}
                exportData={payData}
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
          

            <EntityDashboardCounts widgetList={payDashboardCount} />
            <TabMenuContainer
                tabItems={payTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons}
            />

        </PlainLayout>
    )
}

export default EmployeePayStubsListPage