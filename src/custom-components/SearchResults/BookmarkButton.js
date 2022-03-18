import React from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GeneralErrorModal from "../../../src/custom-components/Modals/GeneralError";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function BookmarkButton({
  viewportType, // "mobile" or "desktop"
  dataObj, // data passed from a /search page component
  bookmarkData, // data passed from a /businessID page component
}) {
  const { addBookmark, removeBookmark, bookmarkIds } = useGlobalContext();
  // Send an HTTP request to the DB to save or unsave each bookmark
  const [modalVisible, setModalVisible] = React.useState(false); // decides whether to show error modal
  const clickHandler = async function (dataObj) {
    try {
      // Go into the DB and add/remove this restaurant from the saved list in the DB
      const response = await axios.post("/api/bookmark/addRemove", {
        storeName: dataObj.storeName,
        storeID: dataObj.storeID,
        address: dataObj.address,
        category: dataObj.category,
        distance: dataObj.distance,
        image: dataObj.image,
        price: dataObj.price,
        rating: dataObj.rating,
      });
      const successMSG = response.data.message;
      const savedData = response.data.savedData;
      if (successMSG === "Bookmark added") {
        addBookmark(savedData, savedData.storeID);
      } else if ("Bookmark removed") {
        removeBookmark(savedData.storeID);
      }
      //!!!! debounce this
    } catch (error) {
      setModalVisible(true); // Triggers an error modal that forces a redirect or page reload
    }
  };

  // ----------------------------------------------
  if (!bookmarkIds) return null;
  // Decide which restaurants are already bookmarked based on Global State Values
  let savedAlready;
  let iconColor;
  if (dataObj) {
    savedAlready = bookmarkIds.includes(dataObj.storeID);
    iconColor = savedAlready ? "selected" : "unselected";
  } else if (bookmarkData) {
    savedAlready = bookmarkIds.includes(bookmarkData.storeID);
    iconColor = savedAlready ? "selected" : "unselected";
  }
  // For business page on desktop screens
  if (viewportType === "desktop") {
    return (
      <>
        <BookmarkIcon
          color={iconColor}
          sx={desktopStyles.icon}
          onClick={() => clickHandler(bookmarkData)}
        />
        <GeneralErrorModal modalVisible={modalVisible} />
      </>
    );
  }
  // For business page on mobile screens
  else if (viewportType === "mobile") {
    return (
      <>
        <IconButton
          aria-label="bookmark"
          onClick={() => clickHandler(bookmarkData)}
          sx={mobileStyles.parent}
        >
          <BookmarkIcon color={iconColor} sx={mobileStyles.icon} />
        </IconButton>
        <GeneralErrorModal modalVisible={modalVisible} />
      </>
    );
  }
  // For search results page (any screen type)
  else
    return (
      <>
        <BookmarkIcon
          color={iconColor} // decide color based on whether the restaurant's bookmarked
          sx={styles.icon}
          onClick={() => clickHandler(dataObj)}
        />
        <GeneralErrorModal modalVisible={modalVisible} />
      </>
    );
}
const bmColor = {
  bg: "#00162e",
};
const desktopStyles = {
  icon: (theme) => ({
    // Position inside of the grid this component gets placed in (business ID page only)
    fontSize: "2.5rem",
    ml: "auto",
    gridRow: "2/4",
    p: 0.5,
    borderRadius: 2,
    alignSelf: "end",
    borderRadius: 20,
    p: 0.75,
    background: bmColor.bg,
    "&:hover": {
      color: bmColor.gold,
      cursor: "pointer",
    },
    ["@media (max-width: 549px)"]: {
      display: "none",
    },
  }),
};

const mobileStyles = {
  parent: (theme) => ({
    background: bmColor.bg,
    "&:hover": {
      background: bmColor.bg,
      color: bmColor.gold,
    },
    ["@media (min-width: 550px)"]: {
      display: "none", // only show on small screens
    },
  }),
  icon: (theme) => ({
    "&:hover": {
      background: bmColor.bg,
      color: bmColor.gold,
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
    background: bmColor.bg,
    borderRadius: 20,
    // Color should change on hover
    "&:hover": { color: bmColor.gold },
  }),
};
