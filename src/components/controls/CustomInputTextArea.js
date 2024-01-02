import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { intl } from "../../i18n/i18n";
import getFormErrorMessage from "./getFormErrorMessage";

const CustomInputTextArea = ({
  control,
  errors,
  name,
  labelId,
  defaultValue,
  required,
  className,
  requiredMsg,
  cols,
  row,
  ...rest
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
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
            <label htmlFor={field.name} className={classNames( { 'p-error': errors.value })}>
              <FormattedMessage id={labelId} defaultMessage={labelId} />
              {required && <span className="text-danger"> *</span>}
            </label>
            <InputTextarea
              id={field.name}
              {...field}
              rows={row}
              cols={cols}
              className={classNames('w-full', { "p-invalid": fieldState.error })}
              {...rest}
            />
            {getFormErrorMessage(errors, field.name)}
          </div>
        )}
      />
    </>
  );
};

export default CustomInputTextArea;
