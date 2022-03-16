import React from "react";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { mix } from "../../../styles/styleMixins";

export default function IdBookmark() {
  return <BookmarkIcon sx={styles.icon} />;
}

const styles = {
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
