import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import UsersListSkeleton from './UsersListSkeleton';
function UsersList({ setAllUsers, allUsers, selectedCardId, setSelectedCardId, loadingUsers }) {
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUser] = useState(null);

    const handleButtonClick = (id) => {
        setSelectedCardId(id);
        if (selectedCardId === id) {
            setSelectedCardId(null);
        } else {
            setSelectedCardId(id);
        }
    };

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        const sortedUsers = [...allUsers].sort((a, b) => {
            const nameA = a.username.toLowerCase();
            const nameB = b.username.toLowerCase();

            if (newSortOrder === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        setAllUsers(sortedUsers);
    };
    const countryTemplate = (option) => {
        return (
            <div className="flex gap-2 justify-content-start align-items-center ">
                <img alt={option.name} src={option.image} width="50" height="50" className="border rounded-circle" />
                <div>
                    <div>{option.username}</div>
                    <div className="p-text-secondary">{option.email}</div>
                </div>
            </div>
        );
    };
    const handleItemSelect = (e) => {
        const selectedId = e.value;
        setSelectedCardId(selectedId);
        handleButtonClick(selectedId.id);
    };

    return (
        <div>
            <>
                {loadingUsers ? (
                    <UsersListSkeleton />
                ) : (
                    <div className=" company-layout-bg  border-end  company-layout-bg ">
                        <Button
                            onClick={toggleSortOrder}
                            text
                            value={sortOrder}
                            label="Name"
                            icon={sortOrder === 'asc' ? 'pi pi-sort-up' : 'pi pi-sort-down'}
                            className="no-click-border company-main-text p-1 m-1 fw-normal"
                            size="small"
                            iconPos="right"
                        />
                        <ListBox
                            filter
                            dataKey={allUsers.id}
                            value={selectedUser}
                            options={allUsers}
                            optionLabel="username"
                            itemTemplate={countryTemplate}
                            virtualScrollerOptions={{ itemSize: 80 }}
                            listStyle={{ height: '100vh' }}
                            onChange={handleItemSelect}
                        />
                    </div>
                )}
            </>
        </div>
    );
}

export default UsersList;
