import React from "react";
import { Box } from "@mui/material";

export default function FullSpin() {
  return (
    <Box
      sx={{
        width: "calc(100vw - (100vw - 100%))",
        height: "calc(100vh - (100vh - 100%))",
      }}
    >
      <div
        class="fullscreen_loader"
        style={{ position: "absolute", left: "50%", top: "50%" }}
      ></div>
    </Box>
  );
}
