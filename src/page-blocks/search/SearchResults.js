import React, { useEffect } from "react";
import axios from "axios";
import { useLocationContext } from "../../../state-management/locationContext";
import { Typography, Box } from "@mui/material"; // prettier-ignore
import { useSelector, useDispatch } from "react-redux";
import { searchResultActions } from "../../../state-management/store/search/results";
import { mix } from "../../../styles/styleMixins";
import NoResults from "../../page-blocks/search/NoResults";
import RestaurantCard from "../../custom-components/SearchResults/RestaurantCard";
import { trackWindowScroll } from "react-lazy-load-image-component";
import PaginationRow from "./sub/PaginationRow";
import Footer from "../../custom-components/Footer";
import LayoutContainer from "../../custom-components/LayoutContainer";

function SearchResults(props) {
  // If any of these values are undefined, render nothing (will happen during first few render cycles)
  const { apiString, searchHeader, scrollPosition } = props; // scrollPosition from trackWindowScroll
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
      dispatch(searchResultActions.showError());
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
  // apiString and searchHeader are dependent on the query obj from the component above this one
  // 2) Render a msg saying no results were found if someone searches for something & gets 0 hits
  // 3) Render a list of restaurant matches for the user's successful search
  const showNoResults = useSelector((rs) => rs.searchResults.numberOfHits) == 0; // bool
  const showError = useSelector((rs) => rs.searchResults.showError); // bool
  const numberOfHits = useSelector((rs) => rs.searchResults.numberOfHits);
  if (
    !apiString ||
    !searchHeader ||
    !locationObject ||
    numberOfHits === undefined
  )
    return null;
  else if (showError) {
    return (
      <Box sx={{ px: 2 }}>
        <Typography variant="h3" component="h2" sx={{ mb: 4 }}>
          {searchHeader}
        </Typography>
        <NoResults msg="Something has gone wrong on our end. Please reload the page and try again" />
      </Box>
    );
  } else if (showNoResults) {
    return (
      <Box sx={{ mt: 4, mx: 2 }}>
        <Typography variant="h3" component="h2" sx={{ mb: 4 }}>
          {searchHeader}
        </Typography>
        <NoResults msg="No results found! Try changing your filters and/or search terms" />
      </Box>
    );
  } else {
    // If we have actual search results to show and no errors...
    return (
      <LayoutContainer>
        <Typography variant="h3" component="h2" sx={{ mb: 4, mt: 5 }}>
          {searchHeader}
        </Typography>
        <Box id="desktopList" sx={styles.desktopParent}>
          {restaurantList &&
            restaurantList.map((r_data) => (
              <RestaurantCard
                key={r_data.storeID}
                dataObj={r_data}
                // pass scrollPosition to each resto_card (for performance's sake)
                scrollPosition={scrollPosition}
              />
            ))}
        </Box>
        <Box sx={{ ...mix.flexColumn }}>
          <PaginationRow numberOfHits={numberOfHits} />
        </Box>
        <Footer />
      </LayoutContainer>
    );
  }
}
export default trackWindowScroll(SearchResults);

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
