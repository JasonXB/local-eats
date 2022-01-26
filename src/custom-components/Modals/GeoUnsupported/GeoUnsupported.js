import React from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { mix } from "../../../../styles/styleMixins";
import ModalWrapper from "../ModalWrapper";
import Predetermined from "../LocationDenial/Predetermined";
export default function GeoUnsupported() {
  //@ Import redux variables that determine the visibility of our entire component
  // const geolocationUnsupported= useSelector((state) => state.homepageModals.geolocationUnsupported); // prettier-ignore
  // if (!geolocationUnsupported) return ""; // if falsy, don't render this component

  return (
    <>
      <ModalWrapper headerText="Pick from Predetermined Locations">
        <Typography variant="h6">
          Search for restaurants while keeping your location a secret
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Predetermined />
      </ModalWrapper>
    </>
  );
}
