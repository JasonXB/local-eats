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
import { fetchYelpData } from "../api/helperFunctions/fetchYelpData";

export async function getServerSideProps(context) {
  const queryParams = context.query;
  // Make a Header title using the query params
  const partialHeaderTitle = makeSearchHeader(queryParams);
  // Create an API string and fetch Yelp data with it
  const endpoint = createYelpEndpoint(queryParams);
  const requestData = await fetchYelpData(endpoint);
  // If the process fails, return props that say so
  if (!requestData) return { props: { fetchFailed: true } };
  const { numberOfHits, results } = requestData;
  return { props: { fetchFailed: false, numberOfHits, results, partialHeaderTitle, queryParams } }; // prettier-ignore
}

export default function Restaurants(props) {
  console.log(9);
  console.log(props);
  // Get query parameters from URL + current location object to make a YelpAPI string
  // const { query } = useRouter();
  // const { locationObject } = useLocationContext();

  // // Generate strings for the Yelp API and the search header
  // const [apiString, setApiString] = useState(undefined);
  // const [searchHeader, setSearchHeader] = useState(undefined);

  // useEffect(() => {
  //   // These both equal undefined during first few render cycles
  //   if (!query || !locationObject) return;
  //   // Generate a Yelp API string to request restaurant data
  //   // Generate a search header to show before our search results
  //   setSearchHeader(
  //     `${makeSearchHeader(query)} ${locationObject.locationString}`
  //   );
  // }, [query, locationObject]);

  // // Save the restaurants stored in the DB to the Global state
  // const initializeBookmarks = useBookmarks(); // f() sets bookmarks on startup
  // useEffect(() => {
  //   initializeBookmarks();
  // }, []);

  // If we have no locationObject and arrive on this page, render this
  return <div>k</div>;
  if (!locationObject) {
    return (
      <LayoutContainer>
        <HeaderSection parent={"searchPage"} breakpoint={725} />
        <NoResults msg="No location specified!" />
        {/* Still need our modals on standby */}
        <SearchbarModals />
        <FiltersModal />
      </LayoutContainer>
    );
  }

  // If we have search results and a location object, render the following
  return (
    <PaddedBlock>
      <HeaderSection parent={"searchPage"} breakpoint={725} />
      <RestaurantFilters />
      <LayoutContainer>
        <Typography variant="h3" component="h2" sx={{ mb: 4, mt: 5 }}>
          {searchHeader}
        </Typography>
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
        <Box sx={{ ...mix.flexColumn }}>
          <PaginationRow numberOfHits={numberOfHits} />
        </Box>
        <Footer />
      </LayoutContainer>
      {/* These fixed position Modals are on standby and will pop up depending on (Redux) state values */}
      <FiltersModal />
      <SearchbarModals />
    </PaddedBlock>
  );
}
