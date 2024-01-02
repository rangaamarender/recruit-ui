import React, { useEffect, useRef } from 'react';
import RavesLogo from '../../../assets/images/Raves-logo.svg';
import LoginLogo from '../../../assets/images/login-img.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInputText from '../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../components/controls/CustomInputPhoneNbr';
import CustomInputEmail from '../../../components/controls/CustomInputEmail';
// import CustomDropdown from '../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../../../redux/actions/registerActions';
import { useLocation } from 'react-router-dom';

const EmsRegister = () => {
    const toast = useRef(null);
    const required = true;
    const location = useLocation();

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Registration Successful', life: 9000 });
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (!location.state?.verified) {
            navigate('/recruit/signup');
        }else{
            setValue('email',location.state.email)
            setValue('companyName',location.state.company)
        }
    });

    const onSubmit = (res) => {
        showSuccess();
        const data = {
            planCode: 'BASIC',
            firstName: res.firstName,
            lastName: res.lastName,
            emailID: res.email,
            phoneNbr: res.phoneNumber,
            companyName: res.companyName,
            website: res.website,
            trackerCode: location.state.tracker,
        };
        dispatch(registerRequest({ data }));
    };

    return (
        <div className="d-flex vh-100 w-screen align-items-center overflow-x-hidden">
            <div className=" w-6 d-none col-md-6 d-lg-block overflow-hidden">
                <div className="fixed w-6 top-0 bg-red">
                    <div className="bg-gray-900 h-screen flex flex-column justify-content-center align-items-center pr-5">
                        <img src={RavesLogo} className="py-5" alt="RavesLogo" />
                        <img src={LoginLogo} className="py-5" alt="LoginLogo" />
                    </div>
                </div>
            </div>
            <div className="login-form col-md-12 col-sm-12 col-lg-6  d-flex justify-content-center vh-100 pt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="w-100 md:p-5">
                    <div className=" p-fluid flex-wrap gap-3 ps-5 pe-5">
                        <h2 className="text-center">Welcome to Lucid RAVES!</h2>
                        <p className="text-center text-500">
                            Start your free trial now. It's free, and no credit card is needed.
                        </p>
                        <Toast ref={toast} />
                        <div>
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="firstName"
                                labelId="firstName.label"
                                required={required}
                                requiredMsg="firstName.required"
                            />
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="lastName"
                                labelId="lastName.label"
                                required={required}
                                requiredMsg="lastName.required"
                            />
                            <CustomInputEmail
                                control={control}
                                errors={errors}
                                name="email"
                                labelId="Email"
                                requiredMsg="email.required"
                                disabled={true}
                                className="mb-3"
                            />
                            <CustomInputPhoneNbr
                                control={control}
                                errors={errors}
                                name="phoneNumber"
                                required={required}
                                maskFormat="(999) 999-9999"
                                labelId="phoneNumber.label"
                                requiredMsg="phoneNumber.required"
                            />
                            <span className="p-input-icon-right">
                                <i className="pi pi-building" />
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="companyName"
                                    labelId="companyName"
                                    disabled={true}
                                    requiredMsg="companyName.required"
                                />
                            </span>
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="website"
                                labelId="website.label"
                                required={required}
                                requiredMsg="website.required"
                            />
                        </div>
                        <div>
                            <Button label="Start" className="company-primary-btn my-3" type="submit" />
                        </div>
                        <p className="text-center text-600">
                            By proceeding, you agree to the{' '}
                            <span
                                onClick={() => navigate('/terms-service')}
                                className="underline text-blue-600 cursor-pointer"
                            >
                                Terms of Service
                            </span>{' '}
                            &{' '}
                            <span
                                onClick={() => navigate('/recruit/privacy-policy')}
                                className="underline text-blue-600 cursor-pointer"
                            >
                                Privacy Policy
                            </span>
                        </p>
                    </div>
                    <p className="text-center text-600 pb-5">
                        Already have an account ?{' '}
                        <span
                            className="fw-bold company-primary-text cursor-pointer"
                            onClick={() => navigate('/recruit/')}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default EmsRegister;
