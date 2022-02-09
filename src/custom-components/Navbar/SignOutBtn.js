import React from "react";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutBtn(props) {
  const signoutHandler = () => signOut();

  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (props.mobile) {
    return (
      <Button
        onClick={signoutHandler}
        variant="contained"
        fullWidth
        sx={{ mb: 1 }}
        disableElevation
      >
        Sign Out
      </Button>
    );
  }
  // If we're past the sm breakpoint, render the following
  return (
    <Button
      onClick={signoutHandler}
      variant="contained"
      disableElevation
      sx={{ ml: 2 }}
    >
      Sign Out
    </Button>
  );
}
