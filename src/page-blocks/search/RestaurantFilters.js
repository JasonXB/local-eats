import React from "react";
import { Box, Button } from "@mui/material"; // prettier-ignore
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SortIcon from '@mui/icons-material/Sort';
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../state-management/store/search/filters";
import { mix } from "../../../styles/styleMixins";

export default function RestauarantFilters() {
  const getFilterValues = {
    distance: () => {
      const meters = useSelector((r) => r.searchFilters.distance);
      return String(meters / 1000) + "km";
    },
    price: () => {
      const priceNumber = useSelector((r) => r.searchFilters.price); // undefined, 1 2 3 4
      if (!priceNumber) return "any";
      else return `${priceNumber} of 4`;
    },
    hours: () => {
      const hoursFilterVal = useSelector((r) => r.searchFilters.hours);
      if (!hoursFilterVal) return "any";
      else return "open now";
    },
    term: () => {
      const term = useSelector((r) => r.searchFilters.term);
      if (!term) return "any";
      else return term;
    },
    sort_by: () => {
      return useSelector((r) => r.searchFilters.sort_by);
    },
  };

  // Function that opens/closes the filter modal which affects your search results
  const dispatch = useDispatch();
  const openFilterModal = () => dispatch(filterActions.openModal());

  return (
    <Box sx={styles.container}>
      <Button
        size="large"
        variant="outlined"
        fullWidth
        startIcon={<EqualizerIcon />}
        onClick={openFilterModal}
      >
        Adjust Filters
      </Button>

      <Button size="large" startIcon={<SocialDistanceIcon />} disabled>
        Max Distance: {getFilterValues.distance()}
      </Button>
      <Button size="large" startIcon={<AttachMoneyIcon />} disabled>
        Price Lvl: {getFilterValues.price()}
      </Button>
      <Button size="large" startIcon={<LockOpenIcon />} disabled>
        Hours: {getFilterValues.hours()}
      </Button>
      <Button size="large" startIcon={<SortIcon />} disabled>
        Sort by: {getFilterValues.sort_by()}
      </Button>

      {/* Comment in the term value for dev purposes only */}
      {/* <Button size="large" startIcon={<SearchIcon />} disabled>
        Term: {getFilterValues.term()}
      </Button> */}
    </Box>
  );
}

const styles = {
  container: {
    px: 2,
    mt: 2,
    mb: "1.625rem",
    display: "grid",
    gridTemplateColumns: "1fr",
    ...mix.responsiveLayout,
    ["@media (min-width: 525px)"]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    ["@media (min-width: 750px)"]: {
      gridTemplateColumns: "repeat(3, 1fr)",
      mt: 4,
    },
    ["@media (min-width: 1200px)"]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
  },

};
