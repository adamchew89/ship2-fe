import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlaceHolderImage1 from "z@Assets/images/placeholder-image1.jpeg";
import Field from "z@Components/forms/fields/Field";
import MobileVector from "z@Components/vectors/MobileVector";
import UnlockedVector from "z@Components/vectors/UnlockedVector";
import {
  action as ActionAccount,
  asyncGetAccountThunk,
  asyncCreateAccountThunk,
  asyncUpdateAccountThunk,
} from "z@Stores/slices/accounts/slice-account";
import { RequestStatusType } from "z@Stores/slices/slice";
import { useAppDispatch, useAppSelector } from "z@Stores/utils/hooks";
import * as ThemeValues from "z@Themes/theme";
import { Account } from "z@Types/type-account";
import { BasicForm } from "z@Types/type-form";
import baseForm from "./components/AccountDetailsForm";

function AccountDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { error, account } = useAppSelector((state) => state.accountState);

  const submitBtnRef = React.useRef<HTMLButtonElement>(null);

  const [form, setForm] = React.useState<BasicForm>(baseForm);

  React.useEffect(() => {
    if (params.id) {
      /**
       * If 'params.id' exists:
       * - query DB for record
       */
      dispatch(asyncGetAccountThunk(+params.id));
    }
  }, [dispatch, params.id]);

  React.useEffect(() => {
    if (account) {
      /**
       * If 'account' exists:
       * - populate default form values
       */
      setForm((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          name: {
            ...form.fields.name,
            value: account.name || "",
          },
          mobile: {
            ...form.fields.mobile,
            value: account.mobile || "",
          },
          pin: {
            ...form.fields.pin,
            value: account.pin || "",
          },
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

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
    if (!!error) {
      dispatch(ActionAccount.clearErrors(undefined));
    }
    const { id, value } = event.target;
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
    const formData: Account = {
      name: form.fields.name.value as string,
      mobile: form.fields.mobile.value as string,
      pin: form.fields.pin.value as string,
    };
    let response;
    if (params.id) {
      response = await dispatch(asyncUpdateAccountThunk(formData));
    } else {
      response = await dispatch(asyncCreateAccountThunk(formData));
    }
    if (response.meta.requestStatus === RequestStatusType.FULFILLED) {
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
      data-testid="AccountDetailsPage"
      sx={{
        display: "flex",
        flexDirection: "column",
        [ThemeValues.default.breakpoints.up("sm")]: {
          gap: 4,
        },
      }}
    >
      <Box
        component="img"
        src={PlaceHolderImage1}
        alt="AccountDetailsPageBanner"
      />
      <Typography variant="h1" textAlign="center" sx={{ marginTop: "2.5rem" }}>
        {params.id ? "Update" : "Create"} New Account
      </Typography>
      <Typography
        variant="body2"
        sx={{ margin: "0rem 1.5rem", textAlign: "center", marginTop: "1rem" }}
      >
        Kindly use the form below to create or edit the account information
      </Typography>
      <Box
        component="form"
        onSubmit={formSubmitHandler}
        sx={{ display: "flex", flexDirection: "column", margin: "1rem 1.5rem" }}
      >
        <Field
          {...form.fields.name}
          onChange={formFieldChangeHandler}
          InputProps={{
            startAdornment: <MobileVector />,
          }}
          inputProps={{ sx: { paddingLeft: "1rem" } }}
          placeholder="Full Name"
        />
        <Field
          {...form.fields.mobile}
          onChange={formFieldChangeHandler}
          InputProps={{
            startAdornment: <MobileVector />,
          }}
          inputProps={{ sx: { paddingLeft: "1rem" } }}
          placeholder="Mobile Number"
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
          data-testid="SubmitBtn"
          onClick={formSubmitHandler}
          sx={{ height: "3rem", margin: "2.5rem 1.5rem" }}
          ref={submitBtnRef}
          disabled={!form.isValid}
        >
          SUBMIT
        </Button>
        {error && (
          <Typography
            variant="body1"
            sx={{ color: ThemeValues.Red, textAlign: "center" }}
          >
            Form is invalid
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AccountDetailsPage;
