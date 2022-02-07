import axios from "axios";
import React, { useRef, useState } from "react";
import { Typography, Box, Stack, Button, FormControl, OutlinedInput } from "@mui/material"; // prettier-ignore
import { mix } from "../../styles/styleMixins";
import { useGlobalContext } from "../../state-management/globalContext";
//! only let users currently logging in to access this
//! only allow 2 attempts max, quit back to home or something (do what slack does)

export default function verifyEmail() {
  const pinRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null);
  const verifyHandler = async function () {
    const typedPIN = pinRef.current.value;
    // Extract the pending email data we saved at the end of /auth/signup.js
    const pendingEmailData = localStorage.getItem("pendingEmailData");
    const { hashedPIN, expiryDatePIN, pendingEmail, password } = JSON.parse(pendingEmailData); // prettier-ignore
    //! if user fails, make sure to clear the project state for pin and hashed password.
    //! add in error handling
    try {
      // Request a new account
      await axios.post("/api/auth/signupP2", {
        submittedPIN: typedPIN, // the pin we type in this pg's form
        hashedPIN, // a hashed version of the correct PIN we emailed
        expiryDatePIN,
        email: pendingEmail, // email submitted in /signup
        password, // password submitted in /signup
      });
      // If account creation succeeds, clear out the localStorage data we saved
      localStorage.removeItem("pendingEmailData");
      //! Reroute to homepage while logged in and render a message saying new account created
    } catch (error) {
      console.error(error);
    }
  };

  const returnHomeHandler = function () {
    localStorage.removeItem("pendingEmailData");
    window.location.href = "/auth/signup";
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
      <Stack sx={{ height: "5rem" }}>
        {!errorMessage && (
          <Typography variant="p" sx={{ mb: 1 }}>
            We just sent a 6 digit verification code to the email you submitted
            (be sure to check your spam folder if you cannot find it). The code
            expires in 30 minutes and you only get 1 try before it becomes
            invalid
          </Typography>
        )}
        {errorMessage === "PIN incorrect" && (
          <>
            <Typography variant="p">
              The PIN you submitted is incorrect
            </Typography>
            <Button variant="text" sx={{ mt: 2 }} onClick={returnHomeHandler}>
              Return to sign up page and try again
            </Button>
          </>
        )}
        {errorMessage === "PIN expired" && (
          <>
            <Typography variant="p">This PIN has expired</Typography>
            <Button variant="text" sx={{ mt: 2 }} onClick={returnHomeHandler}>
              Return to sign up page and try again
            </Button>
          </>
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
