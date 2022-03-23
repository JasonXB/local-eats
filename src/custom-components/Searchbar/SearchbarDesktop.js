import React, { useState, useEffect, useRef } from "react";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Button, Divider, InputBase, Menu, MenuItem, Box, IconButton } from "@mui/material"; // prettier-ignore
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PublicIcon from "@mui/icons-material/Public";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";
import { useSelector, useDispatch } from "react-redux";
import { lengthNoSpaces } from "../../utility-functions/general/lengthNoSpaces";
import useGetFilters from "../../utility-functions/search/useGetFilters";
import useVisitSearchPage from "../../utility-functions/search/useVisitSearchPage";
import FindInPageIcon from "@mui/icons-material/FindInPage";

export default function SearchbarDesktop({ applyShadow }) {
  const dispatch = useDispatch();
  const filters = useGetFilters();
  const anchorEl = useRef();
  const searchbarRef = useRef();
  const navToSearchPage = useVisitSearchPage();

  //^ Import the LocationContext variables and functions that control the Searchbar drop down menu
  const { searchbarMenuOpen, openSearchbarMenu, closeSearchbarMenu } = useLocationContext(); // prettier-ignore
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);
  const open = searchbarMenuOpen; // menu opens when searchbarMenuOpen is true

  //^ Create functions that open and close the drop down menu on the searchbar
  const openMenu = function (event) {
    // Set searchbarMenuOpen to true, flip the arrow icon, and specify an anchor for the menu
    openSearchbarMenu();
    setArrowIcon(<ArrowDropUpIcon fontSize="large" />);
  }; // Use Search as an achor element for any menus that spawn underneath
  const closeMenu = function () {
    // Set searchbarMenuOpen to true, flip the arrow icon, and erase the specified menu anchor
    closeSearchbarMenu();
    setArrowIcon(<ArrowDropDownIcon fontSize="large" />);
    return;
  };

  // Import location data found at startup, and a detect location function fr/ Context API
  const { detectLocationHandler, locationObject } = useLocationContext();

  // Decide on what message to show on the searchbar based on saved location data on LocalStorage
  const [desktopMSG, setDesktopMSG] = useState("Pick a location");
  useEffect(() => {
    if (!locationObject) setDesktopMSG("Pick a location");
    // if we have no saved location
    else setDesktopMSG(locationObject.locationString); // if we have a saved location
  }, [locationObject]); // change it whenever locationObject is altered

  const detectLocation = async function (event) {
    closeMenu(); // close searchbar menu
    // search for a new location, and override any saved ones in localStorage
    await detectLocationHandler(); // invoke the function defined in locationContext.js
  };

  // Reveal the Predetermined Location Modal by setting a Redux state value
  const pickPredetermined = async function (event) {
    closeMenu(); // close searchbar menu
    dispatch(homepageModalActions.usePredeterminedLocations()); // open modal
  };
  // Reveal the SpecifyLocationModal Modal by setting a Redux state value
  const specifyLocation = async function () {
    closeMenu(); // close searchbar menu
    dispatch(homepageModalActions.useSpecifyLocation()); // open modal
  };

  const searchHandler = function (e) {
    e.preventDefault();
    const typedInput = searchbarRef.current.value;
    const inputLength = lengthNoSpaces(typedInput);
    if (inputLength === 0) return;
    navToSearchPage({
      term: typedInput.toLowerCase(),
      sort_by: filters.sort_by,
    });
  };

  // We have a default style for the Homepage, and a secondary style for the search/restuarant pages
  const stylesNoShadow = { width: "90%", maxWidth: "50rem" };
  const stylesWithShadow = {
    borderRadius: "0.8rem",
    boxShadow: "rgb(28 28 28 / 8%) 0px 2px 8px",
    border: "1px solid rgb(232, 232, 232)",
    width: "100%",
    height: 48,
  };

  return (
    <Search
      id="anchor_point"
      ref={anchorEl}
      onSubmit={searchHandler}
      sx={applyShadow ? stylesWithShadow : stylesNoShadow}
    >
      <Button sx={styles.menuButton} color="secondary" onClick={openMenu}>
        <LocationOnIcon />
        <Typography variant="p" sx={styles.location} align="left">
          {desktopMSG}
        </Typography>
        {arrowIcon}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl.current}
        open={open}
        onClose={closeMenu}
        sx={styles.menu}
      >
        <MenuItem sx={{ display: "flex", px: 1.5 }} onClick={detectLocation}>
          <GpsFixedIcon color="secondary" sx={{ mt: "-4px" }} />
          <Button color="secondary" align="left">
            Detect current location
          </Button>
        </MenuItem>
        <MenuItem sx={{ display: "flex", px: 1.5 }} onClick={specifyLocation}>
          <FindInPageIcon color="secondary" sx={{ mt: "-4px" }} />
          <Button color="secondary" align="left">
            Specify a location
          </Button>
        </MenuItem>
        <MenuItem sx={{ display: "flex", px: 1.5 }} onClick={pickPredetermined}>
          <PublicIcon color="secondary" sx={{ mt: "-4px" }} />
          <Button color="secondary" align="left">
            Pick predetermined location
          </Button>
        </MenuItem>
      </Menu>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      <Box
        id="searchfield"
        component="form"
        onSubmit={searchHandler}
        sx={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <IconButton type="submit" aria-label="search" sx={{ p: 0 }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Restaurant, cuisine, or dish"
          inputRef={searchbarRef}
        />
      </Box>
    </Search>
  );
}
// The parent container whose inner components make up the searchbar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  padding: "0.625rem",
  marginInline: "auto",
  width: "80%",
  "&:hover": {
    cursor: "text",
  },
  "& .MuiInputBase-root": {
    width: "100%", // extends user typing area
  },
}));

const styles = {
  // Styles the Button text telling us where we currently are
  location: {
    width: "27rem", //^ length of the current location text
    ml: 1,
    mt: "2px",
  },
  // The location button that triggers the drop down list to appear
  menuButton: {
    p: 0,
    "&:hover": { bgcolor: "white" },
  },
  // The drop down list/ menu that appears when you hit the location button
  menu: {
    mt: 0.5,
    "& .MuiList-root": { padding: 0, width: "25rem" },
  },
  // Each individual recent location <li>
  locationItem: {
    display: "flex",
    alignItems: "center",
    px: 2,
    pb: 2,
    pt: 2,
  },
  searchbar: (applyShadow) => {
    return {
      width: "100%",
    };
  },
};
