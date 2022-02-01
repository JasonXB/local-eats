import React from "react";
import { Typography, Box, Button, Divider, Link } from "@mui/material";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import InputField from "./LocationDenial/InputField";

export default function GeoUnsupported(props) {
  // Import redux variables that determine the visibility of our entire component
  const geolocationUnsupported= useSelector((state) => state.homepageModals.showGeoUnsupported); // prettier-ignore
  if (!geolocationUnsupported) return ""; // if falsy, don't render this component

  return (
    <>
      <ModalWrapper headerText="Browser does not support Geolocation">
        <Typography variant="h6">
          Your experience will improve with access to geolocation services
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h5"
          component="p"
          sx={{ fontWeight: "600", my: 2 }}
        >
          OPTION 1: Return after downloading a modern browser
        </Typography>
        <Box>
          <Link
            underline="hover"
            href="https://support.google.com/chrome/answer/95346?hl=en&co=GENIE.Platform%3DDesktop&oco=0"
            sx={{ ml: 3, fontSize: "1.125rem" }}
          >
            Chrome
          </Link>
          <Link
            underline="hover"
            href="https://www.mozilla.org/en-US/firefox/new/"
            sx={{ ml: 3, fontSize: "1.125rem" }}
          >
            Firefox
          </Link>
          <Link
            underline="hover"
            href="https://www.microsoft.com/en-us/edge"
            sx={{ ml: 3, fontSize: "1.125rem" }}
          >
            Edge
          </Link>
        </Box>
        <Typography
          variant="h5"
          component="p"
          sx={{ fontWeight: "600", my: 2 }}
        >
          OPTION 2: Use Predetermined Locations
        </Typography>
        <InputField />
      </ModalWrapper>
    </>
  );
}
