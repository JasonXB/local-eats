import React, { useCallback, useState, useEffect,useReducer } from "react"; // prettier-ignore
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GeneralErrorModal from "../../../src/custom-components/Modals/GeneralError";
import { useGlobalContext } from "../../../state-management/globalContext";
import debounce from "lodash.debounce";

function reducer(state, action) {
  switch (action.type) {
    case "SELECT":
      return { color: "selected", num: 0 };
    case "UNSELECT":
      return { color: "unselected", num: 0 };
    case "PRE_SWAP_COLOR":
      if (state.color === "selected") return { color: "unselected", num: 1 };
      if (state.color === "unselected") return { color: "selected", num: 1 };
    default:
      return state;
  }
}

export default function BookmarkButton({
  viewportType, // "mobile" or "desktop"
  dataObj, // data passed from a /search page component
  bookmarkData, // data passed from a /businessID page component
}) {
  const { addBookmark, removeBookmark, bookmarkIds } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false); // decides whether to show error modal
  const [state, dispatch] = useReducer(reducer, {
    num: 0, // prevents an infinite loop when we pre-change icon colors
    color: "unselected", // 'selected' and 'unselected' refers to one of our theme colors
  });

  useEffect(() => {
    // Color the bookmark icon gold if its saved in our DB when we arrive at this pg
    let savedAlready;
    if (dataObj) {
      savedAlready = bookmarkIds.includes(dataObj.storeID); // bool
      savedAlready && dispatch({ type: "SELECT" });
    } else if (bookmarkData) {
      savedAlready = bookmarkIds.includes(bookmarkData.storeID);
      savedAlready && dispatch({ type: "SELECT" });
    }
  }, []);

  // Send an HTTP request to the DB to save or unsave each bookmark
  const INTERVAL = 1000; // debounce timer (cancel subsequent requests that happen within this timeframe)
  const clickHandler = useCallback(
    debounce(
      async function (dataObj) {
        console.log("hit");
        // As soon as the btn is pressed, change the icon color before the api call (to give the illusion of speed)
        if (state.num === 0) dispatch({ type: "PRE_SWAP_COLOR" }); // turns state.num into 1 to prevent an infinite loop
        try {
          // Go into the DB and add/remove this restaurant from the saved list in the DB
          const response = await axios.post("/api/bookmark/addRemove", {
            storeName: dataObj.storeName,
            storeID: dataObj.storeID,
            address: dataObj.address,
            category: dataObj.category,
            image: dataObj.image,
            price: dataObj.price,
            rating: dataObj.rating,
          });
          const successMSG = response.data.message;
          const savedData = response.data.savedData;
          if (successMSG === "Bookmark added") {
            addBookmark(savedData, savedData.storeID);
            dispatch({ type: "SELECT" }); // turns state.num into 0
          } else if ("Bookmark removed") {
            removeBookmark(savedData.storeID);
            dispatch({ type: "UNSELECT" }); // turns state.num into 0
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
          color={state.color}
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
          <BookmarkIcon color={state.color} sx={mobileStyles.icon} />
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
          color={state.color} // decide color based on whether the restaurant's bookmarked
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
