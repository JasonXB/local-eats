import React from "react";
import { Box } from "@mui/material";

export default function FullSpin({ mt }) {
  const stylesLocal = {
    container: {
      width: "100%",
      height: "100%",
      mt: mt || "calc((100vh - 56px)/2)", // halfway pt determined using the animation height of 56px
      overflow: "hidden",
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
