import React from "react";
import CustomInputText from "../components/CustomInputText";
import CustomDropdown from "../components/CustomDropdown";

const AttributesContainer = ({ attributes, control, errors }) => {
  return (
    <>
      {attributes.map((attribute) => (
        <div key={attribute.name}>
          {attribute.type === "text" && (
            <CustomInputText
              control={control}
              errors={errors}
              name={attribute.name}
              labelId={attribute.label}
              required={attribute.required}
            />
          )}
          {attribute.type === "password" && (
            <CustomInputText
              control={control}
              errors={errors}
              name={attribute.name}
              labelId={attribute.label}
              required={attribute.required}
            />
          )}
          {attribute.type === "radio" && (
            <CustomDropdown
              control={control}
              errors={errors}
              name={attribute.name}
              labelId={attribute.label}
              required={attribute.required}
              options={attribute.options}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default AttributesContainer;
