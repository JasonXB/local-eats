import React from "react";

import { Typography, Box, Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import SignInBtn from "./SignInBtn";
import SignUpBtn from "./SignUpBtn";
import BookmarksBtn from "./BookmarksBtn";
import ManageAccountBtn from "./ManageAccountBtn";
import SignOutBtn from "./SignOutBtn";

/* Shown only on viewports past the md breakpoint */
export default function NavbarDesktop(props) {
  // If we're not signed in, render this (login status passed down here via props)

  if (!props.currentlyOnline) {
    return (
      <Box sx={desktopStyles.boxParent}>
        <Box>
          <SignUpBtn />
          <SignInBtn />
        </Box>
      </Box>
    );
  }
  // If we are signed in, render the following...
  return (
    <>
      <Box sx={desktopStyles.boxParent}>
        <Box>
          <BookmarksBtn />
          <ManageAccountBtn />
          <SignOutBtn />
        </Box>
      </Box>
    </>
  );
}

const desktopStyles = {
  boxParent: (theme) => {
    return {
      ...mix.hideBeforeBP("sm", theme),
      py: 1,
      px: 2,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      bgcolor: "#fffbf7",
      
    };
  },
};
