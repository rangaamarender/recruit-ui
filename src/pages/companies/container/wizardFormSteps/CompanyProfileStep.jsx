// CompanyProfileStep.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { checkDomainRequest, fetchCountries, fetchTaxClassifications } from '../../../../redux/actions/companiesActions';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomInputMask from '../../../../components/controls/CustomInputMask';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';
import CustomDomainInput from '../../../../components/controls/CustomDomainInput';
import CustomInputEmail from '../../../../components/controls/CustomInputEmail';

const options = [
  { value: 'option1', label: 'option1' },
  { value: 'option2', label: 'option2' },
  { value: 'option3', label: 'option3' },
  { value: 'option4', label: 'option4' },
];

function CompanyProfileStep({ control, errors, setSkip, setValue, helper, setHelper, data, validationErrors, setValidationErrors }) {
  const required = true;

  const dispatch = useDispatch();
  const domainAvailable = useSelector((state) => state.company.domainAvailable);

  const countries = useSelector((state) => state.company.countries);
  const taxClassifications = useSelector((state) => state.company.taxClassifications);

  const [check, setCheck] = useState(null);
  const [domainError, setDomainError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('someone@company.com');

  useEffect(() => {
    setSkip(false)
  })

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryChange = (selectedValue) => {
    setValue('country', selectedValue.target.value);
    dispatch(fetchTaxClassifications(selectedValue.value));
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/(www\.)?)?([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    return urlPattern.test(url);
  };

  useEffect(() => {
    if (domainAvailable === true) {
      setDomainError('This Company already Registered');
      setCheck(false);
    } else {
      setDomainError('');
    }
  }, [dispatch, domainAvailable]);

  const handleDomainBlur = () => {
    const trimmedDomain = data.domain;
    const newDomain = trimmedDomain.replace(/\s/g, '');
    // const newDomain = data.domain;

    if (!newDomain) {
      setDomainError('Website (URL) cannot be empty.');
      setCheck(false);
      return;
    }

    const domainWithoutProtocol = newDomain.replace(/^(https?:\/\/)?/, '');

    let lowercasedDomain = domainWithoutProtocol.toLowerCase();
    const domainParts = domainWithoutProtocol.split('.');
    const lastTwoParts = domainParts.slice(-2).join('.');

    if (!isValidUrl(lowercasedDomain)) {
      setDomainError('Invalid website URL format');
      setCheck(false);
      return;
    }

    let modifiedDomain = lowercasedDomain;
    if (!modifiedDomain.startsWith('http://') && !modifiedDomain.startsWith('https://')) {
      setValue('domain', `http://${modifiedDomain}`);
      setCheck(true);
    }

    if (domainError === '') {
      setEmailPlaceholder(`someone@${lastTwoParts}`);
      // setValue('emailPlaceholder', `someone@${lastTwoParts}`);
      dispatch(checkDomainRequest(newDomain));
      setHelper(lastTwoParts);
    }
  };

  const handleEmail = (e) => {
    setValue('authSignataryEmail', e.target.value);
    const email = e.target.value;
    const emailParts = email.split('@');
    const emailDomain = emailParts[emailParts.length - 1].toLowerCase();

    // Check if the email domain ends with the domain or its subdomain (demo)
    if (emailDomain.endsWith(`.${helper}`) || emailDomain === helper) {
      // setSuccessMessage('Email and Domain match successfully!');
      setEmailError('');
    } else {
      setSuccessMessage('');
      setEmailError('Email and Domain do not match');
    }
    if (domainError === '') {
      setEmailPlaceholder(`someone@${helper}`);
    }
  };

  const handleDomainChange = (e) => {
    setValue('domain', e.target.value);
    setDomainError('');
    setCheck(false);
  };

  return (
    <>
      <div className="formgrid grid mb-6">
        <div className="col-12 text-center">
          <h3>Company Profile</h3>
        </div>
        <div className="col-12">
          <CustomInputText
            control={control}
            errors={errors}
            name="name"
            labelId="companyName"
            defaultValue=""
            required={required}
            requiredMsg="companyName.required"
            placeholder="Company Name"
            autoFocus
            onChange={(e) => {
              const cleanedCompanyName = e.target.value.replace(/\s+/g, ' ');
              setValue('name', cleanedCompanyName);
            }}
          />
        </div>
        <div className="col-12">
          <CustomInputText
            control={control}
            errors={errors}
            name="tradeName"
            labelId="dba"
            defaultValue=""
            requiredMsg="dba.required"
            placeholder="DBA or trade name"
          />
        </div>
        <div className="col-12 md:col-4">
          <CustomDropdown
            control={control}
            errors={errors}
            name="country"
            labelId="countryOfIncorporation"
            defaultValue=""
            options={countries.map((country) => ({
              value: country.countryCode,
              label: country.countryName,
            }))}
            onChange={handleCountryChange}
            required={required}
            placeholder="Select country"
            requiredMsg="countryOfIncorporation.required"
          />
        </div>
        <div className=" col-12 md:col-4">
          <CustomDropdown
            control={control}
            errors={errors}
            name="stateOfInc"
            labelId="stateOfIncorporation.label"
            defaultValue=""
            options={options}
            required={required}
            placeholder="Select State"
            requiredMsg="stateOfIncorporation.required"
          />
        </div>
        <div className="col-12 md:col-4">
          <CustomDropdown
            control={control}
            errors={errors}
            name="taxClassification"
            labelId="taxClassification"
            defaultValue=""
            options={
              taxClassifications.length > 0
                ? taxClassifications.map((tc) => ({
                  value: tc.taxClassCode,
                  label: tc.description,
                }))
                : []
            }
            required={required}
            placeholder="Select Tax Classification"
            requiredMsg="taxClassification.required"
          />
        </div>
        <div className=" col-12 md:col-4">
          <CustomInputMask
            control={control}
            errors={errors}
            name="taxId"
            labelId="ein"
            mask="99-9999999"
            defaultValue=""
            required={false}
            requiredMsg="ein.required"
          />
        </div>
        <div className=" col-12 md:col-4">
          <CustomInputPhoneNbr
            control={control}
            errors={errors}
            name="phoneNumber"
            labelId="phoneNbr"
            maskFormat="(999) 999-9999"
            defaultValue=""
            required={required}
            requiredMsg="phoneNumber.required"
          />
        </div>
        <div className=" col-12 md:col-4">
          <CustomInputMask
            control={control}
            errors={errors}
            name="fax"
            labelId="fax"
            mask="(999) 999-9999"
            defaultValue=""
            requiredMsg="fax.required"
          />
        </div>
        <div className="col-12">
          <span className="p-input-icon-right">
            <i className={check ? 'pi pi-check text-success text-xl font-bold' : 'pi pi-times text-danger'} />
            <CustomDomainInput
              control={control}
              errors={errors}
              name="domain"
              labelId="domain"
              onBlur={handleDomainBlur}
              onChange={(e) => handleDomainChange(e)}
              placeholder="http://www.company.com"
              required={required}
              defaultValue=""
              requiredMsg="domain.required"
            />
          </span>
        </div>
        <p className="text-red-500 ps-2">{domainError}</p>

        <div className="col-12">
          <h3>Contact Details</h3>
        </div>
        <div class="col-12 md:col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="authSignataryFn"
            labelId="authSignataryFn"
            defaultValue={null}
            required={required}
            placeholder="First Name"
            requiredMsg="authSignataryFn.required"
          />
        </div>
        <div class="col-12 md:col-6">
          <CustomInputText
            control={control}
            errors={errors}
            name="authSignataryLn"
            labelId="authSignataryLn"
            defaultValue={null}
            placeholder="Last Name"
            required={required}
            requiredMsg="authSignataryLn.required"
          />
        </div>
        <div className="col-12 md:col-6">
          <span className="p-input-icon-right">
            <i className={emailError ? 'pt-2 pi pi-times text-danger' : ''} />
            {/* <i className={emailError ? 'pt-2 pi pi-times text-danger' : 'pt-2 pi pi-check text-success text-xl font-bold'} /> */}
            <CustomInputEmail
              control={control}
              errors={errors}
              name="authSignataryEmail"
              labelId="authSignataryEmail"
              placeholder={emailPlaceholder}
              defaultValue=""
              onChange={(e) => handleEmail(e)}
              required={required}
              // required={emailError ? true : false}
              requiredMsg="authSignataryEmail.required"
            />
          </span>
          {validationErrors && <p className="text-danger">{validationErrors}</p>}
          <p className="text-red-500 ps-2">{emailError}</p>
          <p className="text-success ps-2 d-none">{successMessage}</p>
        </div>

        <div class="col-12 md:col-6">
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

export default CompanyProfileStep;
