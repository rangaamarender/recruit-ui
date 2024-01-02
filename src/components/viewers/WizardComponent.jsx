import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TitleHeader from '../header/TitleHeader';
import './viewer.css';
import { useSelector } from 'react-redux';

const WizardComponent = ({
    title,
    visible,
    onHide,
    steps,
    handleApiCall,
    payloadDataForApi,
    validationMode,
    validations,
}) => {
    // const visibleScrollbar = false;

    useEffect(() => {
        document.body.classList.toggle('hide-scroll', visible);
    }, [visible]);

    const showCloseIcon = false;
    const blockScroll = true;
    const [currentStep, setCurrentStep] = useState(0);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm();
    const [skip, setSkip] = useState(false);
    const [finish, setFinish] = useState(false);
    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState(Array(steps.length).fill(null));
    const [finalStep, setfinalStep] = useState(false);
    const [disable, setDisable] = useState(false);
    const [helper, setHelper] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [companiesDynamicData, setCompaniesDynamicData] = useState([]); 
    // const [special,setSpecial] = useState(false);
    const [contractsSuccessMsg,setContractsSuccessMsg] = useState(false);
    const data = watch();

    const validationHoursStep = useSelector((state) => state.timesheet.hoursStepValidationFunction);
    // const domainEmailValidation = useSelector((state)=>state.company.domainEmailValidation)

    const validateForm = validationMode ? validationHoursStep : null;

    // const domainEmail = validationMode
    //     ? domainEmailValidation : null;

    const handleNext = async () => {
        setContractsSuccessMsg(false);
        const customValidationFn = validations[currentStep];
        if (customValidationFn) {
            const validationError = await customValidationFn();
            console.log('Validation Error:', validationError);
            if (validationError) {
                setValidationErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[currentStep] = validationError;
                    return newErrors;
                });
                return;
            }
        }
        setValidationErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[currentStep] = null;
            return newErrors;
        });

        if (currentStep === 1 && validateForm && !(await validateForm())) return;
        // if (currentStep === 1 && domainEmail && !(await domainEmail())) return;

        // Standard logic for transitioning to the next step
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onSubmit = (data) => {
        setFormData({ ...formData, ...data });
        handleNext();

        console.log("formData", data);
    };

    const handleSkip = () => {
        setCurrentStep(currentStep + 1);
        setSkip(false);
    };

    const handlePrevious = () => {
        setContractsSuccessMsg(false);
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
        setSkip(false);
        setFinish(false);
        setDisable(false);
    };

    const handleFinish = async () => {
        const lastStepValidations = validations[validations.length - 1];

        if (lastStepValidations && finalStep) {
            const validationError = await lastStepValidations();
            console.log('Validation Error:', validationError);
            if (validationError) {
                setValidationErrors((prevErrors) => {
                    const newErrors = [...prevErrors];
                    newErrors[currentStep] = validationError;
                    return newErrors;
                });
                return;
            }
        }
        setValidationErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[currentStep] = null;
            return newErrors;
        });

        const transformedData = payloadDataForApi(formData);
        console.log('Final form data:', transformedData);

        // Make the API call using the provided function
        try {
            await handleApiCall(transformedData);
            setCompaniesDynamicData(formData); //dynamic created value adding to Filed
        } catch (error) {
            console.error('An error occurred:', error);
        }

        handleOnHide();
    };

    function getCurrentStepComponent() {
        return steps[currentStep].component;
    }

    const progress = Math.round(((currentStep + 1) / steps.length) * 100);
    // console.log(progress);
    const handleOnHide = () => {
        onHide();
        setCurrentStep(0);
        setFinish(false);
        reset();
        setValidationErrors('');
        setIsCheckboxChecked(false);
        setDisable(false);
    };
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (event) => {
        const viewerBody = event.target;
        setScrollPosition(viewerBody.scrollTop);
    };

    return (
        <Sidebar
            visible={visible}
            onHide={handleOnHide}
            position="right"
            showCloseIcon={showCloseIcon}
            blockScroll={blockScroll}
            className="w-75"
        >
            <div className="h-screen">
                <div
                    style={{ height: '10vh' }}
                    className={`w-75 fixed overflow-hidden top-0 ${scrollPosition > 0 && 'boxShadow'} `}
                >
                    <div style={{ height: '100%' }} className="p-sidebar-header  ">
                        <TitleHeader
                            onClick={handleOnHide}
                            title={title}
                            nextStep={steps[currentStep].nextStep}
                            progress={progress}
                        />
                    </div>
                </div>
                <div className="surface-border border-round ">
                    <div>
                        <div
                            className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 wizard-body"
                            onScroll={handleScroll}
                        >
                            <div>
                                <h3>{steps[currentStep].name}</h3>
                                <Controller
                                    name={`step${currentStep}`}
                                    control={control}
                                    render={({ field }) => (
                                        <React.Fragment>
                                            {React.createElement(getCurrentStepComponent(), {
                                                ...field,
                                                control,
                                                errors,
                                                setValue,
                                                watch,
                                                data,
                                                setSkip,
                                                currentStep,
                                                setCurrentStep,
                                                formData,
                                                setFormData,
                                                finish,
                                                setFinish,
                                                handleOnHide,
                                                validationErrors: validationErrors[currentStep],
                                                setValidationErrors,
                                                updateFinalstepState: setfinalStep,
                                                isCheckboxChecked,
                                                setIsCheckboxChecked,
                                                setDisable,
                                                companiesDynamicData,
                                                setCompaniesDynamicData,
                                                helper,
                                                setHelper,
                                                contractsSuccessMsg,
                                                setContractsSuccessMsg
                                            })}
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </div>
                        {!contractsSuccessMsg &&
                        <div className="fixed bottom-0 right-0  w-75 h-custom-10  p-sidebar-header">
                            <div className="flex justify-content-end px-5 py-2 align-items-center gap-2">
                                {skip === true && (
                                    <Button
                                        type="button"
                                        size="small"
                                        label="Skip"
                                        severity="secondary"
                                        onClick={handleSkip}
                                    />
                                )}
                                {currentStep > 0 && (
                                    <Button
                                        type="button"
                                        label="Previous"
                                        size="small"
                                        severity="secondary"
                                        onClick={handlePrevious}
                                    />
                                )}
                                {currentStep < steps.length - 1 && !finish ? (
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        label="Next"
                                        disabled={disable}
                                        size="small"
                                        severity="primary"
                                    />
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
}
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default WizardComponent;
