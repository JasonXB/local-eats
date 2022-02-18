import React from "react";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useSelector, useDispatch } from "react-redux";
import { mix } from "../../../styles/styleMixins";

export default function RestauarantFilters() {
  const filterValues = {
    radius: () => {
      const meters = useSelector((r) => r.searchFilters.radius);
      // const km=
      return String(meters / 1000) + "km";
    },
    price: useSelector((r) => r.searchFilters.price),
    rating: useSelector((r) => r.searchFilters.rating),
    open_now: useSelector((r) => r.searchFilters.open_now),
  };
  return (
    <Box sx={{ px: 2, mt:5, mb:"1.625rem" ,display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
      <Button size="large" variant="outlined" startIcon={<EqualizerIcon />}>
        Adjust Filters
      </Button>
      <Button size="large" startIcon={<SocialDistanceIcon />}>
        Distance: {filterValues.radius()}
      </Button>
      <Button size="large" startIcon={<AttachMoneyIcon />}>
        Price: {filterValues.price}
      </Button>
      <Button size="large" startIcon={<LockOpenIcon />}>
        Rating: {filterValues.rating}
      </Button>
      <Button size="large" startIcon={<LockOpenIcon />}>
        Open now: {filterValues.open_now}
      </Button>
    </Box>
  );
}
// Filters button
// Distance: "under 20km"
// Price: "1 of 4"
// Rating: "any"
// Currently open: "any"
