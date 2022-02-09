import React, { useRef, useState } from "react";
import { Typography, Box, Stack, Button, TextField, InputLabel } from "@mui/material"; // prettier-ignore
import Divider from "@mui/material/Divider";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  breakAfter,
  breakBefore,
} from "../../src/custom-components/ConditionalBreak";
import FormHelperText from "@mui/material/FormHelperText";
import { mix } from "../../styles/styleMixins";
import AuthHeader from "../../src/page-blocks/authForms/Header";

//!!! access the currently used email using the session object

export default function signup() {
  // Collect values of what's typed in each of the input fields
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const verifyNewPasswordRef = useRef();

  const submitHandler = function () {
    // Check if each entry has something typed in (no whitespace)
    // Send a request to a local API that validates the email/password
    // error handle along the way
    // If successful, re-route to homepage
  };
  return (
    <Stack sx={styles.parentContainer}>
      <AuthHeader
        titleText={"Change Email"}
        descriptionText={"Swap your current account email for another. Any emails will be directed to your new address once you're done"} // prettier-ignore
      />

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label">
          New Email:
        </Typography>
        <OutlinedInput
          inputRef={currentPasswordRef}
          placeholder="Enter new email"
        />
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={submitHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Start email change process
      </Button>
    </Stack>
  );
}

const styles = {
  parentContainer: {
    width: "100%",
    height: "72vh",
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
};
