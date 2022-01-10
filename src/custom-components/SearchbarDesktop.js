import React from "react";
import Head from "next/head";
import Image from "next/image";
//  prettier-ignore
import { Typography, Button, Box, Divider, TextField, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SearchbarDesktop() {
  return (
    <Box component="section">
      <Search>
        <LocationOnIcon />
        <Typography variant="p">Location</Typography>
        <ArrowDropDownIcon />
        <Divider orientation="vertical" flexItem />
        <SearchIcon />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a restaurant, cuisine, or dish"
          inputProps={{ "aria-label": "search google maps" }}
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

