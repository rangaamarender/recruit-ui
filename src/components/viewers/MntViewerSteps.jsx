import { Sidebar } from 'primereact/sidebar';
import React from 'react';
import './viewer.css';
import 'react-circular-progressbar/dist/styles.css';
import TitleHeader from '../header/TitleHeader';
import { Button } from 'primereact/button';

const MntViewerSteps = ({ title, visible, onHide, contentComponent }) => {
    const showCloseIcon = false;
    const blockScroll = true;
    const percentage = 66;
    return (
        <Sidebar visible={visible} onHide={onHide} fullScreen showCloseIcon={showCloseIcon} blockScroll={blockScroll}>
            <div class="container">
                <div className="surface-card p-4  border-round">
                    <div className="surface-border border-round mb-3">
                        <TitleHeader title={title} progress={percentage} />
                    </div>
                    <div className="surface-border border-round p-4">{contentComponent}</div>
                    <div className="surface-border border-round mt-3 p-4"></div>
                </div>

                <div className="sidebar-footer">
                    <Button label="Cancel" className="mr-5" severity="secondary" size="small" />
                    <Button label="Next" className="mr-5" size="small" />
                </div>
            </div>
        </Sidebar>
    );
};

export default MntViewerSteps;
