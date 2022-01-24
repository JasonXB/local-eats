//  prettier-ignore
import React, { useEffect, useRef, useState, useReducer } from "react";
import { styled, Box } from "@mui/system";
import { useLocationContext } from "../../../../state-management/locationContext";
//  prettier-ignore
import { Typography, Divider, TextField, Autocomplete, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AmericanSelect from "./AmericanSelect"
import CanadianSelect from "./CanadianSelect"
import { mix } from "../../../../styles/styleMixins";
import { countries } from "../countryData";

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
  // const [selection, dispatch]= useReducer(reducer,{
  //   selectedCountry: null,
  //   selectedState: null, // will still be null if we go with Canada
    
  // })
  const { hideModal } = useLocationContext();




  // Use this state variable to decide which selection menu to render (USA or CAD)
  const [conditionalMenu, setConditionalMenu] = useState(null);
  // If Canada is selected, render <CanadianSelect/>
  const clickedCanada = (e) => {
    console.log("Canada selected?", e.target.checked);
    setConditionalMenu(<CanadianSelect/>)
  };
  // If Canada is selected, render <AmericanSelect/>
  const clickedAmerica = (e) => {
    console.log("America selected?", e.target.checked);
    setConditionalMenu(<AmericanSelect/>)
  };
  const submitHandler = function(){
    // If conditionalMe
  }

  // const [selectionState, dispatch]
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
            (But we understand you may want to keep your location a secret)
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="p" sx={{ fontWeight: "600" }}>
            OPTION 1:
          </Typography>
          <Typography variant="h6" component="p">
            Search for restaurants in predetermined locations
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
          {conditionalMenu}
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: "600", mt: 2 }}
          >
            OPTION 2:
          </Typography>
          <Typography variant="h6" component="p">
            Allow site to access your location.
            <br /> Reload the page, hit the "detect location" button again, and
            answer "yes" on the prompt you receive
          </Typography>
          <Box sx={{ ...mix.flexRow, justifyContent: "end", mt: 5 }}>
            <Button variant="outlined" size="medium" onClick={hideModal}>
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
