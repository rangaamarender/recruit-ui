import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';

function WorkorderTypeStep({ control, errors }) {
    // const options = [
    //     { value: 'option1', label: 'option1' },
    //     { value: 'option2', label: 'option 2' },
    //     { value: 'option3', label: 'option 3' },
    //     { value: 'option4', label: 'option 4' },
    // ];

    const [selectedType, setSelectedType] = useState('');
    const [selectedRateType, setSelectedRateType] = useState('');

    const handleTypeChange = (type) => {
        setSelectedType(type);
        // Reset the rate type when the workorder type changes
        setSelectedRateType('');
    };

    return (
        <>
            <div className="flex-wrap gap-3 p-fluid">
                <div className="md:flex">
                    <div className="md:col-12">
                        <div className="p-formgroup-inline">
                            <div className="p-field-radiobutton mb-2">
                                <RadioButton
                                    inputId="singleResource"
                                    name="workorderType"
                                    value="singleResource"
                                    onChange={() => handleTypeChange('singleResource')}
                                    checked={selectedType === 'singleResource'}
                                    className='me-2'
                                />
                                <label htmlFor="singleResource">Single Resource</label>
                            </div>
                            <div className="p-field-radiobutton">
                                <RadioButton
                                    inputId="multipleResource"
                                    name="workorderType"
                                    value="multipleResource"
                                    onChange={() => handleTypeChange('multipleResource')}
                                    checked={selectedType === 'multipleResource'}
                                    className='me-2'
                                />
                                <label htmlFor="multipleResource">Multiple Resource</label>
                            </div>
                        </div>
                    </div>
                </div>

                <>
                    {selectedType === 'multipleResource' && (
                        <div className="">
                            <h4 className='text-center'>Select Rates</h4>
                            <div className="md:col-12">
                                <div className="p-formgroup-inline">
                                    <div className="p-field-radiobutton mb-2">
                                        <RadioButton
                                            inputId="individualRates"
                                            name="rateType"
                                            value="individualRates"
                                            onChange={() => setSelectedRateType('individualRates')}
                                            checked={selectedRateType === 'individualRates'}
                                            className='me-2'
                                        />
                                        <label htmlFor="individualRates">Individual Rates</label>
                                    </div>
                                    <div className="p-field-radiobutton">
                                        <RadioButton
                                            inputId="blendedRates"
                                            name="rateType"
                                            value="blendedRates"
                                            onChange={() => setSelectedRateType('blendedRates')}
                                            checked={selectedRateType === 'blendedRates'}
                                            className='me-2'
                                        />
                                        <label htmlFor="blendedRates">Blended Rates</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            </div>
        </>
    );
}

export default WorkorderTypeStep;
