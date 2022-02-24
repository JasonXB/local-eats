import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../../styles/styleMixins";

export default function NoLocation(props) {
  return (
    <Stack
      sx={(theme) => {
        return {
          ...mix.flexRow,
          pt: 5,
          textAlign: "center",
          [theme.breakpoints.up("sm")]: { pt: 15 },
        };
      }}
    >
      <Typography variant="h3">{props.msg}</Typography>
    </Stack>
  );
}
