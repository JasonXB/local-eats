import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocationContext } from "../../state-management/locationContext";
import { generateYelpString } from "../../src/utility-functions/general/generateYelpString";
import Spinner from "../../src/custom-components/LoadingVisuals/FullScreen/Spinner";
import { filterActions } from "../../state-management/store/search/filters";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Box, Stack, Container, Button } from "@mui/material";
import LayoutContainer from "../../src/custom-components/LayoutContainer";
import HeaderSection from "../../src/page-blocks/search/HeaderSection"

export default function Restaurants() {
  const router = useRouter();
  // Grab the filter parameters from Redux (user can alter these)
  const filters = {
    radius: useSelector((r) => r.searchFilters.radius),
    price: useSelector((r) => r.searchFilters.price),
    rating: useSelector((r) => r.searchFilters.rating),
    open_now: useSelector((r) => r.searchFilters.open_now),
  };

  // Get query parameters from URL + current location object to make a YelpAPI string
  const { query } = useRouter(); // equals undefined during first 2 few render cycles, then an obj on 3rd
  const { locationObject } = useLocationContext();
  const [searchString, setSearchString] = useState(undefined);
  useEffect(() => {
    setSearchString(generateYelpString(locationObject, query));
  }, [query, locationObject]);


  //! If we have no locationObject and arrive on this page, render the top section only
  return (
    <LayoutContainer>
      <HeaderSection/>
    </LayoutContainer>
  );
}

//! TEST NAVIGATING TO THIS PAGE WITHOUT THESE LATER
// To not get redirected off this component, the user must have...
// A) Location Object stored in the Project state
// B) A search term or price level used to perform a request on Yelp's API
