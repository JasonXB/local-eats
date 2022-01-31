import React, { useRef, useState } from "react";
import { Typography, Box, Stack, Button, TextField, InputLabel } from "@mui/material"; // prettier-ignore
import Divider from "@mui/material/Divider";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import {
  breakAfter,
  breakBefore,
} from "../src/custom-components/ConditionalBreak";
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../styles/styleMixins";

export default function signup() {
  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();

  const googleHandler = function () {};

  const submitHandler = async function () {
    // Capture what's typed in each input
    const typedEmail = emailRef.current.value;
    const typedPassword = passwordRef.current.value;
    const typedPassword2 = verifyPasswordRef.current.value;
    // Send a request to our API route that validates the email (sees if it is blatantly fake)
    try {
      const checkEmail = await axios.post("/api/auth/inspectEmail", {
        email: typedEmail,
      });
    } catch (err) {
      alert("Invalid email"); //!
      return; // if the email's invalid, stop the execution here
    } // Passing this point means our email is valid

    // Check to see if our password strength is high enough
    try {
      // Make a request to the API route that checks our password strength
      const checkPassword = await axios.post("/api/auth/checkPasswordStrength", { password: typedPassword }); // prettier-ignore
      // If our password is strong enough, the rest of this block executes (if not, we get sent to catch block)
    } catch (err) {
      // Being sent here means our password was inadequate
      alert("Password does not meet requirements"); //! plus render the message below
      return; // if the password's too weak, stop the execution here
    }

    // Make sure that the verify password field matches the regular password field
    if (typedPassword !== typedPassword2) {
      alert("Verify password does not match new password");
    }

    // Past this point, the email is likely valid, the password is strong, and the password field inputs match
    console.log("Fields appear valid");
    //! Navigate the user to a new page and send them a verification email
    // If the email fails the test, render a message saying it is invalid
    // If the email passes the test, check the strength of the password
    // If the password isn't strong enough, render a message saying so
    // If the password is strong enough, send an email verification link
    // nav the user to a new page telling them we emailed them a verif link
    // const checkPassword = await axios.get("/api/auth/checkPasswordStrength", {
    //   password: typedPassword,
    // });
    // console.log(checkPassword);
  };
  return (
    <Stack sx={styles.parentContainer}>
      <Typography variant="h2" sx={{ ...mix.titleFont }}>
        Sign Up
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
        Sign up and gain access to bookmarks, preserved search history,
        {breakBefore(454)} plus any new features upon release!
      </Typography>
      <Button
        onClick={googleHandler}
        variant="contained"
        color="info"
        disableElevation
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Sign up with Google
      </Button>
      <Divider
        sx={{ width: "100%", mb: 3, mt: 2, mx: 2, verticalAlign: "center" }}
      >
        <Box component="span" sx={{ position: "relative", top: "10px" }}>
          OR
        </Box>
      </Divider>

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label">
          User Email:
        </Typography>
        <OutlinedInput inputRef={emailRef} placeholder="name@email.com" />
      </FormControl>

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label">
          Password:
        </Typography>
        <OutlinedInput
          inputRef={passwordRef}
          placeholder="Enter password"
          type="password"
        />
      </FormControl>

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label">
          Verify Password:
        </Typography>
        <OutlinedInput
          inputRef={verifyPasswordRef}
          placeholder="Enter password again"
          type="password"
        />
      </FormControl>
      <Button
        variant="contained"
        disableElevation
        onClick={submitHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Submit
      </Button>
      <Typography variant="p" sx={{ mt: 2 }}>
        PASSWORD REQUIREMENTS
      </Typography>
      <Typography variant="p">
        Must be 8 characters or longer. Requires an uppercase, lowercase, plus
        at least 1 symbol. No punctuation allowed
      </Typography>
    </Stack>
  );
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "100vh",
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
  uniformWidth: {
    width: "80%",
    maxWidth: "20.625rem",
  },
};
