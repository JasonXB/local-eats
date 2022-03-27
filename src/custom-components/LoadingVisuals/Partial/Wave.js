import React from "react";
import { Box } from "@mui/material";

export default function SpreadSpinner() {
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
      <div className="dots-flow"></div>
    </Box>
  );
}
