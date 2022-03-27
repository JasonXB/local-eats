import React from "react"; //  prettier-ignore
import { Typography, Divider } from "@mui/material";
import { breakBefore } from "../../ConditionalBreak";
// Redux imports
import { useSelector } from "react-redux";
import InputField from "./InputField";
import PredeterminedModalWrapper from "../PredeterminedModalWrapper";

export default function LocationDenialModal(props) {
  //@ Import redux variables that determine the visibility of our entire component
  const permissionsDenied= useSelector((state) => state.homepageModals.showLocationDenial); // prettier-ignore
  if (!permissionsDenied) return ""; // if falsy, don't render this component

  return (
    <PredeterminedModalWrapper headerText="Location Permissions Denied">
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
      <InputField />
      <Typography variant="h5" component="p" sx={{ fontWeight: "600", mt: 1 }}>
        OPTION 2:
      </Typography>
      <Typography variant="h6" component="p">
        Allow site to access your location.
        <br /> Reload the page, then hit the "detect location" button
      </Typography>
    </PredeterminedModalWrapper>
  );
}
