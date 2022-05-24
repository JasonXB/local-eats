import React from "react";
import AbsoluteCenter from "../src/custom-components/LoadingVisuals/AbsoluteCenter";
import OffsetFromTop from "../src/custom-components/LoadingVisuals/OffsetFromTop";

import { Typography, Box, Stack } from "@mui/material";
export default function loader() {
  return (
    <Box sx={{ height: "100vh" }}>
      {/* <Typography variant="h1" sx={{ my: 10 }}>
        Title
      </Typography> */}
      <AbsoluteCenter />
    </Box>
  );
}
