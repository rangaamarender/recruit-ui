import { Editor } from "primereact/editor";
import React from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { intl } from "../../i18n/i18n";

import getFormErrorMessage from "./getFormErrorMessage";

const CustomEditor = ({
  control,
  errors,
  name,
  labelId,
  defaultValue,
  required,
  className,
  requiredMsg,
  ...rest
}) => {
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const header = renderHeader();
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
              defaultMessage: "field is required",
            }),
          }
        } // Use formatMessage to retrieve translated message
        render={({ field, fieldState }) => (
          <div className={className}>
            <label htmlFor={field.name}>
              <FormattedMessage id={labelId} defaultMessage={labelId} />
              {required && <span className="text-danger"> *</span>}
            </label>
            <Editor
              {...field}
              id={field.name}
              value={field.value}
              headerTemplate={header}
              // onTextChange={(e) => field.onChange(e.textValue)}
              {...rest}
            />
            {getFormErrorMessage(errors, field.name)}
          </div>
        )}
      />
    </>
  );
};

export default CustomEditor;
