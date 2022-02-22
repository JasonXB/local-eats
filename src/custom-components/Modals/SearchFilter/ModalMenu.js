import React from "react";
import { Typography, Box, Stack } from "@mui/material"; // prettier-ignore
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../../../../state-management/store/search/filters";
import useGetFilters from "../../../../src/utility-functions/search/useGetFilters"

export default function ModalMenu() {
  const dispatch = useDispatch();

  // Get the existing filter values in the Redux store
  const filterValues = useGetFilters(); // object full of filter values
  console.log(filterValues)
  // Create functions that update your filter state values in the Redux store
  //!!! Turn into a custom hook
  const setFilters = {
    distance: (inp) => dispatch(filterActions.setDistanceFilter(inp)),
    price: (inp) => dispatch(filterActions.setPriceFilter(inp)),
    rating: (inp) => dispatch(filterActions.setRatingFilter(inp)),
    hours: (inp) => dispatch(filterActions.setHoursFilter(inp)),
  };
  const handleDistanceChange = (e, selectedVal) => {
    if (selectedVal === null) return; // do not allow users to set the same filter twice
    setFilters.distance(selectedVal);
  };
  const handlePriceChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setFilters.price(selectedVal);
  };
  const handleRatingChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setFilters.rating(selectedVal);
  };
  const handleHoursChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setFilters.hours(selectedVal);
  };

  return (
    <Stack spacing={1} sx={styles.container}>
      <Typography variant="h4" sx={styles.tab}>
        Max Distance
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={filterValues.distance}
        exclusive
        onChange={handleDistanceChange}
        sx={styles.btnGroup}
      >
        <ToggleButton value={10000}>10 km</ToggleButton>
        <ToggleButton value={15000}>15 km</ToggleButton>
        <ToggleButton value={20000}>20 km</ToggleButton>
        <ToggleButton value={25000}>25 km</ToggleButton>
        <ToggleButton value={30000}>30 km</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Max Price Level
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={filterValues.price}
        exclusive
        onChange={handlePriceChange}
        sx={styles.btnGroup}
      >
        <ToggleButton value={"any"}>Any</ToggleButton>
        <ToggleButton value={1}>$</ToggleButton>
        <ToggleButton value={2}>$$</ToggleButton>
        <ToggleButton value={3}>$$$</ToggleButton>
        <ToggleButton value={4}>$$$$</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Min Rating
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={filterValues.rating}
        exclusive
        onChange={handleRatingChange}
        sx={styles.btnGroup}
      >
        <ToggleButton value={"any"}>Any</ToggleButton>
        <ToggleButton value={1}>1</ToggleButton>
        <ToggleButton value={2}>2</ToggleButton>
        <ToggleButton value={3}>3</ToggleButton>
        <ToggleButton value={4}>4</ToggleButton>
        <ToggleButton value={5}>5</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Hours
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={filterValues.hours}
        exclusive
        onChange={handleHoursChange}
        sx={{...styles.btnGroup, pb:2}}
      >
        <ToggleButton value={"any"}>Any</ToggleButton>
        <ToggleButton value={"open now"}>Open now</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ m: 0 }}></Box>
    </Stack>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    py: 1,
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "repeat(4, auto)",
    alignItems: "center",
    // Quash a few auto-applied margins
    "h4.MuiTypography-root": { margin: 0 },
    "div.MuiBox-root": { margin: 0 },
    "span.MuiRating-root": { margin: 0 },
    "span.MuiSlider-colorPrimary": { margin: 0 },
    "div.MuiToggleButtonGroup-root": { margin: 0 },
    ["@media (min-width: 700px)"]: { 
      display: "grid",
    }
  },
  tab: {
    py: 2,
    px: 2,
    mt: 0,
    color: "#7E7E7E",
  },
  btnGroup: {
    ["@media (min-width: 400px)"]: {px: 2,}
  },
};
