import React from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { mix } from "../../../styles/styleMixins";
import ModalWrapper from "./ModalWrapper";
import InputField from "./LocationDenial/InputField";

export default function PredeterminedModal(props) {
  // Import redux variables that determine the visibility of our entire component
  const showModal = useSelector((state) => state.homepageModals.showPredetermined); // prettier-ignore
  if (!showModal) return ""; // if falsy, don't render this component

  return (
    <ModalWrapper headerText="Pick from Predetermined Locations">
      <Typography variant="h6">
        Search for restaurants across Canada and the United States
        <br />
        (while keeping your location anonymous)
      </Typography>
      <Divider sx={{ my: 2 }} />
      <InputField />
    </ModalWrapper>
  );
}
