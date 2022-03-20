import React, { useEffect, useRef, useState, useReducer } from "react"; //  prettier-ignore
import { styled, Box } from "@mui/system";
import { useLocationContext } from "../../../../state-management/locationContext"; //  prettier-ignore

import {
  Typography,
  Divider,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { mix } from "../../../../styles/styleMixins";
import { breakBefore, breakAfter } from "../../ConditionalBreak";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
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
