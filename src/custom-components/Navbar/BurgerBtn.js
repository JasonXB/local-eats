/* eslint-disable */
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { breakBefore } from "../ConditionalBreak";
import { mix } from "../../../styles/styleMixins";
import { v4 as uuidv4 } from "uuid";
import SignOutBtn from "./SignOutBtn";
import SignUpBtn from "./SignUpBtn";
import SignInBtn from "./SignInBtn";
import BookmarksBtn from "./BookmarksBtn";
import ManageAccountBtn from "./ManageAccountBtn";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

export default function TemporaryDrawer(props) {
  let listItems;
  if (!props.currentlyOnline) {
    listItems = [<SignUpBtn key={uuidv4()} />, <SignInBtn key={uuidv4()} />];
  } else {
    listItems = [
      <BookmarksBtn key={uuidv4()} />,
      <ManageAccountBtn key={uuidv4()} />,
      <SignOutBtn key={uuidv4()} />,
    ];
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
  if (!props.currentlyOnline) {
    list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List sx={{ p: 2 }}>
          {/* <Typography align="center" sx={{ mt: 1, mb: 2 }}>
            Having an account lets you bookmark {breakBefore(550)}restaurants to
            revisit later!
          </Typography>
          <SignUpBtn mobile={true} />
          <SignInBtn mobile={true} /> */}
          {props.addHomepageButton && (
            <Button href="/" fullWidth sx={{ mt: "10px" }}>
              Return to homepage
            </Button>
          )}
        </List>
      </Box>
    );
  }
  // If logged in, render the following in the drawer
  if (props.currentlyOnline) {
    list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List sx={{ p: 2 }}>
          <BookmarksBtn mobile={true} />
          <ManageAccountBtn mobile={true} />
          {props.addHomepageButton && (
            <Button href="/" fullWidth sx={{ mb: 1 }}>
              Return to homepage
            </Button>
          )}
          <SignOutBtn mobile={true} />
        </List>
      </Box>
    );
  }

  // We change the margins depending on if a specific prop is supplied
  let burgerMargins;
  if (props.parent === "searchPage") burgerMargins = { mr: 2, mt: 1 };
  else if (props.parent === "businessPage") burgerMargins = { mr: 4, mt: 1 };
  else burgerMargins = { mr: 2, mt: 2.2 };
  return (
    <>
      <Box
        sx={(theme) => {
          return {
            position: "absolute",
            right: 0,
            ...burgerMargins,
            ...mix.hideAfter(props.burgerBP),
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
    </>
  );
}
