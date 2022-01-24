import React, { useState, useRef, useReducer } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { yelpStates } from "../../../../state-management/store/yelpData";
import { useSelector, useDispatch } from "react-redux";

export default function AmericanInputs() {
  const cityRef = useRef();
  //@ Grab redux values from store/homepage/LocationDenial/AmericanSelect
  const dispatch = useDispatch();
  const cityList = useSelector((state) => state.usaSelection.cityList);
  const menu2Disabled = useSelector(
    (state) => state.usaSelection.menu2Disabled
  );
  //@ Set up reusable dispatch functions
  //  prettier-ignore
  const chooseState = (inp) => dispatch({ type:"CHOOSE_STATE_AMERICA", chosenState: inp });
  const disableMenu = () => dispatch({ type: "DISABLE_MENU2_AMERICA" });
  const chooseCity = (inp) =>
    dispatch({ type: "CHOOSE_CITY_AMERICA", chosenCity: inp });

  const changeStateHandler = function (event, inputValue) {
    // If we have a valid input, enable menu 1 and update its list items
    if (yelpStates.includes(inputValue)) chooseState(inputValue);
    // If we have an invalid input, disable menu 2
    else disableMenu();
  };

  const changeCityHandler = function (event, inputValue) {
    // If we have a valid input, enable menu 1 and update its list items
    if (yelpStates.includes(inputValue)) chooseState(inputValue);
    // If we have an invalid input, disable menu 2
    else disableMenu();
  };

  return (
    <>
      <Autocomplete
        onChange={changeStateHandler}
        disablePortal
        id="combo-box-demo"
        options={yelpStates}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
        renderInput={(params) => <TextField {...params} label="Select state" />}
      />
      <Autocomplete
        onChange={changeCityHandler}
        disablePortal
        id="combo-box-demo"
        options={cityList}
        disabled={menu2Disabled}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
        renderInput={(params) => (
          <TextField {...params} label="Select city" ref={cityRef} />
        )}
      />
    </>
  );
}
