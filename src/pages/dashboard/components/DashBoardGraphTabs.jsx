import { TabPanel, TabView } from 'primereact/tabview';
import React, { useState } from 'react';
import { dashBoardTabs } from '../config/dashBoardTabs';

const DashBoardGraphTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (e) => {
        setActiveTab(e?.index);
    };
    return (
        <>
            <TabView activeIndex={activeTab} onTabChange={handleTabChange}>
                {dashBoardTabs?.map((tab, index) => (
                    <TabPanel key={index} header={tab.label}>
                        {tab.content}
                    </TabPanel>
                ))}

                <TabPanel
                    className="d-flex justify-content-center align-items-center ms-auto p-2 gap-3 fw-bold"
                    headerTemplate={
                        <>
                            <span className="text-primary">Active</span>
                            <span className="text-warning">Expired</span>
                        </>
                    }
                ></TabPanel>
            </TabView>
        </>
    );
};

export default DashBoardGraphTabs;
