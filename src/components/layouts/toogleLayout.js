import React, { useState } from 'react';
import PlainLayout from './PlainLayout';
import { Sidebar } from 'primereact/sidebar';

const ToogleLayout = ({ menuItems, selectedItem }) => {
    const [visible, setVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(selectedItem);

    const sidebarStyle = {
        marginLeft: '-1.2vw',
        marginTop: '-2.5vh',
    };

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
        setVisible(false);
    };

    return (
        <PlainLayout>
            <Sidebar
                header={false}
                style={{ width: '220px' }}
                showCloseIcon={false}
                visible={visible}
                onHide={() => setVisible(false)}
            >
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`link ${selectedMenuItem === item.name ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick(item.name)}
                    >
                        <div className="d-flex gap-2 p-1 ">
                            <div className="col-1">{item.icon}</div>
                            <div className="col-2" style={{ width: '180px' }}>
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
            </Sidebar>
            <div style={sidebarStyle}>
                <div className="d-flex">
                    <div className="border-end  hidden lg:block">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`link ${selectedMenuItem === item.name ? 'active' : ''}`}
                                onClick={() => handleMenuItemClick(item.name)}
                            >
                                <div className="d-flex">
                                    <div className="col-2">{item.icon}</div>
                                    <div className="col-2" style={{ width: '160px' }}>
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <main className="my-3 w-12">
                        <div className="text-end mx-5 lg:hidden block">
                            <i className="pi pi-align-right cursor-pointer" onClick={() => setVisible(true)} />
                        </div>
                        <div className="mx-5 my-2 grid">
                            <div className="me-0 m-3 w-full">
                                {menuItems.find((item) => item.name === selectedMenuItem)?.component}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </PlainLayout>
    );
};

export default ToogleLayout;
