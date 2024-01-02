import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import CustomInputText from '../controls/CustomInputText';
import { intl } from '../../i18n/i18n';

const LoginForm = () => {
   
    const [checked2, setChecked2] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    const required = true;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
            <div className="grid formgrid p-fluid">
                <div className="field sm:col-12">
                    <img src="../../assets/img/Lucid.svg" alt="RAVES" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium mr-2">Do not have an account?</span>
                    <p className="font-medium no-underline text-blue-500 cursor-pointer company-primary-text">Create today!</p>
                </div>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="userId"
                    labelId="userId.label"
                    required={required}
                    className="field sm:col-12"
                    requiredMsg='user.required'
                />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="passwd"
                    labelId="passwd.label"
                    required={required}
                    className="field sm:col-12"
                    requiredMsg='password.required'
                />
                <div>
                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox
                                id="rememberme2"
                                className="mr-2"
                                checked={checked2}
                                onChange={(e) => setChecked2(e.checked)}
                            />
                            <label htmlFor="rememberme2">Remember me</label>
                        </div>
                        <p className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer company-primary-text">
                            Forgot your password?
                        </p>
                    </div>
                    <Button
                        type="submit"
                        label={intl.formatMessage({ id: 'loginBtn.label' })}
                        icon="pi pi-user"
                        className="w-full"
                    />
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
