import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loader({ mt }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        mt: 10,
      }}
    >
      <LinearProgress color="secondary" sx={{ margin: "auto", width: "40%" }} />
    </Box>
  );
}
