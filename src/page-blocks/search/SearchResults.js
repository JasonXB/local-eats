import React, { useEffect } from "react";
import axios from "axios";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box, Stack, Container, Button } from "@mui/material"; // prettier-ignore
import { useSelector, useDispatch } from "react-redux";
import { searchResultActions } from "../../../state-management/store/search/results";
import { mix } from "../../../styles/styleMixins";
import NoResults from "../../page-blocks/search/NoResults";
import RestaurantCard from "../../custom-components/RestaurantCard";
import Pagination from "@mui/material/Pagination";

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
      console.log(results);
      // If we got no search results, render a message saying so by changing some Redux vals
      if (numberOfHits === 0) {
        dispatch(searchResultActions.showNoResults());
        return;
      }
      // If we do get results, save them to Redux
      dispatch(
        searchResultActions.saveRestaurants({
          list: results,
          hits: numberOfHits,
        })
      );
    } catch (error) {
      dispatch(searchResultActions.showError()); //!!! code JSX for showError= true
    }
  };

  // Fetch Yelp data on startup, and when any of the parameters change as a result of the queryObj changing
  useEffect(() => {
    fetchYelpData(apiString);
  }, [apiString, searchHeader, locationObject]);

  // Grab the array of restaurants so you can render Cards with them
  const restaurantList = useSelector((rs) => rs.searchResults.restaurantList); // prettier-ignore

  // POSSIBLE OUTCOMES
  // 1) Render nothing if the values from locationObj or query object are not ready yet ( = undefined at first)
  // 2) Render a msg saying no results were found (if someone searches for something & gets 0 hits, or Yelp API fails)
  // 3) Render a list of restaurant matches for the user's search query
  const showNoResults = useSelector((rs) => rs.searchResults.numberOfHits) == 0; // bool
  const showError = useSelector((rs) => rs.searchResults.showError); // bool
  const numberOfHits = useSelector((rs) => rs.searchResults.numberOfHits);
  if (!apiString || !searchHeader || !locationObject || !restaurantList) return null; // prettier-ignore

  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 4 }}>
        {searchHeader}
      </Typography>
      {showNoResults && (
        <NoResults msg="No results found on this page! Try changing your filters and/or search terms" />
      )}
      {showError && (
        <NoResults msg="Something has gone wrong on our end. Please try again" />
      )}
      {showNoResults || showError || (
        <>
          <Box id="desktopList" sx={styles.desktopParent}>
            {restaurantList.map((r_data) => (
              <RestaurantCard key={r_data.storeID} dataObj={r_data} />
            ))}
          </Box>
          <Box sx={{ ...mix.flexRow }}>
            <Pagination
              count={(numberOfHits % 50) + 1}
              variant="outlined"
              color="secondary"
              size="large"
              siblingCount={0}
              boundaryCount={0}
              sx={{ mx: "auto" }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

const styles = {
  desktopParent: {
    gridTemplateColumns: "repeat(auto-fit, minmax(20.75rem, 1fr))",
    ["@media (min-width: 400px)"]: {
      display: "grid",
      width: "100%",
      gap: 1.5,
      justifyItems: "center",
    },
    ["@media (min-width: 1100px)"]: {
      justifyItems: "start",
    },
  },
};
