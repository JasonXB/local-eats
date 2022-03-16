import React from "react";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// For desktop viewports to be used in (Banner.js)
export default function BookmarkDesktop() {
  return (
    <IconButton aria-label="bookmark" sx={styles.parent}>
      <BookmarkIcon sx={styles.icon} />
    </IconButton>
  );
}

const styles = {
  parent: (theme) => ({
    background: theme.palette.bookmark.bg,
    "&:hover": {
      background: theme.palette.bookmark.bg,
      color: theme.palette.bookmark.light,
    },
    ["@media (min-width: 550px)"]: {
      display: "none", // only show on small screens
    },
  }),
  icon: (theme) => ({
    color: theme.palette.bookmark.light,
    "&:hover": {
      background: theme.palette.bookmark.bg,
      color: theme.palette.bookmark.light,
    },
  }),
};
