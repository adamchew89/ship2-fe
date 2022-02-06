import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import PlaceHolderImage1 from "z@Assets/images/placeholder-image1.jpeg";
import Field from "z@Components/forms/fields/Field";
import MobileVector from "z@Components/vectors/MobileVector";
import UnlockedVector from "z@Components/vectors/UnlockedVector";
import {
  action as ActionAuth,
  asyncLoginThunk,
} from "z@Stores/slices/auths/slice-auth";
import { RequestStatusType } from "z@Stores/slices/slice";
import { useAppDispatch, useAppSelector } from "z@Stores/utils/hooks";
import * as ThemeValues from "z@Themes/theme";
import { Credential } from "z@Types/type-auth";
import { BasicForm } from "z@Types/type-form";
import baseForm from "./components/LoginForm";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.authState);

  const submitBtnRef = React.useRef<HTMLButtonElement>(null);

  const [form, setForm] = React.useState<BasicForm>(baseForm);

  React.useEffect(() => {
    /**
     * Form validation to be valid:
     * - No errors from HTTP: error === defined
     * - No empty required fields: required && _.isEmpty(value) === false
     */
    let isValid = !error;
    Object.keys(form.fields).some((field) => {
      const { required, value } = form.fields[field];
      if (required && _.isEmpty(value)) {
        isValid = false;
      }
      return !isValid;
    });
    setForm((prev) => ({ ...prev, isValid }));
  }, [error, form.fields]);

  const formFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    if (error) {
      dispatch(ActionAuth.clearErrors(undefined));
    }
    setForm((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: { ...prev.fields[id], value },
      },
    }));
  };

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const credential: Credential = {
      mobile: form.fields.mobile.value as string,
      pin: form.fields.pin.value as string,
    };
    const result = await dispatch(asyncLoginThunk(credential));
    if (result.meta.requestStatus === RequestStatusType.FULFILLED) {
      navigate("/");
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key.toLowerCase() === "enter") {
      event.preventDefault();
      if (submitBtnRef.current !== null) {
        /**
         * Focus on submit button when last field has a 'enter' keydown event
         */
        submitBtnRef.current.focus();
      }
    }
  };

  return (
    <Box
      data-testid="LoginPage"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
      }}
    >
      <Box component="img" src={PlaceHolderImage1} alt="LoginPageBanner" />
      <Box
        component="form"
        onSubmit={formSubmitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0rem 1.5rem",
        }}
      >
        <Field
          {...form.fields.mobile}
          onChange={formFieldChangeHandler}
          InputProps={{
            startAdornment: <MobileVector />,
          }}
          inputProps={{ sx: { paddingLeft: "1rem" } }}
          placeholder="Mobile Number"
          fullWidth
        />
        <Field
          {...form.fields.pin}
          onChange={formFieldChangeHandler}
          onKeyDown={keyDownHandler}
          InputProps={{
            startAdornment: <UnlockedVector />,
          }}
          placeholder="6 Digit Pin"
          inputProps={{ maxLength: 6, sx: { paddingLeft: "1rem" } }}
        />
        <Button
          data-testid="LoginFormSubmitBtn"
          onClick={formSubmitHandler}
          disabled={!form.isValid}
          ref={submitBtnRef}
        >
          Login
        </Button>
      </Box>
      {error && (
        <Typography
          variant="body1"
          sx={{ color: ThemeValues.Red, textAlign: "center" }}
        >
          Credential is invalid
        </Typography>
      )}
    </Box>
  );
}

export default LoginPage;
