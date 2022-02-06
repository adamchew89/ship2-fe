import TextField, { TextFieldProps } from "@mui/material/TextField";
import _ from "lodash";
import React from "react";
import Validator from "validator";

const EMPTY_ERROR_TEXT = "";

function Field(props: TextFieldProps) {
  const [errorText, setErrorText] = React.useState<string>(EMPTY_ERROR_TEXT);

  const {
    id,
    type,
    required,
    label,
    value,
    helperText,
    error,
    inputProps,
    ...otherProps
  } = props;

  const displayLabel = React.useMemo(() => label || "Input", [label]);

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    let isFieldValid = true;
    /**
     * Field validation to be valid:
     * - Populated if required: value !== falsy
     * - Format according to type
     */
    if (required && _.isEmpty(value)) {
      setErrorText(`${displayLabel} is required`);
      return;
    } else if (!required && _.isEmpty(value)) {
      setErrorText(EMPTY_ERROR_TEXT);
      return;
    }
    switch (type) {
      case "email":
        if (!Validator.isEmail(value as string)) {
          setErrorText("Input is not a valid email");
          isFieldValid = false;
        } else {
          setErrorText(EMPTY_ERROR_TEXT);
        }
        break;
      case "mobile":
        if (!Validator.isMobilePhone(value as string, "en-SG")) {
          setErrorText("Input is not a valid mobile");
          isFieldValid = false;
        } else {
          setErrorText(EMPTY_ERROR_TEXT);
        }
        break;
      default:
        if (isFieldValid) {
          setErrorText(EMPTY_ERROR_TEXT);
        }
    }
  };

  return (
    <TextField
      data-testid="Field"
      id={id}
      type={type}
      required={required}
      label={label}
      value={value}
      error={error || !_.isEmpty(errorText.trim())}
      helperText={helperText || errorText}
      onBlur={blurHandler}
      inputProps={{ ...inputProps, role: "input" }}
      {...otherProps}
    />
  );
}

export default Field;
