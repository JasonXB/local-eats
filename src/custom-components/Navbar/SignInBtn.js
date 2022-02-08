import React from "react";
import { useRouter } from "next/router";
import { Button, Box } from "@mui/material";
export default function SignInBtn(props) {
  // Clicking the button redirects us to the sign in page
  const router = useRouter();
  const onClickHandler = () => router.push("/auth/signin");

  if (props.mobile)
    return (
      <Button
        fullWidth
        onClick={onClickHandler}
        variant="outlined"
        disableElevation
        sx={{ mb: 1 }}
      >
        Sign in
      </Button>
    );

  return (
    <Button
      sx={{ ml: 2 }}
      onClick={onClickHandler}
      variant="outlined"
      disableElevation
    >
      Sign in
    </Button>
  );
}
