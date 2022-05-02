import { getFullStateName, getFullProvinceName } from "../helperFunctions/stateProvCodes"; // prettier-ignore
const axios = require("axios");

export default async function handler(req, res) {
  // Gather required data for your request to the Mapquest API
  const lat = req.body.latitude;
  const long = req.body.longitude;
  const requestURL = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.MAPQUEST_API_KEY}&location=${lat},${long}`;
  const requestData = await fetchLocationData(lat, long, requestURL);
  if (requestData !== null) {
    return res
      .status(200)
      .json({ message: "Data fetched successfully", requestData });
  } else {
    return res.status(408).json({ message: "MapquestAPI error" });
  }
}

async function fetchLocationData(latitude, longitude, requestURL) {
  try {
    // Request data from mapquest then organize the response data
    const response = await axios.get(requestURL); // autoparsed to JS
    // Organize request data
    const countryCode = response.data.results[0].locations[0].adminArea1;
    const stateProvinceCode = response.data.results[0].locations[0].adminArea3; // prettier-ignore
    const city = response.data.results[0].locations[0].adminArea5;
    if (countryCode == "US") {
      return {
        country: "United States",
        stateProvinceCode,
        city,
        locationString: `${city}, ${stateProvinceCode}`,
        apiString: `${city}, ${getFullStateName(stateProvinceCode)}, USA`,
        latitude,
        longitude,
      };
    }
    if (countryCode == "CA") {
      return {
        country: "Canada",
        stateProvinceCode,
        city,
        locationString: `${city}, ${stateProvinceCode}`,
        apiString: `${city}, ${getFullProvinceName(stateProvinceCode)}, Canada`,
        latitude,
        longitude,
      };
    }
    return undefined;
  } catch (error) {
    // Axios will auto-throw an error if the request gets rejected or returns an error code
    return null;
  }
}
