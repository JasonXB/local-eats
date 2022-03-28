import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

export default function BookmarksBtn(props) {
  // There's no reason to render this button if we're already on the bookmarks page
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/bookmarks" && !hidden) setHidden(true);
  }, []);

  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (hidden) return null;
  // If we're before the sm breakpoint, render the following
  else if (props.mobile) {
    return (
      <Button href="/bookmarks" fullWidth sx={{ mb: 1 }}>
        Bookmarks
      </Button>
    );
  }
  // If we're past the sm breakpoint, render the following
  return (
    <Button href="/bookmarks" sx={{ ml: 1, mx: 2, ...mix.whiteHoverBG }}>
      Bookmarks
    </Button>
  );
}
