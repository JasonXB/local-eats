import React from "react";
import { useSession } from "next-auth/react";
import { Typography, Box } from "@mui/material";
// Imports for offline users
import SignUpBtn from "../../../custom-components/Navbar/SignUpBtn";
import SignInBtn from "../../../custom-components/Navbar/SignInBtn";
// Imports for online users
import SignOutBtn from "../../../custom-components/Navbar/SignOutBtn";
import BookmarksBtn from "../../../custom-components/Navbar/BookmarksBtn";
import ManageAccountBtn from "../../../custom-components/Navbar/ManageAccountBtn";

export default function NavbarRow() {
  const { data: session, status } = useSession();
  // If online, render the following
  if (status === "authenticated") {
    return (
      <Box sx={styles.container}>
        <BookmarksBtn />
        <ManageAccountBtn />
        <SignOutBtn />
      </Box>
    );
  }
  // If offline, render the following
  return (
    <Box sx={styles.container}>
      {/* <SignUpBtn />
      <SignInBtn /> */}
    </Box>
  );
}

const styles = {
  container: { my: "2rem" },
};
