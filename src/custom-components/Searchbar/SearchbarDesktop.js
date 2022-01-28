import React, { useState, useEffect } from "react";
import { useLocationContext } from "../../../state-management/locationContext";
//  prettier-ignore
import { Typography, Button, Box, Divider, TextField, InputBase, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PublicIcon from "@mui/icons-material/Public";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";
import { useSelector, useDispatch } from "react-redux";

export default function SearchbarDesktop() {
  const dispatch = useDispatch();

  // Create functions that open and close the drop down menu on the searchbar
  const openMenu = function (event) {
    setAnchorEl(event.currentTarget.closest("div.anchor_point"));
    setArrowIcon(<ArrowDropUpIcon fontSize="large" />);
  }; // Use Search as an achor element for any menus that spawn underneath
  const closeMenu = function () {
    setArrowIcon(<ArrowDropDownIcon fontSize="large" />);
    setAnchorEl(null);
    return;
  };

  // Import location data found at startup, and a detect location function fr/ Context API
  const { detectLocationHandler, locationObj } = useLocationContext();
  // Decide on what message to show on the searchbar based on saved location data on LocalStorage
  const [desktopMSG, setDesktopMSG] = useState("Pick a location");
  useEffect(() => {
    if (!locationObj) setDesktopMSG("Pick a location");
    // if we have no saved location
    else setDesktopMSG(locationObj.locationString); // if we have a saved location
  }, [locationObj]); // change it whenever locationObj is altered

  const getNewLocation = async function (event) {
    closeMenu();
    // search for a new location, and override any saved ones in localStorage
    await detectLocationHandler(); // invoke the function defined in locationContext.js
  };

  // Reveal the Predetermined Locations Modal by setting a Redux state value
  const openPredetermined = () => dispatch(homepageModalActions.usePredeterminedLocations()); // prettier-ignore
  const pickPredetermined = async function (event) {
    closeMenu();
    openPredetermined();
  };

  // BELOW JS AFFECTS STYLING ONLY ▼
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <Search className="anchor_point">
      <Button sx={styles.menuButton} color="secondary" onClick={openMenu}>
        <LocationOnIcon />
        <Typography variant="p" sx={styles.location} align="left">
          {desktopMSG}
        </Typography>
        {arrowIcon}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        sx={styles.menu}
      >
        <MenuItem sx={{ display: "flex", px: 1.5 }} onClick={getNewLocation}>
          <GpsFixedIcon color="secondary" sx={{ mt: "-4px" }} />
          <Button color="secondary" align="left">
            Detect current location
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
      <SearchIcon />
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder="Restaurant, cuisine, or dish"
      />
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
  maxWidth: "50rem", // width on larger screens
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
    width: "12.25rem",
    ml: 1,
    mt: "4px",
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
};
