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
    <PredeterminedModalWrapper
      headerText="Location Permissions Denied"
      omitSubmit="true"
    >
      <Typography variant="h6" component="p">
        This site requires a location to operate, but we understand you may wish
        to keep yours a secret
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" component="p" sx={{ fontWeight: "600" }}>
        ALT OPTION 1:
      </Typography>
      <Typography variant="h6" component="p">
        Search for restaurants in{breakBefore(490)} predetermined locations
      </Typography>
      <Typography variant="h5" component="p" sx={{ fontWeight: "600", mt: 2 }}>
        ALT OPTION 2:
      </Typography>
      <Typography variant="h6" component="p">
        Specify any location in Canada or the US
      </Typography>
    </PredeterminedModalWrapper>
  );
}
