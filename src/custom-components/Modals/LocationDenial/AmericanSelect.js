import React, { useState, useRef, useReducer, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { mix } from "../../../../styles/styleMixins";
//  prettier-ignore
import { yelpStates, yelpCitiesUS } from "../../../../state-management/store/yelpData";
import { useSelector, useDispatch } from "react-redux";
import { usaDenialActions } from "../../../../state-management/store/homepage/locationDenialUSA";

export default function AmericanInputs() {
  //@ Grab redux store values
  const menu2Disabled = useSelector((state) => state.locationDenialUSA.menu2Disabled); // prettier-ignore
  const cityList = useSelector((state) => state.locationDenialUSA.cityList);
  const errorBooleanM1 = useSelector((state) => state.locationDenialUSA.errorStylingM1); // prettier-ignore
  const errorMessageM1 = useSelector((state) => state.locationDenialUSA.errorMessageM1); // prettier-ignore
  const errorBooleanM2 = useSelector((state) => state.locationDenialUSA.errorStylingM2); // prettier-ignore
  const errorMessageM2= useSelector((state) => state.locationDenialUSA.errorMessageM2); // prettier-ignore
  //@ Set up reusable dispatch functions
  const dispatch = useDispatch();
  const chooseState = (inp) => dispatch(usaDenialActions.selectState(inp)); //  prettier-ignore
  const chooseCity = (inp) => dispatch(usaDenialActions.selectCity(inp));
  const removeErrorM1 = () => dispatch(usaDenialActions.noErrorM1());
  const removeErrorM2 = () => dispatch(usaDenialActions.noErrorM2());

  const changeStateHandler = function (event, inputValue) {
    // Enable menu 2 and update its city selection list items
    chooseState(inputValue);
    removeErrorM1(); // remove any error stylings on that input as well
    return;
  };
  const changeCityHandler = function (event, inputValue) {
    // If we have a valid input, update the Redux chosenCity variable
    chooseCity(inputValue);
    removeErrorM2(); // remove any error stylings on that input as well
    return;
  };

  return (
    <>
      <Autocomplete
        onChange={changeStateHandler}
        disablePortal
        id="combo-box-demo"
        options={yelpStates}
        sx={stylesLocal.autoComplete}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select state"
            error={errorBooleanM1}
            helperText={errorMessageM1}
          />
        )}
      />
      <Autocomplete
        onChange={changeCityHandler}
        disablePortal
        id="combo-box-demo"
        options={cityList ? cityList : yelpCitiesUS["Arizona"]}
        disabled={menu2Disabled}
        sx={stylesLocal.autoComplete}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select city"
            error={errorBooleanM2}
            helperText={errorMessageM2}
          />
          // We use redux state variables to manage when this input goes red and renders error text
        )}
      />
    </>
  );
}

const stylesLocal = {
  autoComplete: { width: "100%", mx: "auto", mt: 2, mb: 1, ...mix.autoCompleteHeight }
}