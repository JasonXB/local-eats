import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from '@mui/material';

export default function FullscreenSpinner() {
  return (
    <Box   
      sx={{
        display: "flex",
        height: "100vh",
        weight: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="dots-flow"></div>
    </Box>
  );
}
