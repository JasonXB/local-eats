import React, { useEffect, useRef, useState, useReducer } from "react"; //  prettier-ignore
import { styled, Box } from "@mui/system";
import { useLocationContext } from "../../../../state-management/locationContext"; //  prettier-ignore

import {
  Typography,
  Divider,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { mix } from "../../../../styles/styleMixins";
import {
  breakBefore,
  breakAfter,
} from "../../../custom-components/ConditionalBreak";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { canadaDenialActions } from "../../../../state-management/store/homepage/locationDenialCA";
import { usaDenialActions } from "../../../../state-management/store/homepage/locationDenialUSA";
import { homepageModalActions } from "../../../../state-management/store/homepage/ModalVisibility";
//  prettier-ignore
import { yelpCitiesCA, yelpCitiesUS, yelpStates } from "../../../../state-management/store/yelpData";
import PredeterminedInputs from "./PredeterminedInputs";
import ModalWrapper from "../ModalWrapper";

const StyledModal = styled("div")`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default function LocationDenialModal(props) {
  //@ Import redux variables that determine the visibility of our entire component
  const permissionsDenied= useSelector((state) => state.homepageModals.showLocationDenial); // prettier-ignore
  const closeModal = () => dispatch(homepageModalActions.closeAllModals()); // reusable f()

  //@ Create a dispatch function that selects a country and saves it to state
  const chosenCountry = useSelector((state) => state.homepageModals.selectedCountry); // prettier-ignore
  const selectCountry= (inp) => dispatch(homepageModalActions.selectCountry(inp)); // prettier-ignore
  //@ Inspect the state values inside the Redux store
  const chosenCityCA = useSelector((state) => state.locationDenialCA.chosenCity); // prettier-ignore
  const chosenCityUSA = useSelector((state) => state.locationDenialUSA.chosenCity); // prettier-ignore
  const chosenStateUSA = useSelector((state) => state.locationDenialUSA.chosenState); // prettier-ignore

  //@ Render/remove error visuals using dispatch functions
  const dispatch = useDispatch();
  const renderErrorCA = (errorMSG) => dispatch(canadaDenialActions.yesError(errorMSG)); //  prettier-ignore
  const removeErrorCA = () => dispatch(canadaDenialActions.noError()); //  prettier-ignore
  const renderErrorUS_M1 = (errorMSG) => dispatch(usaDenialActions.yesErrorM1(errorMSG)); //  prettier-ignore
  const removeErrorUS_M1 = () => dispatch(usaDenialActions.noErrorM1()); // removes error visuals
  const renderErrorUS_M2 = (errorMSG) => dispatch(usaDenialActions.yesErrorM2(errorMSG)); //  prettier-ignore
  const removeErrorUS_M2 = () => dispatch(usaDenialActions.noErrorM2()); // removes error visuals
  const resetUS = () => dispatch(usaDenialActions.resetState()); // removes error visuals
  const resetCA = () => dispatch(canadaDenialActions.resetState()); // removes error visuals

  const submitHandler = function () {
    // Check the Redux store for the currently selected city in <CanadianSelect/> and <AmericanSelect/>
    if (chosenCountry === "Canada") {
      // Make sure the field is filled in
      if (!chosenCityCA) return renderErrorCA("City is a required field");
      // If the selected Canadian city isn't part of the list, render an error
      if (!yelpCitiesCA.includes(chosenCityCA)) return renderErrorCA("Invalid city choice"); //  prettier-ignore
      if (yelpCitiesCA.includes(chosenCityCA)) {
        removeErrorCA();
        console.log("SUCCESS CANADA");
        //! save to localStorage and ContextAPI, then reset the state
        closeModal();
        return;
      }
    }

    if (chosenCountry === "United States") {
      // Make sure the fields are filled in
      if (!chosenStateUSA) return renderErrorUS_M1("State is required");
      if (!chosenCityUSA) return renderErrorUS_M2("City is required");
      // Check if Menu1's value is part of the Yelp List of states
      if (!yelpStates.includes(chosenStateUSA)) return renderErrorUS_M1("Invalid state name"); // prettier-ignore
      // Check if the selected city is inside the list of cities inside the selected state
      //  prettier-ignore
      const validCityStateCombo = yelpCitiesUS[chosenStateUSA].includes(chosenCityUSA); // true/false
      if (!validCityStateCombo) {
        return renderErrorUS_M2(`${chosenCityUSA} is not in ${chosenStateUSA}`);
      }
      // Past this point, the entries for Menu1 and Menu2 should be valid
      removeErrorUS_M1(); // remove red error text if any
      removeErrorUS_M2();
      //! Save to localStorage and ContextAPI, then reset the state
      console.log("SUCCESS FOR USA");
      closeModal();
      return;
    }
  };

  const cancelHandler = function () {
    resetCA(); // Reset the redux states for USA and Canada
    resetUS();
    closeModal(); // Make it so modal is not longer rendered
    selectCountry(null); // reset the state value so modal can reopen without 1 chosen yet
  };

  if (!permissionsDenied) return ""; // if falsy, don't render this component
  return (
    <ModalWrapper
      headerText="Location Permissions Denied"
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
    >
      <Typography variant="h6" component="p">
        This site requires a location to operate
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" component="p" sx={{ fontWeight: "600" }}>
        OPTION 1:
      </Typography>
      <Typography variant="h6" component="p">
        Search for restaurants in{breakBefore(490)} predetermined locations
        <br />
        (keeps your real location a secret)
      </Typography>
      <PredeterminedInputs />
      <Typography variant="h5" component="p" sx={{ fontWeight: "600", mt: 1 }}>
        OPTION 2:
      </Typography>
      <Typography variant="h6" component="p">
        Allow site to access your location.
        <br /> Reload the page, then hit the "detect location" button
      </Typography>
    </ModalWrapper>
  );
}
