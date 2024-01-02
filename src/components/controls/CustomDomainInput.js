import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';

import getFormErrorMessage from './getFormErrorMessage';

const CustomDomainInput = ({
    control,
    errors,
    name,
    labelId,
    defaultValue,
    required,
    helpMsg,
    className,
    placeholder,
    disabled,
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
            // rules={rules}
            render={({ field, fieldState }) => (
                <div className={className}>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                        <FormattedMessage id={labelId} defaultMessage={labelId} />
                        {required && <span className="text-danger"> *</span>}
                    </label>
                    <InputText
                        {...field}
                        id={field.name}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...rest}
                    />
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomDomainInput;
