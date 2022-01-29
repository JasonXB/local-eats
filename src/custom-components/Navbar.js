import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { mix } from "../../styles/styleMixins";

export default function Navbar() {
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "#fffbf7",
      }}
      href={"example.com"}
    >
      <Typography
        variant="h2"
        component="h1"
        color="primary"
        align="center"
        sx={mobileStyles.title}
      >
        Local Eats
      </Typography>
      <Box>
        <Button variant="contained" disableElevation>
          Sign up
        </Button>
        <Button
          sx={{ ml: 2 }}
          href={"example.com"}
          variant="outlined"
          disableElevation
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}

const mobileStyles = {
  title: {
    ...mix.titleFont,
    ...mix.regMargin("mt"),
    my: 0,
  },
};
