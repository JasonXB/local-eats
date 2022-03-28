import React, { useRef, useReducer } from "react";
import axios from "axios";
import ModalComponent from "./ModalComponent";
import { Typography, FormControl, FormControlLabel, RadioGroup } from '@mui/material'; // prettier-ignore
import { styles } from "../../../styles/modal_styles";
import { useDispatch, useSelector } from "react-redux";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";
import Radio from "@mui/material/Radio";
import { TextField, Autocomplete } from "@mui/material";
import { breakBefore } from "../ConditionalBreak"; // prettier-ignore
import { stateList, provinceList } from "../../../pages/api/helperFunctions/stateProvCodes"; // prettier-ignore
import { useLocationContext } from "../../../state-management/locationContext";

// This entire Modal's visibility hinges on a Redux slice state value not equalling a falsy
// Check ModalVisibility.js.. initialState.showSpecifyLocation
export default function SpecifyLocation() {
  const dispatch = useDispatch();
  const { setLocationObject } = useLocationContext(); // saves location data to global state
  const postalRef = useRef();
  const cityRef = useRef();

  // Manage input field values using state values
  const [chosen, dispatchFN] = useReducer(reducer, {
    country: "CA", // have Canada preselected
    province: undefined,
    provinceError: false, // works with american states too
    specifier: "city",
    cityError: false,
    postalCodeError: false,
  });
  const selectCountry = function (e) {
    if (!e.target.value) return;
    dispatchFN({ type: "SELECT_COUNTRY", payload: e.target.value });
  };
  const selectSpecifier = function (e) {
    if (!e.target.value) return;
    dispatchFN({ type: "SELECT_SPECIFIER", payload: e.target.value });
  };
  const selectProvince = function (e, inputValue) {
    dispatchFN({ type: "SELECT_PROVINCE", payload: inputValue });
  };
  const refreshTextfield = function (field) {
    if (!chosen.postalCodeError && !chosen.cityError) return; // if we have no current errors, do nothing
    dispatchFN({ type: "REFRESH_TEXTFIELD", payload: field }); // field should be "city" or "postal_code"
  }; // removes error visuals from the city or postal code field (used when we start typing)

  // Close Modal while maintaining the current state values
  const closeModal = () => dispatch(homepageModalActions.closeAllModals());
  // Close modal while resetting the local state values
  const cancelModal = () => {
    dispatch(homepageModalActions.closeAllModals());
    dispatchFN({ type: "RESET" });
  };
  // Send a request to the Mapquest API to grab location data based on the user inputs
  const submitHandler = async function () {
    // One of these field inputs will be undefined
    const typedCity = cityRef?.current?.value;
    const typedPostalCode = postalRef?.current?.value;
    // Send user inputs to the API route
    try {
      const response = await axios.post("/api/getAreaInfo/viaSpecifyLocation", {
        country: chosen.country,
        province: chosen.province, // country/province saved to state
        specifier: chosen.specifier, // "city" or "postal_code"
        city: typedCity,
        postalCode: typedPostalCode, // city and address inputs referred to using a hook
      });
      // Save the location object to localStorage and our global project state
      const locationObj = response.data.locationObj;
      localStorage.setItem("savedLocation", JSON.stringify(locationObj));
      setLocationObject(locationObj);
      cityRef.current.value = "";
      postalRef.current.value = "";
      closeModal();
    } catch (error) {
      switch (error?.response?.data?.message) {
        case "Province empty":
          dispatchFN({ type: "ERROR", payload: "province" });
          break;
        case "City empty":
        case "Invalid city":
          dispatchFN({ type: "ERROR", payload: "city" });
          break;
        case "Postal code empty":
        case "Invalid postal code":
          dispatchFN({ type: "ERROR", payload: "postal_code" });
          break;
        default:
          cancelModal(); // close modal while resetting state
          break;
      }
    }
  };

  // Only show this modal when Redux state value equals a non-falsy
  const showSpecifyLocationModal = useSelector((r) => r.homepageModals.showSpecifyLocation); // prettier-ignore
  if (!showSpecifyLocationModal) return null;
  let codeType = chosen.country === "CA" ? "postal code" : "zip code";
  return (
    <ModalComponent
      headerText="Specify your Location"
      cancelModal={cancelModal}
      submit={submitHandler}
    >
      <Typography variant="h6" sx={{ mt: 1, mb: 3 }}>
        We'll select the location that{breakBefore(520)} best matches your
        inputs
      </Typography>
      {/* Canada / USA selector */}
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ width: "18rem" }}
        >
          <FormControlLabel
            value="CA"
            control={<Radio />}
            label="Canada"
            onClick={selectCountry}
            checked={chosen.country === "CA"}
            sx={{ mx: "auto" }}
          />
          <FormControlLabel
            value="US"
            control={<Radio />}
            label="United States"
            onClick={selectCountry}
            checked={chosen.country === "US"}
            sx={{ mx: "auto" }}
          />
        </RadioGroup>
      </FormControl>
      {/* List of American states */}
      {chosen.country === "US" && (
        <Autocomplete
          disablePortal
          onChange={selectProvince}
          options={stateList}
          sx={styles.inputField}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select state (required)"
              error={chosen.provinceError}
            />
          )}
        />
      )}
      {/* List of Canadian provinces */}
      {chosen.country === "CA" && (
        <Autocomplete
          disablePortal
          onChange={selectProvince}
          options={provinceList}
          sx={styles.inputField}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select province (required)"
              error={chosen.provinceError}
            />
          )}
        />
      )}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ width: "18rem" }}
      >
        <FormControlLabel
          value="city"
          control={<Radio />}
          label="city"
          onClick={selectSpecifier}
          checked={chosen.specifier === "city"}
          sx={{ mx: "auto" }}
        />
        <FormControlLabel
          value="postal_code"
          control={<Radio />}
          label="postal/zip code"
          onClick={selectSpecifier}
          checked={chosen.specifier === "postal_code"}
          sx={{ mx: "auto" }}
        />
      </RadioGroup>
      {/* City and address fields */}
      {chosen.specifier === "city" && (
        <TextField
          label="Enter city (required)"
          sx={{ ...styles.inputField }}
          inputRef={cityRef}
          onChange={() => refreshTextfield("city")}
          error={chosen.cityError}
        />
      )}
      {chosen.specifier === "postal_code" && (
        <TextField
          label={`Enter ${codeType} (required)`}
          sx={styles.inputField}
          inputRef={postalRef}
          onChange={() => refreshTextfield("postal_code")}
          error={chosen.postalCodeError}
        />
      )}
    </ModalComponent>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_COUNTRY":
      return {
        ...state,
        country: action.payload,
        province: undefined,
        provinceError: false,
      };
    // Color an input field red when the user submits something invalid there
    case "ERROR":
      if (action.payload === "province")  return { ...state, provinceError: true }; // prettier-ignore
      else if (action.payload === "city") return { ...state, cityError: true }; // prettier-ignore
      else if (action.payload === "postal_code") return { ...state, postalCodeError: true }; // prettier-ignore
      return state;
    case "SELECT_PROVINCE":
      return { ...state, province: action.payload, provinceError: false };
    case "SELECT_SPECIFIER":
      return {
        ...state,
        specifier: action.payload,
        cityError: false,
        postalCodeError: false,
      };
    case "RESET":
      return {
        country: "CA",
        province: undefined,
        provinceError: false,
        specifier: "city",
        cityError: false,
        postalCodeError: false,
      };
    case "REFRESH_TEXTFIELD":
      if (action.payload === "city") return { ...state, cityError: false }; // prettier-ignore
      else if (action.payload === "postal_code") return { ...state, postalCodeError: false }; // prettier-ignore
      return state;
    default:
      return state;
  }
}
