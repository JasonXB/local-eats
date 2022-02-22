import React from "react";
import axios from "axios";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore
import { useSelector, useDispatch } from "react-redux";
import { searchResultActions } from "../../../state-management/store/search/results";
import { mix } from "../../../styles/styleMixins";
import NoResults from "../../page-blocks/search/NoResults";

export default function SearchResults(props) {
  // If any of these values are undefined, render nothing (will happen during first few render cycles)
  const { apiString, searchHeader } = props;
  const { locationObject } = useLocationContext();

  // Fetch Yelp API data as soon as we arrive to the page
  const dispatch = useDispatch();
  const fetchYelpData = async function (inp) {
    // Don't run this if these values are undefined or falsy
    if (!apiString || !searchHeader || !locationObject) return;
    // Make a request to the API route that fetches data from Yelp's API
    try {
      const request = await axios.post("/api/search/restaurants", {
        apiString: inp,
      });
      const { numberOfHits, results } = request.data;
      // Update redux values in store/search/results
      dispatch(
        searchResultActions.saveRestaurants({
          list: results,
          hits: numberOfHits,
        })
      );
    } catch (error) {
      dispatch(searchResultActions.showNoResults());
    }
  };
  fetchYelpData(apiString);

  // POSSIBLE OUTCOMES
  // 1) Render nothing if the values from locationObj or query object are not ready yet ( = undefined at first)
  // 2) Render a msg saying no results were found (if someone searches for something & gets 0 hits, or Yelp API fails)
  // 3) Render a list of restaurant matches for the user's search query
  const showNoResults = useSelector((rs) => rs.searchResults.numberOfHits) == 0; // bool
  if (!apiString || !searchHeader || !locationObject) return null; 
  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h3" component="h2">
        {searchHeader}
      </Typography>
      {showNoResults && <NoResults msg="No results found" />}
      {!showNoResults && <div>List of restos</div>}
    </Box>
  );
}
