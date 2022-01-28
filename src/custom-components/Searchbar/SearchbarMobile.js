import React, { useState, useEffect } from "react";
import { useLocationContext } from "../../../state-management/locationContext";
//  prettier-ignore
import { Typography, Button, Box, Stack, InputBase, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { mix } from "../../../styles/styleMixins";
export default function SearchbarMobile() {
  const { detectLocationHandler, predeterminedHandler, locationObj } = useLocationContext(); // prettier-ignore
  // Decide on what message to show on the searchbar based on whether the project has a saved location or not
  let mobileMSG;
  if (!locationObj) mobileMSG = "none";
  else mobileMSG = locationObj.locationString;

  // search for a new location, and override any saved ones in localStorage
  // const detectLocation = function () {
  //   detectLocationHandler(); // boolean required for override
  // };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ fontSize: "1rem", ml: 2 }}
        component="p"
        color="primary"
      >
        Current Location: {mobileMSG}
      </Typography>
      <Box sx={mobileStyles.searchbar}>
        <SearchIcon sx={{ mx: 1.25 }} color="secondary" />
        <InputBase
          sx={{ ml: 1, flex: 1, p: 0.5 }}
          placeholder="Restaurant, cuisine, or dish"
        />
      </Box>{" "}
      <Box sx={{ ...mobileStyles.boxParent }}>
        <Button sx={mobileStyles.locationBtn} onClick={detectLocationHandler}>
          <LocationOnIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} />
          <Stack sx={{ mr: 1.5 }}>
            <Typography
              color="secondary"
              variant="h6"
              sx={{ fontSize: "1rem" }}
              component="p"
            >
              Detect current location
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
        <Button sx={mobileStyles.locationBtn} onClick={predeterminedHandler}>
          <LocationOffIcon
            fontSize="large"
            color="secondary"
            sx={{ mr: 1.5 }}
          />
          <Stack sx={{ mr: 1.5 }}>
            <Typography
              color="secondary"
              variant="h6"
              sx={{ fontSize: "1rem" }}
              component="p"
            >
              Pick a location
            </Typography>
            <Typography
              color="secondary"
              sx={{ fontSize: "0.875rem" }}
              align="left"
            >
              from a predetermined list
            </Typography>
          </Stack>
        </Button>
      </Box>
    </>
  );
}

const mobileStyles = {
  stackContainer: (theme) => {
    return {
      m: 0,
      background: "#fffbf7", // apply gray background for mobile online
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    };
  },

  boxParent: {
    ...mix.flexRow,
    ...mix.regMargin("!bottom"),
    marginTop: 0,
    justifyContent: "space-between",
    borderRadius: "10px",
    pb:2,
    ["@media (max-width: 520px)"]: {
      ...mix.flexColumn,
      alignItems: "flex-start",
    },
  },
  locationBtn: {
    ...mix.flexRow,
    m: 0,
    p: 0,
    p: 1,
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
