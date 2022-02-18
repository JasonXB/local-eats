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
      return String(meters / 1000) + "km";
    },
    price: useSelector((r) => r.searchFilters.price),
    rating: useSelector((r) => r.searchFilters.rating),
    open_now: useSelector((r) => r.searchFilters.open_now),
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
        Distance: {filterValues.radius()}
      </Button>
      <Button sx={styles.price} size="large" startIcon={<AttachMoneyIcon />}>
        Price: {filterValues.price}
      </Button>
      <Button sx={styles.rating} size="large" startIcon={<LockOpenIcon />}>
        Rating: {filterValues.rating}
      </Button>
      <Button sx={styles.open_now} size="large" startIcon={<LockOpenIcon />}>
        Open now: {filterValues.open_now}
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
    ["@media (min-width: 450px)"]: { gridTemplateColumns: "repeat(2, 1fr)" },
    ["@media (min-width: 700px)"]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      mt: 5,
      px: 2,
    },
    ["@media (min-width: 1200px)"]: { gridTemplateColumns: "repeat(5, 1fr)" },
  },
  adjustFilters: { },
  distance: {},
  price: {},
  rating: {},
  open_now: {},
};

// Filters button
// Distance: "under 20km"
// Price: "1 of 4"
// Rating: "any"
// Currently open: "any"
