import React, { useState, useRef } from "react";
import StaticInputField from "../src/custom-components/StaticInputField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

export default function UseFormControl() {
  const inputRef = useRef(); // access field value with inputRef.current.value
  return (
    <>
      <FormControl sx={{ width: "20.625rem" }}>
        <OutlinedInput inputRef={inputRef} placeholder="Enter email" />
      </FormControl>
    </>
  );
}
