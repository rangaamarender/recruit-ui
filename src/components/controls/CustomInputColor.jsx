import { ColorPicker } from 'primereact/colorpicker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import getFormErrorMessage from './getFormErrorMessage';
import { InputText } from 'primereact/inputtext';

const CustomInputColor = ({ control, errors, name, defaultValue, className,onClick, ...rest }) => {
    const validateHexColor = (color) => {
        const hexColorRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        if (!hexColorRegex.test(color)) {
            return 'Invalid hex code';
        }
        return true;
    };
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={{
                required: 'Color is required',
                validate: validateHexColor,
            }}
            render={({ field }) => (
                <div>
                    <div className="flex align-items-center gap-5">
                        <ColorPicker
                            {...field}
                            name="color"
                            control={control}
                            onChange={(e) => field.onChange(`#${e.value}`)}
                            className="test1"
                            {...rest}
                        />
                        <div className='flex flex-column gap-2'>
                        <InputText {...field} />
                        <div className='h-2rem w-3 border border-round' style={{background:`${field.value}`}}/>
                        <Button label="Change" className='w-4' size='small' onClick={onClick} />
                        </div>
                    </div>
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomInputColor;
