import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import PlainCustomDataTable from '../../../components/datatable/PlainCustomDataTable';
import { Button } from 'primereact/button';

const PayConfirmList = () => {
    const [filteredData, setFilteredData] = useState([]);
    const handleSearch = (value) => {
        const filtered = data.filter((item) =>
            Object.values(item).some((field) => field.toString().toLowerCase().includes(value.toLowerCase()))
        );
        setFilteredData(filtered);
    };
    const data = [
        {
            name: 'Abhishek Pulluri',
            startDate: 'June 01, 2023',
            endDate: 'June 20, 2023',
            workType: 'FTE',
            hours: '120 hrs',
            bonus: '16 hrs',
            grossPay: '$1123.00',
            deduction: '$23.00',
            netPay: '$2423.00',
        },
        {
            name: 'abc xyz',
            startDate: 'June 01, 2023',
            endDate: 'June 20, 2023',
            workType: 'FTE',
            hours: '120 hrs',
            bonus: '16 hrs',
            grossPay: '$1123.00',
            deduction: '$23.00',
            netPay: '$2423.00',
        },
    ];
    const paymentType = () => (
        <div>
            <Button text label="Direct Deposit" size="small" />
        </div>
    );
    const payConfirmSelectedColumn = [
        'name',
        'startDate',
        'endDate',
        'workType',
        'hours',
        'bonus',
        'grossPay',
        'deduction',
        'netPay',
        'paymentType',
    ];
    const payConfirmColumnConfig = [
        {
            field: 'name',
            header: 'Name',
        },
        {
            field: 'startDate',
            header: 'Start Date',
        },
        {
            field: 'endDate',
            header: 'End Date',
        },
        {
            field: 'workType',
            header: 'Work Type',
        },
        {
            field: 'hours',
            header: 'Hours',
        },
        {
            field: 'bonus',
            header: 'Bonus',
        },
        {
            field: 'grossPay',
            header: 'Gross Pay',
        },
        {
            field: 'deduction',
            header: 'Deductions',
        },
        {
            field: 'netPay',
            header: 'Net Pay',
        },
        {
            field: 'paymentType',
            header: '',
            body: paymentType,
        },
    ];

    return (
        <div>
            {/* content1 */}
            <div className="l-width-70 m-auto p-3 d-flex align-items-center justify-content-between border-bottom">
                <div className="">
                    <div className="fs-5 fw-bold">Pay Confirm</div>
                    <div className="p-text-secondary">Select Employee to includ this payroll</div>
                </div>
                <div>
                    <span className="company-layout-bg p-input-icon-left w-100">
                        <i className="pi pi-search" />
                        <InputText
                            placeholder="Search"
                            className="w-100 rounded pl-5 py-1"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </span>
                </div>
            </div>
            {/* DataTable */}
            <div className="p-3">
                <PlainCustomDataTable
                    data={filteredData.length > 0 ? filteredData : data}
                    selectedColumns={payConfirmSelectedColumn}
                    columnsConfig={payConfirmColumnConfig}
                />
            </div>
        </div>
    );
};

export default PayConfirmList;
