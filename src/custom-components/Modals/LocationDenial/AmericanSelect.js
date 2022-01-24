import React, { useState, useRef, useReducer } from "react";
import { TextField, Autocomplete } from "@mui/material";
import {
  yelpStates,
  yelpCitiesUS,
} from "../../../../state-management/store/yelpData";
import { useSelector, useDispatch } from "react-redux";
import { usaDenialActions } from "../../../../state-management/store/homepage/locationDenialUSA";

export default function AmericanInputs() {
  const cityRef = useRef();
  //@ Grab redux values from store/homepage/LocationDenialUSA
  const chosenState = useSelector(
    (state) => state.locationDenialUSA.chosenState
  );
  const cityList = useSelector((state) => state.locationDenialUSA.cityList);
  const menu2Disabled = useSelector(
    (state) => state.locationDenialUSA.menu2Disabled
  );

  //@ Set up reusable dispatch functions
  const dispatch = useDispatch();
  //  prettier-ignore
  const chooseState = (inp) => dispatch(usaDenialActions.selectState(inp));
  const disableMenu = () => dispatch(usaDenialActions.disableMenu());
  const chooseCity = (inp) => dispatch(usaDenialActions.selectCity(inp));

  const changeStateHandler = function (event, inputValue) {
    // If we have a valid input, enable menu 2 and update its city selection list items
    chooseState(inputValue);
    //! if (yelpStates[inputValue].includes(inputValue)) 
    // If we have an invalid input, disable menu 2
    // else disableMenu();
  };

  const changeCityHandler = function (event, inputValue) {
    // If we have a valid input, update the Redux chosenCity variable
    chooseCity(inputValue);
    //! if (yelpCitiesUS[inputValue].includes(inputValue)) 
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
        options={cityList ? cityList : yelpCitiesUS["Arizona"]}
        disabled={menu2Disabled}
        sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
        renderInput={(params) => (
          <TextField {...params} label="Select city" ref={cityRef} />
        )}
      />
    </>
  );
}
