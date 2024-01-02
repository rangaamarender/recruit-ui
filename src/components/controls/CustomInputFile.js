import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { intl } from '../../i18n/i18n';

import getFormErrorMessage from './getFormErrorMessage';

const CustomInputFile = ({
    control,
    errors,
    name,
    defaultValue,
    className,
    required,
    helpMsg,
    requiredMsg,
    ...rest
}) => {
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
                        {/* <FormattedMessage  defaultMessage={labelId} /> */}
                    </label>    
                    <input
                        {...field}
                        id={field.name}
                        type='file'
                        {...rest}
                    />
                    <small id="username-help">{helpMsg}</small>
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomInputFile;




