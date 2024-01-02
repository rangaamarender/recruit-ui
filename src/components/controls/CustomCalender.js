import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import getFormErrorMessage from './getFormErrorMessage';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';

const CustomCalander = ({
    control,
    errors,
    name,
    labelId,
    required,
    requiredMsg,
    defaultValue,
    disabled,
    showIcon,
    className,
    ...rest
}) => {

    return (
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
                    <Calendar
                        {...field}
                        disabled={disabled}
                        showIcon={showIcon}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        {...rest}
                    />
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
            defaultValue={defaultValue}
        />
    );
};

export default CustomCalander;
