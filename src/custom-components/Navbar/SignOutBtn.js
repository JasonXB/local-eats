import React from "react";
import { Button } from "@mui/material";

export default function SignOutBtn(props) {
  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (props.mobile) {
    return (
      <Button variant="contained" fullWidth sx={{ mb: 1 }} disableElevation>
        Sign Out
      </Button>
    );
  }
  // If we're past the sm breakpoint, render the following
  return (
    <Button variant="contained" disableElevation sx={{ ml: 2 }}>
      Sign Out
    </Button>
  );
}
