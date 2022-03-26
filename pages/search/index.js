import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useLocationContext } from "../../state-management/locationContext";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import SearchbarModals from "../../src/custom-components/Searchbar/SearchbarModals";
import RestaurantCard from "../../src/custom-components/SearchResults/RestaurantCard";
import RestaurantFilters from "../../src/page-blocks/search/RestaurantFilters";
import FiltersModal from "../../src/custom-components/Modals/SearchFilter/FiltersModal";
import NoResults from "../../src/page-blocks/search/NoResults";
import PaddedBlock from "../../src/custom-components/PaddedBlock";
import useBookmarks from "../api/helperFunctions/useBookmarks";
import { trackWindowScroll } from "react-lazy-load-image-component";
import PaginationRow from "../../src/page-blocks/search/sub/PaginationRow";
import Footer from "../../src/custom-components/Footer";
import { makeSearchHeader } from "../../src/utility-functions/search/makeSearchHeader";
import { createYelpEndpoint } from "../api/helperFunctions/createYelpEndpoint";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Stack } from "@mui/material";
import { mix } from "../../styles/styleMixins";
import { useYelpFetch } from "../api/helperFunctions/useYelpFetch";
import Wave from "../../src/custom-components/LoadingVisuals/Partial/Wave";

export async function getServerSideProps(context) {
  const queryParams = context.query;
  // Make a Header title using the query params
  let partialHeaderTitle = makeSearchHeader(queryParams);
  if (!partialHeaderTitle) partialHeaderTitle = null;
  const endpoint = createYelpEndpoint(queryParams); // create an API string
  return { props: { queryParams, endpoint, partialHeaderTitle } }; // prettier-ignore
}

function Restaurants(props) {
  const fetchYelpData = useYelpFetch();
  const initializeBookmarks = useBookmarks();
  const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay)); //  prettier-ignore
  // Extract prop values from getServerSideProps
  const [loading, setLoading] = useState(false);
  const [searchHeader, setSearchHeader] = useState(undefined); // "Ex. Ramen near Toronto"
  const { queryParams, endpoint, partialHeaderTitle, scrollPosition } = props; // prettier-ignore
  const { locationObject } = useLocationContext();

  // On startup, fetch Yelp data and create the header text
  const [onMount, setOnMount] = useState(true);
  useEffect(async () => {
    if (!locationObject) return;
    setLoading(true);
    setSearchHeader(`${partialHeaderTitle} ${locationObject.locationString}`); // prettier-ignore
    fetchYelpData(endpoint);
    if (onMount) {
      initializeBookmarks(); // Set the bookmarks on startup
      setOnMount(false);
      await wait(2000); // wait 3s to let the loading visual play out
      setLoading(false);
    }
    await wait(2000); // wait 3s to let the loading visual play out
    setLoading(false);
  }, [locationObject, queryParams, endpoint]);

  // POSSIBLE OUTCOMES
  // 1) Render nothing if the values from locationObj or query object are not ready yet ( = undefined at first)
  // apiString and searchHeader are dependent on the query obj from the component above this one
  // 2) Render a msg saying no results were found if someone searches for something & gets 0 hits
  // 3) Render a list of restaurant matches for the user's successful search
  const restaurantList = useSelector((rs) => rs.searchResults.restaurantList); // prettier-ignore
  const showError = useSelector((rs) => rs.searchResults.showError); // bool
  const numberOfHits = useSelector((rs) => rs.searchResults.numberOfHits);

  // There are 3 instances where the Yelp API call does not return any restaurant data
  if (!locationObject || showError || !numberOfHits) {
    let errorMsg;
    if (!locationObject) errorMsg = "No location specified!";
    else if (!numberOfHits) errorMsg= "No results found! Try searching something else"
    else if (showError) errorMsg= "Something's gone wrong! Reload the page or search for something else" // prettier-ignore
    return (
      <PaddedBlock>
        <HeaderSection parent={"searchPage"} breakpoint={725} />
        <NoResults msg={errorMsg} />
        {/* Still need our modals on standby */}
        <SearchbarModals />
        <FiltersModal />
      </PaddedBlock>
    );
  }
  // If we have search results and a location object, render the following
  return (
    <PaddedBlock>
      <HeaderSection parent={"searchPage"} breakpoint={725} />
      <RestaurantFilters />
      <Typography variant="h3" component="h2" sx={{ mb: 4, mt: 5, mx: 2 }}>
        {searchHeader}
      </Typography>
      {loading ? (
        <Wave />
      ) : (
        <LayoutContainer>
          <Box sx={mix.cards_container_search}>
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
          {numberOfHits && (
            <>
              <Box sx={{ ...mix.flexColumn }}>
                <PaginationRow numberOfHits={numberOfHits} />
              </Box>
              <Footer />
            </>
          )}
        </LayoutContainer>
      )}
      {/* These fixed position Modals are on standby and will pop up depending on (Redux) state values */}
      <FiltersModal />
      <SearchbarModals />
    </PaddedBlock>
  );
}
export default trackWindowScroll(Restaurants);
