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

export default function ModalWrapper(props) {
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
              <Button variant="outlined" size="medium" onClick={cancelHandler}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={submitHandler}
                size="medium"
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </StyledModal>
      </Box>
    </>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    zIndex: 1299,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    bgcolor: "rgb(0, 0, 0, 0.4)",
    width: "100vw",
    height: "100vh",
  },
  modalCard: {
    width: "100%",
    maxWidth: "40rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "24px",
    p: 2,
    px: 4,
    pb: 3,
  },
};