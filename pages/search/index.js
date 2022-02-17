import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocationContext } from "../../state-management/locationContext";
import { generateYelpString } from "../../src/utility-functions/general/generateYelpString";
import Spinner from "../../src/custom-components/LoadingVisuals/FullScreen/Spinner";

export default function Restaurants() {
  const router = useRouter();
  // Get query parameters from current URL + current location from React Context
  const { query } = useRouter(); // equals undefined during first 2 few render cycles, then an obj on 3rd
  const { locationObject } = useLocationContext();

  // Generate a YelpAPI string to fetch restaurant data with
  const [searchString, setSearchString] = useState(undefined);
  useEffect(() => {
    setSearchString(generateYelpString(locationObject, query)); 
  }, [query, locationObject]);

  // Render a spinner while we wait for the the YelpAPI string to generate (CSR)
  if (!searchString) return <Spinner />;
  //! If we have no locationObject and arrive on this page, render the top section only
  return <div>{searchString}</div>;
}
//! TEST NAVIGATING TO THIS PAGE WITHOUT THESE LATER
// To not get redirected off this component, the user must have...
// A) Location Object stored in the Project state
// B) A search term or price level used to perform a request on Yelp's API


