import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import { useDispatch } from 'react-redux';
import { handleActions } from '../../redux/actions/companiesActions';
import { handlecontractActionMenu } from '../../redux/actions/contractActions';

const CustomDataTable = ({
    data,
    selectedColumns,
    columnsConfig,
    actionMenu,
    onRowSelect,
    onRowUnselect,
    handleAction,
    handleFilterClick,
    dataTableRef,
    currentPageReportTemplate,
    rows,
    first,
    last,
    onPageChange,
}) => {
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const dispatch = useDispatch();
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
            dispatch(handleActions(menuItem.action));
            dispatch(handlecontractActionMenu(menuItem.action));
            onHideMenu();
        },
    }));
    const handleOptionClick = (event, rowData) => {
        event.stopPropagation();
        showMenu(event, rowData);
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <i className="pi pi-ellipsis-v" onClick={(rowData) => handleOptionClick(rowData)} />
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
    // const avatarBodyTemplate = (rowData) => {
    //     return (
    //         <div className="avatar-column">
    //             <img
    //                 src={rowData.avatarUrl}
    //                 alt={rowData.name}
    //                 style={{ borderRadius: '50%', width: '32px', height: '32px' }}
    //             />
    //             <span>{rowData.name}</span>
    //         </div>
    //     );
    // };

    return (
        <div>
            <DataTable
                ref={dataTableRef}
                stripedRows
                size="normal"
                value={data}
                paginator
                rowsPerPageOptions={[10, 25, 50]}
                selectionMode="single"
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                emptyMessage="No records found"
                rows={rows}
                first={first}
                last={last}
                onPageChange={onPageChange}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate={currentPageReportTemplate}
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
                                // body={
                                //     col.field === 'personLegal.familyName'
                                //         ? avatarBodyTemplate
                                //         : (rowData) => getNestedValue(rowData, col.field)
                                // }
                            />
                        )
                )}
                <Column header="Options" body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
};
export default CustomDataTable;
