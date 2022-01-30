import React from "react";
import { Button, Box } from "@mui/material";
export default function SignInBtn(props) {
  if (props.mobile)
    return (
      <Button
        fullWidth
        // href={"example.com"}
        variant="outlined"
        disableElevation
        sx={{mb:1}}
      >
        Sign in
      </Button>
    );

  return (
    <Button
      sx={{ ml: 2 }}
      // href={"example.com"}
      variant="outlined"
      disableElevation
    >
      Sign in
    </Button>
  );
}
