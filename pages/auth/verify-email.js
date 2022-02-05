import axios from "axios";
import React, { useRef } from "react";
import { Typography, Box, Stack, Button, FormControl, OutlinedInput } from "@mui/material"; // prettier-ignore
import { mix } from "../../styles/styleMixins";
import { useGlobalContext } from "../../state-management/globalContext";
//! only let users currently logging in to access this
//! only allow 2 attempts max, quit back to home or something (do what slack does)
export default function verifyEmail() {
  const { hashedPIN, expiryDatePIN, pendingEmail, password } = useGlobalContext(); // prettier-ignore

  const pinRef = useRef();
  const verifyHandler = async function () {
    const typedPIN = pinRef.current.value;
    //! if user fails, make sure to clear the project state for pin and hashed password.
    //! add in error handling
    try {
      const requestNewAccount = await axios.post("/api/auth/signupP2", {
        submittedPIN: typedPIN, // the pin we type in this pg's form
        hashedPIN, // a hashed version of the correct PIN we emailed
        expiryDatePIN,
        email: pendingEmail, // email submitted in /signup
        password, // password submitted in /signup
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack sx={styles.parentContainer}>
      <Typography variant="h2" sx={mix.titleFont}>
        Verify Email
      </Typography>
      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label" sx={{ mb: 0.5 }}>
          Verification Code:
        </Typography>
        <OutlinedInput
          sx={{ mb: 2 }}
          inputRef={pinRef}
          placeholder="6-digit code"
          type="text"
          inputProps={{ maxLength: 6 }}
          // error={formState.passwordError}
          // onChange={typingPasswordHandler}
        />
        <Button variant="contained" onClick={verifyHandler}>
          VERIFY
        </Button>
      </FormControl>
      <Typography variant="p">
        We just sent a 6 digit verification code to {pendingEmail} via email.
        Enter that code to prove that you own this email address. This code will
        expire within 30 minutes. Be sure to check your spam folder if you
        cannot find it
      </Typography>
    </Stack>
  );
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "60vh",
    maxWidth: "35rem",
    margin: "auto",
    textAlign: "center",
    // border: "5px solid black",
    ...mix.flexColumn,
    justifyContent: "center",
  },
  formControl: {
    width: "80%",
    maxWidth: "20.625rem",
    mb: 1.5,
    fontWeight: 500,
    mb: 4,
  },
};
