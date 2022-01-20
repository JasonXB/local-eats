const axios = require("axios");

export default async function handler(req, res) {
  // Gather required data for your request to the Mapqiuest API
  const lat = req.body.latitude;
  const long = req.body.longitude;
  console.log(lat, long, process.env.MAPQUEST_API_KEY);
  const requestURL = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}&location=${lat},${long}`;
  const requestData = await fetchLocationData(lat, long, requestURL);
  if (requestData !== null) {
    //  prettier-ignore
    res.status(200).json({ message: "Data fetched successfully", requestData });
  } else {
    res.status(404).json({ message: "MapquestAPI error" });
  }
}

//  prettier-ignore
export const fetchLocationData = async function (latitude, longitude, requestURL) {
  try {
    // Request data from mapquest then organize it
    const mapquestResponse = await axios.get(requestURL); // autoparsed to JS
    const city = mapquestResponse.data.results[0].locations[0].adminArea5;
    const nation = mapquestResponse.data.results[0].locations[0].adminArea1;
    const data = {
      city,
      nation,
      locationString: `${city}, ${nation}`,
      latitude,
      longitude,
    };
    return data;
  } catch (error) {
    // Axios will auto-throw an error if the request gets rejected or returns an error code
    return null;
  }
};
