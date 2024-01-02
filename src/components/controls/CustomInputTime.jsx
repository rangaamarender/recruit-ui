
import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import getFormErrorMessage from './getFormErrorMessage';

const CustomInputTime = ({
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
  mask,
  value,
  rules,
  ...rest
}) => {
    const validateEndTime = (value, context) => {
        if (!value) {
          return true; // Return true if the field is empty (you can handle this case differently)
        }
      
        const [hours, minutes] = value.split(':').map(Number);
        
        // Get the current time
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
      
        if (
          context.isToday &&
          (hours < currentHours ||                 // Hours are earlier than current time
          (hours === currentHours && minutes <= currentMinutes)) // Same hour but minutes are earlier
        ) {
          return 'Please enter a valid time';
        }
        
        if (
          hours > 24 ||                            // Hours should not exceed 24
          (hours === 24 && minutes > 0) ||         // Hours are 24, but minutes are greater than 0
          minutes >= 60                           // Minutes should not exceed 59
        ) {
          return 'Please enter a valid time';
        }
      
        return true;
      };
   console.log(validateEndTime,"remove-unusedvars");   
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={className}>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors[name] })}>
                        <FormattedMessage id={labelId} defaultMessage={labelId} />
                        {required && <span className="text-danger"> *</span>}
                    </label>
                    <InputMask
                        {...field}
                        id={field.name}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        placeholder={placeholder}
                        disabled={disabled}
                        mask={mask}
                        value={field.value}
                        {...rest}
                    />
                    <small id="username-help" className='text-danger'>{helpMsg}</small><br/>
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomInputTime;
