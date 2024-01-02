import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';
import getFormErrorMessage from './getFormErrorMessage';

const CustomMultiSelect = ({
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
    options,
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
                    <MultiSelect
                        {...field}
                        options={options}
                        optionValue="value"
                        optionLabel="label"
                        display="chip"
                        placeholder={placeholder}
                        focusInputRef={field.ref}
                        maxSelectedLabels={3}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        {...rest}
                    />
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};
export default CustomMultiSelect;