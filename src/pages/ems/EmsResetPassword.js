import React, { useState } from 'react';
import RavesLogo from '../../assets/images/Raves-logo.svg';
import LoginLogo from '../../assets/images/login-img.svg';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomInputPassword from '../../components/controls/CustomInputPassword';

const EMSResetPassword = () => {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState('');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        if(data.password !== data.conformPassword){
            setError('Password and Conform Password must match')
        }else{
        setCompleted(true);
    setError('')}
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
                    {completed === false && (
                        <form onSubmit={handleSubmit(onSubmit)} className="w-100 md:p-5">
                            <div className="flex flex-column justify-content-center p-fluid flex-wrap ps-5 pe-5">
                                <div className="flex justify-content-center">
                                    <i
                                        className="pi pi-key bg-blue-50 border-circle p-3"
                                        style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}
                                    />
                                </div>
                                <h2 className="text-center">Set new Password</h2>
                                <p className="text-center text-500">
                                    Your new password must be different to previous used passwords.
                                </p>
                                <div className="flex-auto pb-2">
                                    <CustomInputPassword
                                        control={control}
                                        errors={errors}
                                        name="password"
                                        labelId="password.label"
                                        required={required}
                                        requiredMsg="password.required"
                                    />
                                    <CustomInputPassword
                                        control={control}
                                        errors={errors}
                                        name="conformPassword"
                                        labelId="conformPassword.label"
                                        required={required}
                                        requiredMsg="conformPassword.required"
                                        feedback={false}
                                    />
                                    <span className='text-danger'>{error}</span>
                                </div>

                                <div className="p-fluid">
                                    <Button type="submit" label="Reset Password" className="company-primary-btn my-3" />
                                </div>
                            </div>
                        </form>
                    )}

                    {completed === true && (
                        <div className="w-90 md:p-5">
                            <div className="flex flex-column justify-content-center p-fluid flex-wrap gap-3 ps-5 pe-5">
                                <div className="flex justify-content-center">
                                    <i
                                        className="pi pi-check bg-blue-50 border-circle p-3"
                                        style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}
                                    />
                                </div>
                                <h2 className="text-center">Password Reset</h2>
                                <span className="text-500 text-center">Your password has successfully been reset.</span>
                                <span className="text-500 text-center">Click below to login magically</span>
                                <Button
                                    label="Continue"
                                    onClick={() => navigate('/recruit/')}
                                    className="company-primary-btn my-3"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EMSResetPassword;
