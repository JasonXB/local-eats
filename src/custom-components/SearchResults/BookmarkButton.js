import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GeneralErrorModal from "../../../src/custom-components/Modals/GeneralError";
import { useGlobalContext } from "../../../state-management/globalContext";
import debounce from "lodash.debounce";

export default function BookmarkButton({
  viewportType, // "mobile" or "desktop"
  dataObj, // data passed from a /search page component
  bookmarkData, // data passed from a /businessID page component
}) {
  const { addBookmark, removeBookmark, bookmarkIds } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false); // decides whether to show error modal
  const [color, setColor] = useState("unselected");

  useEffect(() => {
    // Decide which restaurants are already bookmarked based on Global State Values
    let savedAlready;
    if (dataObj) {
      savedAlready = bookmarkIds.includes(dataObj.storeID); // bool
      savedAlready && setColor("selected");
    } else if (bookmarkData) {
      savedAlready = bookmarkIds.includes(bookmarkData.storeID);
      savedAlready && setColor("selected");
    }
  }, []);

  // Send an HTTP request to the DB to save or unsave each bookmark
  const INTERVAL = 1000; // debounce timer (cancel subsequent requests that happen within this timeframe)
  const clickHandler = useCallback(
    debounce(
      async function (dataObj) {
        console.log("hit");
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
            setColor("selected");
          } else if ("Bookmark removed") {
            removeBookmark(savedData.storeID);
            setColor("unselected");
          }
        } catch (error) {
          setModalVisible(true); // Triggers an error modal that forces a redirect or page reload
        }
      },
      INTERVAL,
      { leading: true, trailing: false, maxWait: INTERVAL }
    ),
    []
  );

  // ----------------------------------------------
  if (!bookmarkIds) return null;

  // For business page on desktop screens
  if (viewportType === "desktop") {
    return (
      <>
        <BookmarkIcon
          color={color}
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
          <BookmarkIcon color={color} sx={mobileStyles.icon} />
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
          color={color} // decide color based on whether the restaurant's bookmarked
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
      color: theme.palette.selected.main,
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
      color: theme.palette.selected.main,
    },
    ["@media (min-width: 550px)"]: {
      display: "none", // only show on small screens
    },
  }),
  icon: (theme) => ({
    "&:hover": {
      background: bmColor.bg,
      color: theme.palette.selected.main,
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
    "&:hover": { color: theme.palette.selected.main },
  }),
};
