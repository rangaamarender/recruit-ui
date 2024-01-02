import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

const CustomInputEmail = ({
    control,
    errors,
    name,
    labelId,
    required,
    placeholder,
    type,
    defaultValue,
    disabled,
    helpMsg,
    className,
    ...rest
}) => {
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{
                    minLength: {
                        value: 5,
                        message: 'Email must be at least 5 characters long',
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid Email',
                    },
                    required: 'Email is Required',
                }}
                render={({ field, fieldState }) => (
                    <div className={className}>
                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                            <FormattedMessage id={labelId} defaultMessage={labelId} />
                            {required && <span className="text-danger"> *</span>}
                        </label>
                        <InputText
                            {...field}
                            {...rest}
                            placeholder={placeholder}
                            type={type}
                            disabled={disabled}
                            className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        />
                        <small id="username-help">{helpMsg}</small>
                        {getFormErrorMessage(errors, field.name)}
                    </div>
                )}
                defaultValue={defaultValue}
            />
        </>
    );
};

export default CustomInputEmail;
