import React from "react";
import { Box, Stack } from "@mui/material";

export default function FullSpin() {
  return (
    <Box>
      <div className="loader" sx={stylesLocal["spinner"]}></div>
    </Box>
  );
}

const stylesLocal = {
  container: {
    width: "100%",
    height: "100%",
  },
  spinner: {
    margin: "auto",
  },
};