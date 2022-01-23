import React from "react";
import { TextField, Autocomplete } from "@mui/material";

const yelpCoverageCanada = [
  "Calgary",
  "Edmonton",
  "Halifax",
  "Montréal",
  "Ottawa",
  "Toronto",
  "Vancouver",
];

export default function testError() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={yelpCoverageCanada}
      sx={{ maxWidth: 350, mx: "auto", mt: 2, mb: 1 }}
      renderInput={(params) => <TextField {...params} label="Select city" />}
    />
  );
}