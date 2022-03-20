import React from "react";
import { styled } from "@mui/system";
import { Typography, Box, Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { canadaDenialActions } from "../../../state-management/store/homepage/locationDenialCA";
import { usaDenialActions } from "../../../state-management/store/homepage/locationDenialUSA";
import { homepageModalActions } from "../../../state-management/store/homepage/ModalVisibility";
//  prettier-ignore
import { yelpCitiesCA, yelpCitiesUS, yelpStates } from "../../../state-management/store/yelpData";
import { useLocationContext } from "../../../state-management/locationContext";
import { styles, StyledModal } from "../../../styles/modal_styles";

export default function PredeterminedModalWrapper(props) {
  const { predeterminedHandler } = useLocationContext();
  const closeModal = () => dispatch(homepageModalActions.closeAllModals()); // reusable f()
  
  // Inspect the state values inside the Redux store
  const chosenCityCA = useSelector((state) => state.locationDenialCA.chosenCity); // prettier-ignore
  const chosenCityUSA = useSelector((state) => state.locationDenialUSA.chosenCity); // prettier-ignore
  const chosenStateUSA = useSelector((state) => state.locationDenialUSA.chosenState); // prettier-ignore
  const chosenCountry = useSelector((state) => state.homepageModals.selectedCountry); // prettier-ignore

  // Render/remove error visuals using dispatch functions
  const dispatch = useDispatch();
  const renderErrorCA = (errorMSG) => dispatch(canadaDenialActions.yesError(errorMSG)); //  prettier-ignore
  const removeErrorCA = () => dispatch(canadaDenialActions.noError()); //  prettier-ignore
  const renderErrorUS_M1 = (errorMSG) => dispatch(usaDenialActions.yesErrorM1(errorMSG)); //  prettier-ignore
  const removeErrorUS_M1 = () => dispatch(usaDenialActions.noErrorM1()); // removes error visuals
  const renderErrorUS_M2 = (errorMSG) => dispatch(usaDenialActions.yesErrorM2(errorMSG)); //  prettier-ignore
  const removeErrorUS_M2 = () => dispatch(usaDenialActions.noErrorM2()); // removes error visuals
  const resetUS = () => dispatch(usaDenialActions.resetState()); // removes error visuals
  const resetCA = () => dispatch(canadaDenialActions.resetState()); // removes error visuals

  const submitHandler = async function () {
    // Check the Redux store for the currently selected city in <CanadianSelect/> and <AmericanSelect/>
    if (chosenCountry === "Canada") {
      // Make sure the field is filled in
      if (!chosenCityCA) return renderErrorCA("City is a required field");
      // If the selected Canadian city isn't part of the list, render an error
      if (!yelpCitiesCA.includes(chosenCityCA)) return renderErrorCA("Invalid city choice"); //  prettier-ignore
      if (yelpCitiesCA.includes(chosenCityCA)) {
        removeErrorCA();
        console.log("SUCCESS CANADA");
        // save to localStorage and ContextAPI, then reset the state
        const areaName = `${chosenCityCA}, Canada`;
        const response = await predeterminedHandler(areaName);
        // if it fails, it should return a falsy
        closeModal();
        return;
      }
    } //

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
      // Save to localStorage and ContextAPI, then reset the state
      console.log("SUCCESS FOR USA");
      const areaName = `${chosenCityUSA}, ${chosenStateUSA}, United States`;
      const response = await predeterminedHandler(areaName);
      // if it fails, it should return a falsy
      closeModal();
      return;
    }
  };

  const cancelHandler = function () {
    resetCA(); // Reset the redux states for USA and Canada
    resetUS();
    closeModal(); // Make it so modal is not longer rendered
  };
  
  return (
    <>
      <Box sx={styles.backdrop}>
        <StyledModal>
          <Box sx={styles.modalCard}>
            <Typography
              color="secondary"
              variant="h3"
              sx={{
                fontWeight: 600,
                ...mix.flexRow,
                justifyContent: "center",
                mb: 2,
              }}
            >
              {props.headerText}
            </Typography>
            {props.children}
            <Box sx={{ ...mix.flexRow, justifyContent: "end", mt: 3.5 }}>
              <Button size="medium" onClick={cancelHandler}>
                Cancel
              </Button>
              <Button onClick={submitHandler} size="medium" sx={{ ml: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </StyledModal>
      </Box>
    </>
  );
}


