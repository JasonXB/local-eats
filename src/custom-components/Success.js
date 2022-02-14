import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import { styles } from "../../styles/auth/verifyPIN";

export default function Success({ title, message }) {
  return (
    <Stack sx={{...styles.formControl, marginInline: "auto", marginTop: "3.5rem"}}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
      <Typography variant="h6" component="p" sx={{ textAlign: "center", mb:2 }}>
        {message}
      </Typography>
      <Button variant="contained" href="/">
        Return to homepage
      </Button>
    </Stack>
  );
}
