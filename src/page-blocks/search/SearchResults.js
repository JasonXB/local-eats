import React from "react";
import useSWR from "swr";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore
import { mix } from "../../../styles/styleMixins";

export default function SearchResults(props) {
  // If any of these values are undefined, render nothing (will happen during first few render cycles)
  const { apiString, searchHeader } = props;
  const { locationObject } = useLocationContext();
  if (!apiString || !searchHeader || !locationObject) return ""; 
  
  // Fetch data from Yelp's API in order to render them


  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h3" component="h2">
        {searchHeader}
      </Typography>
    </Box>
  );
}
