import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillLinkedin } from 'react-icons/ai';
import { BsApple } from 'react-icons/bs';
import { FaKey } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RavesLogo from '../../assets/images/Raves-logo.svg';
import LoginLogo from '../../assets/images/login-img.svg';
import CustomInputPassword from '../../components/controls/CustomInputPassword';

import CustomInputText from '../../components/controls/CustomInputText';
import { loginRequest } from '../../redux/actions/authActions';

const EmsLogin = () => {
    const [checked, setChecked] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useSelector((state) => state.auth);

    const onSubmit = (data) => {
        const formatDate = (date) => {
            const options = {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        };
        
        const formatTime = (date) => {
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        };
        
            const nowTime = new Date();
            const formattedTimestamps = `${formatDate(nowTime)} at ${formatTime(nowTime)}`;
        const object = {value: "value", timestamp: formattedTimestamps}
        localStorage.setItem("key", JSON.stringify(object));


        
        console.log(data);
        dispatch(loginRequest(data.email, data.password));
    };

    let required = true;
    const signInButtons = [
        { buttonKey: 'sso', buttonLabel: 'SSO', buttonIcon: <FaKey size={'20px'} color="black" /> },
        { buttonKey: 'apple', buttonLabel: 'Apple', buttonIcon: <BsApple size={'20px'} color="black" /> },
        { buttonKey: 'google', buttonLabel: 'Google', buttonIcon: <FcGoogle size={'20px'} /> },
        {
            buttonKey: 'linkedin',
            buttonLabel: 'Linkedin',
            buttonIcon: <AiFillLinkedin size={'20px'} color="#0072b1" />,
        },
    ];

    if (isAuthenticated) {
        navigate('/recruit/dashboard');
    }

    return (
        <>
            <div className="d-flex vh-100 align-items-center overflow-x-hidden">
                <div className=" w-6 d-none col-md-6 d-lg-block overflow-hidden">
                    <div className="fixed w-6 top-0 bg-red">
                        <div className="bg-gray-900 h-screen flex flex-column justify-content-center align-items-center pr-5">
                            <img src={RavesLogo} className="py-5" alt="RavesLogo" />
                            <img src={LoginLogo} className="py-5" alt="LoginLogo" />
                        </div>
                    </div>
                </div>
                <div className="login-form col-md-6 col-sm-12 d-flex justify-content-center  vh-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-100 md:p-5">
                        <div className=" p-fluid flex-wrap gap-3 ps-5 pe-5">
                            <h2 className="text-center">EMS Login</h2>
                            <p className="text-center text-500">Lets get started with your 30 days free trial</p>
                            {error && <p className="error-message">{error}</p>}

                            <CustomInputText
                                control={control}
                                errors={errors}
                                name="email"
                                labelId="email"
                                defaultValue=""
                                required={required}
                                requiredMsg="email.required"
                            />
                            <CustomInputPassword
                                control={control}
                                errors={errors}
                                name="password"
                                labelId="password.label"
                                required={required}
                                defaultValue=""
                                requiredMsg="password.required"
                                feedback={false}
                            />

                            <div className="flex-auto mt-2 pb-3 gap-3">
                                <div className="p-field-checkbox p-fluid float-start">
                                    <Checkbox
                                        id="rememberMe"
                                        className="mr-2"
                                        checked={checked}
                                        onChange={(e) => setChecked(e.checked)}
                                    />
                                    <label htmlFor="rememberMe" className="p-checkbox-label ps-1">
                                        Remember me
                                    </label>
                                </div>
                                <div className="p-fluid float-end">
                                    <Link to="/recruit/forgotPassword">Forgot password?</Link>
                                </div>
                            </div>
                            <div className="p-fluid pb-3 mt-3">
                                <Button type="submit" label="SIGN IN" className="my-3" />
                            </div>
                        </div>

                        <Divider align="center">
                            <span className="">Or sign in with</span>
                        </Divider>
                        <div className=" mt-4 flex justify-content-center align-items-center gap-4 ">
                            {signInButtons.map((item, index) => (
                                <div key={index}>
                                    <Button
                                        severity="secondary"
                                        icon={item.buttonIcon}
                                        outlined
                                        type="button"
                                        className="rounded-3"
                                        raised
                                    />
                                    <div className="fw-bold text-center" style={{ fontSize: '13px' }}>
                                        {item.buttonLabel}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-600 mt-4 pb-3">
                            Dont't have an account?
                            <span
                                className="fw-bold company-primary-text cursor-pointer"
                                onClick={() => navigate('/recruit/signup')}
                            >
                                Create New
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EmsLogin;
