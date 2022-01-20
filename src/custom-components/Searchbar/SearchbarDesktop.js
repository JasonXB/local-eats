import React, { useState, useRef } from "react";
import { useLocationContext } from "../../state-management/locationContext";
//  prettier-ignore
import { Typography, Button, Box, Divider, TextField, InputBase, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PublicIcon from "@mui/icons-material/Public";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SearchbarDesktop() {
  // Import location data found at startup, and a detect location function fr/ Context API
  const { detectLocation, locationObj } = useLocationContext();
  //! Decide on what message to show on the searchbar based on saved location data on LocalStorage
  
  const [desktopMSG, setDesktopMSG]= useState("Pick a location")
  const getNewLocation = async function (event) {
    // Use Search as an achor element for any menus that spawn underneath (alert: may have removed it permanently)
    setAnchorEl(event.currentTarget.closest("div"));
    setArrowIcon(<ArrowDropUpIcon fontSize="large" />);

    // const coordinates = await detectLocation();
    // console.log(coordinates);
  };

  // BELOW JS AFFECTS STYLING ONLY ▼
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setArrowIcon(<ArrowDropDownIcon fontSize="large" />);
    setAnchorEl(null);
    return;
  };

  return (
    <Search>
      <Button sx={styles.menuButton} color="secondary" onClick={getNewLocation}>
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
        onClose={handleClose}
        sx={styles.menu}
      >
        <MenuItem sx={{ display: "flex", p: 1.75 }}>
          <GpsFixedIcon color="secondary" />
          <Typography
            color="secondary"
            onClick={getNewLocation}
            align="left"
            sx={{ ml: 1 }}
          >
            Detect current location
          </Typography>
        </MenuItem>
        <MenuItem sx={{ display: "flex", p: 1.75 }}>
          <PublicIcon color="secondary" sx={{ mt: "-4px" }} />
          <Typography
            color="secondary"
            onClick={getNewLocation}
            align="left"
            sx={{ ml: 1 }}
          >
            Pick any country
          </Typography>
        </MenuItem>
        {/* <Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" component="p" sx={{ ml: 2 }}>
            Currently selected location:
          </Typography>
          <Typography sx={styles.locationItem}>
            <IconButton aria-label="delete" sx={{ mt: "-5px", p:0 }}>
              <DeleteIcon />
            </IconButton>
            <Box component="p" sx={{ m: 0, ml: 1 }}>
              {locationObj ? locationObj.locationString : "none yet"}
            </Box>
          </Typography>
        </Box> */}
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
