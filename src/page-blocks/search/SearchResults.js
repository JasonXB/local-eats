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

  // Fetch Yelp API data
  const dispatch = useDispatch();
  const fetchYelpData = async function (inp) {
    // Don't run this if these values are undefined or falsy
    if (!apiString || !searchHeader || !locationObject) return;
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
      // Update Redux state values in store/search/results that decide what JSX gets rendered
      const responseObj = error.response;
      switch (responseObj.data.message) {
        // Decides when to render the "No Results" message (store/search/results)
        case "No results found":
          dispatch(searchResultActions.showNoResults());
          break;
        // Decides when to render a general error message (store/search/results)
        default:
          dispatch(searchResultActions.showGeneralError());
          break;
      }
    }
  };
  fetchYelpData(apiString);

  // POSSIBLE OUTCOMES
  // 1) Render a msg saying no results were found (if someone searches for something & gets no hits)
  // 2) Render a message that says something's gone wrong (if there are problems with Yelp's API)
  // 3) Render nothing if the values from locationObj or query object are not ready yet ( = undefined at first)
  // 4) Render a list of restaurant matches for the user's search query
  const showNoResults = useSelector((rs) => rs.searchResults.noResults); // bool
  const showGeneralError = useSelector((rs) => rs.searchResults.generalError); // bool
  if (!apiString || !searchHeader || !locationObject) return ""; 
  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h3" component="h2">
        {searchHeader}
      </Typography>
      {showNoResults && <NoResults msg="No results found" />}
      {showGeneralError && (
        <NoResults msg="Something's gone wrong on our end. Please try again" />
      )}
      {!showNoResults && !showGeneralError && <div>List of restos</div>}
    </Box>
  );
}
