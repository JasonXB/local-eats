import axios from "axios";

export default async function handler(req, res) {
  // Grab data from .env.local and the request body
  const { apiString } = req.body;
  const authKey = process.env.YELP_API_KEY;
  // Make a GET request to Yelp Fusion and return the data
  try {
    const fetchedData = await axios.get(apiString, {
      Authorization: `bearer ${authKey}`,
    });
    //!!! Remove unrequired information here
    res.status(201).json({ message: "Data fetched", restaurants: fetchedData });
    return;
  } catch (err) {
    res.status(422).json({ message: "Fetch failed" });
    return;
  }
}
