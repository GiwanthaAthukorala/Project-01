import React from "react";
import inputContainer from "../InputContainer/InputContainer";
import classes from "./input.module.css";

function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;

    //default

    switch (error.type) {
      case "required":
        return "This Field Is Required";
      case "minLength":
        return "Field Is Too Short";
      default:
        return "*";
    }
  };

  return (
    <inputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={classes.Input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={classes.error}>{getErrorMessage}</div>}
    </inputContainer>
  );
}

export default React.forwardRef(Input);
