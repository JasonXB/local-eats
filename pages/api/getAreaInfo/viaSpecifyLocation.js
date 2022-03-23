import { getProvinceCode, getStateCode } from "../helperFunctions/stateProvCodes" // prettier-ignore
import { removeWhiteSpace, lengthNoSpaces } from "../../../src/utility-functions/general/lengthNoSpaces"; // prettier-ignore
import { removeEmptyKVPs } from "../../../src/utility-functions/general/removeEmptyKVPs";

const axios = require("axios");

export default async function handler(req, res) {
  const { country, province, specifier, city, postalCode } = req.body;
  const convertCountryCode = (code) => {
    if (code == "CA") return "Canada";
    if (code == "US") return "United States";
  };

  // If province field is not specified during submit, return an error
  if (!province) {
    return res.status(401).json({ message: "Province/state not specified" });
  }
  // Remove whitespace from inputs and replace them with + signs
  const editedProvince = removeWhiteSpace(province, "+");
  const editedCity = specifier === "city" ? removeWhiteSpace(city) : undefined;
  const editedPostalCode = specifier === "postal_code" ?  removeWhiteSpace(postalCode) : undefined; // prettier-ignore
  // Construct the MapQuest API string
  const frags = removeEmptyKVPs({
    city: editedCity,
    postalCode: editedPostalCode,
    key: process.env.MAPQUEST_API_KEY,
  }); // all undefined KVP's will be removed
  let apiString = `http://www.mapquestapi.com/geocoding/v1/address?country=${country}&state=${editedProvince}`;
  for (let key in frags) apiString = apiString + `&${key}=${frags[key]}`;
  console.log(frags)
  try {
    // Extract then organize the data that's required for the project locationObject
    const response = await axios.get(apiString);
    const bestMatch = response.data.results[0].locations[0];

    // If Mapquest can't pinpoint an exact city, change what the apiString will be
    let mapquestCity = bestMatch.adminArea5;
    let locationString;
    let apiStr;
    if (!mapquestCity) {
      locationString = `${province}`;
      apiStr = `${province}, ${convertCountryCode(bestMatch.adminArea1)}`;
    } else {
      locationString = `${mapquestCity}, ${bestMatch.adminArea3 || province}`; // "Toronto, ON"
      apiStr = `${mapquestCity}, ${province}, ${convertCountryCode(bestMatch.adminArea1)}`; // prettier-ignore
    }
    const locationObj = removeEmptyKVPs({
      // Guaranteed KVP's from Mapquest
      country: bestMatch.adminArea1,
      latitude: bestMatch.latLng.lat,
      longitude: bestMatch.latLng.lng,
      stateProvinceCode: bestMatch.adminArea3,
      // City may be blank
      city: mapquestCity,
      locationString,
      apiString: apiStr, // "town, state, countryCode"
    });

    // Return the locationObject so we can save it to LocalStorage
    return res
      .status(201)
      .json({ message: "Location data secured", locationObj });
  } catch (error) {
    return res.status(402).json({ message: "Error encountered" });
  }
}
