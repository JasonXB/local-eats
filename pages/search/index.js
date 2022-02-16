import React, { useReducer, useEffect, useState } from "react";
import { useRouter } from "next/router";

// To reach this component, the user must have...
// A) Location Object stored in the Project state
// B) A search term or price level used to perform a request on Yelp's API

export default function Restaurants() {
  const router = useRouter();

  // Get query parameters from current URL (the obj may or may not be empty)
  const { query } = useRouter(); //!!! code actions in case this is empty
  console.log(query)
  

  return <div>f</div>;
}
