/*
export default async function handler(req, res) {
  // Return an error for any non GET requests to this route
  //  prettier-ignore
  if (req.method !== "GET") res.status(404).json({message: 'No coded actions for that request type!'});

  // If the request type is GET, run the following
  const lat = req.body.latitude;
  const long = req.body.longitude;
  const requestURL = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}&location=${lat},${long}`;
  try {
    // Request data from mapquest then organize it
    const mapquestResponse = await axios.get(requestURL); // autoparsed to JS
    const data = {
      city: mapquestResponse.results.adminArea5,
      nation: mapquestResponse.results.adminArea1,
      //  prettier-ignore  "Ex. Toronto, Canada"
      locationString:
        mapquestResponse.results.adminArea5 +
        ", " +
        mapquestResponse.results.adminArea1,
    };
    // Return a json object back to the client side
    res.status(200).json({ message: "Data fetched successfully", data });
  } catch (error) {
    // Return an error if anything goes wrong in the try block (axios will take care of throwing errors for you)
    res.status(404).json({ message: "Fetch operation failure" });
  }
}
*/

export default async function handler(req, res) {
  res.status(200).json({ message: "Data fetched successfully"});
}

