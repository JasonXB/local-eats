import axios from "axios";

export default async function handler(req, res) {
  // Grab data from .env.local and the request body
  const { apiString } = req.body;
  const authKey = process.env.YELP_API_KEY;

  // Make a GET request to Yelp Fusion and return the data
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `bearer ${authKey}`,
    };
    const response = await axios.get(apiString, { headers });
    const rawResults = response.data.businesses; // array full of restaurant objects
    const numberOfHits = response.data.total; // number of matches for the search

    // If we get zero hits, throw an error
    if (!numberOfHits) {
      res.status(420).json({ message: "No results found" });
      return;
    };

    // If we do have matches...
    // Capture the array full of restaurant objects, but add an index# KVP for each one
    const editedResults = rawResults.map((value, index) => {
      const restaurantObject = value;
      restaurantObject.searchIndex = index;
      return restaurantObject;
    });

    res
      .status(201)
      .json({ message: "Data fetched", results: editedResults, numberOfHits });
    return;
  } catch (err) {
    res.status(420).json({ message: "Fetch failed" });
    return;
  }
  return;
}
