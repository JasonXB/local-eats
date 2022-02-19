import { removeEmptyKVPs } from "./removeEmptyKVPs";
import { starterFilters } from "../../../state-management/store/search/filters";

// dependent on a static page with dynamic data (/search?term=...)
export function generateYelpString(locationObject, queryObject) {
  // End this function early if Reacts prerendering gives us falsy values on mount
  if (!queryObject || !locationObject) return;
  if (!queryObject.term && !queryObject.price) return;
  // Create an object full of query parameters extracted from our URL
  const queryParams = removeEmptyKVPs({
    defaultRadius: starterFilters.radius,
    latitude: locationObject.latitude,
    longitude: locationObject.longitude,
    price: queryObject.price, // may equal undefined (could be removed)
    term: queryObject.term, // may equal undefined (could be removed)
  });
  // Return query string
  const qs = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&"); // convert object to a query string
  return `https://api.yelp.com/v3/businesses/search?${qs}`;
}

export function getSearchHeader(queryObject) {
  // Create an object full of query parameters extracted from our URL
  const queryParams = {
    price: queryObject.price, // may equal undefined (could be removed)
    term: queryObject.term, // may equal undefined (could be removed)
  };
  // Return query string
  let title;
  if (queryParams.term) {
    const titleLowercase = `${queryParams.term}`;
    title = titleLowercase[0].toUpperCase() + titleLowercase.substring(1);
  } else if (queryParams.price === "1") title = "Restaurants";
  else if (queryParams.price === "4") title = "Restaurants";
  return title;
}
