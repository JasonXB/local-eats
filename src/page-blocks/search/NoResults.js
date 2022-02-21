import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

export default function NoLocation(props) {
  return (
    <Stack sx={{ ...mix.flexRow, pt:15, textAlign:"center" }}>
      <Typography variant="h3">{props.msg}</Typography>
    </Stack>
  );
}
