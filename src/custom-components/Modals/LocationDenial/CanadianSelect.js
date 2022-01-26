import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { canadaDenialActions } from "../../../../state-management/store/homepage/locationDenialCA";
import { TextField, Autocomplete } from "@mui/material";
import { mix } from "../../../../styles/styleMixins";
import { yelpCitiesCA } from "../../../../state-management/store/yelpData";

export default function CanadianInputs() {
  //@ Grab redux values from store/homepage/LocationDenial/AmericanSelect
  const errorBoolean = useSelector((state) => state.locationDenialCA.errorStyling); //  prettier-ignore
  const errorMessage = useSelector((state) => state.locationDenialCA.errorMessage); //  prettier-ignore
  // Whenever we select a city, save that choice to the Redux store
  const dispatch = useDispatch();
  const chooseCity = (inp) => dispatch(canadaDenialActions.selectCity(inp));
  const removeErrorCA = () => dispatch(canadaDenialActions.noError()); //  prettier-ignore

  const changeCityHandler = function (event, inputValue) {
    removeErrorCA(); // if the input field had error styles enabled, remove them
    chooseCity(inputValue); // save city input val to redux store
  };

  return (
    <Autocomplete
      disablePortal
      onChange={changeCityHandler}
      id="combo-box-demo"
      options={yelpCitiesCA}
      // prettier-ignore
      sx={{ width: "100%", mx: "auto", mt: 2, mb: 1, ...mix.autoCompleteHeight }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select city"
          // Use state managed in Redux to decide when to render error messages and colors
          error={errorBoolean}
          helperText={errorMessage}
        />
      )}
    />
  );
}
