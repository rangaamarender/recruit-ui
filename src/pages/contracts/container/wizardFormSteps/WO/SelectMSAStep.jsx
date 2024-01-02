import React from 'react';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';

function SelectMSAStep({ control, errors }) {
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option 2' },
        { value: 'option3', label: 'option 3' },
        { value: 'option4', label: 'option 4' },
    ];

    let required = false
    return (
        <>
            <div className="flex-wrap gap-3 p-fluid mb-5">
                <h4>Master Service Agreement (MSA) </h4>
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="selectMSA"
                        labelId="selectMSA"
                        defaultValue=""
                        options={options}
                        required={required}
                        requiredMsg="selectMSA.required"
                        placeholder="Select MSA"
                        className="md:col-12"
                    />
                </div>
                {/* static data */}
                <div className="container mt-2">
                    <div className="row mb-2">
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Company name</label>
                            <h6>Tata Consultancy</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Contract ID</label>
                            <h6>10001</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Web Address</label>
                            <h6>www.example.com</h6>
                        </div>

                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Email</label>
                            <h6>test@example.com</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Phone</label>
                            <h6>+91 9999999999</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Fax</label>
                            <h6>999999999</h6>
                        </div>

                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Start Date</label>
                            <h6>18-09-2023</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>End date</label>
                            <h6>18-09-2024</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Created Date</label>
                            <h6>18-09-2023</h6>
                        </div>

                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Program Fee</label>
                            <h6>----</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Discounts</label>
                            <h6>----</h6>
                        </div>
                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Last Update</label>
                            <h6>----</h6>
                        </div>

                        <div className="col-sm-12 col-md-4 mb-1">
                            <label>Address</label>
                            <h6>----</h6>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectMSAStep;
