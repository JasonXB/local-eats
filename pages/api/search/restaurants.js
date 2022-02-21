import axios from "axios";

export default async function handler(req, res) {
  // Grab data from .env.local and the request body
  const { apiString } = req.body;
  const authKey = process.env.YELP_API_KEY;
  // Make a GET request to Yelp Fusion and return the data
  try {
    console.log("BEGIN")
    const data = await fetch(apiString, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Authorization: `bearer ${authKey}` }),
    });
    if (!data.ok) throw new Error("fetch failed");
    const parsedData = await data.json();
    console.log(parsedData);
    //!!! Remove unrequired information here
    res.status(201).json({ message: "Data fetched", restaurants: parsedData });
    return;
  } catch (err) {
    res.status(420).json({ message: "Fetch failed" });
    return;
  }
}
