import React from "react";
import { Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import PredeterminedModalWrapper from "./PredeterminedModalWrapper";
import InputField from "./LocationDenial/InputField";

export default function PredeterminedModal(props) {
  // Import redux variables that determine the visibility of our entire component
  const showModal = useSelector((state) => state.homepageModals.regionLocked);
  if (!showModal) return ""; // if falsy, don't render this component

  return (
    <PredeterminedModalWrapper headerText="Region Locked Content">
      <Typography variant="h6">
        We apologize, but Local Eats only has adequate search data for Canada
        and the US{" "}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="" sx={{ mb: 2 }}>
        Feel free to browse restaurants in our predetermined locations:
      </Typography>
      <InputField />
    </PredeterminedModalWrapper>
  );
}
