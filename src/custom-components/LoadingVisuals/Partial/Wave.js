import React from "react";
import { Box } from '@mui/material';

export default function FullscreenSpinner() {
  return (
    <Box   
      sx={{
        display: "flex",
        height: "100%",
        weight: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="dots-flow"></div>
    </Box>
  );
}
