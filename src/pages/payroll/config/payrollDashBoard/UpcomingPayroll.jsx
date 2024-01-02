import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import PayrollWizardComponent from '../../../../components/viewers/PayrollWizardComponent';
import RunPayrollParent from '../../container/RunPayrollParent';

const UpcomingPayroll = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [showPayrollBtn, setShowPayrollBtn] = useState(false);
    const data = [
        {
            id: 1,
            payPeriod: '05/01 - 05/30',
            payDate: 'Jun 01, 2023',
            schedule: 'Monthly',
            payrollType: 'Regular',
            department: 'Billable',
            status: 'Review',
        },
        {
            id: 2,
            payPeriod: '05/01 - 05/30',
            payDate: 'Jun 01, 2023',
            schedule: 'Monthly',
            payrollType: 'Regular',
            department: 'Billable',
            status: 'Pending',
        },
        {
            id: 3,
            payPeriod: '05/01 - 05/30',
            payDate: 'Jun 01, 2023',
            schedule: 'Monthly',
            payrollType: 'Regular',
            department: 'Billable',
            status: 'Postponed',
        },
        {
            id: 4,
            payPeriod: '05/01 - 05/30',
            payDate: 'Jun 01, 2023',
            schedule: 'Monthly',
            payrollType: 'Regular',
            department: 'Billable',
            status: 'Adjustment',
        },
    ];
    const [UpcomingPayrollData, setUpcomingPayrollData] = useState(data);

    const userActionMenu = [
        {
            label: <p className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">View</p>,
            action: 'view',
        },
        {
            label: <p className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">Delete</p>,
            action: 'edit',
        },
    ];
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    console.log(activeRowMenu);

    const menuRef = useRef(null);
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };
    const menuItems = userActionMenu.map((menuItem) => ({
        label: menuItem.label,
        icon: menuItem.icon,
        command: () => {},
    }));
    const handleOptionClick = (event, rowData) => {
        event.stopPropagation();
        showMenu(event, rowData);
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="action-buttons">
                <i className="pi pi-ellipsis-v cursor-pointer" onClick={(rowData) => handleOptionClick(rowData)} />
                <Menu model={menuItems} popup ref={menuRef} onHide={onHideMenu} />
            </div>
        );
    };
    const renderStatus = (rowData) => {
        const statusStyles = {
            Review: { color: 'green', border: '1px solid green', padding: '3px', textAlign: 'center' },
            Pending: { color: 'orange', border: '1px solid orange', padding: '3px', textAlign: 'center' },
            Postponed: { color: 'red', border: '1px solid red', padding: '3px', textAlign: 'center' },
            Adjustment: { color: 'blue', border: '1px solid blue', padding: '3px', textAlign: 'center' },
        };

        const status = rowData.status;
        const style = statusStyles[status] || {};

        return <div style={style}>{status}</div>;
    };

    const handleCheckboxChange = (rowData) => {
        const updatedData = UpcomingPayrollData.map((item) =>
            item.id === rowData.id ? { ...item, checked: !item.checked } : item
        );
        setUpcomingPayrollData(updatedData);
        setShowPayrollBtn(updatedData.some((item) => item.checked));
    };

    const userNameBodyTemplate = (rowData) => {
        return (
            <>
                <div className="flex align-items-center justify-content-start gap-2">
                    <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox onChange={() => handleCheckboxChange(rowData)} checked={rowData.checked} />
                    </div>
                </div>
            </>
        );
    };
    const RunPayrollBtn = () => {
        return (
            <div className="text-center">
                <Button label="Run Payroll" size="small" onClick={() => setSidebarVisible(true)} />
            </div>
        );
    };
    return (
        <>
            <PayrollWizardComponent
                title="Run Payroll"
                visible={sidebarVisible}
                onHide={() => setSidebarVisible(false)}
                steps={RunPayrollParent}
            />

            <div className="d-flex justify-content-between fs-6 fw-bold p-3">
                <div className="">Upcoming Payroll</div>
                {showPayrollBtn && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Button label="Run All Payroll" size="small" onClick={() => setSidebarVisible(true)} />
                    </div>
                )}
            </div>

            <div>
                <DataTable value={UpcomingPayrollData} dataKey="id" size="small" stripedRows>
                    <Column field="" header="" body={userNameBodyTemplate} headerStyle={{ padding: '10px' }}></Column>
                    <Column field="payPeriod" header="Pay Period"></Column>
                    <Column field="payDate" header="Pay Date"></Column>
                    <Column field="schedule" header="Schedule"></Column>
                    <Column field="payrollType" header="Payroll Type"></Column>
                    <Column field="department" header="Department"></Column>
                    <Column field="status" header="Status" body={renderStatus} />
                    <Column field="" header="" body={RunPayrollBtn} />
                    <Column header="Options" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </>
    );
};

export default UpcomingPayroll;
