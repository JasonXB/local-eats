import React from "react";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function SignupBtn(props) {
  const router = useRouter();
  const onClickHandler = () => router.push("/signup");

  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (props.mobile)
    return (
      <Button
        variant="contained"
        disableElevation
        fullWidth
        sx={{ mb: 2 }}
        onClick={onClickHandler}
      >
        Sign up
      </Button>
    );
  // If we're past the sm breakpoint, render the following
  return (
    <Button variant="contained" disableElevation onClick={onClickHandler}>
      Sign up
    </Button>
  );
}
