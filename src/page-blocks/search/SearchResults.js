import React from "react";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore

export default function SearchResults(props) {
  const { apiString, searchHeader } = props;
  const { locationObject } = useLocationContext();

  // Compose the full header based on our current location, and the search term
  let searchTitle = "";
  if (locationObject)
    searchTitle = `${searchHeader} in ${locationObject.locationString}`;

  return (
    <Box sx={{px:2}}>
      <Typography variant="h4" component="h2">
        {searchTitle}
      </Typography>
    </Box>
  );
}
