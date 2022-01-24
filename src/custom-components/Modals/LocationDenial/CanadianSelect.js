import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Autocomplete } from "@mui/material";
import { yelpCitiesCA } from "../../../../state-management/store/yelpData";

export default function CanadianInputs() {
  //@ Grab redux values from store/homepage/LocationDenial/AmericanSelect
  const dispatch = useDispatch();
  const chooseCity = (inp) =>
    dispatch({ type: "CHOOSE_CITY_CANADA", chosenCity: inp });

  const changeCityHandler = function (event, inputValue) {
    chooseCity(inputValue);
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
