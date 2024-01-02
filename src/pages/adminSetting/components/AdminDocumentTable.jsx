import React, { useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchDocumentsRequest } from '../../../redux/actions/adminResourceRoleAction';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'primereact/menu';

function AdminDocumentTable({
    handleRowSelect,
    handleRowUnselect,
    setActiveRowMenu,
    sidebarVisible,
    setSidebarVisible,
    setIsEditClick,
    isEditClick,
    action,
}) {
    const userActionMenu = [
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

    const dispatch = useDispatch();
    const dataApi = useSelector((state) => state.adminRole.documentList);

    const menuRef = useRef(null);

    useEffect(() => {
        dispatch(fetchDocumentsRequest());
    }, [dispatch]);
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const onActionMenuItemClick = (event, item, actions) => {
        const { id } = item;

        if (id === 'view') {
            action.onViewClick();
        } else if (id === 'edit') {
            action.onEditClick();
        }
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };

    const actionBodyTemplate = (rowData) => {
        const handleOptionClick = (event) => {
            event.stopPropagation();
            showMenu(event, rowData);
            setActiveRowMenu(rowData);
        };

        return (
            <div className="action-buttons" onClick={handleOptionClick}>
                <i className="pi pi-ellipsis-v cursor-pointer" />
                <Menu
                    popup
                    ref={menuRef}
                    onHide={onHideMenu}
                    model={userActionMenu.map((item, index) => ({
                        id: index,
                        label: item.label,
                        command: (event) => onActionMenuItemClick(event, item, action),
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
                    // editMode="row"
                    dataKey="id"
                    tableStyle={{ minWidth: '50rem' }}
                    stripedRows
                    size="small"
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    selectionMode="single"
                >
                    <Column field="documentName" header="DocumentName" />
                    <Column field="docDisplayName" header="DisplayName" />
                    <Column field="status" header="Status" />

                    <Column header="Options" body={actionBodyTemplate} bodyStyle={{ textAlign: 'center' }} />
                </DataTable>
            </div>
        </div>
    );
}

export default AdminDocumentTable;
