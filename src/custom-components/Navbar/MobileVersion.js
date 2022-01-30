import React from "react";
import { useGlobalContext } from "../../../state-management/globalContext";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { breakBefore, breakAfter } from "../ConditionalBreak";
import { mix } from "../../../styles/styleMixins";
import SignOutBtn from "./SignOutBtn";
import SignUpBtn from "./SignUpBtn";
import SignInBtn from "./SignInBtn";
import BookmarksBtn from "./BookmarksBtn";
import HistoryBtn from "./HistoryBtn";
import ThemeBtn from "./ThemeBtn";
// --
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export default function TemporaryDrawer() {
  const { onlineStatus } = useGlobalContext();
  let listItems;
  if (!onlineStatus) {
    listItems = [<SignUpBtn />, <SignInBtn />];
  } else {
    listItems = [<HistoryBtn />, <BookmarksBtn />, <SignOutBtn />];
  }
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  let list; //changes based on login status
  // If not logged in, render these items in the drawer
  if (!onlineStatus) {
    list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List sx={{ p: 2 }}>
          <Typography align="center" sx={{ my: 1 }}>
            Having an account lets you bookmark {breakBefore(550)}restaurants to
            revisit later!
          </Typography>
          <SignUpBtn mobile={true} />
          <SignInBtn mobile={true} />
        </List>
      </Box>
    );
  }
  // If logged in, render the following in the drawer
  if (onlineStatus) {
    list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List sx={{ p: 2 }}>
          <HistoryBtn mobile={true} />
          <BookmarksBtn mobile={true} />
          <SignOutBtn mobile={true} />
        </List>
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={(theme) => {
          return {
            position: "absolute",
            left: 0,
            ml: 2,
            mt: 2.2,
            ...mix.hideAfterBP("sm", theme),
            "& .MuiSvgIcon-root": { fontSize: "2.5rem" },
            "&:hover": { cursor: "pointer" },
          };
        }}
      >
        {["top"].map((anchor) => (
          <React.Fragment key={anchor}>
            <MenuIcon onClick={toggleDrawer(anchor, true)} />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Box>{" "}
      <IconButton
        color="primary"
        sx={(theme) => {
          return {
            position: "absolute",
            right: 0,
            // p: 0,
            mt: 1.45,
            mr: 2,
            ...mix.hideAfterBP("sm", theme),
          };
        }}
      >
        <Brightness4Icon fontSize="large" />
      </IconButton>
    </>
  );
}
