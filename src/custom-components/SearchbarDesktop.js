import React, { useState, useRef } from "react";
//  prettier-ignore
import { Typography, Button, Box, Divider, TextField, InputBase, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import HistoryIcon from "@mui/icons-material/History";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function SearchbarDesktop() {
  // ----------------
  const [arrowIcon, setArrowIcon] = useState(<ArrowDropDownIcon />);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget.closest("div"));
    setArrowIcon(<ArrowDropUpIcon fontSize="large" />);
  }; // set <Search> as our anchor
  const handleClose = () => {
    setArrowIcon(<ArrowDropDownIcon fontSize="large" />);
    setAnchorEl(null);
    return;
  };
  return (
    <Search>
      <Button sx={styles.menuButton} color="secondary" onClick={handleClick}>
        <LocationOnIcon />
        <Typography variant="p" sx={styles.location} align="left">
          Location
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
        <MenuItem sx={{ display: "flex", p: 2 }}>
          <GpsFixedIcon color="secondary" />
          <Typography variant="p" color="secondary" align="left" sx={{ ml: 1 }}>
            Detect current location
          </Typography>
        </MenuItem>
        <Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" component="p" sx={{ ml: 2 }}>
            Most recent location
          </Typography>
          <MenuItem sx={styles.locationItem}>
            <HistoryIcon sx={{ mr: 1 }} />
            <Box component="p" sx={{ m: 0 }}>
              Richmond Hill
            </Box>
          </MenuItem>
        </Box>
      </Menu>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      <SearchIcon />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
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
    width: "11.25rem",
    ml: 1,
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
