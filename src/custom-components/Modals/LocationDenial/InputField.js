import React, { useEffect, useRef, useState, useReducer } from "react"; //  prettier-ignore
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { canadaDenialActions } from "../../../../state-management/store/homepage/locationDenialCA";
import { usaDenialActions } from "../../../../state-management/store/homepage/locationDenialUSA";
import { homepageModalActions } from "../../../../state-management/store/homepage/ModalVisibility";
// MUI imports
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// Input fields (1 for Canada, 1 for USA)
import AmericanSelect from "./AmericanSelect";
import CanadianSelect from "./CanadianSelect";

export default function Predetermined() {
  const dispatch = useDispatch();
  const resetUS = () => dispatch(usaDenialActions.resetState()); // removes error visuals
  const resetCA = () => dispatch(canadaDenialActions.resetState()); // removes error visuals
  //^ Decide which selection menu to render <CanadianSelect/> or <AmericanSelect/>
  // Check Redux store values inside ModalVisibility.js
  const chosenCountry = useSelector((state) => state.homepageModals.selectedCountry); // prettier-ignore
  const selectCountry= (inp) => dispatch(homepageModalActions.selectCountry(inp)); // prettier-ignore

  const clickedCanada = (e) => {
    selectCountry("Canada");
    resetUS(); // remove error styling and reset state if you were playig with US inputs earlier
  };
  const clickedAmerica = (e) => {
    selectCountry("United States");
    resetCA(); // remove error styling and reset state if you were playig with CA inputs earlier
  };
  let inputs;
  if (chosenCountry === "Canada") inputs = <CanadianSelect />;
  if (chosenCountry === "United States") inputs = <AmericanSelect />;

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ width: "18rem" }}
      >
        <FormControlLabel
          value="Canada"
          control={<Radio />}
          label="Canada"
          onClick={clickedCanada}
          checked={chosenCountry === "Canada" ? true : false}
          sx={{ mx: "auto" }}
        />
        <FormControlLabel
          value="United States"
          control={<Radio />}
          label="United States"
          onClick={clickedAmerica}
          checked={chosenCountry === "United States" ? true : false}
          sx={{ mx: "auto" }}
        />
      </RadioGroup>
      {inputs}
    </FormControl>
  );
}
