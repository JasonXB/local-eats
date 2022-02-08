import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Stack, Button, FormControl, OutlinedInput } from "@mui/material"; // prettier-ignore
import { mix } from "../../styles/styleMixins";
//! only let users currently logging in to access this
//! only allow 2 attempts max, quit back to home or something (do what slack does)

export default function verifyEmail() {
  const pinRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  // Redirect visitors who arrived without going through /auth/signup first
  let pendingEmail;
  useEffect(() => {
    pendingEmail = localStorage.getItem("pendingAccountEmail");
    if (!pendingEmail) window.location.href = "/auth/signup";
  }, []);

  const verifyHandler = async function () {
    const typedPIN = pinRef.current.value;
    console.log(pendingEmail);
    try {
      // Verify your account to gain access to new features
      const kz = await axios.post("/api/auth/signupP2", {
        pendingEmail,
        submittedPIN: typedPIN, // the pin we type in this pg's form
      });
      // console.log(kz);
      // If account creation succeeds, clear out the localStorage data we saved
      //! Reroute to homepage while logged in and render a message saying new account created
    } catch (error) {
      // Render an error message dependent on the response object's problem with the PIN submitted
      const responseMessage = error.response.data.message;
      if(responseMessage === "Invalid PIN") setErrorMessage("Invalid PIN"); // prettier-ignore
      if(responseMessage === "PIN has expired") setErrorMessage("PIN has expired"); // prettier-ignore
      // Remove the pending data from LocalStorage and trigger a page redirect after 5 seconds
      localStorage.removeItem("pendingAccountEmail");
      setTimeout(() => {
        window.location.href = "/auth/signup";
      }, 5000);
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
          disabled={errorMessage && true}
          // error={formState.passwordError}
          // onChange={typingPasswordHandler}
        />
        <Button variant="contained" onClick={verifyHandler}>
          VERIFY
        </Button>
      </FormControl>
      <Stack sx={{ height: "5rem" }}>
        {!errorMessage && (
          <Typography variant="p" sx={{ mb: 1 }}>
            We just sent a 6 digit verification code to the email you submitted
            (be sure to check your spam folder if you cannot find it). The code
            expires in 30 minutes and you only get 1 try before you must restart
            on our sign up page
          </Typography>
        )}
        {errorMessage === "Invalid PIN" && (
          <Typography variant="p">
            The PIN you submitted is not correct. You will be redirected to the
            sign up page in 5 seconds...
          </Typography>
        )}
        {errorMessage === "PIN has expired" && (
          <Typography variant="p">
            This PIN has expired. You will be redirected to the sign up page in
            5 seconds...
          </Typography>
        )}
      </Stack>
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
