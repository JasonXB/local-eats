import { removeEmptyKVPs } from "../general/removeEmptyKVPs";
import useGetFilters from "./useGetFilters";

// This function should create a new URL using active filters and search terms submitted by the user
export default function useCreateYelpString() {
  const activeFilters = useGetFilters();

  function generate(locationObject, queryObject) {
    // End this function early if Reacts prerendering gives us falsy values on mount
    if (!queryObject) return;
    if (!queryObject.term && !queryObject.price) return; //!!! maybe don't need either
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
    return `https://api.yelp.com/v3/businesses/search?limit=50&${qs}`;
  }
  return generate;
}
