import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { canadaDenialActions } from "../../../../state-management/store/homepage/locationDenialCA";
import { TextField, Autocomplete } from "@mui/material";
import { yelpCitiesCA } from "../../../../state-management/store/yelpData";

export default function CanadianInputs() {
  //@ Grab redux values from store/homepage/LocationDenial/AmericanSelect
  const dispatch = useDispatch();
  const chooseCity = (inp) => dispatch(canadaDenialActions.selectCity(inp));

  const changeCityHandler = function (event, inputValue) {
    chooseCity(inputValue); // save city input val to redux store
  };

  return (
    <Autocomplete
      disablePortal
      onChange={changeCityHandler}
      id="combo-box-demo"
      options={yelpCitiesCA}
      sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
      renderInput={(params) => <TextField {...params} label="Select city" />}
    />
  );
}
