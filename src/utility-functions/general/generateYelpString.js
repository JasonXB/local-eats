import { removeEmptyKVPs } from "./removeEmptyKVPs";

export function generateYelpString(locationObject, queryObject) {
  // End this function early if Reacts prerendering gives us falsy values on mount
  if (!queryObject || !locationObject) return;
  if (!queryObject.term && !queryObject.price) return;
  // Create an object full of query parameters extracted from our URL
  const queryParams = removeEmptyKVPs({
    defaultRadius: "20000",
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