// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { Avatar } from 'primereact/avatar';
// import { FiEdit2 } from 'react-icons/fi';
// import { AiOutlineDelete } from 'react-icons/ai';
// const BankInfo = () => {
//     const [selectedAccountId, setSelectedAccountId] = useState(null);
//     const [accountsData, setAccountsData] = useState([
//         {
//             id: 1,
//             accountName: 'Account 1',
//             accountNumber: '1234 5678 9012 3456',
//             percentage: '56%',
//             balance: '$4380.00',
//             // Other banking information for Account 1
//             bankInfo: {
//                 bankName: 'Bank ABC',
//                 accountType: 'Checking',
//                 routingOrSwift: '123456789',
//                 bankAddress: '123 Main Street, City, Country',
//                 bankCheque: 'Yes',
//             },
//         },
//         {
//             id: 2,
//             accountName: 'Account 2',
//             accountNumber: '1234 3328 9012 2208',
//             percentage: '44%',
//             balance: '$3805.00',
//             // Other banking information for Account 1
//             bankInfo: {
//                 bankName: 'Bank XYZ',
//                 accountType: 'Checking',
//                 routingOrSwift: '012332141',
//                 bankAddress: '223 Main Street, City, Country',
//                 bankCheque: 'Yes',
//             },
//         },
//     ]);
//     const selectedAccount = accountsData.find((account) => account.id === selectedAccountId) || accountsData[0];

//     return (
//         <>
//             <div className="company-main-text fs-6 p-2 fw-bold d-flex justify-content-between align-items-center">
//                 <div>Accounts</div>
//                 <div>
//                     <Button
//                         label="ACCOUNT"
//                         severity="primary"
//                         icon="pi pi-plus"
//                         // onClick={addEmergencyContactActionHandler}
//                         size="small"
//                     />
//                 </div>
//             </div>

//             {/* Map over the accountsData array to display account information */}
//             {accountsData.map((account) => (
//                <div className='p-2'>
//                  <div
//                     key={account.id}
//                     className="d-flex justify-content-start align-items-center mb-2 rounded border p-2"
//                 >
//                     <div className="col-7 d-flex gap-3">
//                         <Avatar size="xlarge" shape="circle">
//                             <i className="pi pi-shopping-bag fs-3"></i>
//                         </Avatar>
//                         <div className="gap-2">
//                             <label className="p-text-secondary">{account.accountName}</label>
//                             <div className="d-flex gap-3 fw-bold">
//                                 {/* <p className="p-text-primary">{getDisplayedAccountNumber(account)}</p> */}
//                                 <span className="mt-1"
//                                 // onClick={() => handleEyeIconClick(account.id)}
//                                 >
//                                     <i
//                                         // className={showFullAccountNumber[account.id] ? 'pi pi-eye-slash' : 'pi pi-eye'}
//                                     ></i>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-3">
//                         <div>
//                             <div>{account.percentage}</div>
//                             <div className="fw-bold">{account.balance}</div>
//                         </div>
//                     </div>
//                     <div className="col-2 cursor-pointer text-end">
//                         {/* {!isEdit && (
//                             <FiEdit2
//                                 className="m-1"
//                                 size="1rem"
//                                 onClick={() => {
//                                     // handleEditAccount(account.id);
//                                 }}
//                             />
//                         )}
//                         <AiOutlineDelete
//                             className="m-1"
//                             size="1rem"
//                             onClick={() => {
//                                 // handleDeleteAccount(account.id);
//                             }}
//                         /> */}
//                     </div>
//                 </div>
//                </div>
//             ))}

