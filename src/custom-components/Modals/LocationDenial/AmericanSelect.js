import React, { useState, useRef, useReducer, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
//  prettier-ignore
import { yelpStates, yelpCitiesUS } from "../../../../state-management/store/yelpData";
import { useSelector, useDispatch } from "react-redux";
import { usaDenialActions } from "../../../../state-management/store/homepage/locationDenialUSA";

export default function AmericanInputs() {
  //@ Grab redux store values
  const chosenState = useSelector((state) => state.locationDenialUSA.chosenState); // prettier-ignore
  const menu2Disabled = useSelector((state) => state.locationDenialUSA.menu2Disabled); // prettier-ignore
  const cityList = useSelector((state) => state.locationDenialUSA.cityList);
  const errorBooleanM1 = useSelector((state) => state.locationDenialUSA.errorStylingM1); // prettier-ignore
  const errorMessageM1 = useSelector((state) => state.locationDenialUSA.errorMessageM1); // prettier-ignore
  const errorBooleanM2 = useSelector((state) => state.locationDenialUSA.errorStylingM2); // prettier-ignore
  const errorMessageM2= useSelector((state) => state.locationDenialUSA.errorMessageM2); // prettier-ignore
  //@ Set up reusable dispatch functions
  const dispatch = useDispatch();
  const chooseState = (inp) => dispatch(usaDenialActions.selectState(inp)); //  prettier-ignore
  const disableMenu = () => dispatch(usaDenialActions.disableMenu());
  const chooseCity = (inp) => dispatch(usaDenialActions.selectCity(inp));
  const removeErrorM1 = () => dispatch(usaDenialActions.noErrorM1());
  const removeErrorM2 = () => dispatch(usaDenialActions.noErrorM2());

  const changeStateHandler = function (event, inputValue) {
    // If we have a valid input, enable menu 2 and update its city selection list items
    chooseState(inputValue);
    removeErrorM1();
    return;
  };

  const changeCityHandler = function (event, inputValue) {
    // If we have a valid input, update the Redux chosenCity variable
    chooseCity(inputValue);
    removeErrorM2();
    return;
  };

  return (
    <>
      <Autocomplete
        onChange={changeStateHandler}
        disablePortal
        id="combo-box-demo"
        options={yelpStates}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
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
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
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
