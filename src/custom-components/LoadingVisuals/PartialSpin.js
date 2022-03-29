import React from "react";
import { Box } from "@mui/material";

export default function PartialSpin({ mt = 20 }) {
  const stylesLocal = {
    container: {
      width: "100%",
      height: "100%",
      mt: mt,
    },
    spinner: {
      margin: "auto",
    },
  };

  return (
    <Box sx={stylesLocal.container}>
      <Box className="loader" sx={stylesLocal["spinner"]}></Box>
    </Box>
  );
}