//             {/* {isEdit && (
//                 <Viewer
//                     visible={isEdit}
//                     onHide={handleCancelEdit}
//                     header={<TitleHeaderOnly onClick={handleCancelEdit} title={'Edit Bank Information'} />}
//                     contentComponent={
//                         <EditBankInformation
//                             onSubmit={onSubmit}
//                             handleCancel={handleCancelEdit}
//                             selectedAccount={accountsData.find((account) => account.id === selectedAccountId)}
//                         />
//                     }
//                 />
//             )} */}
//             <div className="company-main-text p-2 fw-bold d-flex justify-content-between align-items-center">
//                 <h5>Banking information</h5>
//             </div>
//             <div className="p-2">
//                 <div className="rounded border p-2">
//                     <div className="formgrid grid mt-2 mb-2">
//                         <div className="col-12 md:col-4 mb-2">
//                             <label className="p-text-secondary">Name of the Bank</label>
//                             <p className="p-text-primary">{selectedAccount.bankInfo.bankName}</p>
//                         </div>
//                         <div className="col-12 md:col-4 mb-2">
//                             <label className="p-text-secondary">Account Number</label>
//                             <p className="p-text-primary">{selectedAccount.accountNumber}</p>
//                         </div>
//                         <div className="col-12 md:col-4 mb-2">
//                             <label className="p-text-secondary">Account Type (Checking, Savings)</label>
//                             <p className="p-text-primary">{selectedAccount.bankInfo.accountType}</p>
//                         </div>

//                         <div className="col-12 md:col-4">
//                             <label className="p-text-secondary">Routing Number or SWIFT Code</label>
//                             <p className="p-text-primary">{selectedAccount.bankInfo.routingOrSwift}</p>
//                         </div>
//                         <div className="col-12 md:col-4">
//                             <label className="p-text-secondary">Bank Address</label>
//                             <p className="p-text-primary">{selectedAccount.bankInfo.bankAddress}</p>
//                         </div>
//                         <div className="col-12 md:col-4">
//                             <label className="p-text-secondary">Bank Cheque</label>
//                             <p className="p-text-primary">{selectedAccount.bankInfo.bankCheque}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default BankInfo;

import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Toast } from 'primereact/toast';
import Viewer from '../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import EditBankInformation from '../../../eselfservice/pages/bankInformation/container/EditBankInformation';

