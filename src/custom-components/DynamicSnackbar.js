import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useLocationContext } from "../../state-management/locationContext";

export default function DynamicSnackbar(props) {
  const { snackbarOpen, closeSnackbar } = useLocationContext(); // prettier-ignore

  const handleClose = (event, reason) => {
    // if (reason === "clickaway") return; // makes it so clicking off wont close this
    closeSnackbar();
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={props.msg}
      action={action}
    />
  );
}
