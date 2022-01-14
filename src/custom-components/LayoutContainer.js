import React from "react";
import { Container, Box } from "@mui/material";

function LayoutContainer(props) {
  // This will have 16px inline padding on mobile screens
  // On desktop screens, the main content will max out at 1100px (padding will still be there but not affect much)
  return (
    <Box
      sx={{
        width: "100vw",
        background: props.bg || "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1300px",
          margin: "auto",
          marginTop: props.marginAbove || "0px",
          px: 2,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default LayoutContainer;
