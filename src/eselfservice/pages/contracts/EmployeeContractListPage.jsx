import React, { useEffect, useRef, useState } from 'react'
import employeeContractTabs from './config/employeeContractTabs';
import employeeContractColumnConfig from './config/employeeContractColumnConfig';
import { Menu } from 'primereact/menu';
import { employeeContractData } from './config/employeeContractData';
import { useDispatch } from 'react-redux';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { columnFilterUtils } from '../../../components/filterUtils/columnFilterUtils';
import DataExportModal from '../../../components/exportUtils/DataExportModal';
import PlainLayout from '../../../components/layouts/PlainLayout';
import TabMenuContainer from '../../../components/tabmenu/TabMenuContainer';
import { initFilters } from '../../../components/filterUtils/tableDataFilterUtils';

function EmployeeContractListPage() {
    const columnFilterButtonRef = useRef(null);
    const dataTableRef = useRef(null);
    const dispatch = useDispatch();

    const [columnConfig, setColumnConfig] = useState(employeeContractColumnConfig);
    const [handleFilterClick, setHandleFilterClick] = useState(false);

    useEffect(()=>{
        dispatch(setCurrentPageName('Contract'));
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


    const columnFilterContractActionHandler = (event) => {
        columnFilterButtonRef.current.toggle(event);
        event.stopPropagation();
    };

    const filterContractActionHandler = () => {
        setHandleFilterClick(!handleFilterClick);
    };


    const actionButtons = [
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
       
    ];
    
    return (
        <PlainLayout>
             <DataExportModal
                columnConfig={columnConfig}
                exportData={employeeContractData}
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
           
            <TabMenuContainer tabItems={employeeContractTabs({ columnConfig, handleFilterClick })}
                actionButtons={actionButtons} />
        </PlainLayout>
    )
}

export default EmployeeContractListPage