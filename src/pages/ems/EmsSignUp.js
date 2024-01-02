import React, { useState } from 'react';
import RavesLogo from '../../assets/images/Raves-logo.svg';
import LoginLogo from '../../assets/images/login-img.svg';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInputEmail from '../../components/controls/CustomInputEmail';
import CustomInputText from '../../components/controls/CustomInputText';
import { signupRequest } from '../../redux/actions/signupActions';
import { useDispatch } from 'react-redux';

const EmsSignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(signupRequest({ data }));
        setStatus(true);
    };

    const required = true;
    
    return (
        <>
            <div className="d-flex vh-100 align-items-center">
                <div className="login-image col-md-6 d-none d-md-block">
                    <div className="bg-gray-900 h-screen flex flex-column justify-content-center align-items-center pr-5">
                        <img src={RavesLogo} className="py-5" alt="RavesLogo" />
                        <img src={LoginLogo} className="py-5" alt="LoginLogo" />
                    </div>
                </div>
                <div className="login-form col-md-6 col-sm-12 d-flex justify-content-center align-items-center vh-100">
                    {!status && (
                        <form onSubmit={handleSubmit(onSubmit)} className="w-100 md:p-5">
                            <div className=" p-fluid flex-wrap gap-3 ps-5 pe-5">
                                <h2 className="text-center">Sign Up</h2>
                                <p className="text-center text-500">Lets get started with your 30 days free trial</p>
                                <div className="flex-auto pb-2">
                                    <CustomInputEmail
                                        control={control}
                                        errors={errors}
                                        name="emailID"
                                        labelId="Email"
                                        defaultValue=""
                                        required={required}
                                        requiredMsg="email.required"
                                    />
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="companyName"
                                        labelId="companyName"
                                        defaultValue=""
                                        required={required}
                                        requiredMsg="companyName.required"
                                        className="mt-3"
                                    />
                                </div>
                                <div className="p-fluid pb-3 mt-3">
                                    <Button type="submit" label="SIGN UP" className="company-primary-btn my-3" />
                                </div>
                            </div>
                            <p className="text-center text-600">
                                Already have an account?{' '}
                                <span className="fw-bold company-primary-text" onClick={() => navigate('/recruit/')}>
                                    Login
                                </span>
                            </p>
                        </form>
                    )}
                    {status && (
                        <div>
                            <h4>Thanks for registering Please check you email</h4>
                            <p>continue the register from the link provided in you email</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EmsSignUp;
