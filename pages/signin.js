import React, { useRef, useState } from "react";
import { Typography, Box, Stack, Button, TextField, InputLabel } from "@mui/material"; // prettier-ignore
import Divider from "@mui/material/Divider";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
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

  const googleHandler = function () {};
  const submitHandler = function () {};
  
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
      <Button
        onClick={googleHandler}
        variant="contained"
        color="info"
        disableElevation
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Sign in with Google
      </Button>
      <Divider sx={{ width: "100%", mb: 3, mt: 2, mx: 2 }}>
        <Box component="span" sx={{ position: "relative", top: "10px" }}>
          OR
        </Box>
      </Divider>

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label">
          User Email:
        </Typography>
        <OutlinedInput inputRef={emailRef} placeholder="name@email.com" />
        {/* <FormHelperText sx={{m:0, mt:0.5}}>Sephi</FormHelperText> */}
      </FormControl>

      <FormControl sx={styles.formControl}>
        <Typography align="left" variant="label">
          Password:
        </Typography>
        <OutlinedInput inputRef={passwordRef} placeholder="Enter password" />
      </FormControl>

      <Button
        variant="contained"
        disableElevation
        onClick={submitHandler}
        sx={{ width: "80%", maxWidth: "20.625rem" }}
      >
        Submit
      </Button>
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
