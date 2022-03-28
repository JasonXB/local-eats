import React from "react";
import { Box } from "@mui/material";

export default function SpreadSpinner({ variant = "normal" }) {
  // Pass "normal, low, or ultralow" as a variant prop to determine how low to play the load animation
  // We've set up 3 distinct animations for them in our global css file in the styles folder
  return <div class="loader"></div>;
  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       height: "100%",
  //       weight: "100%",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <div className={`dots-flow-${variant}`}></div>
  //   </Box>
  // );
}
