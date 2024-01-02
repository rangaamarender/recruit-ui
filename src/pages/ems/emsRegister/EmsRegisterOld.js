import React, { useRef, useState } from 'react';
import RavesLogo from '../../../assets/images/Raves-logo.svg';
import LoginLogo from '../../../assets/images/login-img.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CompanyProfile from './CompanyProfile';
import AdminDetails from './AdminDetails';
import Address from './Address';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const EmsRegister = () => {
    const toast = useRef(null);
    const [companyProfileStatus, setCompanyProfileStatus] = useState(false);
    const [adminDetails, setAdminDetails] = useState(false);
    const [visible, setVisible] = useState(false);

    const show = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Complete previous step to proceed',
            life: 5000,
        });
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Registration Successful', life: 9000 });
    };

    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setStep(step + 1);
        if (step === 0) {
            setCompanyProfileStatus(true);
        } else if (step === 1) {
            setAdminDetails(true);
        }
    };

    const onFinalSubmit = (data) => {
        showSuccess();
        // navigate('/recruit/login');
        setVisible(true);
    };

    const handleAdminDetailStep = () => {
        if (companyProfileStatus === true) {
            setStep(1);
        } else {
            show();
        }
    };

    const handleAddressStep = () => {
        if (adminDetails === true) {
            setStep(2);
        } else {
            show();
        }
    };

    return (
        <>
            <div className="d-flex vh-100 w-screen align-items-center overflow-x-hidden">
                <div className=" w-6 d-none col-md-6 d-lg-block overflow-hidden">
                    <div className="fixed w-6 top-0 bg-red">
                        <div className="bg-gray-900 h-screen flex flex-column justify-content-center align-items-center pr-5">
                            <img src={RavesLogo} className="py-5" alt='RavesLogo'/>
                            <img src={LoginLogo} className="py-5" alt='LoginLogo'/>
                        </div>
                    </div>
                </div>
                <div className="login-form col-md-12 col-sm-12 col-lg-6  d-flex justify-content-center vh-100 pt-5">
                    <form onSubmit={handleSubmit(onFinalSubmit)} className="w-100 md:p-5">
                        <div className=" p-fluid flex-wrap gap-3 ps-5 pe-5">
                            <h2 className="text-center">Register</h2>
                            <p className="text-center text-500">Lets get started with your 30 days free trial</p>
                            <Toast ref={toast} />
                            <div className="text-700 flex justify-content-center align-item-center gap-2 my-2 cursor-pointer">
                                <p className={step === 0 && 'text-900 fw-bold'} onClick={() => setStep(0)}>
                                    Company Profile
                                </p>
                                <span>&gt;</span>
                                <p className={step === 1 && 'text-900 fw-bold'} onClick={handleAdminDetailStep}>
                                    Admin Detail
                                </p>
                                <span>&gt;</span>
                                <p className={step === 2 && 'text-900 fw-bold'} onClick={handleAddressStep}>
                                    Address
                                </p>
                            </div>

                            <div>
                                {step === 0 && <CompanyProfile control={control} errors={errors} />}
                                {step === 1 && <AdminDetails control={control} errors={errors} />}
                                {step === 2 && <Address control={control} errors={errors} setValue={setValue} />}
                            </div>
                            <div>
                                {step <= 1 && (
                                    <Button
                                        label="Next"
                                        className="company-primary-btn my-3"
                                        onClick={handleSubmit(onSubmit)}
                                        type="button"
                                    />
                                )}
                                {step === 2 && (
                                    <Button label="Register" className="company-primary-btn my-3" type="submit" />
                                )}
                            </div>
                        </div>
                        <p className="text-center text-600 pb-5">
                            Already have an account?{' '}
                            <span
                                className="fw-bold company-primary-text"
                                onClick={() => navigate('/recruit/')}
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            <Sidebar visible={visible} showCloseIcon={false} onHide={() => setVisible(false)} fullScreen>
                <div className="flex  justify-content-center align-items-center h-screen w-screen p-fluid">
                    <div className="flex flex-column align-items-center">
                        <div className="flex justify-content-center border-3 border-circle border-green-700 mb-5">
                            <i className="pi pi-check p-3" style={{ fontSize: '1.5rem', color: 'green' }} />
                        </div>
                        <h3>Your account is successfully created</h3>
                        <div className="mt-5 flex flex-column align-items-center">
                            <span className="text-500">Sign here for access your account</span>
                            <Button
                                onClick={() => navigate('/recruit/')}
                                label="SIGN IN"
                                className="company-primary-btn my-3"
                            />
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    );
};

export default EmsRegister;
