import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import ThemeBtn from "./ThemeBtn";
export default function Navbar() {
  return (
    <>
      {/* Shown only on viewports over md breakpoint */}
      <Box sx={styles.boxParent} href={"example.com"}>
        <ThemeBtn/>
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
            Sign in
          </Button>
        </Box>
      </Box>
    </>
  );
}

const mobileStyles = {
  title: {
    ...mix.titleFont,
    ...mix.regMargin("mt"),
    my: 0,
  },
};

const styles = {
  boxParent: (theme) => {
    return {
      py: 1,
      px:2,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      bgcolor: "#fffbf7",
      [theme.breakpoints.down("sm")]: { display: "none" },
    };
  },
};
