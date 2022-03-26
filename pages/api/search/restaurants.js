import axios from "axios";

export default async function handler(req, res) {
  // Grab data from .env.local and the request body
  const { endpoint } = req.body;
  const sortByRating = endpoint.includes("sort_by=rating"); // Bool
  const authKey = process.env.YELP_API_KEY;
  // Make a GET request to Yelp Fusion and return the data
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${authKey}`,
    };
    const response = await axios.get(endpoint, { headers });
    const rawResults = response.data.businesses; // array full of restaurant objects
    const numberOfHits = response.data.total; // number of matches for the search
    // If we get zero hits, end the route early but successfully
    if (!numberOfHits) {
      res
        .status(201)
        .json({ message: "No results", results: null, numberOfHits: 0 });
      return;
    }
    // If we do have matches...query the each restauarant object for data needed on Restauarant Cards
    const editedResults = organizeData(rawResults);
    // Sort results by rating if the API string tells us to
    if (sortByRating) editedResults.sort((a, b) => b.rating - a.rating);

    return res
      .status(201)
      .json({ message: "Data fetched", results: editedResults, numberOfHits });
  } catch (err) {
    return res.status(408).json({ message: "No results found",  results: null, numberOfHits: 0 });
  }
}

export const organizeData = function (rawResults) {
  return rawResults.map((value, index) => {
    // Concatenate strings to form a list of categories
    const listOfCategories = value.categories.map((obj) => obj.title); // array
    const categoryString = listOfCategories.join(", ");
    const relevantData = {
      searchIndex: index,
      storeID: value.id,
      image: value.image_url || "/images/noIMG.png",
      storeName: value.name,
      category: categoryString || "(No description)",
      distance: value.distance
        ? `${(value.distance / 1000).toFixed(1)} km`
        : "Distance: ???", // return distance in km (we convert from meters) or "Distance unknown"
      rating: value.rating || 0,
      price: value.price || "???", // "$$$"
      address: value.location.address1,
    };
    return relevantData;
  });
}; // we've added fallbacks for bits of data that aren't guaranteed to be returned
