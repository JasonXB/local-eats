import React, { useState, useEffect } from "react";
import { useLocationContext } from "../../state-management/locationContext";
//  prettier-ignore
import { Typography, Button, Box, Stack, InputBase, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import { mix } from "../../../styles/styleMixins";
export default function SearchbarMobile() {
  const { detectLocation, locationObj } = useLocationContext();

  // Decide on what message to show on the searchbar based on saved location data on LocalStorage
  const [mobileMSG, setMobileMSG] = useState("None yet");
  useEffect(() => {
    if (!locationObj) setMobileMSG("None yet");
    else setMobileMSG(locationObj.locationString);
  }, [locationObj]); // change it whenever locationObj is altered

  // search for a new location, and override any saved ones in localStorage
  const getNewLocation = function () {
    detectLocation(true); // boolean required for override
  };
  
  return (
    <>
      <Box sx={mobileStyles.boxParent}>
        <Button sx={mobileStyles.locationBtn} onClick={getNewLocation}>
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
              {mobileMSG}
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
