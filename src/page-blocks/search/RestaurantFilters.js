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
    distance: () => {
      const meters = useSelector((r) => r.searchFilters.distance);
      return String(meters / 1000) + "km";
    },
    price: useSelector((r) => r.searchFilters.price),
    rating: useSelector((r) => r.searchFilters.rating),
    hours: useSelector((r) => r.searchFilters.hours),
  };
  return (
    <Box sx={styles.container}>
      <Button
        sx={styles.adjustFilters}
        size="large"
        variant="outlined"
        fullWidth
        startIcon={<EqualizerIcon />}
      >
        Adjust Filters
      </Button>

      <Button
        sx={styles.distance}
        size="large"
        startIcon={<SocialDistanceIcon />}
      >
        Max Distance: {filterValues.distance()}
      </Button>
      <Button sx={styles.price} size="large" startIcon={<AttachMoneyIcon />}>
        Max Price Lvl: {filterValues.price} of 4
      </Button>
      <Button sx={styles.rating} size="large" startIcon={<LockOpenIcon />}>
        Min Rating: {filterValues.rating} stars
      </Button>
      <Button sx={styles.hours} size="large" startIcon={<LockOpenIcon />}>
        Hours: {filterValues.hours}
      </Button>
    </Box>
  );
}

const styles = {
  container: {
    px: 4,
    mt: 2,
    mb: "1.625rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    ["@media (min-width: 525px)"]: { gridTemplateColumns: "repeat(2, 1fr)" },
    ["@media (min-width: 750px)"]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      mt: 5,
    },
    ["@media (min-width: 1200px)"]: { gridTemplateColumns: "repeat(5, 1fr)" },
  },

};
