import { removeEmptyKVPs } from "../general/removeEmptyKVPs";

export default function useCreateYelpString() {

  function generate(queryObject) {
    // Create an object full of query parameters extracted from our URL
    // We have to change a few values to create a valid endpoint for Yelp Fusion's API
    const queryParams = removeEmptyKVPs({
      radius: queryObject.radius,
      latitude: queryObject.latitude,
      longitude: queryObject.longitude,
      open_now: queryObject.hours,
      price: queryObject.price === 'false' && undefined, // remove fr/ the string if equal to "false" in queryObj
      term: queryObject.term, // may equal undefined (would get removed)
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
