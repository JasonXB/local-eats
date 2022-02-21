import React from "react";
import axios from "axios";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore
import { mix } from "../../../styles/styleMixins";

export default function SearchResults(props) {
  // If any of these values are undefined, render nothing (will happen during first few render cycles)
  const { apiString, searchHeader } = props;
  const { locationObject } = useLocationContext();
  if (!apiString || !searchHeader || !locationObject) return "";

  // Fetch Yelp API data
  const fetchYelpData = async function (inp) {
    try {
      const data = await axios.post("/api/search/restaurants", {
        apiString: inp,
      });
      const { results, numberOfHits } = data;
      console.log(numberOfHits);
      console.log(results);
    } catch (error) {
      console.error("YA DONE FUCKED UP"); //!!! render custom, No result error block
    }
  };
  fetchYelpData(apiString);
  //! Create Redux store: number of hits, current page number, restoData, 
  //! Sort data using default filter parameters at start, then resort when they change
  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h3" component="h2">
        {searchHeader}
      </Typography>
    </Box>
  );
}
