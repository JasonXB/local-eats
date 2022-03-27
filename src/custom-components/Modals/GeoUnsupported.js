import React from "react";
import { Typography, Box, Divider, Link } from "@mui/material";
import { useSelector } from "react-redux";
import PredeterminedModalWrapper from "./PredeterminedModalWrapper";
import InputField from "./LocationDenial/InputField";

export default function GeoUnsupported(props) {
  // Only render this modal when a Redux state value equals a non falsy
  const geolocationUnsupported= useSelector((state) => state.homepageModals.showGeoUnsupported); // prettier-ignore
  if (!geolocationUnsupported) return ""; // if falsy, don't render this component
  return (
    <>
      <PredeterminedModalWrapper headerText="Browser does not support Geolocation">
        <Typography variant="h6">
          Your experience will improve with access to geolocation services
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" component="p" sx={stylesLocal.option}>
          OPTION 1: Return after downloading a modern browser
        </Typography>
        <Box>
          <Link
            underline="hover"
            href="https://support.google.com/chrome/answer/95346?hl=en&co=GENIE.Platform%3DDesktop&oco=0"
            sx={stylesLocal.weblink}
          >
            Chrome
          </Link>
          <Link
            underline="hover"
            href="https://www.mozilla.org/en-US/firefox/new/"
            sx={stylesLocal.weblink}
          >
            Firefox
          </Link>
          <Link
            underline="hover"
            href="https://www.microsoft.com/en-us/edge"
            sx={stylesLocal.weblink}
          >
            Edge
          </Link>
        </Box>
        <Typography variant="h5" component="p" sx={stylesLocal.option}>
          OPTION 2: Use Predetermined Locations
        </Typography>
        <InputField />
      </PredeterminedModalWrapper>
    </>
  );
}

const stylesLocal = {
  option: { fontWeight: "600", my: 2 },
  weblink: { ml: 3, fontSize: "1.125rem" },
};
