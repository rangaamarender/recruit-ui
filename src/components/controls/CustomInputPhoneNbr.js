import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';

import getFormErrorMessage from './getFormErrorMessage';

const CustomInputPhoneNbr = ({
    control,
    errors,
    name,
    labelId,
    defaultValue,
    required,
    maskFormat,
    helpMsg,
    className,
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
                        <FormattedMessage id={labelId} defaultMessage={labelId} />
                        {required && <span className="text-danger"> *</span>}
                    </label>

                    <InputMask
                        {...field}
                        id={field.name}
                        mask={maskFormat}
                        className={classNames('w-full',{ 'p-invalid': fieldState.error })}
                        {...rest}
                    />
                    <small id="username-help">{helpMsg}</small>
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomInputPhoneNbr;
