import React from "react";
import { Button, Box } from "@mui/material";

export default function SignInBtn(props) {
  // Clicking the button redirects us to the sign in page
  if (props.mobile)
    return (
      <Button fullWidth href="/auth/signin" variant="outlined" sx={{ mb: 1 }}>
        Sign in
      </Button>
    );

  return (
    <Button sx={{ ml: 2 }} href="/auth/signin" variant="outlined">
      Sign in
    </Button>
  );
}
