import { Sidebar } from 'primereact/sidebar';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useState } from 'react';
import './viewer.css';

const ViewerWithTabs = ({ visible, onHide, header, tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const showCloseIcon = false;
    const blockScroll = true;
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (event) => {
        const viewerBody = event.target;
        setScrollPosition(viewerBody.scrollTop);
    };


    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            position="right"
            showCloseIcon={showCloseIcon}
            blockScroll={blockScroll}
            className="w-75"
        >
            <div className="fixed viewer-header w-75">{header}</div>
            <div
                className={`fixed right-0 w-75 overflow-y-auto viewer-body ${scrollPosition > 0 && 'boxShadow'}`}
                onScroll={handleScroll}
            >
                <div className="test4">
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        {tabs.map((tab, index) => (
                            <TabPanel key={index} header={tab.label}>
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabView>
                </div>
            </div>
        </Sidebar>
    );
};

export default ViewerWithTabs;
