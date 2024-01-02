import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';
import getFormErrorMessage from './getFormErrorMessage';

const CustomCheckbox = ({ control, errors, name, labelId, required,requiredMsg,helpMsg, defaultValue, disabled,className }) => {
    return (
        <>
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
                        <Checkbox
                            {...field}
                            disabled={disabled}
                            checked={field.value === true}
                            className={classNames({ 'p-invalid': fieldState.error })}
                        />
                        <label htmlFor={field.name} className="cursor-pointer ml-2">
                            <FormattedMessage id={labelId} defaultMessage={labelId}/>
                        </label><br/>
                        <small id="username-help">{helpMsg}</small>
                        {getFormErrorMessage(errors, field.name)}
                    </div>
                )}
                defaultValue={defaultValue}
            />
         
        </>
    );
};

export default CustomCheckbox;
