import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';

import getFormErrorMessage from './getFormErrorMessage';

const CustomDropdown = ({
    control,
    errors,
    name,
    labelId,
    defaultValue,
    required,
    options,
    helpMsg,
    className,
    requiredMsg,
    placeholder,
    value,
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
                        <FormattedMessage id={labelId} defaultMessage={labelId} />
                        {required && <span className="text-danger"> *</span>}
                    </label>
                    <Dropdown
                        {...field}
                        placeholder={placeholder}
                        id={field.name}
                        optionLabel="label"
                        optionValue="value"
                        focusInputRef={field.ref}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        options={options}
                        value={field.value}
                        {...rest}
                    />
                    <small id="username-help">{helpMsg}</small>
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomDropdown;
