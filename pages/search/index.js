import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocationContext } from "../../state-management/locationContext";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import SearchbarModals from "../../src/custom-components/Searchbar/SearchbarModals";
import RestaurantFilters from "../../src/page-blocks/search/RestaurantFilters";
import SearchResults from "../../src/page-blocks/search/SearchResults";
import FiltersModal from "../../src/custom-components/Modals/SearchFilter/FiltersModal";
import NoResults from "../../src/page-blocks/search/NoResults";
import useCreateYelpString from "../../src/utility-functions/search/useCreateYelpString";
import {makeSearchHeader} from "../../src/utility-functions/search/makeSearchHeader"

export default function Restaurants() {
  const makeYelpEndpoint = useCreateYelpString(); // feed this function a query object
  // Get query parameters from URL + current location object to make a YelpAPI string
  const { query } = useRouter();
  const { locationObject } = useLocationContext();

  // Generate strings for the Yelp API and the search header
  const [apiString, setApiString] = useState(undefined);
  const [searchHeader, setSearchHeader] = useState(undefined);

  useEffect(() => {
    // These both equal undefined during first few render cycles
    if (!query || !locationObject) return;
    // Generate a Yelp API string to request restaurant data
    setApiString(makeYelpEndpoint(query));
    // Generate a search header to show before our search results
    setSearchHeader(
      `${makeSearchHeader(query)} ${locationObject.locationString}`
    );
  }, [query, locationObject]);

  // If we have no locationObject and arrive on this page, render this
  if (!locationObject)
    return (
      <LayoutContainer>
        <HeaderSection />
        <NoResults msg="No location specified!" />
        {/* Still need our modals on standby */}
        <SearchbarModals />
        <FiltersModal />
      </LayoutContainer>
    );

  // If we have search results and a location object, render the following
  return (
    <LayoutContainer>
      <HeaderSection />
      <RestaurantFilters />
      <SearchResults apiString={apiString} searchHeader={searchHeader} />
      {/* These fixed position Modals are on standby and will pop up depending on (Redux) state values */}
      <SearchbarModals />
      <FiltersModal />
    </LayoutContainer>
  );
}

//! TEST NAVIGATING TO THIS PAGE WITHOUT THESE LATER
// To not get redirected off this component, the user must have...
// A) Location Object stored in the Project state
// B) A search term or price level used to perform a request on Yelp's API

