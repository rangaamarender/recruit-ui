import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Tag } from 'primereact/tag';
import React, { useRef } from 'react';
import handleViewerActionMenu from './handleViewerActionMenu';
import { viewerHeaderActionMenu } from './viewerHeaderActionMenu';

const ResourceViewerHeader = () => {

    const addButtonMenu = useRef(null)
    // const handleHideSidebar = () => {
    //     setViewCompanySidebar(false);
    // };
    // const actions = {
    //     navigateToNotesTab,
    //     navigateToTimeSheetTab,
    //     handleAddDocuments,
    //   };
    return (
        <>
            <div className="d-flex">
                <div className="company-layout-bg m-0 d-flex justify-content-between align-items-center gap-3 p-0  ">
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <Avatar size="xlarge" shape="circle">
                            <i className="pi pi-shopping-bag fs-3"></i>
                        </Avatar>
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                                <div className="company-main-text p-0 fs-6 fw-bold mb-0 mr-2">Abhilash Bande</div>
                                <div className="p-0 fs-6 ">W2 Employee</div>
                                <Tag className="company-secondary-btn " value="Submitted "></Tag>
                            </div>

                            <div className=" d-flex justify-content-start align-items-center gap-3 mt-2">
                                <Button
                                    text
                                    label="Email"
                                    size="small"
                                    className="bg-white company-secondary-text w-auto p-1"
                                    icon="pi pi-envelope "
                                />
                                <Button
                                    text
                                    label="Call"
                                    size="small"
                                    icon="pi pi-phone"
                                    className="bg-white company-secondary-text w-auto p-1"
                                />
                                <Button
                                    text
                                    label="Chat"
                                    size="small"
                                    className="bg-white company-secondary-text w-auto p-1"
                                    icon="pi pi-comment"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-start ms-auto   gap-1">
                    <Menu
                        model={viewerHeaderActionMenu.map((item) => ({
                            label: item.label,
                            command: (event) => handleViewerActionMenu(event, item),
                        }))}
                        popup
                        ref={addButtonMenu}
                        id="popup_menu_left"
                        className="w-auto"
                    />
                    <i
                        className="pi pi-ellipsis-v cursorPointer p-1"
                        onClick={(event) => addButtonMenu.current.toggle(event)}
                        size="small"
                    />

                    <div
                        className="pi pi-times-circle fs-5 p-1 "
                        // onClick={handleHideSidebar}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default ResourceViewerHeader;
