import React, { useEffect, useRef, useState } from "react";
import { styled, Box } from "@mui/system";
import { useLocationContext } from "../../../state-management/locationContext";
//  prettier-ignore
import { Typography, Divider, TextField, Autocomplete, Button } from "@mui/material";
import { mix } from "../../../../styles/styleMixins";
import { countries } from "../countryData";
import axios from "axios";

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
  const { hideModal } = useLocationContext();
  const nationRef = useRef(); // currently selected nation

  // When the user selects a country, generate a list of areas Yelp has data for
  const [areaList, setAreaList] = useState(null);
  const nationChangeHandler = async function (e) {
    const selectedNation = nationRef.current.firstChild.firstChild.value;
    console.log(selectedNation);
    //@ Render a list of options for that country, right beneath option 1
  };

  /*
  const submitHandler = async function (params) {
    // Get the country value currently selected (must dig deep thanks to MUI)
    const inputValue = nationRef.current.firstChild.firstChild.value;
    // Length MUST be over 0 to warrant an API call
    // The input is set to only accept pre-defined answers, so anything different counts as an empty string (thanks, MUI <3)
    if (inputValue == 0) return alert("Improper selection"); //! replace with input text later

    try {
      // Make an API request that gets us the capital city name of the country we chose
      const apiRouteRequest = await axios.post("/api/getCapital", {
        countryName: inputValue,
      });
      // Data contains { city, nation, locationString , latitude, longitude }
      const capitalCityData = apiRouteRequest.data.payload;
      console.log(capitalCityData);
      // Save it to the project state and localStorage (this is your new current Location)
    } catch (err) {
      alert("Something went wrong");
    }

    //! Use that to form a search string for the the Yelp API
    // hideModal();
  };
  */

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

          <Autocomplete
            // id={String(Math.random())} // prevents old choices being saved
            sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
            onChange={nationChangeHandler}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            clearOnEscape
            disablePortal
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Enter a country..."
                ref={nationRef}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />

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
              // onClick={submitHandler}
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
