import React from "react";
import { Button } from "@mui/material";
import { useGlobalContext } from "../../../state-management/globalContext";
export default function SignOutBtn(props) {
  const { signOutProject } = useGlobalContext();
  const signoutHandler = async function () {
    
  };

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
