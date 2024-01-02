import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ActionBar from './ActionBar';
import { TabView, TabPanel } from 'primereact/tabview';

import './tabMenu.css';

const TabMenuContainer = ({ tabItems, actionButtons }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (e) => {
        setActiveTab(e?.index);
    };

    return (
        <>
            <div>
                <div className="left-side">
                    <TabView activeIndex={activeTab} onTabChange={handleTabChange}>
                        {tabItems?.map((tab, index) => (
                            <TabPanel key={index} header={tab.label}>
                                {tab.content}
                            </TabPanel>
                        ))}

                        <TabPanel
                            className="right-side"
                            headerTemplate={<ActionBar actionButtons={actionButtons} />}
                        ></TabPanel>
                    </TabView>
                </div>
            </div>
        </>
    );
};

TabMenuContainer.propTypes = {
    tabItems: PropTypes.array.isRequired,
    actionButtons: PropTypes.array.isRequired,
};

export default TabMenuContainer;
