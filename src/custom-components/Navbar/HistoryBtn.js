import React from "react";
import { Button } from "@mui/material";
export default function HistoryBtn(props) {
  // props.mobile is a Boolean that tells us if we're rendering on a screen 700px long or lower
  if (props.mobile) {
    return (
      <Button fullWidth sx={{ mb: 1 }}>
        Search History
      </Button>
    );
  }

  // If we're past the sm breakpoint, render the following
  return <Button>Search History</Button>;
}
