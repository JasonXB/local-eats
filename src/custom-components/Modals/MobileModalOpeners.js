import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Typography, Box, Stack, Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

export default function MobileModalOpeners(props) {
  const { type, onClickFN } = props;
  let icon, txt1, txt2;
  switch (type) {
    case "GPS":
      icon= <LocationOnIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} /> // prettier-ignore
      txt1 = "Detect current location";
      txt2 = "via GPS";
      break;
    case "specify":
      icon= <TravelExploreIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} /> // prettier-ignore
      txt1 = "Specify a location";
      txt2 = "using cities/codes";
      break;
    case "predetermined":
      icon= <ListAltIcon fontSize="large" color="secondary" sx={{ mr: 1.5 }} /> //  prettier-ignore
      txt1 = "Pick a location";
      txt2 = "from our premade list";
      break;
    default:
    // code block
  }
  return (
    <Button sx={mobileStyles.locationBtn} onClick={onClickFN}>
      {icon}
      <Stack sx={{ mr: 1.5 }}>
        <Typography
          color="secondary"
          variant="h6"
          sx={{ fontSize: "1rem", width: "11rem" }}
          component="p"
        >
          {txt1}
        </Typography>
        <Typography
          color="secondary"
          sx={{ fontSize: "0.875rem" }}
          align="left"
        >
          {txt2}
        </Typography>
      </Stack>
    </Button>
  );
}

const mobileStyles = {
  locationBtn: {
    ...mix.flexRow,
    m: 0,
    p: 0,
    py: 1,
    px:2,
    textTransform: "none", // disables all caps in button
    "&:hover": {
      cursor: "pointer",
    },
    "& .MuiTypography-root": {
      textAlign: "start",
    },
  },
};
