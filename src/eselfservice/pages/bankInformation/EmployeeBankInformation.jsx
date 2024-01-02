import React, { useRef, useState } from 'react'
import PlainLayout from '../../../components/layouts/PlainLayout'
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Toast } from 'primereact/toast';
import Viewer from '../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import EditBankInformation from './container/EditBankInformation';
import AddBankInformation from './container/AddBankInformation';
import { fetchResourceByIdRequest } from '../../../redux/actions/resourceActions';
import { workerID } from '../WorkerId';

function EmployeeBankInformation() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentPageName('Bank Information'));
    }, [dispatch])

    const { selectedResource } = useSelector((state) => state.resource);
    console.log(selectedResource, "selectedresource")
    useEffect(() => {
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);

    const bankDetails = selectedResource?.personLegal?.personBankDetails

    console.log(bankDetails, "backInfo")

    const toast = useRef()

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [showFullAccountNumber, setShowFullAccountNumber] = useState({});
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [editedAccount, setEditedAccount] = useState(null);
    const [accountsData, setAccountsData] = useState(bankDetails || []);
    const [isEdit, setIsEdit] = useState(false);


    const onSubmit = (data) => {
        setIsEdit(false);
        // setActive("all")

        toast.current.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Bank Information updated successfully!',
        });
    };

    const handleEditAccount = (accountId) => {
        setSelectedAccountId(accountId);
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    const addBankDetailsActionHandler = () => {
        setSidebarVisible(true);
    };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };


    const toggleAccountNumberVisibility = (accountId) => {
        setShowFullAccountNumber((prevState) => {
            const updatedState = { ...prevState };
            // Close all other account numbers before toggling the current one
            Object.keys(updatedState).forEach((key) => {
                if (key !== accountId.toString()) {
                    updatedState[key] = false;
                }
            });
            // Toggle the current account number visibility
            updatedState[accountId] = !prevState[accountId];
            return updatedState;
        });
    };

    // Function to display account number based on visibility state
    const getDisplayedAccountNumber = (account) => {
        const accountId = account.personBankDetailsID;
        if (showFullAccountNumber[accountId]) {
            return account.accountNumber;
        } else {
            // Display only the last four digits
            const lastFourDigits = account.accountNumber.slice(-4);
            return `xxxxxxxx${lastFourDigits}`;
        }
    };


    const handleEyeIconClick = (accountId) => {
        toggleAccountNumberVisibility(accountId);
    };

    const handleDeleteAccount = (accountId) => {
        if (accountsData.length === 1) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'At least one account should be there',
            });
        } else {
            const updatedAccounts = accountsData.filter((account) => account.id !== accountId);
            setAccountsData(updatedAccounts);

            // Clear bank information if the deleted account matches the currently edited account
            if (editedAccount && editedAccount.id === accountId) {
                setEditedAccount(null);
            }
        }
    };

    const selectedAccount = accountsData.length > 0 ? accountsData[0] : {};

    const handleAddBankDetails = (newBankDetails) => {
        const updatedBankDetails = [...accountsData, newBankDetails];
        setAccountsData(updatedBankDetails);
        setSidebarVisible(false);
    };

    return (
        <PlainLayout>
            <Viewer
                visible={sidebarVisible}
                onHide={handleOnHide}
                header={
                    <TitleHeaderOnly
                        onClick={handleOnHide}
                        title={"Add Bank Information"}
                    />
                }
                contentComponent={<AddBankInformation
                    handleAddBankDetails={handleAddBankDetails}
                    setSidebarVisable={setSidebarVisible} />}
            />

            <Toast ref={toast} />

            {/* accounts */}

            <div className="company-main-text fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
                <h5>Accounts</h5>
                <div>
                    <Button
                        label=""
                        severity="primary"
                        icon="pi  pi-plus fw-normal fs-5"
                        onClick={addBankDetailsActionHandler}
                        size="small"
                    />
                </div>
            </div>

            {bankDetails ? (
                <>
                    {/* Map over the accountsData array to display account information */}
                    {accountsData.map((account) => (
                        <div key={account.personBankDetailsID} className="d-flex justify-content-start align-items-center mb-3 p-3 rounded border  p-2">
                            <div className="col-7 d-flex gap-3">
                                <Avatar size="xlarge" shape="circle">
                                    <i className="pi pi-shopping-bag fs-3"></i>
                                </Avatar>
                                <div className="gap-2">
                                    <label className="p-text-secondary">{account.accountName || ""}</label>
                                    <div className="d-flex gap-3 fw-bold">
                                        <p className="p-text-primary">{getDisplayedAccountNumber(account)}</p>
                                        <span className="mt-1" onClick={() => handleEyeIconClick(account.personBankDetailsID)}>
                                            <i className={showFullAccountNumber[account.personBankDetailsID] ? 'pi pi-eye-slash' : 'pi pi-eye'}></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div>
                                    <div>{"50%"}</div>
                                    <div className="fw-bold">{"$500"}</div>
                                </div>
                            </div>
                            <div className="col-2 cursor-pointer text-end">
                                {!isEdit && (
                                    <FiEdit2 className="m-1" size="1rem" onClick={() => { handleEditAccount(account.personBankDetailsID) }} />
                                )}
                                <AiOutlineDelete className="m-1" size="1rem" onClick={() => { handleDeleteAccount(account.personBankDetailsID) }} />
                            </div>
                        </div>
                    ))}

                    {isEdit && (
                        <Viewer
                            visible={isEdit}
                            onHide={handleCancelEdit}
                            header={
                                <TitleHeaderOnly
                                    onClick={handleCancelEdit}
                                    title={"Edit Bank Information"}
                                />
                            }
                            contentComponent={
                                <EditBankInformation
                                    onSubmit={onSubmit}
                                    handleCancel={handleCancelEdit}
                                    selectedAccount={accountsData.find(
                                        (account) => account.personBankDetailsID === selectedAccountId
                                    )}
                                />
                            }
                        />
                    )}


                    {/* Bank */}
                    <div className='mt-2'>
                        <div className="company-main-text fs-6 pt-3 pb-2 fw-bold d-flex justify-content-between align-items-center">
                            <h5>
                                Banking information
                            </h5>
                        </div>
                    </div>
                    <div className="rounded border p-2">
                        <div className="formgrid grid mt-2 mb-2">
                            <div className="col-12 md:col-4 mb-2">
                                <label className='p-text-secondary'>Name of the Bank</label>
                                <p className="p-text-primary">{selectedAccount.bankName || ""}</p>
                            </div>
                            <div className="col-12 md:col-4 mb-2">
                                <label className='p-text-secondary'>Account Number</label>
                                <p className="p-text-primary">{selectedAccount.accountNumber || ""}</p>
                            </div>
                            <div className="col-12 md:col-4 mb-2">
                                <label className='p-text-secondary'>Account Type (Checking, Savings)</label>
                                <p className="p-text-primary">{selectedAccount.accountType || ""}</p>
                            </div>

                            <div className="col-12 md:col-4">
                                <label className='p-text-secondary'>Routing Number or SWIFT Code</label>
                                <p className="p-text-primary">{selectedAccount.routingNumber || ""}</p>
                            </div>
                            <div className="col-12 md:col-4">
                                <label className='p-text-secondary'>Bank Address</label>
                                <p className="p-text-primary">{selectedAccount.branchName || ""}</p>
                            </div>
                            <div className="col-12 md:col-4">
                                <label className='p-text-secondary'>Bank Cheque</label>
                                <p className="p-text-primary">{selectedAccount.bankCheque || ""}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <p>No bank details available.</p>
                </div>
            )}
        </PlainLayout >
    )
}

export default EmployeeBankInformation