import { Menu } from 'primereact/menu';
import React from 'react';
import { columnFilterUtils } from './columnFilterUtils';

const ColumnFilterMenu = ({ columnConfig, setColumnConfig, handleCheckboxChange, columnFilterButtonRef }) => {
    return (
        <>
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
        </>
    );
};

export default ColumnFilterMenu;
