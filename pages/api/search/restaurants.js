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
    // If we get zero hits, end the route early but successfully
    if (!numberOfHits) {
      res
        .status(201)
        .json({ message: "No results", results: null, numberOfHits: 0 });
      return;
    }
    // If we do have matches...query the each restauarant object for data needed on Restauarant Cards
    const editedResults = rawResults.map((value, index) => {
      console.log(value);
      // Concatenate strings to form a list of categories
      const listOfCategories = value.categories.map((obj) => obj.title); // array
      const categoryString = listOfCategories.join(", ");
      // Decide if the store is closed, open, or unknown
      let hours;
      if (value.open_now === true) hours = "Open now";
      else if (value.open_now === false) hours = "Closed for now";
      else hours = "(Hours unknown)";
      const relevantData = {
        searchIndex: index,
        storeID: value.id,
        image: value.image_url || "/images/noIMG.png",
        storeName: value.name,
        category: categoryString || "(No description)",
        distance: value.distance
          ? `${(value.distance / 1000).toFixed(1)} km away`
          : "Distance: N/A", // return distance in km (we convert from meters) or "Distance unknown"
        rating: value.rating || "?",
        price: value.price || "N/A", // "$$$"
        hours,
      };
      return relevantData;
    }); // we've added fallbacks for bits of data that aren't guaranteed to be returned
    res
      .status(201)
      .json({ message: "Data fetched", results: editedResults, numberOfHits });
    return;
  } catch (err) {
    res.status(422).json({ message: "No results found" });
    return;
  }
}
