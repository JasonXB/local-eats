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
import { lengthNoSpaces } from "../../src/utility-functions/general/lengthNoSpaces";

function makeSearchHeader(queryObj) {
  if (Object.keys(queryObj).length === 0) return;
  // Convert certain strings into Boolean values.  Ex. turn "false" string into Boolean
  const i = {};
  for (let key in queryObj) {
    const queryValue = queryObj[key];
    if (queryValue === "false") i[key] = false;
    else if (queryValue === "undefined") i[key] = undefined;
    else i[key] = queryValue;
  }
  // Capitalizes first letter of string then lowercases the rest, plus replaces _ with a space
  const formalString = (str) => {
    if (!str) return "";
    const capitalized =
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return capitalized.replace(/_/g, " ");
  };
  console.log(i);
  switch (true) {
    case i.price && typeof i.term === "undefined":
      if (i.price == "1" || i.price == "2") return "Affordable Restaurants near"; // prettier-ignore
      if (i.price == "3" || i.price == "4") return "Pricy Restaurants near";
      break;
    default:
      const formal = formalString(i.term);
      if (typeof i.term === "undefined" || !lengthNoSpaces(formal)) {
        return "Search results for";
      } else return `${formal} near`;
  }
}

export default function Restaurants() {
  const router = useRouter();
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
