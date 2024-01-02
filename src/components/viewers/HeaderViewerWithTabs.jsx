import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react';

const HeaderViewerWithTabs = ({
    onClick,
    name,
    buttons,
    options,
    employeeType,
    tags,
    buttonFlag,
    showTag,
    location,
}) => {
    const overlayRef = useRef(null);

    const renderButtons = () => {
        if (buttons && buttons.length > 0) {
            return (
                <div className="d-flex justify-content-start align-items-center gap-1">
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            size="small"
                            label={button.label}
                            icon={`pi ${button.icon}`}
                            severity="secondary"
                            onClick={button.action}
                        />
                    ))}
                </div>
            );
        }
        return null;
    };

    const renderOptions = () => {
        if (options && options.length > 0) {
            return (
                <div>
                    {buttonFlag ? (
                        <Button
                            
                            size="small"
                            severity="secondary"
                            label=" + Add "
                            onClick={(event) => overlayRef.current.toggle(event)}
                        />
                    ) : (
                        <i
                            className="pi pi-ellipsis-v cursor-pointer p-1"
                            size="small"
                            onClick={(event) => overlayRef.current.toggle(event)}
                        />
                    )}

                    <Menu
                        model={options.map((option) => ({
                            label: option.label,
                            command: option.action,
                        }))}
                        popup
                        ref={overlayRef}
                        id="popup_menu_left"
                        className="w-auto"
                    />
                </div>
            );
        }
        return null;
    };

    const renderTag = () => {
        if (showTag) {
            return <Tag severity="success"  value={tags}></Tag>;
        }
        return null;
    };

    return (
        <div className="d-flex justify-content-between align-items-start h-full p-sidebar-header p-3 border-bottom">
            <div className="d-flex justify-content-between align-items-center gap-3 w-full">
                <div className="d-flex justify-content-start align-items-center gap-3">
                    <Avatar size="xlarge" shape="circle" className="">
                        <i className="pi pi-shopping-bag fs-3 "></i>
                    </Avatar>
                    <div>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                            <div className="company-main-text p-0 fs-6 fw-bold mb-0 mr-2">{name}</div>
                            <div className="p-0 fs-6 ">{employeeType}</div>
                            {renderTag()}
                        </div>
                        <div className="d-flex justify-content-start align-items-center gap-3 mt-2 fs-6">
                            {location}
                        </div>
                        {renderButtons()}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2">
                {renderOptions()}
                <div className="customDivider"></div>
                <div>
                <Button icon="pi pi-times" rounded onClick={onClick} style={{ width: '30px', height: '30px' }} />
                </div>    
            </div>
        </div>
    );
};

export default HeaderViewerWithTabs;
