import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Checkbox } from 'primereact/checkbox';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import { userData } from '../config/userConfig/userData';
import { usersHeaderViewerOptions } from '../config/userConfig/usersHeaderViewerOptions';
import { usersTabs } from '../config/userConfig/usersTabs';
import { userHeaderViewerBtn } from '../config/userConfig/userHeaderViewerBtn';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';
import WizardComponent from '../../../components/viewers/WizardComponent';
import { userWizardSteps } from '../config/userConfig/userWizardSteps';
import { confirmAction } from '../../../components/confirmationUtils';
import { userActionMenu } from '../config/userConfig/userActionMenu';

const AdminUsers = () => {
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [metaKey, setMetaKey] = useState(false);
    const [usersData, setUsersData] = useState(userData);
    const [selectedItems, setSelectedItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const toastBC = useRef(null);
    const [sidebarVisibleWizard, setSidebarVisibleWizard] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isEditClick, setIsEditClick] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSearch = () => {
        const filtered = usersData.filter(
            (row) =>
                row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const clear = () => {
        toastBC.current.clear();
        setVisible(false);
    };
    const handleSuspendClick = () => {
        const updatedData = usersData.map((item) =>
            selectedItems.some((selectedItem) => selectedItem.id === item.id) ? { ...item, suspended: true } : item
        );
        setUsersData(updatedData);
        setSelectedItems([]);
        clear();
    };

    const handleSuspend = () => {
        const updatedData = usersData.map((item) =>
            item.id === activeRowMenu.id ? { ...item, suspended: true } : item
        );
        setUsersData(updatedData);
        setSelectedItems([]);
        clear();
    };

    const handleDelete = () => {
        const updatedUsers = usersData.filter((user) => user.id !== activeRowMenu.id);
        setUsersData(updatedUsers);
        setSelectedItems([]);
        clear();
    };
    const handleDeleteButtonClick = () => {
        const updatedData = usersData.filter((item) => !selectedItems.some((selected) => selected.id === item.id));
        setUsersData(updatedData);
        setSelectedItems([]);
        clear();
    };

    const deleteConfirm = () => {
        confirmAction('Delete', handleDeleteButtonClick, visible, setVisible, toastBC, clear);
    };

    const menuDeleteConfirm = () => {
        confirmAction('Delete', handleDelete, visible, setVisible, toastBC, clear);
    };

    const suspendConfirm = () => {
        confirmAction('Suspend', handleSuspendClick, visible, setVisible, toastBC, clear);
    };

    const menuSuspendConfirm = () => {
        confirmAction('Suspend', handleSuspend, visible, setVisible, toastBC, clear);
    };

    const menuRef = useRef(null);
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };
    const onViewClick = () => {
        setSidebarVisible(true);
        setIsEditClick(false);
        setActiveIndex(0);
    };
    const onEditClick = () => {
        setSidebarVisible(true);
        setIsEditClick(true);
        setActiveIndex(0);
    };
    const onNotesClick = () => {
        setSidebarVisible(true);
        setActiveIndex(1);
    };

    const action = {
        menuSuspendConfirm,
        menuDeleteConfirm,
        onViewClick,
        onEditClick,
        onNotesClick,
    };
    const onActionMenuItemClick = (event, item, actions) => {
        const { id } = item;

        if (id === 'suspend') {
            action.menuSuspendConfirm();
        } else if (id === 'delete') {
            action.menuDeleteConfirm();
        } else if (id === 'view') {
            action.onViewClick();
        } else if (id === 'edit') {
            action.onEditClick();
        } else if (id === 'notes') {
            action.onNotesClick();
        }
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };
    const handleRowSelect = (event) => {
        setSidebarVisible(!sidebarVisible);
        setIsEditClick(true);
        setActiveIndex(0);
    };

    const handleRowUnselect = (e) => {
        setSidebarVisible(!sidebarVisible);
        setActiveIndex(0);
    };
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
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
    const renderStatus = (rowData) => {
        const statusStyles = {
            Active: { color: 'green', border: '1px solid green', padding: '3px', textAlign: 'center' },
            Pending: { color: 'orange', border: '1px solid orange', padding: '3px', textAlign: 'center' },
            Suspend: { color: 'red', border: '1px solid red', padding: '3px', textAlign: 'center' },
        };

        const status = rowData.status;
        const style = statusStyles[status] || {};

        return <div style={style}>{status}</div>;
    };

    const verifiedStatus = (verificationMode) => {
        return (
            <div className="flex align-items-center gap-1">
                {verificationMode === 'email' ? (
                    <>
                        <div className="p-0 flex align-items-center justify-content-center gap-1">
                            <i className="pi  pi-verified" style={{ color: 'green', fontSize: '14px' }}></i>
                            <div className="pi pi-envelope fw-bold" style={{fontSize:"15px"}}></div>
                        </div>
                        <div className="p-0 flex align-items-center justify-content-center gap-1">
                            <i className="pi pi-ban" style={{ color: 'red',fontSize: '14px' }}></i>
                            <div className="pi pi-mobile fw-bold" style={{fontSize:"15px"}}></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-0 flex align-items-center justify-content-center gap-1">
                            <i className="pi pi-ban" style={{ color: 'red',fontSize: '14px' }}></i>
                            <div className="pi pi-envelope fw-bold" style={{fontSize:"15px"}}></div>
                        </div>
                        <div className="p-0 flex align-items-center justify-content-center gap-1">
                            <i className="pi pi-verified" style={{ color: 'green',fontSize: '14px' }}></i>
                            <div className="pi pi-mobile fw-bold" style={{fontSize:"15px"}}></div>
                        </div>
                    </>
                )}
            </div>
        );
    };
    const handleCheckboxChange = (rowData) => {
        const isSelected = selectedItems.some((item) => item.id === rowData.id);

        if (isSelected) {
            const updatedSelection = selectedItems.filter((item) => item.id !== rowData.id);
            setSelectedItems(updatedSelection);
        } else {
            setSelectedItems([...selectedItems, rowData]);
        }
    };
    const predefinedColors = ['#9c27b0', '#2196F3', '#4CAF50'];
    let colorIndex = 0;

    const getNextColor = () => {
        const color = predefinedColors[colorIndex];
        colorIndex = (colorIndex + 1) % predefinedColors.length;
        return color;
    };
    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((n) => n.charAt(0)).join('');
    };

    const userNameBodyTemplate = (rowData) => {
        return (
            <>
                <div className="flex align-items-center justify-content-start gap-2">
                    <div onClick={(event) => event.stopPropagation()}>
                        <Checkbox
                            inputId={rowData.id}
                            onChange={() => handleCheckboxChange(rowData)}
                            checked={selectedItems.some((item) => item.id === rowData.id)}
                            disabled={rowData.suspended}
                        />
                    </div>

                    <Avatar
                        label={getInitials(rowData.user)}
                        style={{ backgroundColor: getNextColor(), color: '#ffffff' }}
                        shape="circle"
                    />
                    <div className="fs-6">{rowData.user}</div>
                </div>
            </>
        );
    };
    console.log(activeRowMenu);
    console.log(setMetaKey);
    const closeAddUserActionHandler = () => {
        setSidebarVisibleWizard(false);
    };
    const isRowDisabled = (rowData) => {
        return rowData.suspended;
    };

    return (
        <div className="">
            <Toast ref={toastBC} position="top-right" />
            <ViewerWithTabs
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={usersTabs({ isEditClick })}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                header={
                    <HeaderViewerWithTabs
                        name="Austin Ray"
                        employeeType="austinray@gmail.com"
                        buttons={userHeaderViewerBtn}
                        options={usersHeaderViewerOptions}
                        buttonFlag={false}
                        onClick={toggleSidebar}
                        showTag={true}
                        tags="Active"
                    />
                }
            />
            <WizardComponent
                title="Create User Profile"
                visible={sidebarVisibleWizard}
                onHide={closeAddUserActionHandler}
                steps={userWizardSteps}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
            />
            <div className="border-bottom flex justify-content-between align-items-center">
                <div className="fs-5 fw-bold ">User</div>
                <div className=" flex justify-content-center align-items-center gap-2 p-2">
                    {selectedItems?.length > 0 ? (
                        <div className="flex justify-content-center align-items-center gap-2">
                            <Button label="Suspend" severity="secondary" size="small" onClick={suspendConfirm} />

                            <Button label="Delete" severity="secondary" size="small" onClick={deleteConfirm} />
                        </div>
                    ) : null}

                    <div className="ml-2">
                        <div className="">
                            <span className="p-input-icon-left w-100">
                                <i className="pi pi-search ps-2" />
                                <InputText
                                    placeholder="Search"
                                    type="text"
                                    className="w-100 rounded pl-5"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                            </span>
                        </div>
                    </div>
                    {/*  */}
                    <Button icon="pi pi-plus fs-5 " size="small" onClick={() => setSidebarVisibleWizard(true)} />
                </div>
            </div>
            <DataTable
                rowClassName={(rowData) => (isRowDisabled(rowData) ? 'disabled-row' : '')}
                value={searchTerm ? filteredData : usersData}
                dataKey="id"
                size="small"
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                selectionMode="single"
                metaKeySelection={metaKey}
                stripedRows
            >
                <Column
                    field="user"
                    header="User"
                    body={userNameBodyTemplate}
                    headerStyle={{ padding: '10px' }}
                ></Column>
                <Column field="role" header="Role"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column
                    field="verified"
                    header="Verified"
                    body={(rowData) => verifiedStatus(rowData.verifiedBy)}
                ></Column>
                <Column field="status" header="Status" body={renderStatus} />
                <Column header="Options" body={actionBodyTemplate} bodyStyle={{ textAlign: 'right' }} />
            </DataTable>
        </div>
    );
};

export default AdminUsers;
