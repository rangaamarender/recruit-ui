import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import TitleHeader from '../header/TitleHeader';
import './viewer.css';
import { Button } from 'primereact/button';

const PayrollWizardComponent = ({ title, visible, onHide, steps }) => {
    const showCloseIcon = false;
    const blockScroll = true;
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = () => {
        alert('Wizard completed!');
    };

    const progress = Math.round(((currentStep + 1) / steps.length) * 100);

    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            position="right"
            showCloseIcon={showCloseIcon}
            blockScroll={blockScroll}
            className="w-75"
        >
            <div className="h-screen">
                <div style={{ height: '10vh' }} className="w-75 fixed overflow-hidden top-0">
                    <div style={{ height: '100%' }} className="p-sidebar-header  ">
                        <TitleHeader
                            onClick={onHide}
                            title={title}
                            nextStep={steps[currentStep].nextstep}
                            progress={progress}
                        />
                    </div>
                </div>

                <div className="surface-border border-round">
                    <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 wizard-body">
                        <h3>{steps[currentStep].name}</h3>
                        {steps[currentStep].component}
                    </div>
                </div>
                <div className="fixed bottom-0 right-0  w-75 h-custom-10  p-sidebar-header">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-2">
                        {currentStep > 0 && (
                            <Button
                                type="button"
                                label="Previous"
                                size="small"
                                severity="secondary"
                                onClick={handlePrevious}
                            />
                        )}
                        {currentStep < steps.length - 1 ? (
                            <Button onClick={handleNext} label="Next" size="small" severity="primary" />
                        ) : (
                            <Button
                                type="button"
                                label="Finish"
                                size="small"
                                severity="primary"
                                onClick={handleFinish}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default PayrollWizardComponent;
