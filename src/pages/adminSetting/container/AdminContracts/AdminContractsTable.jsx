import React, { useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchContractsDocumentRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'primereact/menu';

import { InputSwitch } from 'primereact/inputswitch';

function AdminContractsTable({ handleRowSelect, handleRowUnselect, setActiveRowMenu, action, onRowClick }) {
    const DocumentActionMenu = [
        {
            label: <div className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">View</div>,
            id: 'view',
            action: 'view',
        },
        {
            label: <div className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">Edit</div>,
            id: 'edit',
            action: 'edit',
        },

        {
            label: <div className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">Delete</div>,
            id: 'delete',
            action: 'delete',
        },
    ];

    const statusBodyTemplate = (rowData) => {
        const handleStatusUpdate = (e) => {
            e.stopPropagation();
        };
        return <InputSwitch checked={rowData.status === 'ACTIVE'} onChange={handleStatusUpdate} />;
    };
    const dispatch = useDispatch();
    const dataApi = useSelector((state) => state.adminRole.contractsDocumentsList);

    const menuRef = useRef(null);

    useEffect(() => {
        dispatch(fetchContractsDocumentRequest());
    }, [dispatch]);
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const onActionMenuItemClick = (event, item, actions, activeRowMenu) => {
        const { id } = item;

        if (id === 'view') {
            action.onViewClick();
        } else if (id === 'edit') {
            action.onEditClick();
        } else if (id === 'delete') {
            action.onDeleteClick(activeRowMenu);
        }
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };

    const actionBodyTemplate = (rowData, activeRowMenu) => {
        const handleOptionClick = (event) => {
            event.stopPropagation();
            const clickedDocumentDefID = rowData.documentDefID;

            showMenu(event, rowData);
            setActiveRowMenu(clickedDocumentDefID);
        };

        return (
            <div className="action-buttons" onClick={handleOptionClick}>
                <i className="pi pi-ellipsis-v cursor-pointer" />
                <Menu
                    popup
                    ref={menuRef}
                    onHide={onHideMenu}
                    model={DocumentActionMenu.map((item, index) => ({
                        id: index,
                        label: item.label,
                        command: (event) => onActionMenuItemClick(event, item, action, activeRowMenu),
                    }))}
                />
            </div>
        );
    };

    return (
        <div>
            <div className="mb-4">
                <DataTable
                    value={dataApi}
                    dataKey="id"
                    tableStyle={{ minWidth: '50rem' }}
                    stripedRows
                    size="small"
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    selectionMode="single"
                    onRowClick={onRowClick}
                >
                    <Column field="documentName" header="DocumentName" />
                    <Column field="docDisplayName" header="DisplayName" />
                    <Column field="status" header="Status" body={statusBodyTemplate} />

                    <Column header="Options" body={actionBodyTemplate} bodyStyle={{ textAlign: 'center' }} />
                </DataTable>
            </div>
        </div>
    );
}

export default AdminContractsTable;
