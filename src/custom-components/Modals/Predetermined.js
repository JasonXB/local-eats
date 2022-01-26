import React from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { mix } from "../../../styles/styleMixins";
import ModalWrapper from "./ModalWrapper";
import PredeterminedInputs from "./LocationDenial/PredeterminedInputs";

export default function PredeterminedLocations() {
  return (
    <ModalWrapper headerText="Pick from Predetermined Locations">
      <Typography variant="h6">
        Search for restaurants across Canada and the United States
        <br />
        (while keeping your location anonymous)
      </Typography>
      <Divider sx={{ my: 2 }} />
      <PredeterminedInputs />
    </ModalWrapper>
  );
}
