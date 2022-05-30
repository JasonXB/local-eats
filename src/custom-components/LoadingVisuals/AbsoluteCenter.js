import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
      <CircularProgress
        color="secondary"
        sx={{ margin: "auto", width: "50%" }}
      />
    </Box>
  );
}
