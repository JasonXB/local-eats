import React from "react";
import { Box } from "@mui/material";

export default function PartialSpin() {
  return (
    <Box sx={stylesLocal.container}>
      <Box className="loader" sx={stylesLocal["spinner"]}></Box>
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
