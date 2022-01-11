import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
//  prettier-ignore
import { Typography, Button, Box, Divider, TextField, InputBase, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import HistoryIcon from "@mui/icons-material/History";

export default function SearchbarDesktop() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // set <Search> as our anchor
    setAnchorEl(event.currentTarget.closest("div"));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box component="section">
      <Search>
        <Button sx={styles.menuTrigger} color="secondary" onClick={handleClick}>
          <LocationOnIcon />
          <Typography variant="p" sx={styles.location} align="left">
            Location
          </Typography>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ mt: 0.5, "& .MuiList-root": { padding: 0 } }}
        >
          <MenuItem sx={{ display: "flex", p: 2 }}>
            <GpsFixedIcon color="secondary" />
            <Typography
              variant="p"
              color="secondary"
              align="left"
              sx={{ ml: 1 }}
            >
              Detect Current Location
            </Typography>
          </MenuItem>
          <Box>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="p" sx={{ fontSize: "1.125rem", ml: 2 }}>
              Recent Locations
            </Typography>
            <MenuItem
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                pb: 2,
                pt: 2,
              }}
            >
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
          placeholder="Search for a restaurant, cuisine, or dish"
        />
      </Search>
    </Box>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  padding: "0.625rem",
  "&:hover": {
    cursor: "text",
  },
  "& .MuiInputBase-root": {
    width: "100%", // extends user typing area
  },
  marginInline: "auto",
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "40rem", // width on larger screens
  },
}));

const styles = {
  location: {
    width: "11.25rem",
    ml: 1,
  },
  menuTrigger: {
    p: 0,
    "&:hover": { bgcolor: "white" },
  },
};

//~ Use past 900px, so md breakpoint and onwards
