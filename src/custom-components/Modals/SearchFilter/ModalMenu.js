import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material"; // prettier-ignore
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
// Custom Hooks
import useGetFilters from "../../../../src/utility-functions/search/useGetFilters";
import useChangeAllFilters from "../../../../src/utility-functions/search/useChangeAllFilters";
import { mix } from "../../../../styles/styleMixins";
import { filterActions } from "../../../../state-management/store/search/filters";
import { useSelector, useDispatch } from "react-redux";
import { lengthNoSpaces } from "../../../utility-functions/general/lengthNoSpaces";
import useVisitSearchPage from "../../../utility-functions/search/useVisitSearchPage";

// TERMINOLOGY
// Local filter values: Values we select in the filter modal which will become true filter values if we hit "Apply" btn
// True filter values: The filter values saved in Redux which were used to fetch the data currently being shown

export default function ModalMenu() {
  // Get the true filter values in the Redux store using our custom hook
  const trueFilters = useGetFilters(); // object full of filter values
  const dispatch = useDispatch();

  // When we click on new filter values in the modal, save them to this file's local state
  // Do not update the true filter values in Redux until after the user hits the apply button
  const [localFilters, setLocalFilters] = React.useState({
    distance: trueFilters.distance, // starting state values are decided based on what the true state va
    price: trueFilters.price,
    hours: trueFilters.hours,
    sort_by: trueFilters.sort_by,
    modalOpen: trueFilters.modalOpen,
  });
  const termRef = React.useRef();

  const handleDistanceChange = (e, selectedVal) => {
    if (selectedVal === null) return; // do not allow users to set the same filter twice
    setLocalFilters((prevState) => ({ ...prevState, distance: selectedVal }));
  };
  const handlePriceChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setLocalFilters((prevState) => ({ ...prevState, price: selectedVal }));
  };
  const handleHoursChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setLocalFilters((prevState) => ({ ...prevState, hours: selectedVal }));
  };
  const handleSortChange = (e, selectedVal) => {
    if (selectedVal === null) return;
    setLocalFilters((prevState) => ({ ...prevState, sort_by: selectedVal }));
  };

  // This function should take all the local filter changes we made and apply them
  const setNewTrueFilters = useChangeAllFilters(); //  updates your true filter values using a custom hook
  const updateSearchPage = useVisitSearchPage();
  const applyHandler = function () {
    const fieldInput = termRef.current.value;
    // If user types nothing, set term to undefined
    let term = fieldInput;
    if (lengthNoSpaces(fieldInput) === 0) term = undefined;
    const currentFilters = {
      distance: localFilters.distance,
      price: localFilters.price,
      hours: localFilters.hours,
      sort_by: localFilters.sort_by,
      term,
    };
    setNewTrueFilters(currentFilters);
    dispatch(filterActions.closeModal()); // close the filter modal
    updateSearchPage(currentFilters);
  };

  // Reset the filter defaults and close the modal (also a default value)
  const resetHandler = () => {
    const fieldInput = termRef.current.value;
    // If user types nothing, set term to undefined
    let term = fieldInput;
    if (lengthNoSpaces(fieldInput) === 0) term = undefined;
    dispatch(filterActions.reset());
    const currentFilters = {
      distance: 20000,
      price: false,
      hours: false,
      sort_by: "best_match",
      modalOpen: false,
      term,
    };
    updateSearchPage(currentFilters);
  };

  return (
    <Stack spacing={1} sx={styles.container}>
      <Typography variant="h4" sx={styles.tab}>
        Max Distance
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={localFilters.distance}
        exclusive
        onChange={handleDistanceChange}
        sx={styles.btnGroup}
      >
        <ToggleButton value={10000}>10 km</ToggleButton>
        <ToggleButton value={15000}>15 km</ToggleButton>
        <ToggleButton value={20000}>20 km</ToggleButton>
        <ToggleButton value={30000}>30 km</ToggleButton>
        <ToggleButton value={40000}>40 km</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Price Level
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={localFilters.price}
        exclusive
        onChange={handlePriceChange}
        sx={styles.btnGroup}
      >
        <ToggleButton value={false}>Any</ToggleButton>
        <ToggleButton value={1}>$</ToggleButton>
        <ToggleButton value={2}>$$</ToggleButton>
        <ToggleButton value={3}>$$$</ToggleButton>
        <ToggleButton value={4}>$$$$</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Hours
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={localFilters.hours}
        exclusive
        onChange={handleHoursChange}
        sx={{ ...styles.btnGroup }}
      >
        <ToggleButton value={false}>Any</ToggleButton>
        <ToggleButton value={true}>Open now</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Sort by
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={localFilters.sort_by}
        exclusive
        onChange={handleSortChange}
        sx={styles.btnGroup}
      >
        <ToggleButton value={"best_match"}>Best match</ToggleButton>
        <ToggleButton value={"distance"}>Distance</ToggleButton>
        <ToggleButton value={"rating"}>Rating</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h4" sx={styles.tab}>
        Search Term
      </Typography>
      <FormControl>
        <OutlinedInput
          sx={{ mx: 2 }}
          placeholder="Restaurant, cuisine, dish..."
          defaultValue={trueFilters.term}
          inputRef={termRef}
        />
      </FormControl>
      <div></div>
      <Box sx={{ width: "100%", ...mix.flexRow, justifyContent: "flex-end" }}>
        <Button
          onClick={resetHandler}
          size="large"
          sx={{
            fontSize: "1rem",
            mr: 2,
            mt: 2,
            "&:hover": { background: "white" },
          }}
        >
          Reset to defaults
        </Button>
        <Button
          onClick={applyHandler}
          size="large"
          sx={{
            fontSize: "1rem",
            mr: 2,
            mt: 2,
            "&:hover": { background: "white" },
          }}
        >
          Apply
        </Button>
      </Box>
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