function BankInfo() {
    const toast = useRef();

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [showFullAccountNumber, setShowFullAccountNumber] = useState({});
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [editedAccount, setEditedAccount] = useState(null);
    const [accountsData, setAccountsData] = useState([
        {
            id: 1,
            accountName: 'Account 1',
            accountNumber: '1234 5678 9012 3456',
            percentage: '56%',
            balance: '$4380.00',
            // Other banking information for Account 1
            bankInfo: {
                bankName: 'Bank ABC',
                accountType: 'Checking',
                routingOrSwift: '123456789',
                bankAddress: '123 Main Street, City, Country',
                bankCheque: 'Yes',
            },
        },
        {
            id: 2,
            accountName: 'Account 2',
            accountNumber: '1234 3328 9012 2208',
            percentage: '44%',
            balance: '$3805.00',
            // Other banking information for Account 1
            bankInfo: {
                bankName: 'Bank XYZ',
                accountType: 'Checking',
                routingOrSwift: '012332141',
                bankAddress: '223 Main Street, City, Country',
                bankCheque: 'Yes',
            },
        },
    ]);

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

    // const handleEditAccount = (accountId) => {
    //     const accountToEdit = accountsData.find((account) => account.id === accountId);
    //     setEditedAccount(accountToEdit);
    //     setIsEdit(true);
    //   };
    //   const handleEditAccount = (accountId) => {
    //     setSelectedAccountId(accountId);
    //     const accountToEdit = accountsData.find((account) => account.id === accountId);
    //     setEditedAccount(accountToEdit);
    //     setIsEdit(true);
    //   };

    const handleEditAccount = (accountId) => {
        setSelectedAccountId(accountId);
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    const addEmergencyContactActionHandler = () => {
        setSidebarVisible(true);
    };

    const closeemergencyContactActionHandler = () => {
        setSidebarVisible(false);
    };

    // const toggleAccountNumberVisibility = (accountId) => {
    //     setShowFullAccountNumber((prevState) => ({
    //         ...prevState,
    //         [accountId]: !prevState[accountId],
    //     }));
    // };

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
        const accountId = account.id;
        if (showFullAccountNumber[accountId]) {
            return account.accountNumber;
        } else {
            // Display only the last four digits
            const lastFourDigits = account.accountNumber.slice(-4);
            return `xxxx xxxx xxxx ${lastFourDigits}`;
        }
    };

    // Function to handle click on the eye icon
    // const handleEyeIconClick = (accountId) => {
    //     // selectedAccountId = accountId
    //     setSelectedAccountId(accountId);
    //     toggleAccountNumberVisibility(accountId);
    // };

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

    const selectedAccount = accountsData.find((account) => account.id === selectedAccountId) || accountsData[0];

    return (
        <div>
          <Toast ref={toast}/>
            <div>
                <Viewer
                    visible={sidebarVisible}
                    onHide={closeemergencyContactActionHandler}
                    header={
                        <TitleHeaderOnly onClick={closeemergencyContactActionHandler} title={'Add Bank Information'} />
                    }
                    contentComponent={''}
                />
            </div>

            {/* accounts */}

            <div className="company-main-text fs-6 p-3 fw-bold d-flex justify-content-between align-items-center">
                <div>Accounts</div>
                <div>
                    <Button
                        label="ACCOUNT"
                        severity="primary"
                        icon="pi pi-plus"
                        onClick={addEmergencyContactActionHandler}
                        size="small"
                    />
                </div>
            </div>

            {/* Map over the accountsData array to display account information */}
            <div className="p-2">
                {accountsData.map((account) => (
                    <div
                        key={account.id}
                        className="d-flex justify-content-start align-items-center mb-3  rounded border p-2"
                    >
                        <div className="col-7 d-flex gap-3">
                            <Avatar size="xlarge" shape="circle">
                                <i className="pi pi-shopping-bag fs-3"></i>
                            </Avatar>
                            <div className="gap-2">
                                <label className="p-text-secondary">{account.accountName}</label>
                                <div className="d-flex gap-3 fw-bold">
                                    <p className="p-text-primary">{getDisplayedAccountNumber(account)}</p>
                                    <span
                                        className="mt-1 cursor-pointer"
                                        onClick={() => handleEyeIconClick(account.id)}
                                    >
                                        <i
                                            className={
                                                showFullAccountNumber[account.id] ? 'pi pi-eye-slash' : 'pi pi-eye'
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div>
                                <div>{account.percentage}</div>
                                <div className="fw-bold">{account.balance}</div>
                            </div>
                        </div>
                        <div className="col-2 cursor-pointer text-end">
                            {!isEdit && (
                                <FiEdit2
                                    className="m-1"
                                    size="1rem"
                                    onClick={() => {
                                        handleEditAccount(account.id);
                                    }}
                                />
                            )}
                            <AiOutlineDelete
                                className="m-1"
                                size="1rem"
                                onClick={() => {
                                    handleDeleteAccount(account.id);
                                }}
                            />
                        </div>
                    </div>
                ))}

                {isEdit && (
                    <Viewer
                        visible={isEdit}
                        onHide={handleCancelEdit}
                        header={<TitleHeaderOnly onClick={handleCancelEdit} title={'Edit Bank Information'} />}
                        contentComponent={
                            <EditBankInformation
                                onSubmit={onSubmit}
                                handleCancel={handleCancelEdit}
                                selectedAccount={accountsData.find((account) => account.id === selectedAccountId)}
                            />
                        }
                    />
                )}
            </div>

            {/* Bank */}
            <div className="">
                <div className="company-main-text fs-6 p-2 fw-bold d-flex justify-content-between align-items-center">
                    <div>Banking information</div>
                </div>
            </div>
            <div className="p-2">
                <div className="rounded border p-2">
                    <div className="formgrid grid mt-2 mb-2">
                        <div className="col-12 md:col-4 mb-2">
                            <label className="p-text-secondary">Name of the Bank</label>
                            <p className="p-text-primary">{selectedAccount.bankInfo.bankName}</p>
                        </div>
                        <div className="col-12 md:col-4 mb-2">
                            <label className="p-text-secondary">Account Number</label>
                            <p className="p-text-primary">{selectedAccount.accountNumber}</p>
                        </div>
                        <div className="col-12 md:col-4 mb-2">
                            <label className="p-text-secondary">Account Type (Checking, Savings)</label>
                            <p className="p-text-primary">{selectedAccount.bankInfo.accountType}</p>
                        </div>

                        <div className="col-12 md:col-4">
                            <label className="p-text-secondary">Routing Number or SWIFT Code</label>
                            <p className="p-text-primary">{selectedAccount.bankInfo.routingOrSwift}</p>
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="p-text-secondary">Bank Address</label>
                            <p className="p-text-primary">{selectedAccount.bankInfo.bankAddress}</p>
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="p-text-secondary">Bank Cheque</label>
                            <p className="p-text-primary">{selectedAccount.bankInfo.bankCheque}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankInfo;
