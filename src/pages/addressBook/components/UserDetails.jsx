import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import React, { useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';

function UserDetails({ allUsers, selectedCardId }) {
    const selectedUser = allUsers?.find((user) => user.id === selectedCardId);
    const [checked, setChecked] = useState(true);
    const [isHoveredEmail, setIsHoveredEmail] = useState(false);
    const [isHoveredPhone, setIsHoveredPhone] = useState(false);
    const [isEmailCopied, setIsEmailCopied] = useState(false);
    const [isPhoneCopied, setIsPhoneCopied] = useState(false);

    const showOverlayEmail = (event) => {
        setIsHoveredEmail(true);
    };

    const hideOverlayEmail = () => {
        setIsHoveredEmail(false);
    };

    const showOverlayPhone = (event) => {
        setIsHoveredPhone(true);
    };

    const hideOverlayPhone = () => {
        setIsHoveredPhone(false);
    };

    const handleCopyToClipBoardEmail = async (fieldValue) => {
        if (isEmailCopied) {
            navigator.clipboard
                .writeText('')
                .then(() => setIsEmailCopied(false))
                .catch((error) => console.error('Failed to copy: ', error));
        } else {
            navigator.clipboard
                .writeText(fieldValue)
                .then(() => setIsEmailCopied(true))
                .catch((error) => console.error('Failed to copy: ', error));
        }
    };

    const handleCopyToClipBoardPhone = async (fieldValue) => {
        if (isPhoneCopied) {
            navigator.clipboard
                .writeText('')
                .then(() => setIsPhoneCopied(false))
                .catch((error) => console.error('Failed to copy: ', error));
        } else {
            navigator.clipboard
                .writeText(fieldValue)
                .then(() => setIsPhoneCopied(true))
                .catch((error) => console.error('Failed to copy: ', error));
        }
    };

    return (
        <>
            {selectedUser ? (
                <>
                    <div className="border-bottom m-0 p-3  flex justify-content-between align-items-start gap-2 p-2">
                        <div className=" flex justify-content-start align-items-center gap-2">
                            <div>
                                <Image
                                    src={selectedUser?.image}
                                    alt="Image"
                                    width="80"
                                    height="80"
                                    style={{
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            </div>
                            <div>
                                <div className="flex flex justify-content-start align-items-center gap-2">
                                    <div className="company-main-text p-0 fs-5 fw-bold mb-0 cursor-pointer">
                                        {selectedUser?.firstName} {selectedUser?.lastName}
                                        <Button text className="p-0 fw-normal" icon="pi pi-pencil" iconPos="right" />
                                    </div>
                                </div>
                                <div className="flex flex justify-content-start align-items-center gap-2">
                                    <div className="p-text-secondary p-0 mb-0 fs-6">{selectedUser?.domain}</div>
                                </div>

                                <div className=" d-flex justify-content-start align-items-center gap-3 mt-2">
                                    <Button
                                        text
                                        label="Email"
                                        size="small"
                                        className="bg-white  w-auto p-1"
                                        icon="pi pi-envelope "
                                        tooltip={`Send an Email to ${selectedUser?.firstName}`}
                                        tooltipOptions={{ position: 'bottom' }}
                                    />
                                    <Button
                                        text
                                        label="Call"
                                        size="small"
                                        icon="pi pi-phone"
                                        className="bg-white w-auto p-1"
                                        tooltip={`Audio call with ${selectedUser?.firstName}`}
                                        tooltipOptions={{ position: 'bottom' }}
                                    />
                                    <Button
                                        text
                                        label="Chat"
                                        size="small"
                                        className="bg-white  w-auto p-1"
                                        icon="pi pi-comment"
                                        tooltip={`Start a Chat with ${selectedUser?.firstName}`}
                                        tooltipOptions={{ position: 'bottom' }}
                                    />
                                    <Button
                                        text
                                        label="View"
                                        size="small"
                                        className="bg-white  w-auto p-1"
                                        icon="pi pi-eye"
                                        tooltip={`View ${selectedUser?.firstName}'s profile`}
                                        tooltipOptions={{ position: 'bottom' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" flex justify-content-start align-items-center gap-2">
                            <label htmlFor="inputswitch"> Status:</label>
                            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                        </div>
                    </div>

                    <div className="row p-4">
                        <div className="col-6  p-2 ">
                            <p className="p-text-secondary p-0 mb-0">First Name</p>
                            <p className="p-text-primary p-0  mb-0 fw-bold">{selectedUser?.firstName}</p>
                        </div>
                        {/* 2 */}
                        <div className="col-6  p-2  ">
                            <p className="p-text-secondary p-0 mb-0">Last Name</p>
                            <p className="p-text-primary p-0  mb-0 fw-bold">{selectedUser?.lastName}</p>
                        </div>
                        {/* 3 */}
                        <div className="col-6 mt-4 ">
                            <div
                                className=" p-0  mb-0 fw-bold  cursor-pointer"
                                onMouseEnter={showOverlayEmail}
                                onMouseLeave={hideOverlayEmail}
                            >
                                {isHoveredEmail ? (
                                    <div className="hoverable-div ">
                                        <div className="p-text-secondary mb-0">Email</div>
                                        <div
                                            className="flex
                                                justify-content-between
                                                align-items-center
                                                // gap-2"
                                        >
                                            <div className="p-text-primary"> {selectedUser?.email} </div>

                                            <div className="flex justify-content-center align-items-center">
                                                {isEmailCopied ? <div>Copied</div> : ''}
                                                <div className="copyIcon">
                                                    <i
                                                        className={`pi pi-copy  ${isEmailCopied && 'pi pi-check'}`}
                                                        onClick={() => handleCopyToClipBoardEmail(selectedUser.email)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        <div className="p-text-secondary p-0 mb-0">Email</div>
                                        <div className="p-text-primary"> {selectedUser?.email}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 4 */}

                        <div className="col-6 mt-4 ">
                            <div
                                className="p-text-secondary p-0  mb-0 fw-bold  cursor-pointer"
                                onMouseEnter={showOverlayPhone}
                                onMouseLeave={hideOverlayPhone}
                            >
                                {isHoveredPhone ? (
                                    <div className="hoverable-div ">
                                        <div className="p-text-secondary mb-0">Phone Number</div>
                                        <div
                                            className="flex
                                                justify-content-between
                                                align-items-center
                                                // gap-2"
                                        >
                                            <div className="p-text-primary"> {selectedUser?.phone} </div>

                                            <div className="flex justify-content-center align-items-center">
                                                {isPhoneCopied ? <div>Copied</div> : ''}
                                                <div className="copyIcon">
                                                    <i
                                                        className={`pi pi-copy  ${isPhoneCopied && 'pi pi-check'}`}
                                                        onClick={() => handleCopyToClipBoardPhone(selectedUser.phone)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        <div className="p-text-secondary p-0 mb-0">Phone Number</div>
                                        <div className="p-text-primary"> {selectedUser?.phone}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 5 */}
                        <div className="col-6 mt-4">
                            <p className=" p-0 mb-0 p-text-secondary">Created On</p>
                            <p className="p-text-primary  p-0  mb-0 fw-bold">{selectedUser?.ssn}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="h-50 flex justify-content-center align-items-center fs-4">
                    Select a user to view their details.
                </div>
                // <UsersDetailsSkeleton />
            )}
        </>
    );
}

export default UserDetails;
