import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loader({ mt }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <LinearProgress color="secondary" sx={{ margin: "auto", width: "50%" }} />
    </Box>
  );
}
