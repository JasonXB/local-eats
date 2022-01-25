import React from "react";
import { Box } from "@mui/material";
export const breakBefore = function (pxBreakpoint) {
  return (
    <Box
      component="br"
      sx={{
        [`@media (min-width: ${pxBreakpoint}px)`]: {
          display: "none",
        },
      }}
    />
  );
};
export const breakAfter = (pxBreakpoint) => {
  return (
    <Box
      component="br"
      sx={{
        display: "none",
        [`@media (min-width: ${pxBreakpoint}px)`]: {
          display: "block",
        },
      }}
    />
  );
};
