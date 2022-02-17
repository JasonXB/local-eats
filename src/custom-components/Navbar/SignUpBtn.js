import React from "react";
import { Button } from "@mui/material";

export default function SignupBtn(props) {
  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (props.mobile)
    return (
      <Button
        variant="contained"
        disableElevation
        fullWidth
        sx={{ mb: 2 }}
        href="/auth/signup"
      >
        Sign up
      </Button>
    );
  // If we're past the sm breakpoint, render the following
  return (
    <Button variant="contained" disableElevation href="/auth/signup">
      Sign up
    </Button>
  );
}
