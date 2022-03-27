import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Button, MenuItem } from "@mui/material";

export default function LocationOptions({ onClickFN, txt }) {
  let iconChoice;
  if (txt === "Detect current location")
    iconChoice = <GpsFixedIcon color="secondary" sx={{ mt: "-4px" }} />;
  else if (txt === "Specify a location")
    iconChoice = <TravelExploreIcon color="secondary" sx={{ mt: "-4px" }} />;
  else if (txt === "Pick predetermined location")
    iconChoice = <ListAltIcon color="secondary" sx={{ mt: "-4px" }} />;
  return (
    <MenuItem sx={{ display: "flex", px: 1.5 }} onClick={onClickFN}>
      {iconChoice}
      <Button color="secondary" align="left">
        {txt}
      </Button>
    </MenuItem>
  );
}
