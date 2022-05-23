import React, { useRef } from "react";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, InputBase, IconButton } from "@mui/material"; // prettier-ignore
import SearchIcon from "@mui/icons-material/Search";
import MobileModalOpeners from "../Modals/MobileModalOpeners";
import { mix } from "../../../styles/styleMixins";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";
import { useDispatch } from "react-redux";
import { lengthNoSpaces } from "../../utility-functions/general/lengthNoSpaces";
import useGetFilters from "../../utility-functions/search/useGetFilters";
import useVisitSearchPage from "../../utility-functions/search/useVisitSearchPage";

export default function SearchbarMobile() {
  const filters = useGetFilters();
  const searchbarRef = useRef();
  const navToSearchPage = useVisitSearchPage();
  const { detectLocationHandler, locationObject } = useLocationContext(); // prettier-ignore
  // Decide on what message to show on the searchbar based on whether the project has a saved location or not
  let mobileMSG;
  if (!locationObject) mobileMSG = "none";
  else mobileMSG = locationObject.locationString;

  // Reveal certain modals by setting a Redux state value
  const dispatch = useDispatch();
  const openPredetermined = () => dispatch(homepageModalActions.usePredeterminedLocations()); // prettier-ignore
  const openSpecifyLocation = () => dispatch(homepageModalActions.useSpecifyLocation()); // prettier-ignore

  const submitHandler = function (e) {
    e.preventDefault();
    e.target.blur(); // close the keyboard on mobile
    const typedInput = searchbarRef.current.value;
    const inputLength = lengthNoSpaces(typedInput);
    if (inputLength === 0) return;
    navToSearchPage({
      term: typedInput.toLowerCase(),
      sort_by: filters.sort_by,
    });
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
        <MobileModalOpeners type="GPS" onClickFN={detectLocationHandler} />
        <MobileModalOpeners type="specify" onClickFN={openSpecifyLocation} />
        {/*  prettier-ignore */}
        <MobileModalOpeners type="predetermined" onClickFN={openPredetermined} />
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
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
    justifyContent: "start",
    justifyItems: "start",
    ["@media (min-width: 600px)"]: {
      gridTemplateColumns: "1fr 1fr",
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
