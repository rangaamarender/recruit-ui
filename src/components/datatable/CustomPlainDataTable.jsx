import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { handleActions } from '../../redux/actions/companiesActions';

const CustomPlainDataTable = ({
    data,
    selectedColumns,
    columnsConfig,
    actionMenu,
    onRowSelect,
    onRowUnselect,
    handleAction,
    handleFilterClick,
    dataTableRef,
}) => {
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const dispatch = useDispatch()
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };

    const menuRef = useRef(null);

    const menuItems = actionMenu.map((menuItem) => ({
        label: menuItem.label,
        icon: menuItem.icon,
        command: () => {
            handleAction(menuItem.action, activeRowMenu);
            dispatch(handleActions(menuItem.action))
            onHideMenu();
        },
    }));

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <Button
                    icon="pi pi-ellipsis-v"
                    text
                    rounded
                    style={{ color: '#323a49' }}
                    onClick={(e) => showMenu(e, rowData)}
                />
                <Menu model={menuItems} popup ref={menuRef} onHide={onHideMenu} />
            </div>
        );
    };
    const getNestedValue = (object, path) => {
        const pathArray = path.split('.'); // Split the path into an array of keys
        let value = object;

        for (const key of pathArray) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key]; // Access the nested property
            } else {
                return undefined; // Property not found
            }
        }

        return value;
    };
    return (
        <div>
            <DataTable
                ref={dataTableRef}
                stripedRows
                size="small"
                value={data}
                rowsPerPageOptions={[10, 25, 50]}
                selectionMode="single"
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                emptyMessage="No records found"
            >
                {columnsConfig.map(
                    (col) =>
                        selectedColumns.includes(col.field) && (
                            <Column
                                className={!col.isSelected && 'd-none'}
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                body={(rowData) => getNestedValue(rowData, col.field)} // Use the function to access nested property
                                filter={handleFilterClick}
                                filterPlaceholder={`Search By ${col.header}`}
                                filterField={col.field}
                            />
                        )
                )}
                <Column header="Options" body={actionBodyTemplate}  bodyStyle={{ textAlign: 'right' }} />
            </DataTable>
        </div>
    );
};
export default CustomPlainDataTable;