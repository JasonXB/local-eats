//  prettier-ignore
import React, { useEffect, useRef, useState, useReducer } from "react";
import { styled, Box } from "@mui/system";
import { useLocationContext } from "../../../../state-management/locationContext";
//  prettier-ignore
import { Typography, Divider, TextField, Autocomplete, Button } from "@mui/material";
import { mix } from "../../../../styles/styleMixins";
import {
  breakBefore,
  breakAfter,
} from "../../../custom-components/ConditionalBreak";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { canadaDenialActions } from "../../../../state-management/store/homepage/locationDenialCA";
import { usaDenialActions } from "../../../../state-management/store/homepage/locationDenialUSA";
//  prettier-ignore
import { yelpCitiesCA, yelpCitiesUS, yelpStates } from "../../../../state-management/store/yelpData";
// MUI imports
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AmericanSelect from "./AmericanSelect";
import CanadianSelect from "./CanadianSelect";

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

export default function LocationModal(props) {
  //@ Decide which selection menu to render <CanadianSelect/> or <AmericanSelect/>
  const [selectedCountry, setSelectedCountry] = useState(null);
  const clickedCanada = (e) => setSelectedCountry("Canada");
  const clickedAmerica = (e) => setSelectedCountry("United States");
  let inputs;
  if (selectedCountry === "Canada") inputs = <CanadianSelect />;
  if (selectedCountry === "United States") inputs = <AmericanSelect />;

  //@ Inspect the state values inside the Redux store
  const chosenCityUSA = useSelector((state) => state.locationDenialUSA.chosenCity); //  prettier-ignore
  const chosenStateUSA = useSelector((state) => state.locationDenialUSA.chosenState); //  prettier-ignore
  const chosenCityCA = useSelector((state) => state.locationDenialCA.chosenCity); //  prettier-ignore

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
    if (selectedCountry === "Canada") {
      // Make sure the field is filled in
      if (!chosenCityCA) return renderErrorCA("City is a required field");
      // If the selected Canadian city isn't part of the list, render an error
      if (!yelpCitiesCA.includes(chosenCityCA)) return renderErrorCA("Invalid city choice"); //  prettier-ignore
      //! If the selected Canadian city is part of the list, remove error visuals and save the data
      if (yelpCitiesCA.includes(chosenCityCA)) {
        removeErrorCA();
        console.log("SUCCESS CANADA");
        //! save to localStorage and ContextAPI, then reset the state
      }
    }

    if (selectedCountry === "United States") {
      // Make sure the fields are filled in
      if (!chosenStateUSA) return renderErrorUS_M1("State is required");
      if (!chosenCityUSA) return renderErrorUS_M2("City is required");
      // Check if Menu1's value is part of the Yelp List of states
      if (!yelpStates.includes(chosenStateUSA)) return renderErrorUS_M1("Invalid state name"); // prettier-ignore
      // Check if the selected city is inside the list of cities inside the selected state
      //  prettier-ignore
      const validCityStateCombo = yelpCitiesUS[chosenStateUSA].includes(chosenCityCA); // true/false
      if (!validCityStateCombo) {
        return renderErrorUS_M2(`${chosenCityUSA} is not in ${chosenStateUSA}`);
      }
      // Past this point, the entries for Menu1 and Menu2 should be valid
      removeErrorUS_M1();
      removeErrorUS_M2();
      //! Save to localStorage and ContextAPI, then reset the state
      console.log("SUCCESS FOR USA");
      return;
    }
  };

  const cancelHandler = function () {
    // Reset the slices for USA and Canada
    resetCA();
    resetUS();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1299,
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        bgcolor: "rgb(0, 0, 0, 0.4)",
        width: "100vw",
        height: "100vh",
      }}
    >
      <StyledModal>
        <Box sx={style}>
          <Box sx={{ ...mix.flexRow, justifyContent: "center", mb: 2 }}>
            <Typography color="secondary" variant="h3" sx={{ fontWeight: 600 }}>
              Location Permissions Denied
            </Typography>
          </Box>
          <Typography variant="h6" component="p">
            This site requires a location to operate
            <br />
            But we understand you may want to{breakBefore(590)} keep your
            location a secret
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="p" sx={{ fontWeight: "600" }}>
            OPTION 1:
          </Typography>
          <Typography variant="h6" component="p">
            Search for restaurants in{breakBefore(490)} predetermined locations
          </Typography>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Canada"
                control={<Radio />}
                label="Canada"
                onClick={clickedCanada}
              />
              <FormControlLabel
                value="United States"
                control={<Radio />}
                label="United States"
                onClick={clickedAmerica}
              />
            </RadioGroup>
          </FormControl>
          {inputs}
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: "600", mt: 2 }}
          >
            OPTION 2:
          </Typography>
          <Typography variant="h6" component="p">
            Allow site to access your location.
            <br /> Reload the page, then hit the "detect location" button
          </Typography>
          <Box sx={{ ...mix.flexRow, justifyContent: "end", mt: 5 }}>
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
  );
}

const style = {
  width: "100%",
  maxWidth: "40rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "24px",
  p: 2,
  px: 4,
  pb: 3,
};

const stylesObj = {
  breakBefore490: {
    ["@media (min-width: 490px)"]: {
      display: "none",
    },
  },
};
