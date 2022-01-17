import React from "react";
import { styled, Box } from "@mui/system";
//  prettier-ignore
import { Typography, Divider, TextField, Autocomplete, Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";
import { countries } from "./countryData";

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
  const [open, setOpen] = React.useState(props.showModal);
  //! Make something change the following to "true"
  const openHandler = () => setOpen(true);
  const cancelHandler = (e) => {
    setOpen(false);
  };
  const submitHandler = (e) => {
    //! Get capital city from Rest Countries API
    //! Use that to form a search string for the the Yelp API
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: open===true ? "block" : "none",
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
              Permission to Access
              <Box
                component="br"
                sx={{ ["@media (min-width: 800px)"]: { display: "none" } }}
              />{" "}
              Location Denied
            </Typography>
          </Box>
          <Typography variant="h6" component="p">
            This site requires a location to operate
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="p" sx={{ fontWeight: "600" }}>
            OPTION 1:
          </Typography>
          <Typography variant="h6" component="p">
            Allow site to access your location
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="p" sx={{ fontWeight: "600" }}>
            OPTION 2:
          </Typography>
          <Typography variant="h6" component="p">
            Search for restaurants in any nation of your choosing
            <br />
            (We understand you may want to keep your location a secret)
          </Typography>
          <Autocomplete
            id={String(Math.random())} // prevents old choices being saved
            sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
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
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
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
