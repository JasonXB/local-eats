import React from "react";
import { Typography, Box, Stack } from "@mui/material"; // prettier-ignore
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// Custom Hooks
import useGetFilters from "../../../../src/utility-functions/search/useGetFilters";
import useChangeFilter from "../../../../src/utility-functions/search/useChangeFilter";

// TERM EXPLANATIONS
// True filter values: The filter values saved in Redux which were used to fetch the data currently being shown
// Local filter values: Values we select in the filter modal which will become true filter values if we hit "Apply" btn

export default function ModalMenu() {
  // Get the existing true filter values in the Redux store using our custom hook
  const filterValues = useGetFilters(); // object full of filter values

  // When we click on new filter values in the modal, save them to this file's local state
  // Do not update the true filter values in Redux until after the user hits the apply button
  const [filterUpdates, setFilterUpdates] = React.useState({
    distance: filterValues.distance, // starting state values are decided based on what the true state va
    price: filterValues.price,
    rating: filterValues.rating,
    hours: filterValues.hours,
    modalOpen: filterValues.modalOpen,
  });

  // Create functions that update your filter Redux values using our custom hook
  const setFilter = useChangeFilter(); // function(filterName, newValue)

  const handleDistanceChange = (e, selectedVal) => {
    if (selectedVal === null) return; // do not allow users to set the same filter twice
    setFilterUpdates((prevState) => ({ ...prevState, distance: selectedVal }));
  };
  const handlePriceChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setFilterUpdates((prevState) => ({ ...prevState, price: selectedVal }));
  };
  const handleRatingChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setFilterUpdates((prevState) => ({ ...prevState, rating: selectedVal }));
    // setFilter("rating", selectedVal);
  };
  const handleHoursChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setFilterUpdates((prevState) => ({ ...prevState, hours: selectedVal }));
    // setFilter("hours", selectedVal);
  };

  //! This function should take all the filter changes we made and apply them
  //! Should result in a new Yelp API call being made to fetch new data (try useEffect)
  const applyFilters = () => {
    setFilter({
      distance: filterUpdates.distance,
      price: filterUpdates.price,
      rating: filterUpdates.rating,
      hours: filterUpdates.hours,
    });
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
        sx={{ ...styles.btnGroup, pb: 2 }}
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
    },
  },
  tab: {
    py: 2,
    px: 2,
    mt: 0,
    color: "#7E7E7E",
  },
  btnGroup: {
    ["@media (min-width: 400px)"]: { px: 2 },
  },
};
