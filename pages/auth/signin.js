import React, { useRef, useState, useEffect } from "react";
import { Typography, Box, Stack, Button, TextField, InputLabel } from "@mui/material"; // prettier-ignore
import { useRouter } from "next/router";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  breakAfter,
  breakBefore,
} from "../../src/custom-components/ConditionalBreak";
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../../styles/styleMixins";
import { credentialSignIn } from "../api/helperFunctions/credentialSignIn";
//! page should not be accessible by those who are alreDY LOGGED IN
export default function signup() {
  const router = useRouter();
  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  // Controls the text underneath the input fields
  const [emailErrorText, setEmailErrorText] = useState(" ");
  const [passwordErrorText, setPasswordErrorText] = useState(" ");

  const typingEmailHandler = async function () {
    setEmailErrorText(" ");
  };
  const typingPasswordHandler = async function () {
    setPasswordErrorText(" ");
  };

  const loginHandler = async function () {
    // Capture values of input fields
    const typedEmail = emailRef.current.value;
    const typedPassword = passwordRef.current.value;

    // If one of the input fields is empty, render some error text without looking in the DB
    const typedEmail_NoWhitespace = typedEmail.replaceAll(" ", "");
    const typedPassword_NoWhitespace = typedPassword.replaceAll(" ", "");
    if (typedEmail_NoWhitespace.length === 0) return setEmailErrorText("No user found for that email"); // prettier-ignore
    if (typedPassword_NoWhitespace.length === 0) return setPasswordErrorText("Incorrect password"); // prettier-ignore
    
    // Perform an email/password check on our DB
    const loginRequest = await credentialSignIn(typedEmail, typedPassword); // request object returned
    // request object on failure: {error: "No user found for that email", ok: true, status: 200 }
    // request object on success: {error: null, ...rest doesn't matter }

    // If the login attempt is not successful...
    if (loginRequest.error) {
      const errorMSG = loginRequest.error;
      if (errorMSG === "No user found for that email") setEmailErrorText(errorMSG); // prettier-ignore
      if (errorMSG === "Incorrect password") setPasswordErrorText(errorMSG);
    }

    // If the login attempt is successful, redirect to homepage
    if (!loginRequest.error) {
      router.push("/");
    }
  };

  return (
    <Stack sx={styles.parentContainer}>
      <Typography variant="h2" sx={{ ...mix.titleFont }}>
        Sign In
      </Typography>
      <Typography
        variant="p"
        sx={{
          fontSize: "1.2rem",
          mb: 4,
          px: 2,
          width: "100%",
          maxWidth: "35rem",
        }}
      >
        Sign in to gain access to bookmarks, preserved search history,
        {breakBefore(454)} plus any new features upon release!
      </Typography>

      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={
            emailErrorText === "No user found for that email" ? "secondary" : ""
          }
        >
          User Email:
        </Typography>
        <OutlinedInput
          inputRef={emailRef}
          placeholder="name@email.com"
          error={emailErrorText === "No user found for that email"}
          onChange={typingEmailHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {emailErrorText}
        </FormHelperText>
      </FormControl>

      <FormControl sx={styles.formControl}>
        <Typography
          align="left"
          variant="label"
          color={passwordErrorText === "Incorrect password" ? "secondary" : ""}
        >
          Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          error={passwordErrorText === "Incorrect password"}
          onChange={typingPasswordHandler}
        />
        <FormHelperText sx={styles.formHelperText}>
          {passwordErrorText}
        </FormHelperText>
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={loginHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Log into account
      </Button>
    </Stack>
  );
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "78vh",
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
    mb: 4,
    fontWeight: 500,
  },
  formHelperText: {
    color: "#d32f2f",
    m: 0,
    mt: 0.5,
  },
};
