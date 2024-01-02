import React, { useState } from 'react'
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomInputFile from '../../../../components/controls/CustomInputFile';
import CustomCalender from '../../../../components/controls/CustomCalender';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';

function AddDocuments({ setSidebarVisable }) {
    const required = false;
    // const [check, setCheck] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const [expiryDate, setExpiryDate] = useState(''); // State to track expiry date
    const [isReminderEnabled, setIsReminderEnabled] = useState(false); // State to enable/disable reminder dropdown
    const [selectedReminderPeriod, setSelectedReminderPeriod] = useState('');
    const [error, setError] = useState('');


    const monthsOptions = [
        { value: '1w', label: '1 Week' },
        { value: '2w', label: '2 Weeks' },
        { value: '3w', label: '3 Weeks' },
        { value: '1m', label: '1 Month' },
        { value: '2m', label: '2 Months' },
        { value: '3m', label: '3 Months' },
        { value: '6m', label: '6 Months' },
        { value: '9m', label: '9 Months' },
    ];

    // const reminderLabels = {
    //     '1w': '1 Week',
    //     '2w': '2 Weeks',
    //     '3w': '3 Weeks',
    //     '1m': '1 Month',
    //     '2m': '2 Months',
    //     '3m': '3 Months',
    //     '6m': '6 Months',
    //     '9m': '9 Months'
    // };
    // const selectedLabel = reminderLabels[selectedReminderPeriod] || '';

    const handleExpiryDateChange = (event) => {
        const date = event.target.value;
        setExpiryDate(date);
        setIsReminderEnabled(!!date);
        setSelectedReminderPeriod(''); // Reset selected reminder when date changes

    };

    const handleReminderMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedReminderPeriod(selectedMonth);
        setError(''); // Reset error when a month is selected
    };

    const handleCheckboxClick = () => {
        if (!selectedReminderPeriod && isReminderEnabled) {
            setError('Select a month before checking Reminder.');
        } else {
            setError('');
            // setIsReminderEnabled(!isReminderEnabled);
            setSelectedReminderPeriod(''); // Reset selected reminder when checkbox toggles
        }
    };

    const onSubmit = () => {

        // toast.current.show({
        //     severity: 'success',
        //     summary: 'Success Message',
        //     detail: 'Deduction Added successfully',
        // });
    };

    const handleCancel = () => {
        setSidebarVisable(false)
        reset()
    };

    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    // const handleCheckboxClick = () => {

    // };


    return (
        <>
            <div className='fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className='ps-2 mt-2'>Documents</h5>
                    <div class="formgrid grid mb-6 p-2">

                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="docTitle"
                                labelId="docTitle.label"
                                defaultValue=""
                                required={required}
                                requiredMsg="docTitle.required"
                                placeholder="---"
                                autoFocus

                            />
                        </div>
                        <div class=" col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="docNumber"
                                labelId="docNumber.label"
                                defaultValue=""
                                required={required}
                                requiredMsg="docNumber.required"
                                placeholder="---"

                            />
                        </div>
                        <div class="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="docType"
                                labelId="docType.label"
                                defaultValue=""
                                options={options}
                                required={required}
                                requiredMsg="docType.required"
                                placeholder="--"

                            />
                        </div>


                        <div class=" col-12 md:col-3">
                            <CustomCalender
                                control={control}
                                errors={errors}
                                name="issueDate"
                                labelId="issueDate.label"
                                requiredMsg="issueDate.required"
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
                                labelId="expDate.label"
                                requiredMsg="expDate.required"
                                defaultValue=""
                                showIcon={true}
                                required={required}
                                onChange={handleExpiryDateChange}
                            />

                        </div>
                        <div className='col-12 md:col-12'>
                            <div class="  profilepic-border rounded rounded mt-1 p-5 d-flex justify-content-center align-items-center">
                                <div className=''>
                                    <CustomInputFile
                                        control={control}
                                        errors={errors}
                                        name="document"
                                        requiredMsg="Document is required"
                                        defaultValue=""
                                        required={required}
                                    />
                                    <span>JPG, PNG, DOC or PDF smaller than 30 MB</span>
                                </div>
                            </div>

                            <div className='formgroup-inline  mt-3'>
                                <div className='field-checkbox'>
                                    <input type='checkbox' id="documentCheck" className='cursor-pointer  custom-checkbox'
                                        // onClick={handleCheckboxClick}
                                        // checked={check}
                                        readOnly
                                    />
                                    <label for="documentCheck" className='fw-bold cursor-pointer'>Sensitive Document - PIP(Personal Information Protection)</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='col-12 '>
                                <div className='field-checkbox me-2 d-flex align-items-center'>
                                    <input
                                        type='checkbox'
                                        id='reminderMonths'
                                        className='cursor-pointer custom-checkbox me-2'
                                        checked={isReminderEnabled && !!selectedReminderPeriod}
                                        onChange={handleCheckboxClick}
                                        disabled={!isReminderEnabled && !expiryDate}
                                    />
                                    {(!selectedReminderPeriod || isReminderEnabled) && (
                                       <label htmlFor='reminderMonths' className='fw-bold m-0 d-flex align-items-center single-line-label'>
                                       Remind{' '}
                                       <select
                                           id='reminderMonthsDropdown'
                                           name='reminderMonthsDropdown'
                                           value={selectedReminderPeriod}
                                           onChange={handleReminderMonthChange}
                                           className='ms-2 me-2'
                                           disabled={!isReminderEnabled}
                                       >
                                           <option value='' disabled selected>Select month</option>
                                           {monthsOptions.map((option) => (
                                               <option key={option.value} value={option.value}>
                                                   {option.label}
                                               </option>
                                           ))}
                                       </select>
                                       {' '}
                                       before expiration
                                   </label>
                                   
                                    )}
                                </div>
                            </div>
                            <div className=' ps-2'> {error && <p className='text-danger'>{error}</p>}</div>

                        </div>

                        <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3 h-custom-10'>
                            <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancel} />
                            <Button type="submit" severity='primary' label='Create' size='small' className="ms-2 me-2" />
                        </div>
                    </div>
                </form>
            </div>

        </>

    )
}

export default AddDocuments