import React from "react";
import { Box } from "@mui/material";

export default function SpreadSpinner({ variant = "normal" }) {
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
      <div className={variant === "low" ? "dots-flow2" : "dots-flow"}></div>
    </Box>
  );
}
