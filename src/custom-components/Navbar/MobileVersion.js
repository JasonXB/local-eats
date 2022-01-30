import React from "react";
import { useGlobalContext } from "../../../state-management/globalContext";
import { Typography, Box, Button } from "@mui/material";
import { breakBefore, breakAfter } from "../ConditionalBreak";
import SignOutBtn from "./SignOutBtn";
import SignUpBtn from "./SignUpBtn";
import SignInBtn from "./SignInBtn";
import BookmarksBtn from "./BookmarksBtn";
import HistoryBtn from "./HistoryBtn";
// --
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

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
        <Divider />
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
          <HistoryBtn mobile={true}/>
          <BookmarksBtn mobile={true}/>
          <SignOutBtn mobile={true}/>
        </List>
        <Divider />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        position: "absolute",
        // right: 0,
        ml: 2,
        mt: 2,
        "& .MuiSvgIcon-root": { fontSize: "2.5rem" },
        "&:hover": { cursor: "pointer" },
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
    </Box>
  );
}

const styles = {
  container: {
    position: "fixed",
  },
};
