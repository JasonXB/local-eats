import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocationContext } from "../../state-management/locationContext";
import { generateYelpString } from "../../src/utility-functions/general/generateYelpString";
import Spinner from "../../src/custom-components/LoadingVisuals/FullScreen/Spinner";
// To reach this component, the user must have...
// A) Location Object stored in the Project state
// B) A search term or price level used to perform a request on Yelp's API

export default function Restaurants() {
  const router = useRouter();
  // Get query parameters from current URL and our current location fr/ React Context
  const { query } = useRouter(); // equals undefined during first 2 few render cycles
  const { locationObject } = useLocationContext();
  const [searchString, setSearchString] = useState(undefined);
  useEffect(() => {
    // query render cycles: undefined, undefined, yelpAPIString (we render loading spinner while we wait)
    setSearchString(generateYelpString(locationObject, query));
  }, [query, locationObject]);



  if (!searchString) return <Spinner />;
  return <div>{searchString}</div>;
}
