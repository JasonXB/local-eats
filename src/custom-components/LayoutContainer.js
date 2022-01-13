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
        marginTop: props.marginAbove || "0px",
      }}
    >
      <Container
        maxWidth="1132px"
        sx={{ width: "100%", paddingInline: "16px" }}
      >
        {props.children}
      </Container>
    </Box>
  );
}

export default LayoutContainer;
