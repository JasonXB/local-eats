import React from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GeneralErrorModal from "../../../src/custom-components/Modals/GeneralError";
import { useGlobalContext } from "../../../state-management/globalContext";

export default function BookmarkButton({ viewportType, dataObj }) {
  const { addBookmark, removeBookmark } = useGlobalContext();
  // Control the general error modal should open if one of our API route 3rd party services fail
  const [modalVisible, setModalVisible] = React.useState(false);
  const revealErrorModal = () => setModalVisible(true);

  // Send an HTTP request to the DB to save or unsave each bookmark
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
      revealErrorModal();
      // Triggers an error modal that forces a redirect or page reload
      // This works if the user's offline since thes bookmark icons will be hidden if they return
      // If a 3rd party service fails, this course of action is reasonable too
    }
  };

  // ----------------------------------------------
  // For business page on desktop screens
  if (viewportType === "desktop") {
    return (
      <>
        <BookmarkIcon sx={desktopStyles.icon} />
        <GeneralErrorModal modalVisible={modalVisible} />
      </>
    );
  }
  // For business page on mobile screens
  else if (viewportType === "mobile") {
    return (
      <>
        <IconButton aria-label="bookmark" sx={mobileStyles.parent}>
          <BookmarkIcon sx={mobileStyles.icon} />
        </IconButton>
        <GeneralErrorModal modalVisible={modalVisible} />
      </>
    );
  }
  // For search results page (any screen type)
  else
    return (
      <>
        <BookmarkIcon sx={styles.icon} onClick={() => clickHandler(dataObj)} />
        <GeneralErrorModal modalVisible={modalVisible} />
      </>
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
