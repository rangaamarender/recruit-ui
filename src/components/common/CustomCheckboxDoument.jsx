import React from 'react';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { FormattedMessage } from 'react-intl';

const CustomCheckboxDoument = ({ control, name, labelId, defaultValue, className, ...rest }) => {
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({ field, fieldState }) => (
                <div className={className}>
                    <div className='field-checkbox'>
                        <input
                            type='checkbox'
                            id={field.name}
                            className={classNames('cursor-pointer custom-checkbox', { 'p-invalid': fieldState.error })}
                            onChange={(e) => field.onChange(e.target.checked)}
                            checked={field.value}
                            {...rest}
                        />
                        <label htmlFor={field.name} className='fw-bold cursor-pointer company-primary-text'>
                            <FormattedMessage id={labelId} defaultMessage={labelId} />
                        </label>
                    </div>
                    {fieldState.error && <small className='p-error'>{fieldState.error.message}</small>}
                </div>
            )}
        />
    );
};

export default CustomCheckboxDoument;