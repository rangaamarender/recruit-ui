import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';

import getFormErrorMessage from './getFormErrorMessage';

const CustomInputPassword = ({
    control,
    errors,
    name,
    labelId,
    defaultValue,
    required,
    className,
    placeholder,
    disabled,
    requiredMsg,
    ...rest
}) => {
    const [value, setValue] = useState('');
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={
                required && {
                    required: intl.formatMessage({
                        id: requiredMsg,
                        defaultMessage: 'field is required',
                    }),
                }
            } // Use formatMessage to retrieve translated message
            render={({ field, fieldState }) => (
                <div className={className}>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                        <FormattedMessage id={labelId} defaultMessage={labelId} />
                        {required && <span className="text-danger"> *</span>}
                    </label>
                    <Password
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={classNames({ 'p-invalid': fieldState.error })}
                        {...field}
                        {...rest}
                        toggleMask
                    />
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomInputPassword;
