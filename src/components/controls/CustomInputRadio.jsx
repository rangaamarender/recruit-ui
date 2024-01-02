import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';

import getFormErrorMessage from './getFormErrorMessage';

const CustomRadioButton = ({
    control,
    errors,
    name,
    labelId,
    required,
    rules,
    defaultValue,
    disabled,
    className,
    helpMsg,
    requiredMsg,
    value,
    ...rest
}) => {


    return (
        <div>
            <Controller
                control={control}
                name={name}
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
                        <RadioButton
                            {...field}
                            disabled={disabled}
                            value={value}
                            checked={field.value === value}
                            className={classNames({ 'p-invalid': fieldState.error })}
                            {...rest}
                        />
                        <small id="username-help">{helpMsg}</small>
                        {getFormErrorMessage(errors, field.name)}
                    </div>
                )}
                defaultValue={defaultValue}
            />

        </div>
    );
};

export default CustomRadioButton;
