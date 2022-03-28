import React from "react";
import { Button } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

export default function ManageAccountBtn(props) {
  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (props.mobile) {
    return (
      <Button href="/auth/manage-account/general" fullWidth sx={{ mb: 1 }}>
        Manage Account
      </Button>
    );
  }

  // If we're past the sm breakpoint, render the following
  return (
    <Button href="/auth/manage-account/general" sx={mix.whiteHoverBG}>
      Manage Account
    </Button>
  );
}
