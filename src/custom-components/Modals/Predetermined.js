import React from "react";
import { Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import PredeterminedModalWrapper from "./PredeterminedModalWrapper";
import InputField from "./LocationDenial/InputField";

export default function PredeterminedModal(props) {
  // Import redux variables that determine the visibility of our entire component
  const showModal = useSelector((state) => state.homepageModals.showPredetermined); // prettier-ignore
  if (!showModal) return ""; // if falsy, don't render this component

  return (
    <PredeterminedModalWrapper headerText="Pick a Predetermined Location">
      <Typography variant="h6">
        Search for restaurants across Canada and the United States
        <br />
        (while keeping your location anonymous)
      </Typography>
      <Divider sx={{ my: 2 }} />
      <InputField />
    </PredeterminedModalWrapper>
  );
}
