import { Button } from 'primereact/button';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TitleHeaderOnly from '../../components/header/TitleHeaderOnly';

const VieInvitees = ({
    invitedUsers,
    setViewUsersSidebar,
    setInvitedUsers,
    setSelectedUser,
    setAddUserSidebar,
    setUserEdit,
}) => {
    const nameColumn = (users) => {
        return (
            <div>
                {users.firstName} {users.lastName}
            </div>
        );
    };

    const optionsColumn = (users) => {
        return (
            <div className="d-flex justify-content-between align-items-center gap-4">
                <div className="flex align-items-center">
                    <i
                        className="pi pi-pencil font-bold mr-3 cursor-pointer"
                        onClick={() => {
                            setSelectedUser(users);
                            setAddUserSidebar(true);
                            setUserEdit(true);
                        }}
                    />
                    <i
                        className="pi pi-trash font-bold ml-3 cursor-pointer"
                        onClick={() => setInvitedUsers((currentUsers) => currentUsers.filter((u) => u.id !== users.id))}
                    />
                </div>
            </div>
        );
    };

    const handleViewSidebarClose = () => {
        setViewUsersSidebar(false);
    };

    
    return (
        <div className="h-screen">
            <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                <TitleHeaderOnly
                    title='View Users'
                    onClick={handleViewSidebarClose}
                />
            </div>
            <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                <div className="flex justify-content-center mt-5">
                    <DataTable
                        value={invitedUsers}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15]}
                        className="w-11"
                    >
                        <Column body={nameColumn} header="Name" className="w-2 py-2 pr-2"></Column>
                        <Column field="email" header="Email" className="w-2 py-2 pr-2"></Column>
                        <Column field="phoneNumber" header="Phone" className="w-2 py-2 pr-2"></Column>
                        <Column body={optionsColumn} header="Options" className="w-1 py-2 pr-2"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button label="Close" size="small" onClick={handleViewSidebarClose} severity='secondary' />
                </div>
            </div>
        </div>
    );
};

export default VieInvitees;
