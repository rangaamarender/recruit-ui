import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
import CustomInputText from '../../../../components/controls/CustomInputText';

function CompanyContactDetailsStep({ control, errors, setValue, currentStep, data, setCurrentStep, setDisable }) {
    const required = true;
    // const dispatch = useDispatch()
    const [emailValue, setEmailValue] = useState('');
    const [emailError, setEmailError] = useState('');

    const orgDomains = useSelector((state) => state.company.domainData.map((url) => ({ domain: url })));

    const isDomainWhitelisted = (email, orgDomain) => {
        const emailParts = email?.split('@');
        if (emailParts?.length === 2) {
            const domain = emailParts[1].toLowerCase().trim();
            const orgDomainURL = new URL(orgDomain);
            const lastTwoParts = domain.split('.').slice(-2).join('.');
            const normalizedOrgDomain = orgDomainURL.hostname.toLowerCase().split('.').slice(-2).join('.');
            return lastTwoParts === normalizedOrgDomain;
        }
        return false;
    };

    const validateEmailDomain = (email) => {
        setEmailValue(email);
        console.log(emailValue);
        if (!email) {
            setEmailError('Auth. Signatory Email is required.');
        } else {
            const isWhitelisted = orgDomains.some((orgDomain) => isDomainWhitelisted(email, orgDomain.domain));

            if (!isWhitelisted) {
                setEmailError('Email domain is not listed.');
            } else {
                setEmailError('');
            }
        }
    };

    return (
        <>
            <div class="formgrid grid">
                {/* <div className="col-12 text-center">
                    <h3>Contact Details</h3>
                    <small>Please fill the all required Details</small>
                </div> */}
                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="authSignataryFn"
                        labelId="authSignataryFn"
                        defaultValue={null}
                        required={required}
                        placeholder="First Name"
                        requiredMsg="authSignataryFn.required"
                        autoFocus
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="authSignataryLn"
                        labelId="authSignataryLn"
                        defaultValue={null}
                        placeholder="Last Name"
                    />
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="authSignataryEmail"
                        labelId="authSignataryEmail"
                        placeholder="admin@tech.com"
                        defaultValue=""
                        onChange={(e) => {
                            setEmailValue(e.target.value);
                            validateEmailDomain(e.target.value);
                            setValue('authSignataryEmail', e.target.value);
                        }}
                        required={required}
                        requiredMsg="authSignataryEmail.required"
                        className="sm:col-12"
                    />
                    {emailError && <p className="text-red-500 margin-top-25 ps-2">{emailError}</p>}
                </div>
                <div class=" col-12 md:col-6">
                    <CustomInputPhoneNbr
                        control={control}
                        errors={errors}
                        name="authSignataryPhone"
                        labelId="authSignataryPhone"
                        maskFormat="(999) 999-9999"
                        defaultValue=""
                        required={required}
                        requiredMsg="authSignataryPhone.required"
                    />
                </div>
            </div>
        </>
    );
}

export default CompanyContactDetailsStep;
