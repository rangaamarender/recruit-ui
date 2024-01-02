import React from 'react';
import RavesLogo from '../../assets/images/Raves-logo.svg';
import LoginLogo from '../../assets/images/login-img.svg';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import CustomInputText from '../../components/controls/CustomInputText';

const EmsVerification = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        navigate('/recruit/resetPassword');
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
                        <div className=" p-fluid flex-wrap gap-3 ps-5 pe-5">
                            <h2 className="text-center">Verification Code</h2>
                            <p className="text-center text-500">
                                We have sent a Verification Code to reset your password
                            </p>
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="otp"
                                labelId="otp.label"
                                required={required}
                                requiredMsg="otp.required"
                            />
                            <Button type="submit" label="VERIFY" className="company-primary-btn my-3" />
                        </div>
                        <div className="flex justify-content-between px-5 mx-3">
                            <p className="text-center text-600">Dont't receive the code? </p>
                            <p
                                className="company-primary-text text-primary cursor-pointer"
                                onClick={() => navigate('/recruit/signup')}
                            >
                                Click to Resend
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EmsVerification;
