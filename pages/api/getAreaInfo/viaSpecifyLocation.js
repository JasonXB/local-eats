import { getProvinceCode, getStateCode } from "../helperFunctions/stateProvCodes" // prettier-ignore
import { removeWhiteSpace, lengthNoSpaces } from "../../../src/utility-functions/general/lengthNoSpaces"; // prettier-ignore
import { removeEmptyKVPs } from "../../../src/utility-functions/general/removeEmptyKVPs";

const axios = require("axios");

export default async function handler(req, res) {
  const { country, province, city, address } = req.body;

  // If province field is not specified during submit, return an error
  if (!province) {
    return res.status(401).json({ message: "Province/state not specified" });
  }
  // Remove whitespace from inputs and replace them with + signs
  const editedProvince = removeWhiteSpace(province, "+");
  const editedCity = removeWhiteSpace(city, "+");
  const editedAddress = removeWhiteSpace(address, "+");
  // Construct the MapQuest API string
  const frags = removeEmptyKVPs({
    city: editedCity,
    street: editedAddress,
    key: process.env.MAPQUEST_API_KEY,
  }); // all undefined KVP's will be removed
  let apiString = `http://www.mapquestapi.com/geocoding/v1/address?country=${country}&state=${editedProvince}`;
  for (let key in frags) apiString = apiString + `&${key}=${frags[key]}`;

  try {
    const response = await axios.get(apiString);
    const bestMatch = response.data.results[0].locations[0];

    // Organize the data that's required for the project locationObject
    const locationObj = removeEmptyKVPs({
      city: bestMatch.adminArea5,
      country: bestMatch.adminArea1,
      latitude: bestMatch.latLng.lat,
      longitude: bestMatch.latLng.lng,
      stateProvinceCode: bestMatch.adminArea3,
      apiString: `${bestMatch.adminArea5}, ${bestMatch.adminArea3}, ${bestMatch.adminArea1}`,
      locationString: `${bestMatch.adminArea5}, ${bestMatch.adminArea3}`, // "townName, stateName"
    });
    console.log(locationObj);
    return res
      .status(201)
      .json({ message: "Location data secured", locationObj });
  } catch (error) {
    return res.status(401).json({ message: "Error encountered" });
  }
}
