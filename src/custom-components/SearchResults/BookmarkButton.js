import React from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function BookmarkButton({ viewportType, dataObj }) {
  // Send an HTTP request to the DB to save or unsave each bookmark
  const clickHandler = async function (dataObj) {
    // Go into the DB and add/remove this restaurant from the saved list
    await axios.post("/api/search/bookmark", {
      address: dataObj.address,
      category: dataObj.category,
      distance: dataObj.distance,
      image: dataObj.image,
      price: dataObj.price,
      rating: dataObj.rating,
      storeID: dataObj.storeID,
      storeName: dataObj.storeName,
    });
  };

  // ----------------------------------------------
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
  else
    return (
      <BookmarkIcon sx={styles.icon} onClick={() => clickHandler(dataObj)} />
    );
}

const desktopStyles = {
  icon: (theme) => ({
    // Position inside of the grid this component gets placed in (business ID page only)
    fontSize: "2.5rem",
    ml: "auto",
    gridRow: "2/4",
    p: 0.5,
    borderRadius: 2,
    background: "#00162e",
    alignSelf: "end",
    // Color should change on hover
    color: theme.palette.bookmark.dark,
    borderRadius: 20,
    p: 0.75,
    "&:hover": {
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
    // Position the icon on top of the restaurant image portion of the card
    position: "absolute",
    fontSize: "2.5rem",
    right: "5%",
    top: "5%",
    p: 0.5,
    borderRadius: 2,
    background: "#00162e",
    // Color should change on hover
    color: theme.palette.bookmark.dark,
    borderRadius: 20,
    "&:hover": { color: theme.palette.bookmark.light },
  }),
};
