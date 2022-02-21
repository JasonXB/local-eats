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
    const results = response.data.businesses; // array full of restaurant objects
    const numberOfHits = response.data.total; // number of matches for the search
    
    res.status(201).json({ message: "Data fetched", results, numberOfHits });
    return;
  } catch (err) {
    res.status(420).json({ message: "Fetch failed" });
    return;
  }
}
