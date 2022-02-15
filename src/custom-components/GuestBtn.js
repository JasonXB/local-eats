import React from "react";
import { Button } from "@mui/material";
import { styles } from "../../styles/auth/verifyPIN";

export default function GuestBtn() {
  return (
    <Button href="/" variant="outlined" sx={{ ...styles.formControl, mt: 2, mb:0, marginInline:'auto' }}>
      Enjoy site as a guest
    </Button>
  );
}
