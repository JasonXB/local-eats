import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocationContext } from "../../state-management/locationContext";
import { generateYelpString, getSearchHeader } from "../../src/utility-functions/general/searchStrings"; // prettier-ignore
import Spinner from "../../src/custom-components/LoadingVisuals/FullScreen/Spinner";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection";
import SearchbarModals from "../../src/custom-components/Searchbar/SearchbarModals";
import RestaurantFilters from "../../src/page-blocks/search/RestaurantFilters";
import SearchResults from "../../src/page-blocks/search/SearchResults";
import FiltersModal from "../../src/custom-components/Modals/SearchFilter/FiltersModal";

export default function Restaurants() {
  const router = useRouter();

  // Get query parameters from URL + current location object to make a YelpAPI string
  const { query } = useRouter(); // equals undefined during first 2 few render cycles, then an obj on 3rd
  const { locationObject } = useLocationContext();

  // Generate strings for the Yelp API and the header preceeding the restaurant cards
  const [apiString, setApiString] = useState(undefined);
  const [searchHeader, setSearchHeader] = useState(undefined);
  useEffect(() => {
    if (!query) return; // equals nothing during the first few render cycles
    setSearchHeader(getSearchHeader(query));
    if (!locationObject || !query) return;
    setApiString(generateYelpString(locationObject, query));
  }, [query, locationObject]);
  console.log(apiString, searchHeader);
  //! If we have no locationObject and arrive on this page, render the top section only
  return (
    <>
      <LayoutContainer>
        <HeaderSection />
        <RestaurantFilters />
        <SearchResults apiString={apiString} searchHeader={searchHeader} />
      </LayoutContainer>
      {/* These fixed position Modals are on standby and will pop up depending on (Redux) state values */}
      <SearchbarModals />
      <FiltersModal />
    </>
  );
}

//! TEST NAVIGATING TO THIS PAGE WITHOUT THESE LATER
// To not get redirected off this component, the user must have...
// A) Location Object stored in the Project state
// B) A search term or price level used to perform a request on Yelp's API
