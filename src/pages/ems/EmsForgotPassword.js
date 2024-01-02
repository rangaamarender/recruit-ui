import React from 'react';
import RavesLogo from '../../assets/images/Raves-logo.svg';
import LoginLogo from '../../assets/images/login-img.svg';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInputEmail from '../../components/controls/CustomInputEmail';

const EmsForgotPassword = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = () => {
        navigate('/recruit/verification');
    };
    let required = true;
    return (
        <>
            <div className="d-flex vh-100 align-items-center">
                <div className="login-image col-md-6 d-none d-md-block">
                    <div className="bg-gray-900 h-screen flex flex-column justify-content-center align-items-center pr-5">
                        <img src={RavesLogo} className="py-5" alt='RavesLogo'/>
                        <img src={LoginLogo} className="py-5" alt='LoginLogo'/>
                    </div>
                </div>
                <div className="login-form col-md-6 col-sm-12 d-flex justify-content-center align-items-center vh-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-100 md:p-5">
                        <div className="flex flex-column justify-content-center p-fluid flex-wrap gap-3 ps-5 pe-5">
                            <div className="flex justify-content-center">
                                <i
                                    className="pi pi-key bg-blue-50 border-circle p-3"
                                    style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}
                                />
                            </div>
                            <h2 className="text-center">Forgot your Password?</h2>
                            <p className="text-center text-500">We'll help you reset it and get back on track</p>
                            <div className="flex-auto pb-2">
                                <CustomInputEmail
                                    control={control}
                                    errors={errors}
                                    name="email"
                                    labelId="Email"
                                    defaultValue=""
                                    required={required}
                                    requiredMsg="email.required"
                                />
                            </div>

                            <div className="p-fluid pb-3 mt-3">
                                <Button type="submit" label="Reset Password" className="company-primary-btn my-3" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EmsForgotPassword;
