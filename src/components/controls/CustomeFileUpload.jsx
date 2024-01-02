import React from 'react';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { FormattedMessage } from 'react-intl';
import { intl } from '../../i18n/i18n';
import getFormErrorMessage from './getFormErrorMessage';

const CustomeFileInput = ({
  control,
  errors,
  name,
  labelId,
  required,
  className,
  placeholder,
  disabled,
  accept,
  requiredMsg,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
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
          <label htmlFor={field.name} className={classNames({ 'p-error': errors[name] })}>
            <FormattedMessage id={labelId} defaultMessage={labelId} />
            {required && <span className="text-danger"> *</span>}
          </label>
          <input
            type="file"
            id={field.name}
            className={classNames({ 'p-invalid': fieldState.error })}
            placeholder={placeholder}
            disabled={disabled}
            accept={accept}
            {...field}
            {...rest}
          />
          {getFormErrorMessage(errors, name)}
        </div>
      )}
    />
  );
};

export default CustomeFileInput;
