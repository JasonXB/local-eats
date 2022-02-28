import { removeEmptyKVPs } from "../general/removeEmptyKVPs";
import useGetFilters from "./useGetFilters";
import { useLocationContext } from "../../../state-management/locationContext";

//!!! use this to replace generateYelpString
//! If we have no locationObj, set it equal to the lat and long from the URL and geolocate new data
// This function should create a new URL using active filters and search terms submitted by the user
export default function useCreateYelpString() {
  const activeFilters = useGetFilters();
  const { locationObject } = useLocationContext();
  function generate(queryObject) {
    // Create an object full of query parameters extracted from our URL
    const queryParams = removeEmptyKVPs({
      radius: queryObject.radius,
      latitude: queryObject.latitude,
      longitude: queryObject.longitude,
      price: queryObject.price, // may equal undefined (could be removed)
      term: queryObject.term, // may equal undefined (could be removed)
    });
    // Return API string
    const qs = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&"); // convert object to a query string
    console.log(`https://api.yelp.com/v3/businesses/search?limit=50&${qs}`);
    return `https://api.yelp.com/v3/businesses/search?limit=50&${qs}`;
  }
  return generate;
}
