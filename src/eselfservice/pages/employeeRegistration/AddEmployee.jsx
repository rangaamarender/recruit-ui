// import TitleHeader from '../../../../components/header/TitleHeader';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import TitleHeader from '../../../components/header/TitleHeader';

function AddEmployee({title, visible, onHide, steps, handleApiCall, payloadDataForApi}) {

  // const [visibleScrollbar, setVisibleScrollbar] = useState(false);
  // console.log(setVisibleScrollbar);

  // useEffect(() => {
  //   document.body.classList.toggle('hide-scroll', visibleScrollbar);
  // }, [visibleScrollbar]);

  // const showCloseIcon = false;
  // const blockScroll = true;
  const [currentStep, setCurrentStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [skip, setSkip] = useState(false);
  const [finish, setFinish] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState(Array(steps.length).fill(null));
  // const [finalStep, setfinalStep] = useState(false);

  const data = watch();

  const handleNext = async () => {

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    handleNext();
  };

  const handleSkip = () => {
    setCurrentStep(currentStep + 1);
    setSkip(false);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
    setSkip(false);
    setFinish(false);
  };

  const handleFinish = async () => {

    console.log(formData, "formData")

    const transformedData = payloadDataForApi(formData);
    console.log('Final form data:', transformedData);

    // Make the API call using the provided function
    try {
      await handleApiCall(transformedData);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function getCurrentStepComponent() {
    return steps[currentStep].component;
  }

  const progress = ((currentStep + 1) / steps.length) * 100;


  return (

    <div className='custom-addemployee'>
    <div className="d-flex align-items-center gap-4">

      <div>
        <div className="p-sidebar-header w-100">
          <TitleHeader
            // onClick={handleOnHide}
            title={title}
            nextStep={steps[currentStep].nextStep}
            progress={progress}
          />
        </div>
        <div className="surface-border border-round">
          <div className="d-flex align-items-center justify-content-center gap-4">
            <div className="">
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
                      validationErrors: validationErrors[currentStep],
                      setValidationErrors,
                      // updateFinalstepState: setfinalStep,

                    })}
                  </React.Fragment>
                )}
              />
            </div>
            <div className="sidebar-footer">
              {skip === true && (
                <Button
                  type="button"
                  className="mr-5"
                  size="small"
                  label="Skip"
                  severity="secondary"
                  onClick={handleSkip}
                />
              )}
              {currentStep > 0 && (
                <Button
                  type="button"
                  className="mr-5"
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
                  severity="info"
                  size="small"
                  className="mr-5"
                />
              ) : (
                <Button
                  type="button"
                  label="Finish"
                  className="mr-5"
                  size="small"
                  severity="success"
                  onClick={handleFinish}
                />
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default AddEmployee