import React from 'react'
import CustomDropdown from '../../../components/controls/CustomDropdown';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputFile from '../../../components/controls/CustomInputFile';
import CustomCalender from '../../../components/controls/CustomCalender';



function Documents({ control, errors }) {
    const required = false;

    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];
    return (
        <div class="formgrid grid mb-6">
            <div class=" col-12">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="documentType"
                    labelId="Document Type"
                    defaultValue=""
                    options={options}
                    required={required}
                    requiredMsg="Document type is required"
                    placeholder="--"
                    autoFocus
                />
            </div>

            <div class=" col-12 md:col-6">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="docnumber"
                    labelId="Number"
                    defaultValue=""
                    required={required}
                    requiredMsg="Document number is required"
                    placeholder="---"

                />
            </div>
            <div class=" col-12 md:col-3">
                <CustomCalender
                    control={control}
                    errors={errors}
                    name="issueDate"
                    labelId="Issue Date"
                    requiredMsg="Issue date isrequired"
                    defaultValue=""
                    showIcon={true}
                    required={required}

                />
            </div>

            <div class=" col-12 md:col-3">
                <CustomCalender
                    control={control}
                    errors={errors}
                    name="expDate"
                    labelId="Exp Date"
                    requiredMsg="Exp date is required"
                    defaultValue=""
                    showIcon={true}
                    required={required}

                />

            </div>
            <div class=" col-12 profilepic-border rounded rounded p-5 d-flex justify-content-center align-items-center">
                <div className=''>
                    <CustomInputFile
                        control={control}
                        errors={errors}
                        name="document"
                        requiredMsg="Document is required"
                        defaultValue=""
                        required={required}
                    />
                  <span>JPG, PNG,DOC or PDF smaller than 30 MB</span>
                </div>
          </div>      
        </div>
    )
}

export default Documents