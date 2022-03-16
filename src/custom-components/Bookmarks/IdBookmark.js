import React from "react";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { mix } from "../../../styles/styleMixins";

export default function IdBookmark({ viewportType }) {
  // For business page on desktop screens
  if (viewportType === "desktop") {
    return <BookmarkIcon sx={desktopStyles.icon} />;
  }
  // For business page on mobile screens
  else if (viewportType === "mobile") {
    return (
      <IconButton aria-label="bookmark" sx={mobileStyles.parent}>
        <BookmarkIcon sx={mobileStyles.icon} />
      </IconButton>
    );
  }
  // For search results page (any screen type)
  else return <BookmarkIcon sx={styles.icon} />;
}

const desktopStyles = {
  icon: (theme) => ({
    ...mix.idBookmark,
    color: theme.palette.bookmark.dark,
    borderRadius: 20,
    p: 0.75,
    "&:hover": {
      // background: theme.palette.bookmark.bg,
      color: theme.palette.bookmark.light,
      cursor: "pointer",
    },
    ["@media (max-width: 549px)"]: {
      display: "none",
    },
  }),
};

const mobileStyles = {
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
    color: theme.palette.bookmark.dark,
    "&:hover": {
      background: theme.palette.bookmark.bg,
      color: theme.palette.bookmark.light,
    },
  }),
};

const styles = {
  icon: (theme) => ({
    ...mix.cardBookmark,
    color: theme.palette.bookmark.dark,
    borderRadius: 20,
    "&:hover": { color: theme.palette.bookmark.light },
  }),
};
