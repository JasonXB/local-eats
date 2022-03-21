import { getFullProvinceName, getFullStateName } from "../helperFunctions/stateProvCodes" // prettier-ignore
const axios = require("axios");

export default async function handler(req, res) {
  // Gather required data for your request to the Mapquest API
  const areaName = req.body.areaName;
  const requestURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${areaName}`;
  const requestData = await fetchLocationData(requestURL);
  if (requestData !== null)
    res.status(200).json({ message: "Data fetched successfully", requestData });
  else res.status(404).json({ message: "MapquestAPI error" });
}

async function fetchLocationData(requestURL) {
  try {
    // Request data from mapquest then organize the response data
    const response = await axios.get(requestURL); // autoparsed to JS
    // Organize request data
    const countryCode = response.data.results[0].locations[0].adminArea1;
    const stateProvinceCode = response.data.results[0].locations[0].adminArea3; // prettier-ignore
    const city = response.data.results[0].locations[0].adminArea5;
    const latitude = response.data.results[0].locations[0].latLng.lat;
    const longitude = response.data.results[0].locations[0].latLng.lng;

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


