import React, { useRef, useState, useReducer } from "react";
import axios from "axios";
import ModalComponent from "../src/custom-components/Modals/ModalComponent";
import { Typography, Box, Stack, FormControl, OutlinedInput, FormHelperText, FormControlLabel, RadioGroup } from '@mui/material'; // prettier-ignore
import { mix } from "../styles/styleMixins";
import { styles } from "../styles/modal_styles";
import { useSelector, useDispatch } from "react-redux";
import { homepageModalActions } from "../state-management/store/homepage/ModalVisibility";
import Radio from "@mui/material/Radio";
import { TextField, Autocomplete } from "@mui/material";
import { breakBefore } from "../src/custom-components/ConditionalBreak"; // prettier-ignore
import { stateList, provinceList } from "../pages/api/helperFunctions/stateProvCodes"; // prettier-ignore

export default function testError() {
  const dispatch = useDispatch();
  const addressRef = useRef();
  const cityRef = useRef();

  // Manage input field values using an object of state values
  const [chosen, dispatchFN] = useReducer(reducer, {
    country: "CA", // have Canada preselected
    province: undefined,
    provinceError: false, // works with american states too
  });

  const selectCountry = async function (e) {
    if (!e.target.value) return;
    dispatchFN({ type: "SELECT_COUNTRY", payload: e.target.value });
  };
  const selectProvince = async function (e, inputValue) {
    dispatchFN({ type: "SELECT_STATE_PROVINCE", payload: inputValue });
  };

  //! Send a request to the Mapquest API to grab location data based on the user inputs
  const closeModal = () => dispatch(homepageModalActions.closeAllModals()); // closes the SpecifyLocation Modal
  const submitHandler = async function () {
    const typedCity = cityRef.current.value;
    const typedAddress = addressRef.current.value;
    // Send user inputs to the API route
    try {
      const response = await axios.post("/api/getAreaInfo/viaSpecifyLocation", {
        country: chosen.country,
        province: chosen.province, // country/province saved to state
        city: typedCity,
        address: typedAddress, // city and address inputs referred to using a hook
      });
      closeModal();
    } catch (error) {}
  };

  return (
    <ModalComponent
      headerText="Specify your Location"
      closeModal={closeModal}
      submit={submitHandler}
    >
      <Typography variant="h6" sx={{ my: 1 }}>
        We'll select the location that{breakBefore(520)} best matches your inputs
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
          sx={{ ...styles.inputField }}
          renderInput={(params) => (
            <TextField {...params} label="Select state (required)" />
          )}
        />
      )}
      {/* List of Canadian provinces */}
      {chosen.country === "CA" && (
        <Autocomplete
          disablePortal
          onChange={selectProvince}
          options={provinceList}
          sx={{ ...styles.inputField }}
          renderInput={(params) => (
            <TextField {...params} label="Select province (required)" />
          )}
        />
      )}
      {/* City and address fields */}
      <TextField
        label="Enter city (optional)"
        sx={{ ...styles.inputField }}
        inputRef={cityRef}
      />
      <TextField
        label="Enter address (optional)"
        sx={{ ...styles.inputField }}
        inputRef={addressRef}
      />
    </ModalComponent>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_COUNTRY":
      return {
        country: action.payload,
        province: undefined,
        provinceError: false,
      };
    case "SELECT_STATE_PROVINCE":
      return { ...state, province: action.payload, provinceError: false };
    case "SUBMIT":
      return {
        country: action.payload.country,
        province: action.payload.province,
        provinceError: false,
      };
    case "RESET":
      return {
        country: undefined,
        province: undefined,
        provinceError: false,
      };
    default:
      return state;
  }
}


