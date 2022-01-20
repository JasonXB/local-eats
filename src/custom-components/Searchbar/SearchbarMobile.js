import React, { useState, useRef } from "react";
import { useLocationContext } from "../../state-management/locationContext";
//  prettier-ignore
import { Typography, Button, Box, Stack, InputBase, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PublicIcon from "@mui/icons-material/Public";
import DeleteIcon from "@mui/icons-material/Delete";
import { mix } from "../../../styles/styleMixins";
export default function SearchbarMobile() {
  const { detectLocation, locationObj } = useLocationContext();
  let mobileSearchbarMSG;
  if (!locationObj) mobileSearchbarMSG = "none yet";
  else mobileSearchbarMSG = locationObj.locationString;
  return (
    <>
      <Box sx={mobileStyles.boxParent}>
        <Button sx={mobileStyles.locationBtn} onClick={detectLocation}>
          <GpsFixedIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} />
          <Stack sx={{ mr: 1.5 }}>
            <Typography
              color="secondary"
              variant="h6"
              sx={{ fontSize: "1rem" }}
              component="p"
            >
              Get current location
            </Typography>
            <Typography
              color="secondary"
              sx={{ fontSize: "0.875rem" }}
              align="left"
            >
              via GPS
            </Typography>
          </Stack>
        </Button>
        <Box sx={{ ...mix.flexRow }}>
          <Stack sx={{ mr: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem" }}
              component="p"
              color="primary"
            >
              Most recent location
            </Typography>
            <Typography color="primary" sx={{ fontSize: "0.875rem" }}>
              {mobileSearchbarMSG}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={mobileStyles.searchbar}>
        <SearchIcon sx={{ mx: 1.25 }} color="secondary" />
        <InputBase
          sx={{ ml: 1, flex: 1, p: 0.5 }}
          placeholder="Restaurant, cuisine, or dish"
        />
      </Box>{" "}
    </>
  );
}

const mobileStyles = {
  stackContainer: (theme) => {
    return {
      m: 0,
      background: "#fffbf7", // apply gray background for mobile onlinr
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    };
  },
  title: {
    ...mix.titleFont,
    ...mix.regMargin("mt"),
  },
  boxParent: {
    ...mix.flexRow,
    ...mix.regMargin("!bottom"),
    marginTop: 0,
    justifyContent: "space-between",
    borderRadius: "10px",
  },
  locationBtn: {
    ...mix.flexRow,
    m: 0,
    textTransform: "none", // disables all caps in button
    "&:hover": {
      cursor: "pointer",
    },
    "& .MuiTypography-root": {
      textAlign: "start",
    },
  },
  searchbar: {
    display: "flex",
    bgcolor: "white",
    alignItems: "center",
    border: "1px solid #D6CFC7",
    borderRadius: "10px",
    boxShadow: "0 0 1px 1px #D6CFC7",
    mt: 0,
    ...mix.regMargin("m"),
    "& .MuiInputBase-root": { ml: 0 },
  },
};
