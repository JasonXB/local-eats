import React from "react";
import { Typography, Box, Stack, Button, FormControl, OutlinedInput } from "@mui/material"; // prettier-ignore
import { mix } from "../../styles/styleMixins";

export default function verifyEmail(props) {
  return (
    <Stack sx={styles.parentContainer}>
      <Typography variant="h2" sx={mix.titleFont}>Verify Email</Typography>
      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label" sx={{ mb: 0.5 }}>
          Verification Code:
        </Typography>
        <OutlinedInput
          sx={{ mb: 2 }}
          // inputRef={passwordRef}
          placeholder="6-digit code"
          type="text"
          inputProps={{ maxLength: 6 }}
          // error={formState.passwordError}
          // onChange={typingPasswordHandler}
        />
        <Button variant="contained">SUBMIT</Button>
      </FormControl>
      <Typography variant="p">
        We just sent a 6 digit verification code to {props.email} via email.
        Enter that code to prove that you own this email address. This code
        will expire within 30 minutes
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
