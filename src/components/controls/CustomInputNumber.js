import { InputNumber } from 'primereact/inputnumber';
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';
import getFormErrorMessage from './getFormErrorMessage';


const CustomInputNumber = ({
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
                control={control}
                defaultValue={defaultValue}
                name={name}
                rules={
                    required && {
                        required: intl.formatMessage({
                            id: requiredMsg,
                            defaultMessage: 'field is required',
                        }),
                    }
                }
                render={({ field, fieldState }) => (
                    <div className={className}>
                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                            <FormattedMessage id={labelId} defaultMessage={labelId} />
                            {required && <span className="text-danger"> *</span>}
                        </label>
                        <InputNumber
                         {...field}
                         id={field.name}
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={classNames('w-full',{ "p-invalid": fieldState.error })}
                            {...rest}
                        />
                        <small id="username-help">{helpMsg}</small>
                    {getFormErrorMessage(errors, field.name)}
                    </div>
                )}
            />
    );
};
export default CustomInputNumber;