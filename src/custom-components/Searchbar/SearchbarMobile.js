import React, { useRef } from "react";
import { useLocationContext } from "../../../state-management/locationContext";
//  prettier-ignore
import { Typography, Button, Box, Stack, InputBase, IconButton } from "@mui/material"; // prettier-ignore
import SearchIcon from "@mui/icons-material/Search";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { mix } from "../../../styles/styleMixins";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";
import { useDispatch } from "react-redux";
import { lengthNoSpaces } from "../../utility-functions/general/lengthNoSpaces";
import useVisitSearchPage from "../../utility-functions/search/useVisitSearchPage";

export default function SearchbarMobile() {
  const searchbarRef = useRef();
  const navToSearchPage = useVisitSearchPage();
  const { detectLocationHandler, locationObject } = useLocationContext(); // prettier-ignore
  // Decide on what message to show on the searchbar based on whether the project has a saved location or not
  let mobileMSG;
  if (!locationObject) mobileMSG = "none";
  else mobileMSG = locationObject.locationString;

  //@ Reveal the Predetermined Locations Modal by setting a Redux state value
  const dispatch = useDispatch();
  const openPredetermined = () => {
    dispatch(homepageModalActions.usePredeterminedLocations());
  };

  const submitHandler = function (e) {
    e.preventDefault();
    const typedInput = searchbarRef.current.value;
    const inputLength = lengthNoSpaces(typedInput);
    if (inputLength === 0) return;
    navToSearchPage({ term: typedInput.toLowerCase() });
  };

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
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={mobileStyles.searchbar}
      >
        <IconButton type="submit" aria-label="search" sx={{ p: 0 }}>
          <SearchIcon sx={{ mx: 1.25 }} color="secondary" />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, p: 0.5 }}
          placeholder="Restaurant, cuisine, or dish"
          inputRef={searchbarRef}
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
        <Button sx={mobileStyles.locationBtn} onClick={openPredetermined}>
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
              from our premade list
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
    pb: 2,
    ["@media (max-width: 540px)"]: {
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
