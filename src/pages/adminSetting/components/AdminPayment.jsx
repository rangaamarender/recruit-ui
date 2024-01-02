import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import AdminReusableComp from './AdminReusableComp';
import { Button } from 'primereact/button';
import AdminPaymentCard from '../container/AdminPaymentCard';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_PAYMENT_REQUEST } from '../../../redux/actions/paymentAction';
import { Menu } from 'primereact/menu';
import { InputSwitch } from 'primereact/inputswitch';

const AdminPayment = () => {
    const [checked, setChecked] = useState(false);

    const dispatch = useDispatch();
    const subscriptionID = 1;

    useEffect(() => {
        dispatch({ type: FETCH_PAYMENT_REQUEST, payload: subscriptionID });
    }, [dispatch, subscriptionID]);
    const paymentData = useSelector((state) => state.payment.payments);
    console.log(paymentData, 'Check the data');

    const lastFourNumber = paymentData.map((item) => {
        return item.last4Digits;
    });
    console.log(lastFourNumber, 'Check credit card Number');

    const [showPaymentCard, setShowPaymentCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardNum, setCardNum] = useState([]);

    const handleAddCardClick = (newCardNumber) => {
        const formattedCardNumber = formatCardNumber(newCardNumber);
        setCardNum([...cardNum, { label: formattedCardNumber, value: formattedCardNumber }]);
        setShowPaymentCard(false);
    };
    const formatCardNumber = (cardNumber) => {
        const last4Digits = cardNumber.slice(-4);
        return `**** **** **** ${last4Digits}`;
    };

    // const updateCardNumbers = (newCard) => {
    //     setCardNum([...cardNum, newCard]);
    //     console.log('Updated card numbers state:', cardNum);
    // };
    const updateCardNumbers = (newCard) => {
        const last4Digits = newCard.value.slice(-4);
        console.log(`Updated card numbers state: **** **** **** ${last4Digits}`);
        setCardNum([...cardNum, newCard]);
    };

    const payments = [
        {
            id: '4947',
            billFor: 'Enterprize Year Subscription',
            issueDate: '10-05-2023',
            dueDate: '10-13-2023',
            total: '$599',
            status: 'Due',
        },
        {
            id: '4904',
            billFor: 'Maintenance Year Subscription',
            issueDate: '06-19-2023',
            dueDate: '06-26-2023',
            total: '$99',
            status: 'Paid',
        },
        {
            id: '4829',
            billFor: 'Enterprize Year Subscription',
            issueDate: '10-04-2023',
            dueDate: '10-13-2023',
            total: '$599',
            status: 'Due',
        },
    ];

    // const options = [
    //     { label: 'Payment', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    // ];
    const dropdownTemplate = (option) => {
        if (option.value === 'addCard') {
            return (
                <div onClick={() => setShowPaymentCard(true)}>
                    <Button text label="Add New Card" size="small" icon="pi pi-credit-card" iconPos="right" />
                </div>
            );
        }
        return <div>{option.label}</div>;
    };
    // const dropdownOptions = [...cardNum, { label: 'Add Credit Card', value: 'addCard' }];
    const dropdownOptions = [
        ...lastFourNumber.map((last4Digits, index) => ({
            label: `**** **** **** ${last4Digits}`,
            value: `card_${index}`, // You can use a unique value for the 'value' property
        })),
        { label: 'Add Credit Card', value: 'addCard' },
    ];
    const [activeRowMenu, setActiveRowMenu] = useState(null);
    console.log(activeRowMenu)
    const userActionMenu = [
        {
            label: <p className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">View</p>,
            action: 'view',
        },
        {
            label: <p className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">Download</p>,
            action: 'download',
        },
    ];

    const menuRef = useRef(null);
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const menuItems = userActionMenu.map((menuItem) => ({
        label: menuItem.label,
        icon: menuItem.icon,
        command: () => {},
    }));

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };

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
            Due: { color: 'green', border: '1px solid green', padding: '3px', textAlign: 'center' },
            Paid: { color: 'orange', border: '1px solid orange', padding: '3px', textAlign: 'center' },
        };

        const status = rowData.status;
        const style = statusStyles[status] || {};

        return <div style={style}>{status}</div>;
    };

    return (
        <>
            <div>
                {/* <AdminReusableComp title="Payment Setting" options={options} /> */}
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="fs-5 fw-bold">Subscription Plan Details</div>
                        <div className="p-text-secondary fs-6">
                            Your Subscription Renews on Jan 01, 2024 (01 Month 10 Days Remaining)
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                        </div>
                        <div>Auto Renew</div>
                    </div>
                    <div>
                        <Button label="Cancel Subscription" icon="pi pi-times" size="small" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="card mt-2">
                    <div className="border-bottom p-2">
                        <div className="fs-6 fw-bold">Plan Details</div>
                        <div className="d-flex justify-content-between">
                            <div className="">
                                <div className="p-text-secondary">Started On</div>
                                <div className="fw-bold">Jan 01, 2023</div>
                            </div>
                            <div className="">
                                <div className="p-text-secondary">Price</div>
                                <div className="fw-bold">$599 / year</div>
                            </div>
                            <div className="">
                                <div className="p-text-secondary">Access</div>
                                <div className="fw-bold">Unlimited</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom p-2">
                        <div className="fw-bold fs-6 mt-2">Next Payment</div>
                        <div className="d-flex justify-content-between">
                            <div className="p-text-secondary">Pay with</div>
                            <div className="fw-bold">Due $599</div>
                        </div>
                        <div>
                            <div className="d-flex align-items-center gap-4">
                                <div>
                                    <Dropdown
                                        value={selectedCard}
                                        options={dropdownOptions}
                                        onChange={(e) => setSelectedCard(e.value)}
                                        optionLabel="label"
                                        placeholder="Add New Card"
                                        itemTemplate={dropdownTemplate}
                                        className="w-full md:w-14rem"
                                    />
                                </div>
                                <div>
                                    <Button label="Pay Now" size="small" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {showPaymentCard && (
                        <AdminPaymentCard
                            setShowPaymentCard={setShowPaymentCard}
                            handleAddCardClick={handleAddCardClick}
                            updateCardNumbers={updateCardNumbers}
                        />
                    )}
                    <div className="border-bottom p-2">
                        <div className="fw-bold">Last Payment</div>
                        <div className="d-flex justify-content-between">
                            <div className="p-text-secondary">Paid at Oct 12,2018</div>
                            <div className="fw-bold">Paid $599</div>
                        </div>
                    </div>

                    <div className="p-1">
                        <Button
                            text
                            label="Change Billing method"
                            size="small"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                        />
                    </div>
                </div>
                <div className="card mt-3 p-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className="fw-bold">Payment History</h5>
                        </div>
                        <div>
                            <Button text label="Download Statement" size="small" />
                        </div>
                    </div>
                    <div>
                        <DataTable value={payments} stripedRows size="small">
                            <Column field="id" header="Order Id" />
                            <Column field="billFor" header="Bill For (Plan Details)" />
                            <Column field="issueDate" header="Issue Date" />
                            <Column field="dueDate" header="Due Date" />
                            <Column field="total" header="Paid Date Amount" />
                            <Column field="status" header="Status" body={renderStatus} />
                            <Column header="Options" body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPayment;
