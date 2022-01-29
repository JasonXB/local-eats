import React from "react";
import { Button, Box } from "@mui/material";
export default function SignInBtn() {
  return (
    <Button
      sx={{ ml: 2 }}
      href={"example.com"}
      variant="outlined"
      disableElevation
    >
      Sign in
    </Button>
  );
}
