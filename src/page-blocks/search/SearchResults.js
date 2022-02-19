import React from "react";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore
import { mix } from "../../../styles/styleMixins";
export default function SearchResults(props) {
  const { apiString, searchHeader } = props;
  const { locationObject } = useLocationContext();

  // Compose the full header based on our current location, and the search term
  let searchTitle = "";
  if (locationObject)
    searchTitle = `${searchHeader} near ${locationObject.locationString}`;

  return (
    <Box sx={{ px:4 }}>
      <Typography variant="h3" component="h2">
        {searchTitle}
      </Typography>
    </Box>
  );
}
